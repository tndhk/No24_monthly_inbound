import { PrismaClient, MonthlyTravelerStats } from '@/generated/prisma';

const prisma = new PrismaClient();

export interface TravelerDataPoint {
  year: number; // データがどちらの年のものかを示す (主に比較対象の年、例: 2024)
  month: number;
  country: string;
  travelersThisYear: number | null; // 例: 2024年の旅行者数
  travelersComparisonYear: number | null; // 例: 2019年の旅行者数
  difference: number | null;
  growthRate: number | null; // %
}

// 指定された国リストと月に対して、2019年と2024年のデータを取得・比較する関数
// これは主にヒートマップや特定の月の詳細表示に使えそう
export async function getMonthlyTravelerComparisonByMonth(
  countries: string[],
  selectedMonth: number // 1-12
): Promise<TravelerDataPoint[]> {
  const dataPoints: TravelerDataPoint[] = [];

  for (const country of countries) {
    const stats2019 = await prisma.monthlyTravelerStats.findUnique({
      where: {
        year_month_country: { year: 2019, month: selectedMonth, country },
      },
    });
    const stats2024 = await prisma.monthlyTravelerStats.findUnique({
      where: {
        year_month_country: { year: 2024, month: selectedMonth, country },
      },
    });

    const t2019 = stats2019?.travelers ?? null;
    const t2024 = stats2024?.travelers ?? null;
    let diff: number | null = null;
    let rate: number | null = null;

    if (t2019 !== null && t2024 !== null) {
      diff = t2024 - t2019;
      rate = calculateGrowthRate(t2024, t2019);
    }

    dataPoints.push({
      year: 2024, // 基準年を2024とする
      month: selectedMonth,
      country,
      travelersThisYear: t2024,
      travelersComparisonYear: t2019,
      difference: diff,
      growthRate: rate,
    });
  }
  return dataPoints;
}

// テーブル表示用に、全月・対象国（または全ユニーク国）のデータを取得し整形する関数
// requirement.md 5.1 カラム: 月, 国名, 2019年旅行者数, 2024年旅行者数, 差分, 増減率
export async function getTravelerDataForTable(
  // TODO: 将来的にフィルタ、ソート、ページネーションの引数を追加
  targetCountries?: string[]
): Promise<TravelerDataPoint[]> {
  const allStats = await prisma.monthlyTravelerStats.findMany({
    where: {
      OR: [{ year: 2019 }, { year: 2024 }],
      ...(targetCountries && targetCountries.length > 0 && { country: { in: targetCountries } }),
    },
    orderBy: [{ country: 'asc' }, { year: 'asc' }, { month: 'asc' }],
  });

  const groupedByCountryAndMonth: Record<string, Record<number, { t2019?: number; t2024?: number }>> = {};

  for (const stat of allStats) {
    if (!groupedByCountryAndMonth[stat.country]) {
      groupedByCountryAndMonth[stat.country] = {};
    }
    if (!groupedByCountryAndMonth[stat.country][stat.month]) {
      groupedByCountryAndMonth[stat.country][stat.month] = {};
    }
    if (stat.year === 2019) {
      groupedByCountryAndMonth[stat.country][stat.month].t2019 = stat.travelers;
    } else if (stat.year === 2024) {
      groupedByCountryAndMonth[stat.country][stat.month].t2024 = stat.travelers;
    }
  }

  const tableData: TravelerDataPoint[] = [];
  for (const country in groupedByCountryAndMonth) {
    for (const monthKey in groupedByCountryAndMonth[country]) {
      const month = parseInt(monthKey);
      const data = groupedByCountryAndMonth[country][month];
      const t2019 = data.t2019 ?? null;
      const t2024 = data.t2024 ?? null;
      let diff: number | null = null;
      let rate: number | null = null;

      if (t2019 !== null && t2024 !== null) {
        diff = t2024 - t2019;
        rate = calculateGrowthRate(t2024, t2019);
      }
      
      // 2019年か2024年のどちらかのデータがあれば行として含める
      if (t2019 !== null || t2024 !== null) {
        tableData.push({
            year: 2024, // テーブル表示の基準年 (差分計算のため)
            month,
            country,
            travelersThisYear: t2024,
            travelersComparisonYear: t2019,
            difference: diff,
            growthRate: rate,
        });
      }
    }
  }
  return tableData;
}

// 特定の国について、2019年と2024年の月別推移データを取得する関数 (折れ線グラフ用)
export async function getCountryMonthlyTrend(
  country: string
): Promise<{ year: number; month: number; travelers: number }[]> {
  const stats = await prisma.monthlyTravelerStats.findMany({
    where: {
      country: country,
      OR: [{ year: 2019 }, { year: 2024 }],
    },
    orderBy: [{ year: 'asc' }, { month: 'asc' }],
    select: { year: true, month: true, travelers: true },
  });
  return stats;
}

function calculateGrowthRate(current: number, previous: number): number | null {
  if (previous === 0) {
    return current > 0 ? Infinity : (current === 0 ? 0 : -Infinity); 
  }
  if (current === null || previous === null) return null; // currentもチェック
  return parseFloat((((current - previous) / previous) * 100).toFixed(2)); // 小数点2桁に丸める
}

export async function getAllUniqueCountries(): Promise<string[]> {
    const distinctCountries = await prisma.monthlyTravelerStats.groupBy({
        by: ['country'],
        orderBy: {
            country: 'asc'
        }
    });
    return distinctCountries.map(c => c.country);
}

export interface AnnualRankingDataPoint {
  country: string;
  travelers2019: number | null;
  percentage2019: number | null;
  travelers2024: number | null;
  percentage2024: number | null;
}

export async function getAnnualTravelerRanking(
  topN?: number,
  sortYear: 2019 | 2024 = 2024
): Promise<AnnualRankingDataPoint[]> {
  const stats = await prisma.monthlyTravelerStats.findMany({
    where: { OR: [{ year: 2019 }, { year: 2024 }] },
    select: { country: true, travelers: true, year: true },
  });

  const aggregatedByYearAndCountry: Record<number, Record<string, number>> = { 2019: {}, 2024: {} };
  const grandTotalByYear: Record<number, number> = { 2019: 0, 2024: 0 };

  for (const stat of stats) {
    const year = stat.year;
    if (!aggregatedByYearAndCountry[year]) {
      aggregatedByYearAndCountry[year] = {};
    }
    if (!aggregatedByYearAndCountry[year][stat.country]) {
      aggregatedByYearAndCountry[year][stat.country] = 0;
    }
    aggregatedByYearAndCountry[year][stat.country] += stat.travelers;
    grandTotalByYear[year] = (grandTotalByYear[year] || 0) + stat.travelers;
  }

  const allCountries = Array.from(new Set(stats.map(s => s.country)));

  let combinedData: AnnualRankingDataPoint[] = allCountries.map(country => {
    const t2019 = aggregatedByYearAndCountry[2019]?.[country];
    const t2024 = aggregatedByYearAndCountry[2024]?.[country];

    const travelers2019 = t2019 ?? null;
    const percentage2019 = (grandTotalByYear[2019] && typeof t2019 === 'number' && grandTotalByYear[2019] > 0)
      ? parseFloat(((t2019 / grandTotalByYear[2019]) * 100).toFixed(2))
      : null;

    const travelers2024 = t2024 ?? null;
    const percentage2024 = (grandTotalByYear[2024] && typeof t2024 === 'number' && grandTotalByYear[2024] > 0)
      ? parseFloat(((t2024 / grandTotalByYear[2024]) * 100).toFixed(2))
      : null;
      
    return { 
      country, 
      travelers2019, 
      percentage2019, 
      travelers2024, 
      percentage2024 
    };
  });

  combinedData.sort((a, b) => {
    const valA = sortYear === 2024 ? (a.travelers2024 ?? 0) : (a.travelers2019 ?? 0);
    const valB = sortYear === 2024 ? (b.travelers2024 ?? 0) : (b.travelers2019 ?? 0);
    return valB - valA;
  });

  if (topN && topN > 0) {
    return combinedData.slice(0, topN);
  }
  return combinedData;
}

export interface MonthlyDataPoint {
  year: number;
  month: number;
  travelers: number;
  country: string; // どの国のデータかを示すために追加
}

export async function getCountryMonthlyTrendByYear(
  country: string,
  year: number
): Promise<MonthlyDataPoint[]> {
  const stats = await prisma.monthlyTravelerStats.findMany({
    where: {
      country: country,
      year: year,
    },
    orderBy: [{ month: 'asc' }],
    select: { year: true, month: true, travelers: true, country: true }, 
  });
  return stats.map(stat => ({ ...stat })); // country も含める
} 
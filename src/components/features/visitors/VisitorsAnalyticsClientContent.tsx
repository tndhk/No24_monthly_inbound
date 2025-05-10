"use client";

import React, { useState, useEffect, useTransition, useMemo } from 'react';
import VisitorsTable from '@/components/features/visitors/VisitorsTable';
import VisitorsLineChart from '@/components/features/visitors/VisitorsLineChart';
import VisitorsHeatmap from '@/components/features/visitors/VisitorsHeatmap';
import CountryRankingChart from '@/components/features/visitors/CountryRankingChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fetchAllUniqueCountriesAction, fetchCountryMonthlyTrendAction, fetchTravelerDataForTableAction, fetchAnnualTravelerRankingAction } from '@/app/(dashboard)/visitors/actions';
import { TravelerDataPoint, AnnualRankingDataPoint } from '@/dal/visitors';

interface MonthlyTrendData {
  year: number;
  month: number;
  travelers: number;
}

interface VisitorsAnalyticsClientContentProps {
  initialTableData: TravelerDataPoint[];
  initialUniqueCountries: string[];
}

export default function VisitorsAnalyticsClientContent({ initialTableData, initialUniqueCountries }: VisitorsAnalyticsClientContentProps) {
  const [tableData, setTableData] = useState<TravelerDataPoint[]>(initialTableData);
  const [uniqueCountriesForSelect, setUniqueCountriesForSelect] = useState<string[]>(initialUniqueCountries);
  const [selectedCountryForChart, setSelectedCountryForChart] = useState<string | null>(null);
  const [countryTrendData, setCountryTrendData] = useState<MonthlyTrendData[] | null>(null);
  const [isLoadingChart, startChartTransition] = useTransition();
  const [isLoadingTable, startTableTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");

  const [topNCount, setTopNCount] = useState<number | string>(10);
  const [topNMetric, setTopNMetric] = useState<'difference' | 'growthRate'>('growthRate');
  const [topNOrder, setTopNOrder] = useState<'top' | 'bottom'>('top');
  const [isTopNActive, setIsTopNActive] = useState(false);
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<number | 'all'>('all');

  // Ranking Chart States
  const [rankingChartData, setRankingChartData] = useState<AnnualRankingDataPoint[] | null>(null);
  const [selectedTopNForRanking, setSelectedTopNForRanking] = useState<number | 'all'>(10);
  const [isLoadingRankingChart, setIsLoadingRankingChart] = useState(false);

  console.log('[VisitorsAnalyticsClientContent] Rendering - rankingChartData:', rankingChartData, 'isLoadingRankingChart:', isLoadingRankingChart);

  useEffect(() => {
    if (initialUniqueCountries.length > 0 && uniqueCountriesForSelect.length === 0) {
        setUniqueCountriesForSelect(initialUniqueCountries);
    } else if (uniqueCountriesForSelect.length === 0) {
        fetchAllUniqueCountriesAction().then(countries => setUniqueCountriesForSelect(countries || []));
    }

    if (initialTableData.length > 0 && tableData.length === 0) {
        setTableData(initialTableData);
    } else if (tableData.length === 0) {
        startTableTransition(async () => {
            const data = await fetchTravelerDataForTableAction();
            setTableData(data || []);
        });
    }
  }, []);

  useEffect(() => {
    if (selectedCountryForChart) {
      setCountryTrendData(null);
      startChartTransition(async () => {
        const trend = await fetchCountryMonthlyTrendAction(selectedCountryForChart);
        setCountryTrendData(trend);
      });
    } else {
      setCountryTrendData(null);
    }
  }, [selectedCountryForChart]);

  // Fetch data for Ranking Chart
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingRankingChart(true); 
      const topNValue = selectedTopNForRanking === 'all' ? undefined : Number(selectedTopNForRanking);
      try {
        const data = await fetchAnnualTravelerRankingAction(topNValue);
        console.log('[RankingChart useEffect] Fetched data:', data);
        setRankingChartData(data);
      } catch (error) {
        console.error("Error fetching ranking chart data:", error);
        setRankingChartData(null); 
      } finally {
        setIsLoadingRankingChart(false); 
      }
    };
    fetchData();
  }, [selectedTopNForRanking]);

  const handleCountryChangeForChart = (country: string) => {
    setSelectedCountryForChart(country === "none" ? null : country);
  };

  const filteredBySearchQuery = useMemo(() => {
    if (!searchQuery) return tableData;
    return tableData.filter(item =>
      item.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tableData, searchQuery]);

  const filteredByMonth = useMemo(() => {
    if (selectedMonthFilter === 'all') return filteredBySearchQuery;
    return filteredBySearchQuery.filter(item => item.month === selectedMonthFilter);
  }, [filteredBySearchQuery, selectedMonthFilter]);

  const finalTableDataForDisplay = useMemo(() => {
    if (!isTopNActive) return filteredByMonth;
    const n = typeof topNCount === 'string' ? parseInt(topNCount, 10) : topNCount;
    if (isNaN(n) || n <= 0) return filteredByMonth;

    const sortedForTopN = [...filteredByMonth].sort((a, b) => {
      const valA = a[topNMetric];
      const valB = b[topNMetric];
      if (valA === null || valA === undefined) return topNOrder === 'top' ? 1 : -1;
      if (valB === null || valB === undefined) return topNOrder === 'top' ? -1 : 1;
      if (valA === Infinity) return topNOrder === 'top' ? -1 : 1;
      if (valB === Infinity) return topNOrder === 'top' ? 1 : -1;
      if (valA === -Infinity) return topNOrder === 'top' ? 1 : -1;
      if (valB === -Infinity) return topNOrder === 'top' ? -1 : 1;
      if (typeof valA === 'number' && typeof valB === 'number') {
        return topNOrder === 'top' ? valB - valA : valA - valB;
      }
      return 0;
    });
    return sortedForTopN.slice(0, n);
  }, [filteredByMonth, topNCount, topNMetric, topNOrder, isTopNActive]);

  const monthsForFilter = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <>
      {/* Chart Select UI */}
      <div className="mb-8 flex flex-col sm:flex-row items-center gap-4 p-4 bg-card dark:bg-card rounded-lg shadow-lg">
        <Label htmlFor="country-select-chart" className="text-sm font-medium whitespace-nowrap">
          グラフ表示国:
        </Label>
        <Select onValueChange={handleCountryChangeForChart} value={selectedCountryForChart || "none"}>
          <SelectTrigger id="country-select-chart" className="w-full sm:w-[320px] focus:ring-2 focus:ring-primary">
            <SelectValue placeholder="国を選択して月別推移グラフを表示..." />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="none">- グラフ選択解除 -</SelectItem>
            {uniqueCountriesForSelect.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart Display */}
      {selectedCountryForChart && (
        isLoadingChart ? (
          <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">グラフデータをロード中 ({selectedCountryForChart})...</p></div>
        ) : countryTrendData && countryTrendData.length > 0 ? (
          <VisitorsLineChart countryName={selectedCountryForChart} trendData={countryTrendData} />
        ) : (
          <div className="text-center text-destructive p-4 bg-destructive/10 rounded-md shadow my-4">{selectedCountryForChart}のグラフデータの取得に失敗したか、データが存在しません。</div>
        )
      )}

      {/* Heatmap */}
      {uniqueCountriesForSelect.length > 0 && tableData.length > 0 && (
        <VisitorsHeatmap data={tableData} uniqueCountries={uniqueCountriesForSelect} />
      )}

      {/* Ranking Chart Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">国別 年間入国者数ランキング (2019年 vs 2024年)</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 mb-4 bg-card dark:bg-card rounded-lg shadow-lg">
          <Label htmlFor="topN-select-ranking" className="text-sm font-medium whitespace-nowrap ml-0 sm:ml-4">
            表示件数:
          </Label>
          <Select 
            value={selectedTopNForRanking.toString()} 
            onValueChange={(value) => setSelectedTopNForRanking(value === 'all' ? 'all' : parseInt(value))}
          >
            <SelectTrigger id="topN-select-ranking" className="w-full sm:w-[120px] focus:ring-2 focus:ring-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">上位5件</SelectItem>
              <SelectItem value="10">上位10件</SelectItem>
              <SelectItem value="20">上位20件</SelectItem>
              <SelectItem value="all">全件表示</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isLoadingRankingChart && ( 
          <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">ランキングデータをロード中...</p></div>
        )}
        {!isLoadingRankingChart && rankingChartData && rankingChartData.length > 0 && ( 
          <CountryRankingChart rankingData={rankingChartData} />
        )}
        {!isLoadingRankingChart && (!rankingChartData || rankingChartData.length === 0) && ( 
          <div className="text-center text-destructive p-4 bg-destructive/10 rounded-md shadow my-4">
            ランキングデータを表示できませんでした。(Content側)
          </div>
        )}
      </div>

      {/* Table Section with Filters */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">全データ比較テーブル</h2>
        
        {/* Filters Container - Adjusted for responsiveness */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-x-6 gap-y-5 mb-6 p-4 bg-card dark:bg-card rounded-lg shadow-lg items-start lg:items-end">
          {/* 国名検索 */} 
          <div className="w-full">
            <Label htmlFor="search-country" className="block text-sm font-medium mb-1.5">
              国名で検索:
            </Label>
            <Input
              id="search-country"
              type="text"
              placeholder="例: 韓国, アメリカ, ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2.5 focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* 月選択フィルタ */} 
          <div className="w-full mt-4 lg:mt-0">
            <Label htmlFor="month-filter" className="block text-sm font-medium mb-1.5">
              月でフィルタ:
            </Label>
            <Select 
              value={selectedMonthFilter === 'all' ? 'all' : selectedMonthFilter.toString()} 
              onValueChange={(value) => setSelectedMonthFilter(value === 'all' ? 'all' : parseInt(value))}
            >
              <SelectTrigger id="month-filter" className="h-10 focus:ring-2 focus:ring-primary w-full">
                <SelectValue placeholder="月を選択..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全月表示</SelectItem>
                {monthsForFilter.map(m => (
                  <SelectItem key={m} value={m.toString()}>{m}月</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 上位N抽出 */} 
          <div className="w-full mt-4 lg:mt-0 lg:border-l lg:border-gray-200 dark:lg:border-gray-700 lg:pl-6 pt-4 lg:pt-0 border-t border-gray-200 dark:border-gray-700">
            <Label className="block text-sm font-medium mb-1.5">上位/下位 N件 (現在の表示結果に対して):</Label>
            <div className="grid grid-cols-3 gap-2 items-center">
              <Select value={topNOrder} onValueChange={(v) => setTopNOrder(v as 'top' | 'bottom')}>
                <SelectTrigger className="h-10 focus:ring-1 focus:ring-primary"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">上位</SelectItem>
                  <SelectItem value="bottom">下位</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={topNCount}
                onChange={(e) => setTopNCount(e.target.value ? parseInt(e.target.value, 10) : '')}
                placeholder="N"
                min="1"
                className="h-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-1 focus:ring-primary"
              />
              <Select value={topNMetric} onValueChange={(v) => setTopNMetric(v as 'difference' | 'growthRate')}>
                <SelectTrigger className="h-10 focus:ring-1 focus:ring-primary"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="growthRate">増減率 (%)</SelectItem>
                  <SelectItem value="difference">差分 (人)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
                onClick={() => setIsTopNActive(!isTopNActive)} 
                variant={isTopNActive ? "secondary" : "outline"}
                className="mt-2.5 w-full text-xs py-2 h-auto shadow-sm"
                size="sm"
            >
                {isTopNActive ? `抽出解除 (${topNOrder === 'top' ? '上位' : '下位'}${topNCount}件 by ${topNMetric === 'growthRate' ? '増減率' : '差分'})` : 'この条件で抽出を適用'}
            </Button>
          </div>
        </div>

        {isLoadingTable ? 
            <div className="flex justify-center items-center h-40"><p className="text-muted-foreground">テーブルデータロード中...</p></div> : 
            <VisitorsTable data={finalTableDataForDisplay} />
        }
      </div>
      
      {/* Initial Data Sample (optional) */}
      {initialTableData.length > 0 && (
          <div className="mt-8 p-3 border rounded-md bg-muted/50 dark:bg-muted/30 max-h-60 overflow-y-auto text-xs shadow-sm">
            <details>
              <summary className="cursor-pointer font-medium text-muted-foreground">初期テーブルデータサンプル (クリックで展開)</summary>
              <pre className="mt-2 text-muted-foreground/80">
                {JSON.stringify(initialTableData.slice(0, 2), null, 2)}
              </pre>
            </details>
          </div>
        )}
    </>
  );
} 
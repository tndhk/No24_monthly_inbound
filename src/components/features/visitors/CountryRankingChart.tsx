'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { AnnualRankingDataPoint } from '@/dal/visitors';

interface CountryRankingChartProps {
  rankingData: AnnualRankingDataPoint[];
}

const COLOR_2019 = "#8884d8";
const COLOR_2024 = "#82ca9d";

export default function CountryRankingChart({ rankingData }: CountryRankingChartProps) {
  console.log('[CountryRankingChart] Received props - rankingData:', rankingData);

  if (!rankingData || rankingData.length === 0) {
    return (
      <div className="p-4 border rounded-md mt-6 bg-white dark:bg-gray-800 shadow text-center text-gray-500">
        ランキングデータを表示できませんでした。
      </div>
    );
  }

  const chartHeight = Math.max(400, rankingData.length * 45);
  const chartWidth = 700;
  
  const maxTravelers2019 = Math.max(...rankingData.map(d => d.travelers2019 || 0), 0);
  const maxTravelers2024 = Math.max(...rankingData.map(d => d.travelers2024 || 0), 0);
  const maxOverallTravelers = Math.max(maxTravelers2019, maxTravelers2024);
  const xAxisDomainMax = maxOverallTravelers > 0 ? Math.ceil(maxOverallTravelers * 1.1 / 100000) * 100000 : 1000;

  return (
    <div className="p-4 border rounded-md mt-8 bg-white dark:bg-gray-800 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-200">
        国別 年間入国者数ランキング (2019年 vs 2024年)
      </h3>
      <div className="mx-auto" style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <div style={{ width: `${chartWidth}px`, height: `${chartHeight}px` }}>
          <BarChart
            width={chartWidth}
            height={chartHeight}
            data={rankingData}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 100,
              bottom: 20,
            }}
            barCategoryGap="30%"
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              tickFormatter={(value) => value >= 1000000 ? `${value/1000000}M` : (value >= 1000 ? `${value/1000}K` : value.toString())}
              domain={[0, xAxisDomainMax]}
            />
            <YAxis 
              type="category" 
              dataKey="country" 
              width={80} 
              interval={0}
            />
            <Tooltip
              formatter={(value: number, name: string, entry: any) => {
                const { payload } = entry;
                let percentage: number | null = null;
                let yearLabel = "";

                if (name === "2019年 合計入国者数") {
                  percentage = payload.percentage2019;
                  yearLabel = "2019年";
                } else if (name === "2024年 合計入国者数") {
                  percentage = payload.percentage2024;
                  yearLabel = "2024年";
                }

                const displayValue = typeof value === 'number' ? value.toLocaleString() : String(value);
                if (percentage !== null && percentage !== undefined) {
                  return [`${displayValue} 人 (${percentage.toFixed(2)}%)`, `${yearLabel} 合計`];
                }
                return [`${displayValue} 人`, `${yearLabel} 合計`];
              }}
            />
            <Legend />
            <Bar dataKey="travelers2019" fill={COLOR_2019} name="2019年 合計入国者数" barSize={12}/>
            <Bar dataKey="travelers2024" fill={COLOR_2024} name="2024年 合計入国者数" barSize={12}/>
          </BarChart>
        </div>
      </div>
    </div>
  );
} 
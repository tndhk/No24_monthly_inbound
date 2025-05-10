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
  year: number;
}

const CHART_BAR_COLOR = "#8884d8";

export default function CountryRankingChart({ rankingData, year }: CountryRankingChartProps) {
  console.log('[CountryRankingChart] Received props - rankingData:', rankingData, 'year:', year);

  if (!rankingData || rankingData.length === 0) {
    return (
      <div className="p-4 border rounded-md mt-6 bg-white dark:bg-gray-800 shadow text-center text-gray-500">
        {year}年のランキングデータを表示できませんでした。
      </div>
    );
  }

  // 固定サイズでチャートを表示
  const chartHeight = Math.max(400, rankingData.length * 30);
  const chartWidth = 600;
  
  const maxTravelers = Math.max(...rankingData.map(d => d.totalTravelers), 0);
  const xAxisDomainMax = maxTravelers > 0 ? Math.ceil(maxTravelers * 1.1 / 100000) * 100000 : 1000;

  return (
    <div className="p-4 border rounded-md mt-8 bg-white dark:bg-gray-800 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-200">
        {year}年 国別 年間入国者数ランキング
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
            barSize={20}
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
              formatter={(value: number, name: string, props: any) => {
                const percentage = props.payload?.percentage;
                const displayValue = typeof value === 'number' ? value.toLocaleString() : value;
                let tooltipContent = [`${displayValue} 人`, `合計入国者数`];
                if (percentage !== undefined && percentage !== null) {
                  tooltipContent = [`${displayValue} 人 (${percentage.toFixed(2)}%)`, `合計入国者数 (割合)`];
                }
                return tooltipContent;
              }}
            />
            <Legend />
            <Bar dataKey="totalTravelers" fill={CHART_BAR_COLOR} name={`${year}年 合計入国者数`} />
          </BarChart>
        </div>
      </div>
    </div>
  );
} 
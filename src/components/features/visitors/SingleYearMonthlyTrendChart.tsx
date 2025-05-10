'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { MonthlyDataPoint } from '@/dal/visitors'; // 新しい型をインポート

interface SingleYearMonthlyTrendChartProps {
  countryName: string;
  trendData: MonthlyDataPoint[];
  year: number;
}

const MONTH_NAMES_JP = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

export default function SingleYearMonthlyTrendChart({
  countryName,
  trendData,
  year,
}: SingleYearMonthlyTrendChartProps) {
  if (!trendData || trendData.length === 0) {
    return (
      <div className="p-4 border rounded-md mt-4 bg-muted text-muted-foreground text-center">
        {year}年の{countryName}の月別推移データを表示できませんでした。
      </div>
    );
  }

  const chartData = MONTH_NAMES_JP.map((monthName, index) => {
    const month = index + 1;
    const dataPoint = trendData.find(d => d.month === month);
    return {
      month: monthName,
      travelers: dataPoint ? dataPoint.travelers : 0, // データがない月は0として扱う
    };
  });

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-lg bg-card">
      <h3 className="text-xl font-semibold mb-4 text-center">
        {countryName} - {year}年 月別入国者数推移
      </h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis 
              fontSize={12} 
              tickFormatter={(value) => 
                value >= 1000000 ? `${value/1000000}M` : 
                (value >= 1000 ? `${value/1000}K` : value.toString())}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()} 人`, `入国者数`]}
            />
            <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
            <Line 
              type="monotone" 
              dataKey="travelers" 
              name={`${year}年 入国者数`} 
              stroke="#82ca9d" // 2024年の色に合わせる
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 
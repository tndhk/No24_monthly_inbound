"use client";

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyTrendData {
  year: number;
  month: number;
  travelers: number;
}

interface ChartDataPoint {
  monthLabel: string;
  travelers2019?: number;
  travelers2024?: number;
}

interface VisitorsLineChartProps {
  countryName: string;
  trendData: MonthlyTrendData[];
}

export default function VisitorsLineChart({ countryName, trendData }: VisitorsLineChartProps) {
  const processedData = useMemo(() => {
    const dataForChart: ChartDataPoint[] = [];
    for (let m = 1; m <= 12; m++) {
      const monthStr = `${m}月`;
      const data2019 = trendData.find(d => d.year === 2019 && d.month === m)?.travelers;
      const data2024 = trendData.find(d => d.year === 2024 && d.month === m)?.travelers;
      dataForChart.push({
        monthLabel: monthStr,
        travelers2019: data2019,
        travelers2024: data2024,
      });
    }
    return dataForChart;
  }, [trendData]);

  if (!trendData || trendData.length === 0) {
    return <div className="p-4 border rounded-md mt-6 bg-white dark:bg-gray-800 shadow text-center text-gray-500">グラフデータをロード中です、または対象国データがありません ({countryName})。</div>;
  }
  
  const allTravelerValues = trendData.map(d => d.travelers).filter(t => t !== undefined && t !== null) as number[];
  const maxYValue = allTravelerValues.length > 0 ? Math.max(...allTravelerValues) : 0;
  const yAxisDomainMax = maxYValue > 0 ? Math.ceil(maxYValue * 1.1 / 10000) * 10000 : 1000;

  return (
    <div className="p-4 border rounded-md mt-6 bg-white dark:bg-gray-800 shadow">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">{countryName} - 月別旅行者数推移</h3>
      <ResponsiveContainer width="100%" height={350}> 
        <LineChart
          data={processedData}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} className="dark:stroke-gray-600" />
          <XAxis dataKey="monthLabel" fontSize={12} className="dark:fill-gray-300" />
          <YAxis 
            fontSize={12} 
            className="dark:fill-gray-300"
            tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value.toString()}
            domain={[0, yAxisDomainMax]} 
            allowDataOverflow={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} 
            labelStyle={{ fontWeight: 'bold', color: '#333' }}
            formatter={(value: number, name: string, props) => {
                const yearLabel = name === 'travelers2019' ? '2019年' : '2024年';
                return [`${value.toLocaleString()} 人`, yearLabel];
            }}
            labelFormatter={(label) => `${label}の旅行者数`}
          />
          <Legend wrapperStyle={{ fontSize: '14px' }} />
          <Line
            type="monotone"
            dataKey="travelers2019"
            name="2019年"
            stroke="#A0AEC0"
            strokeDasharray="4 4" 
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1, fill: '#A0AEC0' }}
            activeDot={{ r: 5, strokeWidth: 2, fill: '#718096' }}
          />
          <Line
            type="monotone"
            dataKey="travelers2024"
            name="2024年"
            stroke="#48BB78"
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1, fill: '#48BB78' }}
            activeDot={{ r: 5, strokeWidth: 2, fill: '#38A169' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 
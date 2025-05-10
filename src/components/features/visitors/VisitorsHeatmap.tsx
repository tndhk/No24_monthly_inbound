"use client";

import React, { useState, useMemo } from 'react';
import { TravelerDataPoint } from '@/dal/visitors';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type HeatmapValueType = 'difference' | 'growthRate';

interface VisitorsHeatmapProps {
  data: TravelerDataPoint[]; 
  uniqueCountries: string[]; 
  uniqueMonths?: number[]; 
}

function getColorForValue(value: number | null | undefined, type: HeatmapValueType): string {
  if (value === null || value === undefined || !isFinite(value)) {
    return 'bg-gray-200 dark:bg-gray-700'; 
  }

  let intensityClass = 'opacity-100'; // Default to full opacity
  const absValue = Math.abs(value);

  // Define thresholds for opacity steps based on value type
  const thresholds = type === 'growthRate' 
    ? [10, 50, 100, 200] // For growth rate (%)
    : [1000, 5000, 10000, 20000]; // For absolute difference

  if (absValue === 0) return 'bg-gray-300 dark:bg-gray-600'; // Specific for zero

  if (absValue < thresholds[0] * 0.2) intensityClass = 'opacity-20';
  else if (absValue < thresholds[0]) intensityClass = 'opacity-40';
  else if (absValue < thresholds[1]) intensityClass = 'opacity-60';
  else if (absValue < thresholds[2]) intensityClass = 'opacity-75'; // Adjusted for smoother transition
  else if (absValue < thresholds[3]) intensityClass = 'opacity-90';
  // else intensityClass remains 'opacity-100' for values >= thresholds[3]

  const color = value > 0 ? 'bg-blue-500' : 'bg-red-500';
  return `${color} ${intensityClass}`;
}

const ColorBar = ({ type }: { type: HeatmapValueType }) => {
  const baseValues = type === 'growthRate' ? [10, 50, 100, 200] : [1000, 5000, 10000, 20000];
  // 代表的な閾値と、その少し下の値、0、データなし、を表示
  const examplePoints = [
    { value: -baseValues[3] * 1.1, label: `< ${-baseValues[3]}` },
    { value: -baseValues[1], label: `≈ ${-baseValues[1]}` },
    { value: -baseValues[0] * 0.1, label: `≈ 0⁻` },
    { value: 0, label: '0' },
    { value: baseValues[0] * 0.1, label: `≈ 0⁺` },
    { value: baseValues[1], label: `≈ ${baseValues[1]}` },
    { value: baseValues[3] * 1.1, label: `> ${baseValues[3]}` },
    { value: null, label: 'N/A' } // データなし
  ];

  return (
    <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700/40 rounded-md shadow-sm">
      <p className="text-xs font-medium mb-1.5 text-gray-600 dark:text-gray-300">
        色の凡例 ({type === 'growthRate' ? '増減率 (%)' : '差分 (人)'}):
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {examplePoints.map((point, idx) => {
          const colorClass = getColorForValue(point.value, type);
          let displayVal = point.label;
          if (point.value !== null && type === 'growthRate' && point.label.includes('≈')) displayVal = `${point.label}%`;
          else if (point.value !== null && type === 'difference' && point.label.includes('≈')) displayVal = `${point.label}`;
          else if (point.value === 0) displayVal = '0';
          else if (point.value === null) displayVal = 'データ無';

          return (
            <div key={idx} className="flex items-center space-x-1">
              <div className={`w-3.5 h-3.5 rounded-xs border border-gray-300 dark:border-gray-500 ${colorClass}`}></div>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">{displayVal}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function VisitorsHeatmap({
  data,
  uniqueCountries,
  uniqueMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
}: VisitorsHeatmapProps) {
  const [valueType, setValueType] = useState<HeatmapValueType>('growthRate');

  const heatmapData = useMemo(() => {
    const map: Record<string, Record<number, TravelerDataPoint | undefined>> = {};
    uniqueCountries.forEach(country => {
      map[country] = {};
      uniqueMonths.forEach(month => {
        map[country][month] = data.find(d => d.country === country && d.month === month);
      });
    });
    return map;
  }, [data, uniqueCountries, uniqueMonths]);

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 mt-6 dark:text-gray-400">ヒートマップデータを表示するデータがありません。</p>;
  }

  return (
    <div className="p-4 border rounded-md mt-8 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          月別 国別変化ヒートマップ
        </h3>
        <RadioGroup 
          value={valueType} 
          onValueChange={(val: string) => setValueType(val as HeatmapValueType)}
          className="flex items-center space-x-3"
        >
          <div className="flex items-center space-x-1.5">
            <RadioGroupItem value="difference" id="h-diff" className="text-blue-600"/>
            <Label htmlFor="h-diff" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">差分 (人)</Label>
          </div>
          <div className="flex items-center space-x-1.5">
            <RadioGroupItem value="growthRate" id="h-rate" className="text-blue-600"/>
            <Label htmlFor="h-rate" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">増減率 (%)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="overflow-x-auto pb-2">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 table-fixed">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="sticky left-0 z-10 p-2 border border-gray-300 dark:border-gray-600 text-xs font-semibold text-gray-600 dark:text-gray-300 w-32 text-left bg-gray-50 dark:bg-gray-700/50">国</th>
              {uniqueMonths.map(month => (
                <th key={month} className="p-2 border border-gray-300 dark:border-gray-600 text-xs font-semibold text-gray-600 dark:text-gray-300 w-16 min-w-[60px]">{month}月</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueCountries.map(country => (
              <tr key={country} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-100">
                <td className="sticky left-0 z-10 p-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {country}
                </td>
                {uniqueMonths.map(month => {
                  const point = heatmapData[country]?.[month];
                  const value = point ? (valueType === 'difference' ? point.difference : point.growthRate) : null;
                  const displayValue = value !== null && isFinite(value) 
                                        ? (valueType === 'difference' ? value.toLocaleString() : `${value.toFixed(1)}%`)
                                        : (value === Infinity ? '∞' : (value === -Infinity ? '-∞' : '-'));
                  const bgColorClass = getColorForValue(value, valueType);
                  
                  return (
                    <td 
                      key={`${country}-${month}`} 
                      title={`${country} - ${month}月: ${valueType === 'difference' ? '差分' : '増減率'} ${displayValue}`}
                      className={`p-1 border border-gray-200 dark:border-gray-600 text-center align-middle text-xs h-10 min-w-[60px] w-16 transition-all duration-100 ease-in-out relative group ${bgColorClass}`}
                    >
                      <span className="text-white mix-blend-plus-lighter font-medium text-[10px] leading-none group-hover:opacity-80 transition-opacity">
                        {displayValue}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ColorBar type={valueType} />
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <p>ヒント: セルにマウスオーバーすると詳細な値が表示されます。</p>
      </div>
    </div>
  );
} 
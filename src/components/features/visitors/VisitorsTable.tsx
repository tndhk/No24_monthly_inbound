"use client";

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TravelerDataPoint } from "@/dal/visitors";
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface VisitorsTableProps {
  data: TravelerDataPoint[];
}

type SortableKeys = Exclude<keyof TravelerDataPoint, 'year'>; // yearは通常ソート対象外

interface SortConfig {
  key: SortableKeys;
  direction: 'ascending' | 'descending';
}

const ITEMS_PER_PAGE = 50;

export default function VisitorsTable({ data }: VisitorsTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!data) return [];
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (valA === null || valA === undefined) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valB === null || valB === undefined) return sortConfig.direction === 'ascending' ? 1 : -1;
        
        if (valA === Infinity) return sortConfig.direction === 'ascending' ? 1 : -1;
        if (valB === Infinity) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA === -Infinity) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valB === -Infinity) return sortConfig.direction === 'ascending' ? 1 : -1;

        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB) * (sortConfig.direction === 'ascending' ? 1 : -1);
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
          return (valA - valB) * (sortConfig.direction === 'ascending' ? 1 : -1);
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // ソート実行時は1ページ目に戻す
  };

  const getSortIcon = (key: SortableKeys) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-3 w-3 opacity-40" />;
    }
    return sortConfig.direction === 'ascending' ? 
           <ArrowUp className="ml-2 h-3 w-3" /> : 
           <ArrowDown className="ml-2 h-3 w-3" />;
  };

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 mt-4">表示するデータがありません。</p>;
  }
  
  const columns: { key: SortableKeys; label: string; className?: string; isNumeric?: boolean }[] = [
    { key: 'month', label: '月', className: "w-[60px]" },
    { key: 'country', label: '国名' },
    { key: 'travelersComparisonYear', label: '2019年', isNumeric: true, className: "w-[100px]" },
    { key: 'travelersThisYear', label: '2024年', isNumeric: true, className: "w-[100px]" },
    { key: 'difference', label: '差分', isNumeric: true, className: "w-[100px]" },
    { key: 'growthRate', label: '増減率', className: "w-[100px]", isNumeric: true },
  ];

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableCaption className="my-2 text-sm text-gray-600">訪日外客数 月別比較データ (ヘッダークリックでソート)</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead 
                key={col.key} 
                className={`${col.className || ''} cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 py-2 px-3`}
                onClick={() => requestSort(col.key)}
              >
                <div className={`flex items-center ${col.isNumeric ? 'justify-end' : 'justify-start'}`}>
                  <span>{col.label}</span>
                  {getSortIcon(col.key)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={`${item.country}-${item.month}-${item.year}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-100">
              <TableCell className="py-2 px-3 text-sm">{item.month}月</TableCell>
              <TableCell className="font-medium py-2 px-3 text-sm">{item.country}</TableCell>
              <TableCell className="text-right py-2 px-3 text-sm">
                {item.travelersComparisonYear?.toLocaleString() ?? '-'}
              </TableCell>
              <TableCell className="text-right py-2 px-3 text-sm">
                {item.travelersThisYear?.toLocaleString() ?? '-'}
              </TableCell>
              <TableCell className={`text-right py-2 px-3 text-sm ${getTextColorForValue(item.difference)}`}>
                {item.difference?.toLocaleString() ?? '-'}
              </TableCell>
              <TableCell className={`text-right py-2 px-3 text-sm ${getTextColorForValue(item.growthRate)}`}>
                {formatGrowthRate(item.growthRate)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 p-3 border-t bg-gray-50 dark:bg-gray-800/50 rounded-b-md">
          <span className="text-sm text-muted-foreground">
            {currentPage} / {totalPages} ページ ({sortedData.length}件中 {(currentPage -1) * ITEMS_PER_PAGE + 1}-{(Math.min(currentPage * ITEMS_PER_PAGE, sortedData.length))}件)
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1"
          >
            前へ
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1"
          >
            次へ
          </Button>
        </div>
      )}
    </div>
  );
}

function getTextColorForValue(value: number | null | undefined): string {
  if (value === null || value === undefined || !isFinite(value)) return 'text-gray-700 dark:text-gray-300';
  if (value > 0) return 'text-green-600 dark:text-green-400 font-semibold';
  if (value < 0) return 'text-red-600 dark:text-red-400 font-semibold';
  return 'text-gray-700 dark:text-gray-300';
}

function formatGrowthRate(rate: number | null | undefined): string {
  if (rate === null || rate === undefined) return '-';
  if (rate === Infinity) return '∞';
  if (rate === -Infinity) return '-∞';
  if (isNaN(rate)) return '-';
  return `${rate.toFixed(1)}%`;
} 
import { getTravelerDataForTable, getAllUniqueCountries } from '@/dal/visitors';
import VisitorsAnalyticsClientContent from '@/components/features/visitors/VisitorsAnalyticsClientContent';

export default async function VisitorsAnalyticsPage() {
  // サーバーサイドで初期データを取得
  const initialTableData = await getTravelerDataForTable();
  const initialUniqueCountries = await getAllUniqueCountries();

  return (
    <div className="container mx-auto py-6 sm:py-8 px-3 sm:px-4 md:px-6 lg:px-8 min-h-screen">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
          訪日外客数 月別トレンド分析
        </h1>
      </header>
      
      <VisitorsAnalyticsClientContent 
        initialTableData={initialTableData}
        initialUniqueCountries={initialUniqueCountries}
      />
       <footer className="text-center py-8 mt-12 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} Visitor Analytics. All rights reserved.</p>
      </footer>
    </div>
  );
} 
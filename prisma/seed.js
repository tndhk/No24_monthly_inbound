const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// 除外する国名やキーワードのリスト
const EXCLUDE_KEYWORDS = ['総数', '計', 'その他', '地域', '大陸', '除く', '無国籍'];
const EXCLUDE_SPECIFIC_COUNTRIES = ['イスラエル', 'トルコ', 'GCC6か国']; // 中東地域の内訳として個別に扱われているため

async function parseCSV(filePath, year, is2024Format = false) {
  console.log(`[parseCSV] Start parsing: ${filePath} for year ${year}`);
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.split('\n');
  const monthlyStats = [];
  let processedLines = 0;
  let skippedLinesCount = 0;

  // データ行は通常4行目から (0-indexedで3行目)
  // 実際のヘッダーとデータ開始行はファイルを見て調整
  let dataStartIndex = 3; 
  if (year === 2019 && lines[3].startsWith(',')) dataStartIndex = 3; // 2019年版のヘッダー行を特定
  if (year === 2024 && lines[3].startsWith(',,')) dataStartIndex = 3; // 2024年版のヘッダー行を特定


  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    processedLines++;

    const columns = line.split(',').map(col => col.trim());

    let countryNameIndex = 0; // デフォルトは0列目
    let country = '';

    if (is2024Format) {
        // パターン1: columns[0] が国名で、columns[1] が空 (例: 韓国,,857039,...)
        if (columns.length > 0 && columns[0] !== '' && (columns.length > 1 && columns[1] === '')) {
            countryNameIndex = 0;
            country = columns[countryNameIndex].trim();
            // console.log(`[parseCSV ${year}] Matched 2024 pattern 1: country='${country}', col0='${columns[0]}', col1='${columns[1]}'`);
        }
        // パターン2: columns[0] が空で、columns[1] が国名 (例: ,スウェーデン,2755,... や ,　イスラエル,790,...)
        else if (columns.length > 1 && columns[0] === '' && columns[1] !== '') {
            countryNameIndex = 1;
            country = columns[countryNameIndex].trim();
            // console.log(`[parseCSV ${year}] Matched 2024 pattern 2: country='${country}', col0='${columns[0]}', col1='${columns[1]}'`);
        }
        // パターン3: columns[0] が地域名で、columns[1] が国名 (以前の北欧地域のケースなど、より限定的に)
        // ただし、このパターンは EXCLUDE_KEYWORDS で地域名を処理する方針のため、積極的には採用しない。
        // 上記パターン1, 2でカバーできない場合のフォールバックとして、以前のロジックの一部を残すが、
        // より厳密な条件が必要な場合は、データ構造を詳細に分析して調整する。
        else if (columns.length > 1 && columns[0] !== '' && columns[1] !== '' && !EXCLUDE_KEYWORDS.some(kw => columns[0].includes(kw)) && !EXCLUDE_KEYWORDS.some(kw => columns[1].includes(kw)) ) {
             // このケースは稀で、国名がどちらか判断が難しい場合がある。一旦 columns[0]を優先するが、ログで要確認。
             // 通常はパターン1,2で拾われるか、EXCLUDE_KEYWORDSで除外される。
             countryNameIndex = 0; // または 1、データ次第
             country = columns[countryNameIndex].trim();
             console.warn(`[parseCSV ${year}] Matched 2024 pattern 3 (ambiguous, using col${countryNameIndex}): country='${country}' from line: ${line.substring(0,50)}`);
        }
        // スキップするパターン: ヘッダー行 (,,1月,...) や、予期せぬ構造
        else if (columns.length > 1 && columns[0] === '' && columns[1] === '') {
            console.warn(`[parseCSV ${year}] Skipping line (likely header or empty structure): ${line.substring(0, 50)}`);
            skippedLinesCount++;
            continue;
        }
        else {
            console.warn(`[parseCSV ${year}] Skipping line (unmatched 2024 structure): ${line.substring(0, 50)}`);
            skippedLinesCount++;
            continue;
        }
    } else { // 2019年 または is2024Format = false の場合
        // 2019年版で、行頭が空カンマで始まっていない場合、それは国名ではない可能性がある (例: 注釈行)
        if (columns[0] === '' && columns.length > 1 && columns[1] === '') { 
             // ヘッダー行 ,,1月... など
            console.warn(`[parseCSV ${year}] Skipping line (likely 2019 header): ${line.substring(0,50)}`);
            skippedLinesCount++;
            continue;
        } else if (columns[0] !== '') {
            countryNameIndex = 0;
            country = columns[countryNameIndex].trim();
        } else if (columns.length > 1 && columns[0] === '' && columns[1] !== '') {
            // 2019年CSVで ,国名,data... のパターンがある場合 (現状のファイルではあまり見られないが念のため)
            countryNameIndex = 1;
            country = columns[countryNameIndex].trim();
            console.log(`[parseCSV ${year}] Matched 2019 pattern (col0 empty, col1 country): country='${country}'`);
        } else {
            console.warn(`[parseCSV ${year}] Skipping line (unmatched 2019 structure): ${line.substring(0,50)}`);
            skippedLinesCount++; 
            continue;
        }
    }

    // 国名が取得できたら、EXCLUDE リストでチェック
    if (!country) { // countryが空文字列の場合もスキップ
        console.warn(`[parseCSV ${year}] Skipping line (country name could not be determined): ${line.substring(0,50)}`);
        skippedLinesCount++;
        continue;
    }

    if (EXCLUDE_KEYWORDS.some(kw => country.includes(kw)) || EXCLUDE_SPECIFIC_COUNTRIES.includes(country)) {
      console.warn(`[parseCSV ${year}] Skipping country (excluded by keyword/list): '${country}' from line: ${line.substring(0,50)}`);
      skippedLinesCount++;
      continue;
    }
    if (!isNaN(parseInt(country, 10))) { // 国名が純粋な数字の場合はスキップ
        console.warn(`[parseCSV ${year}] Skipping country (numeric name): '${country}' from line: ${line.substring(0,50)}`);
        skippedLinesCount++;
        continue;
    }
    console.log(`[parseCSV ${year}] Processing country: ${country}`);

    // 月別データは国名列の次の次の列から2つおきに配置されていると仮定する
    // 2024年 パターン1 (韓国,,...) countryNameIndex = 0, データは columns[2] から
    // 2024年 パターン2 (,スウェーデン,...) countryNameIndex = 1, データは columns[3] から? CSV構造による。要確認。
    // 2019年 countryNameIndex = 0, データは columns[1] から
    let monthDataStartIndex;
    if (is2024Format) {
        if (countryNameIndex === 0 && columns.length > 1 && columns[1] === '') { // パターン1: 韓国,,...など
            monthDataStartIndex = 2; 
        } else if (countryNameIndex === 1 && columns.length > 0 && columns[0] === '') { // パターン2: ,スウェーデン,...など
            // このパターンだと、columns[2] が数値データの最初の列か、それとも空かによる
            // ログから、北欧地域スウェーデンは正しく取れていた。その時のcolumns[0]=北欧地域, columns[1]=スウェーデン, columns[2]が1月データだったはず。
            // しかし、今のロジックは country = columns[countryNameIndex].trim(); であり、countryNameIndex=1 (スウェーデン)
            // その場合、データは columns[countryNameIndex + 1] = columns[2] から始まる。
            monthDataStartIndex = countryNameIndex + 1; // つまり 2
        } else {
            // その他の2024フォーマット (パターン3など)
            monthDataStartIndex = countryNameIndex + 1; // 基本は国名の次の列からデータと仮定（ただし伸率等でずれる）
            console.warn(`[parseCSV ${year}] Ambiguous monthDataStartIndex for country ${country}, assuming ${monthDataStartIndex}. Line: ${line.substring(0,30)}`);
            // 2024年の主要パターン (韓国,,...) では、国名が0列目、データは2列目から。なので国名Index+2が正しい
            // ,スウェーデン,...パターンでは国名が1列目、データは2列目から。なので国名Index+1が正しい
            // 修正: countryNameIndex を基準に、実際のデータ開始列を正しく設定する
            if (columns[countryNameIndex+1] === '') { // 国名の次が空カンマなら、その次がデータ
                 monthDataStartIndex = countryNameIndex + 2;
            } else { // 国名の次がデータ
                 monthDataStartIndex = countryNameIndex + 1;
            }
        }
    } else { // 2019年
        monthDataStartIndex = countryNameIndex + 1; // 2019年は国名のすぐ次がデータ
    }

    // console.log(`[parseCSV ${year}] country: ${country}, countryNameIndex: ${countryNameIndex}, monthDataStartIndex: ${monthDataStartIndex}`);

    for (let month = 1; month <= 12; month++) {
      const travelerDataIndex = monthDataStartIndex + (month - 1) * 2;
      if (travelerDataIndex < columns.length) {
        const travelersString = columns[travelerDataIndex];
        const travelers = parseInt(travelersString, 10);
        if (!isNaN(travelers)) {
          const statEntry = {
            year,
            month,
            country,
            travelers,
          };
          monthlyStats.push(statEntry);
          // console.log(`[parseCSV ${year}] Added data:`, statEntry); // 詳細すぎるのでコメントアウトも検討
        } else {
            // console.warn(`Skipping invalid traveler data for ${country}, ${year}-${month}: ${travelersString}`);
        }
      } else {
        // console.warn(`Not enough columns for ${country}, ${year}-${month}`);
      }
    }
  }
  console.log(`[parseCSV] Finished parsing ${filePath}. Processed ${processedLines} lines, skipped ${skippedLinesCount} lines. Found ${monthlyStats.length} valid monthly stats entries.`);
  return monthlyStats;
}

async function main() {
  console.log('Start seeding ...');

  // 既存データをクリア
  await prisma.monthlyTravelerStats.deleteMany({});
  console.log('Deleted existing monthly traveler stats.');

  const data2019Path = path.join(__dirname, '../Data/2019_travelers.csv');
  const data2024Path = path.join(__dirname, '../Data/2024_travelers.csv');

  const stats2019 = await parseCSV(data2019Path, 2019, false);
  console.log(`[main] Parsed ${stats2019.length} entries from 2019 CSV.`);
  if (stats2019.length > 0) {
    await prisma.monthlyTravelerStats.createMany({
      data: stats2019,
    });
    console.log(`Seeded ${stats2019.length} records for 2019.`);
  } else {
    console.log('No data to seed for 2019.');
  }

  const stats2024 = await parseCSV(data2024Path, 2024, true);
  console.log(`[main] Parsed ${stats2024.length} entries from 2024 CSV.`);
  if (stats2024.length > 0) {
    await prisma.monthlyTravelerStats.createMany({
      data: stats2024,
    });
    console.log(`Seeded ${stats2024.length} records for 2024.`);
  } else {
    console.log('No data to seed for 2024.');
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
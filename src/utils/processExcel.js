import * as XLSX from 'xlsx';
import { validateWorkbook } from './validateWorkbook';

export const processExcelData = (workbook) => {
  validateWorkbook(workbook);

  // LINE CHART
  const lineSheet = XLSX.utils.sheet_to_json(workbook.Sheets['LineChart'], { header: 1 });
  const lineHeaders = lineSheet[0];
  const durationIndex = lineHeaders.indexOf('Duration Anos');
  const corporateIndex = lineHeaders.indexOf('Corporate DI');
  const engieIndex = lineHeaders.indexOf('Engie Brasil');

  const lineData = lineSheet.slice(1).map(row => ({
    'Duration Anos': row[durationIndex],
    'Corporate DI': row[corporateIndex],
    'Engie Brasil': row[engieIndex]
  }));

  // SCATTER CHART
  const scatterData = XLSX.utils.sheet_to_json(workbook.Sheets['ScatterPoints'], { defval: null });

  // BOX CHART
  const boxData = XLSX.utils.sheet_to_json(workbook.Sheets['BoxPlots'], { defval: null });

  return { lineData, scatterData, boxData };
};


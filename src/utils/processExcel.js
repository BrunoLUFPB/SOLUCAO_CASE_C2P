
import * as XLSX from 'xlsx';
import { validateWorkbook } from './validateWorkbook';

export const processExcelData = (workbook) => {
  validateWorkbook(workbook);

  const lineData = XLSX.utils.sheet_to_json(workbook.Sheets['LineChart'], { header: 1 })
    .slice(1)
    .map(row => ({
      'Duration Anos': row[0],
      'Corporate DI': row[1],
      'Engie Brasil': row[2]
    }));

  const scatterData = XLSX.utils.sheet_to_json(workbook.Sheets['ScatterPoints']);
  const boxData = XLSX.utils.sheet_to_json(workbook.Sheets['BoxPlots']);

  return { lineData, scatterData, boxData };
};

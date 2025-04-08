import * as XLSX from 'xlsx';

export const validateWorkbook = (workbook) => {
  const requiredSheets = {
    'LineChart': ['Duration Anos', 'Corporate DI', 'Engie Brasil'],
    'ScatterPoints': ['x', 'y', 'name'],
    'BoxPlots': ['x', 'y', 'name']
  };

  const missingSheets = [];
  const missingHeadersPerSheet = [];

  for (const [sheetName, requiredHeaders] of Object.entries(requiredSheets)) {
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      missingSheets.push(sheetName);
      continue;
    }

    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = data[0];

    if (!headers) {
      missingHeadersPerSheet.push({ sheet: sheetName, missing: requiredHeaders });
      continue;
    }

    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

    if (missingHeaders.length > 0) {
      missingHeadersPerSheet.push({ sheet: sheetName, missing: missingHeaders });
    }
  }

  if (missingSheets.length > 0) {
    throw new Error(
      `O arquivo está com abas ausentes: ${missingSheets.join(', ')}.`
    );
  }

  if (missingHeadersPerSheet.length > 0) {
    const details = missingHeadersPerSheet
      .map(({ sheet, missing }) => `Aba "${sheet}": ${missing.join(', ')}`)
      .join('\n');
    throw new Error(`O arquivo está com colunas faltantes:\n${details}`);
  }
};

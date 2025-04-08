import * as XLSX from 'xlsx';

/**
 * Valida a estrutura de um arquivo Excel, verificando abas e cabeçalhos obrigatórios
 * @throws {Error} Se houver abas ou colunas faltantes com mensagem detalhada
 */
export const validateWorkbook = (workbook) => {
  // Mapeamento das abas e colunas obrigatórias para cada tipo de gráfico
  const requiredSheets = {
    'LineChart': ['Duration Anos', 'Corporate DI', 'Engie Brasil'],
    'ScatterPoints': ['x', 'y', 'name'],
    'BoxPlots': ['x', 'y', 'name']
  };

  const missingSheets = [];
  const missingHeadersPerSheet = [];

  // Verifica cada aba requerida
  for (const [sheetName, requiredHeaders] of Object.entries(requiredSheets)) {
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      missingSheets.push(sheetName);
      continue;
    }

    // Converte a aba para array de arrays (matriz)
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = data[0];

    if (!headers) {
      missingHeadersPerSheet.push({ sheet: sheetName, missing: requiredHeaders });
      continue;
    }

    // Verifica se todos os cabeçalhos obrigatórios estão presentes
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

    if (missingHeaders.length > 0) {
      missingHeadersPerSheet.push({ sheet: sheetName, missing: missingHeaders });
    }
  }

  // Gera erros descritivos se houver problemas
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
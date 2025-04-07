export const validateWorkbook = (workbook) => {
    const requiredSheets = ['LineChart', 'ScatterPoints', 'BoxPlots'];
    const missingSheets = requiredSheets.filter(
      sheet => !workbook.SheetNames.includes(sheet)
    );
  
    if (missingSheets.length > 0) {
      throw new Error(`Planilhas obrigatórias faltando: ${missingSheets.join(', ')}`);
    }
  };
  
  
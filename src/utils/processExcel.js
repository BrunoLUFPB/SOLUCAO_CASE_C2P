import * as XLSX from 'xlsx';
import { validateWorkbook } from './validateWorkbook';

/**
 * Processa arquivo Excel e extrai dados estruturados para visualização
 * @param {Object} workbook - Objeto workbook do Excel (xlsx)
 * @returns {Object} Dados formatados para diferentes visualizações
 */
export const processExcelData = (workbook) => {
  validateWorkbook(workbook); // Valida estrutura mínima do arquivo

  // Processa dados para gráfico de linhas
  const lineSheet = XLSX.utils.sheet_to_json(workbook.Sheets['LineChart'], { header: 1 });
  const lineHeaders = lineSheet[0];
  // Mapeia índices das colunas para acesso dinâmico
  const durationIndex = lineHeaders.indexOf('Duration Anos');
  const corporateIndex = lineHeaders.indexOf('Corporate DI');
  const engieIndex = lineHeaders.indexOf('Engie Brasil');

  const lineData = lineSheet.slice(1).map(row => ({
    'Duration Anos': row[durationIndex],
    'Corporate DI': row[corporateIndex],
    'Engie Brasil': row[engieIndex]
  }));

  // Extrai dados brutos para outros gráficos (scatter e boxplot)
  const scatterData = XLSX.utils.sheet_to_json(workbook.Sheets['ScatterPoints'], { defval: null });
  const boxData = XLSX.utils.sheet_to_json(workbook.Sheets['BoxPlots'], { defval: null });

  return { lineData, scatterData, boxData };
};
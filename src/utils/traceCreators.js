import { COLOR_MAP, LINE_COLORS } from '../constants/colors';

/**
 * Cria traces para gráfico de linhas a partir dos dados processados
 * @param {Array} lineData - Dados formatados para o gráfico de linhas
 * @returns {Array} Traces prontos para plotagem (com validação de dados)
 */
export const createLineTraces = (lineData) => {
  const traces = [];
  const duration = lineData.map(item => item['Duration Anos']); // Eixo X compartilhado

  const createLineTrace = (label) => {
    const yValues = lineData.map(item => item[label]);
    const hasValid = yValues.some(val => typeof val === 'number' && !isNaN(val)); // Valida dados

    if (!hasValid) return null; // Ignora séries sem dados válidos

    return {
      x: duration,
      y: yValues,
      mode: 'lines',
      name: label,
      line: { color: LINE_COLORS[label], width: 2 }, // Cores padronizadas
      marker: { size: 8 }
    };
  };

  // Cria traces para cada série (com fallback seguro)
  const corporateTrace = createLineTrace('Corporate DI');
  const engieTrace = createLineTrace('Engie Brasil');

  return [corporateTrace, engieTrace].filter(Boolean); // Remove nulls
};

/**
 * Cria traces para gráfico de dispersão
 * @param {Array} scatterData - Dados brutos do scatter plot
 * @returns {Array} Traces formatados com estilização consistente
 */
export const createScatterTraces = (scatterData) =>
  scatterData
    .filter(point => point.x != null && point.y != null && point.name) // Filtra dados incompletos
    .map(point => ({
      x: [point.x], // Plotly requer arrays mesmo para pontos únicos
      y: [point.y],
      mode: 'markers',
      name: point.name,
      marker: {
        symbol: 'circle',
        size: 14,
        color: COLOR_MAP[point.name], // Mapeamento de cores por classe
        line: { width: 1.5, color: '#000000' } // Borda preta
      }
    }));

/**
 * Transforma dados brutos em traces para boxplot
 * @param {Array} boxData - Dados no formato {x, y: "[val1,val2,...]", name}
 * @returns {Array} Traces de boxplot com tratamento especial para string de valores
 */
export const createBoxTraces = (boxData) =>
  boxData
    .filter(box => box.x != null && typeof box.y === 'string' && box.name) // Valida estrutura
    .map(box => {
      // Converte string "[1,2,3]" para array numérico
      const values = box.y
        .replace(/[[\]']/g, '')
        .split(',')
        .map(v => parseFloat(v.trim()))
        .filter(v => !isNaN(v)); // Limpeza de dados

      if (!values.length) return null; // Descarta boxes vazios

      return {
        x: Array(values.length).fill(box.x), // Posicionamento no eixo X
        y: values,
        type: 'box',
        name: box.name,
        boxpoints: 'outliers', // Mostra apenas outliers
        fillcolor: COLOR_MAP[box.name], // Preenchimento padronizado
        line: { color: 'black', width: 2.5 }, // Estilo consistente
        width: 0.2 // Largura estreita para melhor visualização
      };
    })
    .filter(Boolean); // Remove entradas inválidas
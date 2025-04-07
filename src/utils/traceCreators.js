//import { COLOR_MAP } from '../constants/colors';

import { COLOR_MAP, LINE_COLORS } from '../constants/colors';

export const createLineTraces = (lineData) => [
  {
    x: lineData.map(item => item['Duration Anos']),
    y: lineData.map(item => item['Corporate DI']),
    mode: 'lines',
    name: 'Corporate DI',
    line: { color: LINE_COLORS['Corporate DI'], width: 2 },
    marker: { size: 8 }
  },
  {
    x: lineData.map(item => item['Duration Anos']),
    y: lineData.map(item => item['Engie Brasil']),
    mode: 'lines',
    name: 'Engie Brasil',
    line: { color: LINE_COLORS['Engie Brasil'], width: 2 },
    marker: { size: 8 }
  }
];

// ... (restante das funções mantém a mesma implementação)

export const createScatterTraces = (scatterData) =>
  scatterData.map(point => ({
    x: [point.x],
    y: [point.y],
    mode: 'markers',
    name: point.name,
    marker: {
      symbol: 'circle',
      size: 14,
      color: COLOR_MAP[point.name],
      line: { width: 1.5, color: '#000000' }
    }
  }));

export const createBoxTraces = (boxData) =>
  boxData.map(box => {
    if (typeof box.y !== 'string') {
      console.error('box.y deve ser uma string contendo array', box);
      return null;
    }

    const values = box.y
      .replace(/[[\]']/g, '')
      .split(',')
      .map(Number);

    if (values.some(isNaN)) {
      console.error('Valores inválidos em box.y', box.y);
      return null;
    }

    return {
      x: Array(values.length).fill(box.x),
      y: values,
      type: 'box',
      name: box.name,
      boxpoints: 'outliers',
      pointpos: 0,
      jitter: 0,
      fillcolor: COLOR_MAP[box.name],
      marker: {
        size: 3,
        color: 'black',
        symbol: 'circle'
      },
      line: {
        color: 'black',
        width: 2.5 
      },
      width: 0.2
    };
  }).filter(Boolean);

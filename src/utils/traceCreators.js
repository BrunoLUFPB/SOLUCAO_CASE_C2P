import { COLOR_MAP, LINE_COLORS } from '../constants/colors';

export const createLineTraces = (lineData) => {
  const traces = [];

  const duration = lineData.map(item => item['Duration Anos']);

  const createLineTrace = (label) => {
    const yValues = lineData.map(item => item[label]);
    const hasValid = yValues.some(val => typeof val === 'number' && !isNaN(val));

    if (!hasValid) return null;

    return {
      x: duration,
      y: yValues,
      mode: 'lines',
      name: label,
      line: { color: LINE_COLORS[label], width: 2 },
      marker: { size: 8 }
    };
  };

  const corporateTrace = createLineTrace('Corporate DI');
  const engieTrace = createLineTrace('Engie Brasil');

  return [corporateTrace, engieTrace].filter(Boolean);
};

export const createScatterTraces = (scatterData) =>
  scatterData
    .filter(point => point.x != null && point.y != null && point.name)
    .map(point => ({
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
  boxData
    .filter(box => box.x != null && typeof box.y === 'string' && box.name)
    .map(box => {
      const values = box.y
        .replace(/[[\]']/g, '')
        .split(',')
        .map(v => parseFloat(v.trim()))
        .filter(v => !isNaN(v));

      if (!values.length) return null;

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
    })
    .filter(Boolean);

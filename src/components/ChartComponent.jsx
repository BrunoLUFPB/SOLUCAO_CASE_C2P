import React, { useState } from 'react';
import CustomPlot from './CustomPlot'; // Importe seu componente personalizado
import * as XLSX from 'xlsx';
import { PLOT_CONSTANTS } from '../constants/plotConstants';

const COLOR_MAP = {
  'ENGIA0': '#FF0000',    // Vermelho
  'ENGIA1': '#00FF00',    // Verde
  'ENGIA2': '#0000FF',    // Azul
  'ENGIB2': '#FFA500',    // Laranja
  'ENGIC3': '#800080'     // Roxo
};

const ChartComponent = () => {
  const [data, setData] = useState([]);

  const processExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'array' });
      
      const lineData = XLSX.utils.sheet_to_json(workbook.Sheets['LineChart'], { header: 1 })
        .slice(1)
        .map(row => ({
          'Duration Anos': row[0],
          'Corporate DI': row[1],
          'Engie Brasil': row[2]
        }));

      const scatterData = XLSX.utils.sheet_to_json(workbook.Sheets['ScatterPoints']);
      const boxData = XLSX.utils.sheet_to_json(workbook.Sheets['BoxPlots']);

      formatPlotData(lineData, scatterData, boxData);
    };
    reader.readAsArrayBuffer(file);
  };

  const formatPlotData = (lineData, scatterData, boxData) => {
    const traces = [];
    
    // Linhas temporais
    traces.push({
      x: lineData.map(item => item['Duration Anos']),
      y: lineData.map(item => item['Corporate DI']),
      mode: 'lines+markers',
      name: 'Corporate DI',
      line: { color: '#1f77b4', width: 2 },
      marker: { size: 8 }
    });

    traces.push({
      x: lineData.map(item => item['Duration Anos']),
      y: lineData.map(item => item['Engie Brasil']),
      mode: 'lines+markers',
      name: 'Engie Brasil',
      line: { color: '#ff7f0e', width: 2 },
      marker: { size: 8 }
    });

    // Pontos Scatter
    scatterData.forEach(point => {
      traces.push({
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
      });
    });

    // Boxplots
    boxData.forEach(box => {
      const values = box.y
        .replace(/[[\]']/g, '')
        .split(',') 
        .map(Number);

      traces.push({
        x: [box.x],
        y: values,
        type: 'box',
        name: box.name,
        boxpoints: 'all',
        jitter: 0.3,
        fillcolor: COLOR_MAP[box.name],
        line: { color: COLOR_MAP[box.name] }
      });
    });

    setData(traces);
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => processExcel(e.target.files[0])}
        style={{ marginBottom: '20px' }}
      />
      
      <CustomPlot data={data} />
    </div>
  );
};

export default ChartComponent;

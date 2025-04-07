import React, { useState } from 'react';
import CustomPlot from './CustomPlot';
import * as XLSX from 'xlsx';
import { PLOT_CONSTANTS } from '../constants/plotConstants';

// Constants
const COLOR_MAP = {
  'ENGIA0': '#FF0000',    // Vermelho
  'ENGIA1': '#00FF00',    // Verde
  'ENGIA2': '#0000FF',    // Azul
  'ENGIB2': '#FFA500',    // Laranja
  'ENGIC3': '#800080'     // Roxo
};

// Trace Creators (Strategy Pattern)
const createLineTraces = (lineData) => {
  return [
    {
      x: lineData.map(item => item['Duration Anos']),
      y: lineData.map(item => item['Corporate DI']),
      mode: 'lines+markers',
      name: 'Corporate DI',
      line: { color: '#1f77b4', width: 2 },
      marker: { size: 8 }
    },
    {
      x: lineData.map(item => item['Duration Anos']),
      y: lineData.map(item => item['Engie Brasil']),
      mode: 'lines+markers',
      name: 'Engie Brasil',
      line: { color: '#ff7f0e', width: 2 },
      marker: { size: 8 }
    }
  ];
};

const createScatterTraces = (scatterData) => {
  return scatterData.map(point => ({
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
};

const createBoxTraces = (boxData) => {
  return boxData.map(box => {
    const values = box.y
      .replace(/[[\]']/g, '')
      .split(',') 
      .map(Number);

    return {
      x: [box.x],
      y: values,
      type: 'box',
      name: box.name,
      boxpoints: 'all',
      jitter: 0.3,
      fillcolor: COLOR_MAP[box.name],
      line: { color: COLOR_MAP[box.name] }
    };
  });
};

// Data Processor
const processExcelData = (workbook) => {
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

// Main Component
const ChartComponent = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'array' });
      const { lineData, scatterData, boxData } = processExcelData(workbook);
      
      const traces = [
        ...createLineTraces(lineData),
        ...createScatterTraces(scatterData),
        ...createBoxTraces(boxData)
      ];
      
      setData(traces);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => handleFileUpload(e.target.files[0])}
        style={{ marginBottom: '20px' }}
      />
      
      <CustomPlot data={data} />
    </div>
  );
};

export default ChartComponent;

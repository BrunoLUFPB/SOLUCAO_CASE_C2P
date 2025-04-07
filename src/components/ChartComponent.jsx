import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

// Validação do Workbook
const validateWorkbook = (workbook) => {
  const requiredSheets = ['LineChart', 'ScatterPoints', 'BoxPlots'];
  const missingSheets = requiredSheets.filter(
    sheet => !workbook.SheetNames.includes(sheet)
  );

  if (missingSheets.length > 0) {
    throw new Error(`Planilhas obrigatórias faltando: ${missingSheets.join(', ')}`);
  }
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
      x: [box.x],
      y: values,
      type: 'box',
      name: box.name,
      boxpoints: 'all',
      jitter: 0.3,
      fillcolor: COLOR_MAP[box.name],
      line: { color: COLOR_MAP[box.name] }
    };
  }).filter(Boolean);
};

// Data Processor
const processExcelData = (workbook) => {
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

// Main Component
const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (file) => {
    setError(null);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'array' });
        const { lineData, scatterData, boxData } = processExcelData(workbook);
        
        const traces = [
          ...createLineTraces(lineData),
          ...createScatterTraces(scatterData),
          ...createBoxTraces(boxData)
        ].filter(Boolean);
        
        setData(traces);
      } catch (error) {
        console.error('Erro ao processar arquivo:', error);
        setError(error.message);
        setData([]);
      }
    };

    reader.onerror = () => {
      setError('Erro ao ler o arquivo. Tente novamente.');
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
      
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          {error}
        </div>
      )}
      
      <CustomPlot data={data} />
    </div>
  );
};

// Definição dos PropTypes
ChartComponent.propTypes = {
  // Campo vazio destinado a receber props no futuro
};

// Validação da estrutura de dados
const tracePropTypes = PropTypes.shape({
  x: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  ).isRequired,
  y: PropTypes.arrayOf(PropTypes.number).isRequired,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  marker: PropTypes.shape({
    symbol: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    line: PropTypes.shape({
      width: PropTypes.number,
      color: PropTypes.string
    })
  }),
  line: PropTypes.shape({
    color: PropTypes.string,
    width: PropTypes.number
  })
});

export default ChartComponent;

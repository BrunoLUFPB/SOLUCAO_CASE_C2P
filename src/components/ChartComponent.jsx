import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomPlot from './CustomPlot';
import * as XLSX from 'xlsx';
import { COLOR_MAP } from '../constants/colors';
import { processExcelData } from '../utils/processExcel';
import { createLineTraces, createScatterTraces, createBoxTraces } from '../utils/traceCreators';

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
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <CustomPlot data={data} />
    </div>
  );
};

ChartComponent.propTypes = {
  // Props podem ser adicionadas aqui quando necessário
};

export default ChartComponent;
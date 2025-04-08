import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import CustomPlot from './CustomPlot';
import * as XLSX from 'xlsx';
import Plotly from 'plotly.js-dist-min';
import { processExcelData } from '../utils/processExcel';
import {createLineTraces,createScatterTraces,createBoxTraces} from '../utils/traceCreators';

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const plotRef = useRef(null);
  const plotInstanceRef = useRef(null);

  const handleFileUpload = (file) => {
    setError(null);
    setData([]);

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
      setError('O arquivo selecionado não é um Excel válido com múltiplas abas.');
      return;
    }

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

  const exportJPEG = () => {
    const plotElement = plotInstanceRef.current;
    if (!plotElement) return;

    Plotly.downloadImage(plotElement, {
      format: 'jpeg',
      filename: 'grafico_exportado',
      width: 1200,
      height: 700
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />

        <button
          onClick={exportJPEG}
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Exportar JPEG
        </button>
      </div>

      <div
        style={{
          fontSize: '0.9rem',
          color: '#856404',
          backgroundColor: '#fff3cd',
          padding: '8px',
          borderRadius: '4px',
          marginBottom: '15px',
          border: '1px solid #ffeeba'
        }}
      >
        Apenas arquivos <strong>.xlsx</strong> ou <strong>.xls</strong> (contendo as abas <em>LineChart</em>, <em>ScatterPoints</em> e <em>BoxPlots</em>), pois é o único tipo de Excel válido com múltiplas abas.
      </div>

      {error && (
        <div style={{ color: '#dc3545', marginBottom: '15px', fontWeight: 'bold' }}>
          {error}
        </div>
      )}

      <CustomPlot
        data={data}
        plotRef={plotRef}
        onInitialized={(figure, graphDiv) => {
          plotInstanceRef.current = graphDiv;
        }}
      />
    </div>
  );
};

ChartComponent.propTypes = {
  // Props podem ser adicionadas aqui quando necessário
};

export default ChartComponent;

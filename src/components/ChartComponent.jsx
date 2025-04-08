import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import CustomPlot from './CustomPlot';
import * as XLSX from 'xlsx';
import Plotly from 'plotly.js-dist-min';
import { processExcelData } from '../utils/processExcel';
import { createLineTraces, createScatterTraces, createBoxTraces } from '../utils/traceCreators';
import { chartComponentStyles } from '../styles/plotStyles';

/**
 * Componente principal para visualização e exportação de gráficos a partir de dados Excel.
 * Suporta múltiplos tipos de gráficos (linha, dispersão e boxplot) em um único plot.
 */
const ChartComponent = () => {
  // Estado para armazenar os dados processados dos gráficos
  const [data, setData] = useState([]);
  // Estado para tratamento de erros durante o processamento
  const [error, setError] = useState(null);
  // Refs para manipulação direta do componente Plotly
  const plotRef = useRef(null);
  const plotInstanceRef = useRef(null);

  /**
   * Manipula o upload do arquivo Excel, processando seus dados e gerando os gráficos correspondentes.
   * @param {File} file - Arquivo Excel contendo as abas com dados para os gráficos
   */
  const handleFileUpload = (file) => {
    // Reset do estado quando não há arquivo (usuário cancelou)
    if (!file) {
      setError(null); 
      return;
    }

    // Reset dos estados antes do novo processamento
    setError(null);
    setData([]);

    // Validação do tipo de arquivo
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
      setError('O arquivo selecionado não é um Excel válido com múltiplas abas.');
      return;
    }

    const reader = new FileReader();

    // Callback assíncrono para quando a leitura do arquivo estiver completa
    reader.onload = (e) => {
      try {
        // Processamento do workbook Excel
        const workbook = XLSX.read(e.target.result, { type: 'array' });
        
        // Extração e transformação dos dados de cada aba
        const { lineData, scatterData, boxData } = processExcelData(workbook);

        // Criação dos traces para cada tipo de gráfico
        const traces = [
          ...createLineTraces(lineData),
          ...createScatterTraces(scatterData),
          ...createBoxTraces(boxData)
        ].filter(Boolean); // Filtro para remover traces inválidos

        setData(traces);
      } catch (error) {
        console.error('Erro ao processar arquivo:', error);
        setError(error.message);
        setData([]);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  /**
   * Exporta o gráfico atual como imagem JPEG
   */
  const exportJPEG = () => {
    if (!plotInstanceRef.current) return;

    // Utiliza a API do Plotly para gerar e baixar a imagem
    Plotly.downloadImage(plotInstanceRef.current, {
      format: 'jpeg',
      filename: 'grafico_exportado',
      width: 1200,
      height: 700
    });
  };

  return (
    <div style={chartComponentStyles.mainContainer}>
      {/* Controles de upload e exportação */}
      <div style={chartComponentStyles.uploadContainer}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => handleFileUpload(e.target.files?.[0])}
        />

        <button
          onClick={exportJPEG}
          style={chartComponentStyles.exportButton}
          disabled={!data.length} // Botão só habilitado quando há dados
        >
          Exportar JPEG
        </button>
      </div>

      {/* Mensagem informativa sobre os requisitos do arquivo */}
      <div style={chartComponentStyles.alertMessage}>
        Apenas arquivos <strong>.xlsx</strong> ou <strong>.xls</strong> (contendo as abas <em>LineChart</em>, <em>ScatterPoints</em> e <em>BoxPlots</em>), pois é o único tipo de Excel válido com múltiplas abas.
      </div>

      {/* Exibição de erros durante o processamento */}
      {error && (
        <div style={chartComponentStyles.errorMessage}>
          {error}
        </div>
      )}

      {/* Componente de gráfico customizado */}
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

// PropTypes podem ser adicionadas conforme a evolução do componente
ChartComponent.propTypes = {
  // Props podem ser adicionadas aqui quando necessário
};

export default ChartComponent;
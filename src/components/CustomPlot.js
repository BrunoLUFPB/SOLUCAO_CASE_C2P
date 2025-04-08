import React from 'react';
import Plot from 'react-plotly.js';
import { PLOT_CONSTANTS, PLOT_STYLE } from '../constants/plotConstants';

// Estilos do gráfico separados para melhor organização e reuso
const plotStyles = {
  container: {
    margin: '20px 0',
    position: 'relative'
  },
  plot: PLOT_STYLE // Reutiliza estilos padrão definidos em constants
};

/**
 * Componente CustomPlot - Cria um gráfico Plotly configurável com estilos padronizados
 * 
 * @param {Object} props - Props do componente
 * @param {Array} props.data - Dados para renderização do gráfico
 * @param {React.Ref} props.plotRef - Referência para acesso direto à instância do Plotly
 * @param {Function} props.onInitialized - Callback chamado após inicialização/atualização do gráfico
 * 
 * Observações:
 * - Utiliza constantes para configurações visuais (PLOT_CONSTANTS) para facilitar manutenção
 * - Configurações responsivas são habilitadas por padrão
 * - O callback onInitialized é usado tanto para inicialização quanto atualizações
 */
const CustomPlot = ({ data, plotRef, onInitialized }) => {
  return (
    <div style={plotStyles.container}>
      <Plot
        ref={plotRef}
        data={data}
        layout={{
          title: PLOT_CONSTANTS.LAYOUT.TITLE,
          showlegend: true,
          xaxis: {
            title: {
              text: PLOT_CONSTANTS.AXES.X.TITLE,
              font: PLOT_CONSTANTS.AXES.X.TITLE_FONT
            },
            tickvals: PLOT_CONSTANTS.AXES.X.TICKS,
            range: PLOT_CONSTANTS.AXES.X.RANGE,
            gridcolor: PLOT_CONSTANTS.LAYOUT.GRID_COLOR
          },
          yaxis: {
            title: {
              text: PLOT_CONSTANTS.AXES.Y.TITLE,
              font: PLOT_CONSTANTS.AXES.Y.TITLE_FONT
            },
            range: PLOT_CONSTANTS.AXES.Y.RANGE,
            gridcolor: PLOT_CONSTANTS.LAYOUT.GRID_COLOR,
            autorange: PLOT_CONSTANTS.AXES.Y.AUTORANGE
          },
          plot_bgcolor: PLOT_CONSTANTS.LAYOUT.BACKGROUND.PLOT,
          paper_bgcolor: PLOT_CONSTANTS.LAYOUT.BACKGROUND.PAPER,
          legend: PLOT_CONSTANTS.LAYOUT.LEGEND,
          margin: PLOT_CONSTANTS.LAYOUT.MARGIN
        }}
        style={plotStyles.plot}
        config={{ responsive: true }} // Habilita comportamento responsivo
        useResizeHandler={true} // Redimensiona automaticamente com a janela
        onInitialized={onInitialized}
        onUpdate={onInitialized} // Reutiliza o mesmo callback para atualizações
      />
    </div>
  );
};

export default CustomPlot;

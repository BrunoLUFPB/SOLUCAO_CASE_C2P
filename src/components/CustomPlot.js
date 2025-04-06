// src/components/CustomPlot.js
import React from 'react';
import Plot from 'react-plotly.js';
import { PLOT_CONSTANTS } from '../constants/plotConstants';

// Estilos mínimos necessários (sem arquivo separado)
const plotStyles = {
  container: {
    margin: '20px 0',
    position: 'relative'
  },
  plot: {
    width: '100%',
    height: '700px'
  }
};

const CustomPlot = ({ data }) => {
  return (
    <div style={plotStyles.container}>
      <Plot
        data={data}
        layout={{
          title: PLOT_CONSTANTS.LAYOUT.TITLE,
          showlegend: true,
          xaxis: {
            title: PLOT_CONSTANTS.AXES.X.TITLE,
            tickvals: PLOT_CONSTANTS.AXES.X.TICKS,
            range: PLOT_CONSTANTS.AXES.X.RANGE,
            gridcolor: PLOT_CONSTANTS.LAYOUT.GRID_COLOR
          },
          yaxis: {
            title: PLOT_CONSTANTS.AXES.Y.TITLE,
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
        config={{ responsive: true }}
        useResizeHandler={true}
      />
    </div>
  );
};

export default CustomPlot;

import React from 'react';
import Plot from 'react-plotly.js';
import { PLOT_CONSTANTS, PLOT_STYLE } from '../constants/plotConstants';

const plotStyles = {
  container: {
    margin: '20px 0',
    position: 'relative'
  },
  plot: PLOT_STYLE
};

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
        config={{ responsive: true }}
        useResizeHandler={true}
        onInitialized={onInitialized}
        onUpdate={onInitialized} 
      />
    </div>
  );
};

export default CustomPlot;

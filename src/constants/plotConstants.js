// src/constants/plotConstants.js
export const PLOT_CONSTANTS = {
    LAYOUT: {
      TITLE: 'Análise Combinada - Case C2P',
      GRID_COLOR: '#f0f0f0',
      BACKGROUND: {
        PLOT: '#ffffff',
        PAPER: '#f9f9f9'
      },
      MARGIN: { r: 150 },
      LEGEND: { x: 1.05, y: 0.5 }
    },
    AXES: {
      X: {
        TITLE: 'Duration (Anos)',
        TICKS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        RANGE: [-0.5, 10.5]
      },
      Y: {
        TITLE: 'Valores',
        RANGE: [0, 10],
        AUTORANGE: false
      }
    }
  };
  
  export const PLOT_STYLE = {
    width: '100%',
    height: '700px'
  };
  
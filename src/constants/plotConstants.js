/**
 * Configurações padronizadas para gráficos Plotly no projeto
 * Centraliza estilos e parâmetros para manter consistência visual
 */

export const PLOT_CONSTANTS = {
  LAYOUT: {
    TITLE: 'Análise Combinada - Case C2P', 
    GRID_COLOR: '#f0f0f0', 
    BACKGROUND: {
      PLOT: '#ffffff',     
      PAPER: '#f9f9f9'     
    },
    MARGIN: { r: 150 },    // Margem extra à direita para a legenda
    LEGEND: { x: 1.05, y: 0.5 } // Posição customizada da legenda
  },
  AXES: {
    X: {
      TITLE: 'Duration Anos',  
      TICKS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
      RANGE: [-0.5, 10.5], 
      TITLE_FONT: {
        family: 'Arial', 
        size: 12,
        color: '#333' 
      }
    },
    Y: {
      TITLE: 'Spreads a.a.', 
      RANGE: [0, 10],       
      AUTORANGE: false,    
      TITLE_FONT: {
        family: 'Arial',
        size: 12,
        color: '#333'
      }
    }
  }
};

// Dimensões padrão para todos os gráficos
export const PLOT_STYLE = {
  width: '100%',  // Gráficos responsivos por padrão
  height: '700px' // Altura fixa para uniformidade
};
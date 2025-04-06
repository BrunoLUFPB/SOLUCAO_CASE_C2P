// src/styles/plotStyles.js
export const plotContainerStyles = {
    base: {
      position: 'relative',
      margin: '20px auto',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    },
    responsive: {
      small: {
        height: '400px'
      },
      medium: {
        height: '550px'
      },
      large: {
        height: '700px'
      }
    }
  };
  
  export const plotTooltipStyles = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px',
    padding: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid #ddd',
    borderRadius: '4px'
  };
  
  // Estilos para o modo dark (opcional)
  export const darkModeStyles = {
    plot_bgcolor: '#1e1e1e',
    paper_bgcolor: '#2d2d2d',
    font: {
      color: '#ffffff'
    },
    gridcolor: '#444444'
  };
  
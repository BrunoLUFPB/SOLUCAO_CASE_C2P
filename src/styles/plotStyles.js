/**
 * Estilos para o container principal do gráfico Plotly.
 * Define a base visual e variações responsivas para diferentes tamanhos de tela.
 */
export const plotContainerStyles = {
  // Estilo base com sombra e bordas arredondadas para elevação visual
  base: {
    position: 'relative',
    margin: '20px auto',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
    backgroundColor: '#fff' 
  },
  // Variações de altura para diferentes breakpoints
  responsive: {
    small: {
      height: '400px' // Mobile
    },
    medium: {
      height: '550px' // Tablet
    },
    large: {
      height: '700px' // Desktop
    }
  }
};

/**
 * Estilos customizados para tooltips dos gráficos.
 * Otimizados para legibilidade e integração visual com o tema claro.
 */
export const plotTooltipStyles = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '12px', 
  padding: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
  border: '1px solid #ddd',
  borderRadius: '4px' 
};

/**
 * Estilos para o componente principal de gráficos.
 * Organizado por seções funcionais (container, upload, mensagens).
 */
export const chartComponentStyles = {
  // Container principal com padding generoso
  mainContainer: {
    padding: '20px'
  },
  // Container flex para alinhamento preciso dos controles
  uploadContainer: {
    display: 'flex',
    alignItems: 'center', 
    gap: '10px',
    marginBottom: '10px'
  },
  // Estilo do botão com feedback visual claro (hover poderia ser adicionado)
  exportButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '8px 12px', 
    borderRadius: '4px',
    cursor: 'pointer'
  },
  // Mensagem informativa com estilo de alerta amigável
  alertMessage: {
    fontSize: '0.9rem',
    color: '#856404', 
    backgroundColor: '#fff3cd', 
    padding: '8px',
    borderRadius: '4px',
    marginBottom: '15px',
    border: '1px solid #ffeeba' 
  },

  errorMessage: {
    color: '#dc3545',
    marginBottom: '15px',
    fontWeight: 'bold' 
  }
};

/**
 * Tema dark mode para os gráficos Plotly.
 * Cores cuidadosamente escolhidas para contraste e legibilidade.
 */
export const darkModeStyles = {
  plot_bgcolor: '#1e1e1e', 
  paper_bgcolor: '#2d2d2d',
  font: {
    color: '#ffffff' 
  },
  gridcolor: '#444444' 
};
import ChartComponent from './components/ChartComponent';

/**
 * Componente raiz da aplicação - Renderiza o layout básico e o gráfico principal
 */
function App() {
  return (
    <div className="App">
      <h1>Case C2P - Análise de Dados</h1> 
      <ChartComponent /> {/* Componente principal de visualização */}
    </div>
  );
}

export default App;
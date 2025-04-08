---

# 📊 **Case C2P - Análise de Dados com React + Plotly + Node**

Este projeto foi desenvolvido como parte de um **case técnico para uma vaga de estágio Full Stack**. A proposta consistia em construir uma aplicação que **exibe visualizações gráficas** baseadas em dados fornecidos via planilha Excel, utilizando **React**, **Plotly.js**, **Node.js**, e **Excel Processing** no frontend.

---

## 🚀 **Tecnologias Utilizadas**

- 🧠 **React.js** — Frontend SPA moderno
- 📈 **Plotly.js** — Biblioteca para gráficos interativos
- 📁 **SheetJS (xlsx)** — Leitura e tratamento de arquivos Excel
- 🎨 **CSS** — Estilização básica
- 📦 **Node.js / Express** — Para possível backend (futuras versões)

---

## 💻 **Como rodar o projeto localmente**

1. **Clone o repositório**

```bash
git clone <https://github.com/BrunoLUFPB/SOLUCAO_CASE_C2P.git>
cd CASE_C2P
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie o frontend**

```bash
npm start
```

4. Acesse [http://localhost:3000](http://localhost:3000/) no navegador 🚀

---

## 🧠 **Como funciona**

A aplicação permite que o usuário **importe um arquivo .xlsx** com dados em três abas distintas:

- **LineChart**: Geração de gráfico de linhas com dados temporais
- **ScatterPoints**: Exibe pontos individuais sobrepostos ao gráfico
- **BoxPlots**: Visualização de distribuição com boxplots

Esses dados são lidos e tratados no frontend usando a biblioteca **SheetJS (XLSX)**, e então renderizados usando o **react-plotly.js**.

---

## 📁 **Estrutura do Projeto**

```
SOLUCAO_CASE_C2P-main/
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    ├── setupTests.js
    ├── components/
    │   ├── ChartComponent.jsx     # Componente principal de visualização
    │   └── CustomPlot.js          # Componente de plotagem customizada (abstração do Plotly)
    ├── constants/
    │   ├── colors.js              # Mapeamento de cores por categoria
    │   └── plotConstants.js       # Constantes globais para os gráficos
    ├── styles/
    │   └── plotStyles.js          # Estilos reutilizáveis para gráficos
    └── utils/
        ├── processExcel.js        # Função principal de tratamento dos dados Excel
        ├── traceCreators.js       # Criação dos traces (Line, Scatter, Box)
        └── validateWorkbook.js    # Validação e tratamento de erros do Excel
```

---

## 🧩 **Componentes e Lógica - Explicação Detalhada**

### **`ChartComponent.jsx` - O Coração da Visualização**

O **`ChartComponent.jsx`** é responsável por:

1. **Carregar o arquivo Excel** através de `FileReader`.
2. **Validar o formato do arquivo** para garantir que ele contenha as abas necessárias.
3. **Processar os dados** utilizando a função `processExcelData`, que separa os dados de cada aba e retorna o formato adequado para Plotly.
4. **Renderizar os gráficos interativos** utilizando `Plotly.js` e o componente `<Plot />`.

#### **Fluxo de Processamento**:

1. **Upload do Arquivo**: O arquivo `.xlsx` ou `.xls` é carregado pelo usuário.
2. **Leitura e Validação**: O arquivo é lido com `SheetJS` e validado pela função `validateWorkbook()`.
3. **Processamento dos Dados**: Os dados das abas `LineChart`, `ScatterPoints`, e `BoxPlots` são extraídos e convertidos para o formato adequado.
4. **Geração de Traces**: Traces são gerados para os tipos de gráfico `line`, `scatter` e `box` através das funções `createLineTraces`, `createScatterTraces` e `createBoxTraces`.
5. **Renderização**: O gráfico é renderizado na tela usando o componente `CustomPlot`, que integra o `Plotly.js`.

**Observação**: Para o código completo, acesse o arquivo `ChartComponent.jsx` na pasta `src/components/`.

---

### ⚡ **Recursos Avançados Utilizados**
- **Leitura e Validação de Arquivos Excel**: Utilizando a biblioteca `SheetJS` para leitura e validação de abas e colunas.
- **Processamento Dinâmico de Dados**: A função `processExcelData` garante que os dados sejam lidos de maneira flexível e que os gráficos sejam renderizados corretamente.
- **Exportação de Gráficos**: Funcionalidade para exportar os gráficos interativos para arquivos de imagem (JPEG).
- **Customização de Gráficos**: Utilização de um `CustomPlot` para encapsular a renderização do gráfico, permitindo maior controle sobre o layout, estilos e interatividade.

---

### 🌐 **Diagrama de Fluxo**

```
[Arquivo XLSX] → [Leitura com SheetJS] →
    ↓
[Validação de Abas e Colunas] → [Conversão para JSON] →
    ↓
[Criação de Traces] → [Renderização no Plotly] → [Exibição do Gráfico Interativo]
```

---

### 🏆 **Diferenciais do Projeto**

- ✅ **Upload e processamento de Excel 100% client-side**: Sem necessidade de backend.
- ✅ **Combinação de múltiplos tipos de visualização**: Gráficos de linha, dispersão e boxplot no mesmo gráfico.
- ✅ **Interatividade nativa**: Zoom, tooltips e toggle de legendas.
- ✅ **Sistema de cores consistente** por categoria, melhorando a legibilidade e compreensão dos dados.
- ✅ **Exportação de gráficos** para JPEG, proporcionando flexibilidade ao usuário.
- ✅ **Validação robusta de arquivos e dados**, garantindo dados de entrada corretos e mensagens de erro informativas:
  1. **Validação de Arquivo**: Verifica se o arquivo é do tipo `.xlsx` ou `.xls`. Caso contrário, exibe uma mensagem de erro informativa.
  2. **Validação de Abas**: Verifica se o arquivo Excel contém as abas necessárias: `LineChart`, `ScatterPoints`, e `BoxPlots`.
  3. **Validação de Colunas**:
     - **LineChart**: Verifica se as colunas `Duration Anos`, `Corporate DI`, e `Engie Brasil` estão presentes.
     - **ScatterPoints**: Verifica se as colunas `x`, `y`, e `name` estão presentes.
     - **BoxPlots**: Verifica se as colunas `x`, `y`, e `name` estão presentes.
  4. **Tratamento de Dados**:
     - **LineChart**: Os dados são extraídos e mapeados corretamente para o formato de gráficos de linha.
     - **ScatterPoints**: Filtragem de pontos com valores válidos para `x` e `y`.
     - **BoxPlots**: Tratamento de valores de distribuição (strings para arrays de números).
  5. **Erros Informativos**: Caso alguma aba ou coluna esteja faltando, a aplicação exibe uma mensagem clara de erro, ajudando o usuário a corrigir rapidamente.
  6. **Feedback Visual**: Mensagens de erro e aviso são exibidas de forma destacada, melhorando a experiência do usuário.

---

### **👨‍💻 Autor**

Desenvolvido com 💙 por **Bruno Luís Silva Guedes**  
🔗 [LinkedIn](https://www.linkedin.com/in/bruno-luis-8a730b220/)

---

### **📝 Licença**

Este projeto está sob a licença MIT.

---



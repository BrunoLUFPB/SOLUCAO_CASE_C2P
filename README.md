
```markdown
# 📊 Case C2P - Análise de Dados com React + Plotly + Node

Este projeto foi desenvolvido como parte de um case técnico para uma vaga de estágio **Full Stack**. A proposta consistia em construir uma aplicação que **exibe visualizações gráficas** baseadas em dados fornecidos via planilha Excel, utilizando tecnologias como **React**, **Plotly.js** e **Node.js**.

---

## 🚀 Tecnologias Utilizadas

- 🧠 **React.js** — Frontend SPA moderno
- 📈 **Plotly.js** — Biblioteca para gráficos interativos
- 📁 **SheetJS (xlsx)** — Leitura e tratamento de arquivos Excel
- 🎨 **CSS** — Estilização básica
- 📦 **Node.js / Express** — Para possível backend (futuras versões)

---

## 💻 Como rodar o projeto localmente

1. **Clone o repositório**
```bash
git clone https://github.com/seuusuario/CASE_C2P.git
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

4. Acesse http://localhost:3000 no navegador 🚀

---

## 🧠 Como funciona

A aplicação permite que o usuário **importe um arquivo .xlsx** com dados em três abas distintas:

- **LineChart**: Geração de gráfico de linhas.
- **ScatterPoints**: Pontos individuais sobrepostos ao gráfico.
- **BoxPlots**: Visualização de distribuição com boxplots.

Esses dados são lidos e tratados no frontend usando a biblioteca xlsx, e então renderizados usando o react-plotly.js.

---

## 📁 Estrutura do Projeto

```
CASE_C2P-main/
├── .gitignore              # Arquivos e pastas ignorados pelo Git
├── README.md               # Documentação principal do projeto
├── package-lock.json       # Registro de dependências exatas instaladas
├── package.json            # Configurações do projeto e lista de dependências
├── public/                 # Arquivos públicos estáticos
│   ├── favicon.ico         # Ícone da aba do navegador
│   ├── index.html          # HTML base da aplicação React
│   ├── logo192.png         # Logotipo usado para ícones de app
│   ├── logo512.png         # Logotipo em alta resolução
│   ├── manifest.json       # Configurações do PWA (Progressive Web App)
│   └── robots.txt          # Instruções para rastreadores de mecanismos de busca
└── src/                    # Código-fonte da aplicação
    ├── App.css             # Estilização principal do App
    ├── App.js              # Componente principal da aplicação React
    ├── App.test.js         # Testes para o componente App
    ├── index.css           # Estilos globais
    ├── index.js            # Ponto de entrada da aplicação
    ├── logo.svg            # Logotipo usado na aplicação
    ├── reportWebVitals.js  # Medição de performance da aplicação
    ├── setupTests.js       # Configuração para testes com Jest
    └── components/         # Componentes reutilizáveis da aplicação
        └── ChartComponent.jsx  # Componente de gráfico 
```

---

## 🧩 Componentes e Lógica - Explicação Detalhada

### `ChartComponent.jsx` - O Coração da Visualização

#### **1. Estrutura Básica**
```javascript
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import * as XLSX from 'xlsx';
```
- **React Hooks**: Utiliza `useState` para gerenciar o estado dos dados
- **Plotly.js**: Renderiza gráficos interativos
- **SheetJS (xlsx)**: Processamento de arquivos Excel no navegador

#### **2. Mapeamento de Cores**
```javascript
const COLOR_MAP = {
    'ENGIA0': '#FF0000',    // Vermelho
    'ENGIA1': '#00FF00',    // Verde
    'ENGIA2': '#0000FF',    // Azul
    'ENGIB2': '#FFA500',    // Laranja
    'ENGIC3': '#800080'     // Roxo
};
```
- Garante consistência visual entre diferentes tipos de gráficos

#### **3. Fluxo de Processamento**
1. **Upload do Arquivo**:
   - Usuário seleciona arquivo XLSX
   - Dispara `processExcel()`

2. **Leitura do Excel**:
   ```javascript
   const workbook = XLSX.read(e.target.result, { type: 'array' });
   const lineData = XLSX.utils.sheet_to_json(workbook.Sheets['LineChart']);
   // ... outras abas
   ```

3. **Formatação dos Dados**:
   - Cria traces para Plotly com:
     - Gráficos de linha (tendências temporais)
     - Pontos de dispersão (valores específicos)
     - Boxplots (distribuições)

4. **Renderização**:
   ```javascript
   <Plot
     data={data}
     layout={/* configurações detalhadas */}
   />
   ```

#### **4. Recursos Avançados**
- **Combinação de múltiplos tipos de gráfico** em um único canvas
- **Controle preciso de eixos**:
  ```javascript
  xaxis: {
    tickvals: [0,1,2,3,4,5,6,7,8,9,10],
    range: [-0.5, 10.5]
  }
  ```
- **Processamento de arrays** nos boxplots:
  ```javascript
  const values = box.y.replace(/[[\]']/g, '').split(',').map(Number);
  ```

#### **5. Diagrama de Fluxo**
```
[Arquivo XLSX] → [Leitura com SheetJS] → 
    ↓
[Separação por Abas] → [Conversão para JSON] → 
    ↓
[Formatação para Plotly] → [Renderização Gráfica]
```

---

## 🎯 Diferenciais do Projeto

- ✅ Upload e processamento de Excel 100% client-side
- ✅ Combinação de 3 tipos de visualização em um gráfico
- ✅ Interatividade nativa (zoom, tooltips, toggle legendas)
- ✅ Sistema de cores consistentes por categoria
- ✅ Controle preciso de ranges e ticks dos eixos

---

## 🔧 Possíveis Melhorias Futuras

- [ ] Adicionar validação do formato do arquivo Excel
- [ ] Implementar responsividade para mobile
- [ ] Adicionar opções de exportação (imagem/PDF)

---

## 👨‍💻 Autor

Desenvolvido com 💙 por Bruno Luís Silva Guedes  
🔗 [LinkedIn](https://www.linkedin.com/in/bruno-luis-8a730b220/)

---

## 📝 Licença

Este projeto está sob a licença MIT.
```

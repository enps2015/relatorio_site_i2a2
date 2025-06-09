# **Análise de Saneamento na Amazônia \- Um Dashboard Interativo com IA**

## **🚀 Que a Força dos Dados Ilumine a Amazônia\!**

Bem-vindo ao repositório do **Relatório Interativo de Análise de Saneamento**, uma iniciativa desenvolvida como projeto prático do curso **"Inteligência Artificial Aplicada aos Desafios Socioambientais da Amazônia"**, oferecido pelo I2A2. 🌳🤖

Este projeto é um *dashboard* web totalmente funcional, construído para analisar e visualizar a profunda desigualdade no acesso à água potável no Brasil, com um foco especial no estado do Pará. Ele vai além de um simples relatório estático, incorporando a IA Generativa do Google (Gemini) para criar análises e recomendações em tempo real.

### **🖼️ Visão Geral do Projeto Final**

## **🎯 Propósito do Projeto**

O objetivo principal deste projeto é duplo:

1. **Ferramenta de Conscientização e Decisão:** Apresentar dados públicos complexos (IBGE, SNIS) de forma clara, visual e interativa, permitindo que gestores públicos, pesquisadores e a sociedade civil compreendam a urgência e a geografia da crise do saneamento na Amazônia.  
2. **Demonstração de Habilidades (Portfólio):** Servir como uma peça de portfólio que demonstra competências técnicas em todo o ciclo de vida de um projeto de dados:  
   * **Análise de Dados:** Limpeza, tratamento e interpretação de múltiplas fontes de dados.  
   * **Visualização de Dados:** Criação de gráficos interativos e eficazes para comunicação de *insights*.  
   * **Desenvolvimento Web Frontend:** Construção de uma interface web moderna, responsiva e esteticamente agradável.  
   * **Integração de IA:** Uso prático de uma API de IA Generativa (Gemini) para enriquecer a análise e a experiência do usuário.

## **🛠️ Tecnologias e Poderes da Floresta Utilizados**

Este painel foi construído utilizando uma combinação de tecnologias web leves e poderosas, garantindo que ele seja rápido, responsivo e fácil de publicar.

* **Frontend:**  
  * **HTML5:** A estrutura semântica que dá base a todo o relatório.  
  * **Tailwind CSS:** Framework CSS *utility-first* para criar o design moderno, responsivo e com o tema escuro/tecnológico de forma rápida e consistente.  
  * **JavaScript (Puro/Vanilla):** O cérebro por trás de toda a interatividade, desde a renderização dos gráficos até as chamadas para a API da IA.  
* **Visualização de Dados:**  
  * **ApexCharts.js:** Uma biblioteca robusta e moderna para a criação dos gráficos interativos (barras, linhas), escolhida por sua flexibilidade e excelente documentação.  
* **Inteligência Artificial:**  
  * **Google Gemini API:** Utilizada para gerar análises, conclusões e recomendações de políticas públicas dinamicamente, com base nos dados apresentados.

## **⚙️ Processo de Planejamento e Construção**

A criação deste dashboard foi uma jornada de aprendizado e adaptação, dividida em várias fases:

1. **Análise e Preparação dos Dados:**  
   * **Coleta:** Extração de dados de diversas tabelas do IBGE e do SNIS.  
   * **Limpeza e Agregação:** Consolidação dos dados relevantes, cálculo de percentuais e criação de rankings para os municípios do Pará.  
   * **Definição de Narrativa:** Estruturação dos dados para contar uma história clara: começando pela comparação macro (Brasil vs. Pará), mergulhando na desigualdade interna do estado (rankings e estatísticas) e finalizando com análises e soluções.  
2. **Design e Prototipagem (UX/UI):**  
   * **Identidade Visual:** Definição de um tema escuro (*dark mode*) com toques de ciano e cores vibrantes para os dados, inspirado na biofluorescência e na tecnologia, representando a união entre natureza e IA.  
   * **Layout:** Organização da página em seções lógicas para guiar o usuário pela análise, com títulos claros e uma hierarquia visual bem definida.  
3. **Desenvolvimento Frontend:**  
   * **Estrutura HTML:** Criação de um único arquivo index.html para facilitar a portabilidade e a publicação.  
   * **Estilização com Tailwind CSS:** Aplicação de classes diretamente no HTML para agilizar o desenvolvimento e garantir a responsividade.  
   * **Implementação dos Gráficos:** Integração da ApexCharts.js para transformar os dados brutos em visualizações interativas.  
   * **Integração com Gemini:** Desenvolvimento da lógica em JavaScript para enviar os *prompts* para a API do Gemini e exibir as respostas formatadas na tela.

## **⚔️ Desafios e Soluções na Trilha Amazônica do Código**

A jornada para dar vida a este relatório teve seus desafios, que exigiram adaptação e busca por soluções mais eficazes.

* **Desafio 1: A Instabilidade do Ecossistema React em Arquivo Único**  
  * **O Problema:** A tentativa inicial de construir o projeto usando React dentro de um único arquivo HTML se mostrou problemática. Erros como Recharts is not defined e Cannot read properties of undefined eram constantes, causados pela "corrida" de carregamento dos múltiplos scripts (React, ReactDOM, Recharts, Babel) no navegador.  
  * **A Solução:** A decisão estratégica de **abandonar o React para este formato de projeto** e reescrever toda a aplicação usando **HTML, CSS e JavaScript puro**. Para os gráficos, a biblioteca Recharts foi substituída pela ApexCharts.js, que se mostrou mais estável para essa abordagem. O resultado foi um código mais limpo, um arquivo final mais leve e, o mais importante, **100% funcional e livre de erros de carregamento.**  
* **Desafio 2: Formatação das Respostas da IA**  
  * **O Problema:** A API do Gemini, por padrão, retorna o texto com formatação Markdown (\*\*negrito\*\*, \* item de lista). Ao exibir isso diretamente no HTML, o texto aparecia "sujo", com os caracteres de formatação visíveis.  
  * **A Solução:** Foi criada uma **função em JavaScript (markdownToHtml)** que atua como um "tradutor". Ela recebe o texto em Markdown da IA, processa linha por linha e o converte em tags HTML estilizadas (\<strong\>, \<ul\>, \<li\>), garantindo que a resposta da IA se integre perfeitamente ao design do site.  
* **Desafio 3: Acesso à API em Ambiente Local**  
  * **O Problema:** Ao testar o site localmente (abrindo o arquivo index.html no navegador), os botões da IA não funcionavam, retornando um erro de API error. Isso ocorre por questões de segurança do navegador (CORS) e pela falta de uma chave de API.  
  * **A Solução:** A solução foi dupla: **1\)** obter uma chave de API gratuita no Google AI Studio e **2\)** adicionar a chave diretamente na variável apiKey no código. Foi documentado que essa é uma prática para desenvolvimento e que, ao publicar o site, o problema de CORS é resolvido naturalmente.

## **🤖 Construído com a Força da Colaboração Humano-IA\!**

É com orgulho que destaco: **este projeto é um exemplo prático do poder da colaboração entre um desenvolvedor e a Inteligência Artificial Generativa\!** 🤝🤖

A **Gemini** não foi apenas um "recurso" do site; ela foi uma **parceira de desenvolvimento**. Foi fundamental em diversas etapas, incluindo:

* **Geração de Código:** Sugerindo a estrutura inicial para os componentes e funções.  
* **Debugging:** Ajudando a identificar e corrigir os erros complexos de carregamento com o React.  
* **Refatoração:** Auxiliando na reescrita do código de React para JavaScript puro de forma eficiente.  
* **Criação de Conteúdo:** Escrevendo e refinando textos explicativos, como este próprio README.md.

Este relatório é um testemunho de como a IA pode acelerar o desenvolvimento, democratizar o acesso a tecnologias complexas e permitir que o desenvolvedor foque na estratégia, na experiência do usuário e na qualidade final do produto.

## **🔭 Próximos Passos na Expedição**

* **Adicionar Mais Análises:** Incorporar novos conjuntos de dados (esgoto, resíduos sólidos) para expandir o escopo do relatório.  
* **Filtros Interativos:** Permitir que o usuário filtre os dados por mesorregião ou por ano diretamente nos gráficos.  
* **Otimização de Performance:** Minificar o código e comprimir as imagens para garantir um carregamento ainda mais rápido.

### **👨‍💻 Contato**

Desenvolvido com paixão, código e a força dos dados amazônicos por:  
Eric Pimentel  
✨ Última atualização: 07 de Junho de 2024 ✨
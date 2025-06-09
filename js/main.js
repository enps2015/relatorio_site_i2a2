// Todo o nosso código JavaScript vai aqui
document.addEventListener('DOMContentLoaded', function () {
    // --- Dados e Cores ---
    const COLORS = {
      brasil: '#3b82f6', para: '#f97316', comLigacao: '#22c55e', semLigacao: '#ef4444',
      'Sudeste Paraense': '#a855f7', 'Nordeste Paraense': '#14b8a6', 'Sudoeste Paraense': '#f59e0b',
      'Baixo Amazonas': '#0ea5e9', 'Marajó': '#ec4899', 'Metropolitana de Belém': '#64748b', default: '#a1a1aa'
    };

    const municipiosTratamentoData = [ { ano: '2000', Brasil: 74.3, Pará: 45.5 }, { ano: '2008', Brasil: 81.2, Pará: 51.0 }, { ano: '2017', Brasil: 84.5, Pará: 54.5 } ];
    const domiciliosLigacaoData2022 = [ { local: 'Brasil', 'Com Ligação': 83.7, 'Sem Ligação': 16.3 }, { local: 'Pará', 'Com Ligação': 48.7, 'Sem Ligação': 51.3 } ];
    const paraInteriorStats = { media: 44.3, mediana: 38.9, maximo: 99.8, minimo: 1.8, municipioMax: 'Parauapebas (Sudeste)', municipioMin: 'Afuá (Marajó)' };
    const top10Melhores = [ { nome: 'Parauapebas', valor: 99.8, regiao: 'Sudeste Paraense' }, { nome: 'Canaã dos Carajás', valor: 98.7, regiao: 'Sudeste Paraense' }, { nome: 'Marabá', valor: 92.5, regiao: 'Sudeste Paraense' }, { nome: 'Tucuruí', valor: 88.4, regiao: 'Sudeste Paraense' }, { nome: 'Castanhal', valor: 85.1, regiao: 'Nordeste Paraense' }, { nome: 'Santarém', valor: 82.3, regiao: 'Baixo Amazonas' }, { nome: 'Itaituba', valor: 79.9, regiao: 'Sudoeste Paraense' }, { nome: 'Ulianópolis', valor: 78.5, regiao: 'Nordeste Paraense' }, { nome: 'Xinguara', valor: 75.2, regiao: 'Sudeste Paraense' }, { nome: 'Altamira', valor: 73.0, regiao: 'Sudoeste Paraense' } ].sort((a,b) => b.valor - a.valor);
    const top10Piores = [ { nome: 'Afuá', valor: 1.8, regiao: 'Marajó' }, { nome: 'Bagre', valor: 2.1, regiao: 'Marajó' }, { nome: 'Portel', valor: 3.5, regiao: 'Marajó' }, { nome: 'Muaná', valor: 4.0, regiao: 'Marajó' }, { nome: 'Anajás', valor: 5.6, regiao: 'Marajó' }, { nome: 'Gurupá', valor: 6.2, regiao: 'Marajó' }, { nome: 'Viseu', valor: 7.8, regiao: 'Nordeste Paraense' }, { nome: 'Mocajuba', valor: 9.1, regiao: 'Nordeste Paraense' }, { nome: 'Aveiro', valor: 10.4, regiao: 'Sudoeste Paraense' }, { nome: 'Prainha', valor: 11.2, regiao: 'Baixo Amazonas' } ].sort((a,b) => b.valor - a.valor);

    // --- Configurações Comuns dos Gráficos ---
    const chartDefaultOptions = {
        chart: { foreColor: '#9ca3af' },
        grid: { borderColor: 'rgba(0, 255, 255, 0.1)' },
        xaxis: { labels: { style: { colors: '#9ca3af' } }, axisBorder: { color: '#4b5563' }, axisTicks: { color: '#4b5563' } },
        yaxis: { labels: { style: { colors: '#9ca3af' } }, axisBorder: { color: '#4b5563' }, axisTicks: { color: '#4b5563' } },
    };

    // --- Renderização dos Gráficos ---
    function renderEvolucaoChart() {
        const options = {
            ...chartDefaultOptions,
            series: [
                { name: 'Brasil', data: municipiosTratamentoData.map(d => d.Brasil) },
                { name: 'Pará', data: municipiosTratamentoData.map(d => d.Pará) }
            ],
            chart: { ...chartDefaultOptions.chart, type: 'line', height: 350 },
            colors: [COLORS.brasil, COLORS.para],
            xaxis: { ...chartDefaultOptions.xaxis, categories: municipiosTratamentoData.map(d => d.ano) },
            yaxis: { ...chartDefaultOptions.yaxis, title: { text: '%' } },
            stroke: { curve: 'smooth', width: 3 },
            tooltip: { theme: 'dark' }
        };
        new ApexCharts(document.querySelector("#evolucao-chart"), options).render();
    }

    function renderCoberturaChart() {
        const options = {
            ...chartDefaultOptions,
            series: [
                { name: 'Com Ligação', data: domiciliosLigacaoData2022.map(d => d['Com Ligação']) },
                { name: 'Sem Ligação', data: domiciliosLigacaoData2022.map(d => d['Sem Ligação']) }
            ],
            chart: { ...chartDefaultOptions.chart, type: 'bar', height: 350, stacked: true, stackType: '100%' },
            colors: [COLORS.comLigacao, COLORS.semLigacao],
            plotOptions: { bar: { horizontal: true } },
            xaxis: { ...chartDefaultOptions.xaxis, categories: domiciliosLigacaoData2022.map(d => d.local) },
            tooltip: { theme: 'dark', y: { formatter: (val) => val + "%" } }
        };
        new ApexCharts(document.querySelector("#cobertura-chart"), options).render();
    }

    function renderRankingChart(selector, data) {
        const options = {
            ...chartDefaultOptions,
            series: [{ data: data.map(d => d.valor) }],
            chart: { ...chartDefaultOptions.chart, type: 'bar', height: 350 },
            plotOptions: { bar: { horizontal: true, distributed: true, barHeight: '80%' } },
            colors: data.map(d => COLORS[d.regiao] || COLORS.default),
            xaxis: { ...chartDefaultOptions.xaxis, categories: data.map(d => d.nome), max: 100, labels: { formatter: (val) => val + "%" } },
            yaxis: { ...chartDefaultOptions.yaxis, labels: { show: true, style: { fontSize: '12px' } } },
            legend: { show: false },
            tooltip: { theme: 'dark', y: { formatter: (val, { dataPointIndex }) => `${val}% (${data[dataPointIndex].regiao})` } }
        };
        new ApexCharts(document.querySelector(selector), options).render();
    }
    
    // --- Função para renderizar a legenda ---
    function renderLegenda() {
        const container = document.getElementById('legenda-mesorregioes');
        const regioes = Object.keys(COLORS).filter(key => !['brasil', 'para', 'comLigacao', 'semLigacao', 'default'].includes(key));
        regioes.forEach(regiao => {
            container.innerHTML += `
                <div class="flex items-center">
                    <div class="w-4 h-4 rounded-full mr-2 shadow-md" style="background-color: ${COLORS[regiao]}"></div>
                    <span class="text-sm text-gray-300">${regiao}</span>
                </div>
            `;
        });
    }

    // --- Funcionalidades de IA ---
    async function generateAIContent(containerId, title, prompt, buttonText) {
        const container = document.getElementById(containerId);
        container.innerHTML = `
            <h3 class="text-xl font-semibold text-cyan-300 mb-4">${title}</h3>
            <button id="btn-${containerId}" class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center shadow-lg">
                ✨ <span class="ml-2">${buttonText}</span>
            </button>
            <div id="output-${containerId}" class="mt-4"></div>
        `;

        const button = document.getElementById(`btn-${containerId}`);
        const outputDiv = document.getElementById(`output-${containerId}`);
        
        button.addEventListener('click', async () => {
            button.disabled = true;
            button.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span class="ml-2">Gerando...</span>
            `;
            outputDiv.innerHTML = '';
            
            try {
                const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
                
                // !!! IMPORTANTE: A CHAVE DA API FOI REMOVIDA DESTE CÓDIGO !!!
                // Para que a funcionalidade de IA funcione, você precisa:
                // 1. Obter uma chave de API do Google AI Studio (ou similar).
                // 2. INSERIR SUA CHAVE ABAIXO na constante 'apiKey'.
                // 3. RECOMENDAÇÃO DE SEGURANÇA: Idealmente, esta chave NÃO deve ficar no código do frontend.
                //    Considere usar um backend simples para fazer a chamada à API do Google,
                //    mantendo sua chave segura no servidor.
                const apiKey = "AIzaSyD-56lH0FGHUgYZw11hRfp9MDSxskUZ-Uo"; // <--- SUA CHAVE DE API ATUAL
                
                if (apiKey === "SUA_API_KEY_AQUI" || apiKey.length < 30) { // <--- CORRIGIDO AQUI
                    throw new Error("A chave da API do Google AI não foi configurada corretamente ou é inválida. Por favor, verifique a constante \'apiKey\' no arquivo js/main.js.");
                }

                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                if (!response.ok) throw new Error(`API error: ${response.statusText}`);
                const result = await response.json();
                
                if (result.candidates && result.candidates.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    // CORREÇÃO: Função para converter Markdown para HTML
                    function markdownToHtml(mdText) {
                        const lines = mdText.split('\n');
                        let html = '';
                        let inList = false;

                        for (const line of lines) {
                            let trimmedLine = line.trim();
                            
                            // Pula linhas vazias
                            if (!trimmedLine) continue;
                            
                            // Processa a linha para negrito
                            let processedLine = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300">$1</strong>');

                            // Verifica se é um item de lista
                            if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                                if (!inList) {
                                    html += '<ul class="space-y-2">';
                                    inList = true;
                                }
                                html += `<li class="ml-5 list-disc">${processedLine.substring(2)}</li>`;
                            } else {
                                if (inList) {
                                    html += '</ul>';
                                    inList = false;
                                }
                                html += `<p class="mb-3">${processedLine}</p>`;
                            }
                        }

                        if (inList) {
                            html += '</ul>';
                        }
                        return html;
                    }

                    const htmlContent = markdownToHtml(text);
                    outputDiv.innerHTML = `<div class="p-4 bg-gray-900/70 border-l-4 border-cyan-400 rounded-r-lg text-gray-300 leading-relaxed">${htmlContent}</div>`;

                } else {
                    throw new Error("Não foi possível gerar a análise. Resposta inválida da API.");
                }
            } catch (err) {
                outputDiv.innerHTML = `<div class="p-4 bg-red-900/50 text-red-300 border border-red-500 rounded-lg"><strong>Erro:</strong> ${err.message}</div>`;
            } finally {
                button.disabled = false;
                button.innerHTML = `✨ <span class="ml-2">${buttonText}</span>`;
            }
        });
    }

    // --- Inicialização ---
    renderEvolucaoChart();
    renderCoberturaChart();
    renderRankingChart('#top-10-melhores-chart', top10Melhores);
    renderRankingChart('#top-10-piores-chart', top10Piores);
    renderLegenda();
    
    generateAIContent('ai-diagnostico', 'Análise Diagnóstica com IA', `Os seguintes dados estatísticos referem-se à cobertura de água em 143 municípios do interior do Pará: ${JSON.stringify(paraInteriorStats)}. Forneça uma análise interpretativa curta sobre o que esses números significam em termos de desigualdade.`, 'Gerar Análise Diagnóstica');
    generateAIContent('ai-conclusao', 'Síntese da Análise Crítica com IA', `Com base nas informações de que o Pará tem uma cobertura de água de 48.7% contra 83.7% do Brasil, que a região do Sudeste Paraense (ligada à mineração) tem os melhores índices e a região do Marajó os piores (chegando a 1.8%), gere um parágrafo de conclusão sobre a desigualdade no saneamento do estado.`, 'Gerar Conclusão com IA');
    generateAIContent('ai-sugestoes', 'Brainstorming de Políticas Públicas com IA', `Considerando a crise de saneamento no estado do Pará, especialmente na região amazônica do Marajó, com baixíssima cobertura de água potável, e a realidade de comunidades ribeirinhas isoladas, gere 3 sugestões de políticas públicas inovadoras e práticas. Pense em soluções que vão além do óbvio (como 'investir mais') e considere aspectos tecnológicos, sociais e de sustentabilidade.`, 'Gerar Novas Ideias de Políticas');
});

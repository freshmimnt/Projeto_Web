document.addEventListener('DOMContentLoaded', async () => {
    try {
        
        const data = await response.json();

        document.getElementById('mediaPrecos').textContent = data.media_precos.toFixed(2);
        document.getElementById('desvioPadraoPrecos').textContent = data.desvio_padrao_precos.toFixed(2);
        document.getElementById('produtoMaisCaro').textContent = ${data.produto_mais_caro.name} - €${data.produto_mais_caro.price};
        document.getElementById('produtoMaisBarato').textContent = ${data.produto_mais_barato.name} - €${data.produto_mais_barato.price};

        const grafico1 = new Chart(document.getElementById('grafico1').getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Produto mais caro', 'Produto mais barato'],
                datasets: [{
                    data: [data.produto_mais_caro.price, data.produto_mais_barato.price],
                    backgroundColor: ['#FF6384', '#36A2EB']
                }]
            }
        });

        const grafico2 = new Chart(document.getElementById('grafico2').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Produto mais caro', 'Produto mais barato'],
                datasets: [{
                    label: 'Preços',
                    data: [data.produto_mais_caro.price, data.produto_mais_barato.price],
                    backgroundColor: ['#FF6384', '#36A2EB']
                }]
            }
        });
    } catch (error) {
        console.error('Erro ao buscar as estatísticas:', error);
    }
});
// Aguarda o carregamento completo da página antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    const urlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQildvGeXWbsGz9HLXCp0--6xwpoULr4GLWK17s3PWrDYgtINtAolAaN4gYN0hy9G_OLUHXeL9j34bo/pub?output=csv';

    const containerCards = document.getElementById('containerCards');
    const searchBar = document.getElementById('searchBar');
    let cards = []; // Array para armazenar todos os cards criados

    // Função para filtrar os cards com base no texto da pesquisa
    const filterCards = () => {
        const searchTerm = searchBar.value.toLowerCase();
        cards.forEach(card => {
            const textContent = card.textContent.toLowerCase();
            if (textContent.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    };

    // Adiciona um "listener" para o evento de digitar na barra de pesquisa
    searchBar.addEventListener('keyup', filterCards);

    fetch(urlCSV)
        .then(response => response.text())
        .then(csvText => {
            const linhas = csvText.split('\n');
            const cabecalho = linhas[0].split(',');
            const indiceImagem = cabecalho.findIndex(col => col.trim() === 'Imagem');
            
            for (let i = 1; i < linhas.length; i++) {
                const linha = linhas[i];
                if (!linha.trim()) continue;

                const colunas = linha.split(',');
                const card = document.createElement('div');
                card.classList.add('card');
                
                if (indiceImagem !== -1 && colunas[indiceImagem] && colunas[indiceImagem].trim() !== '') {
                    const img = document.createElement('img');
                    img.src = colunas[indiceImagem].trim();
                    img.classList.add('card-image');
                    img.alt = 'Imagem do item';
                    card.appendChild(img);
                }
                
                for (let j = 0; j < cabecalho.length; j++) {
                    if (j === indiceImagem) continue;

                    const item = document.createElement('div');
                    item.classList.add('card-item');

                    const label = document.createElement('span');
                    label.classList.add('card-label');
                    label.textContent = cabecalho[j].trim() + ': ';
                    
                    const value = document.createElement('span');
                    value.classList.add('card-value');
                    value.textContent = colunas[j].trim();
                    
                    item.appendChild(label);
                    item.appendChild(value);
                    card.appendChild(item);
                }
                
                containerCards.appendChild(card);
                cards.push(card);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
            containerCards.innerHTML = '<p>Não foi possível carregar os dados da planilha.</p>';
        });

});
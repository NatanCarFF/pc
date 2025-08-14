export const fetchData = async (url) => {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');

    // Exibe o spinner e limpa a mensagem de erro
    loadingSpinner.style.display = 'block';
    errorMessage.style.display = 'none';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`);
        }
        const csvText = await response.text();
        
        const linhas = csvText.split('\n');
        const cabecalho = linhas[0].split(',').map(col => col.trim());
        const data = [];
        
        for (let i = 1; i < linhas.length; i++) {
            const linha = linhas[i];
            if (!linha.trim()) continue;
            
            const colunas = linha.split(',').map(col => col.trim());
            const item = {};
            cabecalho.forEach((col, index) => {
                item[col] = colunas[index];
            });
            data.push(item);
        }
        
        // Esconde o spinner e retorna os dados
        loadingSpinner.style.display = 'none';
        return data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        
        // Esconde o spinner e exibe a mensagem de erro
        loadingSpinner.style.display = 'none';
        errorMessage.textContent = 'Não foi possível carregar os dados da planilha. Por favor, tente novamente mais tarde.';
        errorMessage.style.display = 'block';
        return null;
    }
};
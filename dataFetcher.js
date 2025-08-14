export const fetchData = async (url) => {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');

    loadingSpinner.style.display = 'block';
    errorMessage.style.display = 'none';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        const jsonData = rows.map(row => {
            const columns = row.split(',');
            return {
                "Nome": columns[0],
                "Descrição": columns[1],
                "Outra Coisa": columns[2] // Exemplo
            };
        });
        loadingSpinner.style.display = 'none';
        return jsonData.filter(item => item.Nome); // Filtra linhas vazias
    } catch (error) {
        console.error('Falha ao buscar os dados:', error);
        loadingSpinner.style.display = 'none';
        errorMessage.textContent = 'Falha ao carregar os dados. Por favor, tente novamente mais tarde.';
        errorMessage.style.display = 'block';
        return null;
    }
};
// dataFetcher.js

export const urlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQildvGeXWbsGz9HLXCp0--6xwpoULr4GLWK17s3PWrDYgtINtAolAaN4gYN0hy9G_OLUHXeL9j34bo/pub?output=csv';

export const fetchData = async () => {
    try {
        const response = await fetch(urlCSV);
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados.');
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
        
        return data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        document.getElementById('containerCards').innerHTML = '<p>Não foi possível carregar os dados da planilha.</p>';
        return null;
    }
};
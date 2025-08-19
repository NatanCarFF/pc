const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware para processar JSON no corpo das requisições
app.use(bodyParser.json());

// Serve os arquivos estáticos da pasta atual onde o server.js está localizado
app.use(express.static(__dirname));

// Configuração do Multer para upload de arquivos JSON
const upload = multer({ dest: 'uploads/' });

// Função para gerar um ID único
function gerarId(prefixo) {
    return `${prefixo}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Rota 1: GET /api/data - Lê e retorna os dados do JSON
app.get('/api/data', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Erro ao ler o arquivo de dados:', error);
        res.status(500).json({ message: 'Erro ao carregar os dados.' });
    }
});

// Rota 2: POST /api/save - Salva os dados editados
app.post('/api/save', async (req, res) => {
    try {
        const newData = req.body;
        await fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8');
        res.status(200).json({ message: 'Dados salvos com sucesso.' });
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        res.status(500).json({ message: 'Erro ao salvar os dados.' });
    }
});

// Rota 3: POST /api/addAtividade - Adiciona uma nova atividade a um funcionário
app.post('/api/addAtividade', async (req, res) => {
    try {
        const { funcionarioId, grupo, novaAtividade } = req.body;

        // Validação de dados de entrada
        if (!funcionarioId || !grupo || !novaAtividade) {
            return res.status(400).json({ message: 'Dados inválidos. Por favor, forneça o ID do funcionário, o grupo e a nova atividade.' });
        }

        const data = await fs.readFile(DATA_FILE, 'utf8');
        const jsonData = JSON.parse(data);

        // Otimização: buscar o funcionário por ID
        let funcionarioEncontrado = null;
        for (const empresa of jsonData.empresas) {
            funcionarioEncontrado = empresa.funcionarios.find(f => f.id === funcionarioId);
            if (funcionarioEncontrado) break;
        }

        if (funcionarioEncontrado) {
            let grupoChave;
            if (grupo === 'Grupo por Valor (R$)') grupoChave = 'grupo_valor_r$';
            else if (grupo === 'Grupo por Hora') grupoChave = 'grupo_hora';
            else if (grupo === 'Grupo por Dia') grupoChave = 'grupo_dia';

            if (grupoChave && funcionarioEncontrado[grupoChave]) {
                // Previne duplicatas
                if (!funcionarioEncontrado[grupoChave].includes(novaAtividade)) {
                    funcionarioEncontrado[grupoChave].push(novaAtividade);
                    await fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), 'utf8');
                    res.status(200).json({ message: 'Atividade adicionada com sucesso.' });
                } else {
                    res.status(409).json({ message: 'Atividade já existe neste grupo.' });
                }
            } else {
                res.status(404).json({ message: 'Grupo não encontrado para este funcionário.' });
            }
        } else {
            res.status(404).json({ message: 'Funcionário não encontrado.' });
        }

    } catch (error) {
        console.error('Erro ao adicionar a atividade:', error);
        res.status(500).json({ message: 'Erro ao adicionar a atividade.' });
    }
});

// Rota 4: GET /api/download - Baixa o arquivo JSON
app.get('/api/download', (req, res) => {
    res.download(DATA_FILE, 'data.json', (err) => {
        if (err) {
            console.error('Erro ao baixar o arquivo:', err);
            res.status(500).send('Erro ao baixar o arquivo.');
        }
    });
});

// Rota 5: POST /api/upload - Faz upload de um novo arquivo JSON
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }
    const uploadedFilePath = req.file.path;

    try {
        const fileContent = await fs.readFile(uploadedFilePath, 'utf8');
        const parsedData = JSON.parse(fileContent);

        // Validação básica do formato do JSON
        if (!parsedData.empresas || !Array.isArray(parsedData.empresas)) {
            await fs.unlink(uploadedFilePath);
            return res.status(400).json({ message: 'Formato de arquivo inválido. O JSON deve conter um array de "empresas".' });
        }

        // Salvar o novo JSON
        await fs.rename(uploadedFilePath, DATA_FILE);
        res.status(200).json({ message: 'Dados atualizados com sucesso.' });

    } catch (error) {
        console.error('Erro ao processar o arquivo de upload:', error);
        res.status(500).json({ message: 'Erro no processamento do arquivo.' });
        // Tentar remover o arquivo temporário em caso de erro
        await fs.unlink(uploadedFilePath).catch(err => console.error("Erro ao remover o arquivo temporário:", err));
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
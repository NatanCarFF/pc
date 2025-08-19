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
        res.status(200).json({ message: 'Dados salvos com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar o arquivo de dados:', error);
        res.status(500).json({ message: 'Erro ao salvar os dados.' });
    }
});

// Rota 3: GET /api/download - Baixa o arquivo JSON
app.get('/api/download', (req, res) => {
    res.download(DATA_FILE, 'dados.json', (err) => {
        if (err) {
            console.error('Erro ao fazer download do arquivo:', err);
            res.status(500).send('Erro ao fazer download do arquivo.');
        }
    });
});

// Rota 4: POST /api/upload - Faz upload de um novo arquivo JSON
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado.');
    }
    const tempPath = req.file.path;
    const newPath = DATA_FILE;
    try {
        // Validação básica para garantir que é um JSON válido
        const fileContent = await fs.readFile(tempPath, 'utf8');
        JSON.parse(fileContent);
        // Move o arquivo temporário para o destino final
        await fs.rename(tempPath, newPath);
        res.status(200).json({ message: 'Arquivo JSON enviado e salvo com sucesso!' });
    } catch (error) {
        console.error('Erro ao processar o arquivo de upload:', error);
        res.status(400).send('O arquivo enviado não é um JSON válido.');
        await fs.unlink(tempPath); // Limpa o arquivo temporário em caso de erro
    }
});

// Rota 5: POST /api/add-atividade - Adiciona uma nova atividade ao funcionário
app.post('/api/add-atividade', async (req, res) => {
    const { funcionario, grupo, novaAtividade } = req.body;

    if (!funcionario || !grupo || !novaAtividade) {
        return res.status(400).json({ message: 'Dados insuficientes.' });
    }

    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const jsonData = JSON.parse(data);

        // Encontra o funcionário e o grupo correto
        let funcionarioEncontrado = null;
        for (const empresa of jsonData.empresas) {
            funcionarioEncontrado = empresa.funcionarios.find(f => f.nome === funcionario);
            if (funcionarioEncontrado) break;
        }

        if (funcionarioEncontrado) {
            let grupoChave;
            if (grupo === 'Grupo por Valor (R$)') grupoChave = 'grupo_valor_r$';
            else if (grupo === 'Grupo por Hora') grupoChave = 'grupo_hora';
            else if (grupo === 'Grupo por Dia') grupoChave = 'grupo_dia';

            if (grupoChave && funcionarioEncontrado[grupoChave]) {
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
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
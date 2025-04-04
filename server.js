const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const NEWS_API_KEY = '141065ad476225df40c52f5dc4a9713d';
const BASE_URL = 'http://api.mediastack.com/v1/news';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/noticias', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: NEWS_API_KEY,
        categories: 'technology',
        languages: 'pt',          
        limit: 10                 
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    res.status(500).json({ message: 'Erro ao buscar notícias' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
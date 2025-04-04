function toggleMenu() {
    const menu = document.getElementById('menuLateral');
    const overlay = document.getElementById('overlay');

    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        document.body.style.marginLeft = '0';
        overlay.style.display = 'none';
    } else {
        menu.classList.add('open');
        document.body.style.marginLeft = '250px';
        overlay.style.display = 'block';
    }
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('menuLateral');
    const menuButton = document.getElementById('menuToggleBtn');
    const overlay = document.getElementById('overlay');

    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.remove('open');
        document.body.style.marginLeft = '0';
        overlay.style.display = 'none';
    }
});

async function carregarNoticias() {
    try {
        const apiKey = '141065ad476225df40c52f5dc4a9713d'; 
        const response = await fetch(`http://api.mediastack.com/v1/news?access_key=${apiKey}&languages=pt&limit=10`);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);

        const noticias = data.data || [];
        const container = document.getElementById('secondary-news');
        container.innerHTML = '';

        if (noticias.length === 0) {
            container.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
            return;
        }

        noticias.forEach((noticia, index) => {
            const card = document.createElement('div');
            card.classList.add('news-item');
            
            const imagem = noticia.image ? `<img src="${noticia.image}" alt="Imagem da notícia">` : '';
            
            card.innerHTML = `
                <h3>${noticia.title}</h3>
                ${imagem}
                <p>${noticia.description || 'Sem descrição disponível.'}</p>
                <a href="${noticia.url}" target="_blank">Leia mais</a>
            `;

            container.appendChild(card);

            if (index === 0) {
                const destaque = document.getElementById('main-news');
                destaque.innerHTML = `
                    <h2>${noticia.title}</h2>
                    ${imagem}
                    <p>${noticia.description || 'Sem descrição disponível.'}</p>
                    <a href="${noticia.url}" target="_blank">Leia mais</a>
                `;
            }
        });
    } catch (erro) {
        console.error('Erro ao carregar notícias:', erro);
        document.getElementById('secondary-news').innerHTML = '<p>Erro ao carregar notícias.</p>';
    }
}

carregarNoticias();
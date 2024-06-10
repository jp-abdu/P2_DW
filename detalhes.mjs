// Verifica se o usuário está logado
if (!sessionStorage.getItem('logado')) {
    window.location.href = 'index.html';
}

document.getElementById('logout').onclick = () => {
    sessionStorage.removeItem('logado');
    window.location.href = 'index.html';
};

document.getElementById('voltar').onclick = () => {
    window.location.href = 'principal.html';
};

const pegaDetalhesJogador = async (id) => {
    try {
        const resposta = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
        if (!resposta.ok) throw new Error('Erro ao obter os dados do jogador');
        const entrada = await resposta.json();
        return entrada;
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar os detalhes do jogador.');
    }
};

const carregarDetalhes = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
        alert('ID do jogador não encontrado na URL');
        return;
    }
    const jogador = await pegaDetalhesJogador(id);
    if (jogador) {
        document.getElementById('nome').textContent = jogador.nome;
        document.getElementById('imagem').src = jogador.imagem;
        document.getElementById('imagem').alt = `Imagem de ${jogador.nome}`;
        document.getElementById('nascimento').textContent = jogador.nascimento;
        document.getElementById('altura').textContent = jogador.altura;
        document.getElementById('posicao').textContent = jogador.posicao;
        document.getElementById('detalhes').textContent = jogador.detalhes;
    }
};

carregarDetalhes();

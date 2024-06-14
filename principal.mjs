if (sessionStorage.getItem('logado')) {
    document.getElementById('logout').onclick = () => {
        sessionStorage.removeItem('logado');
        window.location.href = 'index.html';
    };
} else {
}

let dados;

const inputPesquisa = document.createElement('input');
inputPesquisa.type = 'text';
inputPesquisa.name = 'pesquisa';
inputPesquisa.placeholder = 'Busque um nome';

const divPesquisa = document.createElement('div');
divPesquisa.style.textAlign = 'center';
divPesquisa.style.padding = '5px';
divPesquisa.appendChild(inputPesquisa);
document.body.insertBefore(divPesquisa, document.getElementById('conteudo'));

const conteudo = document.getElementById('conteudo');

const montaCard = (entrada) => {
    const card = document.createElement('div');
    card.className = 'card';

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;

    const nome = document.createElement('p');
    nome.className = 'nome-jogador';
    nome.innerHTML = entrada.nome;

    const botaoDetalhes = document.createElement('button');
    botaoDetalhes.className = 'botao-detalhes';
    botaoDetalhes.textContent = 'Detalhes';
    botaoDetalhes.onclick = () => {
        window.location.href = `detalhes.html?id=${entrada.id}`;
    };

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(botaoDetalhes);

    return card;
};

inputPesquisa.onkeyup = (ev) => {
    if (ev.target.value.length > 0) {
        const filtrado = dados.filter(
            (elemento) => {
                const estaNoNome = elemento.nome.toLowerCase().includes(ev.target.value.toLowerCase());
                const estaNaPosicao = elemento.posicao.toLowerCase().includes(ev.target.value.toLowerCase());
                return estaNoNome || estaNaPosicao;
            }
        );
        conteudo.innerHTML = '';
        filtrado.forEach((atleta) => {
            conteudo.appendChild(montaCard(atleta));
        });
    } else {
        conteudo.innerHTML = '';
        dados.forEach((atleta) => {
            conteudo.appendChild(montaCard(atleta));
        });
    }
}

const pegaDados = async (caminho) => {
    try {
        const resposta = await fetch(caminho);
        if (!resposta.ok) throw new Error('Erro ao obter os dados');
        const dados = await resposta.json();
        return dados;
    } catch (error) {
        document.getElementById('conteudo').innerText = 'Erro ao carregar os dados';
        console.error(error);
    }
}

const carregarDados = (caminho) => {
    pegaDados(caminho).then(
        (entrada) => {
            if (!entrada) return;
            dados = entrada;
            conteudo.innerHTML = '';
            dados.forEach((atleta) => {
                conteudo.appendChild(montaCard(atleta));
            });
        }
    );
}

document.querySelectorAll('#barra-escolhas button').forEach((botao) => {
    botao.addEventListener('click', (ev) => {
        const valor = ev.target.value;
        let url = 'https://botafogo-atletas.mange.li/2024-1/all';
        if (valor === 'masculino') url = 'https://botafogo-atletas.mange.li/2024-1/masculino';
        else if (valor === 'feminino') url = 'https://botafogo-atletas.mange.li/2024-1/feminino';
        carregarDados(url);
    });
});

document.getElementById('select-plantel').addEventListener('change', (ev) => {
    const valor = ev.target.value;
    let url = 'https://botafogo-atletas.mange.li/2024-1/all';
    if (valor === 'masculino') url = 'https://botafogo-atletas.mange.li/2024-1/masculino';
    else if (valor === 'feminino') url = 'https://botafogo-atletas.mange.li/2024-1/feminino';
    carregarDados(url);
});

document.getElementById('select-plantel').value = "";

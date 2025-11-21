document.addEventListener('DOMContentLoaded', () => {
    const detalhesPersonagemDiv = document.getElementById('detalhes-personagem');
    const jogoPrincipalInfoDiv = document.querySelector('#jogo-principal-info');

    // Carrega os dados do JSON e popula as seções
    if (detalhesPersonagemDiv) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Encontra o personagem "O Cavaleiro" no arquivo JSON
                const cavaleiro = data.find(personagem => personagem.nome === "O Cavaleiro");

                if (cavaleiro) {
                    // Popula o card principal do personagem
                    const imageUrl = cavaleiro.imagem.startsWith('http') ? cavaleiro.imagem : cavaleiro.imagem;
                    const characterHTML = `
                        <img src="${imageUrl}" alt="Imagem de ${cavaleiro.nome}" class="personagem-detalhe-imagem">
                        <h2>${cavaleiro.nome}</h2>
                        <p>${cavaleiro.descricao}</p>
                    `;
                    detalhesPersonagemDiv.innerHTML = characterHTML;

                    // Popula a seção "Jogo Principal" com os itens do JSON
                    if (jogoPrincipalInfoDiv && cavaleiro.jogoPrincipalItens && cavaleiro.jogoPrincipalItens.length > 0) {
                        // Cria uma lista de itens (<ul>) a partir do array no JSON
                        const itensHTML = cavaleiro.jogoPrincipalItens.map(item => `<li>${item}</li>`).join('');
                        jogoPrincipalInfoDiv.innerHTML = `<ul>${itensHTML}</ul>`;
                    } else if (jogoPrincipalInfoDiv) {
                        // Se 'jogoPrincipalItens' não existir no JSON,
                        // exibe a descrição principal do personagem como alternativa.
                        jogoPrincipalInfoDiv.innerHTML = `<p>${cavaleiro.descricao}</p>`;
                    }
                } else {
                    detalhesPersonagemDiv.innerHTML = '<p>Personagem não encontrado.</p>';
                }
            })
            .catch(error => console.error('Erro ao carregar os dados do personagem:', error));
    }

    // Adiciona funcionalidade de acordeão para as opções
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        const header = option.querySelector('.option-header');
        header.addEventListener('click', () => {
            // Fecha outras opções abertas para um efeito de acordeão "limpo"
            options.forEach(otherOption => {
                if (otherOption !== option) otherOption.classList.remove('active');
            });
            option.classList.toggle('active');
        });
    });
});
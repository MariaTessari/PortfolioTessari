// carrossel

// Variável para guardar qual foto está aparecendo no momento
document.addEventListener('DOMContentLoaded', () => {
    let indiceAtual = 0;
    
    // Captura os elementos do HTML
    const carrosselContainer = document.getElementById('carrossel');
    const slidesContainer = document.querySelector('.carrossel-slides');
    const slides = document.querySelectorAll('.slide');
    const btnEsq = document.getElementById('btn-esq');
    const btnDir = document.getElementById('btn-dir');
    const totalSlides = slides.length;

   // Função que faz o movimento dinâmico baseado no tamanho renderizado em tela
    function atualizarCarrossel() {
        if (!slidesContainer || !carrosselContainer) return;
        // Captura a largura real do container do carrossel para passar os slides perfeitamente
        const larguraSlide = carrosselContainer.offsetWidth; 
        const deslocamento = -(indiceAtual * larguraSlide); 
        slidesContainer.style.transform = `translateX(${deslocamento}px)`; 
    }

    // Ação ao clicar no botão da direita
    if (btnDir) {
        btnDir.addEventListener('click', () => {
            indiceAtual++;
            if (indiceAtual >= totalSlides) {
                indiceAtual = 0; // Volta para a primeira
            }
            atualizarCarrossel();
        });
    }

    // Ação ao clicar no botão da esquerda
    if (btnEsq) {
        btnEsq.addEventListener('click', () => {
            indiceAtual--;
            if (indiceAtual < 0) {
                indiceAtual = totalSlides - 1; // Vai para a última
            }
            atualizarCarrossel();
        });
    }

    // Recalcula o tamanho se a janela mudar para não quebrar a responsividade
    window.addEventListener('resize', atualizarCarrossel);
});

// --- DROPDOWN UNIFICADO ---

/* Função inteligente que recebe o evento e o ID do menu a ser aberto */
function toggleMenu(event, idDoMenu) {
    event.preventDefault(); /* Evita que a tela pule para o topo */

    // (Opcional) Fecha outros menus abertos antes de abrir o novo
    var todosMenus = document.querySelectorAll('.dropdown-conteudo, .dropdown-cont');
    todosMenus.forEach(function(menu) {
        if (menu.id !== idDoMenu) {
            menu.classList.remove('mostrar');
        }
    });

    // Abre ou fecha o menu específico que foi clicado
    document.getElementById(idDoMenu).classList.toggle("mostrar");
}

/* Função única: Fecha os menus se o usuário clicar fora */
window.onclick = function (event) {
    // Verifica se onde o usuário clicou NÃO é um botão de menu ou a setinha
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbt') && !event.target.matches('.drseta')) {
        
        // Pega todos os menus suspensos e remove a classe 'mostrar'
        var todosMenus = document.querySelectorAll(".dropdown-conteudo, .dropdown-cont");
        todosMenus.forEach(function(menu) {
            if (menu.classList.contains('mostrar')) {
                menu.classList.remove('mostrar');
            }
        });
    }
}

function abrirTrimestre(evento, idTrimestre) {
    // 1. Esconde todos os conteúdos de trimestre
    let conteudos = document.getElementsByClassName("aba-conteudo");
    for (let i = 0; i < conteudos.length; i++) {
        conteudos[i].style.display = "none";
    }

    // 2. Remove a classe "ativo" de todos os botões
    let botoes = document.getElementsByClassName("aba-btn");
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].className = botoes[i].className.replace(" ativo", "");
    }

    // 3. Mostra o trimestre clicado e marca o botão correspondente como ativo
    document.getElementById(idTrimestre).style.display = "block";
    evento.currentTarget.className += " ativo";
}
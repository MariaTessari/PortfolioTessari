// ==========================================================================
// CARROSSÉIS (suporte a múltiplos carrosséis na mesma página)
// ==========================================================================

// Função de compatibilidade para o carrossel antigo (index.html)
// Mantida para não quebrar páginas que usam onclick="mudarSlide()"
function mudarSlide(direcao) {
    const carrosselAntigo = document.getElementById('carrossel');
    if (!carrosselAntigo) return;

    const slidesContainer = carrosselAntigo.querySelector('.carrossel-slides');
    const slides = carrosselAntigo.querySelectorAll('.slide');
    if (!slidesContainer || slides.length === 0) return;

    const totalSlides = slides.length;
    let indiceAtual = parseInt(carrosselAntigo.dataset.indice || '0');

    indiceAtual += direcao;
    if (indiceAtual >= totalSlides) indiceAtual = 0;
    if (indiceAtual < 0) indiceAtual = totalSlides - 1;

    carrosselAntigo.dataset.indice = indiceAtual;
    const larguraSlide = carrosselAntigo.offsetWidth;
    slidesContainer.style.transform = `translateX(${-(indiceAtual * larguraSlide)}px)`;
}

function iniciarCarrossel(containerId) {
    const carrosselContainer = document.getElementById(containerId);
    if (!carrosselContainer) return;

    const slidesContainer = carrosselContainer.querySelector('.carrossel-slides');
    const slides = carrosselContainer.querySelectorAll('.slide');
    const btnEsq = carrosselContainer.querySelector('.seta-esq');
    const btnDir = carrosselContainer.querySelector('.seta-dir');
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    let indiceAtual = 0;

    function atualizarCarrossel() {
        if (!slidesContainer || !carrosselContainer) return;
        const larguraSlide = carrosselContainer.offsetWidth;
        const deslocamento = -(indiceAtual * larguraSlide);
        slidesContainer.style.transform = `translateX(${deslocamento}px)`;
    }

    if (btnDir) {
        btnDir.addEventListener('click', () => {
            indiceAtual++;
            if (indiceAtual >= totalSlides) {
                indiceAtual = 0;
            }
            atualizarCarrossel();
        });
    }

    if (btnEsq) {
        btnEsq.addEventListener('click', () => {
            indiceAtual--;
            if (indiceAtual < 0) {
                indiceAtual = totalSlides - 1;
            }
            atualizarCarrossel();
        });
    }

    window.addEventListener('resize', atualizarCarrossel);
}

// Inicializa todos os carrosséis da página ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa carrosséis com a classe .carrossel-container (IoT, atv_extra)
    const carrosseis = document.querySelectorAll('.carrossel-container');
    carrosseis.forEach(function(container) {
        iniciarCarrossel(container.id);
    });

    // Inicializa o carrossel antigo do index.html (id="carrossel")
    const carrosselAntigo = document.getElementById('carrossel');
    if (carrosselAntigo) {
        // Adiciona a classe .carrossel-container para aproveitar os estilos
        carrosselAntigo.classList.add('carrossel-container');
        iniciarCarrossel('carrossel');
    }
});

// ==========================================================================
// DROPDOWN UNIFICADO
// ==========================================================================

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

// ==========================================================================
// ABAS DE TRIMESTRE
// ==========================================================================

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
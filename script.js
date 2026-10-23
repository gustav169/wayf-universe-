
const elemento = (seletor) => document.querySelector(seletor);
const todos = (seletor) => document.querySelectorAll(seletor);

const carregamento = elemento("#carregamento");
const botaoEntrar = elemento("#botaoEntrar");
const portalAbertura = elemento("#portalAbertura");
const brilhoCursor = elemento("#brilhoCursor");
const botaoMenu = elemento("#botaoMenu");
const navegacao = elemento("#navegacao");

const modal = elemento("#modalIntegrante");
const fecharModal = elemento("#fecharModal");

const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// ========================================
// 1. CARREGAMENTO INICIAL
// ========================================

function finalizarCarregamento() {
    carregamento.classList.add("oculto");
}

window.addEventListener("load", () => {
    setTimeout(
        finalizarCarregamento,
        movimentoReduzido ? 0 : 1100
    );
});

// ========================================
// 2. ENTRADA CINEMATOGRÁFICA NO UNIVERSO
// ========================================

let portalEmExecucao = false;

botaoEntrar.addEventListener("click", () => {
    if (portalEmExecucao) return;

    portalEmExecucao = true;
    finalizarCarregamento();

    if (movimentoReduzido) {
        elemento("#universo").scrollIntoView();
        portalEmExecucao = false;
        return;
    }

    document.body.classList.add("portal-ativo");
    portalAbertura.classList.remove("ativo");

    // Reinicia a animação do portal.
    void portalAbertura.offsetWidth;

    portalAbertura.classList.add("ativo");

    setTimeout(() => {
        portalAbertura.classList.remove("ativo");
        document.body.classList.remove("portal-ativo");

        elemento("#universo").scrollIntoView({
            behavior: "smooth"
        });

        portalEmExecucao = false;
    }, 2800);
});

// ========================================
// 3. LUZ QUE ACOMPANHA O CURSOR
// ========================================

if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (evento) => {
        brilhoCursor.style.left = `${evento.clientX}px`;
        brilhoCursor.style.top = `${evento.clientY}px`;
    });
}

// ========================================
// 4. MENU PARA CELULARES
// ========================================

botaoMenu.addEventListener("click", () => {
    const aberto = navegacao.classList.toggle("aberta");

    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    botaoMenu.textContent = aberto ? "×" : "☰";
});

todos(".navegacao a").forEach((link) => {
    link.addEventListener("click", () => {
        navegacao.classList.remove("aberta");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.textContent = "☰";
    });
});

// ========================================
// 5. ELEMENTOS QUE SURGEM NA ROLAGEM
// ========================================

const elementosRevelar = todos(".revelar");

if ("IntersectionObserver" in window && !movimentoReduzido) {
    const observador = new IntersectionObserver(
        (entradas, observadorAtual) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observadorAtual.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    elementosRevelar.forEach((elemento) => {
        observador.observe(elemento);
    });
} else {
    elementosRevelar.forEach((elemento) => {
        elemento.classList.add("visivel");
    });
}

// ========================================
// 6. FOTOGRAFIAS DOS INTEGRANTES
// ========================================

// Se alguma foto não existir, a inicial estilizada
// continuará aparecendo no cartão.

todos(".foto-integrante img").forEach((foto) => {
    foto.addEventListener("error", () => {
        foto.classList.add("foto-ausente");
    });

    if (foto.complete && foto.naturalWidth === 0) {
        foto.classList.add("foto-ausente");
    }
});

// ========================================
// 7. INFORMAÇÕES DOS INTEGRANTES
// ========================================

const integrantes = {
    andrew: {
        nome: "ANDREW",
        coreano: "앤드류",
        simbolo: "A",
        indice: "ARQUIVO DO INTEGRANTE 01",
        foto: "assets/andrew.jpg",
        descricao:
            "Andrew Han integra o WAYF BOYS. Antes de entrar " +
            "no grupo, participou de projetos musicais e do " +
            "programa Boys II Planet. Sua trajetória também " +
            "inclui composição e escrita musical."
    },

    junmyeong: {
        nome: "JUNMYEONG",
        coreano: "준명",
        simbolo: "J",
        indice: "ARQUIVO DO INTEGRANTE 02",
        foto: "assets/junmyeong.jpg",
        descricao:
            "Junmyeong é um dos cinco integrantes do WAYF BOYS. " +
            "Antes de sua trajetória com o grupo, participou " +
            "do programa de competição B:MY BOYZ. Este perfil " +
            "apresenta sua trajetória artística."
    },

    anderson: {
        nome: "ANDERSON",
        coreano: "앤더슨",
        simbolo: "A.",
        indice: "ARQUIVO DO INTEGRANTE 03",
        foto: "assets/anderson.jpg",
        descricao:
            "Anderson Taylor integra o WAYF BOYS e participou " +
            "de NCT Universe: LASTART. Também possui créditos " +
            "de composição e escrita musical nas canções do grupo."
    },

    samuel: {
        nome: "SAMUEL",
        coreano: "사무엘",
        simbolo: "S",
        indice: "ARQUIVO DO INTEGRANTE 04",
        foto: "assets/samuel.jpg",
        descricao:
            "Samuel Lee faz parte do WAYF BOYS. Antes do grupo, " +
            "participou de Show Me the Money 11. Sua trajetória " +
            "artística inclui envolvimento com a criação musical."
    },

    ryan: {
        nome: "RYAN",
        coreano: "라이언",
        simbolo: "R",
        indice: "ARQUIVO DO INTEGRANTE 05",
        foto: "assets/ryan.jpg",
        descricao:
            "Ryan Hwang é integrante do WAYF BOYS e participou " +
            "do programa Boys II Planet. Além do trabalho com o " +
            "grupo, também possui trajetória musical individual."
    }
};

const modalNome = elemento("#modalNome");
const modalCoreano = elemento("#modalCoreano");
const modalSimbolo = elemento("#modalSimbolo");
const modalFoto = elemento("#modalFoto");
const modalDescricao = elemento("#modalDescricao");
const modalIndice = elemento("#modalIndice");

let elementoAnterior = null;

function abrirPerfil(chave, botao) {
    const integrante = integrantes[chave];

    if (!integrante) return;

    elementoAnterior = botao;

    modalNome.textContent = integrante.nome;
    modalCoreano.textContent = integrante.coreano;
    modalSimbolo.textContent = integrante.simbolo;
    modalDescricao.textContent = integrante.descricao;
    modalIndice.textContent = integrante.indice;

    modalFoto.src = integrante.foto;
    modalFoto.alt = `Fotografia de ${integrante.nome}, integrante do WAYF BOYS`;
    modalFoto.classList.remove("oculta");

    modalFoto.onerror = () => {
        modalFoto.classList.add("oculta");
    };

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-aberto");

    fecharModal.focus();
}

function fecharPerfil() {
    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-aberto");

    if (elementoAnterior) {
        elementoAnterior.focus();
    }
}

todos(".cartao-integrante").forEach((cartao) => {
    cartao.addEventListener("click", () => {
        abrirPerfil(cartao.dataset.integrante, cartao);
    });
});

fecharModal.addEventListener("click", fecharPerfil);

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        fecharPerfil();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        if (modal.classList.contains("aberto")) {
            fecharPerfil();
        }

        if (navegacao.classList.contains("aberta")) {
            navegacao.classList.remove("aberta");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.textContent = "☰";
        }
    }
});

// ========================================
// 8. VIDEOS MUSICAIS
// ========================================

const videos = {
    debut: {
        titulo: "WAYF BOYS<br><span>DO.</span>",
        descricao:
            "O single de estreia do grupo, lançado em agosto de 2026. " +
            "O primeiro capítulo desta jornada musical.",
        id: "diTn6dbJcy4",
        link: "https://www.youtube.com/watch?v=diTn6dbJcy4",
        tipo: "incorporado"
    },

    swag: {
        titulo: "<span>SWAG</span>",
        descricao:
            "O segundo lançamento do WAYF BOYS, com uma sonoridade " +
            "que combina elementos de R&B e hip-hop.",
        id: "iyGY3rFWv8Q",
        link: "https://www.youtube.com/watch?v=iyGY3rFWv8Q",
        tipo: "incorporado"
    },

    a4m: {
        titulo: "<span>A4M</span>",
        descricao:
            "O terceiro single do grupo, lançado em outubro de 2026, " +
            "com uma proposta visual e artística diferente.",
        link:
            "https://www.youtube.com/results?search_query=WAYF+BOYS+A4M+official+MV",
        tipo: "externo"
    }
};

const tituloMusica = elemento("#tituloMusica");
const descricaoMusica = elemento("#descricaoMusica");
const videoMusica = elemento("#videoMusica");
const quadroVideo = elemento(".reprodutor");
const linkVideo = elemento("#linkVideo");
const notaMusical = elemento("#notaMusical");

todos(".botao-musica").forEach((botao) => {
    botao.addEventListener("click", () => {
        const musica = videos[botao.dataset.video];

        if (!musica) return;

        todos(".botao-musica").forEach((outroBotao) => {
            outroBotao.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        tituloMusica.innerHTML = musica.titulo;
        descricaoMusica.textContent = musica.descricao;
        linkVideo.href = musica.link;

        if (musica.tipo === "incorporado") {
            quadroVideo.classList.remove("oculto");

            videoMusica.src =
                `https://www.youtube-nocookie.com/embed/${musica.id}?rel=0`;

            notaMusical.textContent =
                "O vídeo é reproduzido diretamente nesta página.";
            linkVideo.textContent = "ASSISTIR NO YOUTUBE ↗";
        } else {
            // Não inventa um endereço de vídeo para A4M.
            // Abre a pesquisa para localizar o videoclipe.
            videoMusica.src = "about:blank";
            quadroVideo.classList.add("oculto");

            notaMusical.textContent =
                "Abra a pesquisa para encontrar o videoclipe oficial de A4M.";

            linkVideo.textContent = "ENCONTRAR O CLIPE ↗";
        }
    });
});

// ========================================
// 9. FUNDO ANIMADO DE ESTRELAS
// ========================================

const tela = elemento("#estrelas");
const contexto = tela.getContext("2d");

let estrelas = [];
let largura = 0;
let altura = 0;
let quadroAnimacao = null;

function redimensionarTela() {
    const proporcao = Math.min(window.devicePixelRatio || 1, 2);

    largura = window.innerWidth;
    altura = window.innerHeight;

    tela.width = largura * proporcao;
    tela.height = altura * proporcao;

    contexto.setTransform(proporcao, 0, 0, proporcao, 0, 0);

    const quantidade = Math.min(
        180,
        Math.floor((largura * altura) / 6500)
    );

    estrelas = Array.from({ length: quantidade }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        raio: Math.random() * 1.3 + 0.2,
        opacidade: Math.random() * 0.7 + 0.15,
        velocidade: Math.random() * 0.18 + 0.025
    }));
}

function desenharEstrelas() {
    contexto.clearRect(0, 0, largura, altura);

    estrelas.forEach((estrela) => {
        contexto.beginPath();

        contexto.arc(
            estrela.x,
            estrela.y,
            estrela.raio,
            0,
            Math.PI * 2
        );

        contexto.fillStyle =
            `rgba(205, 194, 255, ${estrela.opacidade})`;

        contexto.fill();

        if (!movimentoReduzido) {
            estrela.y -= estrela.velocidade;

            if (estrela.y < -2) {
                estrela.y = altura + 2;
                estrela.x = Math.random() * largura;
            }
        }
    });

    if (!movimentoReduzido) {
        quadroAnimacao = requestAnimationFrame(desenharEstrelas);
    }
}

redimensionarTela();
desenharEstrelas();

window.addEventListener("resize", () => {
    if (quadroAnimacao !== null) {
        cancelAnimationFrame(quadroAnimacao);
    }

    redimensionarTela();
    desenharEstrelas();
});

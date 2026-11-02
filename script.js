// Variáveis do Estado do Jogo
let pontuacao = 50;
let indiceQuestao = 0;
let opcoesAtuais = [];

// Lista com as 9 Questões do Projeto
const questoes = [
    {
        enunciado: "1. Você é gerente de um supermercado e há vegetais perto do vencimento. O que fazer?",
        boa: "Consultar uma entidade local e organizar a separação dos vegetais para doação.",
        neutra: "Aplicar descontos nos produtos e acompanhar as vendas até o fim do expediente.",
        ruim: "Manter os vegetais armazenados até a próxima reposição.",
        consequencias: {
            boa: "Os vegetais em boas condições podem chegar a pessoas que precisam, em vez de serem desperdiçados.",
            neutra: "Parte dos produtos pode ser vendida, mas o que não sair ainda precisará de um destino.",
            ruim: "Com o passar do tempo, os vegetais podem perder qualidade e deixar de ser aproveitados."
        }
    },
    {
        enunciado: "2. Sua rede de restaurantes quer gerenciar o excedente do buffet. Qual atitude tomar?",
        boa: "Planejar uma parceria com uma organização que receba alimentos e definir como será a retirada.",
        neutra: "Combinar com a equipe como as sobras serão separadas ao fim do serviço.",
        ruim: "Encerrar o serviço e descartar todo o excedente sem verificar outras possibilidades.",
        consequencias: {
            boa: "Com critérios de conservação e retirada definidos, alimentos próprios para consumo podem ser aproveitados por mais pessoas.",
            neutra: "A equipe pode aproveitar parte das sobras, mas sem um processo combinado fica difícil manter o cuidado e a regularidade.",
            ruim: "Alimentos que ainda poderiam ser aproveitados acabam descartados, aumentando o volume de resíduos."
        }
    },
    {
        enunciado: "3. Sua empresa quer adotar práticas sustentáveis ligadas a incentivos fiscais.",
        boa: "Registrar as doações e consultar um profissional sobre programas de reconhecimento e incentivos.",
        neutra: "Manter as doações atuais e reunir informações sobre como elas são realizadas.",
        ruim: "Suspender as doações enquanto a empresa não tiver certeza sobre os procedimentos.",
        consequencias: {
            boa: "Registros organizados ajudam a demonstrar o impacto das doações e permitem avaliar incentivos aplicáveis.",
            neutra: "As doações continuam, mas sem informações reunidas pode ser difícil acompanhar resultados ou identificar oportunidades.",
            ruim: "A pausa reduz o alimento destinado a quem precisa e adia a oportunidade de esclarecer as dúvidas."
        }
    },
    {
        enunciado: "4. O desperdício de comida no refeitório da escola está alto. Como agir como líder?",
        boa: "Medir diariamente as sobras e compartilhar os dados com a comunidade escolar.",
        neutra: "Conversar com as turmas e espalhar lembretes sobre o tema pelo refeitório.",
        ruim: "Diminuir as porções servidas para toda a escola sem consultar os alunos.",
        consequencias: {
            boa: "Os dados ajudam a identificar onde ocorre o desperdício e a acompanhar se as mudanças estão funcionando.",
            neutra: "A conversa mantém o tema em pauta, embora sem medir as sobras seja difícil saber o que mudou.",
            ruim: "Porções menores para todos podem deixar alguns alunos sem quantidade suficiente, sem necessariamente resolver a causa das sobras."
        }
    },
    {
        enunciado: "5. Sobraram cascas e restos orgânicos inevitáveis na cozinha escolar. Qual o destino?",
        boa: "Separar os resíduos orgânicos e organizar uma composteira para a horta da escola.",
        neutra: "Separar os resíduos conforme as orientações da coleta municipal.",
        ruim: "Descartar os resíduos orgânicos junto com os demais resíduos da cozinha.",
        consequencias: {
            boa: "A compostagem transforma parte dos resíduos em adubo que pode ser usado na horta.",
            neutra: "A separação facilita a destinação adequada, de acordo com o serviço disponível na região.",
            ruim: "Misturados aos demais resíduos, os materiais orgânicos perdem a chance de uma destinação específica."
        }
    },
    {
        enunciado: "6. A escola recebeu frutas com formatos irregulares ('feias'), mas nutritivas.",
        boa: "Incluir as frutas no cardápio e conversar com os alunos sobre a variedade de formas e tamanhos.",
        neutra: "Usar as frutas nas preparações em que o formato tenha menos importância.",
        ruim: "Pedir ao fornecedor que envie apenas frutas com aparência uniforme.",
        consequencias: {
            boa: "A escola aproveita alimentos nutritivos e ajuda a questionar padrões visuais que não determinam a qualidade.",
            neutra: "Parte das frutas é aproveitada, mas outras podem continuar sem destino por causa da aparência.",
            ruim: "Frutas próprias para consumo podem ser recusadas apenas por não atenderem a um padrão visual."
        }
    },
    {
        enunciado: "7. Como você planeja as compras de mercado na sua casa para evitar desperdício?",
        boa: "Conferir o que já tem em casa e preparar uma lista antes de ir ao mercado.",
        neutra: "Aproveitar ofertas de itens que sua família costuma consumir.",
        ruim: "Fazer uma compra grande de produtos frescos sem verificar os estoques de casa.",
        consequencias: {
            boa: "A lista ajuda a comprar quantidades mais próximas do que a família realmente precisa.",
            neutra: "A oferta pode compensar quando os itens serão usados, mas compras extras podem acabar esquecidas.",
            ruim: "Sem conferir o que já existe, é mais fácil comprar em excesso e não consumir tudo a tempo."
        }
    },
    {
        enunciado: "8. Produtos próximos do prazo de validade estão misturados na despensa da escola. Como organizar o estoque?",
        boa: "Agrupar os itens por data e posicionar à frente os que devem ser usados primeiro, seguindo o rótulo.",
        neutra: "Revisar o estoque periodicamente e anotar os produtos que estão próximos da data.",
        ruim: "Guardar os produtos recém-chegados na frente sem reorganizar os que já estavam.",
        consequencias: {
            boa: "Organizar os itens dessa forma facilita usar cada produto no momento adequado e respeitar as instruções de conservação.",
            neutra: "As anotações ajudam no acompanhamento, embora a revisão periódica possa deixar menos tempo para planejar o uso.",
            ruim: "Os produtos que já estavam no estoque podem ficar esquecidos e passar do prazo antes de serem utilizados."
        }
    },
    {
        enunciado: "9. Sobrou uma grande quantidade de comida pronta após o almoço de família.",
        boa: "Dividir as sobras em recipientes fechados e refrigerar ou congelar o que será consumido depois.",
        neutra: "Guardar as sobras juntas em um recipiente na geladeira.",
        ruim: "Deixar as sobras sobre a mesa até decidir o que fazer com elas.",
        consequencias: {
            boa: "O armazenamento adequado ajuda a conservar a comida e facilita aproveitar as porções depois.",
            neutra: "A comida fica refrigerada, mas separar porções e identificar o que foi guardado pode facilitar o consumo.",
            ruim: "Alimentos prontos deixados por muito tempo fora de refrigeração podem se tornar impróprios para consumo e precisar ser descartados."
        }
    }
];

// Elementos da Interface
const screenStart = document.getElementById("screen-start");
const screenGame = document.getElementById("screen-game");
const screenEnd = document.getElementById("screen-end");

const btnStart = document.getElementById("btn-start");
const questionNumber = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");

const opt1Text = document.getElementById("opt-1-text");
const opt2Text = document.getElementById("opt-2-text");
const opt3Text = document.getElementById("opt-3-text");
const optionsContainer = document.getElementById("options-container");
const answerFeedback = document.getElementById("answer-feedback");
const consequenceText = document.getElementById("consequence-text");
const btnContinue = document.getElementById("btn-continue");

const endTitle = document.getElementById("end-title");
const finalScore = document.getElementById("final-score");
const endMessage = document.getElementById("end-message");
let gameOver = false;

// Iniciar o Jogo
btnStart.addEventListener("click", () => {
    screenStart.classList.remove("active");
    screenGame.classList.add("active");
    carregarQuestao();
});

function carregarQuestao() {
    const q = questoes[indiceQuestao];
    optionsContainer.hidden = false;
    answerFeedback.hidden = true;
    questionNumber.innerText = `Questão ${indiceQuestao + 1} de ${questoes.length}`;

    const pct = ((indiceQuestao + 1) / questoes.length) * 100;
    progressBar.style.width = `${pct}%`;

    questionText.innerText = q.enunciado;

    opcoesAtuais = [
        { texto: q.boa, pontos: 5, consequencia: q.consequencias.boa },
        { texto: q.neutra, pontos: 0, consequencia: q.consequencias.neutra },
        { texto: q.ruim, pontos: -5, consequencia: q.consequencias.ruim }
    ];

    for (let i = opcoesAtuais.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcoesAtuais[i], opcoesAtuais[j]] = [opcoesAtuais[j], opcoesAtuais[i]];
    }

    opt1Text.innerText = opcoesAtuais[0].texto;
    opt2Text.innerText = opcoesAtuais[1].texto;
    opt3Text.innerText = opcoesAtuais[2].texto;
}

// Processar a escolha do jogador
function responder(opcao) {
    const resposta = opcoesAtuais[opcao - 1];
    if (!resposta || answerFeedback.hidden === false) return;

    pontuacao += resposta.pontos;
    scoreDisplay.innerText = `Pontos: ${pontuacao}`;
    scoreDisplay.hidden = false;

    gameOver = pontuacao <= 30;
    consequenceText.innerText = resposta.consequencia;
    optionsContainer.hidden = true;
    answerFeedback.hidden = false;
    btnContinue.innerText = gameOver || indiceQuestao === questoes.length - 1
        ? "Ver resultado"
        : "Próxima pergunta";
}

function continuarJogo() {
    if (gameOver) {
        finalizarJogo(true);
        return;
    }

    indiceQuestao++;
    if (indiceQuestao < questoes.length) {
        carregarQuestao();
    } else {
        finalizarJogo(false);
    }
}

// Finalizar o Jogo (Exibir Resultados)
function finalizarJogo(gameOver) {
    screenGame.classList.remove("active");
    screenEnd.classList.add("active");

    finalScore.innerText = `Pontuação Final: ${pontuacao} pontos`;

    if (gameOver) {
        endTitle.innerText = "❌ GAME OVER!";
        endTitle.style.color = "#e74c3c";
        endMessage.innerHTML = `
            <strong>Sua pontuação caiu para 30 pontos ou menos!</strong><br><br>
            Suas escolhas pioraram a situação do desperdício de alimentos. O acúmulo de resíduos gerou aumento das emissões de gases do efeito estufa.<br>
            Tente novamente e tome decisões mais sustentáveis e alinhadas com a legislação!
        `;
    } else if (pontuacao >= 75) {
        endTitle.innerText = "🌟 STATUS: PERFEITO!";
        endTitle.style.color = "#2ecc71";
        endMessage.innerHTML = `
            <strong>Você está no caminho de resolver o problema!</strong><br><br>
            Excelente trabalho! Suas ações promoveram o combate efetivo ao desperdício, aproveitando leis como a 15.224/2025, incentivos fiscais e projetos educativos de compostagem e consumo consciente.
        `;
    } else if (pontuacao >= 40 && pontuacao <= 60) {
        endTitle.innerText = "⚖️ STATUS: NEUTRO";
        endTitle.style.color = "#f39c12";
        endMessage.innerHTML = `
            <strong>Algo realmente mudou?</strong><br><br>
            Você manteve uma média estável, mas suas ações não geraram um impacto significativo no combate ao desperdício. Há muito espaço para melhorar a gestão de sobras e a conscientização.
        `;
    } else {
        endTitle.innerText = "⚠️ STATUS: RUIM";
        endTitle.style.color = "#e67e22";
        endMessage.innerHTML = `
            <strong>Impacto Insuficiente!</strong><br><br>
            Suas decisões não foram suficientes para evitar o desperdício em grande escala. Considere rever os hábitos de consumo e as políticas de doação.
        `;
    }
}

// Reiniciar a partida
function reiniciarJogo() {
    pontuacao = 50;
    indiceQuestao = 0;
    gameOver = false;
    scoreDisplay.innerText = "";
    scoreDisplay.hidden = true;
    optionsContainer.hidden = false;
    answerFeedback.hidden = true;
    screenEnd.classList.remove("active");
    screenStart.classList.add("active");
}
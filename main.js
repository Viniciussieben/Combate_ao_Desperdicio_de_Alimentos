// Variáveis do Estado do Jogo
let pontuacao = 50;
let indiceQuestao = 0;

// Lista com as 9 Questões do Projeto
const questoes = [
    {
        enunciado: "1. Você é gerente de um supermercado e há vegetais perto do vencimento. O que fazer?",
        boa: "Doar para entidades usando a Lei nº 15.224/2025 para ter segurança jurídica.",
        neutra: "Reduzir o preço e descartar o que sobrar no fim do dia.",
        ruim: "Trancar e jogar tudo no lixo para evitar qualquer risco de processo."
    },
    {
        enunciado: "2. Sua rede de restaurantes quer gerenciar o excedente do buffet. Qual atitude tomar?",
        boa: "Firmar parceria com bancos de alimentos e controle de transporte (PL 801/2024).",
        neutra: "Liberar a sobra informalmente para os funcionários levarem para casa.",
        ruim: "Jogar o excesso direto na lixeira comum por receio sanitário."
    },
    {
        enunciado: "3. Sua empresa quer adotar práticas sustentáveis ligadas a incentivos fiscais.",
        boa: "Requerer o Selo Doador de Alimentos e usar deduções no Imposto de Renda.",
        neutra: "Continuar doando esporadicamente sem registro oficial.",
        ruim: "Cancelar qualquer doação até que haja obrigatoriedade sob multa."
    },
    {
        enunciado: "4. O desperdício de comida no refeitório da escola está alto. Como agir como líder?",
        boa: "Criar o projeto 'Desperdiçômetro' com pesagens diárias e gráficos públicos.",
        neutra: "Colocar apenas cartazes simples nas paredes pedindo para não desperdiçar.",
        ruim: "Reduzir drasticamente a comida servida, gerando fome nos alunos."
    },
    {
        enunciado: "5. Sobraram cascas e restos orgânicos inevitáveis na cozinha escolar. Qual o destino?",
        boa: "Criar uma composteira escolar gerenciada pelos alunos para adubar a horta.",
        neutra: "Enviar os resíduos para a coleta seletiva municipal comum.",
        ruim: "Misturar os resíduos orgânicos com plásticos e papéis na lixeira comum."
    },
    {
        enunciado: "6. A escola recebeu frutas com formatos irregulares ('feias'), mas nutritivas.",
        boa: "Utilizar integralmente os alimentos e ensinar os alunos sobre o valor nutricional.",
        neutra: "Aceitar os alimentos, mas descartar as partes com aparência diferente.",
        ruim: "Rejeitar o fornecedor e exigir apenas frutas com padrão visual perfeito."
    },
    {
        enunciado: "7. Como você planeja as compras de mercado na sua casa para evitar desperdício?",
        boa: "Conferir a geladeira, montar lista e comprar itens frescos fracionados.",
        neutra: "Ir ao mercado sem lista e comprar pacotes promocionais grandes.",
        ruim: "Fazer uma compra mensal gigante de perecíveis sem checar o armário."
    },
    {
        enunciado: "8. Você achou um produto na despensa vencido ontem, mas lacrado e com bom aspecto.",
        boa: "Aplicar a regra PEPS (primeiro a entrar, primeiro a sair) e inspecionar o produto.",
        neutra: "Guardar o produto no fundo da prateleira para decidir depois.",
        ruim: "Jogar o alimento fora imediatamente só por causa da data do rótulo."
    },
    {
        enunciado: "9. Sobrou uma grande quantidade de comida pronta após o almoço de família.",
        boa: "Congelar o excedente em porções individuais para consumir na semana.",
        neutra: "Deixar a sobra na geladeira sem tampa até lembrar de comer.",
        ruim: "Deixar a comida fora da geladeira de um dia para o outro e descartá-la estragada."
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

const endTitle = document.getElementById("end-title");
const finalScore = document.getElementById("final-score");
const endMessage = document.getElementById("end-message");

// Iniciar o Jogo
btnStart.addEventListener("click", () => {
    screenStart.classList.remove("active");
    screenGame.classList.add("active");
    carregarQuestao();
});

function carregarQuestao() {
    const q = questoes[indiceQuestao];
    questionNumber.innerText = `Questão ${indiceQuestao + 1} de ${questoes.length}`;
    scoreDisplay.innerText = `Pontos: ${pontuacao}`;
    
    // Atualiza a barra de progresso visual baseada na pontuação (0 a 100%)
    let pct = Math.max(0, Math.min(100, pontuacao));
    progressBar.style.width = `${pct}%`;

    questionText.innerText = q.enunciado;
    opt1Text.innerText = q.boa;
    opt2Text.innerText = q.neutra;
    opt3Text.innerText = q.ruim;
}

// Processar a escolha do jogador
function responder(opcao) {
    if (opcao === 1) pontuacao += 5;       // Boa
    else if (opcao === 2) pontuacao += 0;  // Neutra
    else if (opcao === 3) pontuacao -= 5;  // Ruim

    // Checagem de Game Over antecipado (<= 30 pontos)
    if (pontuacao <= 30) {
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
    screenEnd.classList.remove("active");
    screenStart.classList.add("active");
}
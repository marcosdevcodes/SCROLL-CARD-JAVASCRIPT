// Seleciona todos os elementos com a classe .card 
// e os armazena em uma NodeList chamada cards
let cards = document.querySelectorAll(".card");
let stackArea = document.querySelector(".stack-area");

function rotateCards() {
    let angle = 0;// Variável para controlar o ângulo de rotação inicial dos cards.

    //Itera sobre cada card na lista cards.
    // O índice (index) ajuda a calcular a ordem de sobreposição dos cards (zIndex)    
    cards.forEach((card, index) => {
        // Verifica se o card possui a classe away
      if(card.classList.contains("away")){
        // translateY(-120vh): Move o card para cima, fora da tela.
        // rotate(-48deg): Inclina o card em um ângulo de -48 graus.
        card.style.transform = `translateY(-120vh) rotate(-48deg)`;
      }else{
        // Não (false): O card permanece na pilha com:
        // rotate(${angle}deg): Rotaciona o card em um ângulo crescente.
        card.style.transform = ` rotate(${angle}deg)`;
        angle = angle - 10;// angle = angle - 10;: Ajusta o ângulo para o próximo card.
        card.style.zIndex = cards.length - index;// zIndex: Define a ordem de sobreposição do card
      }
    });
}
// Executa a função assim que o script é carregado, posicionando os cards inicialmente.
rotateCards();

window.addEventListener("scroll", () => {
    // Define a distância relativa à altura da janela (metade da altura da tela).
    let distance = window.innerHeight * 0.5;

    // Calcula a distância do topo do contêiner .stack-area em relação à viewport.
    let topVal = stackArea.getBoundingClientRect().top;

    // Determina qual card deve ser marcado como "afastado" (away) com base na posição de rolagem.
    // Math.floor(index): Arredonda o índice para baixo.
    let index = -1 * (topVal / distance + 1);

    index = Math.floor(index);

    for(i = 0; i < cards.length; i++){
    // i <= index:
    // Adiciona a classe away aos cards que devem ser movidos para fora da tela
      if(i <= index){
        cards[i].classList.add("away");
      }else{
        //i > index:
        // Remove a classe away para trazer os cards de volta à pilha.
        cards[i].classList.remove("away");
      }
    }
    // Reajusta a posição e rotação dos cards com base no estado atualizado.
    rotateCards();
});


const cardArray = [
    {
        name:'fries',
        img:'images/fries.png'
    },
    {
        name:'cheesburger',
        img:'images/cheeseburger.png'
    },
    {
        name:'hotdog',
        img:'images/hotdog.png'
    },
    {
        name:'ice-cream',
        img:'images/ice-cream.png'
    },
    {
        name:'milkshake',
        img:'images/milkshake.png'
    },
    {
        name:'pizza',
        img:'images/pizza.png'
    },
    {
        name:'fries',
        img:'images/fries.png'
    },
    {
        name:'cheesburger',
        img:'images/cheeseburger.png'
    },
    {
        name:'hotdog',
        img:'images/hotdog.png'
    },
    {
        name:'ice-cream',
        img:'images/ice-cream.png'
    },
    {
        name:'milkshake',
        img:'images/milkshake.png'
    },
    {
        name:'pizza',
        img:'images/pizza.png'
    }
]
cardArray.sort(()=> 0.5 - Math.random())
console.log(cardArray)

const gridDisplay = document.querySelector('#grid');

const createBoard = ()=>{
    cardArray.forEach((element,index)=>{
        const card = document.createElement('img');
        card.setAttribute('src','images/blank.png');
        card.setAttribute('data-id', index);
        card.setAttribute('name',element.name);
        card.addEventListener('click', flipCard);
        console.log(typeof(index))
        gridDisplay.appendChild(card);
    })
}
createBoard();

let chosenCardsId = [];
let chosenCards = [];
let guess = [];
let count = 0;

const checkForMatch = (chosenCard1, chosenCard2) =>{
    const cards = document.querySelectorAll('img');

    if(chosenCardsId[0] == chosenCardsId[1]){
        alert('You\'ve clicked the same picture!');
        cards[chosenCardsId[0]].setAttribute('src','images/blank.png')
        cards[chosenCardsId[1]].setAttribute('src','images/blank.png')
        chosenCards = [];
        chosenCardsId = [];
        return;
    }
    if(chosenCards[0] == chosenCards[1]){
        cards[chosenCardsId[0]].setAttribute('src','images/white.png')
        cards[chosenCardsId[1]].setAttribute('src','images/white.png')
        let result = document.querySelector('#result');
        count++;
        result.textContent = count; 

        guess.push(chosenCard1);
        cards[chosenCardsId[0]].removeEventListener('click', flipCard);
        cards[chosenCardsId[1]].removeEventListener('click', flipCard);

    }else{

        cards[chosenCardsId[0]].setAttribute('src','images/blank.png')
        cards[chosenCardsId[1]].setAttribute('src','images/blank.png')
    }
    if(guess.length == cardArray.length/2){
        
        let winMessage = document.createElement('div');
        winMessage.innerHTML = '<h2>Congratulations, you\'ve successfully completed the game!</h2>';
        gridDisplay.appendChild(winMessage);
    }
    chosenCards = [];
    chosenCardsId = [];
    
}
function flipCard(event){
    let cardId = this.getAttribute('data-id')
    chosenCardsId.push(cardId);
    chosenCards.push(cardArray[cardId].name)
    this.setAttribute('src',cardArray[cardId].img);


    if(chosenCards.length === 2){       
        
        setTimeout(checkForMatch, 500)
        
    }
    
    
}














const createGridBoard = ()=>{
    for(let i =1; i<10; i++){
        
        const grid = document.querySelector('.grid');
        let newEl = document.createElement('div');
        newEl.setAttribute('class','square');
        newEl.setAttribute('id', i);
        grid.appendChild(newEl);
    }
}
createGridBoard();

const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');

let timeLeftElement = document.querySelector('#time');
let score = document.querySelector('#score');

let result = 0;
let hitPosition;
let timerId = null;
let timeLeft = 60;

let speed = 1000;

//lvl buttons
const buttons = document.querySelectorAll('button');
buttons[1].classList.add('medium');

buttons.forEach(button=>{
    button.addEventListener('click',()=>{
        buttons.forEach(b =>{
            b.classList.remove(b.id)
        })
        button.classList.add(button.id);
        if(button.id == 'easy'){
           speed = 1500;
        }else if(button.id == 'medium'){
            speed = 1000;
    
        }else if(button.id == 'hard'){
           speed = 650;
        }   
        clearInterval(timerId)
        moveMole();
    })
})
const randomSquare = ()=>{
    squares.forEach(square =>{
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}

squares.forEach(square =>{
    square.addEventListener('mousedown', ()=>{
        if(square.id == hitPosition){
            result++;
            score.textContent = result;
            hitPosition = null;
            square.style.backgroundColor= 'green';
            setTimeout(() => {
                square.style.backgroundColor= '';
                
            }, 100);
        }else{
            square.style.backgroundColor= 'red';
            setTimeout(() => {
                square.style.backgroundColor= '';
                
            }, 100);
        }
    })
})

const moveMole = ()=>{
    
    timerId = setInterval(randomSquare, speed);
    console.log(speed)
}

moveMole();

const countDown = () =>{
    timeLeft--;
    timeLeftElement.textContent = timeLeft;

    if(timeLeft == 0){
        clearInterval(timerId);
        clearInterval(countDownTimerId);
        alert('GAME OVER! Score: '+result);
    }
}

let countDownTimerId = setInterval(countDown, 1000);
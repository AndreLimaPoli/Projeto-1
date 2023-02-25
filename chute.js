const game = new Game();


const startScreen = document.querySelector('#start-screen');
const gameScreen = document.querySelector('#game-screen');


const startBtn = document.querySelector('.buttonA');
startBtn.addEventListener('click', () => {
    game.start();
    
})

document.addEventListener('keyup', (event) => {
    if(!game.playing)return;
    switch(event.key){
        case " ":
        case "ArrowUp" :
            game.ball.kicked = true;
            break;
            
    }
})
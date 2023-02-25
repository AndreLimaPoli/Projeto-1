class Game {
    constructor() {
        this.score = 0;
        this.goalKeeper = null;
        this.ball = null;
        this.try = 1;
        this.playing = false;
        this.intervalId = null;
        this.frames = 0;
    }

    start () { 
        this.goToGameScreen();
        this.initializeGame();
    }

    goToGameScreen () {
        startScreen.classList.add ('hidden');
        gameScreen.classList.remove ('hidden');
    }
    
    initializeGame() {
        this.ball = new Ball();
        this.goalKeeper = new Goalie();
        this.startChecking();
    }
    
    restartGame(){
        this.score = 0;
        this.try = 1;
        this.playing = false;
        this.intervalId = null;
        this.frames = 0;
        this.startChecking();
    }

    startChecking() {
        this.playing = true;
        this.intervalId = setInterval(this.updateGame, 20);
        
    }
    

    updateGame = () => {

        if(!this.playing) return;

        this.frames += 1;

        this.goalKeeper.move();
        this.ball.move();             
        
        const goalKeeperSaved = this.ball.contato(this.goalKeeper);
        if (goalKeeperSaved) {
            this.saveDone();
        } 

        const goalHappened = this.ball.y <= 200;
        if (goalHappened) {
            
            this.goalScored();

        }
    }    

    stopGame(){
        clearInterval(this.intervalId);
        this.playing = false;
    }
    
    saveDone() {
        this.stopGame();
        this.try++;

        if(this.try <= 5) {
            this.nextShoot();
        } else {
            // show game over
            this.finishGame();
        }
    }

    goalScored() {
        this.stopGame();

        this.score++;
        this.updateScoreboard();

        this.try++;

        if(this.try <= 5) {
            this.nextShoot();
        } else {
            // show game over
            this.finishGame();
        }
    }

    finishGame(){

        let message = 'Try again, you can get better';
        let color = 'red';
        
        switch(this.score){
            case 5:
                message = 'You\'re THE BEST';
                color = 'blue';
                break;
            case 4:
            case 3:
                message = 'Nice Job, you scored ' + this.score + ' goals';
                color = 'blue';
                break;
            case 2:
                message = 'You could have done better, you scored ' + this.score + ' goals';
                color = 'orange';
                break;
            case 1:
                message = 'Try again, you can get better';
                color = 'orangered';
                break;
            default:
                break;
                
        }
        const messageElement = document.getElementById('message');

        messageElement.innerText = message;
        messageElement.style.color = color;
    }

    nextShoot() {
        this.ball.resetBallPosition();
        this.goalKeeper.resetGoalKeeperPosition();
        this.startChecking();
    }
    
    updateScoreboard(){
        document.getElementById('score-board').getElementsByTagName('li')[this.try - 1].classList.add("scored");
    }

}

class Ball {
    constructor() {
        this.resetDefault();
        this.element = null;
        this.createElement();
        this.show();
    }
    
    resetDefault(){
        this.width = 100;
        this.height = 100;
        this.x = 700;
        this.y = 619;
        this.speed = 5;   
        this.kicked = false;     
    }

    setDataToBall(bola) {
        bola.style.width = `${this.width}px`;
        bola.style.height = `${this.height}px`;
        bola.style.position = 'absolute';
        bola.style.top = `${this.y}px`;
        bola.style.left = `${this.x}px`;
    }
    
    resetBallPosition() {
        this.resetDefault();
        this.setDataToBall(this.element);
    }

    createElement() {
        const bola = document.createElement('img');
        bola.src = "./image/bola2.png";
        bola.setAttribute('id', 'ball');
        bola.style.borderRadius = '50%';
        this.setDataToBall(bola);
        this.element = bola;
    }

    show() {
        document.querySelector('#game-screen').appendChild(this.element);
    }

    move() {
        if (!this.kicked) return;
        if (this.y <= 200) return;

        this.y -= this.speed;
        this.element.style.top = `${this.y}px`;
        
    }

    contato(goalKeeper) {
        const top = this.y;
        const bottom = this.y + this.height;
        const left = this.x;
        const right = this.x + this.width;
        const obsTop = goalKeeper.y;
        const obsBottom = goalKeeper.y + goalKeeper.height;
        const obsLeft = goalKeeper.x;
        const obsRight = goalKeeper.x + goalKeeper.width;    
        const out = bottom < obsTop || top > obsBottom || left > obsRight || right < obsLeft;
        return !out;
        
    }

}

class Goalie {
    constructor() {
        this.setInitialValues();
        this.createElement();
        this.show();
    }

    setInitialValues() {
        this.x = 730;
        this.y = 250;
        this.speed = 4;
        this.width = 75;
        this.height = 220;
        this.direction = 1;
    }

    setInitialPosition(goleiro) {
        goleiro.style.width = `${this.width}px`;
        goleiro.style.height = `${this.height}px`;
        goleiro.style.position = 'absolute';
        goleiro.style.top = `${this.y}px`;
        goleiro.style.left = `${this.x}px`;
    }

    resetGoalKeeperPosition(){
        this.setInitialValues();
        this.setInitialPosition(this.element);
    }

    createElement() {
        const goleiro = document.createElement('img');
        goleiro.src = "./image/goleiro.jpg";
        goleiro.classList.add('goalKeeper');
        this.setInitialPosition(goleiro);
        this.element = null;
        this.element = goleiro;
        document.querySelector('#game-screen').appendChild(goleiro);

    }

    show() {
        gameScreen.appendChild(this.element);
    }

    move() {
        if (this.x >= 1000) this.direction = -1;
        if (this.x <= 420) this.direction = 1;
        this.x += this.speed * this.direction;
        this.element.style.left = `${this.x}px`;
    }

}





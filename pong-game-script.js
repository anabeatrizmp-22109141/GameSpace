/* Cria jogo */

var canvas = document.querySelector("canvas")
var c = canvas.getContext('2d')

class Game {
    constructor(player1, player2, ball) {
        this.pointsP1 = 0
        this.pointsP2 = 0
        this.player1 = player1
        this.player2 = player2
        this.ball = ball
    }

    drawScoreboard() {
        c.font = "48px serif";
        c.fillText(this.pointsP1, 276, 50);
        c.fillText(this.pointsP2, 400, 50);
    }

    addPointsP1() {
        if(this.pointsP1 + 1 == 10) {
            this.pointsP1 = 0
            this.pointsP2 = 0
        }
        else {
            this.pointsP1++
        }
        c.fillStyle = "#123554"
        c.fillRect(250,10, 50, 50);
        c.fillStyle = "white"
        c.fillText(this.pointsP1, 276, 50);

        
    }

    addPointsP2() {
        if(this.pointsP2 + 1 == 10) {
            this.pointsP1 = 0
            this.pointsP2 = 0
        }
        else {
            this.pointsP2++
        }
        c.fillStyle = "#123554"
        c.fillRect(400,10, 50, 50);
        c.fillStyle = "white"
        c.fillText(this.pointsP2, 400, 50)
    }
}


class Player {
    constructor(numPlayer) 
    {   
        if(numPlayer === 1) {
            this.x = 20
        }
        else {
            this.x = 660
        }
        this.y = 10;
        this.height = 75
        this.width = 20
        this.numPlayer = numPlayer 
    }

    drawPlayer() {

        c.fillStyle = "white"

        if(this.numPlayer === 1) {
            c.fillRect(this.x, this.y, this.width, this.height)
        }
        else {
            c.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    movePlayer(direction) {

        if(this.numPlayer === 1) {
            c.clearRect(this.x, this.y, 20, 75)
        }
        else {
            c.clearRect(this.x, this.y, 20, 75)
        }
        if(direction === 1 && this.y + 4 <= 420 ) {
            this.y += 4
        }
        else if(direction === -1 && this.y - 4 >= 5) {
            this.y -= 4
        }

        this.drawPlayer()   
    }
}
var velocities = [-1, 1];
class Ball {
    constructor() {
        this.height = 20
        this.width = 20
        this.radius = 10
        this.x = 340
        this.y = 240
        this.velocity = velocities[Math.floor(Math.random()*velocities.length)];
        this.direction = Math.random(-1,1);
    }

    drawBall() {
        c.fillStyle = "white";
        c.fillRect(this.x, this.y, 20, 20);
    }

}


/* Escuta pelas teclas */

let keys = {}

addEventListener("keydown", function(event) {
    keys[event.keyCode] = true
})

addEventListener("keyup", function(event) {
    delete keys[event.keyCode];
})

//Inicializa coisas do jogo

const player1 = new Player(1)
const player2 = new Player(2)
let ball = new Ball()
const game = new Game(player1, player2)

function drawAll() {

    c.clearRect(0,0,c.width, c.height)

    c.fillStyle = "#123554"
    c.fillRect(0, 0, 700, 500)

    c.setLineDash([30, 20]); /*dashes are 30px and spaces are 20px*/
    c.beginPath();
    c.moveTo(350,10);
    c.lineTo(350, 490);
    c.strokeStyle = "white"
    c.stroke();

    player1.drawPlayer()
    player2.drawPlayer()
    ball.drawBall()
    game.drawScoreboard()

}

function moveBall() {
    ballCollision()

   if(ball.y + ball.direction <= 0 || ball.y + ball.direction + ball.height >= canvas.height) {
    ball.direction = ball.direction * (-1)
    ball.y += ball.direction
    ball.x += ball.velocity
   }
   else {
    ball.y += ball.direction
    ball.x += ball.velocity 
   }

}

function ballCollision() {

    if( ball.x + ball.velocity <= player1.x && (ball.y + ball.direction >= player1.y || ball.y + ball.direction + ball.height >= player1.y )
    && (ball.y <= player1.y + player1.height || ball.y + ball.height <= player1.y + player1.height) ) {
        console.log(ball.y + ball.direction)
        console.log(player1.y + player1.height)
        ball.velocity = ball.velocity * -1
        ball.y += ball.direction
        ball.x += ball.velocity 
        ball.velocity += 0.2
    }

    if(ball.x + ball.velocity >= player2.x && (ball.y + ball.direction >= player2.y || ball.y + ball.direction + ball. height >= player2.y) && 
    (ball.y <= player2.y + player2.height || ball.y + ball.height <= player2.y + player2.height ) ) {
        console.log(ball.y + ball.direction)
        console.log(player1.y + player1.height)
        ball.velocity = ball.velocity * -1
        ball.y += ball.direction
        ball.x += ball.velocity 
    }
    
    if(ball.x + ball.velocity <= 0) {
        game.addPointsP2()
        ball = new Ball()
    }
    else if(ball.x + ball.velocity + ball.width >= canvas.width){
        game.addPointsP1()
        ball = new Ball()
    }
    else {
        ball.y += ball.direction
        ball.x += ball.velocity
    }

    drawAll()

}

function game_loop() {
    drawAll()
    
    if(keys[87] == true) {
        player1.movePlayer(-1)
    }
    if(keys[83] == true) {
        player1.movePlayer(1)
    }
    if (keys[38] == true){
        player2.movePlayer(-1)
    }
    if (keys[40] == true) {
        player2.movePlayer(1)
    }

    moveBall()

    window.requestAnimationFrame(game_loop)
}

game_loop()


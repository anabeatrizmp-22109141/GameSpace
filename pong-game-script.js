
/* Cria jogo */
var canvas = document.querySelector("canvas")
var c = canvas.getContext('2d')

c.fillStyle = "transparent"
c.fillRect(0, 0, 700, 500)

c.setLineDash([30, 20]); /*dashes are 30px and spaces are 20px*/
c.beginPath();
c.moveTo(350,10);
c.lineTo(350, 490);
c.strokeStyle = "white"
c.stroke();

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
        c.fillStyle = "#123554"
        c.fillRect(250,10, 50, 50);
        this.pointsP1++
        c.fillStyle = "white"
        c.fillText(this.pointsP1, 276, 50);
    }

    addPointsP2() {
        c.fillStyle = "#123554"
        c.fillRect(400,10, 50, 50);
        this.pointsP2++
        c.fillStyle = "white"
        c.fillText(this.pointsP2, 400, 50)
    }
}


class Player {
    constructor(numPlayer) 
    {
        this.y = 10;
        this.height = 500
        this.width = 100
        this.numPlayer = numPlayer 
    }

    drawPlayer() {

        c.fillStyle = "white"

        if(this.numPlayer === 1) {
            c.fillRect(20, this.y, 20, 75)
        }
        else {
            c.fillRect(660, this.y, 20, 75)
        }
    }

    movePlayer(direction) {

        if(this.numPlayer === 1) {
            c.clearRect(20, this.y, 20, 75)
        }
        else {
            c.clearRect(660, this.y, 20, 75)
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


/* Escuta pelas teclas */

let keys = {}

addEventListener("keydown", function(event) {
    keys[event.keyCode] = true
})

addEventListener("keyup", function(event) {
    delete keys[event.keyCode];
})

class Ball {
    constructor() {
        this.height = 10
        this.width = 10
        this.velocity = 3
        this.direction = Math.random(-1, 1)
    }

    drawBall() {
        c.fillStyle = "white";
        c.fillRect(340, 240, 20, 20);
    }

    moveBall() {

        return true;
    }

}


const player1 = new Player(1)
const player2 = new Player(2)
player1.drawPlayer()
player2.drawPlayer()

const ball = new Ball()
ball.drawBall()

const game = new Game(player1, player2)
game.drawScoreboard()

function game_loop() {

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

    window.requestAnimationFrame(game_loop)
}

game_loop()
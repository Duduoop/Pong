//board propietyies
let board;
let boardWidth = 500;//the WIDTH of the board of canvas
let boardHeight = 500;//the HEIGHT of the board of canvas
let context;

//players
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
    x : 10,
    y : boardHeight/2,
    width : playerWidth,
    height : playerHeight,
    velocityY : playerVelocityY
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : boardHeight/2,
    width : playerWidth,
    height : playerHeight,
    velocityY : playerVelocityY
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    velocityX : 1,
    velocityY : 2
}

let player1Score = 0;
let player2Score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing the canvas or board

    //draw initial player1
    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
}

function update () {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //player 1 block thing
    context.fillStyle = "skyblue";
    //player1.y += player1.velocityY;
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!OutOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //player 2 block thing
    //player2.y += player2.velocityY;
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!OutOfBounds (nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height,)
    // ball were is where i make BALl
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //if ball touches top or bottom of canvas / box in where the sh*t happens
    if (ball.y <= 0 || (ball.y + ball.height >= boardHeight)) {
        ball.velocityY *= -1; //reverse direction
    }

    //bounce the ball back from any thing LOL
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            //left side of ball touches the right of player1
            ball.velocityX *= -1; //flip x direction
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) {
            //right side of ball touches left side of player2
            ball.velocityX *= -1; //flip x direction
        }
}

    //game over If ball touches the rivals end of canvas.
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    }
    else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        resetGame(-1);
    }

    //score
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth/5, 45)
    context.fillText(player2Score, boardWidth*4/5 -45, 45);

function OutOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && //a's top laft corner doesn't reach b's top right corner
        a.x + a.width > b.x && //a's top right corner passes b's top left corner
        a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y; //a's bottom left corner passes sb's left corner
}
}

function movePlayer(e) {
    //player 1
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

    //player2
    if (e.code == "ArrowUp") {
    player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}


function resetGame(direction) {
     ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width : ballWidth,
        height : ballHeight,
        velocityX : 1,
        velocityY : 2
    }   
}
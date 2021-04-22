const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const brickRow = 9;
const brickColumn = 5;

let score = 0;
const ball = {
    x : canvas.width / 2,
    y : canvas.height /2,
    size : 10,
    speed : 4,
    dx : 4,
    dy : -4
};

const paddle = {
    x : canvas.width / 2 -40,
    y : canvas.height -20,
    width : 80,
    height : 10,
    dx : 0
}

const brickData = {
    width: 70,
    height : 20,
    padding :10,
    offsetX : 45,
    offsetY : 60,
    visible : true
}

const bricks = [];
for(let i=0; i < brickRow; i++ ){
    bricks [i] = [];
    for(let j=0; j < brickColumn; j++){
     const x = i * (brickData.width + brickData.padding) + brickData.offsetX;
     const y = j * (brickData.height + brickData.padding) + brickData.offsetY;
     bricks [i][j] = { x,y,...brickData }
    }
} 

function createBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();
}

function createPaddle(){
    ctx.beginPath();
    ctx.rect(paddle.x,paddle.y,paddle.width,paddle.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();
}
function createScore(){
    ctx.font = '20px Aerial';
    ctx.fillText(`score : ${score}`, canvas.width -100,30);
}

function createBrick(){
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x,brick.y,brick.width,brick.height);
            ctx.fillStyle = brick.visible ? '#FFFFFF' : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}


function draw(){
   createBall();
   createPaddle();
   createScore();
   createBrick();
}

draw();


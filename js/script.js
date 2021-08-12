
const showover = document.getElementById('overGame');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const txt = document.getElementById('gameoverText');

var sfx = {
    over: new Howl({
        src : [
            './assets/game-over.wav',
       ]
    })
}

const brickRow = 9;
const brickColumn = 5;



let score = 0;
let life = 3;
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
    speed :8,
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

function createLife(){
    ctx.font = '20px Aerial';
    ctx.fillText(`life : ${life}`, canvas.width -200,30);
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

function movePaddle(){
    paddle.x += paddle.dx;

    if(paddle.x + paddle.width > canvas.width){
        paddle.x = canvas.width - paddle.width;
    }
    if(paddle.x < 0){
        paddle.x = 0;
    }
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
       ball.dx *=  -1;
    }
    if(ball.y + ball.size > canvas.width || ball.y - ball.size < 0){
        ball.dy *=  -1;
        lifeDecrease();
     }

    if(ball.x - ball.size >paddle.x &&
        ball.x + ball.size < paddle.x + paddle.width &&
        ball.y + ball.size > paddle.y
        ){
           ball.dy = -ball.speed; 
           
        }
    bricks.forEach(column => {
        column.forEach(brick =>{
            if(brick.visible){
                if(
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.width &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.height
                ){
                    ball.dy *= -1;
                    brick.visible = false;

                    scoreIncrease();
                   
                }
            }
        } )
    })
    


    if(ball.y + ball.size > canvas.height){
        showAllBricks();
    
    } 
    
    
}

function scoreIncrease(){
    score++;

    if(score % (brickRow * brickRow) === 0){
        showAllBricks();
        
    }
}

function lifeDecrease(){
    life--;

    if(life === 0){
        sfx.over.play();
        alert('Game Over!' + ' '+ 'Your score is '+ score)
       
        
        
        document.location.reload();
    }


}



function showAllBricks(){
    bricks.forEach(column => {
        column.forEach(brick => (brick.visible = true));
    });
}

function draw(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   createBall();
   createPaddle();
   createScore();
   createBrick();
   createLife();
}



function update() {
    movePaddle();
    moveBall();

    draw();

    requestAnimationFrame(update);
}

update();

function keyDown(e){
    if(e.key === 'Right' || e.key === 'ArrowRight'){
      paddle.dx = paddle.speed;
    }else if(e.key === 'Left' || e.key === 'ArrowLeft' ){
      paddle.dx = -paddle.speed;
    }
}

function keyUp(e){
    if(e.key === 'Right' ||
       e.key === 'ArrowRight'||
       e.key === 'Left' ||
       e.key === 'ArrowLeft'
    ){
        paddle.dx= 0;
    }
}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
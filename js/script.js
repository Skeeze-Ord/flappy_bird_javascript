var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeTop = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeTop.src = "img/pipeTop.png";
pipeBottom.src = "img/pipeBottom.png";

document.getElementById("reset").style.display = 'none';

var flyAudio = new Audio();
var scoreAudio = new Audio();

flyAudio.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";

var gap = 90;

var isLose = false;

document.addEventListener("keydown", moveUp);
function moveUp() {
    yPosition -= 35;
    flyAudio.play();
}

var pipe = [];
pipe[0] = {
    x: canvas.clientWidth,
    y: 0
}

var score = 0;

var xPosition = 10;
var yPosition = 150;
var grav = 1.5;

function draw() {
    context.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        context.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 60) {
            pipe.push( {
                x: canvas.clientWidth,
                y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            })
        }

        if(xPosition + bird.width >= pipe[i].x && xPosition <= pipe[i].x + pipeTop.width &&
            (yPosition <= pipe[i].y + pipeTop.height || yPosition + bird.height >= pipe[i].y + 
                pipeTop.height + gap) || yPosition + bird.height >= canvas.height - fg.height) {
                    isLose = true;
                    if(isLose) {
                        yPosition = canvas.height/2;
                        xPosition -= 100;
                        grav = 0;
                        pipe = [];
                    }
                    document.getElementById("reset").style.display = '';
                    isLose = false;
                }
        if(pipe[i].x == 5) {
            score++;
            scoreAudio.play();
        }
    }
    context.drawImage(fg, 0, canvas.height - fg.height);
    context.drawImage(bird, xPosition, yPosition);

    yPosition += grav;
    requestAnimationFrame(draw);

    context.fillStyle = "grey";
    context.font = "20px Verdana";
    context.fillText("Score: " + score, 10, canvas.height - 20)
}
pipeBottom.onload = draw;
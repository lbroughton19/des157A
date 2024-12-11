(function(){
    'use strict';
    console.log("reading JS");

    //board 
let board;
let boardWidth = 360;
let boardHeight = 640;
let context; //this is for drawing on the canvas


let moveSound = new Audio('sounds/moveSound.mp3');
let gameOverSound = new Audio('sounds/gameOverSound.mp3');

//plane
let planeWidth = 68; //width/height ration = 408/228. the dimensions are simplified proportionally.
let planeHeight = 38;

//whenver we draw our bird, we need to specify 4 arguments, the xy positions of where to draw, and how big to draw it (width/heigh)
let planeX = boardWidth/8; //positions the origin (top left pixel) 1/8 along the screen on x axis
let planeY = boardHeight/2;//positions origin halfwat down the y axis

let planeImg;

//object for making plane
let plane = {
    x :planeX,
    y :planeY,
    width : planeWidth,
    height : planeHeight
    

}

//function for when the page loads

//function for drawing obstacles
let obstacleArray = [];
let obstacleWidth = 64; //originally 64
let obstacleHeight = 512;
let obstacleX = boardWidth;
let obstacleY = 0;

let topObstacleImg;
let bottomObstacleImg;

//game physics
let velocityX = -2; //obstacle moving to the left, obstacles moving to the right would have a positive direction.
let velocityY = 0;//bird jump speed, set it to a negative value to go up, or positive value to go down.
let gravity = 0.2; //positive number to bring plane down

let gameOver = false;
let pause = false;

let score = 0;



 
function initialize(){
    board = document.querySelector("#board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board. this is using the canvas api, which is reading the following functions though the context of 2d. Another opiton would be webGL.

    //draw plane

    //changes pen color to green
    // context.fillStyle = "green"; 
    // context.fillRect(plane.x, plane.y, plane.width, plane.height); 
   //should draw a green rectangle with the coordinates being passed into plane object

    //load images
    planeImg = new Image();
    planeImg.src = "images/paperPlane.png";

    //draws the image when it loads
    planeImg.onload = function(){
    context.drawImage(planeImg, plane.x, plane.y, plane.width, plane.height );

    //adding listenrs for movement
    document.addEventListener("keydown", movePlane);
    board.addEventListener("click", handleClick);
}

    topObstacleImg = new Image();
    topObstacleImg.src = "images/topObstacle.png";

    bottomObstacleImg = new Image();
    bottomObstacleImg.src = "images/bottomObstacle.png";

    requestAnimationFrame(update);//reapins the canvas
    setInterval(placeObstacles, 1500);//runs function to place a new obstavle every 1.5 seconds
    document.addEventListener("keydown", movePlane);
}



document.querySelector("#start").addEventListener("click", initialize);
function update(){
    //loops the function over and over again, cerates main game loop
    requestAnimationFrame(update);

    if (gameOver || pause){
        return;
    }
    context.clearRect(0,0, board.width, board.height);//clears the previous frame of our canvas so that they elements do not repeat

    //draws plane over and over again each frame. Plane does not  reset position because the Y value is constantly being updated and stored outside the function

    velocityY += gravity;
    // plane.y += velocityY;
    plane.y = Math.max(plane.y + velocityY, 0);
    context.drawImage(planeImg, plane.x, plane.y, plane.width, plane.height);


    if (plane.y > board.height){
        gameOver= true;
    }

    //drawing obstacles
    for (let i = 0; i < obstacleArray.length; i++){
        let obstacle = obstacleArray[i]; 
        obstacle.x += velocityX;//draws the obstacle two pixels to the left every frame.
        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        //we add the obstacle x value plus the width to get both the left most and right most points
        if (!obstacle.passed && plane.x > obstacle.x + obstacle.width){
            score +=.5;//because it is passing two pipes
            obstacle.passed = true;
        }

        if (detectCollision(plane, obstacle)){
            gameOver= true;
        }
    }

    //clearing obstacles
    while (obstacleArray.length > 0 && obstacleArray[0].x +obstacleArray[0].width<0){
        obstacleArray.shift();//removes first elemnt from the array
    }

    //score
    context.fillStyle= "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver){
        context.fillText("Game Over", 5, 90);
        gameOverSound.play();
    }
}

function placeObstacles(){      
    if (gameOver){
        return;
    }

    let randomObstacleY = obstacleY - obstacleHeight/4 - Math.random()*(obstacleHeight/2);//adjust the pipe so theys tar drawing 25 percent above the top of the screen. Then add renadomization so that it can start at that point or even higher.

    let openingSpace = board.height/4;


    let topObstacle = {
        img : topObstacleImg,
        x : obstacleX,
        y: randomObstacleY,
        width: obstacleWidth,
        height: obstacleHeight,
        passed : false //checks to see if plane has passed pipe
    }

    obstacleArray.push(topObstacle); //pushes obstacle to the array every 1.5 seconds

    let bottomObstacle = {
        img : bottomObstacleImg,
        x: obstacleX,
        y: randomObstacleY + obstacleHeight + openingSpace,
        width : obstacleWidth,
        height: obstacleHeight,
        passed: false
    }
    obstacleArray.push(bottomObstacle);
}

function movePlane(e){
    if (e.code =="Space"|| e.code == "ArrowUp" || e.code == "KeyX"){

        jump();
        moveSound.play();
        
        }
    }
function handleClick(){
    jump();
    moveSound.play();
}


function jump(){
    //jump
    velocityY = -4;

    //reset game
    if (gameOver){
        plane.y = planeY;
        obstacleArray=[];
        score=0;
        gameOver=false;
}
}
function detectCollision(a, b){
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y; 
}

document.querySelector("#pause").addEventListener("click", function () {
    pause = !pause; // Toggle the paused state
    document.querySelector('#pause').textContent = pause ? "Resume" : "Pause";
});

})();

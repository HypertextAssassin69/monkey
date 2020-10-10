var bananaImage,obstacleImage,backgroundImage,foodImage,overImage,restartImage;
var playerAnimation;
var obstacleGroup, foodGroup;
var score;
var ground,food,obstacle;
var life;
var PLAY,END,WIN,gameState;
var jump,check,die,happy,bg;
var survival = 0;
function preload()
{
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  foodImage = loadImage("banana.png");
  backgroundImage = loadAnimation("jungle.jpg");
  overImage = loadImage("gameOver.gif");
  restartImage = loadImage("restart.png");
  bg = loadAnimation("zoo.jpg");
  happy = loadAnimation("happy.png")
  playerAnimation1 =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  playerAnimation2 = loadAnimation("angrymonkey.png"); 
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  check = loadSound("checkPoint.mp3");
}

function setup() 
{
  createCanvas(400, 400);
  
  scene = createSprite(200,200,400,400);
  scene.addAnimation("bg",backgroundImage);
  scene.addAnimation("zooImage",bg)
  scene.x = scene.width/2;
  scene.velocityX = -6;
  
  player = createSprite(40,360,10,10);
  player.addAnimation("monkey_running",playerAnimation1);
  player.addAnimation("monkey_angry",playerAnimation2);
  player.addAnimation("happyMonkey",happy);
  player.scale = 0.10;
  
  ground = createSprite(200,370,400,5);
  ground.visible = false;
  
  gameover = createSprite(200,140,10,10);
  gameover.addImage(overImage);
  gameover.scale = 0.8;
  gameover.visible = false;
  
  restart = createSprite(200,200,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.8 ;
  restart.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  life = 2;
  PLAY = 1;
  WIN = 2;
  END = 0;
  gameState = PLAY;
}

function draw() {
if(mousePressedOver(restart)&&gameState === WIN){
      gameState = PLAY;
  reset()
    }
background(220);
  player.collide(ground);
  
  console.log(survival)
  if(scene.x<0)
  {
    scene.x = scene.width/2;
  }
  
  if(gameState == PLAY){  
    survival = survival + Math.round((getFrameRate()/60));
   
    
    if(keyWentDown("space")&& player.y >336)
  {
    player.velocityY = -12;
  }
   player.scale = 0.1 
    
  //console.log(player.y);
  if(frameCount % 80 == 0)
  {
    spawnFood();
  }
  if(frameCount % 300 == 0)
  {
    spawnObstacles();
  }
  
  if(foodGroup.isTouching(player))
  {
    score = score + 2;
    jump.play();
    foodGroup.destroyEach();
    if(score>0 && score%10==0)
    {
      check.play();
    }
    switch(score)
    {
        case 10: player.scale = 0.12;
        break;
        case 20: player.scale = 0.14;
        break;
        case 30: player.scale = 0.16;
        break;
        case 40: player.scale = 0.18;
        break;
        default: break;
    }
  }
  if(obstacleGroup.isTouching(player))
  {
    player.scale = 0.10;
    obstacleGroup.destroyEach();
    life = life-1;

    score = score - 2;
    die.play();
  }
    if(life==0 && gameState == PLAY)
    {
      gameState = END;
      score = score + 2;
     
    }
    if (score >= 50){
      gameState = WIN;
    }
    
    if(gameState === WIN){
       player.changeAnimation("happyMonkey",happy);
      player.scale = 1.2;
      player.x = 200;
      player.y = 200;
      
      scene.velocityX = 0;
      scene.x = 200;
      scene.y = 200;
      scene.changeAnimation("zooImage",bg);
      scene.scale = 2.3;
      
      foodGroup.destroyEach();
    obstacleGroup.destroyEach();
     
   restart.visible = true;
      restart.y = 50;
 
    }
    
  }
  if(gameState == END)
  {
    player.changeAnimation("monkey_angry",playerAnimation2);
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    scene.velocityX = 0;
    restart.visible = true;
    gameover.visible = true;
    player.y = 350;
    player.x = 200;
    player.scale =0.3;
    
  }
  if(mousePressedOver(restart) && gameState == END)
  {
    gameState = PLAY;
    reset();
  }
  player.velocityY = player.velocityY + 0.4;
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE :" + score,250,50);
  text("Life left: "+life,50,50);
  text("Survival Time: "+survival,125,100);
 if (score<14&&survival %400===0 && survival > 0){
        gameState = END;
      text("You Didn't Feed me well .",90,75)
        }
  if (score<28&&survival %800===0 && survival > 0){
        gameState = END;
      text("You Didn't Feed me well .",90,75)
        }
  if (score<46&&survival %1200===0 && survival > 0){
        gameState = END;
      text("You Didn't Feed me well .",90,75)
        }
}

function spawnFood()
{
  var food = createSprite(400,160,10,10);
  food.addImage(foodImage);
  food.y = random(120,200);
  food.velocityX = -(6 + Math.round(score/10));
  food.lifetime = 70;
  foodGroup.add(food);
  food.scale = 0.05;
}

function spawnObstacles()
{
  obstacle = createSprite(400,350,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -(6 + Math.round(score/10));
  obstacle.lifetime = 70;
  obstacle.scale = 0.2;
  obstacleGroup.add(obstacle);
}

function reset()
{
  player.changeAnimation("monkey_running",playerAnimation1);
  player.x=40;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  scene.velocityX = -6;
   scene.changeAnimation("bg",backgroundImage) ;
  score = 0;
 life = 2;
  survival = 0
  restart.visible = false;
  restart.y = 200;
  gameover.visible = false;
  scene.scale = 1;
}





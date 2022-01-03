var bg, bgImg;
var player, playerImg;
var ground;
var banana, bananaImg, foodGroup;
var stone, stoneGroup;
var score = 0;
function preload() {
  bgImg = loadImage("jungle.jpg")
  playerImg= loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
bananaImg = loadImage("banana.png")
stoneImg = loadImage("stone.png")
}
function setup() {
  createCanvas(800, 400);
  bg = createSprite(0, 0, 800, 400);
  bg.addImage(bgImg);
  bg.scale = 1.5;
  bg.x = bg.width / 2
bg.velocityX= -4;
  //making monkey
  player= createSprite(100,340,20,50);
  player.addAnimation("runnning", playerImg);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.X = ground.width / 2;
  ground.visible = false;

  foodGroup = createGroup();
  stoneGroup = createGroup();
}

function draw() {
  background(0);
  if(bg.x<100) {
    bg.x = bg.width / 2;
  }
  if (ground.x<0) {
    ground.x = ground.width / 2;
  }
  player.collide(ground);
  if(keyDown("space")) {
    player.velocityY = -12;
  }
  player.velocityY = player.velocityY + 0.8;
  if(foodGroup.isTouching(player)) {
    foodGroup.destroyEach();
    score = score + 2
  }
  switch(score) {
    case 10:player.scale = 0.12;
    break;
    case 20:player.scale = 0.14;
    break;
    case 30:player.scale = 0.16;
    break;
    case 40:player.scale = 0.18;
    break;
    default:break;
  }
  if (stoneGroup.isTouching(player)) {
    player.scale = 0.08
  }
  spawnFood();
  spawnObstacle();
  drawSprites();
stroke("white");
textSize(20);
fill("white");
text("score: " + score, 650, 50)
}
function spawnFood() {
  if(frameCount%80===0) {
    var banana = createSprite(600,250, 40, 10);
banana.addImage(bananaImg);
banana.scale = 0.05;
banana.y = random(120, 200);
banana.velocityX = -5;
banana.lifeTime = 400
foodGroup.add(banana);
 }
}

function spawnObstacle() {
  if (frameCount%300===0) {
    var stone =  createSprite(800, 350, 0, 400);
    stone.addImage(stoneImg);
    stone.scale = 0.2;
    stone.velocityX = -6;
    stone.lifeTime = 400
    stoneGroup.add(stone);
  }
}
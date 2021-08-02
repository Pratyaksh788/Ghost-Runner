// declare variables
var ghost,ghostImg,tower,towerImg,doorsG,climbersG,doorImg,climberImg,invisibleBlocksG;
var spookySound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
 //load images here
  
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png")
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");

}

function setup(){
createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 5;
  //create groups for doors,climbers,invisibleblock
  
  
  ghost = createSprite(300,300,20,20);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  doorsG = new Group();
  climbersG = new Group();
  invisibleBlocksG = new Group();
  
}

function draw(){
  
if(gameState === PLAY) {
  if(tower.y>height) {
    tower.y = height/2;
  }
  if(keyDown("RIGHT_ARROW")) {
    ghost.x = ghost.x+5;
  }
  if(keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x-5;
  }
  if(keyDown("SPACE")) {
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY+0.9;
  
  if(climbersG.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  if(invisibleBlocksG.isTouching(ghost) || ghost.y>height) {
    gameState = END;
  }
  spawnDoors();
  drawSprites();
}
  if(gameState===END) {
    background("black");
    textSize(30);
    text("Ghost Got Killed",200,250);
  }
}

function spawnDoors() {
  //write code here to spawn the doors in the tower attached with climbers and invisible block
  if(frameCount%150 === 0) {
  var door = createSprite(Math.round(random(100,500)),-20,20,20);
  door.addImage("door",doorImg);
  door.velocityY = 5;
  doorsG.add(door);
  door.lifetime = 650;
  ghost.depth = door.depth;
  ghost.depth+=1;
  var climber = createSprite(door.x,40,20,20);
  climber.addImage("climb",climberImg);
  climber.velocityY = 5;
  climber.lifetime = 650;
  climbersG.add(climber);
  var invisibleBlock = createSprite(door.x,60,40,20);
  invisibleBlock.velocityY = 5;
  //invisibleBlock.visible = false;
  invisibleBlock.lifetime = 650;
  invisibleBlock.debug = true;
  invisibleBlocksG.add(invisibleBlock);
}
}


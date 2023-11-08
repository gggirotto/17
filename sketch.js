 //var de estados   
 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;
// 2 variavel que vamos colocar a imagem  já temos 
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
// pontuação
var score;
//  imagens para gameover (fim de jogo) e restart(reiniciar)
var gameOver, restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  // 2 carregar a animação do trex_collided ( já temos)
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  //imagens no game over e restart preLOad

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  // 2 adicionar a animação do trex_collided (já temos)
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
   //1 "formato", x,y,largura,altura/raio, rotação
   trex.setCollider("circle",0,0,40);
    //ativar o raio de colisão (true)
    trex.debug = false;

   //chao 
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  // criar  imagens e scale game over e restart
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 1.2 ;
  restart.scale = 0.5;


 

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  // criar grupos de obstaculos e nuvens
  cloudsGroup = new Group();
  obstaclesGroup = new Group();


  //imprimindo uma string concatenada
  console.log("ola " + 5);
  //score
  score=0;
  
}

function draw() {
  background(180);
  // exibindo o texto da pontuação e concatenando
  text("Pontuação: "+ score, 500,50);
 //console log para ver gameState
 

 // condição de estado
  if(gameState===PLAY){
    //começa visivel  false, game over e restart para ter condição para aparecer
gameOver.visible = false
restart.visible = false
   
//mover o solo
     ground.velocityX= -4;  
 
    score = score + Math.round(frameCount/60);  
  
    if (ground.x < 0){
     ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
    }
  
  trex.velocityY = trex.velocityY + 0.8
   
     //gerar as nuvens
  spawnClouds();
  
  //gerar obstáculos no chão
  spawnObstacles();
  
   if(obstaclesGroup.isTouching(trex)){
    gameState = END;
}

  }
  else  if(gameState===END){
  //mover o solo
     ground.velocityX= 0;

  // game over e restart visivel verdadeiro
     gameOver.visible = true;
     restart.visible = true;
     // 5  gravidade do chao e o trex
    ground.velocityX = 0;
    trex.velocityY = 0;
   
    // 3 mudar a animação do trex
    trex.changeAnimation("colided", trex_collided);

    // 4 definir tempo de vida aos objetos do jogo para que nunca sejam destruídos, sprite.setLifetimeEach();
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  // Dê velocidade zero a todos os obstáculos e nuvens usando setVelocityXEach()
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);



  }  
  
  trex.collide(invisibleGround);
  drawSprites();
  }

  function spawnObstacles(){
   if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
       case 1: obstacle.addImage(obstacle1);
              break;
       case 2: obstacle.addImage(obstacle2);
              break;
       case 3: obstacle.addImage(obstacle3);
              break;
       case 4: obstacle.addImage(obstacle4);
              break;
       case 5: obstacle.addImage(obstacle5);
              break;
       case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //atribua dimensão e tempo de vida aos obstáculos         
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //. Adicione obstacle (obstáculo) ao grupo
    obstaclesGroup.add(obstacle);

   }
 }
function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    //atribua tempo de vida à variável
    cloud.lifetime = 200;
    
    //ajustar a profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   // . Adicione cloud (nuvem) ao grupo
    cloudsGroup.add(cloud);
  }
  
}
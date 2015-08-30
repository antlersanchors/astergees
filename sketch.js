//asteroid clone (core mechanics only)
//arrow keys to move + x to shoot
//now making it more of a pacifistic Gyruss-like

var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage;

var rings;
var ringImage;
var MARGIN = 40;

var trumps;
var trumpImage;


function setup() {
createCanvas(800,800);

bulletImage = loadImage("assets/asteroids_bullet.png");
shipImage = loadImage("assets/asteroids_ship0001.png");
particleImage = loadImage("assets/asteroids_particle.png");

ship = createSprite(width/2, height/2);
ship.maxSpeed = 6;
ship.friction = .98;
ship.setCollider("circle", 0,0, 20);


ship.addImage("normal", shipImage);
ship.addAnimation("thrust", "assets/asteroids_ship0002.png", "assets/asteroids_ship0007.png");

asteroids = new Group();
bullets = new Group();
rings = new Group();
trumps = new Group();

for(var i = 0; i<2; i++) {
  var ang = random(360);
  var px = width/2;
  var py = height/2;
  createAsteroid(3, px, py);
  }

for(var i = 2; i<4; i++) {
  // var ang = random(360);
  var clockwiseDir = Boolean(Math.floor(Math.random() * 2));
  var px = width/2;
  var py = height/2;
  createRing(i, px, py, clockwiseDir);
  }
}

function draw() {
  background(0);
  
  fill(255);
  textAlign(CENTER);
  text("Controls: Arrow Keys + X", width/2, 20);
  
  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
  if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
  if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
  if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
  }
  
  asteroids.overlap(bullets, asteroidHit);
  
  ship.bounce(asteroids);

  for (var i=0; i<asteroids.length; i++) {
    var a = asteroids[i];
      for (var j=0; j<rings.length; j++) {
        var r = rings[j];

        if(r.overlapPixel(a.position.x, a.position.y))
        console.log("Overlap at " + a.position.x + ", " + a.position.y);
    }
  }
  
  if(keyDown(LEFT_ARROW))
    rings[0].rotation -= 4;
  if(keyDown(RIGHT_ARROW))
    rings[0].rotation += 4;
  if(keyDown(UP_ARROW))
    rings[1].rotation -= 4;
  if(keyDown(DOWN_ARROW))
    rings[1].rotation += 4;


  // if(keyDown(UP_ARROW))
  //   {
  //   ship.addSpeed(.2, ship.rotation);
  //   ship.changeAnimation("thrust");
  //   }
  // else
  //   ship.changeAnimation("normal");
    
  // if(keyWentDown("x"))
  //   {
  //   var bullet = createSprite(ship.position.x, ship.position.y);
  //   bullet.addImage(bulletImage);
  //   bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
  //   bullet.life = 30;
  //   bullets.add(bullet);
  //   }
  
  drawSprites();
  
}

function createAsteroid(type, x, y) {
  var a = createSprite(x, y);
  var img  = loadImage("assets/asteroid"+floor(random(0,3))+".png");
  a.addImage(img);
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = .5;
  //a.debug = true;
  a.type = type;
  
  if(type == 3)
    a.scale = .3;  
  if(type == 2)
    a.scale = .2;

  if(type == 1)
    a.scale = .1;
  
  a.mass = 2+a.scale;
  a.setCollider("circle", 0, 0, 50);
  asteroids.add(a);
  return a;
}

function createTrump(type, x, y) {
  var t = createSprite(x, y);
  var img  = loadImage("assets/trump1.png");
  t.addImage(img);
  t.setSpeed(2.5-(type/2), random(360));
  t.rotationSpeed = .5;
  //t.debug = true;
  t.type = type;
  
  if(type == 3)
    t.scale = .3;  
  if(type == 2)
    t.scale = .2;

  if(type == 1)
    t.scale = .1;
  
  t.mass = 2+t.scale;
  t.setCollider("circle", 0, 0, 50);
  trumps.add(t);
  return t;
}

function createRing(type, x, y, dir) {
  var r = createSprite(x, y);
  // var img  = loadImage("assets/asteroid"+floor(random(0,3))+".png");
  var img  = loadImage("assets/ring1.png");
  r.addImage(img);
  // r.setSpeed(2.5-(type/2), random(360));
  // if (dir == true) { 
  //   r.rotationSpeed = .5;
  // } else {
  //   r.rotationSpeed = -.5;
  // }
  r.debug = true;
  r.type = type;
  
  // if(type == 3)
  //   r.scale = 1;
  // if(type == 2)
  //   r.scale = .6;
  
  r.mass = 2+r.scale;
  r.immovable = true;
  // r.setCollider("circle", 0, 0, 50);
  rings.add(r);
  return r;
}

function asteroidHit(asteroid, bullet) {
var newType = asteroid.type-1;

if(newType>0) {
  createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  }

for(var i=0; i<10; i++) {
  var p = createSprite(bullet.position.x, bullet.position.y);
  p.addImage(particleImage);
  p.setSpeed(random(3,5), random(360));
  p.friction = 0.95;
  p.life = 15;
  }

bullet.remove();
asteroid.remove();
}

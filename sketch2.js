var asteroids;
var ringBlocks;
var trumps;

var particleImage, laserImage;

var ringBlockImage;
var ringRadius, stepVal;
var numRingBlocks;

var direction;
var rotation;

var trumpDeath;
var trumpSpawn;

var rescueScore, trumpScore;

var laser;

var MARGIN = 50;

function setup() {
	createCanvas(800,800);

	asteroids = new Group();
	ringBlocks = new Group();
	trumps = new Group();

	trumpSpawn = (floor(random(1500, 3000)));

	rescueScore= 0;
	trumpScore = 0;

	ringRadius = 300;
	stepVal = 0;
	numRingBlocks = 9;

	particleImage = loadImage("assets/asteroids_particle.png");
	laserImage = loadImage("assets/rainbow.png");

	for(var i = 0; i<2; i++) {
		var ang = random(360);
		var px = width/2;
		var py = height/2;
		createAsteroid(3, px, py);
	}
	
	for (var i = 0; i<numRingBlocks; i++) {

        stepVal += 360/numRingBlocks;
        var px = width/2 + ringRadius * cos(stepVal);
        var py = height/2 + ringRadius * sin(stepVal);

        var startingAngle = 360 / i; 

		createRingBlock(px, py, startingAngle);
	}

}

function draw() {
	background(0);

	fill(255);

	textAlign(CENTER);
	text("Rescued: " + rescueScore + " " + "Trumped: " + trumpScore, width/2, 20);

	if (millis() > trumpSpawn && trumps.length === 0 ) {
		var tx = width/2;
		var ty = height/2;

		createTrump(tx, ty);
	}

	if(keyDown(UP_ARROW)) {
		rotation = 1;
		rotateRings(rotation);
	}
	if(keyDown(DOWN_ARROW)) {
		rotation = -1;
		rotateRings(rotation);
	} if(keyWentUp(UP_ARROW)) {
		stopRings();
	} if(keyWentUp(DOWN_ARROW)) {
		stopRings();
	}

	// if(mouseWentDown){
	// 	fireLaser(mouseX, mouseY):
	// }

	asteroids.bounce(ringBlocks);
	asteroids.overlap(trumps, asteroidHit);
	trumps.overlap(ringBlocks, trumpHit);

	moveTrump();
	checkPositions();	
	asteroidSpawn();
	drawSprites();
}

function createRingBlock(x, y, angle) {
	var rb = createSprite(x, y);
	var img = loadImage("assets/doge_block.png");
	rb.addImage(img);

	// rb.debug = true;

	// rb.mass = 2;
	rb.maxSpeed = 3;
	rb.setCollider("square", 5, 0, 50);

	rb.angle = angle;
	rb.dir = direction;
	rb.immovable = true;

	ringBlocks.add(rb);
	return rb;
}

function createAsteroid(type, x, y) {
	var a = createSprite(x, y);
	var img  = loadImage("assets/asteroid"+floor(random(0,3))+".png");
	a.addImage(img);
	a.setSpeed(3, random(360));
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

function createTrump(x, y){
	var t = createSprite(x, y);
	var img = loadImage("assets/trump1.png");
	t.addImage(img);
	t.setSpeed(0.5, random(360));
	t.rotationSpeed = .5;
	t.mass = 4;
	t.MaxSpeed = 1;
	t.setCollider("circle", 0, 0, 50);
	trumps.add(t);
	hazTrump = true;
	return t;
}

function moveTrump() {
	if (trumps.length < 1 || asteroids.length < 1) return;

	var t = trumps[0];
	var tx = t.position.x;
	var ty = t.position.y;
	var ranges = new Array();
	var min = 0;
	var target;

	// check distance from the Donald to the asteroids
	for(i=0;i<asteroids.length;i++){
		var a = asteroids[i];
		var ax = a.position.x;
		var ay = a.position.y;
		var rx = tx - ax;
		rx = rx * rx;
		var ry = ty - ay;
		ry = ry * ry;
		
		append(ranges, Math.sqrt(rx + ry));
	}
	// find the closest asteroid
	for(j=0;j<ranges.length;j++){
		if (ranges[j] < min || j === 0){
			min = ranges[j];
			target = j;
		}
	}
	// the Donald moves towards its prey
	t.attractionPoint(.1, asteroids[target].position.x, asteroids[target].position.y);
}

function asteroidHit(asteroid, trump){
	for(var i=0; i<10; i++) {
	  var p = createSprite(asteroid.position.x, asteroid.position.y);
	  p.addImage(particleImage);
	  p.setSpeed(random(3,5), random(360));
	  p.friction = 0.95;
	  p.life = 15;
	  }

	asteroid.remove();
	trumpScore += 1;

}

function trumpHit(trump, ringBlock){
	for(var i=0; i<10; i++) {
	  var p = createSprite(trump.position.x, trump.position.y);
	  p.addImage(particleImage);
	  p.setSpeed(random(3,5), random(360));
	  p.friction = 0.95;
	  p.life = 15;
	  }

	trumpDeath = millis();
	trumpSpawn = trumpDeath + (floor(random(500,2000)));
	trump.remove();
}

function asteroidSpawn(){
	if (asteroids.length < 5){
		if (floor(random(0,100)) % 20 === 0) {
			px = width/2;
			py = height/2;
			createAsteroid(3, px, py);
		}
	}
}

function rotateRings(speed) {

	var prev_x;
	var prev_y;
	var new_x;
	var new_y;

	for (i=0;i<ringBlocks.length; i++) {
		var rb = ringBlocks[i];

		var cx = rb.position.x;
		var cy = rb.position.y;

		var angleBetween = atan2(height/2 - cy, width/2 - cx);
		var newAngle = degrees(angleBetween) + 90 * speed;
		
		if(newAngle > 360) newAngle = 0;

        rb.setSpeed(15, newAngle);
        rb.angle = newAngle;

	}
}

function stopRings() {
	for (i=0;i<ringBlocks.length; i++) {
		var rb = ringBlocks[i];
		rb.setSpeed(0, rb.angle);
	}
}

// function fireLaser(x, y){
// 	laser = createSprite(x,y);
// 	laser.addImage(laserImage);
// }

function checkPositions(){
	if (asteroids.length < 1) return;
	for (var i=0;i<asteroids.length;i++){
		var a = asteroids[i];
		if (a.position.x<-MARGIN) score(a);
		if (a.position.x>width+MARGIN) score(a);
		if (a.position.y<-MARGIN) score(a);
		if (a.position.y>height+MARGIN) score(a);
	}
}

function score(victor){
		rescueScore += 1;
		victor.remove();
}
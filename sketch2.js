var asteroids;
var ringBlocks;
var trumps;

var ringBlockImage;
var ringRadius, stepVal;
var numRingBlocks;

var direction;
var rotation;

var hazTrump;

function setup() {
	createCanvas(800,800);

	asteroids = new Group();
	ringBlocks = new Group();
	trumps = new Group();

	hazTrump = false;

	ringRadius = 300;
	stepVal = 0;
	numRingBlocks = 9;

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

	if (millis() > 3000 && hazTrump === false ) {
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
	} if (keyWentUp(DOWN_ARROW)) {
		stopRings();
	}

	asteroids.bounce(ringBlocks);

	moveTrump();
	drawSprites();
}

function createRingBlock(x, y, angle) {
	var rb = createSprite(x, y);
	var img = loadImage("assets/doge_block.png");
	rb.addImage(img);

	rb.debug = true;

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

function createTrump(x, y){
	var t = createSprite(x, y);
	var img = loadImage("assets/trump1.png");
	t.addImage(img);
	t.setSpeed(2.5, random(360));
	t.rotationSpeed = .5;
	t.mass = 2;
	t.setCollider("circle", 0, 0, 50);
	trumps.add(t);
	hazTrump = true;
	return t;
}

function moveTrump() {
	if (hazTrump === false) return;

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
	t.attractionPoint(.2, asteroids[target].position.x, asteroids[target].position.y);
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

        rb.setSpeed(10, newAngle);
        rb.angle = newAngle;

	}
}

function stopRings() {
	for (i=0;i<ringBlocks.length; i++) {
		var rb = ringBlocks[i];
		rb.setSpeed(0, rb.angle);
	}
}
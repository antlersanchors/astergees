var asteroids;
var ringBlocks;

var ringBlockImage;
var ringRadius, stepVal;

var direction;
var rotation;

function setup() {
	createCanvas(800,800);

	asteroids = new Group();
	ringBlocks = new Group();

	ringRadius = 300;
	stepVal = 10;
	direction = 0;

	for (var i = 0; i<11; i++) {

        stepVal += 100;
        var px = width/2 + ringRadius * cos(stepVal);
        var py = height/2 + ringRadius * sin(stepVal);

        var startingAngle = 360 / i; 

		createRingBlock(px, py, startingAngle);
	}
}

function draw() {
	background(0);

	fill(255);

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

	// rotateRings();
	drawSprites();
}

function createRingBlock(x, y, angle) {
	var rb = createSprite(x, y);
	var img = loadImage("assets/trump1.png");
	rb.addImage(img);

	// rb.debug = true;

	// rb.mass = 2;
	rb.maxSpeed = 3;
	rb.setCollider("circle", 5, 0, 50);

	rb.angle = angle;
	rb.dir = direction;

	ringBlocks.add(rb);
	return rb;
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
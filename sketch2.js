var asteroids;
var ringBlocks;

var ringBlockImage;
var ringRadius, stepVal;

var direction;

function setup() {
	createCanvas(800,800);

	asteroids = new Group();
	ringBlocks = new Group();

	ringRadius = 300;
	stepVal = 10;
	direction = 90;

	for (var i = 0; i<11; i++) {

        stepVal += 100;
        var px = width/2 + ringRadius * cos(stepVal);
        var py = height/2 + ringRadius * sin(stepVal);

		createRingBlock(px, py);
	}
}

function draw() {
	background(0);

	fill(255);

	if(keyDown(UP_ARROW))
	{
		rotateRings();
	}

	drawSprites();
}

function createRingBlock(x, y) {
	var rb = createSprite(x, y);
	var img = loadImage("assets/trump1.png");
	rb.addImage(img);

	// rb.debug = true;

	// rb.mass = 2;
	rb.maxSpeed = 3;
	rb.setCollider("circle", 5, 0, 50);

	rb.dir = direction;
	// rb.setSpeed(3, rb.dir);

	ringBlocks.add(rb);
	return rb;
}

function rotateRings() {
	direction += 2;

	for (i=0;i<ringBlocks.length; i++) {
		var rb = ringBlocks[i];

		var prev_x = rb.previousPosition.x;
		var prev_y = rb.previousPosition.y;
		var new_x = width/2 + ringRadius * cos(prev_x);
        var new_y = height/2 + ringRadius * sin(prev_y);
		rb.setVelocity(new_x, new_y);

	}

}
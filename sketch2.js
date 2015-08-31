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

	// if(keyDown(UP_ARROW))
	// {
	// 	rotateRings();
	// }

	rotateRings();
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
	// rb.setSpeed(3, rb.dir);

	ringBlocks.add(rb);
	return rb;
}

function rotateRings() {

	var prev_x;
	var prev_y;
	var new_x;
	var new_y;

	stepVal = 10;

	for (i=0;i<ringBlocks.length; i++) {
		var rb = ringBlocks[i];
		rb.setSpeed(2, rb.angle);
		// var cx = rb.position.x;
		// var cy = rb.position.y;

		// x = cx + ringRadius * cos(radians(angle));
  //       y = cy + ringRadius * sin(radians(angle));

  		rb.angle += 1;
  		if (rb.angle === 360) rb.angle = 0;
        // rb.setVelocity(x, y);



		// var whatVel = rb.setVelocity;
		// text(whatVel, width/2, 20);

		// var old_dir = rb.getDirection();
		// rb.setSpeed(.1, old_dir+1);
		// float x=300*cos(radians(angle)) + width/2;
  // 		float y=300*sin(radians(angle)) + height/2;

		// prev_x = rb.position.x;
		// prev_y = rb.position.y;

		// stepVal += 100;
		// new_x = width/2 + ringRadius * cos(stepVal);
  //       new_y = height/2 + ringRadius * sin(stepVal);
		// rb.setVelocity(new_x, new_y);

	}

}
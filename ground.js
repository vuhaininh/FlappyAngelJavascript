goog.provide('flabbyangel.Ground');
goog.require('box2d.BodyDef');
goog.require('flabbyangel.Object');
goog.require('lime.Sprite');
flabbyangel.Ground = function(posX,posY) {
    flabbyangel.Object.call(this);

    var ground = new box2d.PolyDef;
	ground.restitution = 0;
	ground.density = 0;
	ground.friction = 0;
//	ground.extents.Set(30, 10);//box version
    ground.SetVertices([[-flabbyangel.WIDTH,-1],[flabbyangel.WIDTH,-1],[flabbyangel.WIDTH,1],[-flabbyangel.WIDTH,1]]); // actually not a box
    this.position.Set(posX, posY);
    this.AddShape(ground);
    var img = 'assets/line.png';
    this.figure = (new lime.Sprite)
        .setFill(img).setOpacity(0.7)
	    .setSize(flabbyangel.WIDTH, 40).setPosition(posX,posY);
    
    
};

goog.inherits(flabbyangel.Ground, flabbyangel.Object);

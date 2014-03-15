goog.provide('flabbyangel.Obstacle');
goog.require('lime.Sprite');
goog.require('lime.fill.Frame');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.MoveBy');
goog.require('box2d.BodyDef');
goog.require('flabbyangel.Object');
flabbyangel.Obstacle= function(posX,posY,width,height) {
    flabbyangel.Object.call(this);
    this.figure = new lime.Sprite().setPosition(posX,posY);
    
    this.position.Set(posX, posY);
    this.posX = posX;
    this.posY = posY;
    this.preventRotation = true;
    this.polyDef = new box2d.PolyDef;
    this.polyDef.density = 1;
    this.polyDef.restitution =0;
    this.polyDef.friction = 0;
    this.polyDef.SetVertices([[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]]);
    this.AddShape(this.polyDef);
    this.isScore = true;
    
};
goog.inherits(flabbyangel.Obstacle, flabbyangel.Object);
flabbyangel.Obstacle.prototype.AddFigure = function(posX,posY,width,height,reverse){
   
     this.figure = (new lime.Sprite).setSize(width+80, height).setPosition(posX,posY);
     if (reverse=== true)
            this.figure.setRotation(180);
     this.figure.runAction(this.generateAnim(height));
  
    return this.figure;
       
};
flabbyangel.Obstacle.prototype.generateAnim = function(height){
    var img = 'assets/obstacle.png';
    imgY = 565 - height;

     var frame1 = new lime.fill.Frame(img, 0, imgY, 180, height);
     var frame2 = new lime.fill.Frame(img, 200, imgY, 180, height);
     var frame3 = new lime.fill.Frame(img, 400, imgY, 180, height);
     var frame4 = new lime.fill.Frame(img, 600, imgY, 180, height);
     var anim = new lime.animation.KeyframeAnimation();
     anim.delay= 1/5; 
     anim.addFrame(frame1);
     anim.addFrame(frame2);
     anim.addFrame(frame3);
     anim.addFrame(frame4); 
     return anim; 
};
flabbyangel.Obstacle.prototype.UpdateObstacle = function(width,height,posX,posY,world){
    this.polyDef.SetVertices([[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]]);
    this.position.Set(posX, posY); 
    this.shapes.pop();
    this.AddShape(this.polyDef);
    world.DestroyBody(this._body);
    this._body = world.CreateBody(this);
    this._gravity = new box2d.Vec2(0, -this._body.GetMass()*1800); 
    this.figure.
            setSize(width+80, height).setPosition(posX,posY);
    this.figure.runAction(this.generateAnim(height));
    this.isScore = true;
       
};
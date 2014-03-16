goog.provide('flabbyangel.Angel');
goog.require('lime.Sprite');
goog.require('lime.fill.Frame');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.MoveBy');
goog.require('box2d.BodyDef');
goog.require('flabbyangel.Object');
goog.require('box2d.CircleDef');
flabbyangel.Angel = function(posX,posY) {
    flabbyangel.Object.call(this);
    this.flyframe1 = new lime.fill.Frame('assets/angel.png', 15, 140, 65, 40)
    this.flyframe2 = new lime.fill.Frame('assets/angel.png', 111, 140, 65, 40);
    this.flyframe3 = new lime.fill.Frame('assets/angel.png', 207, 140, 65, 40);
    
    this.figure = new lime.Sprite().setPosition(posX,posY);
    this.image1 = new lime.Sprite().setPosition(posX,posY-150);
    this.image2 = new lime.Sprite().setPosition(posX,posY+150);
    
    this.status = 0;
 
    this.position.Set(posX, posY);
    this.linearDamping = 0;
    this.preventRotation = true;
    
    
    var polyDef = new box2d.PolyDef;;
    polyDef.density = .01;
    polyDef.restitution =0;
    polyDef.friction = 1;
    polyDef.SetVertices([[-25,-35],[25,-35],[25,35],[-25,35]]);
    this.AddShape(polyDef);
    
};
goog.inherits(flabbyangel.Angel, flabbyangel.Object);
flabbyangel.Angel.prototype.setPos = function(posX, posY){
    this.position.Set(posX, posY);
    this.figure.setPosition(posX,posY);
    
}; 
flabbyangel.Angel.prototype.directForm = function(){
    var frame1 = new lime.fill.Frame('assets/angel.png', 15, 15, 65, 40);
    var frame2 = new lime.fill.Frame('assets/angel.png', 111, 15, 65, 40);
    var frame3 = new lime.fill.Frame('assets/angel.png', 207, 15, 65, 40);
    var anim = new lime.animation.KeyframeAnimation();
    anim.delay= 1/3; 
    anim.addFrame(frame1);
    anim.addFrame(frame2);
    anim.addFrame(frame3);
    this.figure.setSize(150,120).runAction(anim);  
    return this.figure;
    
};
flabbyangel.Angel.prototype.flyingForm = function(){
    this.figure.setSize(140,100).runAction(this.generateAnim());  
    return this.figure;  
};
flabbyangel.Angel.prototype.generateAnim = function(){
    var anim = new lime.animation.KeyframeAnimation();
    anim.delay= 1/4; 
    anim.addFrame(this.flyframe1);
    anim.addFrame(this.flyframe2);
    anim.addFrame(this.flyframe3);
    return anim;    
};
flabbyangel.Angel.prototype.clashForm = function(){
    var img = 'assets/light.png';
    var frame1 = new lime.fill.Frame(img, 0, 0, 48, 20);
    var anim = new lime.animation.KeyframeAnimation();
    anim.delay= 1/3; 
    anim.addFrame(frame1);
    this.figure.setSize(90,60).runAction(anim);  
    return this.figure;
    
};
flabbyangel.Angel.prototype.generateClones = function(){
    this.image1.setHidden(true).setSize(135,90).runAction(this.generateAnim());  
    this.image2.setHidden(true).setSize(135,90).runAction(this.generateAnim()); 
}; 
flabbyangel.Angel.prototype.hideClones = function(){
    this.image1.setHidden(true);
    this.image2.setHidden(true);  
};
flabbyangel.Angel.prototype.showClones = function(){
    this.image1.setHidden(false);
    this.image2.setHidden(false);  
};
flabbyangel.Angel.prototype.moveUp = function(){
        var vel = this._body.GetLinearVelocity();
        vel.y =  -600;
        this._body.SetLinearVelocity(vel);  

       
};
flabbyangel.Angel.prototype.moveFloat = function(){ 
    this._body.ApplyForce(this._gravity,this._body.GetWorldPoint(new box2d.Vec2(0, 0)));
};
flabbyangel.Angel.prototype.moveDown = function(){
        var vel = this._body.GetLinearVelocity();
        vel.y =  450;
        this._body.SetLinearVelocity(vel);  
};


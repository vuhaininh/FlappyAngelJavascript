goog.provide('flabbyangel.World');
goog.require('box2d.World');
goog.require('box2d.Vec2');
goog.require('box2d.BodyDef');

flabbyangel.World = function(gravity) {
    this.bounds = new box2d.AABB();
    this.bounds.minVertex.Set(-5*flabbyangel.WIDTH, -5*flabbyangel.HEIGHT);
    this.bounds.maxVertex.Set(5*flabbyangel.WIDTH,5*flabbyangel.HEIGHT);
    box2d.World.call(this,this.bounds, gravity, false);
    
    // bground
    this.bglayer = new lime.Layer();
    if(flabbyangel.isBrokenChrome()) this.bglayer.setRenderer(lime.Renderer.CANVAS);
    this.bg = new flabbyangel.Background(flabbyangel.WIDTH,flabbyangel.HEIGHT);
    this.bglayer.appendChild(this.bg);
};
goog.inherits(flabbyangel.World, box2d.World);
flabbyangel.World.prototype.addObject = function(obj){
    return this.CreateBody(obj);
};

flabbyangel.World.prototype.changeGravity = function(gravity){
    this.m_gravity = gravity;
};

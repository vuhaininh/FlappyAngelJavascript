goog.provide('flabbyangel.Rune');
goog.require('lime.Sprite');

flabbyangel.Rune = function() {
    lime.Circle.call(this);
    this.setSize(90,90);
    this.type = 0;
    this.normalanim = this.generateAnim("assets/a1.png");
    this.floatanim = this.generateAnim("assets/a2.png");
    this.imageanim = this.generateAnim("assets/a3.png");
    this.active = true;
   
};
goog.inherits(flabbyangel.Rune, lime.Circle);
flabbyangel.Rune.prototype.generateAnim = function(img){
    var frame1 = new lime.fill.Frame(img,0,0,50,50);
    var anim = new lime.animation.KeyframeAnimation();
    anim.delay= 1/2; 
    anim.addFrame(frame1);
    return anim;    
};
flabbyangel.Rune.prototype.generateRuneType = function(){
    this.setType(parseInt(goog.math.uniformRandom(0,1000))%3);
};
flabbyangel.Rune.prototype.setType = function(i){
    this.type = i;
    if(i==0)
        this.runAction(this.normalanim);
    else if(i==1)
        this.runAction(this.floatanim);
    else
        this.runAction(this.imageanim);   
};
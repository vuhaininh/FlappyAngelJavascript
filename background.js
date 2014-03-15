goog.provide('flabbyangel.Background');
goog.require('lime.Sprite');
goog.require('lime.Layer');
goog.require('lime.fill.Frame');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.Loop');
flabbyangel.Background = function(x,y) {
    lime.Sprite.call(this);
    this.x = x;
    this.y = y;
    this.bgImage = 'assets/background.jpg';
    this.setSize(x, y).setFill("#6F79FC").setAnchorPoint(0,0);
    this.background1 = new lime.Sprite().setSize(2800,1004).setPosition(0,0).setAnchorPoint(0,0).setFill(this.bgImage);
    this.background2 = new lime.Sprite().setSize(2800,1004).setPosition(2799,0).setAnchorPoint(0,0).setFill(this.bgImage);
    var backgroundLayer = new lime.Layer().setPosition(0,0).setAnchorPoint(0,0).appendChild(this.background1);
    backgroundLayer.appendChild(this.background2);
    
    var anim = new lime.animation.MoveBy(-flabbyangel.SPEED,0).setDuration(3).setEasing(lime.animation.Easing.LINEAR);
    this.loop = new lime.animation.Loop(anim);   
    backgroundLayer.runAction(this.loop); 
    var swaps = 1; 
    lime.scheduleManager.scheduleWithDelay (function() { 
		var p = backgroundLayer.getPosition();
                
		if(p.x < swaps * -2800){ 
			var next = swaps % 2 ?this.background1 : this.background2; 
			next.setPosition(next.getPosition().x + 2799 * 2, 0); 
			swaps++;
		} 
	}, this, 100);
        
    this.appendChild(backgroundLayer);
    
};
goog.inherits(flabbyangel.Background, lime.Sprite);


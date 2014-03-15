goog.provide('flabbyangel.Game');
goog.require('flabbyangel.Angel');
goog.require('flabbyangel.World');
goog.require('flabbyangel.Obstacle');
goog.require('flabbyangel.Ground');
goog.require('lime.Sprite');
goog.require('lime.Scene');
goog.require('lime.fill.Frame');
goog.require('lime.animation.KeyframeAnimation');
goog.require('goog.events');
goog.require('lime.animation.MoveBy');
goog.require('lime.audio.Audio');
flabbyangel.Game = function() {
   lime.Scene.call(this);
   this.points = 0;
   this.inGame = false;
   this.moveVel = new box2d.Vec2(-300, 0);
   this.wingSound = new lime.audio.Audio('assets/wing.mp3');
   this.punchSound = new lime.audio.Audio('assets/punch.mp3');
   this.scoreSound = new lime.audio.Audio('assets/score.mp3');
   //gravities
   this.gravity = new box2d.Vec2(0, 1800);
   this.rgravity = new box2d.Vec2(0, -1800);
    // world
    this.world = new flabbyangel.World(this.gravity);
    this.appendChild(this.world.bglayer);
    //this.changeGravity(this.rgravity);
    //angel
    var angelLayer = new lime.Layer();
    this.angel = new flabbyangel.Angel(flabbyangel.WIDTH/5,flabbyangel.HEIGHT/2);
    angelLayer.appendChild(this.angel.flyingForm());
    this.appendChild(angelLayer);
    
    this.angel._body = this.world.CreateBody(this.angel);
    //Obstacle
    this.GenerateObstacles(); 
     //score
    var scoreLayer = new lime.Layer();
    this.score = new lime.Label().setFontColor('#FFF').setFontSize(100).setText(this.points).setPosition(flabbyangel.WIDTH/2-40, flabbyangel.HEIGHT/6)
        .setAnchorPoint(0, 0).setFontWeight(700);
    scoreLayer.appendChild(this.score);
    this.appendChild(scoreLayer);  

    // ground
    var ground = new flabbyangel.Ground(flabbyangel.WIDTH/2 ,860);
    ground_body = this.world.addObject(ground);
    var ceiling = new flabbyangel.Ground(flabbyangel.WIDTH/2 ,-20);
    ceiling_body = this.world.addObject(ceiling);
    this.appendChild(ceiling.figure);
    this.appendChild(ground.figure);
      
    //guideLayer
    this.guideLayer = new lime.Layer().setPosition(flabbyangel.WIDTH / 3, 0);
    var ready = new lime.Sprite().setFill('assets/ready.png').setPosition(flabbyangel.WIDTH / 5, flabbyangel.HEIGHT / 3);
    ready.qualityRenderer = true;
    this.guideLayer.appendChild(ready);
    this.appendChild(this.guideLayer);
     // gameover
    this.gameOverLayer = new lime.Layer().setSize(flabbyangel.WIDTH -200, flabbyangel.HEIGHT/3)
            .setPosition(flabbyangel.WIDTH/2,flabbyangel.HEIGHT/2);
    var shape = new lime.RoundedRect().setSize(flabbyangel.WIDTH -200, flabbyangel.HEIGHT/3).
    setRadius(10);
    var gradient = new lime.fill.LinearGradient().
        setDirection(0,0,1,1). // 45' angle 
        addColorStop(0,100,0,0). // start from red color
        addColorStop(1,0,0,100);
    shape.setFill(gradient);
    var score_lbl = new lime.Label().setFontFamily('Trebuchet MS').setFontColor('#fff').setFontSize(45).
        setPosition(-150, -120).setText('Score:').setFontWeight(700);
    var best_lbl = new lime.Label().setFontFamily('Trebuchet MS').setFontColor('#fff').setFontSize(45).
        setPosition(-155, -50).setText('Best   :').setFontWeight(700);
    this.score1 = new lime.Label().setFontFamily('Trebuchet MS').setFontColor('#fff').setFontSize(60).
        setPosition(20,-120).setText(this.points).setFontWeight(700);
    this.highscore = new lime.Label().setFontFamily('Trebuchet MS').setFontColor('#fff').setFontSize(60).
        setPosition(20, -50).setText(this.getHighScore()).setFontWeight(700);
    this.gameOverLayer.appendChild(shape);
    this.gameOverLayer.appendChild(this.score1);
    this.gameOverLayer.appendChild(this.highscore);
    this.gameOverLayer.appendChild(best_lbl);
    this.gameOverLayer.appendChild(score_lbl);
    

    this.appendChild(this.gameOverLayer);
    this.gameOverLayer.setHidden(true);      
    // register listener
    goog.events.listen(this, ['mousedown', 'touchstart'], this.pressHandler_);

	
};
goog.inherits(flabbyangel.Game, lime.Scene);
/**
 * Handle presses on the board
 * @param {lime.Event} e Event.
 */
flabbyangel.Game.prototype.newGame = function(){
    this.punchSound.play();
    this.angel.figure = this.angel.clashForm();
    var movedown = new lime.animation.MoveBy(0,830-this.angel.figure.getPosition().y);
    this.angel.figure.runAction(movedown);
    var game = this;
    goog.events.listen(movedown,lime.animation.Event.STOP,function(){
        game.score1.setText(game.points);
        if(game.points > game.getHighScore()){
            game.setHighScore(game.points);
            game.highscore.setText(game.points);
        }
        game.score.setHidden(true);
        var btn = flabbyangel.makeButton('Try again!').setPosition(0, 70).setSize(170,70);
            goog.events.listen(btn, 'click', function() {
                flabbyangel.director.replaceScene(new flabbyangel.Game(), lime.transitions.Dissolve);
            });  
        game.gameOverLayer.appendChild(btn);
        game.gameOverLayer.setHidden(false);
        
    });

    this.world.bg.loop.stop();
    lime.scheduleManager.unschedule(this.step_, this);                 
};
flabbyangel.Game.prototype.getHighScore= function(){
    var highscore = 0;
    if(typeof(Storage)!=="undefined"){  
        if(localStorage.highscore == undefined ||localStorage.highscore == "undefined"){
                highscore = 0;
                localStorage.setItem("highscore",highscore);   
                
        }
        else
            highscore = parseInt(localStorage.highscore);      
    }
  else
    {
        alert("Do not support HTML5");
    // Sorry! No Web Storage support..
    }   
    return highscore;  
};
flabbyangel.Game.prototype.setHighScore= function(score){
     localStorage.highscore = score.toString();         
};
flabbyangel.Game.prototype.step_ = function(dt){
    this.ForceObstacles();
    this.world.Step(dt / 1000, 3);
    var pos = this.angel._body.GetCenterPosition().clone();
    this.angel.figure.setPosition(pos);
    if(this.angel._body.GetContactList()!= null){
        if(this.angel._body.GetContactList().other != ceiling_body ){
            this.newGame();
        }
    }                
};
flabbyangel.Game.prototype.pressHandler_ = function(e) {
    //renove guide layer
    if(!this.inGame){
        this.guideLayer.removeAllChildren();
        lime.scheduleManager.schedule(this.step_ ,this);
    };
    this.wingSound.play();
    this.inGame = true;
    this.angel.moveUp(this.angel._body);
};
flabbyangel.Game.prototype.GenerateObstacles = function(){
    this.obstacles = new Array();
    this.width = 120;
    this.space = 220;
    this.distance = 380;
    this.GenerateObstacle(0,flabbyangel.WIDTH*2);
    this.GenerateObstacle(2,flabbyangel.WIDTH*2 + this.distance);
    this.GenerateObstacle(4,flabbyangel.WIDTH*2 + this.distance*2);
};
flabbyangel.Game.prototype.GenerateObstacle = function(i,x){
    var height = parseInt(goog.math.uniformRandom(flabbyangel.HEIGHT/4, flabbyangel.HEIGHT/2));
    var height2= 850 - height - this.space;
    this.obstacles[i] = new flabbyangel.Obstacle(x,height/2,this.width,height);    
    this.appendChild(this.obstacles[i].AddFigure(x,height/2,this.width,height,false));
    this.obstacles[i]._body = this.world.CreateBody(this.obstacles[i]);
    this.obstacles[i]._gravity = new box2d.Vec2(0, -this.obstacles[i]._body.GetMass()*this.gravity.y);
    this.obstacles[i+1] = new flabbyangel.Obstacle(x,850-height2/2,this.width,height2);    
    this.appendChild(this.obstacles[i+1].AddFigure(x,850-height2/2,this.width,height2,true));
    this.obstacles[i+1]._body = this.world.CreateBody(this.obstacles[i+1]);
    this.obstacles[i+1]._gravity = new box2d.Vec2(0, -this.obstacles[i+1]._body.GetMass()*this.gravity.y);

};
flabbyangel.Game.prototype.ForceObstacles = function(){
    for(var i = 0; i <= 5; i=i+2){
        var pos1= this.obstacles[i]._body.GetCenterPosition().clone();
        this.obstacles[i].figure.setPosition(pos1);
        var pos2= this.obstacles[i+1]._body.GetCenterPosition().clone();
        this.obstacles[i+1].figure.setPosition(pos2);
        if(pos1.x <= -this.distance){       
           var height = parseInt(goog.math.uniformRandom(flabbyangel.HEIGHT/4, flabbyangel.HEIGHT/2));
           var height2= 850 - height - this.space;
           this.obstacles[i].UpdateObstacle(this.width,height,pos1.x+3*this.distance,height/2,this.world);
            this.obstacles[i+1].UpdateObstacle(this.width,height2,pos2.x+3*this.distance,850-height2/2,this.world);
        }
        this.obstacles[i]._body.ApplyForce(this.obstacles[i]._gravity,this.obstacles[i]._body.GetWorldPoint(new box2d.Vec2(0, 0)));
        this.obstacles[i+1]._body.ApplyForce(this.obstacles[i+1]._gravity,this.obstacles[i+1]._body.GetWorldPoint(new box2d.Vec2(0, 0)));
        this.obstacles[i]._body.SetLinearVelocity(this.moveVel);  
        this.obstacles[i+1]._body.SetLinearVelocity(this.moveVel); 
      if(pos1.x <= this.angel.figure.getPosition().x-60&&pos1.x > 50){
            if(this.obstacles[i].isScore === true){
                this.points++;
                this.score.setText(this.points);
                this.scoreSound.play();
                this.obstacles[i].isScore = false;   
            }    
        }
    }   
};

//set main namespace
goog.provide('flabbyangel');
//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('flabbyangel.Button');
goog.require('flabbyangel.Angel');
goog.require('flabbyangel.Background');
goog.require('flabbyangel.Game');

//constant iPad size
flabbyangel.WIDTH = 720;
flabbyangel.HEIGHT = 1004;
flabbyangel.SPEED = 900;
// entrypoint
flabbyangel.start = function(){

	flabbyangel.director = new lime.Director(document.body, flabbyangel.WIDTH, flabbyangel.HEIGHT);
	flabbyangel.director.makeMobileWebAppCapable();
	flabbyangel.director.setDisplayFPS(false);
	flabbyangel.loadMenu();
};
// load menu scene
flabbyangel.loadMenu = function() {
    var scene = new lime.Scene();
        bglayer = new lime.Layer();
        var bg = new flabbyangel.Background(flabbyangel.WIDTH,flabbyangel.HEIGHT);
        bglayer.appendChild(bg);
        scene.appendChild(bglayer);
        layer = new lime.Layer().setPosition(flabbyangel.WIDTH / 2, 0);

	if(flabbyangel.isBrokenChrome()) layer.setRenderer(lime.Renderer.CANVAS);

	var title = new lime.Sprite().setFill('assets/title.png').setPosition(0, 290);
	title.qualityRenderer = true;
	layer.appendChild(title);
        

        
	var btns = new lime.Layer().setPosition(0, 430);
	layer.appendChild(btns);
        
 	var btn = new flabbyangel.Angel(0,0).directForm();

	btns.appendChild(btn);
       

	var btn = flabbyangel.makeButton('Start').setPosition(0, 200).setSize(200,70);
	goog.events.listen(btn, 'click', function() {
	    flabbyangel.director.replaceScene(new lime.Scene(), lime.transitions.Dissolve,1000);
	});       
	btns.appendChild(btn);

	btn1 = flabbyangel.makeButton('Rate us').setPosition(0, 320).setSize(200,70);
 	goog.events.listen(btn1, 'click', function() {
	    flabbyangel.director.replaceScene(new flabbyangel.Game(), lime.transitions.Dissolve);
	});  
	btns.appendChild(btn1);
        scene.appendChild(layer);
	flabbyangel.builtByAura(scene);

	// set current scene active
	flabbyangel.director.replaceScene(scene, lime.transitions.Dissolve);
};
flabbyangel.isBrokenChrome = function(){
   return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
};
// add lime credintials to a scene
flabbyangel.builtByAura = function(scene) {
    var txt = new lime.Label().setText('(C) Aura Studio 2014').setFontColor('#fff').setFontSize(24).setPosition(360, 960);
    scene.appendChild(txt);
};
// helper for same size buttons
flabbyangel.makeButton = function(text) {
    var btn = new flabbyangel.Button(text).setSize(300, 90);
    return btn;
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('flabbyangel.start', flabbyangel.start);

goog.provide('flabbyangel.Object');
goog.require('box2d.BodyDef');

flabbyangel.Object = function() {
    box2d.BodyDef.call(this);
};

goog.inherits(flabbyangel.Object, box2d.BodyDef);

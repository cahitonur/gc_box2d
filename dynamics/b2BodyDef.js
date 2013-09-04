import common.b2Settings as b2Settings;
import common.math.b2Vec2 as b2Vec2;

var b2BodyDef = exports = Class(function () {
	this.init = function()
	{
		// initialize instance variables for references
		this.shapes = new Array();
		//

		this.userData = null;
		for (var i = 0; i < b2Settings.b2_maxShapesPerBody; i++){
			this.shapes[i] = null;
		}
		this.position = new b2Vec2(0.0, 0.0);
		this.rotation = 0.0;
		this.linearVelocity = new b2Vec2(0.0, 0.0);
		this.angularVelocity = 0.0;
		this.linearDamping = 0.0;
		this.angularDamping = 0.0;
		this.allowSleep = true;
		this.isSleeping = false;
		this.preventRotation = false;
	}

	this.userData = null;
	this.shapes= new Array();
	this.position = null;
	this.rotation = null;
	this.linearVelocity = null;
	this.angularVelocity = null;
	this.linearDamping = null;
	this.angularDamping = null;
	this.allowSleep = null;
	this.isSleeping = null;
	this.preventRotation = null;

	this.AddShape = function(shape)
	{
		for (var i = 0; i < b2Settings.b2_maxShapesPerBody; ++i)
		{
			if (this.shapes[i] == null)
			{
				this.shapes[i] = shape;
				break;
			}
		}
	}
});
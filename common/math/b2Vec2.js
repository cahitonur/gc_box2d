var b2Vec2 = exports = Class(function () {
	this.init = function(x_, y_) {
		this.x=x_;
		this.y=y_;
	}

	this.SetZero = function() { this.x = 0.0; this.y = 0.0; }
	this.Set = function(x_, y_) {this.x=x_; this.y=y_;}
	this.SetV = function(v) {this.x=v.x; this.y=v.y;}

	this.Negative = function(){ return new b2Vec2(-this.x, -this.y); }


	this.Copy = function(){
		return new b2Vec2(this.x,this.y);
	}

	this.Add = function(v)
	{
		this.x += v.x; this.y += v.y;
	}

	this.Subtract = function(v)
	{
		this.x -= v.x; this.y -= v.y;
	}

	this.Multiply = function(a)
	{
		this.x *= a; this.y *= a;
	}

	this.MulM = function(A)
	{
		var tX = this.x;
		this.x = A.col1.x * tX + A.col2.x * this.y;
		this.y = A.col1.y * tX + A.col2.y * this.y;
	}

	this.MulTM = function(A)
	{
		var tX = b2Math.b2Dot(this, A.col1);
		this.y = b2Math.b2Dot(this, A.col2);
		this.x = tX;
	}

	this.CrossVF = function(s)
	{
		var tX = this.x;
		this.x = s * this.y;
		this.y = -s * tX;
	}

	this.CrossFV = function(s)
	{
		var tX = this.x;
		this.x = -s * this.y;
		this.y = s * tX;
	}

	this.MinV = function(b)
	{
		this.x = this.x < b.x ? this.x : b.x;
		this.y = this.y < b.y ? this.y : b.y;
	}

	this.MaxV = function(b)
	{
		this.x = this.x > b.x ? this.x : b.x;
		this.y = this.y > b.y ? this.y : b.y;
	}

	this.Abs = function()
	{
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
	}

	this.Length = function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	this.Normalize = function()
	{
		var length = this.Length();
		if (length < Number.MIN_VALUE)
		{
			return 0.0;
		}
		var invLength = 1.0 / length;
		this.x *= invLength;
		this.y *= invLength;

		return length;
	}

	this.IsValid = function()
	{
		return b2Math.b2IsValid(this.x) && b2Math.b2IsValid(this.y);
	}

	this.x = null;
	this.y = null;
	this.Make = function(x_, y_)
	{
		return new b2Vec2(x_, y_);
	}
});
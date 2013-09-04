import common.math.b2Vec2 as b2Vec2;

var b2Math = exports = Class(function () {
	this.b2IsValid = function(x)
	{
		return isFinite(x);
	};
	this.b2Dot = function(a, b)
	{
		return a.x * b.x + a.y * b.y;
	};
	this.b2CrossVV = function(a, b)
	{
		return a.x * b.y - a.y * b.x;
	};
	this.b2CrossVF = function(a, s)
	{
		var v = new b2Vec2(s * a.y, -s * a.x);
		return v;
	};
	this.b2CrossFV = function(s, a)
	{
		var v = new b2Vec2(-s * a.y, s * a.x);
		return v;
	};
	this.b2MulMV = function(A, v)
	{
		var u = new b2Vec2(A.col1.x * v.x + A.col2.x * v.y, A.col1.y * v.x + A.col2.y * v.y);
		return u;
	};
	this.b2MulTMV = function(A, v)
	{
		var u = new b2Vec2(this.b2Dot(v, A.col1), this.b2Dot(v, A.col2));
		return u;
	};
	this.AddVV = function(a, b)
	{
		var v = new b2Vec2(a.x + b.x, a.y + b.y);
		return v;
	};
	this.SubtractVV = function(a, b)
	{
		var v = new b2Vec2(a.x - b.x, a.y - b.y);
		return v;
	};
	this.MulFV = function(s, a)
	{
		var v = new b2Vec2(s * a.x, s * a.y);
		return v;
	};
	this.AddMM = function(A, B)
	{
		var C = new b2Mat22(0, this.AddVV(A.col1, B.col1), this.AddVV(A.col2, B.col2));
		return C;
	};
	this.b2MulMM = function(A, B)
	{
		var C = new b2Mat22(0, this.b2MulMV(A, B.col1), this.b2MulMV(A, B.col2));
		return C;
	};
	this.b2MulTMM = function(A, B)
	{
		var c1 = new b2Vec2(this.b2Dot(A.col1, B.col1), this.b2Dot(A.col2, B.col1));
		var c2 = new b2Vec2(this.b2Dot(A.col1, B.col2), this.b2Dot(A.col2, B.col2));
		var C = new b2Mat22(0, c1, c2);
		return C;
	};
	this.b2Abs = function(a)
	{
		return a > 0.0 ? a : -a;
	};
	this.b2AbsV = function(a)
	{
		var b = new b2Vec2(this.b2Abs(a.x), this.b2Abs(a.y));
		return b;
	};
	this.b2AbsM = function(A)
	{
		var B = new b2Mat22(0, this.b2AbsV(A.col1), this.b2AbsV(A.col2));
		return B;
	};
	this.b2Min = function(a, b)
	{
		return a < b ? a : b;
	};
	this.b2MinV = function(a, b)
	{
		var c = new b2Vec2(this.b2Min(a.x, b.x), this.b2Min(a.y, b.y));
		return c;
	};
	this.b2Max = function(a, b)
	{
		return a > b ? a : b;
	};
	this.b2MaxV = function(a, b)
	{
		var c = new b2Vec2(this.b2Max(a.x, b.x), this.b2Max(a.y, b.y));
		return c;
	};
	this.b2Clamp = function(a, low, high)
	{
		return this.b2Max(low, this.b2Min(a, high));
	};
	this.b2ClampV = function(a, low, high)
	{
		return this.b2MaxV(low, this.b2MinV(a, high));
	};
	this.b2Swap = function(a, b)
	{
		var tmp = a[0];
		a[0] = b[0];
		b[0] = tmp;
	};
	this.b2Random = function()
	{
		return Math.random() * 2 - 1;
	};
	this.b2NextPowerOfTwo = function(x)
	{
		x |= (x >> 1) & 0x7FFFFFFF;
		x |= (x >> 2) & 0x3FFFFFFF;
		x |= (x >> 4) & 0x0FFFFFFF;
		x |= (x >> 8) & 0x00FFFFFF;
		x |= (x >> 16)& 0x0000FFFF;
		return x + 1;
	};
	this.b2IsPowerOfTwo = function(x)
	{
		var result = x > 0 && (x & (x - 1)) == 0;
		return result;
	};
	this.tempVec2 = new b2Vec2();
	this.tempVec3 = new b2Vec2();
	this.tempVec4 = new b2Vec2();
	this.tempVec5 = new b2Vec2();
	this.tempMat = new b2Mat22();
});
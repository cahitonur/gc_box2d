import common.math.b2Math as b2Math;
import common.math.b2Vec2 as b2Vec2;
import collision.shapes.b2MassData as b2MassData;

var e_staticFlag = 0x0001;
var e_frozenFlag = 0x0002;
var e_islandFlag = 0x0004;
var e_sleepFlag = 0x0008;
var e_allowSleepFlag = 0x0010;
var e_destroyFlag = 0x0020;

var b2Body = exports = Class(function () {
	// Set the position of the body's origin and rotation (radians).
	// This breaks any contacts and wakes the other bodies.
	this.SetOriginPosition = function(position, rotation){
		if (this.IsFrozen())
		{
			return;
		}

		this.m_rotation = rotation;
		this.m_R.Set(this.m_rotation);
		this.m_position = b2Math.AddVV(position , b2Math.b2MulMV(this.m_R, this.m_center));

		this.m_position0.SetV(this.m_position);
		this.m_rotation0 = this.m_rotation;

		for (var s = this.m_shapeList; s != null; s = s.m_next)
		{
			s.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R);
		}

		this.m_world.m_broadPhase.Commit();
	}

	// Get the position of the body's origin. The body's origin does not
	// necessarily coincide with the center of mass. It depends on how the
	// shapes are created.
	this.GetOriginPosition = function(){
		return b2Math.SubtractVV(this.m_position, b2Math.b2MulMV(this.m_R, this.m_center));
	}

	// Set the position of the body's center of mass and rotation (radians).
	// This breaks any contacts and wakes the other bodies.
	this.SetCenterPosition = function(position, rotation){
		if (this.IsFrozen())
		{
			return;
		}

		this.m_rotation = rotation;
		this.m_R.Set(this.m_rotation);
		this.m_position.SetV( position );

		this.m_position0.SetV(this.m_position);
		this.m_rotation0 = this.m_rotation;

		for (var s = this.m_shapeList; s != null; s = s.m_next)
		{
			s.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R);
		}

		this.m_world.m_broadPhase.Commit();
	}

	// Get the position of the body's center of mass. The body's center of mass
	// does not necessarily coincide with the body's origin. It depends on how the
	// shapes are created.
	this.GetCenterPosition = function(){
		return this.m_position;
	}

	// Get the rotation in radians.
	this.GetRotation = function(){
		return this.m_rotation;
	}

	this.GetRotationMatrix = function(){
		return this.m_R;
	}

	// Set/Get the linear velocity of the center of mass.
	this.SetLinearVelocity = function(v){
		this.m_linearVelocity.SetV(v);
	}
	this.GetLinearVelocity = function(){
		return this.m_linearVelocity;
	}

	// Set/Get the angular velocity.
	this.SetAngularVelocity = function(w){
		this.m_angularVelocity = w;
	}
	this.GetAngularVelocity = function(){
		return this.m_angularVelocity;
	}

	// Apply a force at a world point. Additive.
	this.ApplyForce = function(force, point)
	{
		if (this.IsSleeping() == false)
		{
			this.m_force.Add( force );
			this.m_torque += b2Math.b2CrossVV(b2Math.SubtractVV(point, this.m_position), force);
		}
	}

	// Apply a torque. Additive.
	this.ApplyTorque = function(torque)
	{
		if (this.IsSleeping() == false)
		{
			this.m_torque += torque;
		}
	}

	// Apply an impulse at a point. This immediately modifies the velocity.
	this.ApplyImpulse = function(impulse, point)
	{
		if (this.IsSleeping() == false)
		{
			this.m_linearVelocity.Add( b2Math.MulFV(this.m_invMass, impulse) );
			this.m_angularVelocity += ( this.m_invI * b2Math.b2CrossVV( b2Math.SubtractVV(point, this.m_position), impulse)  );
		}
	}

	this.GetMass = function(){
		return this.m_mass;
	}

	this.GetInertia = function(){
		return this.m_I;
	}

	// Get the world coordinates of a point give the local coordinates
	// relative to the body's center of mass.
	this.GetWorldPoint = function(localPoint){
		return b2Math.AddVV(this.m_position , b2Math.b2MulMV(this.m_R, localPoint));
	}

	// Get the world coordinates of a vector given the local coordinates.
	this.GetWorldVector = function(localVector){
		return b2Math.b2MulMV(this.m_R, localVector);
	}

	// Returns a local point relative to the center of mass given a world point.
	this.GetLocalPoint = function(worldPoint){
		return b2Math.b2MulTMV(this.m_R, b2Math.SubtractVV(worldPoint, this.m_position));
	}

	// Returns a local vector given a world vector.
	this.GetLocalVector = function(worldVector){
		return b2Math.b2MulTMV(this.m_R, worldVector);
	}

	// Is this body static (immovable)?
	this.IsStatic = function(){
		return (this.m_flags & e_staticFlag) == e_staticFlag;
	}

	this.IsFrozen = function(){
		return (this.m_flags & e_frozenFlag) == e_frozenFlag;
	}

	// Is this body sleeping (not simulating).
	this.IsSleeping = function(){
		return (this.m_flags & e_sleepFlag) == e_sleepFlag;
	}

	// You can disable sleeping on this particular body.
	this.AllowSleeping = function(flag){
		if (flag)
		{
			this.m_flags |= e_allowSleepFlag;
		}
		else
		{
			this.m_flags &= ~e_allowSleepFlag;
			this.WakeUp();
		}
	}

	// Wake up this body so it will begin simulating.
	this.WakeUp = function(){
		this.m_flags &= ~e_sleepFlag;
		this.m_sleepTime = 0.0;
	}

	// Get the list of all shapes attached to this body.
	this.GetShapeList = function(){
		return this.m_shapeList;
	}

	this.GetContactList = function()
	{
		return this.m_contactList;
	}

	this.GetJointList = function()
	{
		return this.m_jointList;
	}

	// Get the next body in the world's body list.
	this.GetNext = function(){
		return this.m_next;
	}

	this.GetUserData = function(){
		return this.m_userData;
	}

	//--------------- Internals Below -------------------

	this.init = function(bd, world){
		// initialize instance variables for references
		this.sMat0 = new b2Mat22();
		this.m_position = new b2Vec2();
		this.m_R = new b2Mat22(0);
		this.m_position0 = new b2Vec2();
		//

		var i = 0;
		var sd;
		var massData;

		this.m_flags = 0;
		this.m_position.SetV( bd.position );
		this.m_rotation = bd.rotation;
		this.m_R.Set(this.m_rotation);
		this.m_position0.SetV(this.m_position);
		this.m_rotation0 = this.m_rotation;
		this.m_world = world;

		this.m_linearDamping = b2Math.b2Clamp(1.0 - bd.linearDamping, 0.0, 1.0);
		this.m_angularDamping = b2Math.b2Clamp(1.0 - bd.angularDamping, 0.0, 1.0);

		this.m_force = new b2Vec2(0.0, 0.0);
		this.m_torque = 0.0;

		this.m_mass = 0.0;

		var massDatas = new Array(b2Settings.b2_maxShapesPerBody);
		for (i = 0; i < b2Settings.b2_maxShapesPerBody; i++){
			massDatas[i] = new b2MassData();
		}

		// Compute the shape mass properties, the bodies total mass and COM.
		this.m_shapeCount = 0;
		this.m_center = new b2Vec2(0.0, 0.0);
		for (i = 0; i < b2Settings.b2_maxShapesPerBody; ++i)
		{
			sd = bd.shapes[i];
			if (sd == null) break;
			massData = massDatas[ i ];
			sd.ComputeMass(massData);
			this.m_mass += massData.mass;
			//this.m_center += massData->mass * (sd->localPosition + massData->center);
			this.m_center.x += massData.mass * (sd.localPosition.x + massData.center.x);
			this.m_center.y += massData.mass * (sd.localPosition.y + massData.center.y);
			++this.m_shapeCount;
		}

		// Compute center of mass, and shift the origin to the COM.
		if (this.m_mass > 0.0)
		{
			this.m_center.Multiply( 1.0 / this.m_mass );
			this.m_position.Add( b2Math.b2MulMV(this.m_R, this.m_center) );
		}
		else
		{
			this.m_flags |= e_staticFlag;
		}

		// Compute the moment of inertia.
		this.m_I = 0.0;
		for (i = 0; i < this.m_shapeCount; ++i)
		{
			sd = bd.shapes[i];
			massData = massDatas[ i ];
			this.m_I += massData.I;
			var r = b2Math.SubtractVV( b2Math.AddVV(sd.localPosition, massData.center), this.m_center );
			this.m_I += massData.mass * b2Math.b2Dot(r, r);
		}

		if (this.m_mass > 0.0)
		{
			this.m_invMass = 1.0 / this.m_mass;
		}
		else
		{
			this.m_invMass = 0.0;
		}

		if (this.m_I > 0.0 && bd.preventRotation == false)
		{
			this.m_invI = 1.0 / this.m_I;
		}
		else
		{
			this.m_I = 0.0;
			this.m_invI = 0.0;
		}

		// Compute the center of mass velocity.
		this.m_linearVelocity = b2Math.AddVV(bd.linearVelocity, b2Math.b2CrossFV(bd.angularVelocity, this.m_center));
		this.m_angularVelocity = bd.angularVelocity;

		this.m_jointList = null;
		this.m_contactList = null;
		this.m_prev = null;
		this.m_next = null;

		// Create the shapes.
		this.m_shapeList = null;
		for (i = 0; i < this.m_shapeCount; ++i)
		{
			sd = bd.shapes[i];
			var shape = b2Shape.Create(sd, this, this.m_center);
			shape.m_next = this.m_shapeList;
			this.m_shapeList = shape;
		}

		this.m_sleepTime = 0.0;
		if (bd.allowSleep)
		{
			this.m_flags |= e_allowSleepFlag;
		}
		if (bd.isSleeping)
		{
			this.m_flags |= e_sleepFlag;
		}

		if ((this.m_flags & e_sleepFlag)  || this.m_invMass == 0.0)
		{
			this.m_linearVelocity.Set(0.0, 0.0);
			this.m_angularVelocity = 0.0;
		}

		this.m_userData = bd.userData;
	}

	this.Destroy = function() {
		var s = this.m_shapeList;
		while (s)
		{
			var s0 = s;
			s = s.m_next;

			b2Shape.Destroy(s0);
		}
	}

	// Temp mat
	this.sMat0: new b2Mat22(),
	this.SynchronizeShapes = function() {
		//b2Mat22 R0(this.m_rotation0);
		this.sMat0.Set(this.m_rotation0);
		for (var s = this.m_shapeList; s != null; s = s.m_next)
		{
			s.Synchronize(this.m_position0, this.sMat0, this.m_position, this.m_R);
		}
	}

	this.QuickSyncShapes = function() {
		for (var s = this.m_shapeList; s != null; s = s.m_next)
		{
			s.QuickSync(this.m_position, this.m_R);
		}
	}

	// This is used to prevent connected bodies from colliding.
	// It may lie, depending on the collideConnected flag.
	this.IsConnected = function(other) {
		for (var jn = this.m_jointList; jn != null; jn = jn.next)
		{
			if (jn.other == other)
				return jn.joint.m_collideConnected == false;
		}

		return false;
	}

	this.Freeze = function() {
		this.m_flags |= e_frozenFlag;
		this.m_linearVelocity.SetZero();
		this.m_angularVelocity = 0.0;

		for (var s = this.m_shapeList; s != null; s = s.m_next)
		{
			s.DestroyProxy();
		}
	}

	this.m_flags = 0;
	this.m_position = new b2Vec2();
	this.m_rotation = null;
	this.m_R = new b2Mat22(0);
	this.m_position0 = new b2Vec2();
	this.m_rotation0 = null;
	this.m_linearVelocity = null;
	this.m_angularVelocity = null;
	this.m_force = null;
	this.m_torque = null;
	this.m_center =  null;
	this.m_world = null;
	this.m_prev = null;
	this.m_next = null;
	this.m_shapeList = null;
	this.m_shapeCount = 0;
	this.m_jointList = null;
	this.m_contactList = null;
	this.m_mass = null;
	this.m_invMass = null;
	this.m_I = null;
	this.m_invI = null;
	this.m_linearDamping = null;
	this.m_angularDamping = null;
	this.m_sleepTime = null;
	this.m_userData = null;
});
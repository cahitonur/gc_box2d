var b2WorldListener = exports = Class(function () {
	// If a body is destroyed, then any joints attached to it are also destroyed.
	// This prevents memory leaks, but you may unexpectedly be left with an
	// orphaned joint pointer.
	// Box2D will notify you when a joint is implicitly destroyed.
	// It is NOT called if you directly destroy a joint.
	// Implement this abstract class and provide it to b2World via
	// b2World::SetListener().
	// DO NOT modify the Box2D world inside this callback.
	this.b2_freezeBody = 0;
	this.b2_destroyBody = 1;
	this.NotifyJointDestroyed = function(joint){}

	// This is called when a body's shape passes outside of the world boundary. If you
	// override this and pass back e_destroyBody, you must nullify your copies of the
	// body pointer.
	this.NotifyBoundaryViolated = function(body)
	{
		//NOT_USED(body);
		return b2WorldListener.b2_freezeBody;
	}
});
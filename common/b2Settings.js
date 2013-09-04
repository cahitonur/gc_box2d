var b2Settings = exports = Class(function () {
	// Define your unit system here. The default system is
	// meters-kilograms-seconds. For the tuning to work well,
	// your dynamic objects should be bigger than a pebble and smaller than a house.
	// static public const b2Settings.b2_lengthUnitsPerMeter = 1.0;

	// Use this for pixels:

	// Global tuning constants based on MKS units.

	// Collision

	// Dynamics

	// Sleep

	// assert

	this.USHRT_MAX = 0x0000ffff;
	this.b2_pi = Math.PI;
	this.b2_massUnitsPerKilogram = 1.0;
	this.b2_timeUnitsPerSecond = 1.0;
	this.b2_lengthUnitsPerMeter = 30.0;
	this.b2_maxManifoldPoints = 2;
	this.b2_maxShapesPerBody = 64;
	this.b2_maxPolyVertices = 8;
	this.b2_maxProxies = 1024;
	this.b2_maxPairs = 8 * b2Settings.b2_maxProxies;
	this.b2_linearSlop = 0.005 * b2Settings.b2_lengthUnitsPerMeter;
	this.b2_angularSlop = 2.0 / 180.0 * b2Settings.b2_pi;
	this.b2_velocityThreshold = 1.0 * b2Settings.b2_lengthUnitsPerMeter / b2Settings.b2_timeUnitsPerSecond;
	this.b2_maxLinearCorrection = 0.2 * b2Settings.b2_lengthUnitsPerMeter;
	this.b2_maxAngularCorrection = 8.0 / 180.0 * b2Settings.b2_pi;
	this.b2_contactBaumgarte = 0.2;
	this.b2_timeToSleep = 0.5 * b2Settings.b2_timeUnitsPerSecond;
	this.b2_linearSleepTolerance = 0.01 * b2Settings.b2_lengthUnitsPerMeter / b2Settings.b2_timeUnitsPerSecond;
	this.b2_angularSleepTolerance = 2.0 / 180.0 / b2Settings.b2_timeUnitsPerSecond;
	this.b2Assert = function(a) {
		if (!a){
			var nullVec;
			nullVec.x++;
		}
	}
});
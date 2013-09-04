var b2CollisionFilter = exports = Class(function () {
	// Return true if contact calculations should be performed between these two shapes.
	this.ShouldCollide = function(shape1, shape2){
		if (shape1.m_groupIndex == shape2.m_groupIndex && shape1.m_groupIndex != 0)
		{
			return shape1.m_groupIndex > 0;
		}

		var collide = (shape1.m_maskBits & shape2.m_categoryBits) != 0 && (shape1.m_categoryBits & shape2.m_maskBits) != 0;
		return collide;
	}
});
this.b2_defaultFilter = new b2CollisionFilter();
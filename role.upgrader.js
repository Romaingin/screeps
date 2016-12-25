var sourceFinder = require('source.finder');

var roleUpgrader = {
	run: function(creep) {
		// Refill energy and go to the controller
		var target = Game.getObjectById(creep.memory.targetId);
		if (creep.carry.energy == 0 || (creep.pos.isNearTo(target) && creep.carry.energy < creep.carryCapacity)) {
			sourceFinder.run(creep)
		} else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller)
		}
	}
}

module.exports = roleUpgrader;

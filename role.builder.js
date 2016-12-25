var sourceFinder = require('source.finder');
var sourceTransfer = require('source.transfer');

var roleBuilder = {
	run: function(creep) {
		// Refill energy and go build
		var target = Game.getObjectById(creep.memory.targetId);
		if (creep.carry.energy == 0 || (creep.pos.isNearTo(target) && creep.carry.energy < creep.carryCapacity)) {
			sourceFinder.run(creep)
		} else {
			target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
			if (target) {
				if (creep.build(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target)
				}
			} else {
				// Find damaged structures
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: object => object.hits < object.hitsMax
				});

				// TODO sort
				//targets.sort((a,b) => a.hits - b.hits);

				if(targets.length > 0) {
				    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
				        creep.moveTo(targets[0]);
				    }
				} else {
					// Idle
					sourceTransfer.run(creep)
				}
			}
		}
	}
}

module.exports = roleBuilder;

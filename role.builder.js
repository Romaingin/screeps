var sourceFinder = require('source.finder')
var sourceTransfer = require('source.transfer')
var roleHarvester = require('role.harvester')
// TODO give prority to extension
var roleBuilder = {
	run: function(creep) {
		// Do its job only if no emergency among harvester
		if (!Memory.emergency.harvester) {
			// Refill energy and go build
			var target = Game.getObjectById(creep.memory.targetId);
			if (creep.carry.energy == 0 || (creep.pos.isNearTo(target) && creep.carry.energy < creep.carryCapacity)) {
				sourceFinder.run(creep)
			} else {
				target = Game.rooms[creep.pos.roomName].find(FIND_CONSTRUCTION_SITES)

				if (target.length > 0) {
					// Road do not have prority
					priorityTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
						filter: target => target.structureType != STRUCTURE_ROAD
					})

					if (priorityTarget) {
						target = priorityTarget
					} else {
						target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
					}

					if (creep.build(target) == ERR_NOT_IN_RANGE) {
						creep.moveTo(target)
					}
				} else {
					// Refill tower
					var targets = creep.room.find(FIND_STRUCTURES, {
						filter: object => object.structureType == STRUCTURE_TOWER &&
							object.energy < object.energyCapacity

					})

					if (targets.length == 0) {
						// Find damaged structures
						var targets = creep.room.find(FIND_STRUCTURES, {
							filter: object => object.hits < object.hitsMax
						})

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
					} else {

						// Fill the tower
						if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
							creep.moveTo(targets[0]);
						}
					}
				}
			}
		} else {
			roleHarvester.run(creep)
		}

	}
}

module.exports = roleBuilder;

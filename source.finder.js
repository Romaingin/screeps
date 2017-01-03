var utils = require('utils')
var sourceManager = require('source.manager')

var sourceFinder = {
	fetchEnergy: function (creep) {
		// If the creeps energy is down to 0, go harvest a new source
		let target = Game.getObjectById(creep.memory.targetId)
		let result = creep.harvest(target)
		if (result == ERR_NOT_IN_RANGE) {
			// Get closer
			creep.moveTo(target);
		} else if (result == ERR_NOT_ENOUGH_ENERGY) {
			// TODO forecast when refilled
			// Give up and get a new one
			sourceManager.giveUpTarget(creep)
			let newSource = creep.pos.findClosestByRange(FIND_SOURCES, {
				filter: (source) => {
					return (source.energy != 0)
				}
			})
			if (newSource) {
				creep.memory.targetId = newSource.id
			}
		}
	},

	doesHarvestMoreEnergy: function (creep) {
		// If the creep is low in energy, it could mean it has to harvest more
		// or it could use this extra energy for something else
		// Return true if still harvesting
		let target = Game.getObjectById(creep.memory.targetId)
		if (creep.pos.isNearTo(target) && creep.carry.energy < creep.carryCapacity) {
			if (creep.harvest(target) == ERR_NOT_ENOUGH_ENERGY) {
				return false
			}
			return true
		} else {
			return false
		}
	},

	run: function (creep, searchForDrops=true) {
		// Update the target
		var dropped = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)
		if (dropped) {
			creep.memory.droppedId = dropped.id
		} else {
			creep.memory.droppedId = undefined
		}

		var target = utils.findClosestSourceForRole(creep.memory.role, creep.pos.roomName)
		if (target.energy > 0) {
			creep.memory.targetId = target.id
		} else {
			// Empty, find another if reached before ticks
			var newSource = creep.pos.findClosestByRange(FIND_SOURCES, {
				filter: (source) => {
					return (source.id != target.id);
				}
			})
			if (creep.pos.getRangeTo(newSource) < target.ticksToRegeneration) {
				target = newSource
				creep.memory.targetId = target.id
			}
		}

		var dropped = Game.getObjectById(creep.memory.droppedId)

		if (searchForDrops && dropped && !creep.pos.isNearTo(target)) {
			if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
				creep.moveTo(dropped);
			}
		} else {
			if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		}
	}
}

module.exports = sourceFinder;

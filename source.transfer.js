var sourceTransfer = {
	run: function(creep) {
		var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: { structureType: STRUCTURE_SPAWN }
		})

		// If spawn full
		if (target.energy == target.energyCapacity) {
			var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => {
					// Look for the extension not full
                    return (structure.structureType == STRUCTURE_EXTENSION &&
						structure.energy < structure.energyCapacity);
                }
			})
		}

		if (target) {
			var result = creep.transfer(target, RESOURCE_ENERGY)
			if (result == ERR_NOT_IN_RANGE) {
				creep.moveTo(target)
			}
			return result
		} else {
			// Everything full
			creep.moveTo(Game.flags["IdleSpot"])
			return ERR_FULL
		}


	}
}

module.exports = sourceTransfer

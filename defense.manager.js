var defenseManager =  {
	run: function () {
		var room = Game.rooms[Game.spawns["ColonyCenter"].pos.roomName]

		// Find if hostile creeps
		var hostiles = room.find(FIND_HOSTILE_CREEPS)
		if (hostiles.length > 0) {
			// Tower
			for (var name in Memory.towers) {
				var target = Memory.towers[name].pos.findClosestByRange(FIND_HOSTILE_CREEPS)
				Memory.towers[name].attack(target)
			}
		}
	},

	fillClosestTower: function (creep) {
		// Refill tower
		var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_TOWER &&
				object.energy < object.energyCapacity
		})

		if (targets) {
			// Fill the tower or get close to it
			if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
			return true
		} else {
			return false
		}
	}
}

module.exports = defenseManager

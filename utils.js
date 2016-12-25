var utils = {
	getAvailableEnergy: function (spawnName) {
		var spawn = Game.spawns[spawnName]
		var availableEnergy = spawn.energy

		// Add each extension's energy
		_.filter(Game.structures, function(structure) {
			if (structure.structureType == STRUCTURE_EXTENSION) {
				availableEnergy += structure.energy
			}
		})

		return availableEnergy
	},

	getExtensions: function (room) {
		return room.find(FIND_MY_STRUCTURES, {
			filter: { structureType: STRUCTURE_EXTENSION }
		});
	},

	getMaxHarvester: function (source) {
		// Get number of plains arround
		var plainNumber = 0
		for (var i = source.pos.x - 1; i <= source.pos.x + 1; i++) {
			for (var j = source.pos.y - 1; j <= source.pos.y + 1; j++) {
				if (Game.map.getTerrainAt(i, j, source.pos.roomName) == "plain") {
					plainNumber += 1
				}
			}
		}

		return plainNumber
	},

	findClosestSourceForRole: function (role, roomName=null) {
		switch (role) {
			case "harvester":
				return Game.spawns["ColonyCenter"].pos.findClosestByRange(FIND_SOURCES)
			case "builder":
				return Game.spawns["ColonyCenter"].pos.findClosestByRange(FIND_SOURCES)
			case "upgrader":
				return Game.rooms[Game.spawns["ColonyCenter"].pos.roomName].controller.pos.findClosestByRange(FIND_SOURCES)
			default:
		}
	}
}

module.exports = utils

var utils = {
	distance: function(p1, p2) {
		return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
	},

	getAvailableEnergy: function(spawnName) {
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

	getExtensions: function(room) {
		return room.find(FIND_MY_STRUCTURES, {
			filter: { structureType: STRUCTURE_EXTENSION }
		});
	},

	getMaxHarvester: function(source) {
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
	}
}

module.exports = utils

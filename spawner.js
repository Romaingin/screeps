var utils = require('utils')

var spawn = {
	spawn: function(role, id, body) {
		if (Game.spawns['ColonyCenter'].canCreateCreep(body) == OK) {
			// Create a creep
			Game.spawns['ColonyCenter'].createCreep( body, role+id, {role:role} )

			// Define target
			var target = undefined
			if (role != "warrior") {
				target = utils.findClosestSourceForRole(role, Game.creeps[role + id].room.roomName)
			}

			if (target) {
				Game.creeps[role + id].memory.targetId = target.id
			}
			return true
		}
		return false
	}
}

module.exports = spawn;

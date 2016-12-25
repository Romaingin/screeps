var spawn = {
	spawn: function(role, id, body) {
		if (Game.spawns['ColonyCenter'].canCreateCreep(body) == OK) {
			// Create a creep
			Game.spawns['ColonyCenter'].createCreep( body, role+id, {role:role} )

			// Define target
			var target
			switch (role) {
				case "harvester":
					target = Game.creeps[role + id].pos.findClosestByRange(FIND_SOURCES)
					break;
				case "upgrader":
					target = Game.creeps[role + id].room.controller.pos.findClosestByRange(FIND_SOURCES)
					break;
				case "builder":
					target = Game.creeps[role + id].pos.findClosestByRange(FIND_SOURCES)
					break;
				case "warrior":
					target = undefined
					break;
				default:
				target = undefined
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

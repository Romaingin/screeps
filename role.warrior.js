var roleWarrior = {
	run: function (creep) {
		// Find hostile
		var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
		if (target) {
			if (creep.attack(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		} else {
			// Patrol TODO
			creep.moveTo(Game.flags["WarriorSpot"])
		}
	}
}

module.exports = roleWarrior

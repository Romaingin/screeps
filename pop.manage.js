var spawner = require('spawner');
var utils = require('utils')

var c = { work: BODYPART_COST[WORK],
 			move: BODYPART_COST[MOVE],
			carry: BODYPART_COST[CARRY],
			attack: BODYPART_COST[ATTACK],
}

// Distribution of roles
roleCountReach = {
	'harvester': 4,
	'builder': 2,
	'upgrader': 6,
	'warrior': 6,
}

var popManage = {
	run: function (roleCountState) {
		// Convert to proportions, determin the lower
		var smallestProp = 10,
			role = "",
			prop
		for (var r in roleCountState) {
			prop = roleCountState[r] / roleCountReach[r]
			if (prop < smallestProp) {
				smallestProp = prop
				role = r
			}
		}

		// If need be, spawn another creep with the designated role
		if (smallestProp < 1.0) {
			var body = [MOVE]
			var availableEnergy = utils.getAvailableEnergy("ColonyCenter") - c[MOVE]

			// Decide above what energy amount it should be spawned
			var acceptableEnergy = 0.9 *
				(utils.getExtensions(Game.spawns["ColonyCenter"].room).length *
				EXTENSION_ENERGY_CAPACITY[Game.spawns["ColonyCenter"].room.controller.level] +
				Game.spawns["ColonyCenter"].energyCapacity)

			if (availableEnergy > acceptableEnergy) {
				switch (role) { // TODO proportions
					case "harvester":
						body.push(CARRY, WORK, WORK)
						availableEnergy -= 250

						// Work has priority
						while (availableEnergy >= c[WORK]) {
							body.push(WORK)
							availableEnergy -= c[WORK]
						}
						if (availableEnergy >= c[MOVE]) {
							body.push(MOVE)
							availableEnergy -= c[MOVE]
						}
						break;
					case "upgrader":
						body.push(CARRY, CARRY, WORK, MOVE)
						availableEnergy -= 250

						// Carry has priority
						while (availableEnergy >= c[CARRY] + c[WORK]) {
							body.push(CARRY, WORK)
							availableEnergy -= c[CARRY] + c[WORK]
						}
						if (availableEnergy >= c[MOVE]) {
							body.push(MOVE)
							availableEnergy -= c[MOVE]
						}
						break;
					case "builder":
						body.push(CARRY, CARRY, WORK, MOVE)
						availableEnergy -= 250

						// Work has priority
						while (availableEnergy >= c[WORK]) {
							body.push(WORK)
							availableEnergy -= c[WORK]
						}
						if (availableEnergy >= c[MOVE]) {
							body.push(MOVE)
							availableEnergy -= c[MOVE]
						}
						break;
					case "warrior":
						body.push(MOVE, ATTACK, ATTACK)
						availableEnergy -= 210
						// Attack has priority
						while (availableEnergy >= c[ATTACK]) {
							body.push(ATTACK)
							availableEnergy -= c[ATTACK]
						}
						if (availableEnergy >= c[MOVE]) {
							body.push(MOVE)
							availableEnergy -= c[MOVE]
						}
						break;
					default:
				}

				if (spawner.spawn(role, Memory.creepCounter, body)) {
					console.log("Is going to spawn :", role, body);
					Memory.creepCounter += 1
				}
			}
		}
	}
}

module.exports = popManage;

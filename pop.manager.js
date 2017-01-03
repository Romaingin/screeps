var spawner = require('spawner')
var colonyManager = require('colony.manager')
var utils = require('utils')

var c = { work: BODYPART_COST[WORK],
 			move: BODYPART_COST[MOVE],
			carry: BODYPART_COST[CARRY],
			attack: BODYPART_COST[ATTACK],
}

var bodyProportions = {
	"harvester": {
		"move": 0.3,
		"work": 0.4,
		"carry": 0.3,
		"attack": 0.0
	},

	"upgrader": {
		"move": 0.3,
		"work": 0.5,
		"carry": 0.2,
		"attack": 0.0
	},

	"builder": {
		"move": 0.3,
		"work": 0.4,
		"carry": 0.3,
		"attack": 0.0
	},

	"warrior": {
		"move": 0.4,
		"work": 0.0,
		"carry": 0.0,
		"attack": 0.6
	},
}

var popManager = {
	run: function () {
		// Distribution of roles
		var roleCountReach = colonyManager.populationCountReach()

		// Convert to proportions, determin the lower
		var smallestProp = 10,
			role = "",
			prop
		for (var r in Memory.count) {
			prop = Memory.count[r] / roleCountReach[r]
			if (prop < smallestProp) {
				smallestProp = prop
				role = r
			}
		}

		// If need be, spawn another creep with the designated role
		if (smallestProp < 1.0) {
			var availableEnergy = utils.getAvailableEnergy("ColonyCenter")

			// Decide above what energy amount it should be spawned TODO
			var acceptableEnergy =
				(utils.getExtensions(Game.spawns["ColonyCenter"].room).length *
				EXTENSION_ENERGY_CAPACITY[Game.spawns["ColonyCenter"].room.controller.level] +
				Game.spawns["ColonyCenter"].energyCapacity)

			// Look for shortage among harvesters
			var fact
			if (Memory.count['harvester'] <= 0.5 * roleCountReach['harvester']) {
				Memory.emergency.harvester = true
				acceptableEnergy = 300

				// TODO
				role = "harvester"
			} else {
				Memory.emergency.harvester = false
				acceptableEnergy *= 0.85
				if (acceptableEnergy < 300) {
					acceptableEnergy = 300
				}
			}

			if (availableEnergy >= acceptableEnergy) {
				body = popManager.getBodyComposition(role, availableEnergy)

				if (spawner.spawn(role, Memory.creepCounter, body)) {
					console.log("Is going to spawn :", role, body);
					Memory.creepCounter += 1
				}
			}
		}
	},

	getBodyComposition: function (role, availableEnergy) {
		let body = []
		let n
		let energyRemaining = availableEnergy

		for (var type in bodyProportions[role]) {
			// Append the type
			n = Math.floor(bodyProportions[role][type] * availableEnergy / c[type])
			for (var i = 0; i < n; i++) {
				body.push(type)
			}
			energyRemaining -= n * c[type]
		}

		// Fill the space
		while (energyRemaining - c[MOVE] >= 0) {
			body.push(MOVE)
			energyRemaining -= c[MOVE]
		}

		return body
	}
}

module.exports = popManager;

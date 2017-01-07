var utils = require("utils")

var sourceManager = {
	getSource: function (creep) {
		// One the creep transfered its energy, it requires
		// a new target. It is determined by the ratio given by the
		// main func.
		creep.memory.getSourceTimestamp = Game.time
		let minTimeSourceId = -1
		let minTime = 1E10
		for (var s in Memory.sources) {
			Memory.sources[s].avgTime = utils.sumArray(Memory.sources[s].avgTimesList)
			if (Memory.sources[s].avgTime < minTime) {
				minTime = Memory.sources[s].avgTime
				minTimeSourceId = s
			}
		}
		// Send the creep to the source which minimize the time spent
		creep.memory.targetId = minTimeSourceId
	},
	// TODO check source (simple func to update more efficiently)
	returnedFromTarget: function (creep) {
		// Called when a creep made it back. Used to set avg time
		// to make the trip.
		let deltaTime = Game.time - creep.memory.getSourceTimestamp
		let target = creep.memory.targetId
		Memory.sources[target].avgTimesList.push(deltaTime)
		Memory.sources[target].avgTimesList.shift()
	},

	giveUpTarget: function (creep) {
		// Called when focus is changed, but not returned yet
		Memory.sources[creep.memory.targetId].avgTimesList.shift()
	}
}

module.exports = sourceManager

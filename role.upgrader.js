var sourceFinder = require('source.finder')
var sourceManager = require('source.manager')

var roleUpgrader = {
	run: function(creep) {
		// Refill energy and go to the controller
		if (creep.carry.energy == 0) {
			// The creep need to fetch energy from its relevant source
			sourceFinder.fetchEnergy(creep)
		} else if (!sourceFinder.doesHarvestMoreEnergy(creep)) {
			// Upgrade the controller
			let result = creep.upgradeController(creep.room.controller)

			if (result == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller)
			} else if (creep.carry.energy == 0) {
				// Querry new source
				sourceManager.getSource(creep)
			} else {
				// Has just returned
				sourceManager.returnedFromTarget(creep)
			}
		}
	}
}

module.exports = roleUpgrader

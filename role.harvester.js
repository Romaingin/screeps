var utils = require('utils')
var sourceFinder = require('source.finder')
var sourceTransfer = require('source.transfer')
var sourceManager = require('source.manager')

var roleHarvester = {
	run: function(creep) {
		// Refill energy and store it in the extensions
		if (creep.carry.energy == 0) {
			// The creep need to fetch energy from its relevant source
			sourceFinder.fetchEnergy(creep)
		} else if (!sourceFinder.doesHarvestMoreEnergy(creep)) {
			// Transfer
			// TODO empty in all extensions
			var result = sourceTransfer.run(creep)

			if (result == ERR_FULL || result == OK) {
				// The creep has returned
				sourceManager.returnedFromTarget(creep)

				// Querry new source
				sourceManager.getSource(creep)

				// Drop if not OK
				if (result == ERR_FULL) {
					creep.drop(RESOURCE_ENERGY)
				}
			}
		}
	}
}

module.exports = roleHarvester

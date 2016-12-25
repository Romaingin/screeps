var utils = require('utils')
var sourceFinder = require('source.finder')
var sourceTransfer = require('source.transfer')

var roleHarvester = {
	run: function(creep) {
		if (creep.carry.energy < creep.carryCapacity) {
			sourceFinder.run(creep, false)
		} else {
			// Need to transfer
			var result = sourceTransfer.run(creep)
			if (result == ERR_FULL) {
				creep.drop(RESOURCE_ENERGY)
			}
		}
	}
}

module.exports = roleHarvester

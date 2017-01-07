var sourceFinder = require('source.finder')
var sourceTransfer = require('source.transfer')
var roleHarvester = require('role.harvester')
var sourceManager = require('source.manager')

var roleBuilder = {
	run: function(creep) {
		// Do its job only if no emergency among harvester
		if (!Memory.emergency.harvester) {
			// Refill energy and go build
			if (creep.carry.energy == 0) {
				// The creep need to fetch energy from its relevant source
				sourceFinder.fetchEnergy(creep)
			} else if (!sourceFinder.doesHarvestMoreEnergy(creep)) {
				// Road do not have prority
				target = creep.pos.findClosestByRange(function (object) {
					object.structureType != STRUCTURE_ROAD
				})

				if (!target) {
					target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
				}

				// Build the target
				var result = creep.build(target)
				if (result == ERR_NOT_IN_RANGE) {
					creep.moveTo(target)
				} else if (result == OK) {
					// The creep has returned
					sourceManager.returnedFromTarget(creep)

					// Querry new source
					sourceManager.getSource(creep)
				}
			}
		} else {
			// Emergency among harvesters
			roleHarvester.run(creep)
		}
	}
}

module.exports = roleBuilder;

var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')
var roleWarrior = require('role.warrior')
var spawner = require('spawner')
var popManage = require('pop.manage')
var utils = require('utils')

if (!Memory.creepCounter) { Memory.creepCounter = 5 }
if (!Memory.maxHarvesterPerSource) {
	Memory.maxHarvesterPerSource = {}

	var sources = Game.spawns["ColonyCenter"].room.find(FIND_SOURCES)
	sources.filter(function(s) {
		Memory.maxHarvesterPerSource[s.id] = utils.getMaxHarvester(s)
	})
}

roles = ["builder", "upgrader", "harvester"]

module.exports.loop = function () {
	var creepsNumber = 0
	var roleCountState = {
		'harvester': 0,
		'builder': 0,
		'upgrader': 0,
		'warrior': 0,
	}

	for(var name in Memory.creeps) {
	    if(Game.creeps[name]) {
			var creep = Game.creeps[name];

			// What is its role ?
			switch (creep.memory.role) {
				case 'harvester':
					roleHarvester.run(creep);
					break;
				case 'upgrader':
					roleUpgrader.run(creep);
					break;
				case 'builder':
					roleBuilder.run(creep);
					break;
				case 'warrior':
					roleWarrior.run(creep);
					break;
				default:
			}

			// Count the creep
			roleCountState[creep.memory.role] += 1

			creepsNumber += 1
	    } else {
			// Found dead
	        delete Memory.creeps[name];
		}
	}

	// Population management
	popManage.run(roleCountState)
}

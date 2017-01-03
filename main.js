var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')
var roleWarrior = require('role.warrior')
var spawner = require('spawner')
var popManager = require('pop.manager')
var colonyManager = require('colony.manager')
var utils = require('utils')

if (!Memory.creepCounter) { Memory.creepCounter = 5 }
if (!Memory.count) {Memory.count = {}}
if (!Memory.sources) {
	Memory.sources = {}
	// Add sources to memory
	var sources = Game.spawns["ColonyCenter"].room.find(FIND_SOURCES)
	sources.filter(function(s) {
		Memory.sources[s.id] = {
			//maxHarvesterPerSource: utils.getMaxHarvester(s),
			avgTimesList: [0],
			avgTime: 0
		}
	})
}
if (!Memory.emergency) {
	Memory.emergency = {}
}

module.exports.loop = function () {
	var creepsNumber = 0
	Memory.count = {
		'harvester': 0,
		'builder': 0,
		'upgrader': 0,
		'warrior': 0,
	}

	for(var name in Memory.creeps) {
	    if(Game.creeps[name]) {
			var creep = Game.creeps[name]

			// What is its role ?
			switch (creep.memory.role) {
				case 'harvester':
					roleHarvester.run(creep)
					break
				case 'upgrader':
					roleUpgrader.run(creep)
					break
				case 'builder':
					roleBuilder.run(creep)
					break
				case 'warrior':
					roleWarrior.run(creep)
					break
				default:
			}

			// Count the creep
			Memory.count[creep.memory.role] += 1

			creepsNumber += 1
	    } else {
			// Found dead
	        delete Memory.creeps[name];
		}
	}

	// Colony manager
	colonyManager.run()

	// Population management
	popManager.run()
}

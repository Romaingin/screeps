var utils = require("utils")
var fieldBuilder = require("field.builder")

// Set levels of colonization.
var colonyManager = {
	run: function () {
		if (true || !Memory.colony) {
			// Define the achievements unlocked throughout the levels
			Memory.colony = {
				level:  1,
				basicRoadmap: function () { return Memory.colony.level >= 2 },
			}
		}

		var mainRoomName = Game.spawns["ColonyCenter"].pos.roomName
		var mainRoom = Game.rooms[mainRoomName]
		var mainController = mainRoom.controller

		// > Level 1 :
		// 		Game just started, controller at level 1.
		//		Priority : Upgrade by produicing H and U.
		var LEVEL = 1
		if (mainController.level == 1) { Memory.colony.level = LEVEL }

		// > Level 2 :
		// 		Controller at level 2.
		//		Priority : Continue to produice H and U, as well as
		//		B to construct extensions. When finished, start to build
		//		roads between spawn and sources, controller and sources.
		LEVEL = 2
		if (mainController.level == 2) { Memory.colony.level = LEVEL }
		// Build a Field
		if (!mainRoom.memory.field) {
			// Find the perfect spot, it must exist (user input)
			let spawnPos = Game.spawns["ColonyCenter"].pos
			let x, y
			if (utils.isAreaClear(mainRoomName, spawnPos.x + 2, spawnPos.y - 3, 7, 7)) {
				fieldBuilder.run(mainRoom, spawnPos.x + 5, spawnPos.y)
				x = spawnPos.x + 5; y = spawnPos.y
			} else if (utils.isAreaClear(mainRoomName, spawnPos.x - 9, spawnPos.y - 3, 7, 7)) {
				fieldBuilder.run(mainRoom, spawnPos.x - 5, spawnPos.y)
				x = spawnPos.x - 5; y = spawnPos.y
			} else if (utils.isAreaClear(mainRoomName, spawnPos.x - 3, spawnPos.y + 2, 7, 7)) {
				fieldBuilder.run(mainRoom, spawnPos.x, spawnPos.y + 5)
				x = spawnPos.x; y = spawnPos.y + 5
			} else if (utils.isAreaClear(mainRoomName, spawnPos.x - 3, spawnPos.y - 9, 7, 7)) {
				fieldBuilder.run(mainRoom, spawnPos.x, spawnPos.y - 5)
				x = spawnPos.x; y = spawnPos.y - 5
			}

			mainRoom.memory.field = {x: x, y: y, state: 1}
		}

		// > Level 3 :
		// 		Controller at level 3.
		//		Priority : Continue to produice H, U, B and start produicing
		//		W to protect the colony.
		LEVEL = 3
		if (mainController.level == 3) { Memory.colony.level = LEVEL }
		// Upgrade the field
		fieldBuilder.update(mainRoom, mainRoom.memory.field)

		LEVEL = 4
		Memory.colony.level = LEVEL
	},

	populationCountReach: function () {
		switch (Memory.colony.level) {
			case 1:
				return {
					'harvester': 3,
					'upgrader': 4,
				}
			case 2:
				return {
					'harvester': 4,
					'upgrader': 6,
					'builder': 2,
				}
			case 3:
				return {
					'harvester': 6,
					'upgrader': 7,
					'builder': 3,
					'warrior': 3,
				}
			case 4:
				return {
					'harvester': 7,
					'upgrader': 8,
					'builder': 4,
					'warrior': 4,
				}
			default:
				return {}
		}
	}
}

module.exports = colonyManager

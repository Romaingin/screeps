function constructPath(start, end, room) {
	// Find the path (TODO refine)
	let res = PathFinder.search(
		start, end
	)

	// Add construction sites
	for (var c in res.path) {
		room.createConstructionSite(res.path[c].x, res.path[c].y, STRUCTURE_ROAD)
	}
}

var roadManager = {
	run: function (roomName) {
		// Memory management
		if (!Memory.roads) {
			Memory.roads = {}
		}
		if (!Memory.roads[roomName]) {
			Memory.roads[roomName] = {}
		}

		if (Memory.colony.basicRoadmap()) {
			roadManager.basicRoadmap(roomName)
		}
	},

	basicRoadmap: function (roomName) {
		room = Game.rooms[roomName]

		let sources = _.map(room.find(FIND_SOURCES), function(source) {
			return { pos: source.pos, range: 1 }
		})
		let spawns = _.map(room.find(FIND_MY_SPAWNS), function(spawn) {
			return spawn.pos
		})
		let controller = room.controller.pos

		// Bind spawn and controller to sources
		if (!Memory.roads[roomName].spawnToSources) {
			for (let sp in spawns) {
				for (let s in sources) {
					constructPath(spawns[sp], sources[s], room)
				}
			}
			Memory.roads[roomName].spawnToSources = true
		}

		// Bind controller to sources
		if (!Memory.roads[roomName].controllerToSources) {
			for (let s in sources) {
				constructPath(controller, sources[s], room)
			}
			Memory.roads[roomName].spawnToSources = true
		}

		// Circle the spawn
		if (!Memory.roads[roomName].spawnCircled) {
			for (let s in spawns) {
				let x = spawns[s].pos.x,
					y = spawns[s].pos.y

				for (var i = x-1; i <= x+1; i++) {
					for (var j = y-1; j <= y+1; j++) {
						room.createConstructionSite(i, j, STRUCTURE_ROAD)
					}
				}
			}
			Memory.roads[roomName].spawnCircled = true
		}

	}
}

module.exports = roadManager

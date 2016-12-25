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
	run: function () {
		roomName = Game.spawns["ColonyCenter"].pos.roomName

		// Memory management
		if (!Memory.roads) {
			Memory.roads = {}
		}
		if (!Memory.roads[roomName]) {
			Memory.roads[roomName] = {}
		}

		// Default room TODO
		room = Game.rooms[roomName]

		// Bind spawn to sources
		if (!Memory.roads[roomName].spawnToSources) {
			let sources = _.map(room.find(FIND_SOURCES), function(source) {
				return { pos: source.pos, range: 1 };
			});
			let start = Game.spawns["ColonyCenter"].pos

			for (let s in sources) {
				constructPath(start, sources[s], room)
			}
			Memory.roads[roomName].spawnToSources = true
		}
	}
}

module.exports = roadManager

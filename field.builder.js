var fieldBuilder = {
	run: function (room, centerX, centerY) {
		// The given coordinates are assumed to be good
		room.createConstructionSite(centerX, centerY, STRUCTURE_TOWER)
		for (var i = centerX - 1; i <= centerX + 1; i++) {
			room.createConstructionSite(i, centerY - 1, STRUCTURE_EXTENSION)
		}
		room.createConstructionSite(centerX - 1, centerY, STRUCTURE_EXTENSION)
		room.createConstructionSite(centerX + 1, centerY, STRUCTURE_EXTENSION)
	},

	update: function (room, field) {
		switch (field.state) {
			case 1:
				// Add 5 more extensions
				room.createConstructionSite(field.x - 1, field.y + 1, STRUCTURE_EXTENSION)
				room.createConstructionSite(field.x + 1, field.y + 1, STRUCTURE_EXTENSION)
				room.createConstructionSite(field.x + 1, field.y + 3, STRUCTURE_EXTENSION)
				room.createConstructionSite(field.x - 1, field.y - 3, STRUCTURE_EXTENSION)
				room.createConstructionSite(field.x + 1, field.y - 3, STRUCTURE_EXTENSION)
				// Add roads
				room.createConstructionSite(field.x - 1, field.y - 2, STRUCTURE_ROAD)
				room.createConstructionSite(field.x	   , field.y - 2, STRUCTURE_ROAD)
				room.createConstructionSite(field.x + 1, field.y - 2, STRUCTURE_ROAD)
				room.createConstructionSite(field.x - 1, field.y + 2, STRUCTURE_ROAD)
				room.createConstructionSite(field.x	   , field.y + 2, STRUCTURE_ROAD)
				room.createConstructionSite(field.x + 1, field.y + 2, STRUCTURE_ROAD)
				room.createConstructionSite(field.x    , field.y + 1, STRUCTURE_ROAD)
				field.state = 2;
				break
			case 2:
				// Add 5 more extensions
				room.createConstructionSite(field.x    , field.y - 3, STRUCTURE_EXTENSION)
				room.createConstructionSite(field.x    , field.y + 3, STRUCTURE_EXTENSION)
				room.createConstructionSite(field.x + 2, field.y - 1, STRUCTURE_EXTENSION)
				room.createConstructionSite(field.x + 2, field.y   , STRUCTURE_EXTENSION)
				room.createConstructionSite(field.x + 2, field.y + 1, STRUCTURE_EXTENSION)
				// Add roads
				// room.createConstructionSite(field.x - 1, field.y - 2, STRUCTURE_ROAD)
				// room.createConstructionSite(field.x - 1, field.y - 2, STRUCTURE_ROAD)
				// room.createConstructionSite(field.x - 1, field.y - 2, STRUCTURE_ROAD)
				break
			default:
		}
	}
}

module.exports = fieldBuilder

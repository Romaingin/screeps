var fieldBuilder = {
	run: function (room, centerX, centerY) {
		// The given coordinates are assumed to be good
		room.createConstructionSite(centerX, centerY, STRUCTURE_TOWER)
		for (var i = centerX - 1; i <= centerX + 1; i++) {
			for (var j = centerY - 1; j <= centerY; j++) {
				room.createConstructionSite(i, j, STRUCTURE_EXTENSION)
			}
		}
	},

	update: function (room, field) {
		switch (field.state) {
			case 1:
				// Add 5 more extensions
				for (var i = field.x - 1; i <= field.x + 1; i++) {
					room.createConstructionSite(i, field.y + 1, STRUCTURE_EXTENSION)
				}
				room.createConstructionSite(field.x - 1, field.y - 3, STRUCTURE_EXTENSION)
				room.createConstructionSite(field.x + 1, field.y - 3, STRUCTURE_EXTENSION)
				for (var i = centerX - 1; i <= centerX + 1; i++) {
					for (var j = centerY - 3; j <= centerY - 2; j++) {
						room.createConstructionSite(i, j, STRUCTURE_ROAD)
					}
				}
				field.state = 2;
				break;
			default:
		}
	}
}

module.exports = fieldBuilder

::mods_hookBaseClass("scenarios/world/starting_scenario", function(ss) {
	while(!("create" in ss)) ss = ss[ss.SuperName];
	local create = ss.create;

	::mods_override(ss, "create", function() {
		create();

		local imageString = getDescription();
		local imageStringStartIndex = imageString.find("[img]gfx/");

		if (imageStringStartIndex != null) {
			imageString = imageString.slice(imageStringStartIndex + "[img]gfx/".len());
			imageString = imageString.slice(0, imageString.find("[/img]"));
		} else {
			imageString = "ui/events/event_80.png";
		}

		::CDS.origins.push({ ID = getID(), Name = getName(), Image = imageString });
	});
});

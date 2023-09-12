::mods_hookBaseClass("scenarios/world/starting_scenario", function(ss) {
	while(!("create" in ss)) ss = ss[ss.SuperName];
	local create = ss.create;

	::mods_override(ss, "create", function() {
		create();

		local imageString = getDescription();
		imageString = imageString.slice(imageString.find("[img]gfx/") + "[img]gfx/".len());
		imageString = imageString.slice(0, imageString.find("[/img]"));

		::CDS.origins.push({
			ID = getID(),
			Name = getName(),
			Image = imageString
		});
	});
});

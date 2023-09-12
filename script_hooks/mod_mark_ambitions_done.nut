// This is a kinda depressing hack. I initially did this with mods_hookDescendants on ambition.nut,
// hooking into the `succeed` method and setting the completion flag there. Unfortunately, because
// oath_ambition.nut *also* inherits from ambition, my approach created a `succeed` method in
// oath_ambition, which meant when I hooked e.g. oath_of_endurance_ambition.nut, traversing up the
// super stack to find the `succeed` method stopped in oath_ambition. That worked for the purposes
// of setting the completed flag, as below, but it didn't call the actual `succeed` in the base
// ambition object, only in the oath_ambition (near as I can tell), and thus didn't do any of the
// normal ambition success things that need to happen for any of the oath_ambition subclasses (e.g.
// removing the oath trait).
//
// Because ambition_fulfilled_event is what actually calls `succeed` in the first place, what I have
// below works, but it's unfortunate that ambition couldn't be hooked directly as I feel that would
// be cleaner.

::mods_hookNewObject("events/events/special/ambition_fulfilled_event", function(afe) {
	foreach(screen in afe.m.Screens) {
		if (screen.ID == "A") {
			local start = screen.start;

			screen.start = function( _event ) {
				local active = World.Ambitions.getActiveAmbition();
				World.Statistics.getFlags().set(active.getID() + "_completed", World.getTime().Days);

				start(_event);
			}
		}
	}
});

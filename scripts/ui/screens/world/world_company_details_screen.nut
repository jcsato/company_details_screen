::CDS <- {
	origins = [
		// { ID = "scenario.early_access", Name = "A New Company", Image = "ui/events/event_80.png" }
	],
	ambitions = [
		{ ID = "", Title = ""}
		{ ID = "ambition.allied_civilians", Title = "Reached 'Friendly' relations with a civilian faction"}
		{ ID = "ambition.allied_nobles", Title = "Reached 'Allied' relations with a civilian faction"}
		{ ID = "ambition.armor", Title = "Obtained heavy armor"}
		{ ID = "ambition.battle_standard", Title = "Obtained a battle standard for the company"}
		{ ID = "ambition.cart", Title = "Improved the company cart"}
		{ ID = "ambition.contracts", Title = "Completed many contracts"}
		{ ID = "ambition.defeat_beasts", Title = "Defeated packs of roving beasts"}
		{ ID = "ambition.defeat_civilwar", Title = "Ended the war between noble houses"}
		{ ID = "ambition.defeat_goblin_location", Title = "Destroyed locations controlled by goblins"}
		{ ID = "ambition.defeat_greenskins", Title = "Defeated the Greenskin Invasion"}
		{ ID = "ambition.defeat_holywar", Title = "Ended the holy war between North and South"}
		{ ID = "ambition.defeat_kraken", Title = "Slew a Kraken"}
		{ ID = "ambition.defeat_mercenaries", Title = "Defeated another mercenary company in battle"}
		{ ID = "ambition.defeat_orc_location", Title = "Destroyed locations controlled by orcs"}
		{ ID = "ambition.defeat_undead", Title = "Ended the Undead Scourge"}
		{ ID = "ambition.defeat_undead_location", Title = "Destroyed locations beset by the undead"}
		{ ID = "ambition.discover_all_unique_locations", Title = "Discovered all legendary locations in the world"}
		{ ID = "ambition.discover_locations", Title = "Discovered many hidden locations in the world"}
		{ ID = "ambition.discover_unique_locations_ambition", Title = "Discovered multiple legendary locations in the world"}
		{ ID = "ambition.find_and_destroy_location", Title = "Discovered and destroyed a ruin or hostile camp"}
		{ ID = "ambition.fulfill_x_southern_contracts", Title = "Completed many contracts for the Southern City States"}
		{ ID = "ambition.hammer_mastery", Title = "Trained multiple men to master the hammer"}
		{ ID = "ambition.have_all_provisions", Title = "Obtained every type of provision for the men "}
		{ ID = "ambition.have_armor_upgrades", Title = "Upgraded the men's armor with attachments"}
		{ ID = "ambition.have_talent", Title = "Hired a rarely talented man"}
		{ ID = "ambition.have_y_crowns", Title = "Hoarded 10,000 crowns"}
		{ ID = "ambition.have_y_renown", Title = "Became known as 'Glorious' (2,750 renown)"}
		{ ID = "ambition.have_z_crowns", Title = "Hoarded 50,000 crowns"}
		{ ID = "ambition.have_z_renown", Title = "Became known as 'Invincible' (8,000 renown)"}
		{ ID = "ambition.hire_follower", Title = "Hired a follower for your retinue"}
		{ ID = "ambition.make_nobles_aware", Title = "Became known as 'Professional' (1,050 renown)"}
		{ ID = "ambition.named_item", Title = "Obtained a famed piece of equipment"}
		{ ID = "ambition.named_item_set", Title = "Obtained a full set of famed equipment"}
		{ ID = "ambition.raid_caravans", Title = "Raided trade and supply caravans along the road"}
		{ ID = "ambition.ranged_mastery", Title = "Trained multiple men to master the bow or crossbow"}
		{ ID = "ambition.roster_of_12", Title = "Hired a roster of 12 men"}
		{ ID = "ambition.roster_of_16", Title = "Hired a roster of 16 men"}
		{ ID = "ambition.roster_of_20", Title = "Hired a roster of 20 men"}
		{ ID = "ambition.sergeant", Title = "Promoted a man to be your Sergeant"}
		{ ID = "ambition.taxidermist", Title = "Crafted many items at the taxidermist"}
		{ ID = "ambition.trade", Title = "Bought and sold many trading goods"}
		{ ID = "ambition.visit_settlements", Title = "Visited every town and fortification in the known world"}
		{ ID = "ambition.wagon", Title = "Obtained a wagon for the company"}
		{ ID = "ambition.weapon_mastery", Title = "Trained multiple men to master their weapons"}
		{ ID = "ambition.win_against_x", Title = "Won a battle against 12 enemies"}
		{ ID = "ambition.win_against_y", Title = "Won a battle against 24 enemies"}
		{ ID = "ambition.win_x_arena_fights", Title = "Won multiple fights in the Southern arenas"}
	]
}

world_company_details_screen <- {
	m = {
		JSHandle = null,
		Visible = null,
		Animating = null,
		OnConnectedListener = null,
		OnDisconnectedListener = null,
		OnClosePressedListener = null
	}

	function isVisible() {
		return m.Visible != null && m.Visible == true;
	}

	function isAnimating() {
		if (m.Animating != null)
			return m.Animating == true;
		else
			return false;
	}

	function setOnConnectedListener( _listener ) {
		m.OnConnectedListener = _listener;
	}

	function setOnDisconnectedListener( _listener ) {
		m.OnDisconnectedListener = _listener;
	}

	function setOnClosePressedListener( _listener ) {
		m.OnClosePressedListener = _listener;
	}

	function clearEventListener() {
		m.OnConnectedListener = null;
		m.OnDisconnectedListener = null;
		m.OnClosePressedListener = null;
	}

	function create() {
		m.Visible = false;
		m.Animating = false;
		m.JSHandle = UI.connect("WorldCompanyDetailsScreen", this);
	}

	function destroy() {
		clearEventListener();
		m.JSHandle = UI.disconnect(m.JSHandle);
	}

	function show( _withSlideAnimation = false ) {
		if (m.JSHandle != null) {
			Tooltip.hide();
			m.JSHandle.asyncCall("show", convertOriginToUIData());
		}
	}

	function hide( _withSlideAnimation = false ) {
		if (m.JSHandle != null) {
			Tooltip.hide();
			m.JSHandle.asyncCall("hide", _withSlideAnimation);
		}
	}

	function onScreenConnected() {
		if (m.OnConnectedListener != null)
			m.OnConnectedListener();
	}

	function onScreenDisconnected() {
		if (m.OnDisconnectedListener != null)
			m.OnDisconnectedListener();
	}

	function onScreenShown() {
		m.Visible = true;
		m.Animating = false;
	}

	function onScreenHidden() {
		m.Visible = false;
		m.Animating = false;
	}

	function onScreenAnimating() {
		m.Animating = true;
	}

	function onClose() {
		if (m.OnClosePressedListener != null)
			m.OnClosePressedListener();
	}

	function convertOriginToUIData() {
		local origin = null;
		foreach (o in ::CDS.origins) {
			if (o.ID == World.Assets.getOrigin().getID()) {
				origin = o;
				break;
			}
		}

		if (origin == null) {
			origin = {
				Name = "Battle Brothers",
				Image = "ui/events/event_80.png"
			}
		}

		local ambitions = [];
		foreach (ambition in World.Ambitions.m.Ambitions) {
			if (ambition.isDone() && World.Statistics.getFlags().getAsInt(ambition.getID() + "_completed") != 0) {
				local completedAmbition = {
					Title = getAmbitionTitle(ambition),
					Completed = World.Statistics.getFlags().getAsInt(ambition.getID() + "_completed")
				}
				ambitions.push(completedAmbition);
			}
		}

		foreach (ambition in World.Ambitions.m.OathAmbitions) {
			if (ambition.isDone() && World.Statistics.getFlags().getAsInt(ambition.getID() + "_completed") != 0) {
				local completedAmbition = {
					Title = getAmbitionTitle(ambition) + " fulfilled",
					Completed = World.Statistics.getFlags().getAsInt(ambition.getID() + "_completed")
				}
				ambitions.push(completedAmbition);
			}
		}

		local result = {
			CompanyName = World.Assets.getName(),
			OriginName = origin.Name,
			OriginImage = origin.Image,
			Ambitions = ambitions
		}

		return result;
	}

	function getAmbitionTitle(ambition) {
		local title = "";

		foreach (a in ::CDS.ambitions) {
			if (a.ID == ambition.getID()) {
				title = a.Title;
				break;
			}
		}

		if (title == "") {
			local titleSansPrefix = ambition.getID().slice("ambition.".len());
			local titleAsArray = split(titleSansPrefix, "_")
			// apply() modifies in place vs map(), which returns  a new array (apparently). Also Squirrel has lambdas, who knew
			title = titleAsArray.map(@(word) word.slice(0, 1).toupper() + word.slice(1)).reduce(@(word1, word2) word1 + " " + word2);
		}

		return title;
	}
};

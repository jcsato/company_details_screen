::mods_registerMod("company_details_mod", 1.0, "Sato's Company Details Screen");

::mods_queue("company_details_mod", null, function() {
	::mods_registerCSS("screens/world/world_company_details_screen.css");
	::mods_registerJS("screens/world/world_company_details_screen.js");

	::mods_registerCSS("mod_cds_shim.css");
	::mods_registerJS("mod_cds_shim.js");

	::include("script_hooks/mod_add_origins");
	::include("script_hooks/mod_add_ui");
	::include("script_hooks/mod_mark_ambitions_done");
});

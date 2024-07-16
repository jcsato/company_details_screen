::mods_hookExactClass("states/world_state", function(ws) {
	ws.topbar_options_module_onCompanyDetailsButtonClicked <- function() {
		if (m.MenuStack.hasBacksteps() || m.EventScreen.isVisible() || m.EventScreen.isAnimating())
			return;

		setAutoPause(true);
		m.CustomZoom = World.getCamera().Zoom;
		World.getCamera().zoomTo(1.0, 4.0);
		Tooltip.hide();
		m.WorldScreen.hide();
		m.CompanyDetailsScreen.show();
		Cursor.setCursor(Const.UI.Cursor.Hand);
		m.MenuStack.push(function() {
				World.getCamera().zoomTo(m.CustomZoom, 4.0);
				m.CompanyDetailsScreen.hide();
				m.WorldScreen.show();
				Cursor.setCursor(Const.UI.Cursor.Hand);
				setAutoPause(false);
			}, function() { return !m.CompanyDetailsScreen.isAnimating(); }
		);
	}

	local onInitUI = ws.onInitUI;
	local onDestroyUI = ws.onDestroyUI;
	local helper_handleContextualKeyInput = ws.helper_handleContextualKeyInput;

	ws.onInitUI = function() {
		onInitUI();

        m.WorldScreen.getTopbarOptionsModule().setOnCompanyDetailsPressedListener(topbar_options_module_onCompanyDetailsButtonClicked.bindenv(this));
		m.CompanyDetailsScreen <- new("scripts/ui/screens/world/world_company_details_screen");
		m.CompanyDetailsScreen.setOnClosePressedListener(town_screen_main_dialog_module_onLeaveButtonClicked.bindenv(this));
	}

	ws.onDestroyUI = function() {
		onDestroyUI();

		m.CompanyDetailsScreen.destroy();
		m.CompanyDetailsScreen = null;
	}

	ws.helper_handleContextualKeyInput = function(_key) {
		if (isInLoadingScreen())
			return true;

		// 41 == Escape
		// 21 == K
		if (m.CompanyDetailsScreen != null && m.CompanyDetailsScreen.isVisible() && _key.getState() == 0) {
			switch(_key.getKey()) {
				case 41:
				case 21: {
					m.CompanyDetailsScreen.onClose();
					return;
				}
			}
		} else if (_key.getState() == 0) {
			switch(_key.getKey()) {
				case 21: {
					if (!m.MenuStack.hasBacksteps() && !m.EventScreen.isVisible() && !m.EventScreen.isAnimating())
						topbar_options_module_onCompanyDetailsButtonClicked();
					else if(m.CompanyDetailsScreen.isVisible())
						m.CompanyDetailsScreen.onClose();
					break;
				}
			}
		}

		helper_handleContextualKeyInput(_key);
	}
});

::mods_hookClass("ui/screens/tooltip/tooltip_events", function(te) {
	local general_queryUIElementTooltipData = te.general_queryUIElementTooltipData;

	te.general_queryUIElementTooltipData = function(_entityId, _elementId, _elementOwner) {
		switch(_elementId) {
			case "world-screen.topbar.options-module.CompanyDetailsButton": {
				return [
					{ id = 1, type = "title", text = "Company Details (K)" },
					{ id = 2, type = "description", text = "See company details such as name and origin." }
				];
			}
            case "world-screen.company-details.ColumnAmbition": {
                return [
                    { id = 1, type = "title", text = "Ambition" },
                    { id = 2, type = "description", text = "The ambition completed." }
                ];
            }
			case "world-screen.company-details.ColumnCompleted": {
                return [
                    { id = 1, type = "title", text = "Completion Date" },
                    { id = 2, type = "description", text = "The day on which the ambition was completed." }
                ];
            }
		}

		return general_queryUIElementTooltipData(_entityId, _elementId, _elementOwner);
	}
});

::mods_hookExactClass("ui/screens/world/modules/topbar/world_screen_topbar_options_module", function(wstom) {
	local clearEventListener = wstom.clearEventListener;

	wstom.m.OnCompanyDetailsPressedListener <- null;

	wstom.clearEventListener = function() {
		clearEventListener();

		m.OnCompanyDetailsPressedListener = null;
	}

	wstom.setOnCompanyDetailsPressedListener <- function(_listener) {
        m.OnCompanyDetailsPressedListener = _listener;
    }

	wstom.onCompanyDetailsButtonPressed <- function() {
        if (m.OnCompanyDetailsPressedListener != null)
            m.OnCompanyDetailsPressedListener();
    }
});

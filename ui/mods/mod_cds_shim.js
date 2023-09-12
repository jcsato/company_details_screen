"use strict";

// assets.js
Asset.ICON_COMPANY_DETAILS = 'ui/icons/company_details.png';

// screens.js
registerScreen("WorldCompanyDetailsScreen", new WorldCompanyDetailsScreen());

// tooltip_identifier.js
TooltipIdentifier.WorldScreen.Topbar.OptionsModule.CompanyDetailsButton = 'world-screen.topbar.options-module.CompanyDetailsButton';
TooltipIdentifier.WorldScreen.CompanyDetails =  {
    ColumnAmbition: 'world-screen.company-details.ColumnAmbition',
    ColumnCompleted: 'world-screen.company-details.ColumnCompleted'
};

// world_screen_topbar_options_module.js
WorldScreenTopbarOptionsModule.prototype.mCompanyDetailsButton = null;

var originalWorldScreenTopbarOptionsModuleCreateDIV = WorldScreenTopbarOptionsModule.prototype.createDIV;
WorldScreenTopbarOptionsModule.prototype.createDIV = function(_parentDiv) {
    originalWorldScreenTopbarOptionsModuleCreateDIV.call(this, _parentDiv)

    var self = this;

    var layout = $('<div class="l-company-details-button"/>');
    this.mContainer.append(layout);
    this.mCompanyDetailsButton = layout.createImageButton(Path.GFX + Asset.ICON_COMPANY_DETAILS, function() {
        self.notifyBackendCompanyDetailsButtonPressed();
    }, '', 6);
}

var originalWorldScreenTopbarOptionsModuleBindTooltips = WorldScreenTopbarOptionsModule.prototype.bindTooltips;
WorldScreenTopbarOptionsModule.prototype.bindTooltips = function() {
    this.mCompanyDetailsButton.bindTooltip({ contentType: 'ui-element', elementId: TooltipIdentifier.WorldScreen.Topbar.OptionsModule.CompanyDetailsButton });

    originalWorldScreenTopbarOptionsModuleBindTooltips.call(this);
}

var originalWorldScreenTopbarOptionsModuleUnbindTooltips = WorldScreenTopbarOptionsModule.prototype.unbindTooltips;
WorldScreenTopbarOptionsModule.prototype.unbindTooltips = function() {
    this.mCompanyDetailsButton.unbindTooltip();

    originalWorldScreenTopbarOptionsModuleUnbindTooltips.call(this);
}

WorldScreenTopbarOptionsModule.prototype.notifyBackendCompanyDetailsButtonPressed = function() {
	SQ.call(this.mSQHandle, 'onCompanyDetailsButtonPressed');
}

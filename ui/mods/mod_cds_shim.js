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

var originalCreateDIVCDS = WorldScreenTopbarOptionsModule.prototype.createDIV;
WorldScreenTopbarOptionsModule.prototype.createDIV = function(_parentDiv) {
    originalCreateDIVCDS.call(this, _parentDiv)

    var self = this;

    var parent = this.mQuitButton.parent();
    this.mCompanyDetailsButton = parent.createImageButton(Path.GFX + Asset.ICON_COMPANY_DETAILS, function() {
        self.notifyBackendCompanyDetailsButtonPressed();
    }, 'l-company-details-button l-image-button', 6);
    this.mQuitButton.before(this.mCompanyDetailsButton);
}

var originalBindTooltipsCDS = WorldScreenTopbarOptionsModule.prototype.bindTooltips;
WorldScreenTopbarOptionsModule.prototype.bindTooltips = function() {
    this.mCompanyDetailsButton.bindTooltip({ contentType: 'ui-element', elementId: TooltipIdentifier.WorldScreen.Topbar.OptionsModule.CompanyDetailsButton });

    originalBindTooltipsCDS.call(this);
}

var originalUnbindTooltipsCDS = WorldScreenTopbarOptionsModule.prototype.unbindTooltips;
WorldScreenTopbarOptionsModule.prototype.unbindTooltips = function() {
    this.mCompanyDetailsButton.unbindTooltip();

    originalUnbindTooltipsCDS.call(this);
}

WorldScreenTopbarOptionsModule.prototype.notifyBackendCompanyDetailsButtonPressed = function() {
	SQ.call(this.mSQHandle, 'onCompanyDetailsButtonPressed');
}

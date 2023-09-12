"use strict";

var WorldCompanyDetailsScreen = function(_parent) {
	this.mSQHandle = null;

	this.mContainer = null;
    this.mDialogContainer = null;
    this.mListContainer = null;
    this.mListScrollContainer = null;
    this.mOriginNameContainer = null;
    this.mOriginImageContainer = null;

    this.mCompanyName = null;
    this.mOriginName = null;
    this.mOriginImageSrc = null;

    this.mLeaveButton = null;

    this.mIsVisible = false;

    this.mSelectedEntry = null;
};

WorldCompanyDetailsScreen.prototype.isConnected = function() {
    return this.mSQHandle !== null;
};

WorldCompanyDetailsScreen.prototype.onConnection = function(_handle) {
	this.mSQHandle = _handle;
	this.register($('.root-screen'));
};

WorldCompanyDetailsScreen.prototype.onDisconnection = function() {
	this.mSQHandle = null;
	this.unregister();
};

WorldCompanyDetailsScreen.prototype.getModule = function(_name) {
	switch(_name) {
        default: return null;
	}
};

WorldCompanyDetailsScreen.prototype.getModules = function() {
	return [];
};

WorldCompanyDetailsScreen.prototype.createDIV = function(_parentDiv) {
    var self = this;

	// create: containers (init hidden!)
    this.mContainer = $('<div class="world-company-details-screen display-none opacity-none"/>');
    _parentDiv.append(this.mContainer);

    // create: containers (init hidden!)
    var dialogLayout = $('<div class="l-company-details-dialog-container"/>');
    this.mContainer.append(dialogLayout);
    this.mDialogContainer = dialogLayout.createDialog('Company Details', '', '', true, 'dialog-1024-768');

    this.mOriginImageContainer = $('<div class="row origin-image-container"/>')
    this.mDialogContainer.findDialogTabContainer().append(this.mOriginImageContainer);

    this.mOriginNameContainer = $('<div class="row origin-name-container"/>')
    this.mDialogContainer.findDialogTabContainer().append(this.mOriginNameContainer);

    // create tabs
    var tabButtonsContainer = $('<div class="l-tab-container"/>');
    this.mDialogContainer.findDialogTabContainer().append(tabButtonsContainer);

    // create content
    var content = this.mDialogContainer.findDialogContentContainer();

	// column headers
    var headers = $('<div class="table-header"/>');
    content.append(headers);

    this.mColumnAmbition = $('<div class="table-header-ambition title title-font-big font-bold font-color-title">Ambition</div>');
    headers.append(this.mColumnAmbition);

    this.mColumnCompleted = $('<div class="table-header-completed title title-font-big font-bold font-color-title">Day Completed</div>');
    headers.append(this.mColumnCompleted);

    // left column
    var column = $('<div class="column is-left"/>');
    content.append(column);
    var listContainerLayout = $('<div class="l-list-container"/>');
    column.append(listContainerLayout);
    this.mListContainer = listContainerLayout.createList(1.0/*8.85*/);
    this.mListScrollContainer = this.mListContainer.findListScrollContainer();

    // create footer button bar
    var footerButtonBar = $('<div class="l-button-bar"/>');
    this.mDialogContainer.findDialogFooterContainer().append(footerButtonBar);

    // create: buttons
    var layout = $('<div class="l-leave-button"/>');
    footerButtonBar.append(layout);
    this.mLeaveButton = layout.createTextButton("Close", function() {
        self.notifyBackendCloseButtonPressed();
    }, '', 1);

    this.mIsVisible = false;
};

WorldCompanyDetailsScreen.prototype.destroyDIV = function() {
	//mAssets.destroyDIV();

    this.mListScrollContainer.empty();
    this.mListScrollContainer = null;
    this.mOriginNameContainer.empty();
    this.mOriginNameContainer = null;
    this.mOriginImageContainer.empty();
    this.mOriginImageContainer = null;
    this.mListContainer.destroyList();
    this.mListContainer.remove();
    this.mListContainer = null;

    this.mCompanyName = null;
    this.mOriginName = null;
    this.mOriginImageSrc = null;

	this.mLeaveButton.remove();
    this.mLeaveButton = null;

    this.mDialogContainer.empty();
    this.mDialogContainer.remove();
    this.mDialogContainer = null;

    this.mContainer.empty();
    this.mContainer.remove();
    this.mContainer = null;
};

WorldCompanyDetailsScreen.prototype.addListEntry = function(_data) {
	var result = $('<div class="l-row"/>');
	this.mListScrollContainer.append(result);

	var ambition = $('<div class="ambition text-font-normal font-color-description">' + _data.Ambition + '</div>');
	result.append(ambition);

	var completed = $('<div class="completed text-font-normal font-color-description">' + _data.Completed + '</div>');
	result.append(completed);
};

WorldCompanyDetailsScreen.prototype.bindTooltips = function() {
	this.mColumnAmbition.bindTooltip({ contentType: 'ui-element', elementId: TooltipIdentifier.WorldScreen.CompanyDetails.ColumnAmbition });
	this.mColumnCompleted.bindTooltip({ contentType: 'ui-element', elementId: TooltipIdentifier.WorldScreen.CompanyDetails.ColumnCompleted });
};

WorldCompanyDetailsScreen.prototype.unbindTooltips = function() {
	this.mColumnAmbition.unbindTooltip();
	this.mColumnCompleted.unbindTooltip();
};


WorldCompanyDetailsScreen.prototype.create = function(_parentDiv) {
    this.createDIV(_parentDiv);
    this.bindTooltips();
};

WorldCompanyDetailsScreen.prototype.destroy = function() {
    this.unbindTooltips();
    this.destroyDIV();
};


WorldCompanyDetailsScreen.prototype.register = function(_parentDiv) {
    console.log('WorldCompanyDetailsScreen::REGISTER');

    if (this.mContainer !== null) {
        console.error('ERROR: Failed to register Company Details Screen. Reason: Already initialized.');
        return;
    }

    if (_parentDiv !== null && typeof(_parentDiv) == 'object') {
        this.create(_parentDiv);
    }
};

WorldCompanyDetailsScreen.prototype.unregister = function() {
    console.log('WorldCompanyDetailsScreen::UNREGISTER');

    if (this.mContainer === null) {
        console.error('ERROR: Failed to unregister Company Details Screen. Reason: Not initialized.');
        return;
    }

    this.destroy();
};

WorldCompanyDetailsScreen.prototype.isRegistered = function() {
    if (this.mContainer !== null) {
        return this.mContainer.parent().length !== 0;
    }

    return false;
};


WorldCompanyDetailsScreen.prototype.show = function(_data) {
    this.loadFromData(_data);

	if (!this.mIsVisible) {
		var self = this;

		var withAnimation = true;//(_data !== undefined && _data['withSlideAnimation'] !== null) ? _data['withSlideAnimation'] : true;
		if (withAnimation === true)
		{
			var offset = -(this.mContainer.parent().width() + this.mContainer.width());
			this.mContainer.css({ 'left': offset });
			this.mContainer.velocity("finish", true).velocity({ opacity: 1, left: '0', right: '0' }, {
				duration: Constants.SCREEN_SLIDE_IN_OUT_DELAY,
				easing: 'swing',
				begin: function() {
					$(this).removeClass('display-none').addClass('display-block');
					self.notifyBackendOnAnimating();
				},
				complete: function() {
					self.mIsVisible = true;
					self.notifyBackendOnShown();
				}
			});
		} else {
			this.mContainer.css({ opacity: 0 });
			this.mContainer.velocity("finish", true).velocity({ opacity: 1 }, {
				duration: Constants.SCREEN_FADE_IN_OUT_DELAY,
				easing: 'swing',
				begin: function() {
					$(this).removeClass('display-none').addClass('display-block');
					self.notifyBackendOnAnimating();
				},
				complete: function() {
					self.mIsVisible = true;
					self.notifyBackendOnShown();
				}
			});
		}
	}
};

WorldCompanyDetailsScreen.prototype.hide = function(_withSlideAnimation) {
    var self = this;

    var withAnimation = true;//(_withSlideAnimation !== undefined && _withSlideAnimation !== null) ? _withSlideAnimation : true;
    if (withAnimation === true) {
        var offset = -(self.mContainer.parent().width() + self.mContainer.width());
        self.mContainer.velocity("finish", true).velocity({ opacity: 0, left: offset },
		{
            duration: Constants.SCREEN_SLIDE_IN_OUT_DELAY,
            easing: 'swing',
            begin: function() {
                $(this).removeClass('is-center');
                self.notifyBackendOnAnimating();
            },
            complete: function() {
                self.mIsVisible = false;
                self.mOriginNameContainer.empty();
                self.mOriginImageContainer.empty();
                self.mListScrollContainer.empty();
                $(this).removeClass('display-block').addClass('display-none');
                self.notifyBackendOnHidden();
            }
        });
    } else {
        self.mContainer.velocity("finish", true).velocity({ opacity: 0 }, {
            duration: Constants.SCREEN_SLIDE_IN_OUT_DELAY,
            easing: 'swing',
            begin: function()
            {
                $(this).removeClass('is-center');
                self.notifyBackendOnAnimating();
            },
            complete: function()
            {
                self.mIsVisible = false;
                self.mOriginNameContainer.empty();
                self.mOriginImageContainer.empty();
                self.mListScrollContainer.empty();
                $(this).removeClass('display-block').addClass('display-none');
                self.notifyBackendOnHidden();
            }
        });
    }
};

WorldCompanyDetailsScreen.prototype.isVisible = function() {
    return this.mIsVisible;
};


WorldCompanyDetailsScreen.prototype.loadFromData = function(_data) {
    if (_data === undefined || _data === null) {
        return;
    }

    this.mCompanyName = _data.CompanyName;
    this.mOriginName = _data.OriginName;
    this.mOriginImageSrc = _data.OriginImage;

    this.mDialogContainer.findDialogSubTitle().text(this.mOriginName);

    this.mOriginNameContainer.empty();
    var originName = $('<div class="origin-name title title-font-big font-bold font-color-title">The ' + this.mCompanyName + '</div>');
    this.mOriginNameContainer.append(originName);

    this.mOriginImageContainer.empty();

    var originImage = $('<img />');
    originImage.attr('src', Path.GFX + this.mOriginImageSrc);
    this.mOriginImageContainer.append(originImage);

    this.mListScrollContainer.empty();
	for(var i = _data.Ambitions.length - 1; i >= 0; --i) {
		this.addListEntry(_data.Ambitions[i]);
    }
};

WorldCompanyDetailsScreen.prototype.addListEntry = function(ambition) {
	var result = $('<div class="l-row"/>');
	this.mListScrollContainer.append(result);

	var title = $('<div class="ambition text-font-normal font-color-description">' + ambition.Title + '</div>');
	result.append(title);

	var completed = $('<div class="completed text-font-normal font-color-description">' + ambition.Completed + '</div>');
	result.append(completed);
}

WorldCompanyDetailsScreen.prototype.notifyBackendOnConnected = function() {
	if (this.mSQHandle !== null) {
		SQ.call(this.mSQHandle, 'onScreenConnected');
	}
};

WorldCompanyDetailsScreen.prototype.notifyBackendOnDisconnected = function() {
	if (this.mSQHandle !== null) {
		SQ.call(this.mSQHandle, 'onScreenDisconnected');
	}
};

WorldCompanyDetailsScreen.prototype.notifyBackendOnShown = function() {
    if (this.mSQHandle !== null) {
        SQ.call(this.mSQHandle, 'onScreenShown');
    }
};

WorldCompanyDetailsScreen.prototype.notifyBackendOnHidden = function() {
    if (this.mSQHandle !== null) {
        SQ.call(this.mSQHandle, 'onScreenHidden');
    }
};

WorldCompanyDetailsScreen.prototype.notifyBackendOnAnimating = function() {
    if (this.mSQHandle !== null) {
        SQ.call(this.mSQHandle, 'onScreenAnimating');
    }
};

WorldCompanyDetailsScreen.prototype.notifyBackendCloseButtonPressed = function(_buttonID) {
    if (this.mSQHandle !== null) {
        SQ.call(this.mSQHandle, 'onClose', _buttonID);
    }
};

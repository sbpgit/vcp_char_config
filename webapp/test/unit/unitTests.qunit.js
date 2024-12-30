/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"demo/vcp_char_config/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});
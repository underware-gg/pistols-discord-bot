"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dojoConfig = void 0;
var manifest_json_1 = require("./manifest.json");
var core_1 = require("@dojoengine/core");
var dojoConfig = function () { return (0, core_1.createDojoConfig)({
    toriiUrl: process.env.TORII_URL,
    manifest: manifest_json_1.default,
}); };
exports.dojoConfig = dojoConfig;

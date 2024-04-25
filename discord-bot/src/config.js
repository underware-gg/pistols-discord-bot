"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLL_INTERVAL = exports.sdk = void 0;
var graphql_js_1 = require("./generated/graphql.js");
var graphql_request_1 = require("graphql-request");
var dojoConfig_js_1 = require("./dojoConfig.js");
exports.sdk = (0, graphql_js_1.getSdk)(new graphql_request_1.GraphQLClient((0, dojoConfig_js_1.dojoConfig)().toriiUrl + "/graphql"));
exports.POLL_INTERVAL = 3000;

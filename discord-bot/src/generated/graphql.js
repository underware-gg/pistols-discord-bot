"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.GetTransationsDocument = exports.GetChallengesDocument = exports.World__ModelOrderField = exports.WagerOrderField = exports.Src5ModelOrderField = exports.RoundOrderField = exports.PactOrderField = exports.OrderDirection = exports.InitializableModelOrderField = exports.Erc1155OperatorApprovalOrderField = exports.Erc1155MetaOrderField = exports.Erc1155BalanceOrderField = exports.Erc721TokenApprovalOrderField = exports.Erc721OwnerOrderField = exports.Erc721OperatorApprovalOrderField = exports.Erc721MetaOrderField = exports.Erc721BalanceOrderField = exports.Erc20MetadataModelOrderField = exports.Erc20MetaOrderField = exports.Erc20BridgeableModelOrderField = exports.Erc20BalanceOrderField = exports.Erc20BalanceModelOrderField = exports.Erc20AllowanceOrderField = exports.Erc20AllowanceModelOrderField = exports.DuelistOrderField = exports.ConfigOrderField = exports.CoinOrderField = exports.ChallengeOrderField = void 0;
var graphql_1 = require("graphql");
var graphql_tag_1 = require("graphql-tag");
var ChallengeOrderField;
(function (ChallengeOrderField) {
    ChallengeOrderField["DuelistA"] = "DUELIST_A";
    ChallengeOrderField["DuelistB"] = "DUELIST_B";
    ChallengeOrderField["DuelId"] = "DUEL_ID";
    ChallengeOrderField["Message"] = "MESSAGE";
    ChallengeOrderField["RoundNumber"] = "ROUND_NUMBER";
    ChallengeOrderField["State"] = "STATE";
    ChallengeOrderField["TimestampEnd"] = "TIMESTAMP_END";
    ChallengeOrderField["TimestampStart"] = "TIMESTAMP_START";
    ChallengeOrderField["Winner"] = "WINNER";
})(ChallengeOrderField || (exports.ChallengeOrderField = ChallengeOrderField = {}));
var CoinOrderField;
(function (CoinOrderField) {
    CoinOrderField["ContractAddress"] = "CONTRACT_ADDRESS";
    CoinOrderField["Description"] = "DESCRIPTION";
    CoinOrderField["Enabled"] = "ENABLED";
    CoinOrderField["FeeMin"] = "FEE_MIN";
    CoinOrderField["FeePct"] = "FEE_PCT";
    CoinOrderField["Key"] = "KEY";
})(CoinOrderField || (exports.CoinOrderField = CoinOrderField = {}));
var ConfigOrderField;
(function (ConfigOrderField) {
    ConfigOrderField["Initialized"] = "INITIALIZED";
    ConfigOrderField["Key"] = "KEY";
    ConfigOrderField["OwnerAddress"] = "OWNER_ADDRESS";
    ConfigOrderField["Paused"] = "PAUSED";
    ConfigOrderField["TreasuryAddress"] = "TREASURY_ADDRESS";
})(ConfigOrderField || (exports.ConfigOrderField = ConfigOrderField = {}));
var DuelistOrderField;
(function (DuelistOrderField) {
    DuelistOrderField["Address"] = "ADDRESS";
    DuelistOrderField["Honour"] = "HONOUR";
    DuelistOrderField["Name"] = "NAME";
    DuelistOrderField["ProfilePic"] = "PROFILE_PIC";
    DuelistOrderField["Timestamp"] = "TIMESTAMP";
    DuelistOrderField["TotalDraws"] = "TOTAL_DRAWS";
    DuelistOrderField["TotalDuels"] = "TOTAL_DUELS";
    DuelistOrderField["TotalHonour"] = "TOTAL_HONOUR";
    DuelistOrderField["TotalLosses"] = "TOTAL_LOSSES";
    DuelistOrderField["TotalWins"] = "TOTAL_WINS";
})(DuelistOrderField || (exports.DuelistOrderField = DuelistOrderField = {}));
var Erc20AllowanceModelOrderField;
(function (Erc20AllowanceModelOrderField) {
    Erc20AllowanceModelOrderField["Amount"] = "AMOUNT";
    Erc20AllowanceModelOrderField["Owner"] = "OWNER";
    Erc20AllowanceModelOrderField["Spender"] = "SPENDER";
    Erc20AllowanceModelOrderField["Token"] = "TOKEN";
})(Erc20AllowanceModelOrderField || (exports.Erc20AllowanceModelOrderField = Erc20AllowanceModelOrderField = {}));
var Erc20AllowanceOrderField;
(function (Erc20AllowanceOrderField) {
    Erc20AllowanceOrderField["Amount"] = "AMOUNT";
    Erc20AllowanceOrderField["Owner"] = "OWNER";
    Erc20AllowanceOrderField["Spender"] = "SPENDER";
    Erc20AllowanceOrderField["Token"] = "TOKEN";
})(Erc20AllowanceOrderField || (exports.Erc20AllowanceOrderField = Erc20AllowanceOrderField = {}));
var Erc20BalanceModelOrderField;
(function (Erc20BalanceModelOrderField) {
    Erc20BalanceModelOrderField["Account"] = "ACCOUNT";
    Erc20BalanceModelOrderField["Amount"] = "AMOUNT";
    Erc20BalanceModelOrderField["Token"] = "TOKEN";
})(Erc20BalanceModelOrderField || (exports.Erc20BalanceModelOrderField = Erc20BalanceModelOrderField = {}));
var Erc20BalanceOrderField;
(function (Erc20BalanceOrderField) {
    Erc20BalanceOrderField["Account"] = "ACCOUNT";
    Erc20BalanceOrderField["Amount"] = "AMOUNT";
    Erc20BalanceOrderField["Token"] = "TOKEN";
})(Erc20BalanceOrderField || (exports.Erc20BalanceOrderField = Erc20BalanceOrderField = {}));
var Erc20BridgeableModelOrderField;
(function (Erc20BridgeableModelOrderField) {
    Erc20BridgeableModelOrderField["L2BridgeAddress"] = "L2_BRIDGE_ADDRESS";
    Erc20BridgeableModelOrderField["Token"] = "TOKEN";
})(Erc20BridgeableModelOrderField || (exports.Erc20BridgeableModelOrderField = Erc20BridgeableModelOrderField = {}));
var Erc20MetaOrderField;
(function (Erc20MetaOrderField) {
    Erc20MetaOrderField["Name"] = "NAME";
    Erc20MetaOrderField["Symbol"] = "SYMBOL";
    Erc20MetaOrderField["Token"] = "TOKEN";
    Erc20MetaOrderField["TotalSupply"] = "TOTAL_SUPPLY";
})(Erc20MetaOrderField || (exports.Erc20MetaOrderField = Erc20MetaOrderField = {}));
var Erc20MetadataModelOrderField;
(function (Erc20MetadataModelOrderField) {
    Erc20MetadataModelOrderField["Decimals"] = "DECIMALS";
    Erc20MetadataModelOrderField["Name"] = "NAME";
    Erc20MetadataModelOrderField["Symbol"] = "SYMBOL";
    Erc20MetadataModelOrderField["Token"] = "TOKEN";
    Erc20MetadataModelOrderField["TotalSupply"] = "TOTAL_SUPPLY";
})(Erc20MetadataModelOrderField || (exports.Erc20MetadataModelOrderField = Erc20MetadataModelOrderField = {}));
var Erc721BalanceOrderField;
(function (Erc721BalanceOrderField) {
    Erc721BalanceOrderField["Account"] = "ACCOUNT";
    Erc721BalanceOrderField["Amount"] = "AMOUNT";
    Erc721BalanceOrderField["Token"] = "TOKEN";
})(Erc721BalanceOrderField || (exports.Erc721BalanceOrderField = Erc721BalanceOrderField = {}));
var Erc721MetaOrderField;
(function (Erc721MetaOrderField) {
    Erc721MetaOrderField["BaseUri"] = "BASE_URI";
    Erc721MetaOrderField["Name"] = "NAME";
    Erc721MetaOrderField["Symbol"] = "SYMBOL";
    Erc721MetaOrderField["Token"] = "TOKEN";
})(Erc721MetaOrderField || (exports.Erc721MetaOrderField = Erc721MetaOrderField = {}));
var Erc721OperatorApprovalOrderField;
(function (Erc721OperatorApprovalOrderField) {
    Erc721OperatorApprovalOrderField["Approved"] = "APPROVED";
    Erc721OperatorApprovalOrderField["Operator"] = "OPERATOR";
    Erc721OperatorApprovalOrderField["Owner"] = "OWNER";
    Erc721OperatorApprovalOrderField["Token"] = "TOKEN";
})(Erc721OperatorApprovalOrderField || (exports.Erc721OperatorApprovalOrderField = Erc721OperatorApprovalOrderField = {}));
var Erc721OwnerOrderField;
(function (Erc721OwnerOrderField) {
    Erc721OwnerOrderField["Address"] = "ADDRESS";
    Erc721OwnerOrderField["Token"] = "TOKEN";
    Erc721OwnerOrderField["TokenId"] = "TOKEN_ID";
})(Erc721OwnerOrderField || (exports.Erc721OwnerOrderField = Erc721OwnerOrderField = {}));
var Erc721TokenApprovalOrderField;
(function (Erc721TokenApprovalOrderField) {
    Erc721TokenApprovalOrderField["Address"] = "ADDRESS";
    Erc721TokenApprovalOrderField["Token"] = "TOKEN";
    Erc721TokenApprovalOrderField["TokenId"] = "TOKEN_ID";
})(Erc721TokenApprovalOrderField || (exports.Erc721TokenApprovalOrderField = Erc721TokenApprovalOrderField = {}));
var Erc1155BalanceOrderField;
(function (Erc1155BalanceOrderField) {
    Erc1155BalanceOrderField["Account"] = "ACCOUNT";
    Erc1155BalanceOrderField["Amount"] = "AMOUNT";
    Erc1155BalanceOrderField["Id"] = "ID";
    Erc1155BalanceOrderField["Token"] = "TOKEN";
})(Erc1155BalanceOrderField || (exports.Erc1155BalanceOrderField = Erc1155BalanceOrderField = {}));
var Erc1155MetaOrderField;
(function (Erc1155MetaOrderField) {
    Erc1155MetaOrderField["BaseUri"] = "BASE_URI";
    Erc1155MetaOrderField["Name"] = "NAME";
    Erc1155MetaOrderField["Symbol"] = "SYMBOL";
    Erc1155MetaOrderField["Token"] = "TOKEN";
})(Erc1155MetaOrderField || (exports.Erc1155MetaOrderField = Erc1155MetaOrderField = {}));
var Erc1155OperatorApprovalOrderField;
(function (Erc1155OperatorApprovalOrderField) {
    Erc1155OperatorApprovalOrderField["Approved"] = "APPROVED";
    Erc1155OperatorApprovalOrderField["Operator"] = "OPERATOR";
    Erc1155OperatorApprovalOrderField["Owner"] = "OWNER";
    Erc1155OperatorApprovalOrderField["Token"] = "TOKEN";
})(Erc1155OperatorApprovalOrderField || (exports.Erc1155OperatorApprovalOrderField = Erc1155OperatorApprovalOrderField = {}));
var InitializableModelOrderField;
(function (InitializableModelOrderField) {
    InitializableModelOrderField["Initialized"] = "INITIALIZED";
    InitializableModelOrderField["Token"] = "TOKEN";
})(InitializableModelOrderField || (exports.InitializableModelOrderField = InitializableModelOrderField = {}));
var OrderDirection;
(function (OrderDirection) {
    OrderDirection["Asc"] = "ASC";
    OrderDirection["Desc"] = "DESC";
})(OrderDirection || (exports.OrderDirection = OrderDirection = {}));
var PactOrderField;
(function (PactOrderField) {
    PactOrderField["DuelId"] = "DUEL_ID";
    PactOrderField["Pair"] = "PAIR";
})(PactOrderField || (exports.PactOrderField = PactOrderField = {}));
var RoundOrderField;
(function (RoundOrderField) {
    RoundOrderField["DuelId"] = "DUEL_ID";
    RoundOrderField["RoundNumber"] = "ROUND_NUMBER";
    RoundOrderField["ShotA"] = "SHOT_A";
    RoundOrderField["ShotB"] = "SHOT_B";
    RoundOrderField["State"] = "STATE";
})(RoundOrderField || (exports.RoundOrderField = RoundOrderField = {}));
var Src5ModelOrderField;
(function (Src5ModelOrderField) {
    Src5ModelOrderField["InterfaceId"] = "INTERFACE_ID";
    Src5ModelOrderField["Supports"] = "SUPPORTS";
    Src5ModelOrderField["Token"] = "TOKEN";
})(Src5ModelOrderField || (exports.Src5ModelOrderField = Src5ModelOrderField = {}));
var WagerOrderField;
(function (WagerOrderField) {
    WagerOrderField["Coin"] = "COIN";
    WagerOrderField["DuelId"] = "DUEL_ID";
    WagerOrderField["Fee"] = "FEE";
    WagerOrderField["Value"] = "VALUE";
})(WagerOrderField || (exports.WagerOrderField = WagerOrderField = {}));
var World__ModelOrderField;
(function (World__ModelOrderField) {
    World__ModelOrderField["ClassHash"] = "CLASS_HASH";
    World__ModelOrderField["Name"] = "NAME";
})(World__ModelOrderField || (exports.World__ModelOrderField = World__ModelOrderField = {}));
exports.GetChallengesDocument = (0, graphql_tag_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query getChallenges($state: u8!) {\n  challengeModels(where: {state: $state}) {\n    edges {\n      node {\n        duel_id\n        state\n      }\n    }\n  }\n}\n    "], ["\n    query getChallenges($state: u8!) {\n  challengeModels(where: {state: $state}) {\n    edges {\n      node {\n        duel_id\n        state\n      }\n    }\n  }\n}\n    "])));
exports.GetTransationsDocument = (0, graphql_tag_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query getTransations {\n  transactions {\n    edges {\n      node {\n        id\n        transactionHash\n        senderAddress\n        calldata\n      }\n    }\n    totalCount\n  }\n}\n    "], ["\n    query getTransations {\n  transactions {\n    edges {\n      node {\n        id\n        transactionHash\n        senderAddress\n        calldata\n      }\n    }\n    totalCount\n  }\n}\n    "])));
var defaultWrapper = function (action, _operationName, _operationType, _variables) { return action(); };
var GetChallengesDocumentString = (0, graphql_1.print)(exports.GetChallengesDocument);
var GetTransationsDocumentString = (0, graphql_1.print)(exports.GetTransationsDocument);
function getSdk(client, withWrapper) {
    if (withWrapper === void 0) { withWrapper = defaultWrapper; }
    return {
        getChallenges: function (variables, requestHeaders) {
            return withWrapper(function (wrappedRequestHeaders) { return client.rawRequest(GetChallengesDocumentString, variables, __assign(__assign({}, requestHeaders), wrappedRequestHeaders)); }, 'getChallenges', 'query', variables);
        },
        getTransations: function (variables, requestHeaders) {
            return withWrapper(function (wrappedRequestHeaders) { return client.rawRequest(GetTransationsDocumentString, variables, __assign(__assign({}, requestHeaders), wrappedRequestHeaders)); }, 'getTransations', 'query', variables);
        }
    };
}
exports.getSdk = getSdk;
var templateObject_1, templateObject_2;

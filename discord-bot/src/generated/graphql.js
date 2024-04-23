import { print } from "graphql";
import gql from "graphql-tag";
export var MovesOrderField;
(function (MovesOrderField) {
    MovesOrderField["LastDirection"] = "LAST_DIRECTION";
    MovesOrderField["Player"] = "PLAYER";
    MovesOrderField["Remaining"] = "REMAINING";
})(MovesOrderField || (MovesOrderField = {}));
export var OrderDirection;
(function (OrderDirection) {
    OrderDirection["Asc"] = "ASC";
    OrderDirection["Desc"] = "DESC";
})(OrderDirection || (OrderDirection = {}));
export var PositionOrderField;
(function (PositionOrderField) {
    PositionOrderField["Player"] = "PLAYER";
    PositionOrderField["Vec"] = "VEC";
})(PositionOrderField || (PositionOrderField = {}));
export var World__ModelOrderField;
(function (World__ModelOrderField) {
    World__ModelOrderField["ClassHash"] = "CLASS_HASH";
    World__ModelOrderField["Name"] = "NAME";
})(World__ModelOrderField || (World__ModelOrderField = {}));
export const GetMovesDocument = gql `
    query getMoves($player: ContractAddress!) {
        movesModels(where: { player: $player }) {
            edges {
                node {
                    player
                    remaining
                    last_direction
                }
            }
        }
    }
`;
export const GetTransationsDocument = gql `
    query getTransations {
        transactions {
            edges {
                node {
                    id
                    transactionHash
                    senderAddress
                    calldata
                }
            }
            totalCount
        }
    }
`;
const defaultWrapper = (action, _operationName, _operationType, variables) => action();
const GetMovesDocumentString = print(GetMovesDocument);
const GetTransationsDocumentString = print(GetTransationsDocument);
export function getSdk(client, withWrapper = defaultWrapper) {
    return {
        getMoves(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(GetMovesDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), "getMoves", "query", variables);
        },
        getTransations(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(GetTransationsDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), "getTransations", "query", variables);
        },
    };
}

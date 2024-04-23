export declare const sdk: {
    getMoves(variables: import("./generated/graphql.js").Exact<{
        player: any;
    }>, requestHeaders?: any): Promise<{
        data: import("./generated/graphql.js").GetMovesQuery;
        errors?: GraphQLError[] | undefined;
        extensions?: any;
        headers: Headers;
        status: number;
    }>;
    getTransations(variables?: import("./generated/graphql.js").Exact<{
        [key: string]: never;
    }> | undefined, requestHeaders?: any): Promise<{
        data: import("./generated/graphql.js").GetTransationsQuery;
        errors?: GraphQLError[] | undefined;
        extensions?: any;
        headers: Headers;
        status: number;
    }>;
};
export declare const POLL_INTERVAL = 3000;

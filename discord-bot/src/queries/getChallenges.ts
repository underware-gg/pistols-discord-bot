import { sdk } from "../config.js";
import { Challenge } from "../generated/graphql.js";

export const getChallenges = async (state: number): Promise<Challenge[]> => {
    let result: Challenge[] = []
    try {
        const { data } = await sdk.getChallenges({ state });
        if (data?.challengeModels?.edges) {
            result = data.challengeModels.edges.map((challenge: any) => {
                return challenge.node as Challenge;
            });
        }
    } catch (error) {
        console.error("getChallenges() fetching error:", error);
        throw error;
    }
    return result
};

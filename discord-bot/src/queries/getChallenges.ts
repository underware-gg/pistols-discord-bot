import { sdk } from "../config.js";

export const getChallenges = async (state: number) => {
    try {
        const { data } = await sdk.getChallenges({ state });
        const challenges = data?.challengeModels?.edges?.map((challenge: any, index: number) => {
            return challenge?.node;
        });
        return challenges;
    } catch (error) {
        console.error("getChallenges() fetching error:", error);
        throw error;
    }
};

import { Client, IAgentRuntime, elizaLogger } from "@elizaos/core";
import { StreamrElizaClient } from "./streamr-client";


export const StreamrClientInterface: Client = {
    name: "streamr",
    async start(runtime: IAgentRuntime) {
        const streamrClient = new StreamrElizaClient(runtime);
        await streamrClient.initialize();
        elizaLogger.success(
            `✅ Streamr client successfully started for character ${runtime.character.name}`
        );
        return streamrClient;
    }
};

export default StreamrClientInterface;

export { StreamrElizaClient } from './streamr-client';
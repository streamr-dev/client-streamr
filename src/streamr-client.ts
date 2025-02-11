import { elizaLogger, IAgentRuntime, type ClientInstance } from "@elizaos/core";
import { StreamrClient } from "@streamr/sdk";

export class StreamrElizaClient implements ClientInstance {
    private streamrClient: StreamrClient;
    private runtime: IAgentRuntime;

    private wallet: string;
    private streamId: string;
    private partitionId: number;

    constructor(runtime: IAgentRuntime) {
        elizaLogger.log("📱 Constructing new StreamrClient...");
        this.runtime = runtime;
        this.wallet = runtime.getSetting("STREAMR_WALLET");
        this.streamId = runtime.getSetting("STREAMR_STREAM_ID");
        const id = runtime.getSetting("STREAMR_STREAM_PARTITION_ID")
        this.partitionId = Number.parseInt(id);
        if (!this.wallet || !this.streamId || isNaN(this.partitionId)) {
            throw new Error("STREAMR configs are not set");
        }
    }

    async initialize() {
        elizaLogger.log("🚀 Starting StreamrClient...");
        try {
            this.streamrClient = new StreamrClient({
                auth: {
                    privateKey: this.wallet
                }
            })
        } catch (error) {
            elizaLogger.error("❌ Failed to start StreamrClient:", error);
            throw error;
        }
    }

    async subscribe(callback: (message: any) => void) {
        elizaLogger.log("Subscribing to Streamr", this.streamId, this.partitionId);
        try {
            return await this.streamrClient.subscribe(
                { id: this.streamId, partition: this.partitionId },
                callback
            );
        }
        catch (error) {
            elizaLogger.error("Error subscribing to Streamr", error);
            throw error;
        }
    }

    async publish(message: any) {
        elizaLogger.log("Publishing message to Streamr", message);
        try {
            return await this.streamrClient.publish({
                id: this.streamId,
                partition: this.partitionId
            }, message);
        } catch (error) {
            elizaLogger.error("Error publishing message to Streamr", error);
            throw error;
        }
    }

    async stop() {
        elizaLogger.log("Destroying StreamrClient");
        try {
            return await this.streamrClient.destroy();
        } catch (error) {
            elizaLogger.error("Error destroying StreamrClient", error);
            throw error;
        }
    }
}
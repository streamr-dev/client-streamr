// src/index.ts
import { elizaLogger as elizaLogger2 } from "@elizaos/core";

// src/streamr-client.ts
import { elizaLogger } from "@elizaos/core";
import { StreamrClient } from "@streamr/sdk";
var StreamrElizaClient = class {
  streamrClient;
  runtime;
  wallet;
  constructor(runtime) {
    elizaLogger.log("\u{1F4F1} Constructing new StreamrClient...");
    this.runtime = runtime;
    this.wallet = runtime.getSetting("STREAMR_WALLET");
    if (!this.wallet) {
      throw new Error("STREAMR configs are not set");
    }
  }
  async initialize() {
    elizaLogger.log("\u{1F680} Starting StreamrClient...");
    try {
      this.streamrClient = new StreamrClient({
        auth: {
          privateKey: this.wallet
        }
      });
    } catch (error) {
      elizaLogger.error("\u274C Failed to start StreamrClient:", error);
      throw error;
    }
  }
  async subscribe(streamId, partitionId, callback) {
    elizaLogger.log("Subscribing to Streamr", streamId, partitionId);
    try {
      return await this.streamrClient.subscribe(
        { id: streamId, partition: partitionId },
        callback
      );
    } catch (error) {
      elizaLogger.error("Error subscribing to Streamr", error);
      throw error;
    }
  }
  async publish(streamId, partitionId, message) {
    elizaLogger.log("Publishing message to Streamr", message);
    try {
      return await this.streamrClient.publish({
        id: streamId,
        partition: partitionId
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
};

// src/index.ts
var StreamrClientInterface = {
  name: "streamr",
  async start(runtime) {
    const streamrClient = new StreamrElizaClient(runtime);
    await streamrClient.initialize();
    elizaLogger2.success(
      `\u2705 Streamr client successfully started for character ${runtime.character.name}`
    );
    return streamrClient;
  }
};
var index_default = StreamrClientInterface;
export {
  StreamrClientInterface,
  StreamrElizaClient,
  index_default as default
};
//# sourceMappingURL=index.js.map
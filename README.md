# @elizaos-plugins/client-streamr Streamr Client for ElizaOS

The Streamr client provides ElizaOS with capabilities to connect to Streamr P2P network and publish and subscribe messages in real-time to the network.

**Key Features**
- Initialize Streamr client
- Publish messages to a Streamr stream
- Subscribe to a Streamr stream
- Handle incoming messages from a Streamr stream

## Installation
```bash
npm install @elizaos-plugins/client-streamr
```

## Configuration

Add Env parameters to your .env file:

```
STREAMR_WALLET=0x1234567890123456789012345678901234567890   //your wallet private key that has access to the stream
STREAMR_STREAM_ID=my-stream                                 //stream id you want to publish or subscribe to
STREAMR_STREAM_PARTITION_ID=0                               //your stream partition id that you want to connect to
```

## Usage

Add stream client to your plugins definition.

```typescript
import { StreamrElizaClient } from "@elizaos-plugins/client-streamr";

export const streamrPlugin: Plugin = {
    name: "my-awesome-plugin",
    description: "My Awesome Plugin",
    providers: [],
    evaluators: [],
    services: [],
    actions: [],
    clients: [StreamrElizaClient]
}
```











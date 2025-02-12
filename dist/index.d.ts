import { ClientInstance, IAgentRuntime, Client } from '@elizaos/core';
import * as _streamr_sdk from '@streamr/sdk';

declare class StreamrElizaClient implements ClientInstance {
    private streamrClient;
    private runtime;
    private wallet;
    constructor(runtime: IAgentRuntime);
    initialize(): Promise<void>;
    subscribe(streamId: string, partitionId: number, callback: (message: any) => void): Promise<_streamr_sdk.Subscription>;
    publish(streamId: string, partitionId: number, message: any): Promise<_streamr_sdk.Message>;
    stop(): Promise<void>;
}

declare const StreamrClientInterface: Client;

export { StreamrClientInterface, StreamrElizaClient, StreamrClientInterface as default };

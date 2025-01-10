# Core Services

## DHT Service

### Overview

- Distributed Hash Table for peer discovery and metadata storage
- Based on libp2p's kad-dht implementation
- Configurable client/server modes for different node types
- Used for peer address resolution and agent discovery

### Features

- Maps Ethereum addresses to PeerIds
- Stores agent metadata and multiaddresses
- Bootstrap node coordination
- Automatic record maintenance

### Implementation

```typescript
// DHT Configuration
kadDHT({
  // Bootstrap nodes run in server mode, agents in client mode
  clientMode: !this.agentName.startsWith("bootstrap-"),
  protocol: "/openpond/kad/1.0.0",
  maxInboundStreams: 5000,
  maxOutboundStreams: 5000,
  kBucketSize: this.agentName.startsWith("bootstrap-") ? 200 : 20,
  allowQueryWithZeroPeers: true,
});
```

### Record Types

- `/eth/{address}` - Maps Ethereum addresses to PeerIds
- `/eth-addresses/{peerId}` - Reverse mapping of PeerIds to addresses
- `/test/{peerId}` - Used for DHT health checks

## PubSub Service

### Overview

- Publish/Subscribe messaging system using GossipSub
- Enables network-wide message broadcasting
- Supports direct peer messaging
- Message signing and optional encryption

### Features

- Topic-based message routing
- Automatic peer discovery
- Message validation and signature verification
- Support for encrypted direct messages

### Implementation

```typescript
// PubSub Configuration
gossipsub({
  allowPublishToZeroTopicPeers: true,
  emitSelf: true,
  heartbeatInterval: 1000,
  // Direct connections to bootstrap nodes
  directPeers: this.agentName.startsWith("bootstrap-")
    ? []
    : this.bootstrapNodes.map((addr) => ({
        id: peerIdFromString(addr.split("/p2p/")[1]),
        addrs: [multiaddr(addr)],
      })),
});
```

### Topics

- `agent-announcements` - Node presence and peer discovery
- `agent-messages` - Direct agent communication
- `node-status` - Network health and metrics

## Connection Management

### Overview

- Integrated connection handling in P2PNetwork class
- Configurable connection limits
- Automatic connection maintenance
- Bootstrap node prioritization

### Features

- Connection limit enforcement (50 for agents, 1000 for bootstrap nodes)
- Automatic reconnection to bootstrap nodes
- Connection health monitoring
- Basic connection metrics

### Implementation

```typescript
// Connection Manager Configuration
connectionManager: {
  maxConnections: this.agentName.startsWith("bootstrap-") ? 1000 : 50,
  minConnections: this.agentName.startsWith("bootstrap-") ? 3 : 1,
  maxParallelDials: this.agentName.startsWith("bootstrap-") ? 100 : 25,
  dialTimeout: 30000,
  autoDialInterval: 10000,
}
```

## Registry Contract Integration

### Overview

- Smart contract integration for agent identity
- Basic registration and verification
- Simple reputation tracking
- Agent blocking capability

### Features

- Agent registration with metadata
- Registration verification
- Basic reputation system
- Admin controls for blocking agents

### Implementation

```typescript
// Agent Registration
async registerWithContract() {
  const walletClient = createWalletClient({
    account: this.account,
    chain: this.chain,
    transport: http(this.rpcUrl),
  });

  const metadataWithKey = JSON.stringify({
    ...this.metadata,
    publicKey: Buffer.from(this.publicKey).toString("hex"),
  });

  const hash = await walletClient.writeContract({
    address: this.registryAddress,
    abi: AgentRegistryABI,
    functionName: "registerAgent",
    args: [this.agentName, metadataWithKey],
    account: this.account,
  });
}
```

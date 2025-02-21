# DHT Implementation

## Overview

The OpenPond Network uses libp2p's Kademlia DHT implementation for peer discovery and metadata storage. The DHT provides a decentralized way to find peers and store network-wide information.

## Architecture

### Node Types

1. **Bootstrap Nodes**

   - Run in DHT server mode (`clientMode: false`)
   - Larger k-bucket size (200 peers)
   - Higher connection limits (1000 connections)
   - Stable, known addresses

2. **Agent Nodes**
   - Run in DHT client mode (`clientMode: true`)
   - Smaller k-bucket size (20 peers)
   - Limited connections (50 max)
   - Dynamic addressing

## Implementation Details

### DHT Configuration

```typescript
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

1. **Ethereum Address Mapping**

```typescript
const ethKey = `/eth/${address.toLowerCase()}`;
const record = {
  peerId,
  timestamp: Date.now(),
  agentId: ethAddr,
  agentName: this.agentName,
  multiaddrs: [addr],
};
await this.node.services.dht.put(
  key,
  new TextEncoder().encode(JSON.stringify(record))
);
```

2. **Health Check Records**

```typescript
const testKey = `/test/${this.node.peerId.toString()}`;
const testValue = new TextEncoder().encode(
  JSON.stringify({ timestamp: Date.now() })
);
await this.node.services.dht.put(testKey, testValue);
```

## Network Operations

### Bootstrap Process

```typescript
async startDiscovery() {
  if (this.agentName.startsWith("bootstrap-")) {
    // Bootstrap nodes connect to each other
    const otherBootstrapNodes = getBootstrapNodes()
      .filter(addr => !addr.includes(this.node.peerId.toString()));

    // Connect with retries
    for (const addr of otherBootstrapNodes) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await this.node.dial(multiaddr(addr));
          break;
        } catch (error) {
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
        }
      }
    }
  } else {
    // Regular nodes connect to bootstrap nodes
    for (const addr of this.bootstrapNodes) {
      try {
        await this.node.dial(multiaddr(addr));
      } catch (error) {
        continue;
      }
    }
  }
}
```

### Record Maintenance

```typescript
private async startDHTMaintenance() {
  // Publish presence immediately
  await this.publishToDHT();

  // Periodic maintenance
  setInterval(async () => {
    await this.publishToDHT();
    await this.updateDHTRecords();
  }, 60_000);
}
```

## DHT Operations

### Publishing Records

```typescript
private async publishToDHT() {
  const ethKey = `/eth/${this.account.address.toLowerCase()}`;
  const encodedKey = new TextEncoder().encode(ethKey);

  // Provide record to DHT
  for await (const result of this.node.services.dht.provide(encodedKey)) {
    if (result.type === "FINAL_PEER") {
      Logger.info("P2P", "Successfully provided presence to DHT");
    }
  }
}
```

### Retrieving Records

```typescript
public async getDHTRecords(): Promise<Record<string, any>> {
  const records: Record<string, any> = {};
  const peers = this.node.getPeers();

  // Use local peer mappings
  for (const [peerId, ethAddr] of this.knownPeerToEthMap.entries()) {
    records[ethAddr.toLowerCase()] = {
      peerId,
      timestamp: Date.now(),
      agentId: ethAddr,
      agentName: this.knownAgentNames.get(ethAddr.toLowerCase()) ||
                 `Agent ${ethAddr.slice(0, 6)}`,
    };
  }

  return records;
}
```

## Health Checks

### DHT Readiness Check

```typescript
private async waitForDHT(): Promise<void> {
  const maxAttempts = 10;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      // Check bootstrap connection
      const connectedPeers = this.node.getPeers();
      const connectedToBootstrap = this.bootstrapNodes.some(addr =>
        connectedPeers.some(peer => addr.includes(peer.toString()))
      );

      if (!connectedToBootstrap) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }

      // Test DHT functionality
      const testKey = `/test/${this.node.peerId.toString()}`;
      const testValue = new TextEncoder().encode(JSON.stringify({ timestamp: Date.now() }));

      await this.node.services.dht.put(testKey, testValue);
      const retrieved = await this.node.services.dht.get(testKey);

      if (retrieved instanceof Uint8Array) {
        return;
      }
    } catch (err) {
      if (i === maxAttempts - 1) {
        throw new Error("DHT not ready after maximum attempts");
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
```

## Error Handling

- DHT operations have timeouts:
  - Operation timeout: 30 seconds
  - Get timeout: 10 seconds
  - Put timeout: 20 seconds
- Failed operations are logged but don't crash the node
- Automatic retry mechanisms for critical operations

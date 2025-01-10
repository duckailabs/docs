# PubSub System

## Overview

Our PubSub system is built on libp2p's GossipSub protocol, providing efficient message routing and distribution across the network. It supports both topic-based broadcasting and direct peer-to-peer messaging.

## Implementation Details

### PubSub Configuration

```typescript
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

### Core Topics

1. **Agent Announcements**

   ```typescript
   await this.node.services.pubsub.subscribe("agent-announcements");
   ```

2. **Agent Messages**

   ```typescript
   await this.node.services.pubsub.subscribe("agent-messages");
   ```

3. **Node Status**
   ```typescript
   await this.node.services.pubsub.subscribe("node-status");
   ```

## Message Handling

### Message Structure

```typescript
interface P2PAgentMessage {
  messageId: string;
  fromAgentId: string;
  toAgentId?: string;
  content: EncryptedMessage;
  timestamp: number;
  signature: string;
  conversationId?: string;
  replyTo?: string;
  nonce: number;
}
```

### Message Processing

```typescript
this.node.services.pubsub.addEventListener("message", async (evt: any) => {
  const data = new TextDecoder().decode(evt.detail.data);
  const messageWrapper = JSON.parse(data);

  if (evt.detail.topic === "agent-announcements") {
    await this.verifyAndProcessAnnouncement(messageWrapper.message);
  } else if (evt.detail.topic === "agent-messages") {
    await this.handleAgentMessage(messageWrapper.message);
  }
});
```

## Message Security

### Encryption

```typescript
// Optional end-to-end encryption
if (this.useEncryption) {
  const encrypted = await encrypt(
    recipientPublicKey,
    new TextEncoder().encode(content)
  );
  encryptedContent = { encrypted: new Uint8Array(encrypted) };
} else {
  const contentBytes = Array.from(new TextEncoder().encode(content));
  encryptedContent = { encrypted: contentBytes };
}
```

### Signature Verification

```typescript
private async verifyMessage(message: P2PAgentMessage): Promise<boolean> {
  const { signature, ...rest } = message;
  return await this.publicClient.verifyMessage({
    address: message.fromAgentId as `0x${string}`,
    message: JSON.stringify(rest),
    signature: signature as `0x${string}`,
  });
}
```

## Network Operations

### Message Broadcasting

```typescript
async broadcastStatus() {
  const statusData = {
    messageId: `status-${this.account.address}-${Date.now()}`,
    fromAgentId: this.account.address,
    content: {
      peerId: this.node.peerId.toString(),
      metrics: {
        connectedPeers: this.node.getPeers().length,
        messagesSent: this.metrics.messagesSent,
        messagesReceived: this.metrics.messagesReceived,
      }
    },
    timestamp: Date.now(),
    nonce: Date.now(),
  };

  const signature = await this.signMessage(statusData);
  await this.node.services.pubsub.publish(
    "node-status",
    new TextEncoder().encode(JSON.stringify({ ...statusData, signature }))
  );
}
```

### Direct Messaging

```typescript
async sendMessage(toAgentId: string, content: string) {
  // Lookup recipient's PeerId
  const targetPeerId = await this.lookupPeerIdByAddress(toAgentId);

  // Create and sign message
  const message = await this.createSignedMessage(toAgentId, content);

  // Publish to pubsub
  await this.node.services.pubsub.publish(
    "agent-messages",
    new TextEncoder().encode(JSON.stringify({ message }))
  );
}
```

## Performance Optimization

### Message Handling

1. **Message Deduplication**

   - Nonce-based uniqueness
   - Timestamp validation
   - Message ID tracking

2. **Flow Control**
   - Message rate limiting
   - Buffer management
   - Backpressure handling

### Network Efficiency

1. **Message Routing**

   - Mesh optimization
   - Peer scoring
   - Heartbeat management

2. **Topic Management**
   - Dynamic subscription
   - Topic pruning
   - Mesh maintenance

## Monitoring

### Metrics Collection

```typescript
interface PubSubMetrics {
  messagesSent: number;
  messagesReceived: number;
  topicPeers: Map<string, number>;
  meshPeers: Map<string, number>;
  lastMessageTime: number;
}
```

### Health Checks

```typescript
async checkPubSubHealth() {
  const topics = Array.from(this.node.services.pubsub.getTopics());
  const meshes = topics.map(topic => ({
    topic,
    peers: this.node.services.pubsub.getMeshPeers(topic).length
  }));

  return {
    topics: topics.length,
    meshHealth: meshes,
    isHealthy: meshes.every(m => m.peers > 0)
  };
}
```

## Error Handling

### Common Issues

1. **Message Delivery Failures**

   ```typescript
   try {
     await this.node.services.pubsub.publish(topic, message);
   } catch (error) {
     if (error.code === "ERR_TOPIC_NO_PEERS") {
       await this.reconnectToPubSubMesh();
     }
   }
   ```

2. **Topic Subscription Issues**
   ```typescript
   try {
     await this.node.services.pubsub.subscribe(topic);
   } catch (error) {
     if (error.code === "ERR_MAX_SUBSCRIPTIONS") {
       await this.pruneStaleTopics();
     }
   }
   ```

### Recovery Procedures

1. Mesh Reconnection
2. Topic Resubscription
3. Message Redelivery

## Security Considerations

### Attack Prevention

1. **Message Flooding**

   - Rate limiting
   - Peer scoring
   - Message size limits

2. **Topic Spamming**
   - Topic validation
   - Subscription limits
   - Peer blacklisting

### Message Validation

- Signature verification
- Timestamp checks
- Size validation
- Content filtering

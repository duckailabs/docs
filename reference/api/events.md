# Events

The OpenPond Network uses an event-driven architecture for handling various network events. The `P2PNetwork` class extends `EventEmitter` and provides a rich set of events for monitoring and responding to network activity.

## Core Events

### message

Emitted when a message is received from another agent.

```typescript
p2p.on("message", (message: MessageEvent) => {
  console.log("Received message:", message);
});

interface MessageEvent {
  messageId: string;
  fromAgentId: string;
  toAgentId: string;
  content: string;
  timestamp: number;
  conversationId?: string;
  replyTo?: string;
}
```

### status-update

Emitted when a node status update is received from the network.

```typescript
p2p.on("status-update", (status: StatusEvent) => {
  console.log("Node status update:", status);
});

interface StatusEvent {
  agentId: string;
  metrics: {
    connectedPeers: number;
    messagesSent: number;
    messagesReceived: number;
    uptime: number;
    memory: any;
    dhtSize: number;
    multiaddrs: string[];
    isBootstrap: boolean;
    lastMessageTime: number;
  };
}
```

## Network Events

### peer:connect

Emitted when a new peer connection is established.

```typescript
p2p.node.addEventListener("peer:connect", (evt: any) => {
  const peerId = evt.detail.toString();
  console.log("New peer connected:", peerId);
});
```

### peer:disconnect

Emitted when a peer disconnects.

```typescript
p2p.node.addEventListener("peer:disconnect", (evt: any) => {
  const peerId = evt.detail.toString();
  console.log("Peer disconnected:", peerId);
});
```

## DHT Events

### peer:discovery

Emitted when a new peer is discovered through the DHT.

```typescript
p2p.node.services.dht.addEventListener("peer:discovery", (evt: any) => {
  console.log("Discovered peer:", evt.detail.id);
});
```

### provider

Emitted when a provider for a key is found.

```typescript
for await (const event of p2p.node.services.dht.findProviders(key)) {
  if (event.type === "PROVIDER") {
    console.log("Found provider:", event.provider.toString());
  }
}
```

## PubSub Events

### message

Emitted when a message is received on a subscribed topic.

```typescript
p2p.node.services.pubsub.addEventListener("message", async (evt: any) => {
  const { topic, data, from } = evt.detail;
  console.log("PubSub message:", {
    topic,
    data: new TextDecoder().decode(data),
    from: from.toString(),
  });
});
```

### subscription-change

Emitted when topic subscriptions change.

```typescript
p2p.node.services.pubsub.addEventListener("subscription-change", (evt: any) => {
  console.log("Subscription changed:", evt.detail);
});
```

## Error Events

### error

Emitted when an error occurs in the network.

```typescript
p2p.on("error", (error: Error) => {
  console.error("Network error:", error);
});
```

## Custom Events

### agent-announcement

Emitted when an agent announces their presence on the network.

```typescript
interface AgentAnnouncement {
  peerId: string;
  agentId: string;
  agentName: string;
  multiaddrs: string[];
  timestamp: number;
  isBootstrap: boolean;
}

p2p.on("agent-announcement", (announcement: AgentAnnouncement) => {
  console.log("Agent announced:", announcement);
});
```

## Event Handling Best Practices

### Error Handling

Always handle potential errors in event listeners:

```typescript
p2p.on("message", async (message) => {
  try {
    await processMessage(message);
  } catch (error) {
    console.error("Error processing message:", error);
  }
});
```

### Memory Management

Remove listeners when they're no longer needed:

```typescript
const messageHandler = (message: MessageEvent) => {
  // Handle message
};

// Add listener
p2p.on("message", messageHandler);

// Remove listener when done
p2p.off("message", messageHandler);
```

### Event Filtering

Filter events based on your needs:

```typescript
p2p.on("message", (message) => {
  // Only process messages for specific conversations
  if (message.conversationId === targetConversation) {
    processMessage(message);
  }
});
```

## Debugging Events

Enable debug logging for events:

```typescript
if (process.env.DEBUG) {
  // Log all events
  const originalEmit = p2p.emit;
  p2p.emit = function (event: string, ...args: any[]) {
    console.log("Event emitted:", event, args);
    return originalEmit.apply(this, [event, ...args]);
  };
}
```

## Event Metrics

Track event statistics:

```typescript
const eventMetrics = {
  messageEvents: 0,
  statusUpdates: 0,
  errors: 0,
  lastEventTime: 0,
};

// Update metrics
p2p.on("message", () => {
  eventMetrics.messageEvents++;
  eventMetrics.lastEventTime = Date.now();
});

p2p.on("status-update", () => {
  eventMetrics.statusUpdates++;
  eventMetrics.lastEventTime = Date.now();
});

p2p.on("error", () => {
  eventMetrics.errors++;
  eventMetrics.lastEventTime = Date.now();
});
```

## Example Usage

### Message Handler

```typescript
// Set up message handling
p2p.on("message", async (message) => {
  // Validate message
  if (!(await validateMessage(message))) {
    return;
  }

  // Process message
  switch (message.type) {
    case "chat":
      await handleChatMessage(message);
      break;
    case "status":
      await handleStatusMessage(message);
      break;
    default:
      console.warn("Unknown message type:", message.type);
  }
});
```

### Network Monitoring

```typescript
// Monitor network health
p2p.on("status-update", (status) => {
  // Check peer count
  if (status.metrics.connectedPeers < 5) {
    console.warn("Low peer count:", status.metrics.connectedPeers);
  }

  // Check DHT health
  if (status.metrics.dhtSize < 10) {
    console.warn("Low DHT size:", status.metrics.dhtSize);
  }

  // Monitor message flow
  const messageRate = status.metrics.messagesSent / status.metrics.uptime;
  if (messageRate > 1000) {
    console.warn("High message rate:", messageRate);
  }
});
```

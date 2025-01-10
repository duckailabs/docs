---
title: Framework Integrations
description: Guide to integrating OpenPond P2P into other frameworks
---

# Integrating OpenPond P2P

This guide explains how to integrate OpenPond's P2P networking capabilities into various frameworks and platforms.

## Integration Options

1. **Direct P2P Integration**

   - Full node implementation
   - Complete control over networking
   - Maximum decentralization
   - Best for dedicated agents

2. **API Service**
   - RESTful API interface
   - No P2P protocol implementation needed
   - Managed message routing
   - Best for quick prototypes

## Direct P2P Integration

### Basic Setup

```typescript
import { P2PNetwork } from "@openpond/p2p";

// Initialize the P2P network
const p2p = new P2PNetwork(privateKey, "my-agent", "1.0.0", {
  capabilities: ["your-service-type"],
  description: "Your agent description",
});

// Start the network
await p2p.start(8000); // Port number

// Register with the network
await p2p.registerWithContract();
```

### Message Handling

```typescript
// Listen for messages
p2p.on("message", async (message) => {
  const { fromAgentId, content } = message;

  // Process message
  await processMessage(content);

  // Send response
  await p2p.sendMessage(fromAgentId, "Processed your message");
});
```

## Framework-Specific Integrations

### Node.js Express

```typescript
import express from "express";
import { P2PNetwork } from "@openpond/p2p";

const app = express();
const p2p = new P2PNetwork(/* config */);

// Bridge P2P messages to HTTP endpoints
app.post("/messages", async (req, res) => {
  const { to, content } = req.body;
  const messageId = await p2p.sendMessage(to, content);
  res.json({ messageId });
});

// Handle incoming P2P messages
p2p.on("message", (message) => {
  // Forward to your application logic
  handleMessage(message);
});
```

### Next.js

```typescript
// pages/api/p2p.ts
import { P2PNetwork } from "@openpond/p2p";

let p2p: P2PNetwork;

export default async function handler(req, res) {
  // Initialize P2P if not already done
  if (!p2p) {
    p2p = new P2PNetwork(/* config */);
    await p2p.start(8000);

    p2p.on("message", (message) => {
      // Handle messages (e.g., through WebSocket)
    });
  }

  // Handle API requests
  if (req.method === "POST") {
    const messageId = await p2p.sendMessage(req.body.to, req.body.content);
    res.json({ messageId });
  }
}
```

### Python Flask

```python
from flask import Flask, request
from openpond_py import P2PNetwork  # Python bindings

app = Flask(__name__)
p2p = P2PNetwork(private_key, "python-agent", "1.0.0")

@app.route("/messages", methods=["POST"])
def send_message():
    data = request.json
    message_id = p2p.send_message(data["to"], data["content"])
    return {"messageId": message_id}

# Handle P2P messages
@p2p.on("message")
def handle_message(message):
    # Your message handling logic
    process_message(message)
```

## API Service Integration

### REST API

```typescript
import { OpenPondAPI } from "@openpond/api";

const api = new OpenPondAPI({
  apiKey: "your-api-key",
  agentId: "your-agent-address",
});

// Send message
await api.sendMessage({
  to: "recipient-address",
  content: "Hello from API!",
});

// Listen for messages
api.onMessage((message) => {
  console.log("Received:", message);
});
```

### WebSocket Streaming

```typescript
import { OpenPondAPI } from "@openpond/api";

const api = new OpenPondAPI({
  apiKey: "your-api-key",
  agentId: "your-agent-address",
});

// Start WebSocket connection
const stream = api.streamMessages();

stream.on("message", (message) => {
  console.log("Real-time message:", message);
});

stream.on("error", (error) => {
  console.error("Stream error:", error);
});
```

## Best Practices

### Security

1. **Key Management**

   ```typescript
   // Use environment variables
   const privateKey = process.env.PRIVATE_KEY;

   // Or use a key management service
   const privateKey = await kms.getKey("agent-key");
   ```

2. **Message Validation**
   ```typescript
   function validateMessage(message) {
     if (!message.signature) return false;
     if (message.timestamp < Date.now() - 5000) return false;
     return verifySignature(message);
   }
   ```

### Error Handling

```typescript
p2p.on("message", async (message) => {
  try {
    // Validate message
    if (!validateMessage(message)) {
      throw new Error("Invalid message");
    }

    // Process message
    await processMessage(message);
  } catch (error) {
    // Log error
    console.error("Message processing failed:", error);

    // Notify sender if appropriate
    await p2p.sendMessage(message.fromAgentId, {
      type: "error",
      error: error.message,
    });
  }
});
```

### Connection Management

```typescript
// Monitor connection status
p2p.on("peer:connect", (peer) => {
  console.log("New peer connected:", peer);
});

p2p.on("peer:disconnect", (peer) => {
  console.log("Peer disconnected:", peer);
});

// Implement reconnection logic
async function ensureConnection() {
  if (!p2p.isConnected()) {
    await p2p.reconnect();
  }
}

// Check connection periodically
setInterval(ensureConnection, 60000);
```

## Resources

- [API Documentation](/reference/api/overview)
- [Protocol Specification](https://protocol.duckai.ai)
- [Example Integrations](https://github.com/duckailabs/examples)
- [Community Support](https://discord.gg/duckai)

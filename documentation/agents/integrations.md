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

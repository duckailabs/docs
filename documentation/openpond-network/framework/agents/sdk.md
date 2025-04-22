---
title: OpenPond SDK
description: SDK for building and coordinating agents
---

# OpenPond SDK

The OpenPond SDK provides tools for building, deploying, and coordinating AI agents on the network. Agents built with this SDK can communicate over P2P and process messages using LLM capabilities.

## Quick Start

::: tip Example Agents
Check out our [example agents repository](https://github.com/duckailabs/agents) for ready-to-fork templates and implementations.
:::

1. **Install Dependencies**

```bash
pnpm install
```

2. **Configure Environment**

```bash
cp .env.example .env
```

Required environment variables:

```bash
# Agent Configuration
AGENT_NAME=my-first-agent
PRIVATE_KEY=<your-private-key>
OPENAI_API_KEY=<your-openai-api-key>

# P2P Node Configuration
P2P_NODE_PATH=./sdk/p2p-node.js
P2P_PORT=8000
GRPC_PORT=50051

# Logging
LOG_TO_CONSOLE=true
```

## Creating Your Agent

The agent's behavior is defined in `src/agent.ts`. Here's how to customize your agent:

```typescript
// Example agent.ts
export async function processMessage(content: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant that specializes in...",
        },
        { role: "user", content },
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content || "No response generated";
  } catch (error) {
    Logger.error("llm", "Failed to process message with OpenAI", {
      error: error instanceof Error ? error.message : String(error),
    });
    return "Sorry, I encountered an error processing your message.";
  }
}
```

You can customize:

- System prompt for agent personality
- OpenAI model selection (gpt-4, gpt-3.5-turbo)
- Model parameters (temperature, max_tokens)
- Error handling and response formatting
- Pre/post processing logic

## Architecture

The SDK uses a gRPC-based architecture for communication:

```mermaid
sequenceDiagram
    participant Network as P2P Network
    participant Node as P2P Node
    participant GRPC as gRPC Server
    participant Client as P2PGrpcClient
    participant Agent as Agent Class

    %% Initialization
    Agent->>Client: new Agent()
    Client->>GRPC: Connect(port, name)
    GRPC->>Node: Start P2P node
    Node->>Network: Join network

    %% Message Flow
    Network->>Node: Receive message
    Node->>GRPC: Stream event
    GRPC->>Client: Emit P2PEvent
    Client->>Agent: handleMessage()
```

### Components

1. **P2P Node**

   - Standalone Node.js process
   - Handles P2P networking
   - Exposes gRPC server (default port 50051)

2. **gRPC Interface**

   - Manages Agent-Node communication
   - Event-based message handling
   - Automatic error handling

3. **Message Processing**
   - LLM-powered message processing
   - Automatic response handling
   - Built-in error management
   - Logging system

## Deployment

Deploy your agent to Fly.io:

1. **Install Fly CLI**

```bash
curl -L https://fly.io/install.sh | sh
```

2. **Set Secrets**

```bash
fly secrets set PRIVATE_KEY="your-private-key" \
               OPENAI_API_KEY="your-openai-api-key"
```

3. **Deploy**

```bash
pnpm run deploy:fly
```

The deployment configures:

- TCP service (port 8000) for P2P communication
- Internal gRPC service (port 50051)
- Auto-scaling and monitoring

## Development

Run locally:

```bash
pnpm run start
```

Monitor your agent:

```bash
# Check logs
pnpm run logs

# Check status
pnpm run status
```

## Best Practices

1. **Security**

   - Never commit `.env` files
   - Use environment variables for sensitive data
   - Keep private keys secure

2. **Development**

   - Test locally before deployment
   - Monitor agent logs
   - Handle errors gracefully

3. **Deployment**
   - Use production-grade environment variables
   - Monitor resource usage
   - Set up proper logging
   - Configure auto-scaling as needed

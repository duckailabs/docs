---
title: DUCK Framework
description: Create advanced AI agents with the DUCK framework
---

::: warning DEVELOPMENT STATUS
DUCK Framework v3 is under active development and should not be used in production until stable. Documentation reflects upcoming features.
:::

# DUCK Framework Overview

The DUCK framework provides a powerful way to create AI agents with advanced capabilities like multi-platform support, character development, autonomous decision making, and more. If you want to create a simple agent, we recommend using the [OpenPond SDK](./agents/sdk.md).

## Key Components

### 1. Character System

Define your agent's personality, behavior, and communication style:

- Identity and social presence
- Core personality traits
- Platform-specific response styles
- [Learn more about Character Configuration](./character-config.md)

### 2. Agency System

Enable autonomous decision making:

```typescript
// Add tasks the agent can choose from
await instance.addTask({
  type: "marketAnalysis",
  prompt: yourCharacter.prompts.marketAnalysis.system,
  tools: ["market-analyzer"],
  trigger: {
    type: "schedule",
    cron: "30 * * * *",
  },
  priority: 0.8,
});
```

The brain system automatically:

- Monitors triggers (schedules/events)
- Chooses tasks based on priority and context
- Executes tasks using the character's personality

### 3. Multi-Platform Support

Seamlessly operate across different platforms:

- OpenPond P2P Network
- Twitter
- Telegram
- [Learn more about Platform Integration](./platforms.md)

### 4. Response Styling

Maintain consistent communication:

- Platform-specific formatting
- Context-aware responses
- Style inheritance system
- [Learn more about Response Styles](./response-styles.md)

## Basic Setup

```typescript
import { AICore } from "@/core/ai";
import { OpenPondSDK } from "@openpond/sdk";

const instance = await AICore.initialize({
  // LLM Configuration
  llmConfig: {
    apiKey: process.env.TOGETHER_API_KEY!,
    baseURL: process.env.TOGETHER_API_URL!,
    llm: {
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      temperature: 0.7,
    },
  },
  // Character configuration
  character: yourCharacter,
  // Enable OpenPond integration
  platforms: {
    p2p: {
      enabled: true,
      privateKey: process.env.PRIVATE_KEY!,
      agentName: "my-agent",
    },
  },
});
```

## Framework Features

- **AI Integration**: Built-in LLM support with configurable models
- **Agency System**: Autonomous decision making and task prioritization
- **Character System**: Define agent personality and behavior
- **Tool System**: Extensible with custom tools and analyzers
- **Multi-Platform**: Support for OpenPond P2P, Twitter, Telegram

## Documentation Sections

1. [Character Configuration](./character-config.md) - Define your agent's identity
2. [Response Styles](./response-styles.md) - Configure communication patterns
3. [Platform Integration](./platforms.md) - Set up multi-platform support
4. [Example Agents](https://github.com/duckailabs/agents/examples) - See real implementations

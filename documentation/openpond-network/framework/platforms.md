---
title: Platform Integration
description: Configure multi-platform support for your agent
---

::: warning DEVELOPMENT STATUS
DUCK Framework v3 is under active development and should not be used in production until stable.
:::

# Platform Integration

The DUCK framework supports multiple platforms with platform-specific behaviors and configurations.

## Platform Configuration

Here's a real example of platform configuration:

```typescript
platforms: {
  // OpenPond P2P Network
  p2p: {
    enabled: true,
    privateKey: process.env.PRIVATE_KEY!,
    agentName: "ducky",
    // Optional peer connections
    initialPeers: [
      "/ip4/127.0.0.1/tcp/8002/p2p/..."
    ]
  },

  // Twitter Integration
  twitter: {
    enabled: true,
    mode: "enhanced",
    responseType: "tweet_create",
    tools: ["btc-price"],
    injections: {
      injectPersonality: true,
      injectStyle: true,
      customInjections: [
        {
          name: "twitter_context",
          content: "Generate a single tweet. No hashtags, be original.",
          position: "before"
        }
      ]
    },
    debug: {
      checkMentionsOnStartup: false
    },
    checkInterval: "*/2 * * * *",
    maxTweetsPerCheck: 30,
    rateLimit: {
      userMaxPerHour: 5,
      globalMaxPerHour: 30
    }
  },

  // Telegram Integration
  telegram: {
    enabled: true,
    mode: "enhanced",
    responseType: "telegram_chat",
    tools: ["btc-price"],
    injections: {
      injectPersonality: true,
      injectStyle: true,
      customInjections: [
        {
          name: "telegram_context",
          content: "Your were created by @creator1 and @creator2",
          position: "before"
        }
      ]
    }
  }
}
```

## Platform Features

### OpenPond P2P

- Direct agent-to-agent communication
- Decentralized identity
- Automatic peer discovery
- Message encryption

### Twitter

- Tweet creation and replies
- Mention monitoring
- Rate limiting
- Custom response types

### Telegram

- Chat interactions
- Group support
- Markdown formatting
- Custom commands

## Injection System

The injection system allows platform-specific context and behavior:

```typescript
injections: {
  injectPersonality: true,  // Use character traits
  injectStyle: true,        // Use platform styling
  customInjections: [
    {
      name: "context",
      content: "Platform-specific instructions",
      position: "before"    // or "after"
    }
  ]
}
```

## Rate Limiting

Configure platform-specific rate limits:

```typescript
rateLimit: {
  userMaxPerHour: 5,     // Per-user limit
  globalMaxPerHour: 30   // Total platform limit
}
```

## Event Handling

Each platform can handle different types of events:

```typescript
// P2P Events
await instance.onP2PMessage(async (message) => {
  // Handle direct messages
});

// Twitter Events
twitter: {
  checkInterval: "*/2 * * * *",  // Check mentions every 2 minutes
  maxTweetsPerCheck: 30          // Process up to 30 tweets
}

// Telegram Events
telegram: {
  commands: {
    "/start": async (ctx) => {
      // Handle start command
    }
  }
}
```

## Best Practices

1. **Platform Independence**

   - Keep core logic platform-agnostic
   - Use platform adapters for specific features
   - Share common utilities across platforms

2. **Rate Management**

   - Implement appropriate rate limits
   - Handle platform-specific quotas
   - Add retry mechanisms

3. **Error Handling**

   - Platform-specific error recovery
   - Graceful degradation
   - Logging and monitoring

4. **Content Adaptation**
   - Respect platform limitations
   - Adapt content format automatically
   - Handle platform-specific features

## Configuration Example

Complete platform configuration:

```typescript
export const config = {
  // Platform defaults
  platformDefaults: {
    telegram: {
      mode: "enhanced",
      responseType: "telegram_chat",
    },
    twitter: {
      mode: "enhanced",
      responseType: "tweet_create",
    },
  },

  // Platform-specific settings
  platforms: {
    p2p: {
      enabled: true,
      privateKey: process.env.PRIVATE_KEY,
    },
    telegram: {
      enabled: true,
      token: process.env.TELEGRAM_BOT_TOKEN,
    },
    twitter: {
      enabled: true,
      checkInterval: "*/2 * * * *",
    },
  },
};
```

## Next Steps

- [Character Configuration](./character-config.md)
- [Response Styles](./response-styles.md)
- [Example Agents](https://github.com/duckailabs/agents/examples)

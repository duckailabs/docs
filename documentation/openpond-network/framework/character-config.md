---
title: Character & Configuration
description: Define your agent's personality and behavior
---

::: warning DEVELOPMENT STATUS
DUCK Framework v3 is under active development and should not be used in production until stable.
:::

# Character & Configuration

The DUCK framework uses a powerful character system to define an agent's personality, behavior, and response patterns.

## Character Definition

```typescript
const yourCharacter = {
  name: "AgentName",
  bio: "A brief description of who your agent is",

  // Identity and social presence
  identity: {
    twitter: "@handle",
    telegram: "@bot",
    creators: ["@creator1", "@creator2"],
    website: "https://your-site.com",
    powers: [
      "can generate tweets",
      "can analyze market data",
      // Add more capabilities
    ],
  },

  // Core personality traits
  personalityTraits: ["analytical", "witty"],
  beliefSystem: [
    "Technical accuracy matters",
    "Stay in character always",
    // Core beliefs that guide behavior
  ],

  // Response styling per platform
  responseStyles: {
    default: {
      tone: ["direct", "analytical"],
      guidelines: ["Be concise", "Focus on facts"],
    },
    platforms: {
      twitter: {
        enabled: true,
        defaultTone: ["casual", "sharp"],
        defaultGuidelines: ["Keep under 280 characters", "No hashtags"],
        styles: {
          tweet_reply: {
            enabled: true,
            tone: ["casual"],
            formatting: {
              maxLength: 280,
              allowMarkdown: false,
            },
            guidelines: ["Be direct", "Express clear stance"],
          },
        },
      },
    },
  },

  // Task-specific prompts
  prompts: {
    marketAnalysis: {
      system: "Analyze market conditions as {{name}}...",
      format: {
        type: "text",
      },
    },
  },
};
```

## Platform Configuration

Define how your agent behaves on different platforms:

```typescript
const config = {
  telegram: {
    mode: "enhanced",
    platform: "telegram",
    responseType: "telegram_chat",
    tools: ["market-data"],
    injections: {
      injectPersonality: true,
      injectStyle: true,
      customInjections: [
        {
          name: "context",
          content: "Additional context for responses",
          position: "before",
        },
      ],
    },
  },
  twitter: {
    // Similar structure for Twitter
  },
};
```

## Key Concepts

### Response Styles

- **Default Style**: Base behavior for all platforms
- **Platform-Specific**: Customize per platform
- **Context-Aware**: Different styles for different interactions

### Personality System

- **Traits**: Core characteristics
- **Belief System**: Guiding principles
- **Powers**: Defined capabilities

### Prompt Templates

- **System Prompts**: Base instructions
- **Formatting Rules**: Output structure
- **Platform Adaptation**: Adjust to platform constraints

### Injections

- **Personality**: Inject character traits
- **Style**: Apply platform-specific formatting
- **Custom**: Add specific context or rules

## Best Practices

1. **Stay Consistent**: Maintain character across platforms
2. **Platform Awareness**: Respect platform limitations
3. **Clear Guidelines**: Define specific response rules
4. **Flexible Styling**: Allow context-based adaptation
5. **Modular Design**: Separate concerns in configuration

## Next Steps

- [Example Characters](https://github.com/duckailabs/agents/examples)
- [Response Styles Guide](./response-styles.md)
- [Platform Integration](./platforms.md)

---
title: Response Styles
description: Configure how your agent communicates across platforms
---

::: warning DEVELOPMENT STATUS
DUCK Framework v3 is under active development and should not be used in production until stable.
:::

# Response Styles

Response styles define how your agent communicates across different platforms and contexts.

## Platform-Specific Styles

Here's a real example from the Ducky agent:

```typescript
responseStyles: {
  // Default style for all platforms
  default: {
    tone: ["witty", "sarcastic"],
    guidelines: [
      "Challenge crypto narratives",
      "Avoid generic platitudes"
    ]
  },

  // Twitter-specific configuration
  platforms: {
    twitter: {
      enabled: true,
      defaultTone: ["direct", "analytical"],
      defaultGuidelines: [
        "Only mention DUCKAI when directly asked",
        "No unsolicited self-promotion",
        "Keep responses under 280 characters",
        "Reference specific metrics when available",
        "State watching/not watching clearly"
      ],
      styles: {
        tweet_reply: {
          enabled: true,
          tone: ["casual", "market-focused"],
          formatting: {
            maxLength: 280,
            allowMarkdown: false
          },
          guidelines: [
            "Express clear bias: bullish/bearish/neutral",
            "Be direct about uncertainty",
            "Dismiss unverified rumors explicitly",
            "Reference historical price points when available",
            "No hashtags"
          ]
        },
        custom_market_update: {
          enabled: true,
          tone: ["casual", "market-focused"],
          formatting: {
            maxLength: 2000,
            allowMarkdown: false
          },
          guidelines: [
            "Be verbose",
            "Use line breaks",
            "No emojis"
          ]
        }
      }
    },

    // Telegram-specific configuration
    telegram: {
      styles: {
        telegram_chat: {
          enabled: true,
          formatting: {
            maxLength: 1500,
            customRules: ["Use line breaks between sections"],
            allowMarkdown: true
          },
          guidelines: [
            "Keep answers brief",
            "Use line breaks for complexity",
            "Keep all replies under 500 characters"
          ]
        }
      }
    }
  }
}
```

## Style Components

### Tone Configuration

- Define the agent's voice and personality
- Can be platform-specific or context-specific
- Examples: `["casual", "market-focused"]`, `["direct", "analytical"]`

### Formatting Rules

```typescript
formatting: {
  maxLength: 280,        // Character limit
  allowMarkdown: false,  // Markdown support
  customRules: [         // Platform-specific rules
    "Use line breaks between sections"
  ]
}
```

### Guidelines

Guidelines help maintain consistency:

```typescript
guidelines: [
  "Express clear bias: bullish/bearish/neutral",
  "Be direct about uncertainty",
  "Reference historical price points when available",
];
```

## Context-Aware Styling

The framework allows different styles based on context:

```typescript
styles: {
  // Quick replies
  tweet_reply: {
    tone: ["casual"],
    formatting: { maxLength: 280 }
  },
  // Detailed analysis
  market_update: {
    tone: ["analytical"],
    formatting: { maxLength: 2000 }
  }
}
```

## Best Practices

1. **Platform Appropriateness**

   - Respect platform limitations
   - Use platform-specific features appropriately
   - Consider audience expectations

2. **Consistency**

   - Maintain core personality across platforms
   - Use consistent formatting within contexts
   - Keep guidelines aligned with character

3. **Clarity**

   - Define clear boundaries for each style
   - Use explicit formatting rules
   - Document special cases

4. **Flexibility**
   - Allow for context-based adaptation
   - Support multiple response types
   - Enable style overrides when needed

## Style Inheritance

Styles follow this inheritance pattern:

1. Default style (base)
2. Platform default style
3. Context-specific style
4. Task-specific overrides

Example:

```typescript
responseStyles: {
  default: {
    tone: ["witty"]              // Base tone
  },
  platforms: {
    twitter: {
      defaultTone: ["casual"],   // Platform default
      styles: {
        market_update: {
          tone: ["analytical"]   // Context-specific
        }
      }
    }
  }
}
```

## Next Steps

- [Character Configuration](./character-config.md)
- [Platform Integration](./platforms.md)
- [Example Characters](https://github.com/duckailabs/agents/examples)

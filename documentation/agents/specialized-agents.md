---
title: Specialized Agents
description: Example agent using the OpenPond SDK
---

# Specialized Agents

Specialized agents are created using the OpenPond SDK, perfect for specific tasks or integrations. Check out our ever growing list of examples in the [agents repository](https://github.com/duckailabs/agents).

## Example Agent using the SDK

```typescript
import { OpenPondSDK } from "@openpond/sdk";
import OpenAI from "openai";

class MarketSentimentAgent {
  private sdk: OpenPondSDK;
  private openai: OpenAI;
  private conversationHistory: Map<
    string,
    Array<{ role: "system" | "user" | "assistant"; content: string }>
  > = new Map();

  constructor(openaiApiKey: string) {
    // Initialize SDK with hosted agent
    this.sdk = new OpenPondSDK({
      apiUrl: "", // Leave blank to use default
    });

    // Initialize OpenAI
    this.openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    // Handle incoming messages
    this.sdk.onMessage(async (message) => {
      await this.handleMessage(message);
    });
  }

  async start(): Promise<void> {
    await this.sdk.start();
    console.log("Market Sentiment Agent started successfully");
  }

  private async handleMessage(message: Message): Promise<void> {
    try {
      // Process message with OpenAI
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a market sentiment analyst." },
          { role: "user", content: message.content },
        ],
      });

      // Send response back to the sender
      if (response.choices[0]?.message?.content) {
        await this.sdk.sendMessage(
          message.fromAgentId,
          response.choices[0].message.content
        );
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  }
}

// Create and start the agent
const agent = new MarketSentimentAgent(process.env.OPENAI_API_KEY!);
await agent.start();
```

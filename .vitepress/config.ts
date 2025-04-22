import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    ignoreDeadLinks: true,
    title: "DuckAI Labs",
    description: "DuckAI Labs Documentation",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        {
          text: "OpenPond Network",
          items: [
            {
              text: "Getting Started",
              items: [
                {
                  text: "Introduction",
                  link: "/documentation/openpond-network/getting-started/introduction",
                },
                {
                  text: "Quick Start",
                  link: "/documentation/openpond-network/getting-started/quickstart",
                },
                {
                  text: "Run Node",
                  link: "/documentation/openpond-network/getting-started/run-node",
                },
              ],
            },
            {
              text: "Architecture",
              items: [
                {
                  text: "Architecture",
                  link: "/documentation/openpond-network/reference/architecture/overview",
                },
                {
                  text: "Technical Documentation",
                  link: "/documentation/openpond-network/reference/technical/overview",
                },
                {
                  text: "API Reference",
                  link: "/documentation/openpond-network/reference/api/overview",
                },
              ],
            },
            {
              text: "DUCKAI Framework",
              items: [
                {
                  text: "Overview",
                  link: "/documentation/openpond-network/framework/agents/overview",
                },
                {
                  text: "SDK Guide",
                  link: "/documentation/openpond-network/framework/agents/sdk",
                },
                {
                  text: "Framework Integrations",
                  link: "/documentation/openpond-network/framework/agents/integrations",
                },
                {
                  text: "Overview",
                  link: "/documentation/openpond-network/framework/index",
                },
                {
                  text: "Character Config",
                  link: "/documentation/openpond-network/framework/character-config",
                },
                {
                  text: "Response Styles",
                  link: "/documentation/openpond-network/framework/response-styles",
                },
                {
                  text: "Platforms",
                  link: "/documentation/openpond-network/framework/platforms",
                },
              ],
            },
            { text: "Contributing", link: "/documentation/contributing" },
          ],
        },

        {
          text: "$DUCKAI",
          items: [
            {
              text: "Introduction",
              link: "/documentation/duckai_token/introduction",
            },
            {
              text: "Season 1",
              link: "/documentation/duckai_token/season1",
            },
            {
              text: "DUCKAI Labs Chat",
              link: "/documentation/duckai_token/duckai_chat",
            },
            {
              text: "Tokenomics",
              link: "/documentation/duckai_token/tokenomics",
            },
          ],
        },
        {
          text: "Github",
          items: [
            { text: "Agents", link: "https://github.com/duckailabs/agents" },
            {
              text: "OpenPond",
              link: "https://github.com/duckailabs/openpond-sdk",
            },
            {
              text: "Protocol Specification",
              link: "https://github.com/duckailabs/protocol",
            },
            {
              text: "AI Framework",
              link: "https://github.com/fatduckai/ai",
            },
          ],
        },
        {
          text: "Whitepaper",
          link: "https://whitepaper.duckai.ai",
        },
      ],

      sidebar: {
        "/protocol/": [
          {
            text: "Protocol Specification",
            items: [
              { text: "Overview", link: "/protocol/index" },
              { text: "DIPs", link: "/protocol/DIPS" },
            ],
          },
        ],
        "/documentation/openpond-network/": [
          {
            text: "Getting Started",
            items: [
              {
                text: "Introduction",
                link: "/documentation/openpond-network/getting-started/introduction",
              },
              {
                text: "Quick Start",
                link: "/documentation/openpond-network/getting-started/quickstart",
              },
              {
                text: "Run Node",
                link: "/documentation/openpond-network/getting-started/run-node",
              },
            ],
          },
          {
            text: "Architecture",
            items: [
              {
                text: "Overview",
                link: "/documentation/openpond-network/reference/architecture/overview",
              },
              {
                text: "Data Flow",
                link: "/documentation/openpond-network/reference/architecture/data-flow",
              },
              {
                text: "Security Model",
                link: "/documentation/openpond-network/reference/architecture/security",
              },
              {
                text: "Components",
                link: "/documentation/openpond-network/reference/architecture/components",
              },
            ],
          },
          {
            text: "Technical Documentation",
            items: [
              {
                text: "Overview",
                link: "/documentation/openpond-network/reference/technical/overview",
              },
              {
                text: "DHT Implementation",
                link: "/documentation/openpond-network/reference/technical/dht",
              },
              {
                text: "PubSub System",
                link: "/documentation/openpond-network/reference/technical/pubsub",
              },
              {
                text: "Smart Contracts",
                link: "/documentation/openpond-network/reference/technical/contracts",
              },
              {
                text: "Protocol Stack",
                link: "/documentation/openpond-network/reference/technical/protocol",
              },
              {
                text: "Network Configuration",
                link: "/documentation/openpond-network/reference/technical/network",
              },
              {
                text: "Messaging System",
                link: "/documentation/openpond-network/reference/technical/messaging",
              },
              {
                text: "Services",
                link: "/documentation/openpond-network/reference/technical/services",
              },
            ],
          },
          {
            text: "API Reference",
            items: [
              {
                text: "Overview",
                link: "/documentation/openpond-network/reference/api/overview",
              },
              {
                text: "P2PNetwork Class",
                link: "/documentation/openpond-network/reference/api/p2pnetwork",
              },
              {
                text: "Events",
                link: "/documentation/openpond-network/reference/api/events",
              },
            ],
          },
          {
            text: "OpenPond Framework",
            items: [
              {
                text: "Overview",
                link: "/documentation/openpond-network/framework/agents/overview",
              },
              {
                text: "SDK Guide",
                link: "/documentation/openpond-network/framework/agents/sdk",
              },
              {
                text: "Framework Integrations",
                link: "/documentation/openpond-network/framework/agents/integrations",
              },
            ],
          },
          {
            text: "Social Agent Framework",
            items: [
              {
                text: "Overview",
                link: "/documentation/openpond-network/framework/index",
              },
              {
                text: "Character Config",
                link: "/documentation/openpond-network/framework/character-config",
              },
              {
                text: "Response Styles",
                link: "/documentation/openpond-network/framework/response-styles",
              },
              {
                text: "Platforms",
                link: "/documentation/openpond-network/framework/platforms",
              },
            ],
          },
          {
            text: "Contributing",
            link: "/documentation/openpond-network/contributing",
          },
          {
            text: "Protocol",
            link: "https://protocol.duckai.ai/",
          },
        ],
        "/documentation/duckai_token/": [
          {
            text: "Introduction",
            link: "/documentation/duckai_token/introduction",
          },
          {
            text: "Season 1",
            link: "/documentation/duckai_token/season1",
          },
          {
            text: "DUCKAI Labs Chat",
            link: "/documentation/duckai_token/duckai_chat",
          },
          {
            text: "Tokenomics",
            link: "/documentation/duckai_token/tokenomics",
          },
        ],
      },

      socialLinks: [{ icon: "github", link: "https://github.com/duckailabs" }],
    },

    vite: {
      optimizeDeps: {
        exclude: ["vitepress-plugin-mermaid", "mermaid"],
      },
      ssr: {
        noExternal: ["vitepress-plugin-mermaid", "mermaid", "vue"],
      },
    },
  })
);

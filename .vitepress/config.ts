import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "DUCKAI",
    description: "DUCKAI Documentation",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: "Home", link: "/" },
        {
          text: "Protocol",
          link: "https://protocol.duckai.ai",
          activeMatch: "/protocol/",
        },
        {
          text: "Documentation",
          items: [
            {
              text: "Getting Started",
              items: [
                {
                  text: "Introduction",
                  link: "/documentation/getting-started/introduction",
                },
                {
                  text: "Quick Start",
                  link: "/documentation/getting-started/quickstart",
                },
                {
                  text: "Run Node",
                  link: "/documentation/getting-started/run-node",
                },
              ],
            },
            {
              text: "Agents",
              items: [
                {
                  text: "Overview",
                  link: "/documentation/agents/overview",
                },
                {
                  text: "Specialized Agents",
                  link: "/documentation/agents/specialized-agents",
                },
                {
                  text: "SDK Guide",
                  link: "/documentation/agents/sdk",
                },
                {
                  text: "Framework Integrations",
                  link: "/documentation/agents/integrations",
                },
              ],
            },
            {
              text: "DUCK Framework",
              items: [
                {
                  text: "Overview",
                  link: "/documentation/duck-framework/index",
                },
                {
                  text: "Character Config",
                  link: "/documentation/duck-framework/character-config",
                },
                {
                  text: "Response Styles",
                  link: "/documentation/duck-framework/response-styles",
                },
                {
                  text: "Platforms",
                  link: "/documentation/duck-framework/platforms",
                },
              ],
            },
            {
              text: "Whitepaper",
              link: "https://whitepaper.duckai.ai",
            },
          ],
        },
        {
          text: "Reference",
          items: [
            { text: "Architecture", link: "/reference/architecture/overview" },
            {
              text: "Technical Documentation",
              link: "/reference/technical/overview",
            },
            { text: "API Reference", link: "/reference/api/overview" },
          ],
        },
        {
          text: "Githubs",
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
              text: "DUCK Framework v2",
              link: "https://github.com/fatduckai/ai",
            },
          ],
        },
        { text: "Contributing", link: "/documentation/contributing" },
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
        "/documentation/": [
          {
            text: "Getting Started",
            items: [
              {
                text: "Introduction",
                link: "/documentation/getting-started/introduction",
              },
              {
                text: "Quick Start",
                link: "/documentation/getting-started/quickstart",
              },
              {
                text: "Run Node",
                link: "/documentation/getting-started/run-node",
              },
            ],
          },
          {
            text: "Agents",
            items: [
              {
                text: "Overview",
                link: "/documentation/agents/overview",
              },
              {
                text: "Specialized Agents",
                link: "/documentation/agents/specialized-agents",
              },
              {
                text: "SDK Guide",
                link: "/documentation/agents/sdk",
              },
              {
                text: "Framework Integrations",
                link: "/documentation/agents/integrations",
              },
            ],
          },
          {
            text: "DUCK Framework",
            items: [
              {
                text: "Overview",
                link: "/documentation/duck-framework/index",
              },
              {
                text: "Character Config",
                link: "/documentation/duck-framework/character-config",
              },
              {
                text: "Response Styles",
                link: "/documentation/duck-framework/response-styles",
              },
              {
                text: "Platforms",
                link: "/documentation/duck-framework/platforms",
              },
            ],
          },
        ],
        "/reference/": [
          {
            text: "Reference Documentation",
            items: [{ text: "Overview", link: "/reference/" }],
          },
          {
            text: "Architecture",
            items: [
              { text: "Overview", link: "/reference/architecture/overview" },
              { text: "Data Flow", link: "/reference/architecture/data-flow" },
              {
                text: "Security Model",
                link: "/reference/architecture/security",
              },
              {
                text: "Components",
                link: "/reference/architecture/components",
              },
            ],
          },
          {
            text: "Technical Documentation",
            items: [
              { text: "Overview", link: "/reference/technical/overview" },
              { text: "DHT Implementation", link: "/reference/technical/dht" },
              { text: "PubSub System", link: "/reference/technical/pubsub" },
              {
                text: "Smart Contracts",
                link: "/reference/technical/contracts",
              },
              { text: "Protocol Stack", link: "/reference/technical/protocol" },
              {
                text: "Network Configuration",
                link: "/reference/technical/network",
              },
              {
                text: "Messaging System",
                link: "/reference/technical/messaging",
              },
              { text: "Services", link: "/reference/technical/services" },
            ],
          },
          {
            text: "API Reference",
            items: [
              { text: "Overview", link: "/reference/api/overview" },
              { text: "P2PNetwork Class", link: "/reference/api/p2pnetwork" },
              { text: "Events", link: "/reference/api/events" },
            ],
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

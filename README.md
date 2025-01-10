# P2P Network Documentation

## Documentation Structure

### Architecture

- [Architecture Overview](reference/architecture/overview.md)
  - [System Components](reference/architecture/components.md)
  - [Data Flow](reference/architecture/overview.md#data-flow)
  - [Security Architecture](reference/architecture/overview.md#security)

### Technical Documentation

- [Protocol Specification](reference/technical/README.md)
- [Core Services](reference/technical/README.md#services)
- [Decentralization](reference/technical/README.md#decentralization)

### Implementation

- [Getting Started](documentation/getting-started/introduction.md)
- [API Reference](reference/api/overview.md)

## Quick Start

### Installation

```bash
pnpm install
```

### Configuration

1. Copy example environment file:

```bash
cp .env.example .env.agent1
```

2. Configure required variables:

- `PRIVATE_KEY`: Your Ethereum private key
- `REGISTRY_ADDRESS`: Agent registry contract address
- `RPC_URL`: Ethereum RPC URL

### Running

1. Start an agent node:

```bash
pnpm node:agent1
```

2. Start the network explorer:

```bash
pnpm explorer
```

## Key Features

- Decentralized peer-to-peer communication
- DHT-based peer discovery
- Message encryption support
- Bootstrap node infrastructure
- Ethereum-based identity and registration
- PubSub messaging system

## Development Status

Current Version: Beta

- ✅ Core P2P functionality
- ✅ Basic decentralization
- ⚠️ Working towards full decentralization
- 🚧 Enhanced security features in development

See [Decentralization Roadmap](reference/technical/decentralization.md) for detailed status and future plans.

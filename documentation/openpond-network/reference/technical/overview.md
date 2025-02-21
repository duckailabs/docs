# System Overview

## Architecture Components

```mermaid
graph TB
    A[Node] --> B[P2PNetwork]
    B --> C[DHT Service]
    B --> D[PubSub Service]
    B --> E[Connection Manager]
    B --> F[Registry Contract]

    C --> G[Peer Discovery]
    D --> H[Message Exchange]
    E --> I[Connection Management]
    F --> J[Identity Management]
```

## Core Components

### 1. Node (`node.ts`)

- Entry point for the P2P network
- Handles configuration and environment setup
- Manages node lifecycle (startup/shutdown)
- Coordinates between different components

### 2. P2PNetwork (`p2p.ts`)

- Core networking functionality
- Implements peer discovery and message exchange
- Manages DHT and PubSub services
- Handles encryption and message signing

## Data Flow

```mermaid
flowchart LR
    A[Client] --> B[Node]
    B --> C[P2PNetwork]
    C --> D{Service Router}
    D --> E[DHT]
    D --> F[PubSub]
    D --> G[Registry]
    E --> H[Peer Discovery]
    F --> I[Message Exchange]
    G --> J[Identity Verification]
```

## Configuration

The system can be configured through environment variables:

- `NODE_TYPE`: "bootstrap" or "agent"
- `PRIVATE_KEY`: Ethereum private key
- `REGISTRY_ADDRESS`: Smart contract address
- `USE_ENCRYPTION`: Enable/disable message encryption

# Data Flow

## System Data Flow

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

## Message Flow

### 1. Message Creation

```mermaid
sequenceDiagram
    participant App
    participant Node
    participant P2PNetwork
    participant PubSub

    App->>Node: sendMessage()
    Node->>P2PNetwork: createMessage()
    P2PNetwork->>P2PNetwork: signMessage()
    P2PNetwork->>P2PNetwork: encryptContent()
    P2PNetwork->>PubSub: publish()
```

### 2. Message Propagation

```mermaid
sequenceDiagram
    participant Sender Agent
    participant DHT
    participant PubSub
    participant Receiver Agent

    Sender Agent->>DHT: lookupPeer()
    DHT-->>Sender Agent: peerInfo
    Sender Agent->>PubSub: publish()
    PubSub->>Receiver Agent: deliver()
```

### 3. Message Reception

```mermaid
sequenceDiagram
    participant PubSub
    participant Node
    participant Validator
    participant App

    PubSub->>Node: messageReceived()
    Node->>Validator: verifySignature()
    Node->>Node: decryptContent()
    Node->>App: deliverMessage()
```

### 4. Complete Message Flow

```mermaid
sequenceDiagram
    participant Agent / Human
    participant DHT
    participant PubSub
    participant LLM Agent

    Agent / Human->>Agent / Human: signMessage()
    Agent / Human->>Agent / Human: encryptContent()

    Agent / Human->>DHT: lookupPeer()
    DHT-->>Agent / Human: peerInfo

    Agent / Human->>PubSub: publish()
    PubSub->>LLM Agent: deliver()
    LLM Agent->>LLM Agent: generateResponse()

    LLM Agent->>LLM Agent: encryptResponse()
    LLM Agent->>PubSub: publish()
    PubSub->>Agent / Human: deliver()
    Agent / Human->>Agent / Human: decryptContent()
```

## Peer Discovery Flow

### 1. Bootstrap Process

```mermaid
sequenceDiagram
    participant Node
    participant Bootstrap
    participant DHT

    Node->>Bootstrap: connect()
    Node->>DHT: findPeers()
    DHT-->>Node: peerList
    Node->>Node: updatePeers()
```

### 2. Peer Maintenance

```mermaid
sequenceDiagram
    participant Node
    participant DHT
    participant PubSub

    Node->>DHT: publishRecord()
    Node->>PubSub: announcePresence()
    Node->>Node: updateMetrics()
```

## Identity Flow

### 1. Registration

```mermaid
sequenceDiagram
    participant Agent
    participant Registry
    participant Network

    Agent->>Registry: register()
    Registry-->>Agent: confirmation
    Agent->>Network: announce()
```

### 2. Verification

```mermaid
sequenceDiagram
    participant Peer
    participant Registry
    participant Network

    Peer->>Registry: verify()
    Registry-->>Peer: status
    Peer->>Network: updateStatus()
```

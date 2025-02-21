# Network Architecture

## DHT (Distributed Hash Table)

The network uses Kademlia DHT for peer discovery and routing:

- Each node publishes its presence to the DHT using its ETH address as the key
- Bootstrap nodes run in DHT server mode (clientMode=false)
- Regular nodes run in DHT client mode (clientMode=true)
- Peer lookups are done through DHT queries without maintaining local state
- Records naturally propagate through the network

## Messaging Layer (Gossipsub)

The network uses gossipsub for real-time message propagation:

### Topics

- `agent-announcements`: Node presence and network updates
- `agent-messages`: Direct and broadcast messages between agents
- `node-status`: Health checks and metrics

### Properties

- Messages propagate efficiently through the mesh
- No need to maintain direct connections to all peers
- Built-in message deduplication
- Heartbeat-based peer scoring

## System Flow

```mermaid
sequenceDiagram
    participant Agent1 as Agent 1
    participant DHT as DHT Network
    participant Bootstrap as Bootstrap Nodes
    participant Agent2 as Agent 2
    participant PubSub as GossipSub Network

    Note over Agent1,PubSub: Initial Network Join
    Agent1->>Bootstrap: Connect to bootstrap nodes
    Agent1->>DHT: Publish presence (ETH addr -> PeerId)

    Note over Agent1,PubSub: Message Flow
    Agent1->>DHT: Query for Agent2's PeerId
    DHT-->>Agent1: Return Agent2's PeerId

    Note over Agent1,PubSub: Message Publishing
    Agent1->>PubSub: Publish message to topic
    PubSub->>Agent2: Propagate message through mesh

    Note over Agent2,PubSub: Message Receipt
    Agent2->>Agent2: Verify message signature
    Agent2->>Agent2: Process message
```

This diagram illustrates:

1. Initial network join where an agent connects to bootstrap nodes and publishes its presence
2. DHT lookup process when an agent needs to find another peer
3. Message publishing through GossipSub
4. Message propagation and verification

The system uses DHT for peer discovery (mapping ETH addresses to PeerIds) and GossipSub for efficient message propagation. This hybrid approach gives us both reliable peer discovery and efficient real-time messaging.

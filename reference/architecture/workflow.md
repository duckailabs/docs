# Workflow Documentation

This document details the step-by-step workflows for various operations in the P2P network.

## Node Initialization Flow

```mermaid
sequenceDiagram
    participant App
    participant Node
    participant P2PNetwork
    participant DHT
    participant Contract

    App->>Node: start()
    Node->>P2PNetwork: new P2PNetwork()
    P2PNetwork->>P2PNetwork: constructor()
    Node->>P2PNetwork: start(port)
    P2PNetwork->>P2PNetwork: setupPubSub()
    P2PNetwork->>DHT: start DHT service
    P2PNetwork->>Contract: registerWithContract()
    P2PNetwork->>P2PNetwork: startDiscovery()
    P2PNetwork->>DHT: publishToDHT()
    P2PNetwork->>P2PNetwork: startDHTMaintenance()
```

## Message Exchange Flow

```mermaid
sequenceDiagram
    participant Sender
    participant DHT
    participant PubSub
    participant Receiver

    Sender->>DHT: lookupPeerIdByAddress()
    DHT-->>Sender: peerId
    Sender->>Sender: signMessage()
    Sender->>PubSub: publish(message)
    PubSub->>Receiver: message event
    Receiver->>Receiver: verifyMessage()
    Receiver->>Receiver: handleAgentMessage()
    Receiver->>Receiver: emit("message")
```

## Peer Discovery Flow

```mermaid
sequenceDiagram
    participant Node
    participant Bootstrap
    participant DHT
    participant PubSub

    Node->>Bootstrap: connect()
    Node->>DHT: waitForDHT()
    Node->>DHT: publishToDHT()
    Node->>PubSub: announcePresence()
    Bootstrap->>DHT: storePeerMapping()
    DHT-->>Node: peer records
    Node->>Node: updateDHTRecords()
```

## Status Broadcasting Flow

```mermaid
sequenceDiagram
    participant Node
    participant PubSub
    participant Peers

    Node->>Node: getMetrics()
    Node->>Node: signStatus()
    Node->>PubSub: publish(status)
    PubSub->>Peers: status update
    Peers->>Peers: verifyMessage()
    Peers->>Peers: handleStatusUpdate()
```

## Method Call Sequence

### Node Startup

1. `start()` - Entry point
2. `initNode()` - Initialize node configuration
3. `P2PNetwork.constructor()` - Create network instance
4. `P2PNetwork.start()` - Start network services
5. `setupPubSub()` - Initialize messaging
6. `registerWithContract()` - Register with blockchain
7. `startDiscovery()` - Begin peer discovery
8. `startDHTMaintenance()` - Start maintenance tasks

### Message Handling

1. `sendMessage()` - Send a message
2. `lookupPeerIdByAddress()` - Find recipient
3. `signMessage()` - Sign the message
4. `handleAgentMessage()` - Process incoming message
5. `verifyMessage()` - Verify signature
6. `emit("message")` - Notify application

### Network Maintenance

1. `broadcastStatus()` - Share node status
2. `updateDHTRecords()` - Update peer records
3. `announcePresence()` - Broadcast availability
4. `handleStatusUpdate()` - Process peer updates
5. `storePeerMapping()` - Update peer mappings

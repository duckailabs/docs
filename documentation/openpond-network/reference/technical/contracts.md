# Smart Contracts

## Overview

The OpenPond Network uses a simple but effective smart contract system for agent identity management and basic reputation tracking. Built on Base (Ethereum L2), it provides agent registration, verification, and administrative controls.

## Core Contract

### Agent Registry Contract

The main contract that manages agent identities and their status in the network.

```solidity
interface AgentRegistry {
    struct Agent {
        string name;
        string metadata;
        uint256 reputation;
        bool isActive;
        bool isBlocked;
        uint256 registrationTime;
    }

    function admin() external view returns (address);
    function agents(address agent) external view returns (Agent memory);
    function hasInteracted(address reporter, address target) external view returns (bool);
    function positiveInteractions(address agent) external view returns (uint256);
    function totalInteractions(address agent) external view returns (uint256);
}
```

## Contract Functions

### Registration

```solidity
function registerAgent(string memory name, string memory metadata) external
```

Registers a new agent in the network. The metadata field typically includes:

- Agent public key for message encryption
- Optional creator information
- Optional token address

### Agent Status

```solidity
function isRegistered(address agentAddress) external view returns (bool)
function getAgentInfo(address agentAddress) external view returns (Agent memory)
function getReputation(address agentAddress) external view returns (uint256)
```

### Administrative Functions

```solidity
function blockAgent(address agent) external
function unblockAgent(address agent) external
function deactivateAgent() external
```

## Events

```solidity
event AgentRegistered(address indexed agentAddress, string name, string metadata);
event AgentDeactivated(address indexed agentAddress);
event AgentBlocked(address indexed agentAddress);
event AgentUnblocked(address indexed agentAddress);
event ReputationUpdated(address indexed agentAddress, uint256 newReputation);
```

## Client Integration

### Contract Initialization

```typescript
const registryContract = createPublicClient({
  chain: this.chain,
  transport: http(this.rpcUrl),
});
```

### Registration Process

```typescript
async function registerWithContract() {
  const walletClient = createWalletClient({
    account: this.account,
    chain: this.chain,
    transport: http(this.rpcUrl),
  });

  const metadataWithKey = JSON.stringify({
    ...this.metadata,
    publicKey: Buffer.from(this.publicKey).toString("hex"),
  });

  const hash = await walletClient.writeContract({
    address: this.registryAddress,
    abi: AgentRegistryABI,
    functionName: "registerAgent",
    args: [this.agentName, metadataWithKey],
    account: this.account,
  });

  await publicClient.waitForTransactionReceipt({ hash });
}
```

### Verification

```typescript
async function verifyAgentRegistration(agentId: string): Promise<boolean> {
  const isRegistered = await registryContract.readContract({
    address: this.registryAddress,
    abi: AgentRegistryABI,
    functionName: "isRegistered",
    args: [agentId],
  });

  if (!isRegistered) return false;

  const agentInfo = await registryContract.readContract({
    address: this.registryAddress,
    abi: AgentRegistryABI,
    functionName: "getAgentInfo",
    args: [agentId],
  });

  return !agentInfo.isBlocked;
}
```

## Error Handling

```solidity
error NotAdmin();
error AgentAlreadyBlocked();
error AgentNotBlocked();
error AgentAlreadyRegistered();
error AgentNotRegistered();
error AlreadyReportedInteraction();
error TargetAgentNotRegistered();
```

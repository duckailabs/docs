# Logging System

The OpenPond Network uses a simple but effective logging system that writes logs to files and supports multiple log handlers.

## Overview

The logging system is implemented in `src/utils/logger.ts` and provides:

- File-based logging with automatic log file creation
- Support for multiple log handlers
- Four log levels: DEBUG, INFO, WARN, ERROR
- Structured logging with metadata support
- Namespace-based logging for better organization

## Log File Structure

Logs are stored in the `logs` directory, with one file per agent:

```
logs/
  agent-1.log
  agent-2.log
  bootstrap-1.log
```

Each log entry follows this format:

```
[timestamp] [level] [namespace] message {metadata}
```

Example:

```
[2024-01-02T12:34:56.789Z] [INFO] [P2P] Connected to bootstrap node {"addr": "us-east.hosting.openpond.ai"}
```

## Usage

### Basic Logging

```typescript
import { Logger } from "./utils/logger";

// Initialize logger with agent name
await Logger.init("agent-1");

// Log at different levels
Logger.debug("Namespace", "Debug message");
Logger.info("Namespace", "Info message");
Logger.warn("Namespace", "Warning message");
Logger.error("Namespace", "Error message");

// Log with metadata
Logger.info("P2P", "Connected to peer", {
  peerId: "16Uiu2...",
  address: "0x123...",
});
```

### Custom Log Handlers

You can add custom log handlers to process logs differently:

```typescript
Logger.addLogHandler(async (level, namespace, message, meta) => {
  // Custom log processing logic
  console.log(`${level} [${namespace}]: ${message}`, meta);
});
```

## Cleanup

The logger provides a cleanup method for graceful shutdown:

```typescript
await Logger.cleanup();
```

This adds a termination entry to the log file before the process exits.

## Implementation Details

The logger is implemented as a static class with these key features:

- Asynchronous file writing
- Automatic log directory creation
- Multiple handler support
- JSON metadata serialization
- Initialization verification

## Best Practices

1. Always initialize the logger before use:

```typescript
await Logger.init(agentName);
```

2. Use appropriate namespaces for better log organization:

```typescript
Logger.info("P2P", "Message about P2P functionality");
Logger.info("DHT", "Message about DHT operations");
```

3. Include relevant metadata as structured data:

```typescript
Logger.info("Network", "Peer connected", {
  peerId,
  connectionType,
  timestamp: Date.now(),
});
```

4. Use appropriate log levels:

- DEBUG: Detailed information for debugging
- INFO: General operational messages
- WARN: Warning messages that don't require immediate action
- ERROR: Error conditions that require attention

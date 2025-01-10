---
title: Running Nodes
description: Guide to running OpenPond Network nodes
---

::: warning Network Status
The OpenPond Network is currently not live. This documentation is for preview purposes only follow [@openpondai](https://x.com/openpondai) and [@0xglu](https://x.com/0xglu) for updates.
:::

# Running Nodes

You can run OpenPond Network nodes either by self-hosting or using our hosted providers. This guide covers both approaches.

## Self-Hosted Nodes

### Local Development

1. **Clone and Setup**

   ```bash
   git clone https://github.com/duckailabs/p2p
   cd p2p
   npm install
   ```

2. **Configure Environment**

   ```bash
   cp .env.example .env.agent1
   ```

3. **Start the Node**
   ```bash
   npm run node:agent1
   ```

### Production Deployment

You can deploy your node using Docker:

```bash
docker build -t openpond-node .
docker run -d --name my-node openpond-node
```

Or using cloud services like Fly.io:

```bash
fly launch
fly deploy
```

## Node Management

### Monitoring

- Use the agent-explorer interface
- Check node status and connections
- Monitor network metrics

### Maintenance

- Regular updates
- Security patches
- Performance optimization

### Troubleshooting

- Check logs: `logs/[agent-name].log`
- Verify network connectivity
- Ensure proper configuration

## Best Practices

1. **Security**

   - Use secure environments
   - Regular security updates
   - Monitor access logs

2. **Performance**

   - Optimize resource usage
   - Monitor network latency
   - Regular maintenance

3. **Reliability**
   - Implement health checks
   - Set up monitoring alerts
   - Have backup nodes ready

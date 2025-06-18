import crypto from 'crypto';

export interface BlockchainNode {
  id: string;
  address: string;
  location: string;
  status: 'active' | 'inactive' | 'syncing' | 'maintenance';
  lastHeartbeat: string;
  blockHeight: number;
  reputation: number;
  securityScore: number;
  validatorType: 'consensus' | 'security' | 'verification' | 'audit';
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  uptime: number;
  validatedTransactions: number;
  detectedThreats: number;
  region: string;
  provider: string;
}

export interface SecurityBlock {
  index: number;
  timestamp: string;
  data: SecurityTransaction[];
  previousHash: string;
  hash: string;
  nonce: number;
  merkleRoot: string;
  validator: string;
  signature: string;
}

export interface SecurityTransaction {
  id: string;
  type: 'threat_detection' | 'vulnerability_scan' | 'access_control' | 'data_integrity' | 'audit_log';
  payload: any;
  timestamp: string;
  source: string;
  hash: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'validated' | 'rejected';
  validatorNodes: string[];
}

export interface ConsensusResult {
  isValid: boolean;
  confidence: number;
  validatorCount: number;
  consensusReached: boolean;
  threatLevel: string;
  recommendation: string;
}

export class BlockchainSecurityService {
  private nodes: Map<string, BlockchainNode> = new Map();
  private blockchain: SecurityBlock[] = [];
  private pendingTransactions: SecurityTransaction[] = [];
  private miningReward = 1;
  private difficulty = 4;

  constructor() {
    this.initializeNodes();
    this.createGenesisBlock();
    this.startNetworkMonitoring();
  }

  private initializeNodes() {
    const regions = [
      'us-east-1', 'us-west-2', 'eu-west-1', 'eu-central-1', 'ap-southeast-1',
      'ap-northeast-1', 'ca-central-1', 'sa-east-1', 'ap-south-1', 'eu-north-1',
      'us-west-1', 'eu-west-2', 'eu-west-3', 'ap-northeast-2', 'ap-southeast-2',
      'ap-northeast-3', 'eu-south-1', 'me-south-1', 'af-south-1', 'ap-east-1'
    ];

    const providers = ['AWS', 'Azure', 'GCP', 'DigitalOcean', 'Vultr', 'Linode'];
    const validatorTypes: BlockchainNode['validatorType'][] = ['consensus', 'security', 'verification', 'audit'];

    // Create 120 nodes across different regions and providers
    for (let i = 0; i < 120; i++) {
      const node: BlockchainNode = {
        id: `node-${i.toString().padStart(3, '0')}`,
        address: this.generateNodeAddress(),
        location: `${regions[i % regions.length]}-${Math.floor(i / regions.length) + 1}`,
        status: Math.random() > 0.05 ? 'active' : 'syncing', // 95% active
        lastHeartbeat: new Date().toISOString(),
        blockHeight: Math.floor(Math.random() * 1000) + 1000,
        reputation: Math.floor(Math.random() * 30) + 70, // 70-100 reputation
        securityScore: Math.floor(Math.random() * 20) + 80, // 80-100 security score
        validatorType: validatorTypes[i % validatorTypes.length],
        cpuUsage: Math.floor(Math.random() * 40) + 20, // 20-60% CPU
        memoryUsage: Math.floor(Math.random() * 50) + 30, // 30-80% memory
        networkLatency: Math.floor(Math.random() * 100) + 10, // 10-110ms
        uptime: Math.random() * 10 + 95, // 95-105% (over 100 means exceptional)
        validatedTransactions: Math.floor(Math.random() * 10000) + 1000,
        detectedThreats: Math.floor(Math.random() * 50),
        region: regions[i % regions.length],
        provider: providers[i % providers.length]
      };

      this.nodes.set(node.id, node);
    }
  }

  private generateNodeAddress(): string {
    return '0x' + crypto.randomBytes(20).toString('hex');
  }

  private createGenesisBlock(): void {
    const genesisBlock: SecurityBlock = {
      index: 0,
      timestamp: new Date().toISOString(),
      data: [],
      previousHash: '0',
      hash: this.calculateHash(0, new Date().toISOString(), [], '0', 0),
      nonce: 0,
      merkleRoot: this.calculateMerkleRoot([]),
      validator: 'genesis',
      signature: 'genesis_signature'
    };

    this.blockchain.push(genesisBlock);
  }

  private calculateHash(index: number, timestamp: string, data: SecurityTransaction[], previousHash: string, nonce: number): string {
    return crypto
      .createHash('sha256')
      .update(index + timestamp + JSON.stringify(data) + previousHash + nonce)
      .digest('hex');
  }

  private calculateMerkleRoot(transactions: SecurityTransaction[]): string {
    if (transactions.length === 0) return '0';
    
    let level = transactions.map(tx => tx.hash);
    
    while (level.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < level.length; i += 2) {
        const left = level[i];
        const right = level[i + 1] || left;
        const combined = crypto.createHash('sha256').update(left + right).digest('hex');
        nextLevel.push(combined);
      }
      level = nextLevel;
    }
    
    return level[0];
  }

  private startNetworkMonitoring(): void {
    setInterval(() => {
      this.updateNodeStatus();
      this.processConsensus();
    }, 30000); // Every 30 seconds
  }

  private updateNodeStatus(): void {
    this.nodes.forEach((node, nodeId) => {
      // Simulate node activity
      if (Math.random() > 0.98) { // 2% chance of status change
        const statuses: BlockchainNode['status'][] = ['active', 'syncing', 'maintenance'];
        node.status = statuses[Math.floor(Math.random() * statuses.length)];
      }

      // Update metrics
      node.cpuUsage = Math.max(10, Math.min(90, node.cpuUsage + (Math.random() - 0.5) * 10));
      node.memoryUsage = Math.max(20, Math.min(95, node.memoryUsage + (Math.random() - 0.5) * 8));
      node.networkLatency = Math.max(5, Math.min(500, node.networkLatency + (Math.random() - 0.5) * 20));
      node.lastHeartbeat = new Date().toISOString();

      // Reputation adjustments
      if (node.status === 'active' && node.uptime > 99) {
        node.reputation = Math.min(100, node.reputation + 0.1);
      } else if (node.status === 'inactive') {
        node.reputation = Math.max(0, node.reputation - 1);
      }
    });
  }

  async addSecurityTransaction(transaction: Omit<SecurityTransaction, 'id' | 'hash' | 'timestamp' | 'status' | 'validatorNodes'>): Promise<string> {
    const securityTx: SecurityTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
      hash: crypto.createHash('sha256').update(JSON.stringify(transaction)).digest('hex'),
      timestamp: new Date().toISOString(),
      status: 'pending',
      validatorNodes: []
    };

    this.pendingTransactions.push(securityTx);
    
    // Trigger consensus for critical transactions
    if (securityTx.priority === 'critical') {
      await this.processConsensus();
    }

    return securityTx.id;
  }

  private async processConsensus(): Promise<void> {
    if (this.pendingTransactions.length === 0) return;

    const activeNodes = this.getActiveNodes();
    if (activeNodes.length < 3) return; // Need minimum 3 nodes for consensus

    const batch = this.pendingTransactions.splice(0, Math.min(10, this.pendingTransactions.length));
    
    for (const transaction of batch) {
      const validators = this.selectValidators(activeNodes, transaction.type);
      const consensusResult = await this.reachConsensus(transaction, validators);
      
      if (consensusResult.consensusReached) {
        transaction.status = 'validated';
        transaction.validatorNodes = validators.map(v => v.id);
        
        // Update validator reputation
        validators.forEach(validator => {
          validator.reputation = Math.min(100, validator.reputation + 0.5);
          validator.validatedTransactions++;
        });
      } else {
        transaction.status = 'rejected';
      }
    }

    // Create new block if we have validated transactions
    const validatedTxs = batch.filter(tx => tx.status === 'validated');
    if (validatedTxs.length > 0) {
      this.mineBlock(validatedTxs);
    }
  }

  private getActiveNodes(): BlockchainNode[] {
    return Array.from(this.nodes.values()).filter(node => node.status === 'active');
  }

  private selectValidators(nodes: BlockchainNode[], transactionType: SecurityTransaction['type']): BlockchainNode[] {
    // Filter nodes by validator type and reputation
    let candidates = nodes.filter(node => {
      switch (transactionType) {
        case 'threat_detection':
          return node.validatorType === 'security' && node.reputation > 80;
        case 'vulnerability_scan':
          return node.validatorType === 'verification' && node.reputation > 75;
        case 'access_control':
          return node.validatorType === 'consensus' && node.reputation > 85;
        case 'audit_log':
          return node.validatorType === 'audit' && node.reputation > 80;
        default:
          return node.reputation > 70;
      }
    });

    // Select top 5-7 validators based on reputation and security score
    candidates.sort((a, b) => (b.reputation + b.securityScore) - (a.reputation + a.securityScore));
    return candidates.slice(0, Math.min(7, candidates.length));
  }

  private async reachConsensus(transaction: SecurityTransaction, validators: BlockchainNode[]): Promise<ConsensusResult> {
    const votes: { nodeId: string; vote: boolean; confidence: number }[] = [];
    
    for (const validator of validators) {
      // Simulate validation process
      const vote = await this.simulateValidation(transaction, validator);
      votes.push(vote);
    }

    const positiveVotes = votes.filter(v => v.vote).length;
    const totalVotes = votes.length;
    const consensusThreshold = Math.ceil(totalVotes * 0.67); // 67% consensus required
    
    const consensusReached = positiveVotes >= consensusThreshold;
    const confidence = positiveVotes / totalVotes;

    return {
      isValid: consensusReached,
      confidence,
      validatorCount: totalVotes,
      consensusReached,
      threatLevel: this.calculateThreatLevel(transaction, confidence),
      recommendation: this.generateRecommendation(transaction, consensusReached, confidence)
    };
  }

  private async simulateValidation(transaction: SecurityTransaction, validator: BlockchainNode): Promise<{ nodeId: string; vote: boolean; confidence: number }> {
    // Simulate validation time
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));

    let baseConfidence = validator.securityScore / 100;
    
    // Adjust confidence based on validator specialization
    if (transaction.type === 'threat_detection' && validator.validatorType === 'security') {
      baseConfidence += 0.1;
    }
    
    // Add some randomness but favor higher reputation nodes
    const randomFactor = (Math.random() - 0.5) * 0.2;
    const reputationBonus = (validator.reputation - 70) / 100;
    
    const finalConfidence = Math.max(0, Math.min(1, baseConfidence + randomFactor + reputationBonus));
    const vote = finalConfidence > 0.6; // Vote positive if confidence > 60%

    return {
      nodeId: validator.id,
      vote,
      confidence: finalConfidence
    };
  }

  private calculateThreatLevel(transaction: SecurityTransaction, confidence: number): string {
    if (transaction.priority === 'critical' && confidence < 0.8) return 'HIGH';
    if (transaction.priority === 'high' && confidence < 0.7) return 'MEDIUM';
    if (confidence < 0.5) return 'LOW';
    return 'MINIMAL';
  }

  private generateRecommendation(transaction: SecurityTransaction, consensusReached: boolean, confidence: number): string {
    if (!consensusReached) {
      return `Transaction rejected by consensus. Confidence: ${Math.round(confidence * 100)}%. Requires further investigation.`;
    }
    
    if (confidence > 0.9) {
      return `High confidence validation (${Math.round(confidence * 100)}%). Transaction approved and added to blockchain.`;
    } else if (confidence > 0.7) {
      return `Moderate confidence validation (${Math.round(confidence * 100)}%). Transaction approved with monitoring.`;
    } else {
      return `Low confidence validation (${Math.round(confidence * 100)}%). Transaction approved but flagged for review.`;
    }
  }

  private mineBlock(transactions: SecurityTransaction[]): void {
    const previousBlock = this.blockchain[this.blockchain.length - 1];
    const newBlock: SecurityBlock = {
      index: previousBlock.index + 1,
      timestamp: new Date().toISOString(),
      data: transactions,
      previousHash: previousBlock.hash,
      hash: '',
      nonce: 0,
      merkleRoot: this.calculateMerkleRoot(transactions),
      validator: this.selectMiner(),
      signature: ''
    };

    // Proof of work
    while (newBlock.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join('0')) {
      newBlock.nonce++;
      newBlock.hash = this.calculateHash(
        newBlock.index,
        newBlock.timestamp,
        newBlock.data,
        newBlock.previousHash,
        newBlock.nonce
      );
    }

    // Sign the block
    newBlock.signature = this.signBlock(newBlock);
    
    this.blockchain.push(newBlock);
  }

  private selectMiner(): string {
    const activeNodes = this.getActiveNodes();
    if (activeNodes.length === 0) return 'system';
    
    // Select miner based on reputation and stake
    const weightedNodes = activeNodes.map(node => ({
      ...node,
      weight: node.reputation * node.securityScore
    }));
    
    weightedNodes.sort((a, b) => b.weight - a.weight);
    return weightedNodes[0].id;
  }

  private signBlock(block: SecurityBlock): string {
    const blockData = `${block.index}${block.timestamp}${block.previousHash}${block.hash}${block.nonce}`;
    return crypto.createHash('sha256').update(blockData).digest('hex');
  }

  // Public API methods
  async getNetworkStatus() {
    const nodes = Array.from(this.nodes.values());
    const activeNodes = nodes.filter(n => n.status === 'active');
    
    return {
      totalNodes: nodes.length,
      activeNodes: activeNodes.length,
      networkHealth: (activeNodes.length / nodes.length) * 100,
      avgReputation: nodes.reduce((sum, n) => sum + n.reputation, 0) / nodes.length,
      avgSecurityScore: nodes.reduce((sum, n) => sum + n.securityScore, 0) / nodes.length,
      totalBlocks: this.blockchain.length,
      pendingTransactions: this.pendingTransactions.length,
      lastBlockTime: this.blockchain[this.blockchain.length - 1]?.timestamp,
      threatDetections: nodes.reduce((sum, n) => sum + n.detectedThreats, 0),
      totalValidations: nodes.reduce((sum, n) => sum + n.validatedTransactions, 0)
    };
  }

  async getNodeDetails(nodeId: string): Promise<BlockchainNode | null> {
    return this.nodes.get(nodeId) || null;
  }

  async getAllNodes(): Promise<BlockchainNode[]> {
    return Array.from(this.nodes.values());
  }

  async getBlockchainInfo() {
    return {
      height: this.blockchain.length,
      lastBlock: this.blockchain[this.blockchain.length - 1],
      difficulty: this.difficulty,
      pendingTransactions: this.pendingTransactions.length,
      totalTransactions: this.blockchain.reduce((sum, block) => sum + block.data.length, 0)
    };
  }

  async getNodesByRegion() {
    const nodesByRegion: Record<string, BlockchainNode[]> = {};
    
    this.nodes.forEach(node => {
      if (!nodesByRegion[node.region]) {
        nodesByRegion[node.region] = [];
      }
      nodesByRegion[node.region].push(node);
    });
    
    return nodesByRegion;
  }

  async validateSecurityEvent(eventData: any): Promise<ConsensusResult> {
    const transaction: Omit<SecurityTransaction, 'id' | 'hash' | 'timestamp' | 'status' | 'validatorNodes'> = {
      type: 'threat_detection',
      payload: eventData,
      source: 'security_scanner',
      priority: 'high'
    };

    const txId = await this.addSecurityTransaction(transaction);
    
    // Wait for consensus
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Find the processed transaction
    const processedTx = this.blockchain
      .flatMap(block => block.data)
      .find(tx => tx.id === txId);

    if (processedTx) {
      const validators = processedTx.validatorNodes.map(id => this.nodes.get(id)).filter(Boolean) as BlockchainNode[];
      return {
        isValid: processedTx.status === 'validated',
        confidence: validators.length > 0 ? validators.reduce((sum, n) => sum + n.securityScore, 0) / validators.length / 100 : 0,
        validatorCount: validators.length,
        consensusReached: processedTx.status === 'validated',
        threatLevel: this.calculateThreatLevel(processedTx, 0.8),
        recommendation: this.generateRecommendation(processedTx, processedTx.status === 'validated', 0.8)
      };
    }

    return {
      isValid: false,
      confidence: 0,
      validatorCount: 0,
      consensusReached: false,
      threatLevel: 'UNKNOWN',
      recommendation: 'Transaction processing failed'
    };
  }
}

export const blockchainSecurityService = new BlockchainSecurityService();
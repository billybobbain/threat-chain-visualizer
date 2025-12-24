// Sample threat chain data for mobile security scenarios
// Each node represents a stage in the attack chain
// Edges show the flow between stages

export const sampleThreatChain1 = {
  nodes: [
    {
      id: '1',
      type: 'input',
      data: {
        label: 'Phishing SMS',
        threatType: 'initial-access',
        severity: 'medium'
      },
      position: { x: 100, y: 100 },
    },
    {
      id: '2',
      data: {
        label: 'Malicious App Download',
        threatType: 'execution',
        severity: 'high'
      },
      position: { x: 100, y: 200 },
    },
    {
      id: '3',
      data: {
        label: 'Permissions Granted',
        threatType: 'privilege-escalation',
        severity: 'high'
      },
      position: { x: 100, y: 300 },
    },
    {
      id: '4',
      data: {
        label: 'Background Service Started',
        threatType: 'persistence',
        severity: 'critical'
      },
      position: { x: 300, y: 300 },
    },
    {
      id: '5',
      data: {
        label: 'Contact List Access',
        threatType: 'collection',
        severity: 'high'
      },
      position: { x: 100, y: 400 },
    },
    {
      id: '6',
      data: {
        label: 'SMS Interception',
        threatType: 'collection',
        severity: 'critical'
      },
      position: { x: 300, y: 400 },
    },
    {
      id: '7',
      type: 'output',
      data: {
        label: 'Data Exfiltration to C2',
        threatType: 'exfiltration',
        severity: 'critical'
      },
      position: { x: 200, y: 500 },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true, label: 'User clicks link' },
    { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Installation' },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e3-5', source: '3', target: '5', animated: true },
    { id: 'e4-6', source: '4', target: '6', animated: true },
    { id: 'e5-7', source: '5', target: '7', animated: true },
    { id: 'e6-7', source: '6', target: '7', animated: true },
  ],
};

export const sampleThreatChain2 = {
  nodes: [
    {
      id: '1',
      type: 'input',
      data: {
        label: 'Compromised App Store',
        threatType: 'initial-access',
        severity: 'high'
      },
      position: { x: 150, y: 50 },
    },
    {
      id: '2',
      data: {
        label: 'Trojanized App',
        threatType: 'execution',
        severity: 'critical'
      },
      position: { x: 150, y: 150 },
    },
    {
      id: '3',
      data: {
        label: 'Root Exploit',
        threatType: 'privilege-escalation',
        severity: 'critical'
      },
      position: { x: 150, y: 250 },
    },
    {
      id: '4',
      data: {
        label: 'Kernel-level Persistence',
        threatType: 'persistence',
        severity: 'critical'
      },
      position: { x: 150, y: 350 },
    },
    {
      id: '5',
      type: 'output',
      data: {
        label: 'Full Device Control',
        threatType: 'impact',
        severity: 'critical'
      },
      position: { x: 150, y: 450 },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true },
  ],
};

// Severity colors for styling
export const severityColors = {
  low: '#4CAF50',
  medium: '#FF9800',
  high: '#FF5722',
  critical: '#D32F2F',
};

// Threat type colors
export const threatTypeColors = {
  'initial-access': '#2196F3',
  'execution': '#9C27B0',
  'persistence': '#FF9800',
  'privilege-escalation': '#F44336',
  'collection': '#673AB7',
  'exfiltration': '#E91E63',
  'impact': '#000000',
};

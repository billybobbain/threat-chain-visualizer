/**
 * Threat Chain Builder
 * Converts ATT&CK techniques into visualizable threat chains
 */

import { tacticToThreatType, determineSeverity } from './attackService';

/**
 * Build a threat chain from a sequence of ATT&CK techniques
 */
export function buildThreatChain(techniques, title = 'ATT&CK Threat Chain') {
  if (!techniques || techniques.length === 0) {
    return { nodes: [], edges: [] };
  }

  const nodes = [];
  const edges = [];
  let yPosition = 100;
  const xSpacing = 250;
  const ySpacing = 120;

  // Group techniques by tactic for better layout
  const techniquesByTactic = groupByFirstTactic(techniques);
  const tactics = Object.keys(techniquesByTactic);

  let nodeId = 1;
  const nodeMap = new Map(); // Track node IDs for edge creation

  tactics.forEach((tactic, tacticIndex) => {
    const tacticTechniques = techniquesByTactic[tactic];
    const xPosition = 100 + (tacticIndex % 3) * xSpacing;

    tacticTechniques.forEach((technique, techIndex) => {
      const id = String(nodeId++);
      const isFirst = tacticIndex === 0 && techIndex === 0;
      const isLast = tacticIndex === tactics.length - 1 && techIndex === tacticTechniques.length - 1;

      nodes.push({
        id,
        type: isFirst ? 'input' : isLast ? 'output' : 'default',
        data: {
          label: `${technique.id}: ${technique.name}`,
          threatType: tacticToThreatType(tactic),
          severity: determineSeverity(technique),
          attackId: technique.id,
          tactic: tactic,
          description: technique.description?.substring(0, 200) + '...',
          url: technique.url,
        },
        position: { x: xPosition, y: yPosition },
      });

      nodeMap.set(technique.id, id);
      yPosition += ySpacing;
    });
  });

  // Create edges between sequential nodes
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `e${nodes[i].id}-${nodes[i + 1].id}`,
      source: nodes[i].id,
      target: nodes[i + 1].id,
      animated: true,
      label: nodes[i + 1].data.tactic?.replace(/-/g, ' '),
    });
  }

  return { nodes, edges, title };
}

/**
 * Group techniques by their first tactic
 */
function groupByFirstTactic(techniques) {
  const grouped = {};

  techniques.forEach(technique => {
    const tactic = technique.tactics[0] || 'unknown';
    if (!grouped[tactic]) {
      grouped[tactic] = [];
    }
    grouped[tactic].push(technique);
  });

  return grouped;
}

/**
 * Create a threat chain from a specific attack scenario
 */
export function buildScenarioChain(allTechniques, scenarioTechniqueIds) {
  const selectedTechniques = scenarioTechniqueIds
    .map(id => allTechniques.find(t => t.id === id))
    .filter(t => t !== undefined);

  return buildThreatChain(selectedTechniques);
}

/**
 * Pre-defined mobile attack scenarios using real ATT&CK technique IDs
 */
export const attackScenarios = {
  'android-spyware': {
    title: 'Android Spyware Campaign',
    description: 'Comprehensive spyware attack targeting Android devices',
    techniqueIds: [
      'T1476', // Deliver Malicious App via Other Means
      'T1431', // Disguise Root/Jailbreak Indicators
      'T1407', // Download New Code at Runtime
      'T1402', // Broadcast Receivers
      'T1429', // Audio Capture
      'T1430', // Location Tracking
      'T1412', // Capture SMS Messages
      'T1532', // Data Encrypted
    ],
  },
  'ios-exploit': {
    title: 'iOS Privilege Escalation Attack',
    description: 'Advanced attack chain targeting iOS devices',
    techniqueIds: [
      'T1474', // Supply Chain Compromise
      'T1444', // Masquerade as Legitimate Application
      'T1461', // Lockscreen Bypass
      'T1404', // Exploit TEE/SE Vulnerability
      'T1426', // System Information Discovery
      'T1430', // Location Tracking
      'T1447', // Delete Device Data
    ],
  },
  'banking-trojan': {
    title: 'Mobile Banking Trojan',
    description: 'Financial fraud attack targeting mobile banking apps',
    techniqueIds: [
      'T1476', // Deliver Malicious App via Other Means
      'T1444', // Masquerade as Legitimate Application
      'T1411', // Capture Input
      'T1417', // Input Injection
      'T1412', // Capture SMS Messages
      'T1414', // Capture Clipboard Data
      'T1532', // Data Encrypted
    ],
  },
};

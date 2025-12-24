/**
 * Zimperium Threat Data Importer
 * Converts Zimperium threat findings into visualizable threat chains
 */

import { tacticToThreatType } from './attackService';

/**
 * Expected Zimperium threat data format:
 * {
 *   "threatName": "Banking Trojan Campaign",
 *   "deviceId": "device-12345",
 *   "timestamp": "2025-12-24T10:30:00Z",
 *   "threats": [
 *     {
 *       "id": "threat-001",
 *       "name": "Malicious App Installation",
 *       "type": "initial-access",
 *       "severity": "high",
 *       "attackId": "T1476",  // Optional ATT&CK mapping
 *       "description": "User installed app from untrusted source",
 *       "timestamp": "2025-12-24T10:00:00Z"
 *     },
 *     ...
 *   ],
 *   "relationships": [
 *     { "from": "threat-001", "to": "threat-002", "label": "Led to" }
 *   ]
 * }
 */

/**
 * Import and convert Zimperium threat data to threat chain format
 */
export function importZimperiumThreats(zimperiumData) {
  if (!zimperiumData || !zimperiumData.threats) {
    throw new Error('Invalid Zimperium threat data format');
  }

  const nodes = [];
  const edges = [];
  const threatMap = new Map();

  // Create nodes from threats
  zimperiumData.threats.forEach((threat, index) => {
    const nodeId = String(index + 1);
    threatMap.set(threat.id, nodeId);

    const isFirst = index === 0;
    const isLast = index === zimperiumData.threats.length - 1;

    nodes.push({
      id: nodeId,
      type: isFirst ? 'input' : isLast ? 'output' : 'default',
      data: {
        label: threat.name,
        threatType: threat.type || 'collection',
        severity: threat.severity || 'medium',
        attackId: threat.attackId || null,
        description: threat.description,
        timestamp: threat.timestamp,
        deviceId: zimperiumData.deviceId,
        zimperiumId: threat.id,
      },
      position: calculatePosition(index, zimperiumData.threats.length),
    });
  });

  // Create edges from relationships
  if (zimperiumData.relationships && zimperiumData.relationships.length > 0) {
    zimperiumData.relationships.forEach((rel, index) => {
      const sourceId = threatMap.get(rel.from);
      const targetId = threatMap.get(rel.to);

      if (sourceId && targetId) {
        edges.push({
          id: `e${sourceId}-${targetId}`,
          source: sourceId,
          target: targetId,
          animated: true,
          label: rel.label || '',
        });
      }
    });
  } else {
    // Auto-connect sequentially if no relationships provided
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        id: `e${nodes[i].id}-${nodes[i + 1].id}`,
        source: nodes[i].id,
        target: nodes[i + 1].id,
        animated: true,
      });
    }
  }

  return {
    nodes,
    edges,
    title: zimperiumData.threatName || 'Zimperium Threat Chain',
    deviceId: zimperiumData.deviceId,
    timestamp: zimperiumData.timestamp,
  };
}

/**
 * Calculate node position based on index and total count
 */
function calculatePosition(index, total) {
  const xSpacing = 300;
  const ySpacing = 120;
  const columns = Math.ceil(Math.sqrt(total));

  const row = Math.floor(index / columns);
  const col = index % columns;

  return {
    x: 100 + col * xSpacing,
    y: 100 + row * ySpacing,
  };
}

/**
 * Validate Zimperium threat data format
 */
export function validateZimperiumData(data) {
  const errors = [];

  if (!data) {
    errors.push('Data is null or undefined');
    return { valid: false, errors };
  }

  if (!data.threats || !Array.isArray(data.threats)) {
    errors.push('Missing or invalid "threats" array');
  }

  if (data.threats && data.threats.length === 0) {
    errors.push('Threats array is empty');
  }

  if (data.threats) {
    data.threats.forEach((threat, index) => {
      if (!threat.id) {
        errors.push(`Threat at index ${index} missing "id" field`);
      }
      if (!threat.name) {
        errors.push(`Threat at index ${index} missing "name" field`);
      }
    });
  }

  if (data.relationships && !Array.isArray(data.relationships)) {
    errors.push('Invalid "relationships" field (must be array)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Convert CSV threat data to Zimperium format
 * Expected CSV columns: id, name, type, severity, description, attackId
 */
export function parseCSVToZimperium(csvText, threatName = 'Imported Threat Chain') {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row');
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const threats = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const threat = {};

    headers.forEach((header, index) => {
      threat[header] = values[index] || '';
    });

    threats.push(threat);
  }

  return {
    threatName,
    threats,
    timestamp: new Date().toISOString(),
  };
}

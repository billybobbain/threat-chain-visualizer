/**
 * MITRE ATT&CK Mobile Data Service
 * Fetches and processes ATT&CK mobile techniques from the official STIX data repository
 */

const ATTACK_MOBILE_URL = 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/mobile-attack/mobile-attack.json';

// Cache for ATT&CK data
let cachedData = null;

/**
 * Fetch ATT&CK Mobile data from GitHub
 */
export async function fetchAttackData() {
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(ATTACK_MOBILE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch ATT&CK data: ${response.status}`);
    }
    const data = await response.json();
    cachedData = data;
    return data;
  } catch (error) {
    console.error('Error fetching ATT&CK data:', error);
    throw error;
  }
}

/**
 * Extract techniques from STIX data
 */
export function extractTechniques(stixData) {
  if (!stixData || !stixData.objects) {
    return [];
  }

  return stixData.objects
    .filter(obj => obj.type === 'attack-pattern')
    .map(pattern => ({
      id: pattern.external_references?.[0]?.external_id || 'Unknown',
      name: pattern.name,
      description: pattern.description,
      tactics: pattern.kill_chain_phases?.map(phase => phase.phase_name) || [],
      platforms: pattern.x_mitre_platforms || [],
      url: pattern.external_references?.[0]?.url || '',
      stixId: pattern.id,
    }));
}

/**
 * Extract tactics (kill chain phases) from STIX data
 */
export function extractTactics(stixData) {
  if (!stixData || !stixData.objects) {
    return [];
  }

  const tacticsSet = new Set();

  stixData.objects
    .filter(obj => obj.type === 'attack-pattern')
    .forEach(pattern => {
      pattern.kill_chain_phases?.forEach(phase => {
        tacticsSet.add(phase.phase_name);
      });
    });

  return Array.from(tacticsSet);
}

/**
 * Get techniques by tactic
 */
export function getTechniquesByTactic(techniques, tactic) {
  return techniques.filter(t => t.tactics.includes(tactic));
}

/**
 * Map ATT&CK tactic to threat type color
 */
export function tacticToThreatType(tactic) {
  const mapping = {
    'initial-access': 'initial-access',
    'execution': 'execution',
    'persistence': 'persistence',
    'privilege-escalation': 'privilege-escalation',
    'defense-evasion': 'collection',
    'credential-access': 'collection',
    'discovery': 'collection',
    'lateral-movement': 'collection',
    'collection': 'collection',
    'command-and-control': 'exfiltration',
    'exfiltration': 'exfiltration',
    'impact': 'impact',
  };

  return mapping[tactic] || 'collection';
}

/**
 * Determine severity based on technique characteristics
 */
export function determineSeverity(technique) {
  // Simple heuristic: privilege escalation and impact are critical
  if (technique.tactics.includes('privilege-escalation') ||
      technique.tactics.includes('impact')) {
    return 'critical';
  }

  if (technique.tactics.includes('initial-access') ||
      technique.tactics.includes('execution')) {
    return 'high';
  }

  if (technique.tactics.includes('persistence') ||
      technique.tactics.includes('collection')) {
    return 'medium';
  }

  return 'medium';
}

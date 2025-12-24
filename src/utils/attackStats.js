/**
 * Utility to analyze ATT&CK data statistics
 */

export function getAttackStats(stixData) {
  if (!stixData || !stixData.objects) {
    return null;
  }

  const stats = {
    techniques: 0,
    subTechniques: 0,
    groups: 0,
    software: 0,
    campaigns: 0,
    mitigations: 0,
    tactics: new Set(),
  };

  stixData.objects.forEach(obj => {
    switch (obj.type) {
      case 'attack-pattern':
        if (obj.x_mitre_is_subtechnique) {
          stats.subTechniques++;
        } else {
          stats.techniques++;
        }
        // Collect tactics
        obj.kill_chain_phases?.forEach(phase => {
          stats.tactics.add(phase.phase_name);
        });
        break;
      case 'intrusion-set':
        stats.groups++;
        break;
      case 'malware':
      case 'tool':
        stats.software++;
        break;
      case 'campaign':
        stats.campaigns++;
        break;
      case 'course-of-action':
        stats.mitigations++;
        break;
    }
  });

  stats.tactics = stats.tactics.size;

  return stats;
}

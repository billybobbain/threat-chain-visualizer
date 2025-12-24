import { Handle, Position } from '@xyflow/react';
import { threatTypeColors, severityColors } from '../data/sampleThreatChains';

const ThreatNode = ({ data, isConnectable }) => {
  const threatColor = threatTypeColors[data.threatType] || '#666666';
  const severityColor = severityColors[data.severity] || '#999999';

  const handleAttackLinkClick = (e) => {
    if (data.url) {
      e.stopPropagation();
      window.open(data.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="threat-node"
      style={{
        borderLeftColor: threatColor,
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid',
      }}
      title={data.description || data.label}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: threatColor }}
      />
      <div className="threat-node-content">
        <div className="threat-node-label">{data.label}</div>
        <div className="threat-node-meta">
          <span
            className="severity-badge"
            style={{
              backgroundColor: severityColor,
              color: 'white',
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: '3px',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}
          >
            {data.severity}
          </span>
          {data.attackId && (
            <span
              className="attack-id-badge"
              onClick={handleAttackLinkClick}
              style={{
                backgroundColor: '#00bcd4',
                color: 'white',
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '3px',
                fontWeight: '600',
                cursor: data.url ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
              }}
              title={data.url ? 'Click to view on MITRE ATT&CK' : data.attackId}
            >
              {data.attackId}
            </span>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: threatColor }}
      />
    </div>
  );
};

export default ThreatNode;

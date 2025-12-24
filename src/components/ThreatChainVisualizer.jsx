import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './ThreatChainVisualizer.css';
import ThreatNode from './ThreatNode';

const ThreatChainVisualizer = ({ initialNodes, initialEdges, title }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ default: ThreatNode }), []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="threat-chain-container">
      <div className="threat-chain-header">
        <h2>{title || 'Threat Chain Visualization'}</h2>
        <div className="legend">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#2196F3' }}></span>
            <span>Initial Access</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#9C27B0' }}></span>
            <span>Execution</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#FF9800' }}></span>
            <span>Persistence</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#F44336' }}></span>
            <span>Privilege Escalation</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#673AB7' }}></span>
            <span>Collection</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#E91E63' }}></span>
            <span>Exfiltration</span>
          </div>
        </div>
      </div>
      <div className="reactflow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ThreatChainVisualizer;

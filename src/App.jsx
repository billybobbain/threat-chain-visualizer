import { useState } from 'react';
import ThreatChainVisualizer from './components/ThreatChainVisualizer';
import AttackChainLoader from './components/AttackChainLoader';
import ZimperiumImporter from './components/ZimperiumImporter';
import { sampleThreatChain1, sampleThreatChain2 } from './data/sampleThreatChains';
import './App.css';

function App() {
  const [mode, setMode] = useState('threat-data'); // 'threat-data', 'attack', or 'sample'
  const [currentChain, setCurrentChain] = useState(1);

  // Zimperium Import Mode
  if (mode === 'threat-data') {
    return (
      <div className="app">
        <div className="mode-selector">
          <button 
            className={mode === 'threat-data' ? 'active' : ''}
            onClick={() => setMode('threat-data')}
          >
            Threat Data
          </button>
          <button 
            className={mode === 'attack' ? 'active' : ''}
            onClick={() => setMode('attack')}
          >
            MITRE ATT&CK
          </button>
          <button 
            className={mode === 'sample' ? 'active' : ''}
            onClick={() => setMode('sample')}
          >
            Sample Scenarios
          </button>
        </div>
        <ZimperiumImporter />
      </div>
    );
  }

  // MITRE ATT&CK Mode
  if (mode === 'attack') {
    return (
      <div className="app">
        <div className="mode-selector">
          <button 
            className={mode === 'threat-data' ? 'active' : ''}
            onClick={() => setMode('threat-data')}
          >
            Threat Data
          </button>
          <button 
            className={mode === 'attack' ? 'active' : ''}
            onClick={() => setMode('attack')}
          >
            MITRE ATT&CK
          </button>
          <button 
            className={mode === 'sample' ? 'active' : ''}
            onClick={() => setMode('sample')}
          >
            Sample Scenarios
          </button>
        </div>
        <AttackChainLoader />
      </div>
    );
  }

  // Sample Mode
  const threatChain = currentChain === 1 ? sampleThreatChain1 : sampleThreatChain2;
  const title = currentChain === 1 
    ? 'Mobile Malware Attack Chain' 
    : 'Advanced Persistent Threat Chain';

  return (
    <div className="app">
      <div className="mode-selector">
        <button 
          className={mode === 'threat-data' ? 'active' : ''}
          onClick={() => setMode('threat-data')}
        >
          Threat Data
        </button>
        <button 
          className={mode === 'attack' ? 'active' : ''}
          onClick={() => setMode('attack')}
        >
          MITRE ATT&CK
        </button>
        <button 
          className={mode === 'sample' ? 'active' : ''}
          onClick={() => setMode('sample')}
        >
          Sample Scenarios
        </button>
      </div>
      <div className="app-controls">
        <button 
          className={currentChain === 1 ? 'active' : ''}
          onClick={() => setCurrentChain(1)}
        >
          Scenario 1: Mobile Malware
        </button>
        <button 
          className={currentChain === 2 ? 'active' : ''}
          onClick={() => setCurrentChain(2)}
        >
          Scenario 2: APT Attack
        </button>
      </div>
      <ThreatChainVisualizer 
        key={currentChain}
        initialNodes={threatChain.nodes} 
        initialEdges={threatChain.edges}
        title={title}
      />
    </div>
  );
}

export default App;

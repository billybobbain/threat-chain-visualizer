import { useState, useEffect } from 'react';
import ThreatChainVisualizer from './ThreatChainVisualizer';
import { fetchAttackData, extractTechniques } from '../services/attackService';
import { buildScenarioChain, attackScenarios } from '../services/threatChainBuilder';
import './AttackChainLoader.css';

const AttackChainLoader = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [techniques, setTechniques] = useState([]);
  const [currentScenario, setCurrentScenario] = useState('android-spyware');
  const [threatChain, setThreatChain] = useState({ nodes: [], edges: [] });

  // Load ATT&CK data on mount
  useEffect(() => {
    const loadAttackData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAttackData();
        const extractedTechniques = extractTechniques(data);
        setTechniques(extractedTechniques);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadAttackData();
  }, []);

  // Build threat chain when scenario changes
  useEffect(() => {
    if (techniques.length > 0) {
      const scenario = attackScenarios[currentScenario];
      const chain = buildScenarioChain(techniques, scenario.techniqueIds);
      chain.title = scenario.title;
      chain.description = scenario.description;
      setThreatChain(chain);
    }
  }, [currentScenario, techniques]);

  if (loading) {
    return (
      <div className="attack-loader">
        <div className="loader-content">
          <div className="spinner"></div>
          <h2>Loading MITRE ATT&CK Mobile Data...</h2>
          <p>Fetching latest threat intelligence from MITRE</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="attack-loader error">
        <div className="loader-content">
          <h2>Error Loading ATT&CK Data</h2>
          <p>{error}</p>
          <p>The app will continue with sample data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="attack-chain-container">
      <div className="scenario-selector">
        <div className="scenario-info">
          <h3>MITRE ATT&CK Mobile Scenarios</h3>
          <p className="scenario-description">
            {attackScenarios[currentScenario].description}
          </p>
          <p className="data-info">
            Loaded {techniques.length} mobile techniques from ATT&CK
          </p>
        </div>
        <div className="scenario-buttons">
          {Object.entries(attackScenarios).map(([key, scenario]) => (
            <button
              key={key}
              className={currentScenario === key ? 'active' : ''}
              onClick={() => setCurrentScenario(key)}
            >
              {scenario.title}
            </button>
          ))}
        </div>
      </div>
      <ThreatChainVisualizer
        key={currentScenario}
        initialNodes={threatChain.nodes}
        initialEdges={threatChain.edges}
        title={threatChain.title}
      />
    </div>
  );
};

export default AttackChainLoader;

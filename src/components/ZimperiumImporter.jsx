import { useState } from 'react';
import ThreatChainVisualizer from './ThreatChainVisualizer';
import { importZimperiumThreats, validateZimperiumData } from '../services/zimperiumImporter';
import './ZimperiumImporter.css';

const ZimperiumImporter = () => {
  const [threatChain, setThreatChain] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const zimperiumData = JSON.parse(e.target.result);

        // Validate data
        const validation = validateZimperiumData(zimperiumData);
        if (!validation.valid) {
          setError(`Invalid data format:\n${validation.errors.join('\n')}`);
          return;
        }

        // Import and convert to threat chain
        const chain = importZimperiumThreats(zimperiumData);
        setThreatChain(chain);
        setMetadata({
          deviceId: zimperiumData.deviceId,
          deviceModel: zimperiumData.deviceModel,
          osVersion: zimperiumData.osVersion,
          timestamp: zimperiumData.timestamp,
          severity: zimperiumData.severity,
          threatCount: zimperiumData.threats.length,
          zimperiumMetadata: zimperiumData.zimperiumMetadata,
        });
      } catch (err) {
        setError(`Error parsing file: ${err.message}`);
      }
    };

    reader.readAsText(file);
  };

  const handleClear = () => {
    setThreatChain(null);
    setError(null);
    setFileName(null);
    setMetadata(null);
  };

  if (threatChain) {
    return (
      <div className="zimperium-viewer">
        <div className="zimperium-header">
          <div className="zimperium-info">
            <h3>Threat Detection Data</h3>
            <div className="metadata-grid">
              {metadata.deviceId && (
                <div className="metadata-item">
                  <span className="label">Device ID:</span>
                  <span className="value">{metadata.deviceId}</span>
                </div>
              )}
              {metadata.deviceModel && (
                <div className="metadata-item">
                  <span className="label">Device:</span>
                  <span className="value">{metadata.deviceModel}</span>
                </div>
              )}
              {metadata.osVersion && (
                <div className="metadata-item">
                  <span className="label">OS:</span>
                  <span className="value">{metadata.osVersion}</span>
                </div>
              )}
              {metadata.timestamp && (
                <div className="metadata-item">
                  <span className="label">Detected:</span>
                  <span className="value">{new Date(metadata.timestamp).toLocaleString()}</span>
                </div>
              )}
              <div className="metadata-item">
                <span className="label">Threats:</span>
                <span className="value">{metadata.threatCount}</span>
              </div>
              {metadata.zimperiumMetadata?.riskLevel && (
                <div className="metadata-item">
                  <span className="label">Risk:</span>
                  <span className={`value risk-${metadata.zimperiumMetadata.riskLevel}`}>
                    {metadata.zimperiumMetadata.riskLevel.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="file-info">
              Loaded from: <strong>{fileName}</strong>
            </div>
          </div>
          <button className="clear-button" onClick={handleClear}>
            Load Different File
          </button>
        </div>
        <ThreatChainVisualizer
          initialNodes={threatChain.nodes}
          initialEdges={threatChain.edges}
          title={threatChain.title}
        />
      </div>
    );
  }

  return (
    <div className="zimperium-import">
      <div className="import-container">
        <div className="import-header">
          <h2>Import Threat Detection Data</h2>
          <p>Upload a JSON file containing threat detection data from your security platform to visualize the attack chain</p>
        </div>

        {error && (
          <div className="error-message">
            <strong>Error:</strong>
            <pre>{error}</pre>
          </div>
        )}

        <div className="upload-area">
          <input
            type="file"
            id="file-upload"
            accept=".json"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="file-upload" className="upload-button">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Click to Upload JSON File</span>
            <span className="upload-hint">or drag and drop</span>
          </label>
        </div>

        <div className="format-info">
          <h3>Expected JSON Format</h3>
          <div className="format-example">
            <pre>{`{
  "threatName": "Banking Trojan Attack",
  "deviceId": "device-12345",
  "timestamp": "2025-12-24T10:30:00Z",
  "threats": [
    {
      "id": "threat-001",
      "name": "Malicious App Installation",
      "type": "initial-access",
      "severity": "high",
      "attackId": "T1476",
      "description": "..."
    }
  ],
  "relationships": [
    { "from": "threat-001", "to": "threat-002" }
  ]
}`}</pre>
          </div>
          <a
            href="/examples/threat-data-example.json"
            download
            className="download-example"
          >
            Download Example File
          </a>
        </div>
      </div>
    </div>
  );
};

export default ZimperiumImporter;

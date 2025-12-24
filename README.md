# Threat Chain Visualizer

An interactive web-based tool for visualizing mobile threat attack chains using MITRE ATT&CK framework and real threat intelligence data.

![Threat Chain Visualization](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646cff?logo=vite&logoColor=white)
![MITRE ATT&CK](https://img.shields.io/badge/MITRE-ATT%26CK%20v18-red)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

Threat Chain Visualizer transforms complex mobile security threats into intuitive, interactive visual graphs. Built for security researchers, incident responders, and threat analysts working with mobile platforms.

## Features

### 🎯 Three Visualization Modes

#### 1. **Threat Data Import**
- Upload JSON threat detection data
- Visualize real mobile security incidents
- Display device metadata and threat relationships
- Auto-validate data format
- Example template included

#### 2. **MITRE ATT&CK Integration**
- Live data from MITRE ATT&CK Mobile (v18)
- 77+ documented mobile threat techniques
- Pre-built attack scenarios:
  - Android Spyware Campaign
  - iOS Privilege Escalation Attack
  - Mobile Banking Trojan
- Clickable technique IDs linking to official documentation

#### 3. **Sample Scenarios**
- Demonstration threat chains
- Educational examples
- Quick proof-of-concept

### ✨ Core Capabilities

- **Interactive Graph Visualization**: Powered by React Flow
- **Drag & Drop**: Rearrange nodes for optimal viewing
- **Zoom & Pan**: Explore complex attack chains
- **Color-Coded Stages**: Visual distinction by threat type
- **Severity Indicators**: Critical, High, Medium, Low badges
- **Animated Edges**: Show attack flow and progression
- **Dark Theme**: Professional security-focused UI
- **Responsive Design**: Works on various screen sizes

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/threat-chain-visualizer.git
cd threat-chain-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Visit \`http://localhost:5173\` in your browser.

### Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Usage

### Importing Threat Data

The visualizer accepts JSON files in the following format:

\`\`\`json
{
  "threatName": "Banking Trojan Campaign",
  "deviceId": "device-12345",
  "deviceModel": "Samsung Galaxy S24",
  "osVersion": "Android 14",
  "timestamp": "2025-12-24T10:30:00Z",
  "threats": [
    {
      "id": "threat-001",
      "name": "Malicious App Installation",
      "type": "initial-access",
      "severity": "high",
      "attackId": "T1476",
      "description": "User installed app from untrusted source"
    }
  ],
  "relationships": [
    { "from": "threat-001", "to": "threat-002", "label": "Led to" }
  ]
}
\`\`\`

See \`examples/zimperium-threat-example.json\` for a complete example.

### Threat Types

- \`initial-access\` - Entry point attacks
- \`execution\` - Code execution techniques
- \`persistence\` - Maintaining device presence
- \`privilege-escalation\` - Gaining higher privileges
- \`collection\` - Data gathering operations
- \`exfiltration\` - Data theft
- \`impact\` - Final attack objectives

## Technology Stack

- **Frontend**: React 18.3
- **Build Tool**: Vite 7.3
- **Visualization**: React Flow (@xyflow/react)
- **Threat Intelligence**: MITRE ATT&CK Mobile Matrix
- **Styling**: CSS3 with custom dark theme

## Project Structure

\`\`\`
threat-chain-visualizer/
├── src/
│   ├── components/          # React components
│   ├── services/           # Data services & importers
│   ├── data/              # Sample data
│   └── utils/             # Utility functions
├── examples/              # Example threat data files
├── public/               # Static assets
└── README.md
\`\`\`

## MITRE ATT&CK Integration

This tool leverages the official MITRE ATT&CK Mobile matrix (v18, October 2025):
- **77 Techniques** for mobile platforms
- **12 Tactical Categories**
- **Real-time data** from MITRE's GitHub repository

Data source: [mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data)

## Use Cases

- **Incident Response**: Visualize detected threats for investigation
- **Threat Hunting**: Map attack patterns and TTPs
- **Security Research**: Analyze mobile threat campaigns
- **Training & Education**: Demonstrate attack chains
- **Reporting**: Generate visual threat reports
- **Pattern Analysis**: Identify common attack flows

## Roadmap

- [ ] Export visualizations as PNG/SVG
- [ ] STIX 2.0 import/export
- [ ] Real-time threat feed integration
- [ ] Multi-device attack correlation
- [ ] Custom node styling options
- [ ] API endpoint for programmatic access
- [ ] Threat mitigation recommendations

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## License

MIT License - See LICENSE file for details

## Acknowledgments

- [MITRE ATT&CK](https://attack.mitre.org/) for the threat intelligence framework
- [React Flow](https://reactflow.dev/) for the visualization library
- Mobile security community for threat research

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Built for mobile security professionals** | Visualize threats, understand attacks, defend better

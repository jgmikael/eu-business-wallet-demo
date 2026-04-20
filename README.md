# EU Business Wallet - Technical Reference Architecture Demo

**Interactive demonstration of the EU Business Wallet technical architecture**

🌐 **Live Demo:** [https://jgmikael.github.io/eu-business-wallet-demo](https://jgmikael.github.io/eu-business-wallet-demo)

---

## Overview

This is a public architectural demonstrator for the future **EU Business Wallet (EBW)** technical reference architecture. It presents a six-layer interoperability model where semantic foundations remain stable while syntax bindings, credential formats, and exchange protocols are treated as replaceable layers.

### Core Architecture Principle

> **"Semantic interoperability is mandatory; syntax, credential envelope, and protocol are replaceable bindings."**

This demo makes this principle tangible through interactive exploration of semantic models, payload formats, exchange protocols, trust services, and governance mechanisms.

---

## Architecture Layers

The demo presents six architectural layers:

### 1. **Canonical Semantic Foundation**
- RDF / RDFS / OWL / SKOS
- Persistent URIs
- Shared vocabularies and concept schemes

### 2. **Semantic Application Profiles**
- SHACL shapes
- Code lists
- Profile rules
- Mapping artifacts

### 3. **Exchange Objects & Syntax Bindings**
- W3C Verifiable Credentials Data Model 2.0
- JSON-LD (preferred)
- XML (legacy/alternative)
- Plain JSON
- PDF (human-facing only)

### 4. **Interaction & Exchange Protocols**
- OpenID4VCI / OpenID4VP (wallet flows)
- APIs / Events
- eDelivery / AS4 (backend exchange)

### 5. **Trust Services & Trusted Delivery**
- eSignatures
- eSeals
- Timestamps
- QERDS (Qualified Electronic Registered Delivery Services)
- Delivery evidence

### 6. **Governance, Conformance & Audit**
- Policy frameworks
- Assurance mechanisms
- Revocation
- Traceability
- Audit trails
- Versioning
- Conformance testing

---

## Demo Features

### Interactive Components

- **Architecture Overview** - Clickable six-layer diagram with explanations
- **Semantic Core Explorer** - Browse RDF/OWL/SKOS/SHACL models
- **Multi-Format Payloads** - Compare JSON-LD VC, JSON, XML representations
- **Protocol Flows** - Visualize OpenID4VC, eDelivery, QERDS exchanges
- **Trust Services** - Understand signatures, seals, timestamps, QERDS
- **Governance Dashboard** - Explore lifecycle, conformance, audit
- **Scenario Walkthroughs** - Two realistic business scenarios

### Sample Semantic Model

Demonstrator uses a compact business identity model:

- **EconomicOperator** (company)
- **NaturalPersonRepresentative** (authorized person)
- **Mandate** (authorization to act)
- **VATIdentifier** (business tax ID)
- **CompanyCertificate** (registration proof)
- **Authorisation** (permissions)
- **DeliveryEvidence** (proof of delivery)

---

## Running Locally

### Prerequisites

- Node.js 18+ and npm

### Quick Start

```bash
# Clone repository
git clone https://github.com/jgmikael/eu-business-wallet-demo.git
cd eu-business-wallet-demo

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

### Build for Production

```bash
# Static export
npm run build
npm run export

# Output in out/ directory
```

---

## Repository Structure

```
eu-business-wallet-demo/
├── public/data/          # Sample semantic models and payloads
│   ├── semantic/         # Turtle, SHACL, SKOS files
│   └── payloads/         # JSON-LD, JSON, XML examples
├── src/
│   ├── app/              # Next.js pages (architecture, semantic, etc.)
│   ├── components/       # Interactive React components
│   └── styles/           # Global CSS
├── docs/                 # Architecture documentation
└── README.md
```

---

## Deployment

### GitHub Pages

This demo is configured for GitHub Pages deployment:

```bash
npm run build
npm run export
# Push to gh-pages branch
```

Alternatively, use Vercel or Netlify for automatic deployments.

---

## Sample Data Files

The repository includes realistic example files:

- **Turtle vocabularies** (`vocabulary.ttl`) - OWL classes and properties
- **SHACL shapes** (`shapes.ttl`) - Application profile constraints
- **SKOS concepts** (`concepts.ttl`) - Terminology and code lists
- **JSON-LD VC** (`company-vc.jsonld`) - W3C VC 2.0 format
- **Plain JSON** (`company-plain.json`) - Alternative syntax
- **XML** (`company-mandate.xml`) - Legacy format example

---

## Key Concepts Demonstrated

### Semantic Stability, Syntax Flexibility

The same **EconomicOperator** semantic object can be serialized as:
- JSON-LD Verifiable Credential (wallet-native)
- Plain JSON (API-friendly)
- XML (legacy systems)
- PDF (human-readable)

All formats map to the same RDF/OWL semantic model.

### Protocol Agnosticism

Exchange flows operate above the payload layer:
- **OpenID4VCI** - Issue credentials to wallet
- **OpenID4VP** - Present credentials to verifier
- **eDelivery/AS4** - Backend business document exchange
- **QERDS** - Legally significant trusted delivery

### Trust Layer Separation

Trust services (signatures, seals, timestamps, delivery evidence) are **orthogonal to semantics**:
- Signatures prove authorship
- Timestamps prove temporal ordering
- QERDS proves trusted delivery
- None of these are part of the semantic model itself

---

## Target Audience

This demo is designed for:

- EU policymakers and digital identity experts
- Semantic interoperability specialists
- Trust service providers
- Architecture and standards practitioners
- Public-sector digitalization stakeholders

---

## Limitations & Future Enhancements

### Current Scope

- Static demonstrator (no live issuance/verification)
- Simplified semantic models (production would be more extensive)
- Illustrative flows (not production-ready protocol implementations)

### Potential Extensions

- Full RDF graph visualization
- Live SHACL validation engine
- Integration with actual trust service providers
- Multi-language support
- Extended semantic models (eIDAS 2.0, EBSI, etc.)

---

## Standards & References

- **W3C Verifiable Credentials Data Model 2.0** - [https://www.w3.org/TR/vc-data-model-2.0/](https://www.w3.org/TR/vc-data-model-2.0/)
- **W3C RDF/OWL/SKOS** - Semantic Web standards
- **SHACL** - Shapes Constraint Language
- **OpenID for Verifiable Credentials** - [https://openid.net/sg/openid4vc/](https://openid.net/sg/openid4vc/)
- **eDelivery** - EU CEF Building Block
- **eIDAS Regulation** - EU 910/2014 and eIDAS 2.0
- **QERDS** - Qualified Electronic Registered Delivery Services

---

## License

MIT License - See LICENSE file

---

## Contact & Contributions

- **Repository:** [https://github.com/jgmikael/eu-business-wallet-demo](https://github.com/jgmikael/eu-business-wallet-demo)
- **Issues:** [GitHub Issues](https://github.com/jgmikael/eu-business-wallet-demo/issues)
- **Author:** Mikael af Hällström

Contributions welcome! Please see CONTRIBUTING.md for guidelines.

---

## Acknowledgments

This demonstrator is an independent technical reference. It is not an official EU publication, but rather a contribution to the public discourse on European digital identity infrastructure architecture.

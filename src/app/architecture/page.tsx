'use client'

import { useState } from 'react'

const layers = [
  {
    id: 1,
    title: '1. Canonical Semantic Foundation',
    description: 'The stable, authoritative core of interoperability',
    details: `This layer defines the semantic meaning of business concepts using W3C semantic web standards:
    
• RDF (Resource Description Framework) - the foundation for expressing statements about resources
• RDFS (RDF Schema) - vocabulary description language
• OWL (Web Ontology Language) - rich semantic modeling with inference capabilities
• SKOS (Simple Knowledge Organization System) - concept schemes and taxonomies
• Persistent URIs - stable, globally unique identifiers for concepts

Example: https://ebw.europa.eu/vocabulary/EconomicOperator

This layer ensures that regardless of syntax or protocol, the meaning remains consistent and machine-interpretable.`,
    color: '#001a66'
  },
  {
    id: 2,
    title: '2. Semantic Application Profiles',
    description: 'Constraints and rules for specific use cases',
    details: `Application profiles refine the generic semantic model for specific contexts:

• SHACL Shapes - validation constraints ensuring data quality
• Code lists - controlled vocabularies for specific domains
• Profile rules - business logic and cardinality constraints
• Mapping artifacts - transformations between different semantic models

Example: A SHACL shape requiring that every EconomicOperator must have at least one representative.

This layer enables governance and conformance testing while maintaining semantic consistency.`,
    color: '#003399'
  },
  {
    id: 3,
    title: '3. Exchange Objects & Syntax Bindings',
    description: 'Multiple serialization formats above one semantic core',
    details: `The same semantic object can be represented in multiple syntaxes:

• W3C Verifiable Credentials Data Model 2.0 (JSON-LD) - preferred wallet-native format
• Plain JSON - for APIs and legacy systems
• XML - for traditional EDI and government systems
• PDF - human-readable rendition only (not a semantic source)

Key principle: Syntax is replaceable. A company identity can be:
- A JSON-LD Verifiable Credential for wallet presentation
- Plain JSON for REST API exchange
- XML for eDelivery backend integration

All map to the same RDF semantic model.`,
    color: '#0066cc'
  },
  {
    id: 4,
    title: '4. Interaction & Exchange Protocols',
    description: 'How objects are exchanged between parties',
    details: `Multiple protocols can operate above the same payload objects:

• OpenID for Verifiable Credential Issuance (OpenID4VCI) - issuing credentials to wallets
• OpenID for Verifiable Presentations (OpenID4VP) - presenting credentials to verifiers
• REST APIs - synchronous request/response patterns
• Event-driven - asynchronous notifications and webhooks
• eDelivery / AS4 - legally significant backend document exchange

Example workflow:
1. Company registry issues a CompanyIdentityCredential using OpenID4VCI
2. Company stores it in their EU Business Wallet
3. Company presents it to a public service using OpenID4VP
4. Legally significant notice is delivered via eDelivery/QERDS

Protocols are independent of semantics.`,
    color: '#3399ff'
  },
  {
    id: 5,
    title: '5. Trust Services & Trusted Delivery',
    description: 'Cryptographic integrity and evidentiary services',
    details: `Trust services provide cryptographic assurance and legal evidence:

• eSignatures - non-repudiation and authorship proof
• eSeals - organizational signatures for automated processes
• Timestamps - qualified temporal evidence
• QERDS (Qualified Electronic Registered Delivery Services) - legally significant proof of delivery

Critical distinction:
- Signatures/seals prove WHO issued the data
- Timestamps prove WHEN
- QERDS proves DELIVERY occurred

These are orthogonal to the semantic model. A company credential can be:
- Signed by the issuer (eSignature/eSeal)
- Timestamped at issuance
- Delivered with QERDS evidence

None of these change the semantic meaning of "EconomicOperator".`,
    color: '#66b3ff'
  },
  {
    id: 6,
    title: '6. Governance, Conformance & Audit',
    description: 'Lifecycle management and accountability',
    details: `Essential governance mechanisms for production systems:

• Policy frameworks - rules for issuance, validation, and acceptance
• Conformance testing - ensuring implementations meet profile requirements
• Revocation - invalidating credentials when needed
• Traceability - audit trails for all operations
• Versioning - managing evolution of semantic models and profiles
• Supervision - oversight of trust service providers and issuers

Example governance flow:
1. Credential schema published with version 1.0
2. Issuers must conform to SHACL validation rules
3. All issuances logged for audit
4. Revocation list maintained and published
5. Annual conformance assessment required

Governance ensures trust and interoperability at scale.`,
    color: '#99ccff'
  }
]

export default function ArchitecturePage() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null)

  return (
    <>
      <section>
        <h2>Six-Layer Technical Architecture</h2>
        
        <p>
          The EU Business Wallet reference architecture is structured in six distinct layers. 
          Click each layer to explore its role and technical details.
        </p>

        <div style={{ marginTop: '30px' }}>
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="architecture-layer"
              onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
              style={{ borderLeftColor: layer.color }}
            >
              <h3 style={{ color: layer.color }}>{layer.title}</h3>
              <p style={{ marginBottom: selectedLayer === layer.id ? '15px' : 0 }}>
                {layer.description}
              </p>
              
              {selectedLayer === layer.id && (
                <div style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '6px',
                  border: `2px solid ${layer.color}`,
                  marginTop: '15px'
                }}>
                  <pre style={{
                    whiteSpace: 'pre-wrap',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.95em',
                    lineHeight: 1.7
                  }}>
                    {layer.details}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #e6f0ff 0%, #cce0ff 100%)',
          borderLeft: '5px solid var(--eu-blue)',
          padding: '25px',
          borderRadius: '8px',
          marginTop: '40px'
        }}>
          <h3 style={{ marginTop: 0 }}>Key Architectural Insights</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>Layers 1-2 are stable:</strong> Semantic foundation and profiles change slowly through governance
            </li>
            <li>
              <strong>Layers 3-4 are replaceable:</strong> Multiple syntaxes and protocols can coexist
            </li>
            <li>
              <strong>Layer 5 is orthogonal:</strong> Trust services apply to any payload/protocol combination
            </li>
            <li>
              <strong>Layer 6 spans all layers:</strong> Governance applies to semantics, formats, protocols, and trust
            </li>
          </ul>
        </div>

        <div style={{
          background: '#fff3cd',
          borderLeft: '5px solid #ffc107',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '30px'
        }}>
          <h4 style={{ marginTop: 0 }}>Why This Matters</h4>
          <p style={{ marginBottom: '10px' }}>
            This layered architecture enables:
          </p>
          <ul style={{ marginBottom: 0 }}>
            <li><strong>Future-proofing:</strong> New protocols (e.g., OpenID4VC extensions) can be adopted without changing semantics</li>
            <li><strong>Legacy integration:</strong> XML-based systems can participate via semantic mapping</li>
            <li><strong>Flexibility:</strong> Wallets can use JSON-LD VCs while backend systems use eDelivery</li>
            <li><strong>Trust:</strong> Signatures, seals, and QERDS work regardless of payload format</li>
            <li><strong>Governance:</strong> Centralized semantic governance with decentralized implementation</li>
          </ul>
        </div>
      </section>
    </>
  )
}

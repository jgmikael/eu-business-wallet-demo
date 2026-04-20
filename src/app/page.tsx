'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  return (
    <>
      <section>
        <h2>{t.home.title} - {t.home.subtitle}</h2>
        
        <p style={{ fontSize: '1.1em' }}>
          <strong>{t.home.tagline}</strong>
        </p>

        <p>
          {t.home.description}
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #e6f0ff 0%, #cce0ff 100%)',
          borderLeft: '5px solid var(--eu-blue)',
          padding: '25px',
          borderRadius: '8px',
          margin: '30px 0'
        }}>
          <h3 style={{ marginTop: 0 }}>Core Architecture Principle</h3>
          <p style={{ fontSize: '1.2em', fontWeight: 500, color: 'var(--eu-blue)', marginBottom: 0 }}>
            "Semantic interoperability is mandatory; syntax, credential envelope, and protocol are replaceable bindings."
          </p>
        </div>

        <h3>Six Architecture Layers</h3>
        
        <div className="card-grid">
          <div className="card">
            <h4>1. Canonical Semantic Foundation</h4>
            <p>RDF, RDFS, OWL, SKOS - persistent URIs and shared vocabularies</p>
            <span className="badge badge-primary">Stable Core</span>
          </div>

          <div className="card">
            <h4>2. Semantic Application Profiles</h4>
            <p>SHACL shapes, code lists, profile rules, mapping artifacts</p>
            <span className="badge badge-primary">Constraints</span>
          </div>

          <div className="card">
            <h4>3. Exchange Objects & Syntax</h4>
            <p>W3C VC 2.0 (JSON-LD), plain JSON, XML, PDF renditions</p>
            <span className="badge badge-success">Replaceable</span>
          </div>

          <div className="card">
            <h4>4. Interaction Protocols</h4>
            <p>OpenID4VCI/VP, APIs, eDelivery/AS4</p>
            <span className="badge badge-success">Replaceable</span>
          </div>

          <div className="card">
            <h4>5. Trust Services</h4>
            <p>eSignatures, eSeals, timestamps, QERDS</p>
            <span className="badge badge-warning">Trust Layer</span>
          </div>

          <div className="card">
            <h4>6. Governance & Audit</h4>
            <p>Policy, assurance, revocation, conformance</p>
            <span className="badge badge-warning">Governance</span>
          </div>
        </div>

        <h3>Demo Features</h3>

        <ul style={{ lineHeight: 1.8 }}>
          <li><strong>Architecture Explorer</strong> - Navigate the six-layer model with detailed explanations</li>
          <li><strong>Semantic Core Browser</strong> - Inspect RDF/OWL vocabularies, SHACL shapes, and SKOS concepts</li>
          <li><strong>Multi-Format Payloads</strong> - Compare JSON-LD VC, plain JSON, and XML representations of the same semantic object</li>
          <li><strong>Protocol Visualizer</strong> - See how OpenID4VC, eDelivery, and QERDS operate above the payload layer</li>
          <li><strong>Trust Services Explainer</strong> - Understand signatures, seals, timestamps, and qualified delivery</li>
          <li><strong>Governance Dashboard</strong> - Explore conformance, revocation, and audit mechanisms</li>
          <li><strong>Scenario Walkthroughs</strong> - Two realistic business scenarios with step-by-step flows</li>
        </ul>

        <h3>Sample Semantic Model</h3>

        <p>The demonstrator uses a simplified but realistic business identity model:</p>

        <div className="card-grid">
          <div className="card">
            <h4>EconomicOperator</h4>
            <p>A legal entity (company) engaged in economic activity</p>
          </div>
          <div className="card">
            <h4>NaturalPersonRepresentative</h4>
            <p>Authorized person acting on behalf of the company</p>
          </div>
          <div className="card">
            <h4>Mandate</h4>
            <p>Authorization granting specific powers</p>
          </div>
          <div className="card">
            <h4>VATIdentifier</h4>
            <p>Tax registration identifier</p>
          </div>
          <div className="card">
            <h4>CompanyCertificate</h4>
            <p>Official registration certificate</p>
          </div>
          <div className="card">
            <h4>DeliveryEvidence</h4>
            <p>Proof of trusted delivery (QERDS)</p>
          </div>
        </div>

        <h3>Target Audience</h3>

        <p>This demo is designed for:</p>
        <ul>
          <li>EU policymakers and digital identity experts</li>
          <li>Semantic interoperability specialists</li>
          <li>Trust service providers</li>
          <li>Architecture and standards practitioners</li>
          <li>Public-sector digitalization stakeholders</li>
        </ul>

        <div style={{
          background: '#fff3cd',
          borderLeft: '5px solid #ffc107',
          padding: '20px',
          borderRadius: '8px',
          margin: '30px 0'
        }}>
          <h4 style={{ marginTop: 0 }}>Note</h4>
          <p style={{ marginBottom: 0 }}>
            This is a <strong>technical demonstrator</strong>, not a production system. It illustrates 
            architectural principles through simplified examples. Real implementations would require 
            more extensive semantic models, full protocol implementations, and integration with actual 
            trust service providers.
          </p>
        </div>
      </section>
    </>
  )
}

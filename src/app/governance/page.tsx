'use client'

import { useState } from 'react'

const governanceAreas = {
  policy: {
    title: 'Policy Frameworks',
    icon: '📜',
    description: 'Rules for issuance, validation, and acceptance',
    details: [
      'Who is authorized to issue specific credential types',
      'What validation rules must be applied by verifiers',
      'Which trust frameworks apply (e.g., eIDAS, national schemes)',
      'Liability and dispute resolution mechanisms',
      'Data protection and privacy requirements (GDPR compliance)'
    ]
  },
  conformance: {
    title: 'Conformance Testing',
    icon: '✅',
    description: 'Ensuring implementations meet profile requirements',
    details: [
      'SHACL validation - data must conform to application profiles',
      'Protocol compliance - OpenID4VC, eDelivery implementations tested',
      'Interoperability testing - cross-vendor credential exchange',
      'Security audits - cryptographic implementations verified',
      'Certification programs for issuers and verifiers'
    ]
  },
  revocation: {
    title: 'Revocation',
    icon: '🚫',
    description: 'Invalidating credentials when needed',
    details: [
      'Status List 2021 - efficient revocation for VCs',
      'Revocation registries - publicly queryable lists',
      'Real-time status checks - verify before accepting credential',
      'Revocation reasons - expired, suspended, compromised',
      'Notification mechanisms - inform holders of revocation'
    ]
  },
  audit: {
    title: 'Audit Trails',
    icon: '📊',
    description: 'Traceability of all operations',
    details: [
      'Issuance logs - who issued what, when',
      'Presentation logs - who presented credentials, to whom',
      'Validation logs - which credentials were accepted/rejected',
      'Trust service logs - signatures, timestamps, delivery evidence',
      'Immutable audit trails - blockchain or append-only logs'
    ]
  },
  versioning: {
    title: 'Versioning',
    icon: '🔄',
    description: 'Managing evolution of semantic models',
    details: [
      'Semantic model versions - vocabulary/ontology updates',
      'SHACL profile versions - constraint evolution',
      'Backward compatibility - old credentials still valid',
      'Deprecation policies - phasing out old versions',
      'Migration paths - upgrading to new schema versions'
    ]
  },
  supervision: {
    title: 'Supervision',
    icon: '👁️',
    description: 'Oversight of trust service providers',
    details: [
      'National supervisory bodies (eIDAS Article 17)',
      'Periodic audits of qualified trust service providers',
      'Incident reporting requirements',
      'Sanctions for non-compliance',
      'Cross-border cooperation between supervisors'
    ]
  }
}

export default function GovernancePage() {
  const [selectedArea, setSelectedArea] = useState<keyof typeof governanceAreas | null>(null)

  return (
    <>
      <section>
        <h2>⚖️ Governance, Conformance & Audit</h2>
        
        <p>
          Governance mechanisms are <strong>essential for trust and interoperability at scale</strong>. 
          They span all six architecture layers and ensure the ecosystem remains reliable, secure, and accountable.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #e6f0ff 0%, #cce0ff 100%)',
          borderLeft: '5px solid var(--eu-blue)',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h4 style={{ marginTop: 0 }}>Governance Layer Principle</h4>
          <p style={{ marginBottom: 0 }}>
            Governance is <strong>not optional</strong>. Without policy frameworks, conformance testing, revocation mechanisms, 
            and audit trails, the EU Business Wallet ecosystem cannot function at scale. Governance applies to semantics 
            (vocabulary evolution), syntaxes (profile compliance), protocols (interoperability testing), and trust services 
            (supervision of providers).
          </p>
        </div>

        <h3>Governance Areas</h3>

        <div className="card-grid">
          {Object.entries(governanceAreas).map(([key, area]) => (
            <div
              key={key}
              className="card"
              onClick={() => setSelectedArea(selectedArea === key ? null : key as keyof typeof governanceAreas)}
              style={{
                border: selectedArea === key ? '3px solid var(--eu-blue)' : '1px solid var(--grey-300)',
                background: selectedArea === key ? 'var(--light-blue)' : 'white',
                cursor: 'pointer'
              }}
            >
              <h4 style={{ fontSize: '1.3em' }}>
                <span style={{ fontSize: '1.5em', marginRight: '10px' }}>{area.icon}</span>
                {area.title}
              </h4>
              <p style={{ marginBottom: 0, fontSize: '0.9em' }}>{area.description}</p>
            </div>
          ))}
        </div>

        {selectedArea && (
          <div style={{
            border: '3px solid var(--eu-blue)',
            borderRadius: '8px',
            padding: '25px',
            marginTop: '30px',
            background: 'white'
          }}>
            <h3 style={{ marginTop: 0, color: 'var(--eu-blue)' }}>
              {governanceAreas[selectedArea].icon} {governanceAreas[selectedArea].title}
            </h3>
            <p style={{ fontSize: '1.05em', marginBottom: '20px' }}>
              {governanceAreas[selectedArea].description}
            </p>

            <h4>Key Mechanisms:</h4>
            <ul style={{ lineHeight: 1.8 }}>
              {governanceAreas[selectedArea].details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        )}

        <h3 style={{ marginTop: '40px' }}>Credential Lifecycle with Governance</h3>

        <div style={{
          background: 'white',
          border: '2px solid var(--grey-300)',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '20px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              background: 'var(--grey-100)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--eu-blue)'
            }}>
              <div style={{ minWidth: '40px', fontWeight: 'bold', color: 'var(--eu-blue)' }}>1.</div>
              <div style={{ flex: 1 }}>
                <strong>Schema Publication</strong><br />
                <span style={{ fontSize: '0.9em' }}>Semantic model (RDF/OWL) and SHACL shapes published with version 1.0</span>
              </div>
              <span className="badge badge-primary">Policy</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              background: 'var(--grey-100)',
              borderRadius: '6px',
              borderLeft: '4px solid #28a745'
            }}>
              <div style={{ minWidth: '40px', fontWeight: 'bold', color: '#28a745' }}>2.</div>
              <div style={{ flex: 1 }}>
                <strong>Issuer Certification</strong><br />
                <span style={{ fontSize: '0.9em' }}>Issuer passes conformance testing (SHACL validation + protocol compliance)</span>
              </div>
              <span className="badge badge-success">Conformance</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              background: 'var(--grey-100)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--eu-blue)'
            }}>
              <div style={{ minWidth: '40px', fontWeight: 'bold', color: 'var(--eu-blue)' }}>3.</div>
              <div style={{ flex: 1 }}>
                <strong>Credential Issuance</strong><br />
                <span style={{ fontSize: '0.9em' }}>Issuer creates credential conforming to SHACL profile, applies eSeal</span>
              </div>
              <span className="badge badge-primary">Trust Services</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              background: 'var(--grey-100)',
              borderRadius: '6px',
              borderLeft: '4px solid #ffc107'
            }}>
              <div style={{ minWidth: '40px', fontWeight: 'bold', color: '#856404' }}>4.</div>
              <div style={{ flex: 1 }}>
                <strong>Issuance Logged</strong><br />
                <span style={{ fontSize: '0.9em' }}>Credential ID, issuer, timestamp, holder recorded in audit trail</span>
              </div>
              <span className="badge badge-warning">Audit</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              background: 'var(--grey-100)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--eu-blue)'
            }}>
              <div style={{ minWidth: '40px', fontWeight: 'bold', color: 'var(--eu-blue)' }}>5.</div>
              <div style={{ flex: 1 }}>
                <strong>Presentation to Verifier</strong><br />
                <span style={{ fontSize: '0.9em' }}>Holder presents credential via OpenID4VP</span>
              </div>
              <span className="badge badge-primary">Protocol</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              background: 'var(--grey-100)',
              borderRadius: '6px',
              borderLeft: '4px solid #28a745'
            }}>
              <div style={{ minWidth: '40px', fontWeight: 'bold', color: '#28a745' }}>6.</div>
              <div style={{ flex: 1 }}>
                <strong>Validation</strong><br />
                <span style={{ fontSize: '0.9em' }}>Verifier checks: signature valid, SHACL constraints met, status not revoked</span>
              </div>
              <span className="badge badge-success">Conformance</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              background: 'var(--grey-100)',
              borderRadius: '6px',
              borderLeft: '4px solid #ffc107'
            }}>
              <div style={{ minWidth: '40px', fontWeight: 'bold', color: '#856404' }}>7.</div>
              <div style={{ flex: 1 }}>
                <strong>Presentation Logged</strong><br />
                <span style={{ fontSize: '0.9em' }}>Verifier logs presentation (credential ID, timestamp, decision)</span>
              </div>
              <span className="badge badge-warning">Audit</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              background: 'var(--grey-100)',
              borderRadius: '6px',
              borderLeft: '4px solid #dc3545'
            }}>
              <div style={{ minWidth: '40px', fontWeight: 'bold', color: '#dc3545' }}>8.</div>
              <div style={{ flex: 1 }}>
                <strong>Revocation (if needed)</strong><br />
                <span style={{ fontSize: '0.9em' }}>Issuer revokes credential, publishes to status list, holder notified</span>
              </div>
              <span className="badge" style={{ background: '#f8d7da', color: '#721c24' }}>Revocation</span>
            </div>
          </div>
        </div>

        <h3 style={{ marginTop: '40px' }}>SHACL Conformance Example</h3>

        <p>Governance ensures all credentials conform to SHACL application profiles:</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div style={{
            background: 'white',
            border: '2px solid var(--grey-300)',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{ color: 'var(--eu-blue)', marginTop: 0 }}>SHACL Constraint</h4>
            <pre style={{ fontSize: '0.8em', background: 'var(--grey-100)', padding: '15px', borderRadius: '6px' }}>
{`sh:property [
  sh:path ebw:legalName ;
  sh:datatype xsd:string ;
  sh:minCount 1 ;
  sh:maxCount 1 ;
  sh:minLength 1 ;
  sh:maxLength 500 ;
]`}
            </pre>
          </div>

          <div style={{
            background: 'white',
            border: '2px solid var(--grey-300)',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{ color: 'var(--success)', marginTop: 0 }}>✅ Valid Data</h4>
            <pre style={{ fontSize: '0.8em', background: '#d4edda', padding: '15px', borderRadius: '6px' }}>
{`{
  "@type": "EconomicOperator",
  "legalName": "Suomi Innovations Oy"
}`}
            </pre>
            <p style={{ fontSize: '0.9em', marginTop: '10px', marginBottom: 0 }}>
              <strong>Result:</strong> Passes SHACL validation
            </p>
          </div>
        </div>

        <div style={{
          background: '#f8d7da',
          border: '2px solid #f5c6cb',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '15px'
        }}>
          <h4 style={{ color: '#721c24', marginTop: 0 }}>❌ Invalid Data</h4>
          <pre style={{ fontSize: '0.8em', background: 'white', padding: '15px', borderRadius: '6px' }}>
{`{
  "@type": "EconomicOperator"
  // legalName missing!
}`}
          </pre>
          <p style={{ fontSize: '0.9em', marginTop: '10px', marginBottom: 0, color: '#721c24' }}>
            <strong>Result:</strong> SHACL validation fails. Credential rejected by conformant verifiers.
          </p>
        </div>

        <h3 style={{ marginTop: '40px' }}>Supervisory Framework (eIDAS)</h3>

        <p>Trust service providers are supervised by national authorities:</p>

        <ul style={{ lineHeight: 1.8 }}>
          <li><strong>Qualified Trust Service Providers (QTSPs)</strong> must be audited before being listed</li>
          <li><strong>EU Trusted Lists</strong> publish all qualified providers (TSL)</li>
          <li><strong>National supervisory bodies</strong> conduct periodic audits and investigations</li>
          <li><strong>Cross-border cooperation</strong> via ENISA and Member State coordination</li>
          <li><strong>Incident reporting</strong> required for security breaches (NIS2 Directive)</li>
        </ul>

        <div style={{
          background: 'linear-gradient(135deg, #e6f0ff 0%, #cce0ff 100%)',
          borderLeft: '5px solid var(--eu-blue)',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '30px'
        }}>
          <h4 style={{ marginTop: 0 }}>Governance Ensures Interoperability</h4>
          <p style={{ marginBottom: 0 }}>
            Without governance, the EU Business Wallet ecosystem would fragment. Policy frameworks ensure common rules. 
            Conformance testing ensures implementations work together. Revocation mechanisms prevent misuse. Audit trails 
            enable accountability. Versioning allows evolution without breaking existing systems. Supervision ensures trust 
            service providers remain reliable.
          </p>
        </div>
      </section>
    </>
  )
}

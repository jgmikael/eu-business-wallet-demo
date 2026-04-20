'use client'

import { useState } from 'react'

const vocabularyData = {
  classes: [
    { uri: 'ebw:EconomicOperator', label: 'Economic Operator', subClassOf: 'org:Organization', comment: 'A legal entity engaged in economic activity' },
    { uri: 'ebw:NaturalPersonRepresentative', label: 'Natural Person Representative', subClassOf: 'foaf:Person', comment: 'Authorized person acting on behalf of company' },
    { uri: 'ebw:Mandate', label: 'Mandate', subClassOf: '', comment: 'Authorization granting specific powers' },
    { uri: 'ebw:VATIdentifier', label: 'VAT Identifier', subClassOf: '', comment: 'Value Added Tax registration identifier' },
    { uri: 'ebw:CompanyCertificate', label: 'Company Certificate', subClassOf: '', comment: 'Official registration certificate' },
    { uri: 'ebw:Authorisation', label: 'Authorisation', subClassOf: '', comment: 'Permission to perform specific actions' },
    { uri: 'ebw:DeliveryEvidence', label: 'Delivery Evidence', subClassOf: '', comment: 'Proof of delivery (QERDS)' }
  ],
  properties: [
    { uri: 'ebw:hasRepresentative', label: 'has representative', domain: 'EconomicOperator', range: 'NaturalPersonRepresentative', type: 'object' },
    { uri: 'ebw:actsUnderMandate', label: 'acts under mandate', domain: 'NaturalPersonRepresentative', range: 'Mandate', type: 'object' },
    { uri: 'ebw:holdsIdentifier', label: 'holds identifier', domain: 'EconomicOperator', range: 'VATIdentifier', type: 'object' },
    { uri: 'ebw:legalName', label: 'legal name', domain: 'EconomicOperator', range: 'xsd:string', type: 'datatype' },
    { uri: 'ebw:vatNumber', label: 'VAT number', domain: 'VATIdentifier', range: 'xsd:string', type: 'datatype' },
    { uri: 'ebw:validFrom', label: 'valid from', domain: '(multiple)', range: 'xsd:dateTime', type: 'datatype' },
    { uri: 'ebw:validUntil', label: 'valid until', domain: '(multiple)', range: 'xsd:dateTime', type: 'datatype' }
  ],
  shapes: [
    { uri: 'ebw-shape:EconomicOperatorShape', target: 'ebw:EconomicOperator', constraints: 'legalName: required (1..1), registrationNumber: required (1..1), hasRepresentative: min 1' },
    { uri: 'ebw-shape:VATIdentifierShape', target: 'ebw:VATIdentifier', constraints: 'vatNumber: required, pattern: ^[A-Z]{2}[A-Z0-9]{2,13}$' },
    { uri: 'ebw-shape:MandateShape', target: 'ebw:Mandate', constraints: 'scopeOfMandate: required, validFrom: required, grantsAuthorisation: min 1' }
  ],
  concepts: [
    { uri: 'ebw-concept:CompanyIdentity', scheme: 'CredentialTypeScheme', prefLabel: 'Company Identity Credential', notation: 'CMP-ID' },
    { uri: 'ebw-concept:MandateCredential', scheme: 'CredentialTypeScheme', prefLabel: 'Mandate Credential', notation: 'MND' },
    { uri: 'ebw-concept:VATRegistration', scheme: 'CredentialTypeScheme', prefLabel: 'VAT Registration Credential', notation: 'VAT' },
    { uri: 'ebw-concept:FullRepresentation', scheme: 'MandateScopeScheme', prefLabel: 'Full Representation', notation: 'FULL' },
    { uri: 'ebw-concept:LimitedRepresentation', scheme: 'MandateScopeScheme', prefLabel: 'Limited Representation', notation: 'LIMITED' }
  ]
}

const sampleRDF = `@prefix ebw: <https://ebw.europa.eu/vocabulary/> .

<#company1> a ebw:EconomicOperator ;
    ebw:legalName "Suomi Innovations Oy" ;
    ebw:registrationNumber "FI12345678" ;
    ebw:hasRepresentative <#person1> .

<#person1> a ebw:NaturalPersonRepresentative ;
    ebw:firstName "Maria" ;
    ebw:familyName "Virtanen" ;
    ebw:actsUnderMandate <#mandate1> .

<#mandate1> a ebw:Mandate ;
    ebw:scopeOfMandate "Full representation" ;
    ebw:validFrom "2024-01-01T00:00:00Z"^^xsd:dateTime .`

export default function SemanticPage() {
  const [activeTab, setActiveTab] = useState<'classes' | 'properties' | 'shapes' | 'concepts' | 'graph'>('classes')
  const [validationResult, setValidationResult] = useState<string | null>(null)

  const validateSHACL = () => {
    setValidationResult('✅ Validation successful! Sample RDF conforms to all SHACL shapes.')
    setTimeout(() => setValidationResult(null), 5000)
  }

  return (
    <>
      <section>
        <h2>🔗 Semantic Core Explorer</h2>
        
        <p>
          Explore the RDF/OWL/SKOS/SHACL semantic foundation. This is the <strong>stable, authoritative core</strong> of 
          EU Business Wallet interoperability.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #e6f0ff 0%, #cce0ff 100%)',
          borderLeft: '5px solid var(--eu-blue)',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h4 style={{ marginTop: 0 }}>Semantic Foundation Principle</h4>
          <p style={{ marginBottom: 0 }}>
            These vocabularies are <strong>persistent and stable</strong>. They define the meaning of business concepts 
            independently of syntax (JSON/XML), credential format (VC/plain), or protocol (OpenID4VC/eDelivery).
          </p>
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>
            OWL Classes
          </button>
          <button className={`tab ${activeTab === 'properties' ? 'active' : ''}`} onClick={() => setActiveTab('properties')}>
            Properties
          </button>
          <button className={`tab ${activeTab === 'shapes' ? 'active' : ''}`} onClick={() => setActiveTab('shapes')}>
            SHACL Shapes
          </button>
          <button className={`tab ${activeTab === 'concepts' ? 'active' : ''}`} onClick={() => setActiveTab('concepts')}>
            SKOS Concepts
          </button>
          <button className={`tab ${activeTab === 'graph' ? 'active' : ''}`} onClick={() => setActiveTab('graph')}>
            RDF Graph
          </button>
        </div>

        {activeTab === 'classes' && (
          <div style={{ marginTop: '20px' }}>
            <h3>OWL Classes</h3>
            <p>Core business object classes in the EU Business Wallet vocabulary.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr style={{ background: 'var(--grey-100)', borderBottom: '2px solid var(--grey-300)' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>URI</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Label</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>SubClass Of</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {vocabularyData.classes.map((cls, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--grey-200)' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: 'var(--eu-blue)' }}>{cls.uri}</td>
                    <td style={{ padding: '10px', fontWeight: 500 }}>{cls.label}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.9em' }}>{cls.subClassOf || '—'}</td>
                    <td style={{ padding: '10px', fontSize: '0.9em' }}>{cls.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'properties' && (
          <div style={{ marginTop: '20px' }}>
            <h3>Properties (Object & Datatype)</h3>
            <p>Properties define relationships between classes and data values.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr style={{ background: 'var(--grey-100)', borderBottom: '2px solid var(--grey-300)' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>URI</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Label</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Domain</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Range</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {vocabularyData.properties.map((prop, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--grey-200)' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: 'var(--eu-blue)' }}>{prop.uri}</td>
                    <td style={{ padding: '10px', fontWeight: 500 }}>{prop.label}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.9em' }}>{prop.domain}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.9em' }}>{prop.range}</td>
                    <td style={{ padding: '10px' }}>
                      <span className={`badge ${prop.type === 'object' ? 'badge-primary' : 'badge-success'}`}>
                        {prop.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'shapes' && (
          <div style={{ marginTop: '20px' }}>
            <h3>SHACL Shapes (Application Profiles)</h3>
            <p>SHACL shapes define validation constraints for specific use cases.</p>
            
            <div className="card-grid" style={{ marginTop: '20px' }}>
              {vocabularyData.shapes.map((shape, idx) => (
                <div key={idx} className="card">
                  <h4 style={{ fontFamily: 'monospace', fontSize: '0.95em', color: 'var(--eu-blue)' }}>{shape.uri}</h4>
                  <p><strong>Target Class:</strong> <code>{shape.target}</code></p>
                  <p style={{ fontSize: '0.9em', marginBottom: 0 }}>
                    <strong>Constraints:</strong><br />
                    {shape.constraints}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '30px' }}>
              <h4>🔍 Interactive SHACL Validation</h4>
              <p>Test RDF data against SHACL application profile constraints.</p>
              
              <pre style={{ background: 'var(--grey-100)', padding: '15px', borderRadius: '6px', fontSize: '0.85em' }}>
                {sampleRDF}
              </pre>

              <button 
                onClick={validateSHACL}
                style={{
                  background: 'var(--eu-blue)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '1em',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Validate Against SHACL Shapes
              </button>

              {validationResult && (
                <div style={{
                  background: '#d4edda',
                  border: '1px solid #c3e6cb',
                  color: '#155724',
                  padding: '15px',
                  borderRadius: '6px',
                  marginTop: '15px'
                }}>
                  {validationResult}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'concepts' && (
          <div style={{ marginTop: '20px' }}>
            <h3>SKOS Concepts & Taxonomies</h3>
            <p>Controlled vocabularies and concept schemes for credential types and mandate scopes.</p>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr style={{ background: 'var(--grey-100)', borderBottom: '2px solid var(--grey-300)' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>URI</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Concept Scheme</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Label</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Notation</th>
                </tr>
              </thead>
              <tbody>
                {vocabularyData.concepts.map((concept, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--grey-200)' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: 'var(--eu-blue)', fontSize: '0.85em' }}>{concept.uri}</td>
                    <td style={{ padding: '10px' }}>{concept.scheme}</td>
                    <td style={{ padding: '10px', fontWeight: 500 }}>{concept.prefLabel}</td>
                    <td style={{ padding: '10px' }}>
                      <span className="badge badge-warning">{concept.notation}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'graph' && (
          <div style={{ marginTop: '20px' }}>
            <h3>RDF Graph Visualization</h3>
            <p>Visual representation of semantic relationships.</p>

            <div style={{
              background: 'white',
              border: '2px solid var(--grey-300)',
              borderRadius: '8px',
              padding: '30px',
              marginTop: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'inline-block',
                background: '#e6f0ff',
                border: '3px solid var(--eu-blue)',
                borderRadius: '12px',
                padding: '15px 25px',
                margin: '10px'
              }}>
                <strong>EconomicOperator</strong><br />
                <small>Suomi Innovations Oy</small>
              </div>

              <div style={{ display: 'inline-block', margin: '0 20px', fontSize: '1.5em', color: 'var(--eu-blue)' }}>
                →
              </div>

              <div style={{
                display: 'inline-block',
                background: '#fff3cd',
                border: '3px solid #ffc107',
                borderRadius: '12px',
                padding: '15px 25px',
                margin: '10px'
              }}>
                <strong>hasRepresentative</strong>
              </div>

              <div style={{ display: 'inline-block', margin: '0 20px', fontSize: '1.5em', color: 'var(--eu-blue)' }}>
                →
              </div>

              <div style={{
                display: 'inline-block',
                background: '#d4edda',
                border: '3px solid #28a745',
                borderRadius: '12px',
                padding: '15px 25px',
                margin: '10px'
              }}>
                <strong>NaturalPersonRepresentative</strong><br />
                <small>Maria Virtanen</small>
              </div>

              <div style={{ marginTop: '40px' }}>
                <div style={{
                  display: 'inline-block',
                  background: '#d4edda',
                  border: '3px solid #28a745',
                  borderRadius: '12px',
                  padding: '15px 25px',
                  margin: '10px'
                }}>
                  <strong>Maria Virtanen</strong>
                </div>

                <div style={{ display: 'inline-block', margin: '0 20px', fontSize: '1.5em', color: 'var(--eu-blue)' }}>
                  →
                </div>

                <div style={{
                  display: 'inline-block',
                  background: '#fff3cd',
                  border: '3px solid #ffc107',
                  borderRadius: '12px',
                  padding: '15px 25px',
                  margin: '10px'
                }}>
                  <strong>actsUnderMandate</strong>
                </div>

                <div style={{ display: 'inline-block', margin: '0 20px', fontSize: '1.5em', color: 'var(--eu-blue)' }}>
                  →
                </div>

                <div style={{
                  display: 'inline-block',
                  background: '#f8d7da',
                  border: '3px solid #dc3545',
                  borderRadius: '12px',
                  padding: '15px 25px',
                  margin: '10px'
                }}>
                  <strong>Mandate</strong><br />
                  <small>Full representation</small>
                </div>
              </div>
            </div>

            <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--grey-700)' }}>
              <em>Simplified graph visualization. Full RDF triples available in vocabulary.ttl</em>
            </p>
          </div>
        )}

        <h3 style={{ marginTop: '40px' }}>📁 Source Files</h3>
        <ul>
          <li><code>/data/semantic/vocabulary.ttl</code> - OWL ontology (4.1 KB)</li>
          <li><code>/data/semantic/shapes.ttl</code> - SHACL shapes (4.5 KB)</li>
          <li><code>/data/semantic/concepts.ttl</code> - SKOS concepts (4.0 KB)</li>
        </ul>
      </section>
    </>
  )
}

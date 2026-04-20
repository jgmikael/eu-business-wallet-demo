'use client'

import { useState } from 'react'

const payloadFormats = {
  jsonld: {
    name: 'JSON-LD VC 2.0',
    description: 'W3C Verifiable Credentials Data Model 2.0 - Wallet-native format',
    sample: `{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://ebw.europa.eu/vocabulary/"
  ],
  "id": "urn:uuid:3f7a6e2b...",
  "type": ["VerifiableCredential", "CompanyIdentityCredential"],
  "issuer": {
    "id": "did:ebsi:zExample123CompanyRegistry",
    "name": "Finnish Trade Register"
  },
  "validFrom": "2024-01-15T00:00:00Z",
  "credentialSubject": {
    "id": "did:ebsi:zExample456ExampleCompany",
    "type": "EconomicOperator",
    "legalName": "Suomi Innovations Oy",
    "registrationNumber": "FI12345678",
    "holdsIdentifier": {
      "type": "VATIdentifier",
      "vatNumber": "FI12345678"
    },
    "hasRepresentative": {
      "type": "NaturalPersonRepresentative",
      "firstName": "Maria",
      "familyName": "Virtanen",
      "actsUnderMandate": {
        "type": "Mandate",
        "scopeOfMandate": "Full representation"
      }
    }
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "ecdsa-rdfc-2019",
    "proofValue": "zExample...SignatureValue"
  }
}`,
    features: ['JSON-LD @context', 'W3C VC envelope', 'DID-based IDs', 'Data Integrity Proof', 'Semantic RDF mapping']
  },
  json: {
    name: 'Plain JSON',
    description: 'Simplified JSON for REST APIs and legacy systems',
    sample: `{
  "credentialId": "3f7a6e2b-4c1d-4e8f-9a3b-1c2d3e4f5a6b",
  "credentialType": "CompanyIdentity",
  "issuer": {
    "id": "FI-TradeRegister",
    "name": "Finnish Trade Register"
  },
  "issuedAt": "2024-01-15T10:30:00Z",
  "validFrom": "2024-01-15T00:00:00Z",
  "subject": {
    "companyId": "FI12345678",
    "legalName": "Suomi Innovations Oy",
    "registrationNumber": "FI12345678",
    "vatNumber": "FI12345678",
    "representative": {
      "firstName": "Maria",
      "familyName": "Virtanen",
      "mandate": {
        "scope": "Full representation",
        "validFrom": "2024-01-01"
      }
    }
  },
  "signature": {
    "algorithm": "ECDSA",
    "signatureValue": "Example...SignatureValue"
  }
}`,
    features: ['Simple structure', 'No RDF', 'API-friendly', 'Smaller size', 'Easy to parse']
  },
  xml: {
    name: 'XML',
    description: 'Legacy format for traditional EDI and government systems',
    sample: `<?xml version="1.0" encoding="UTF-8"?>
<CompanyCredential xmlns="https://ebw.europa.eu/schema/v1"
                    credentialId="3f7a6e2b-4c1d..."
                    credentialType="CompanyIdentityCredential">
  <Issuer>
    <IssuerID>FI-TradeRegister</IssuerID>
    <IssuerName>Finnish Trade Register</IssuerName>
  </Issuer>
  
  <IssuedAt>2024-01-15T10:30:00Z</IssuedAt>
  <ValidFrom>2024-01-15T00:00:00Z</ValidFrom>
  
  <CredentialSubject>
    <EconomicOperator>
      <LegalName>Suomi Innovations Oy</LegalName>
      <RegistrationNumber>FI12345678</RegistrationNumber>
      
      <VATIdentifier>
        <VATNumber>FI12345678</VATNumber>
      </VATIdentifier>
      
      <Representative>
        <FirstName>Maria</FirstName>
        <FamilyName>Virtanen</FamilyName>
        
        <Mandate>
          <ScopeOfMandate>Full representation</ScopeOfMandate>
          <ValidFrom>2024-01-01T00:00:00Z</ValidFrom>
        </Mandate>
      </Representative>
    </EconomicOperator>
  </CredentialSubject>
  
  <Signature>
    <Algorithm>ECDSA</Algorithm>
    <SignatureValue>Example...SignatureValue</SignatureValue>
  </Signature>
</CompanyCredential>`,
    features: ['Hierarchical structure', 'Schema validation', 'XSLT transformable', 'eDelivery compatible', 'Namespace support']
  }
}

export default function PayloadsPage() {
  const [selectedFormats, setSelectedFormats] = useState<('jsonld' | 'json' | 'xml')[]>(['jsonld', 'json'])
  const [comparisonMode, setComparisonMode] = useState<'side' | 'tabs'>('side')

  const toggleFormat = (format: 'jsonld' | 'json' | 'xml') => {
    if (selectedFormats.includes(format)) {
      if (selectedFormats.length > 1) {
        setSelectedFormats(selectedFormats.filter(f => f !== format))
      }
    } else {
      setSelectedFormats([...selectedFormats, format])
    }
  }

  return (
    <>
      <section>
        <h2>📄 Multi-Format Payload Comparison</h2>
        
        <p>
          The <strong>same semantic object</strong> (EconomicOperator with Mandate) represented in three different syntaxes. 
          All map to the identical RDF/OWL semantic model.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #e6f0ff 0%, #cce0ff 100%)',
          borderLeft: '5px solid var(--eu-blue)',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h4 style={{ marginTop: 0 }}>Key Principle</h4>
          <p style={{ marginBottom: 0 }}>
            <strong>Syntax is replaceable.</strong> The semantic meaning (EconomicOperator, Mandate, etc.) remains 
            constant regardless of whether the data is serialized as JSON-LD VC, plain JSON, or XML. This enables 
            interoperability between wallet-native systems (JSON-LD), REST APIs (JSON), and legacy EDI (XML).
          </p>
        </div>

        <h3>Select Formats to Compare</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {Object.entries(payloadFormats).map(([key, format]) => (
            <button
              key={key}
              onClick={() => toggleFormat(key as any)}
              style={{
                padding: '10px 20px',
                border: `2px solid ${selectedFormats.includes(key as any) ? 'var(--eu-blue)' : 'var(--grey-300)'}`,
                background: selectedFormats.includes(key as any) ? 'var(--light-blue)' : 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              {format.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setComparisonMode('side')}
            className={comparisonMode === 'side' ? 'badge badge-primary' : 'badge'}
            style={{ cursor: 'pointer', padding: '8px 16px' }}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setComparisonMode('tabs')}
            className={comparisonMode === 'tabs' ? 'badge badge-primary' : 'badge'}
            style={{ cursor: 'pointer', padding: '8px 16px' }}
          >
            Tabbed View
          </button>
        </div>

        {comparisonMode === 'side' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: selectedFormats.length === 1 ? '1fr' : selectedFormats.length === 2 ? '1fr 1fr' : '1fr 1fr 1fr',
            gap: '20px',
            marginTop: '20px'
          }}>
            {selectedFormats.map(formatKey => {
              const format = payloadFormats[formatKey]
              return (
                <div key={formatKey} style={{
                  border: '2px solid var(--grey-300)',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: 'var(--eu-blue)',
                    color: 'white',
                    padding: '15px',
                    fontWeight: 600
                  }}>
                    {format.name}
                  </div>
                  <div style={{ padding: '15px', background: 'var(--grey-100)' }}>
                    <p style={{ fontSize: '0.9em', marginBottom: '10px' }}>{format.description}</p>
                    <div style={{ marginBottom: '10px' }}>
                      {format.features.map((feature, idx) => (
                        <span key={idx} className="badge badge-success" style={{ marginRight: '5px', marginBottom: '5px' }}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <pre style={{
                    margin: 0,
                    padding: '15px',
                    background: 'white',
                    fontSize: '0.75em',
                    lineHeight: 1.4,
                    maxHeight: '600px',
                    overflowY: 'auto'
                  }}>
                    {format.sample}
                  </pre>
                </div>
              )
            })}
          </div>
        )}

        {comparisonMode === 'tabs' && (
          <div style={{ marginTop: '20px' }}>
            <div className="tabs">
              {selectedFormats.map((formatKey, idx) => (
                <button
                  key={formatKey}
                  className={`tab ${idx === 0 ? 'active' : ''}`}
                  style={{ minWidth: '150px' }}
                >
                  {payloadFormats[formatKey].name}
                </button>
              ))}
            </div>
            {selectedFormats.map((formatKey, idx) => (
              <div key={formatKey} style={{ display: idx === 0 ? 'block' : 'none' }}>
                <div style={{
                  border: '2px solid var(--grey-300)',
                  borderRadius: '8px',
                  marginTop: '20px'
                }}>
                  <div style={{ padding: '20px', background: 'var(--grey-100)' }}>
                    <h4 style={{ marginTop: 0 }}>{payloadFormats[formatKey].name}</h4>
                    <p>{payloadFormats[formatKey].description}</p>
                    <div>
                      {payloadFormats[formatKey].features.map((feature, fidx) => (
                        <span key={fidx} className="badge badge-success" style={{ marginRight: '5px', marginBottom: '5px' }}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <pre style={{
                    margin: 0,
                    padding: '20px',
                    background: 'white',
                    fontSize: '0.85em',
                    lineHeight: 1.5
                  }}>
                    {payloadFormats[formatKey].sample}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 style={{ marginTop: '40px' }}>Semantic Mapping to RDF</h3>
        <p>All three formats map to the same RDF triples:</p>
        
        <div style={{
          background: 'white',
          border: '2px solid var(--eu-blue)',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '15px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--grey-300)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Subject</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Predicate</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Object</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--grey-200)' }}>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>&lt;#company1&gt;</td>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em', color: 'var(--eu-blue)' }}>rdf:type</td>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>ebw:EconomicOperator</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--grey-200)' }}>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>&lt;#company1&gt;</td>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em', color: 'var(--eu-blue)' }}>ebw:legalName</td>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>"Suomi Innovations Oy"</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--grey-200)' }}>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>&lt;#company1&gt;</td>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em', color: 'var(--eu-blue)' }}>ebw:hasRepresentative</td>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>&lt;#person1&gt;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--grey-200)' }}>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>&lt;#person1&gt;</td>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em', color: 'var(--eu-blue)' }}>rdf:type</td>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>ebw:NaturalPersonRepresentative</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>&lt;#person1&gt;</td>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em', color: 'var(--eu-blue)' }}>ebw:actsUnderMandate</td>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>&lt;#mandate1&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: '15px', fontStyle: 'italic' }}>
          Whether you receive this data as JSON-LD VC from a wallet, plain JSON from an API, or XML via eDelivery, 
          the semantic meaning is identical and machine-interpretable.
        </p>

        <h3 style={{ marginTop: '40px' }}>📁 Source Files</h3>
        <ul>
          <li><code>/data/payloads/company-vc.jsonld</code> - W3C VC 2.0 format (1.9 KB)</li>
          <li><code>/data/payloads/company-plain.json</code> - Plain JSON (1.2 KB)</li>
          <li><code>/data/payloads/company-mandate.xml</code> - XML format (1.9 KB)</li>
        </ul>
      </section>
    </>
  )
}

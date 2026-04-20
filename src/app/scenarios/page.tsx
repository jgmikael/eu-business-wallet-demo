'use client'

import { useState } from 'react'

const scenarios = {
  wallet: {
    title: 'Scenario 1: Company Identity & Mandate Presentation',
    description: 'A company representative presents their identity and authorization to access a public service',
    steps: [
      {
        number: 1,
        title: 'Credential Issuance (OpenID4VCI)',
        actor: 'Company Registry → Wallet',
        semanticModel: 'ebw:EconomicOperator + ebw:Mandate',
        payload: 'JSON-LD VC 2.0',
        protocol: 'OpenID4VCI',
        trustServices: 'eSignature (registry)',
        details: 'Finnish Trade Register issues a CompanyIdentityCredential containing EconomicOperator data and Mandate for Maria Virtanen. The credential is signed with the registry's eSignature and delivered to Maria's EU Business Wallet via OpenID4VCI protocol.'
      },
      {
        number: 2,
        title: 'Credential Storage',
        actor: 'Wallet',
        semanticModel: 'Same semantic model',
        payload: 'Stored as JSON-LD VC',
        protocol: 'N/A (local)',
        trustServices: 'Wallet encryption',
        details: 'Maria's wallet stores the credential securely. The wallet validates the signature against the Trade Register's DID, checks the SHACL constraints (legalName required, registrationNumber format, etc.), and confirms the credential is valid.'
      },
      {
        number: 3,
        title: 'Service Requests Presentation (OpenID4VP)',
        actor: 'Public Service → Wallet',
        semanticModel: 'Request for ebw:Mandate proof',
        payload: 'Presentation request',
        protocol: 'OpenID4VP',
        trustServices: 'N/A',
        details: 'Maria attempts to access a public procurement portal. The service sends an OpenID4VP presentation request asking for proof of company representation with specific scope (e.g., "FullRepresentation" or "FinancialMatters").'
      },
      {
        number: 4,
        title: 'User Consent',
        actor: 'Wallet User (Maria)',
        semanticModel: 'User reviews request',
        payload: 'N/A',
        protocol: 'N/A',
        trustServices: 'User authentication',
        details: 'Maria's wallet displays the presentation request: "Public Procurement Portal requests proof that you are authorized to represent Suomi Innovations Oy in procurement matters." Maria reviews and consents.'
      },
      {
        number: 5,
        title: 'Presentation Created',
        actor: 'Wallet → Public Service',
        semanticModel: 'ebw:EconomicOperator + ebw:Mandate',
        payload: 'JSON-LD VP (Verifiable Presentation)',
        protocol: 'OpenID4VP',
        trustServices: 'Holder signature',
        details: 'Wallet creates a Verifiable Presentation containing the CompanyIdentityCredential. The presentation is signed by Maria (proving possession) and sent to the public service.'
      },
      {
        number: 6,
        title: 'Validation & Access Granted',
        actor: 'Public Service',
        semanticModel: 'Validates semantic constraints',
        payload: 'Validates JSON-LD VP',
        protocol: 'OpenID4VP (response)',
        trustServices: 'Signature verification + SHACL',
        details: 'Service validates: (1) Trade Register signature is valid, (2) Maria's holder signature proves possession, (3) SHACL constraints are met (Mandate scope = "FullRepresentation", validFrom/validUntil dates are current). Access granted.'
      }
    ]
  },
  edelivery: {
    title: 'Scenario 2: Legally Significant Document Delivery',
    description: 'A government agency delivers an administrative notice with proof of delivery',
    steps: [
      {
        number: 1,
        title: 'Document Preparation',
        actor: 'Government Agency',
        semanticModel: 'ebw:AdministrativeNotice (custom)',
        payload: 'JSON-LD (semantic)',
        protocol: 'N/A',
        trustServices: 'N/A',
        details: 'Tax authority prepares an administrative decision notice. The semantic model includes: issuer (TaxAuthority), recipient (EconomicOperator), decision type, effective date, and appeal rights. Serialized as JSON-LD using EU Business Wallet vocabulary.'
      },
      {
        number: 2,
        title: 'Document Signing',
        actor: 'Government Agency',
        semanticModel: 'Same',
        payload: 'JSON-LD + eSignature',
        protocol: 'N/A',
        trustServices: 'eSeal (qualified)',
        details: 'Tax authority applies a qualified eSeal to the JSON-LD document. The eSeal proves: (1) the document originates from the tax authority, (2) the document has not been altered. A qualified timestamp is also applied, proving the document existed at a specific time.'
      },
      {
        number: 3,
        title: 'eDelivery Submission',
        actor: 'Gov Agency → eDelivery Access Point',
        semanticModel: 'Document + metadata',
        payload: 'AS4 message envelope',
        protocol: 'eDelivery / AS4',
        trustServices: 'Transport-level TLS',
        details: 'The signed JSON-LD document is wrapped in an AS4 message envelope. The envelope includes routing metadata (sender, receiver access points, message ID). The message is submitted to the government's eDelivery access point.'
      },
      {
        number: 4,
        title: 'AS4 Routing',
        actor: 'Sender AP → Receiver AP',
        semanticModel: 'N/A (transport)',
        payload: 'AS4 envelope',
        protocol: 'eDelivery / AS4',
        trustServices: 'TLS + AS4 receipts',
        details: 'The sender access point looks up the receiver's access point (company's eDelivery endpoint) and transmits the message. AS4 protocol ensures reliable delivery with receipts and error handling.'
      },
      {
        number: 5,
        title: 'QERDS Delivery Evidence',
        actor: 'QERDS Provider',
        semanticModel: 'ebw:DeliveryEvidence',
        payload: 'Structured evidence',
        protocol: 'QERDS',
        trustServices: 'Qualified timestamp + signature',
        details: 'A Qualified Electronic Registered Delivery Service (QERDS) provider issues delivery evidence. This includes: (1) timestamp of submission, (2) timestamp of delivery, (3) proof that recipient access point accepted the message. The evidence is itself signed and timestamped.'
      },
      {
        number: 6,
        title: 'Recipient Receives & Evidence Returned',
        actor: 'Company → Gov Agency',
        semanticModel: 'ebw:DeliveryEvidence',
        payload: 'JSON-LD evidence',
        protocol: 'eDelivery (receipt)',
        trustServices: 'Qualified delivery proof',
        details: 'Company's eDelivery access point delivers the administrative notice to the company's system. A delivery receipt is sent back through the AS4 network. The QERDS provider issues final delivery evidence to the tax authority, which can be used as legal proof that the notice was delivered at a specific time.'
      }
    ]
  }
}

export default function ScenariosPage() {
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof scenarios>('wallet')
  const [currentStep, setCurrentStep] = useState(0)

  const scenario = scenarios[selectedScenario]
  const step = scenario.steps[currentStep]

  return (
    <>
      <section>
        <h2>📋 Scenario Walkthroughs</h2>
        
        <p>
          Step-by-step demonstrations showing how the <strong>full six-layer architecture</strong> works in realistic 
          business scenarios. Each step shows the semantic model, payload format, protocol, and trust services in action.
        </p>

        <h3>Select Scenario</h3>
        <div className="card-grid">
          {Object.entries(scenarios).map(([key, sc]) => (
            <div
              key={key}
              className="card"
              onClick={() => {
                setSelectedScenario(key as keyof typeof scenarios)
                setCurrentStep(0)
              }}
              style={{
                border: selectedScenario === key ? '3px solid var(--eu-blue)' : '1px solid var(--grey-300)',
                background: selectedScenario === key ? 'var(--light-blue)' : 'white',
                cursor: 'pointer'
              }}
            >
              <h4 style={{ color: 'var(--eu-blue)' }}>{sc.title}</h4>
              <p style={{ marginBottom: 0, fontSize: '0.9em' }}>{sc.description}</p>
            </div>
          ))}
        </div>

        <div style={{
          border: '3px solid var(--eu-blue)',
          borderRadius: '8px',
          padding: '30px',
          marginTop: '30px',
          background: 'white'
        }}>
          <h3 style={{ marginTop: 0, color: 'var(--eu-blue)' }}>{scenario.title}</h3>
          <p style={{ fontSize: '1.05em', marginBottom: '30px' }}>{scenario.description}</p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '30px',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            {scenario.steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                style={{
                  flex: 1,
                  minWidth: '80px',
                  padding: '15px 10px',
                  background: currentStep === idx ? 'var(--eu-blue)' : currentStep > idx ? 'var(--success)' : 'var(--grey-200)',
                  color: currentStep >= idx ? 'white' : 'var(--grey-700)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s'
                }}
              >
                {s.number}
              </button>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #e6f0ff 0%, #ffffff 100%)',
            border: '2px solid var(--grey-300)',
            borderRadius: '8px',
            padding: '25px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'var(--eu-blue)',
              color: 'white',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              textAlign: 'center',
              lineHeight: '40px',
              fontSize: '1.3em',
              fontWeight: 'bold',
              marginRight: '15px'
            }}>
              {step.number}
            </div>
            <h3 style={{ display: 'inline', fontSize: '1.5em' }}>{step.title}</h3>

            <p style={{ marginTop: '15px', fontSize: '1.1em', lineHeight: 1.7 }}>
              {step.details}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
            marginTop: '25px'
          }}>
            <div style={{ background: 'var(--grey-100)', padding: '15px', borderRadius: '6px' }}>
              <strong style={{ color: 'var(--eu-blue)' }}>👥 Actor</strong>
              <p style={{ marginTop: '8px', marginBottom: 0 }}>{step.actor}</p>
            </div>

            <div style={{ background: 'var(--grey-100)', padding: '15px', borderRadius: '6px' }}>
              <strong style={{ color: 'var(--eu-blue)' }}>🔗 Semantic Model</strong>
              <p style={{ marginTop: '8px', marginBottom: 0, fontFamily: 'monospace', fontSize: '0.9em' }}>
                {step.semanticModel}
              </p>
            </div>

            <div style={{ background: 'var(--grey-100)', padding: '15px', borderRadius: '6px' }}>
              <strong style={{ color: 'var(--eu-blue)' }}>📄 Payload Format</strong>
              <p style={{ marginTop: '8px', marginBottom: 0 }}>{step.payload}</p>
            </div>

            <div style={{ background: 'var(--grey-100)', padding: '15px', borderRadius: '6px' }}>
              <strong style={{ color: 'var(--eu-blue)' }}>🔄 Protocol</strong>
              <p style={{ marginTop: '8px', marginBottom: 0 }}>{step.protocol}</p>
            </div>

            <div style={{ background: 'var(--grey-100)', padding: '15px', borderRadius: '6px' }}>
              <strong style={{ color: 'var(--eu-blue)' }}>🔐 Trust Services</strong>
              <p style={{ marginTop: '8px', marginBottom: 0 }}>{step.trustServices}</p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px',
            gap: '10px'
          }}>
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              style={{
                padding: '12px 30px',
                background: currentStep === 0 ? 'var(--grey-300)' : 'var(--eu-blue)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 600
              }}
            >
              ← Previous Step
            </button>

            <div style={{ textAlign: 'center', padding: '12px', color: 'var(--grey-700)' }}>
              Step {currentStep + 1} of {scenario.steps.length}
            </div>

            <button
              onClick={() => setCurrentStep(Math.min(scenario.steps.length - 1, currentStep + 1))}
              disabled={currentStep === scenario.steps.length - 1}
              style={{
                padding: '12px 30px',
                background: currentStep === scenario.steps.length - 1 ? 'var(--grey-300)' : 'var(--eu-blue)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: currentStep === scenario.steps.length - 1 ? 'not-allowed' : 'pointer',
                fontWeight: 600
              }}
            >
              Next Step →
            </button>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #e6f0ff 0%, #cce0ff 100%)',
          borderLeft: '5px solid var(--eu-blue)',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '30px'
        }}>
          <h4 style={{ marginTop: 0 }}>Key Architectural Insights from Scenarios</h4>
          <ul style={{ lineHeight: 1.8, marginBottom: 0 }}>
            <li>
              <strong>Semantic stability:</strong> Both scenarios use the same EconomicOperator/Mandate semantic model, 
              but different protocols (OpenID4VC vs eDelivery)
            </li>
            <li>
              <strong>Payload flexibility:</strong> JSON-LD VC for wallets, JSON-LD without VC envelope for eDelivery - 
              same RDF semantics
            </li>
            <li>
              <strong>Protocol agnosticism:</strong> OpenID4VCI, OpenID4VP, AS4, and QERDS all operate above the semantic layer
            </li>
            <li>
              <strong>Trust orthogonality:</strong> eSignatures, eSeals, timestamps, and QERDS delivery evidence are 
              independent of semantic models
            </li>
            <li>
              <strong>SHACL validation:</strong> Works identically whether credential comes from a wallet or eDelivery
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

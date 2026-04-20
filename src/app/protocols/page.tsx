'use client'

import { useState, useEffect } from 'react'

const protocols = {
  openid4vci: {
    name: 'OpenID4VCI',
    fullName: 'OpenID for Verifiable Credential Issuance',
    description: 'Standard protocol for issuing verifiable credentials to wallets',
    steps: [
      { actor: 'Wallet', action: 'Requests credential metadata', target: 'Issuer' },
      { actor: 'Issuer', action: 'Returns credential offer', target: 'Wallet' },
      { actor: 'Wallet', action: 'Requests access token', target: 'Issuer' },
      { actor: 'Issuer', action: 'Issues access token', target: 'Wallet' },
      { actor: 'Wallet', action: 'Requests credential', target: 'Issuer' },
      { actor: 'Issuer', action: 'Issues VC (JSON-LD)', target: 'Wallet' }
    ]
  },
  openid4vp: {
    name: 'OpenID4VP',
    fullName: 'OpenID for Verifiable Presentations',
    description: 'Standard protocol for presenting credentials to verifiers',
    steps: [
      { actor: 'Verifier', action: 'Requests presentation', target: 'Wallet' },
      { actor: 'Wallet', action: 'User consents', target: 'Wallet' },
      { actor: 'Wallet', action: 'Creates VP (selected VCs)', target: 'Verifier' },
      { actor: 'Verifier', action: 'Validates signatures', target: 'Verifier' },
      { actor: 'Verifier', action: 'Checks SHACL constraints', target: 'Verifier' },
      { actor: 'Verifier', action: 'Grants access', target: 'Wallet' }
    ]
  },
  edelivery: {
    name: 'eDelivery / AS4',
    fullName: 'EU CEF eDelivery with AS4 Profile',
    description: 'Legally significant backend document exchange',
    steps: [
      { actor: 'Sender', action: 'Prepares business document', target: 'Sender' },
      { actor: 'Sender', action: 'Signs document (eSeal)', target: 'Sender' },
      { actor: 'Sender', action: 'Sends via AS4', target: 'Access Point' },
      { actor: 'Access Point', action: 'Routes to recipient AP', target: 'Access Point' },
      { actor: 'Access Point', action: 'Delivers document', target: 'Receiver' },
      { actor: 'Receiver', action: 'Sends delivery receipt', target: 'Sender' }
    ]
  },
  qerds: {
    name: 'QERDS',
    fullName: 'Qualified Electronic Registered Delivery Service',
    description: 'Proof of delivery with legal evidentiary value',
    steps: [
      { actor: 'Sender', action: 'Submits document', target: 'QERDS Provider' },
      { actor: 'QERDS Provider', action: 'Timestamps submission', target: 'QERDS Provider' },
      { actor: 'QERDS Provider', action: 'Delivers to recipient', target: 'Receiver' },
      { actor: 'Receiver', action: 'Acknowledges receipt', target: 'QERDS Provider' },
      { actor: 'QERDS Provider', action: 'Timestamps receipt', target: 'QERDS Provider' },
      { actor: 'QERDS Provider', action: 'Issues delivery evidence', target: 'Sender' }
    ]
  }
}

export default function ProtocolsPage() {
  const [selectedProtocol, setSelectedProtocol] = useState<keyof typeof protocols>('openid4vci')
  const [animationStep, setAnimationStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isAnimating) {
      const timer = setInterval(() => {
        setAnimationStep((prev) => {
          const nextStep = prev + 1
          if (nextStep >= protocols[selectedProtocol].steps.length) {
            setIsAnimating(false)
            return 0
          }
          return nextStep
        })
      }, 1500)
      return () => clearInterval(timer)
    }
  }, [isAnimating, selectedProtocol])

  const startAnimation = () => {
    setAnimationStep(0)
    setIsAnimating(true)
  }

  const stopAnimation = () => {
    setIsAnimating(false)
    setAnimationStep(0)
  }

  const protocol = protocols[selectedProtocol]
  const currentStep = isAnimating ? animationStep : -1

  return (
    <>
      <section>
        <h2>🔄 Interaction & Exchange Protocols</h2>
        
        <p>
          Multiple protocols can operate <strong>above the same payload objects</strong>. The semantic model and 
          syntax binding are independent of the protocol used for exchange.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #e6f0ff 0%, #cce0ff 100%)',
          borderLeft: '5px solid var(--eu-blue)',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h4 style={{ marginTop: 0 }}>Protocol Layer Principle</h4>
          <p style={{ marginBottom: 0 }}>
            Protocols are <strong>replaceable</strong>. The same CompanyIdentityCredential can be issued via OpenID4VCI 
            to a wallet, presented via OpenID4VP to a verifier, or exchanged via eDelivery/AS4 between backend systems. 
            The semantic content remains identical.
          </p>
        </div>

        <h3>Select Protocol to Visualize</h3>
        <div className="card-grid">
          {Object.entries(protocols).map(([key, proto]) => (
            <div
              key={key}
              className="card"
              onClick={() => {
                setSelectedProtocol(key as keyof typeof protocols)
                stopAnimation()
              }}
              style={{
                border: selectedProtocol === key ? '3px solid var(--eu-blue)' : '1px solid var(--grey-300)',
                background: selectedProtocol === key ? 'var(--light-blue)' : 'white'
              }}
            >
              <h4 style={{ color: 'var(--eu-blue)' }}>{proto.name}</h4>
              <p style={{ fontSize: '0.9em', fontWeight: 500 }}>{proto.fullName}</p>
              <p style={{ fontSize: '0.85em', marginBottom: 0 }}>{proto.description}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            style={{
              background: isAnimating ? 'var(--grey-300)' : 'var(--eu-blue)',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '6px',
              fontSize: '1em',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
          >
            ▶️ Animate Flow
          </button>
          <button
            onClick={stopAnimation}
            disabled={!isAnimating}
            style={{
              background: !isAnimating ? 'var(--grey-300)' : 'var(--danger)',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '6px',
              fontSize: '1em',
              cursor: !isAnimating ? 'not-allowed' : 'pointer'
            }}
          >
            ⏸️ Stop
          </button>
        </div>

        <div style={{
          border: '2px solid var(--grey-300)',
          borderRadius: '8px',
          padding: '30px',
          marginTop: '30px',
          background: 'white',
          minHeight: '500px'
        }}>
          <h3 style={{ marginTop: 0 }}>{protocol.fullName}</h3>
          <p style={{ color: 'var(--grey-700)', marginBottom: '30px' }}>{protocol.description}</p>

          <div style={{ position: 'relative' }}>
            {protocol.steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '25px',
                  opacity: currentStep >= idx || currentStep === -1 ? 1 : 0.3,
                  transform: currentStep === idx ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  background: currentStep === idx ? '#fff3cd' : 'transparent',
                  padding: '15px',
                  borderRadius: '8px',
                  border: currentStep === idx ? '2px solid #ffc107' : '2px solid transparent'
                }}
              >
                <div style={{
                  minWidth: '120px',
                  textAlign: 'center',
                  background: 'var(--light-blue)',
                  border: '2px solid var(--eu-blue)',
                  borderRadius: '8px',
                  padding: '10px',
                  fontWeight: 600
                }}>
                  {step.actor}
                </div>
                
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0 20px'
                }}>
                  <div style={{
                    flex: 1,
                    height: '3px',
                    background: currentStep >= idx || currentStep === -1 
                      ? 'linear-gradient(to right, var(--eu-blue), var(--success))' 
                      : 'var(--grey-300)',
                    position: 'relative'
                  }}>
                    {(currentStep === idx) && (
                      <div style={{
                        position: 'absolute',
                        right: 0,
                        top: '-8px',
                        width: '20px',
                        height: '20px',
                        background: 'var(--success)',
                        borderRadius: '50%',
                        animation: 'pulse 1s infinite'
                      }} />
                    )}
                  </div>
                  <div style={{
                    fontSize: '1.5em',
                    color: currentStep >= idx || currentStep === -1 ? 'var(--eu-blue)' : 'var(--grey-300)',
                    margin: '0 10px'
                  }}>
                    →
                  </div>
                </div>

                <div style={{
                  minWidth: '120px',
                  textAlign: 'center',
                  background: '#d4edda',
                  border: '2px solid var(--success)',
                  borderRadius: '8px',
                  padding: '10px',
                  fontWeight: 600
                }}>
                  {step.target}
                </div>

                <div style={{
                  marginLeft: '20px',
                  flex: 2,
                  fontSize: '0.9em',
                  color: 'var(--grey-700)'
                }}>
                  {step.action}
                </div>
              </div>
            ))}
          </div>

          {isAnimating && (
            <div style={{
              textAlign: 'center',
              marginTop: '20px',
              color: 'var(--eu-blue)',
              fontWeight: 500
            }}>
              Step {currentStep + 1} of {protocol.steps.length}
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.7;
            }
          }
        `}</style>

        <h3 style={{ marginTop: '40px' }}>Protocol Comparison</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: 'var(--grey-100)', borderBottom: '2px solid var(--grey-300)' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Protocol</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Use Case</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Payload Format</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Trust Services</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--grey-200)' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>OpenID4VCI</td>
              <td style={{ padding: '12px' }}>Wallet credential issuance</td>
              <td style={{ padding: '12px' }}>JSON-LD VC 2.0</td>
              <td style={{ padding: '12px' }}>Data Integrity Proof</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--grey-200)' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>OpenID4VP</td>
              <td style={{ padding: '12px' }}>Credential presentation</td>
              <td style={{ padding: '12px' }}>JSON-LD VP</td>
              <td style={{ padding: '12px' }}>Signature verification</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--grey-200)' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>eDelivery/AS4</td>
              <td style={{ padding: '12px' }}>Backend B2B exchange</td>
              <td style={{ padding: '12px' }}>XML, JSON-LD, any</td>
              <td style={{ padding: '12px' }}>eSignature, eSeal</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', fontWeight: 600 }}>QERDS</td>
              <td style={{ padding: '12px' }}>Legally significant delivery</td>
              <td style={{ padding: '12px' }}>Payload-agnostic</td>
              <td style={{ padding: '12px' }}>Timestamp, delivery evidence</td>
            </tr>
          </tbody>
        </table>

        <div style={{
          background: '#fff3cd',
          borderLeft: '5px solid #ffc107',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '30px'
        }}>
          <h4 style={{ marginTop: 0 }}>Key Insight</h4>
          <p style={{ marginBottom: 0 }}>
            All four protocols can exchange the <strong>same semantic object</strong>. Whether a CompanyIdentityCredential 
            is issued via OpenID4VCI or delivered via eDelivery/QERDS, the RDF/OWL semantic model ensures the meaning 
            remains consistent and machine-interpretable.
          </p>
        </div>
      </section>
    </>
  )
}

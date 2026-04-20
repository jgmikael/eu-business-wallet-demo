export default function TrustPage() {
  return (
    <>
      <section>
        <h2>🔐 Trust Services & QERDS</h2>
        
        <p>
          Trust services provide <strong>cryptographic integrity</strong> and <strong>legal evidence</strong>. 
          They are <strong>orthogonal to semantic models</strong> - they apply to any payload format or protocol.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #e6f0ff 0%, #cce0ff 100%)',
          borderLeft: '5px solid var(--eu-blue)',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h4 style={{ marginTop: 0 }}>Trust Layer Principle</h4>
          <p style={{ marginBottom: 0 }}>
            Trust services are <strong>independent of semantics</strong>. An eSignature proves WHO issued data. 
            A timestamp proves WHEN. QERDS proves DELIVERY occurred. None of these change the semantic meaning of 
            "EconomicOperator" or "Mandate". The RDF triples remain identical whether signed, sealed, or timestamped.
          </p>
        </div>

        <h3>Trust Service Types</h3>

        <div className="card-grid">
          <div className="card" style={{ borderLeft: '4px solid var(--eu-blue)' }}>
            <h4>✍️ eSignature</h4>
            <p><strong>Purpose:</strong> Non-repudiation and authorship proof</p>
            <p><strong>Who:</strong> Natural persons (e.g., company representative)</p>
            <p><strong>Legal value:</strong> Qualified eSignature = handwritten signature equivalent (eIDAS)</p>
            <p style={{ fontSize: '0.9em', marginBottom: 0 }}>
              <strong>Example:</strong> Maria Virtanen signs a contract on behalf of Suomi Innovations Oy. 
              The eSignature proves Maria (not someone else) authorized the contract.
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #28a745' }}>
            <h4>🏢 eSeal</h4>
            <p><strong>Purpose:</strong> Organizational signatures for automated systems</p>
            <p><strong>Who:</strong> Legal entities (e.g., government agencies, companies)</p>
            <p><strong>Legal value:</strong> Qualified eSeal proves origin and integrity (eIDAS)</p>
            <p style={{ fontSize: '0.9em', marginBottom: 0 }}>
              <strong>Example:</strong> Finnish Trade Register applies eSeal to CompanyIdentityCredential. 
              The eSeal proves the credential originates from the registry and has not been tampered with.
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #ffc107' }}>
            <h4>🕐 Timestamp</h4>
            <p><strong>Purpose:</strong> Qualified temporal evidence</p>
            <p><strong>Who:</strong> Qualified Trust Service Provider</p>
            <p><strong>Legal value:</strong> Qualified timestamp proves data existed at specific time</p>
            <p style={{ fontSize: '0.9em', marginBottom: 0 }}>
              <strong>Example:</strong> A contract is timestamped at 2024-01-15T10:30:00Z. If a dispute arises about 
              when the contract was signed, the qualified timestamp provides legally binding proof.
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #dc3545' }}>
            <h4>📮 QERDS</h4>
            <p><strong>Purpose:</strong> Qualified Electronic Registered Delivery Service</p>
            <p><strong>Who:</strong> Qualified trust service provider</p>
            <p><strong>Legal value:</strong> Proof of delivery with evidentiary value (eIDAS)</p>
            <p style={{ fontSize: '0.9em', marginBottom: 0 }}>
              <strong>Example:</strong> Tax authority delivers administrative notice via QERDS. The delivery evidence 
              proves the notice was delivered to the recipient at a specific time, similar to registered mail.
            </p>
          </div>
        </div>

        <h3 style={{ marginTop: '40px' }}>QERDS Architecture</h3>

        <p>
          QERDS is <strong>NOT</strong> a semantic model, credential format, or exchange protocol. It is a 
          <strong>trust service</strong> that provides legally significant proof of delivery.
        </p>

        <div style={{
          background: 'white',
          border: '2px solid var(--grey-300)',
          borderRadius: '8px',
          padding: '30px',
          marginTop: '20px'
        }}>
          <h4>QERDS Delivery Flow</h4>
          
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ minWidth: '150px', background: 'var(--light-blue)', padding: '10px', borderRadius: '6px', fontWeight: 600 }}>
                1. Sender
              </div>
              <div style={{ margin: '0 15px', fontSize: '1.5em', color: 'var(--eu-blue)' }}>→</div>
              <div style={{ flex: 1 }}>Submits message to QERDS Provider</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ minWidth: '150px', background: '#d4edda', padding: '10px', borderRadius: '6px', fontWeight: 600 }}>
                2. QERDS Provider
              </div>
              <div style={{ margin: '0 15px', fontSize: '1.5em', color: 'var(--success)' }}>→</div>
              <div style={{ flex: 1 }}>Applies qualified timestamp to submission</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ minWidth: '150px', background: '#d4edda', padding: '10px', borderRadius: '6px', fontWeight: 600 }}>
                3. QERDS Provider
              </div>
              <div style={{ margin: '0 15px', fontSize: '1.5em', color: 'var(--success)' }}>→</div>
              <div style={{ flex: 1 }}>Delivers message to recipient (via eDelivery/AS4 or other)</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ minWidth: '150px', background: '#fff3cd', padding: '10px', borderRadius: '6px', fontWeight: 600 }}>
                4. Recipient
              </div>
              <div style={{ margin: '0 15px', fontSize: '1.5em', color: '#ffc107' }}>→</div>
              <div style={{ flex: 1 }}>Acknowledges receipt</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ minWidth: '150px', background: '#d4edda', padding: '10px', borderRadius: '6px', fontWeight: 600 }}>
                5. QERDS Provider
              </div>
              <div style={{ margin: '0 15px', fontSize: '1.5em', color: 'var(--success)' }}>→</div>
              <div style={{ flex: 1 }}>Applies qualified timestamp to receipt acknowledgment</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ minWidth: '150px', background: '#f8d7da', padding: '10px', borderRadius: '6px', fontWeight: 600 }}>
                6. QERDS Provider
              </div>
              <div style={{ margin: '0 15px', fontSize: '1.5em', color: '#dc3545' }}>→</div>
              <div style={{ flex: 1 }}>Issues DeliveryEvidence to sender (legally binding proof)</div>
            </div>
          </div>
        </div>

        <h3 style={{ marginTop: '40px' }}>DeliveryEvidence Semantic Model</h3>

        <p>The DeliveryEvidence object is itself semantically modeled:</p>

        <pre style={{
          background: 'var(--grey-100)',
          padding: '20px',
          borderRadius: '8px',
          fontSize: '0.85em',
          lineHeight: 1.5
        }}>
{`<#evidence1> a ebw:DeliveryEvidence ;
    ebw:deliveryTimestamp "2024-01-15T14:23:45Z"^^xsd:dateTime ;
    ebw:deliveryStatus "delivered" ;
    ebw:submissionTimestamp "2024-01-15T14:20:00Z"^^xsd:dateTime ;
    ebw:receiptTimestamp "2024-01-15T14:23:45Z"^^xsd:dateTime ;
    ebw:qerdsProvider "TrustProvider Inc." ;
    ebw:sender <did:ebsi:zSender123> ;
    ebw:recipient <did:ebsi:zRecipient456> ;
    ebw:messageId "urn:uuid:abc-123..." .`}
        </pre>

        <h3 style={{ marginTop: '40px' }}>Trust Services Comparison</h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: 'var(--grey-100)', borderBottom: '2px solid var(--grey-300)' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Service</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>What It Proves</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Legal Basis (EU)</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--grey-200)' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>eSignature</td>
              <td style={{ padding: '12px' }}>Identity of signer + non-repudiation</td>
              <td style={{ padding: '12px' }}>eIDAS Art. 25</td>
              <td style={{ padding: '12px' }}>Contracts, authorizations</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--grey-200)' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>eSeal</td>
              <td style={{ padding: '12px' }}>Origin + integrity</td>
              <td style={{ padding: '12px' }}>eIDAS Art. 35</td>
              <td style={{ padding: '12px' }}>Automated issuance, certificates</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--grey-200)' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>Timestamp</td>
              <td style={{ padding: '12px' }}>Temporal proof (when)</td>
              <td style={{ padding: '12px' }}>eIDAS Art. 41</td>
              <td style={{ padding: '12px' }}>Archiving, dispute resolution</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', fontWeight: 600 }}>QERDS</td>
              <td style={{ padding: '12px' }}>Delivery occurred</td>
              <td style={{ padding: '12px' }}>eIDAS Art. 44</td>
              <td style={{ padding: '12px' }}>Administrative notices, legal notifications</td>
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
          <h4 style={{ marginTop: 0 }}>Critical Distinction</h4>
          <p style={{ marginBottom: 0 }}>
            <strong>QERDS is not the semantic model.</strong> QERDS is not the VC format. QERDS is not the exchange protocol. 
            QERDS is a <strong>trust service</strong> that proves delivery occurred. It sits at layer 5 (trust services) 
            and can be applied to any payload format (JSON-LD, XML, PDF) exchanged via any protocol (eDelivery, HTTPS, etc.). 
            The DeliveryEvidence output is itself a semantic object (ebw:DeliveryEvidence) that can be stored and verified.
          </p>
        </div>
      </section>
    </>
  )
}

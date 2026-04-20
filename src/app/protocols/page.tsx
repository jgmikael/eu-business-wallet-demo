export default function ProtocolsPage() {
  return (
    <section>
      <h2>Interaction & Exchange Protocols</h2>
      <p>
        Visualizes how different protocols (OpenID4VC, eDelivery, QERDS) operate above 
        the payload layer.
      </p>
      
      <h3>Protocol Flows</h3>
      <ul>
        <li><strong>OpenID4VCI</strong> - Credential issuance to wallet</li>
        <li><strong>OpenID4VP</strong> - Credential presentation to verifier</li>
        <li><strong>eDelivery / AS4</strong> - Backend business document exchange</li>
        <li><strong>QERDS</strong> - Qualified delivery with legal evidence</li>
      </ul>

      <p><em>Interactive protocol flow diagrams coming soon.</em></p>
    </section>
  )
}

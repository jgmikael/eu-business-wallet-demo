export default function ScenariosPage() {
  return (
    <section>
      <h2>Scenario Walkthroughs</h2>
      <p>
        Step-by-step demonstrations of realistic business scenarios using the full architecture.
      </p>
      
      <h3>Scenario 1: Company Identity & Mandate Presentation</h3>
      <ol>
        <li>Company registry issues CompanyIdentityCredential via OpenID4VCI</li>
        <li>Representative stores credential in EU Business Wallet</li>
        <li>Representative presents credential to public service via OpenID4VP</li>
        <li>Service validates signature, mandate, and SHACL constraints</li>
      </ol>

      <h3>Scenario 2: Legally Significant Document Delivery</h3>
      <ol>
        <li>Government agency prepares administrative notice</li>
        <li>Notice serialized as JSON-LD with eSignature</li>
        <li>Delivered via eDelivery/AS4 with QERDS</li>
        <li>DeliveryEvidence generated and timestamped</li>
      </ol>

      <p><em>Interactive scenario walkthroughs coming soon.</em></p>
    </section>
  )
}

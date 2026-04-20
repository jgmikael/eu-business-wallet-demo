export default function PayloadsPage() {
  return (
    <section>
      <h2>Multi-Format Payload Comparison</h2>
      <p>
        Demonstrates how the same semantic object (EconomicOperator with Mandate) can be 
        represented in multiple syntaxes.
      </p>
      
      <h3>Available Formats</h3>
      <ul>
        <li><strong>JSON-LD VC 2.0</strong> - <code>/data/payloads/company-vc.jsonld</code></li>
        <li><strong>Plain JSON</strong> - <code>/data/payloads/company-plain.json</code></li>
        <li><strong>XML</strong> - <code>/data/payloads/company-mandate.xml</code></li>
      </ul>

      <p><em>Interactive side-by-side comparison coming soon.</em></p>
    </section>
  )
}

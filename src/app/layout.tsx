import type { Metadata } from 'next'
import '../styles/globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'EU Business Wallet - Technical Reference Architecture',
  description: 'Interactive demonstration of EU Business Wallet technical architecture showing six layers of semantic interoperability',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="container">
            <h1>🇪🇺 EU Business Wallet</h1>
            <p>Technical Reference Architecture Demo</p>
            <p style={{ fontSize: '0.95em', marginTop: '10px', opacity: 0.9 }}>
              <em>"Semantic interoperability is mandatory; syntax, credential envelope, and protocol are replaceable bindings."</em>
            </p>
          </div>
        </header>

        <nav>
          <div className="container">
            <ul>
              <li><Link href="/">🏠 Home</Link></li>
              <li><Link href="/architecture">🏛️ Architecture</Link></li>
              <li><Link href="/semantic">🔗 Semantic Core</Link></li>
              <li><Link href="/payloads">📄 Payloads</Link></li>
              <li><Link href="/protocols">🔄 Protocols</Link></li>
              <li><Link href="/trust">🔐 Trust</Link></li>
              <li><Link href="/governance">⚖️ Governance</Link></li>
              <li><Link href="/scenarios">📋 Scenarios</Link></li>
            </ul>
          </div>
        </nav>

        <main>
          <div className="container">
            {children}
          </div>
        </main>

        <footer>
          <div className="container">
            <p>
              <strong>EU Business Wallet Technical Architecture Demonstrator</strong><br />
              Independent technical reference - Not an official EU publication
            </p>
            <p style={{ marginTop: '15px', fontSize: '0.9em' }}>
              <Link href="https://github.com/jgmikael/eu-business-wallet-demo">GitHub Repository</Link> | 
              MIT License | 2024
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}

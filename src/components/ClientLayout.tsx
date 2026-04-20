'use client'

import Link from 'next/link'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from './LanguageSelector'

function Navigation() {
  const { t } = useLanguage()
  
  return (
    <nav>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <ul style={{ margin: 0, flex: 1 }}>
            <li><Link href="/">🏠 {t.nav.home}</Link></li>
            <li><Link href="/architecture">🏛️ {t.nav.architecture}</Link></li>
            <li><Link href="/semantic">🔗 {t.nav.semantic}</Link></li>
            <li><Link href="/payloads">📄 {t.nav.payloads}</Link></li>
            <li><Link href="/protocols">🔄 {t.nav.protocols}</Link></li>
            <li><Link href="/trust">🔐 {t.nav.trust}</Link></li>
            <li><Link href="/governance">⚖️ {t.nav.governance}</Link></li>
            <li><Link href="/scenarios">📋 {t.nav.scenarios}</Link></li>
          </ul>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Navigation />
      <main>
        <div className="container">
          {children}
        </div>
      </main>
    </LanguageProvider>
  )
}

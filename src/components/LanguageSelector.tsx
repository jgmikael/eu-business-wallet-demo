'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Locale } from '@/lib/i18n'

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage()

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      background: 'var(--grey-100)',
      borderRadius: '6px',
      padding: '4px'
    }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          style={{
            padding: '8px 12px',
            border: 'none',
            background: locale === lang.code ? 'var(--eu-blue)' : 'transparent',
            color: locale === lang.code ? 'white' : 'var(--grey-700)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9em',
            fontWeight: locale === lang.code ? 600 : 400,
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title={lang.name}
        >
          <span>{lang.flag}</span>
          <span style={{ fontSize: '0.85em' }}>{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}

'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Locale, getTranslations, Translations } from '@/lib/i18n'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [t, setT] = useState<Translations>(getTranslations('en'))

  useEffect(() => {
    // Load locale from localStorage on mount
    const savedLocale = localStorage.getItem('locale') as Locale | null
    if (savedLocale && ['en', 'fi', 'de', 'fr'].includes(savedLocale)) {
      setLocaleState(savedLocale)
      setT(getTranslations(savedLocale))
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    setT(getTranslations(newLocale))
    localStorage.setItem('locale', newLocale)
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

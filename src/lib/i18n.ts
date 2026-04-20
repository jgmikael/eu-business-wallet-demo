export type Locale = 'en' | 'fi' | 'de' | 'fr'

export interface Translations {
  nav: {
    home: string
    architecture: string
    semantic: string
    payloads: string
    protocols: string
    trust: string
    governance: string
    scenarios: string
  }
  home: {
    title: string
    subtitle: string
    tagline: string
    description: string
    features: {
      semantic: string
      payloads: string
      protocols: string
      trust: string
      governance: string
      scenarios: string
    }
  }
  common: {
    learnMore: string
    documentation: string
    selectLanguage: string
    demo: string
    example: string
  }
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: 'Home',
      architecture: 'Architecture',
      semantic: 'Semantic Core',
      payloads: 'Payloads',
      protocols: 'Protocols',
      trust: 'Trust Services',
      governance: 'Governance',
      scenarios: 'Scenarios'
    },
    home: {
      title: 'EU Business Wallet',
      subtitle: 'Technical Architecture Demonstrator',
      tagline: 'Six-Layer Semantic Interoperability Reference',
      description: 'Production-ready reference implementation showing how semantic standards, multiple payload formats, and trust services work together in the EU Business Wallet ecosystem.',
      features: {
        semantic: 'Explore the RDF/OWL/SKOS semantic foundation with vocabulary browser and RDF graph visualization',
        payloads: 'Compare JSON-LD VC, plain JSON, and XML representations of the same semantic object',
        protocols: 'Understand OpenID4VC, eDelivery/AS4, and QERDS with animated protocol flows',
        trust: 'Learn about eSignatures, eSeals, timestamps, and qualified services',
        governance: 'Conformance testing, audit trails, and semantic versioning strategies',
        scenarios: 'Step-by-step walkthroughs showing all six layers working together'
      }
    },
    common: {
      learnMore: 'Learn More',
      documentation: 'Documentation',
      selectLanguage: 'Select Language',
      demo: 'Demo',
      example: 'Example'
    }
  },
  fi: {
    nav: {
      home: 'Etusivu',
      architecture: 'Arkkitehtuuri',
      semantic: 'Semanttinen ydin',
      payloads: 'Aineistomuodot',
      protocols: 'Protokollat',
      trust: 'Luottamuspalvelut',
      governance: 'Hallinta',
      scenarios: 'Skenaariot'
    },
    home: {
      title: 'EU Business Wallet',
      subtitle: 'Tekninen arkkitehtuuridemonstroija',
      tagline: 'Kuusikerroksinen semanttisen yhteentoimivuuden viitearkkitehtuuri',
      description: 'Tuotantovalmis viitetoteutus, joka näyttää miten semanttiset standardit, useat aineistomuodot ja luottamuspalvelut toimivat yhdessä EU Business Wallet -ekosysteemissä.',
      features: {
        semantic: 'Tutustu RDF/OWL/SKOS semanttiseen perustaan sanastoselaimella ja RDF-graafin visualisoinnilla',
        payloads: 'Vertaile JSON-LD VC, tavallista JSON ja XML -esityksiä samasta semanttisesta objektista',
        protocols: 'Ymmärrä OpenID4VC, eDelivery/AS4 ja QERDS animoiduilla protokollavirtauksilla',
        trust: 'Opi sähköisistä allekirjoituksista, sineteistä, aikaleimoista ja hyväksytyistä palveluista',
        governance: 'Vaatimustenmukaisuustestaus, auditointijäljet ja semanttisen versionhallinnan strategiat',
        scenarios: 'Vaihe vaiheelta -läpikäynnit, jotka näyttävät kaikki kuusi kerrosta yhdessä toimivina'
      }
    },
    common: {
      learnMore: 'Lue lisää',
      documentation: 'Dokumentaatio',
      selectLanguage: 'Valitse kieli',
      demo: 'Demo',
      example: 'Esimerkki'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      architecture: 'Architektur',
      semantic: 'Semantischer Kern',
      payloads: 'Nutzlasten',
      protocols: 'Protokolle',
      trust: 'Vertrauensdienste',
      governance: 'Governance',
      scenarios: 'Szenarien'
    },
    home: {
      title: 'EU Business Wallet',
      subtitle: 'Technischer Architektur-Demonstrator',
      tagline: 'Sechsschichtige semantische Interoperabilitätsreferenz',
      description: 'Produktionsreife Referenzimplementierung, die zeigt, wie semantische Standards, mehrere Nutzlastformate und Vertrauensdienste im EU Business Wallet-Ökosystem zusammenarbeiten.',
      features: {
        semantic: 'Erkunden Sie die RDF/OWL/SKOS semantische Grundlage mit Vokabularbrowser und RDF-Graphvisualisierung',
        payloads: 'Vergleichen Sie JSON-LD VC, einfaches JSON und XML-Darstellungen desselben semantischen Objekts',
        protocols: 'Verstehen Sie OpenID4VC, eDelivery/AS4 und QERDS mit animierten Protokollabläufen',
        trust: 'Lernen Sie über elektronische Signaturen, Siegel, Zeitstempel und qualifizierte Dienste',
        governance: 'Konformitätsprüfung, Prüfpfade und semantische Versionierungsstrategien',
        scenarios: 'Schritt-für-Schritt-Anleitungen, die alle sechs Schichten zusammen zeigen'
      }
    },
    common: {
      learnMore: 'Mehr erfahren',
      documentation: 'Dokumentation',
      selectLanguage: 'Sprache wählen',
      demo: 'Demo',
      example: 'Beispiel'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      architecture: 'Architecture',
      semantic: 'Noyau sémantique',
      payloads: 'Charges utiles',
      protocols: 'Protocoles',
      trust: 'Services de confiance',
      governance: 'Gouvernance',
      scenarios: 'Scénarios'
    },
    home: {
      title: 'EU Business Wallet',
      subtitle: 'Démonstrateur d\'architecture technique',
      tagline: 'Référence d\'interopérabilité sémantique à six couches',
      description: 'Implémentation de référence prête pour la production montrant comment les normes sémantiques, plusieurs formats de charge utile et les services de confiance fonctionnent ensemble dans l\'écosystème EU Business Wallet.',
      features: {
        semantic: 'Explorez la fondation sémantique RDF/OWL/SKOS avec le navigateur de vocabulaire et la visualisation de graphe RDF',
        payloads: 'Comparez les représentations JSON-LD VC, JSON simple et XML du même objet sémantique',
        protocols: 'Comprenez OpenID4VC, eDelivery/AS4 et QERDS avec des flux de protocole animés',
        trust: 'Apprenez sur les signatures électroniques, les cachets, les horodatages et les services qualifiés',
        governance: 'Tests de conformité, pistes d\'audit et stratégies de versioning sémantique',
        scenarios: 'Guides pas à pas montrant les six couches fonctionnant ensemble'
      }
    },
    common: {
      learnMore: 'En savoir plus',
      documentation: 'Documentation',
      selectLanguage: 'Choisir la langue',
      demo: 'Démo',
      example: 'Exemple'
    }
  }
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en
}

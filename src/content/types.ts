export interface NavContent {
  home: string;
  about: string;
  services: string;
  parts: string;
  repair: string;
  wholesale: string;
  why: string;
  contact: string;
  cta: string;
  menu: string;
  close: string;
  switchTo: string;
}

export interface HeroContent {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  microline: string;
  scroll: string;
  /** Small technical labels floating over the exploded-device visual. */
  partLabels: string[];
}

export interface TrustItem {
  title: string;
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  body: string;
  points: { label: string; text: string }[];
}

export interface ServiceItem {
  index: string;
  /** Anchor id so navigation can target this specific service. */
  anchor?: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
}

export interface ServicesContent {
  eyebrow: string;
  heading: string;
  intro: string;
  items: ServiceItem[];
}

export interface PartCategory {
  title: string;
  description: string;
}

export interface PartsContent {
  eyebrow: string;
  heading: string;
  intro: string;
  categories: PartCategory[];
  brandsLabel: string;
  brands: string[];
  availabilityNote: string;
  checkAvailability: string;
  /** Prefilled WhatsApp inquiry text used when WhatsApp is configured. */
  inquiryMessage: string;
}

export interface RepairStep {
  title: string;
  description: string;
}

export interface RepairContent {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  supporting: string;
  steps: RepairStep[];
}

export interface Benefit {
  title: string;
  text: string;
}

export interface WhyContent {
  eyebrow: string;
  heading: string;
  statement: string;
  primary: Benefit[];
  supporting: Benefit[];
}

export interface SignatureContent {
  line1: string;
  line2: string;
  caption: string;
}

export interface ContactContent {
  eyebrow: string;
  heading: string;
  description: string;
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  location: string;
  hoursLabel: string;
  addressLabel: string;
  comingSoon: string;
  comingSoonTitle: string;
  responseNote: string;
  soon: string;
  channelsTitle: string;
}

export interface FooterContent {
  descriptor: string;
  rights: string;
  navTitle: string;
  contactTitle: string;
  builtLine: string;
}

export interface MetaContent {
  title: string;
  description: string;
}

export interface Dictionary {
  nav: NavContent;
  hero: HeroContent;
  trust: TrustItem[];
  about: AboutContent;
  services: ServicesContent;
  parts: PartsContent;
  repair: RepairContent;
  why: WhyContent;
  signature: SignatureContent;
  contact: ContactContent;
  footer: FooterContent;
  meta: MetaContent;
}

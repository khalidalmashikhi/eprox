export interface PageMeta {
  title: string;
  description: string;
}

export interface CtaBlock {
  eyebrow: string;
  title: string;
  text: string;
  button: string;
}

export interface PartsPage {
  meta: PageMeta;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  catalogueEyebrow: string;
  catalogueTitle: string;
  categories: { title: string; description: string }[];
  cta: CtaBlock;
}

export interface RepairPage {
  meta: PageMeta;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  processEyebrow: string;
  processTitle: string;
  processIntro: string;
  steps: { title: string; description: string }[];
  expertiseEyebrow: string;
  expertiseTitle: string;
  expertiseIntro: string;
  expertise: { title: string; text: string }[];
  cta: CtaBlock;
}

export interface WholesalePage {
  meta: PageMeta;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: { title: string; text: string }[];
  cta: CtaBlock;
}

export interface AboutPage {
  meta: PageMeta;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  quote: string;
  quoteAuthor: string;
  blocksEyebrow: string;
  blocksTitle: string;
  blocks: { label: string; title: string; text: string }[];
  cta: CtaBlock;
}

export interface ContactPage {
  meta: PageMeta;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  formTitle: string;
  formIntro: string;
  fields: {
    name: string;
    namePlaceholder: string;
    contact: string;
    contactPlaceholder: string;
    device: string;
    devicePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
  formNoteWhatsapp: string;
  formNoteEmail: string;
  formNoteNone: string;
  detailsTitle: string;
  hoursTitle: string;
  mapTitle: string;
  mapButton: string;
}

export interface LegalPage {
  meta: PageMeta;
  eyebrow: string;
  title: string;
  updatedLabel: string;
  intro: string;
  note: string;
}

export interface PagesDict {
  parts: PartsPage;
  repair: RepairPage;
  wholesale: WholesalePage;
  about: AboutPage;
  contact: ContactPage;
  privacy: LegalPage;
  terms: LegalPage;
}

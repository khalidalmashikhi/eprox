import type { Dictionary } from "./types";

export const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    parts: "Spare Parts",
    repair: "Repair",
    wholesale: "Wholesale",
    why: "Why EPROX",
    contact: "Contact",
    cta: "Contact Us",
    menu: "Menu",
    close: "Close",
    switchTo: "العربية",
  },
  hero: {
    eyebrow: "Mobile Parts · Repair · Wholesale",
    titleLine1: "Behind every great device…",
    titleLine2: "is a great part.",
    description:
      "High-quality mobile phone spare parts, precise diagnostics, professional repair, and dependable supply solutions for repair centers and retailers.",
    primaryCta: "Explore Spare Parts",
    secondaryCta: "Contact Us",
    microline: "Carefully Selected Parts · Precise Diagnostics · Professional Workmanship",
    scroll: "Scroll",
    partLabels: ["Display", "Battery", "Camera", "Charging", "Logic Board"],
  },
  trust: [
    { title: "Carefully Selected Parts" },
    { title: "Professional Technicians" },
    { title: "Precise Diagnostics" },
    { title: "Reliable Service" },
  ],
  about: {
    eyebrow: "About EPROX",
    heading: "More Than Repair.",
    body: "At EPROX we start with the right part, continue with precise diagnostics and professional workmanship, and finish with a device that works as it should. We combine high-quality components, technical expertise, and attention to detail at every step — so you get a result you can trust.",
    points: [
      { label: "Selection", text: "Parts chosen against clear quality standards." },
      { label: "Diagnosis", text: "An accurate reading of the fault before any action." },
      { label: "Execution", text: "Professional work that respects every device." },
    ],
  },
  services: {
    eyebrow: "Our Services",
    heading: "Three services. One system.",
    intro:
      "From sourcing the right part to handing back a device that works — everything your phone needs, in one place.",
    items: [
      {
        index: "01",
        title: "Mobile Spare Parts",
        description:
          "Displays, batteries, cameras, charging ports, internal parts, and repair accessories — carefully selected to fit a wide range of devices.",
        cta: { label: "Explore Spare Parts", href: "parts" },
      },
      {
        index: "02",
        title: "Repair & Diagnostics",
        description:
          "Precise technical diagnostics and professional repair for a broad range of faults, with the right tools and hands-on experience before any work begins.",
        cta: { label: "Discover Repair", href: "repair" },
      },
      {
        index: "03",
        anchor: "wholesale",
        title: "Wholesale & Business Supply",
        description:
          "Flexible supply solutions for repair centers, retailers, and businesses — with consistent quality, fast communication, and dependable service.",
        cta: { label: "Wholesale Solutions", href: "wholesale" },
      },
    ],
  },
  parts: {
    eyebrow: "Spare Parts",
    heading: "Every component in its place.",
    intro:
      "An organized selection of essential parts and accessories, chosen to fit a wide range of devices.",
    categories: [
      { title: "Displays", description: "High-quality panels with accurate color and clarity." },
      { title: "Batteries", description: "Dependable cells that hold steady performance." },
      { title: "Cameras", description: "Front and rear modules with reliable resolution." },
      { title: "Charging Components", description: "Ports and charging circuitry for stable power." },
      { title: "Internal Components", description: "Speakers, buttons, and precise flex connectors." },
      { title: "Repair Tools & Accessories", description: "Tools that support clean, precise work." },
    ],
    brandsLabel: "We supply parts that fit devices across many brands",
    brands: [
      "Apple",
      "Samsung",
      "Huawei",
      "Honor",
      "Xiaomi",
      "Oppo",
      "Vivo",
      "Realme",
      "Google Pixel",
      "Nothing",
    ],
    availabilityNote: "Availability may vary by model and part. Contact us to confirm before ordering.",
    checkAvailability: "Check Part Availability",
    inquiryMessage: "Hello EPROX, I'd like to check the availability of a spare part for my device.",
  },
  repair: {
    eyebrow: "The Repair Journey",
    headingLine1: "Precise Diagnosis.",
    headingLine2: "Professional Execution.",
    supporting: "Every device is handled with care, from initial intake through final inspection and delivery.",
    steps: [
      { title: "Receive Device", description: "We document the device and fault exactly as received." },
      { title: "Diagnosis", description: "A precise technical check to find the root cause." },
      { title: "Explain the Fault and Cost", description: "We explain the fault, the fix, and the cost before we start." },
      { title: "Perform the Repair", description: "Professional work with the appropriate tools." },
      { title: "Final Quality Inspection", description: "A thorough test to confirm the quality of the work." },
      { title: "Device Delivery", description: "We hand back a device that works as it should." },
    ],
  },
  why: {
    eyebrow: "Why EPROX",
    heading: "The difference is in the detail.",
    statement: "Quality is not a single step — it is a decision repeated at every stage of your device's journey.",
    primary: [
      { title: "Selected Quality", text: "Parts held to clear selection standards before they reach you." },
      { title: "Precise Diagnostics", text: "We identify the fault accurately before any action — no surprises." },
      { title: "Professional Execution", text: "Skilled hands that carry out the work with care and precision." },
    ],
    supporting: [
      { title: "Transparent Service", text: "An honest explanation of every step and cost." },
      { title: "Efficient Turnaround", text: "Respect for your time, without cutting corners." },
      { title: "After-Service Support", text: "Follow-up that keeps your mind at ease." },
    ],
  },
  signature: {
    line1: "Every Part Matters.",
    line2: "Every Device Deserves Better.",
    caption: "EPROX · Technical & Technology Solutions",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Looking for a Part or Need a Device Check?",
    description:
      "Reach out to the EPROX team to ask about spare parts, book a repair, or request a supply quote. We're here to help.",
    whatsapp: "Chat on WhatsApp",
    phone: "Call Us",
    email: "Email Us",
    instagram: "Instagram",
    location: "View on Map",
    hoursLabel: "Working Hours",
    addressLabel: "Address",
    comingSoonTitle: "Contact channels are being set up",
    comingSoon: "We're activating our official contact channels — they'll appear here shortly.",
    responseNote: "We reply to your enquiry as soon as possible.",
    soon: "Soon",
    channelsTitle: "Ways to reach us",
  },
  footer: {
    descriptor: "Technical & Technology Solutions",
    rights: "© EPROX. All rights reserved.",
    navTitle: "Sections",
    contactTitle: "Get in touch",
    builtLine: "للحلول الفنية والتقنية",
  },
  meta: {
    title: "EPROX | Premium Mobile Parts & Professional Repair",
    description:
      "EPROX provides high-quality mobile phone spare parts, professional repair services, technical diagnostics, and dependable supply solutions.",
  },
};

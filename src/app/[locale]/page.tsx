import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { locales, type Locale } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Parts } from "@/components/sections/Parts";
import { Repair } from "@/components/sections/Repair";
import { Why } from "@/components/sections/Why";
import { Signature } from "@/components/sections/Signature";
import { Contact } from "@/components/sections/Contact";

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <main id="top">
      <Hero dict={dict} locale={locale} />
      <TrustStrip dict={dict} />
      <About dict={dict} />
      <Services dict={dict} locale={locale} />
      <Parts dict={dict} locale={locale} />
      <Repair dict={dict} />
      <Why dict={dict} />
      <Signature dict={dict} />
      <Contact dict={dict} locale={locale} />
    </main>
  );
}

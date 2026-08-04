import type { ReactNode } from "react";

/**
 * Passthrough root layout. The real <html>/<body> — with the correct
 * lang and dir per locale — are rendered in app/[locale]/layout.tsx.
 * This is the recommended App Router pattern for internationalized sites.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

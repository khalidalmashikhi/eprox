import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";

export const latinFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-latin",
  weight: ["400", "500", "600", "700"],
});

export const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
});

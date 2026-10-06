import type { Metadata, Viewport } from "next";

const siteUrl = "https://imene-reign.framer.website";

export const viewport: Viewport = {
  themeColor: "#260029",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "The Reign Method | Formation Imène Reign — Mindset, Business & Immobilier Dubaï",
    template: "%s | Imène Reign",
  },
  description:
    "La formation qui connecte mindset d'exception, business digital et investissement immobilier à Dubaï. 5 modules vidéo, bonus exclusifs, communauté privée — 297€, accès à vie.",
  keywords: [
    "Imène Reign",
    "The Reign Method",
    "formation Dubaï",
    "investissement immobilier Dubaï",
    "business digital",
    "mindset entrepreneuriat",
    "liberté financière",
    "formation femmes",
  ],
  authors: [{ name: "Imène Reign" }],
  creator: "Imène Reign",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Imène Reign — The Reign Method",
    title:
      "The Reign Method | Formation Imène Reign — Mindset, Business & Immobilier Dubaï",
    description:
      "Mindset d'exception, business digital et immobilier à Dubaï. 5 modules, communauté privée, guide PDF, live mensuel — accès à vie pour 297€.",
    images: [
      {
        url: "/assets/images/image-fb198ca3.jpg",
        width: 1200,
        height: 630,
        alt: "Imène Reign présente The Reign Method — formation business et immobilier à Dubaï",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Reign Method | Formation Imène Reign",
    description:
      "La formation qui connecte mindset, business digital et immobilier à Dubaï. 5 modules, bonus exclusifs — 297€, accès à vie.",
    images: ["/assets/images/image-fb198ca3.jpg"],
  },
  icons: {
    icon: "/assets/images/image-2ea65ec3.png",
    apple: "/assets/images/image-2ea65ec3.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

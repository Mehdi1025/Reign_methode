import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imene Reign",
  description:
    "Implantez-vous et investissez à Dubaï avec stratégie. Imène Reign vous guide avec expertise terrain et vision long terme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr">
      <body>{children}</body>
    </html>
  );
}

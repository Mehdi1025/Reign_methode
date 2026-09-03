import { loadFramerHtml } from "@/lib/framer";

const { headHtml } = loadFramerHtml();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <head suppressHydrationWarning dangerouslySetInnerHTML={{ __html: headHtml }} />
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

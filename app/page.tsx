// Fallback route — en pratique "/" sert public/index.html via rewrite (next.config + vercel.json).
// Évite le conflit React #405 entre Next.js et l'hydratation Framer.
export default function Home() {
  return null;
}

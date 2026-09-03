# Imene Reign — Next.js

Site **Imene Reign** (export Framer via NoCodeXport) intégré dans un projet Next.js.

Source originale : https://imene-reign.framer.website

## Structure

```
imene_site1/
├── app/                  # App Next.js (layout, routing)
├── public/
│   ├── index.html        # Page d'accueil Framer (HTML original)
│   ├── 404.html          # Page 404 originale
│   ├── favicon.ico
│   └── assets/           # Images, fonts, vidéos, scripts Framer
├── scripts/
│   └── post-export.mjs   # Copie l'HTML original après le build
└── index.html            # Fichier source original (conservé)
```

## Commandes

```bash
# Installer les dépendances
npm install

# Lancer en développement (http://localhost:3000)
npm run dev

# Build statique pour production (dossier out/)
npm run build
```

## Hébergement

Le build produit un site statique dans `out/` compatible avec :

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

## Contenu du site

Landing page **The Reign Method** — formation Imène Reign sur le mindset, le business digital et l'investissement immobilier à Dubaï.

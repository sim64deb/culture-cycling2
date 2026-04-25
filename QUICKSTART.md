# ⚡ QUICK START — 5 étapes pour mettre le site en ligne

## ✅ Étape 1 — Installer Node.js (une seule fois)
👉 https://nodejs.org/ — version LTS

## ✅ Étape 2 — Tester en local
```bash
cd peloton-iq
npm install
npm run dev
```
→ http://localhost:5173

## ✅ Étape 3 — Push sur GitHub
- Créer un compte sur https://github.com/
- Créer un nouveau repo `peloton-iq` (vide, public ou privé)
- Dans le terminal :
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/peloton-iq.git
git push -u origin main
```

## ✅ Étape 4 — Déployer sur Vercel
- Créer un compte sur https://vercel.com/ (avec GitHub)
- "Add New Project" → import `peloton-iq` → "Deploy"
- ⏳ 1 minute → site en ligne 🎉

## ✅ Étape 5 (optionnel) — Activer l'onglet Récents
- Récupérer une clé API sur https://console.anthropic.com/
- Recharger ~5€ (Settings → Billing)
- Sur Vercel : Settings → Environment Variables
  - Name: `ANTHROPIC_API_KEY`
  - Value: ta clé
- Redeploy

---

📖 **Guide détaillé** : voir `README.md`

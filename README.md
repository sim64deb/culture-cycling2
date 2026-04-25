# 🚴 PÉLOTON IQ — Encyclopédie du Cyclisme

Application React complète : quiz, palmarès historique 1950–2026, pronostics avec algo prédictif, et résultats récents alimentés par IA.

---

## 📋 Sommaire

1. [Lancer le projet en local](#1-lancer-le-projet-en-local)
2. [Mettre le code sur GitHub](#2-mettre-le-code-sur-github)
3. [Déployer sur Vercel (gratuit)](#3-déployer-sur-vercel-gratuit)
4. [Configurer l'onglet « Récents » (optionnel)](#4-configurer-longlet--récents--optionnel)
5. [Acheter un nom de domaine (optionnel)](#5-acheter-un-nom-de-domaine-optionnel)
6. [Mettre à jour le site plus tard](#6-mettre-à-jour-le-site-plus-tard)

---

## 1. Lancer le projet en local

### Prérequis

Installer **Node.js** (version 18 ou plus récente) :
👉 https://nodejs.org/ — choisir la version « LTS »

Vérifier l'installation dans un terminal :
```bash
node --version    # devrait afficher v18.x.x ou plus
npm --version     # devrait afficher 9.x.x ou plus
```

### Installation

Dans le terminal, place-toi dans le dossier `peloton-iq` :

```bash
cd peloton-iq
npm install
```

(Ça va télécharger toutes les dépendances. Compte 1-2 minutes la première fois.)

### Lancer le serveur de développement

```bash
npm run dev
```

→ Ouvre automatiquement http://localhost:5173 dans ton navigateur. Le site est là ! 🎉

> **Note** : l'onglet « Récents » ne fonctionnera pas en local (il a besoin de la clé API). C'est normal. Voir section 4.

### Arrêter le serveur
`Ctrl + C` dans le terminal.

---

## 2. Mettre le code sur GitHub

### Si tu n'as pas encore de compte GitHub

1. Va sur https://github.com/ et crée un compte (gratuit)
2. Installe Git : https://git-scm.com/

### Créer le repository

1. Sur GitHub, clique sur **« New repository »** (en haut à droite, le « + »)
2. Nom : `peloton-iq` (ou ce que tu veux)
3. Laisse en **public** ou **private** selon ta préférence
4. **NE PAS cocher** « Initialize with README »
5. Clique **« Create repository »**

### Pousser le code

Dans le terminal, dans le dossier `peloton-iq` :

```bash
git init
git add .
git commit -m "Initial commit — PÉLOTON IQ"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/peloton-iq.git
git push -u origin main
```

(Remplace `TON_USERNAME` par ton nom GitHub.)

---

## 3. Déployer sur Vercel (gratuit)

Vercel = hébergement gratuit, déploiement automatique, HTTPS inclus.

### Création du compte
1. Va sur https://vercel.com/signup
2. Choisis **« Continue with GitHub »** (le plus simple)

### Import du projet
1. Sur le dashboard Vercel, clique **« Add New… » → « Project »**
2. Trouve le repo `peloton-iq` dans la liste, clique **« Import »**
3. Vercel détecte automatiquement Vite. **Ne change rien.**
4. Clique **« Deploy »**

⏳ Compte ~1 minute. Une URL en `peloton-iq-xxx.vercel.app` est générée.

**🎉 Ton site est en ligne, partageable.**

### Mises à jour automatiques

Tout `git push` sur la branche `main` déclenche un nouveau déploiement automatique. Plus rien à faire.

---

## 4. Configurer l'onglet « Récents » (optionnel)

Cet onglet utilise l'IA Claude pour récupérer les résultats récents. Il faut une clé API Anthropic.

### Obtenir une clé API

1. Crée un compte sur https://console.anthropic.com/
2. Va dans **API Keys** → **« Create Key »**
3. Recharge ton compte de quelques euros (Settings → Billing). **Coût réel : ~0,02€ par requête.**
4. Copie la clé (commence par `sk-ant-...`). **Tu ne pourras plus la revoir après.**

### Ajouter la clé à Vercel

1. Sur Vercel, ouvre ton projet
2. **Settings** → **Environment Variables**
3. Crée une variable :
   - **Name** : `ANTHROPIC_API_KEY`
   - **Value** : ta clé `sk-ant-...`
   - Coche les 3 environnements (Production, Preview, Development)
4. Clique **« Save »**
5. Va dans **Deployments** → sur le dernier déploiement → **« Redeploy »**

⏳ Après le redéploiement, l'onglet « Récents » fonctionne.

> ⚠️ **Sécurité** : la clé API reste sur le serveur Vercel, jamais exposée au navigateur. C'est ce que fait le fichier `api/results.js` (proxy serveur).

### Limiter les coûts (recommandé)

Dans la console Anthropic, **Settings → Billing → Spend Limit**, mets un plafond mensuel (ex : 5€). Au pire des cas tu paies 5€/mois, jamais plus.

---

## 5. Acheter un nom de domaine (optionnel)

Si tu veux `peloton-iq.com` au lieu de `peloton-iq-xxx.vercel.app` :

1. Achète un domaine sur **OVH**, **Namecheap**, ou **Cloudflare** (~10€/an)
2. Sur Vercel : projet → **Settings** → **Domains** → ajouter ton domaine
3. Vercel te donnera des enregistrements DNS à copier chez ton registrar
4. ⏳ 5-30 minutes d'attente, puis ton site est sur ton domaine avec HTTPS automatique

---

## 6. Mettre à jour le site plus tard

Pour modifier le code (ajouter des résultats, changer le design, etc.) :

```bash
# 1. Modifier les fichiers (par exemple src/App.jsx)
# 2. Tester localement
npm run dev

# 3. Une fois content, push sur GitHub
git add .
git commit -m "Description de la modif"
git push
```

Vercel redéploie automatiquement en ~1 minute. ✨

---

## 📁 Structure du projet

```
peloton-iq/
├── api/
│   └── results.js          # Serverless function (proxy IA)
├── public/
│   └── favicon.svg         # Icône du site
├── src/
│   ├── main.jsx            # Point d'entrée React
│   └── App.jsx             # Tout le code de l'app (~4000 lignes)
├── .env.example            # Variables d'environnement (modèle)
├── .gitignore
├── index.html              # HTML principal
├── package.json            # Dépendances
├── vite.config.js          # Config build
└── README.md               # Ce fichier
```

---

## 🔧 Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm install` | Installer les dépendances |
| `npm run dev` | Lancer en local (http://localhost:5173) |
| `npm run build` | Construire la version production |
| `npm run preview` | Tester le build production en local |

---

## ❓ Problèmes courants

**`npm: command not found`**
→ Node.js n'est pas installé. Télécharge-le : https://nodejs.org/

**Erreur lors de `npm install`**
→ Supprime `node_modules` et `package-lock.json`, relance `npm install`.

**L'onglet Récents affiche une erreur**
→ Variable `ANTHROPIC_API_KEY` manquante ou clé invalide sur Vercel. Voir section 4.

**Le site marche en local mais pas sur Vercel**
→ Vérifie les logs : sur Vercel → ton projet → **Deployments** → clique sur le déploiement → **« Logs »**.

---

Made with 🚴 and ❤️ for the cycling community.

# AXA Pricing App

Application web d’aide à la tarification d’un produit d’assurance IARD Entreprises.
Elle permet de saisir les informations d’un projet de construction, de les enregistrer, puis de générer automatiquement une **proposition commerciale** aux formats **PDF** et **Word (DOCX)**.

---

## 📌 Fonctionnalités

- **Visualisation de tous les devis** enregistrés via un tableau interactif
- **Création d’un nouveau devis** par formulaire web
- **Génération automatique de documents** : `Proposition_commerciale_<opportunité>_<date>.pdf` et `.docx`
- Architecture fullstack :
  - 🧠 Backend : Python + Flask + SQLAlchemy
  - 💻 Frontend : React + Vite + Material UI
  - 🐳 Conteneurisé avec Docker / docker-compose
- Base de données : SQLite (légère, idéale pour test ou prototypage)

---

## 🚀 Déploiement avec Docker

### 1. Cloner le dépôt

~~~
git clone https://github.com/mhbxyz/AxaPricingApp
cd AxaPricingApp
~~~

### 2. Lancer l'application

Utilisez le `Makefile` pour gérer vos environnements Docker :

~~~
make build      # Build les images Docker
make up         # Démarre les containers (frontend + backend)
make logs       # Affiche les logs en direct
~~~

Une fois démarré :

- 🌐 Frontend : http://localhost:5173
- 🔌 API Backend : http://localhost:5000

### 3. Nettoyage

Avant de relancer les containers, il est impératif de supprimer les dossiers suivants dans le dossier `./backend` :

- `documents/` – contient les fichiers PDF/DOCX générés
- `instance/` – dossier local de configuration SQLite (lié à Flask)

~~~
make down # or make clean
rm -rf ./backend/documents ./backend/instance
make up
~~~

> 💡 Ces dossiers sont recréés automatiquement avec les bons droits à chaque `docker-compose up`.

---

## 🧪 Structure des services (via `docker-compose.yml`)

- **backend**
  - Port : `5000`
  - Code : `./backend`
  - Persistance : base SQLite + génération de documents dans `./backend/documents`

- **frontend**
  - Port : `5173`
  - Code : `./frontend`
  - Communique avec l'API via `VITE_API_URL=http://localhost:5000`

---

## 📄 Exemple de documents générés

Chaque création de devis génère automatiquement :
- un fichier `.docx` (mise en page Word)
- un fichier `.pdf` (conversion du contenu HTML via WeasyPrint)

> Ces fichiers sont téléchargeables directement depuis l’écran d’accueil de l’application.

---

## 📂 Arborescence minimale

~~~
axa-pricing-app/
├── backend/
│   ├── src/axa_pricing_app/
│   ├── documents/
│   └── Dockerfile
├── frontend/
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml
├── Makefile
└── README.md
~~~

---

## 🖌️ Design

L’interface s’inspire du design system de [AXA France](https://www.axa.fr/), en utilisant :
- la typographie **Source Sans Pro**
- une palette de couleurs bleue (#00008F)
- des composants Material UI pour la cohérence visuelle

---

## 📃 Spécifications initiales

> Le projet a été conçu dans le cadre d’un test technique demandé par AXA.
> Objectif : proposer un outil simple de saisie et de génération de proposition tarifaire pour un produit d’assurance entreprise.

---

## 🧑‍💻 Auteurs

Développé par Manoah BERNIER.

---

## 📎 Notes

- Projet conçu pour un usage en environnement local. Pour un déploiement cloud, prévoir :
  - stockage de fichiers sur S3 ou équivalent
  - base de données plus solide (ex : PostgreSQL)

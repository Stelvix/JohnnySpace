# JohnnySpace

Projet de monitoring intelligent d’une plante en environnement domestique, avec une API backend Node.js/Express, une base PostgreSQL, et une interface React/Vite pour le suivi, les alertes et l’assistance vocal.

## 1. Vue d’ensemble

JohnnySpace est une application de supervision et de gestion d’un système de culture connecté. Elle permet de :

- recevoir des mesures de température, humidité et humidité du sol ;
- calculer l’état général de la plante ;
- déclencher des actions comme l’arrosage et l’éclairage ;
- afficher l’historique des mesures et des actions ;
- gérer des alertes liées à des seuils critiques ;
- proposer une interface de pilotage côté utilisateur.

Le projet est divisé en deux parties :

- un backend API REST dans [Back_Johnny_space](Back_Johnny_space)
- un frontend React + TypeScript dans [Front_Johnny_space/johnnyFront](Front_Johnny_space/johnnyFront)

## 2. Stack technique

### Backend

- Node.js
- Express.js
- PostgreSQL
- pg (client PostgreSQL)
- dotenv
- CORS

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS personnalisé

## 3. Structure du projet

```text
Workshop B3/
├── README.md
├── Back_Johnny_space/
│   ├── package.json
│   ├── server.js
│   ├── deploy-rpi.sh
│   ├── Readme_back.md
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── env.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repository/
│   │   ├── routes/
│   │   └── services/
│   └── .env.example
├── Front_Johnny_space/
│   └── johnnyFront/
│       ├── src/
│       ├── package.json
│       ├── vite.config.ts
│       └── README.md
└── ...
```

## 4. Backend : architecture

Le point d’entrée est [Back_Johnny_space/server.js](Back_Johnny_space/server.js).

Les éléments principaux sont :

- [Back_Johnny_space/src/app.js](Back_Johnny_space/src/app.js) : initialise Express, CORS, JSON parsing, health check et routes
- [Back_Johnny_space/src/routes/index.js](Back_Johnny_space/src/routes/index.js) : centralise les routes API
- [Back_Johnny_space/src/config/database.js](Back_Johnny_space/src/config/database.js) : configure le pool PostgreSQL
- [Back_Johnny_space/src/config/env.js](Back_Johnny_space/src/config/env.js) : charge les variables d’environnement
- [Back_Johnny_space/src/services](Back_Johnny_space/src/services) : logique métier
- [Back_Johnny_space/src/repository](Back_Johnny_space/src/repository) : accès aux données PostgreSQL
- [Back_Johnny_space/src/controllers](Back_Johnny_space/src/controllers) : gestion des requêtes HTTP

## 5. API backend

### Health check

- GET /api/health

### Mesures de la plante

- POST /api/readings
- GET /api/readings/status
- GET /api/readings/history
- GET /api/readings/stats

### Actions

- POST /api/actions/water
- DELETE /api/actions/water/:id
- POST /api/actions/lighting
- GET /api/actions/active
- GET /api/actions/history

### Alertes

- GET /api/alerts
- GET /api/alerts/unacknowledged
- GET /api/alerts/blocking
- PUT /api/alerts/:id/acknowledge

### Exemple de payload lecture

```json
{
  "temperature": 24.5,
  "humidity": 62,
  "soil_humidity": 45
}
```

## 6. Base de données

Le projet utilise PostgreSQL avec un pool de connexion local.

Les variables attendues sont :

- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD

Par défaut, le projet cible :

- host: localhost
- port: 5432
- base: johnnyspace
- utilisateur: postgres ou johnnyspace

## 7. Frontend

Le frontend présente des écrans pour :

- un tableau de bord principal ;
- la vue de la plante ;
- un assistant vocal ;
- l’état des équipements ;
- l’historique des mesures.

Les routes principales du frontend sont :

- /
- /ma-plante
- /assistant-vocal
- /equipements
- /historique

## 8. Démarrage local

### Backend

```bash
cd Back_Johnny_space
npm install
npm run dev
```

### Frontend

```bash
cd Front_Johnny_space/johnnyFront
npm install
npm run dev
```

### Vérification backend

```bash
curl http://localhost:3001/api/health
```

## 9. Déploiement Raspberry

Un script de déploiement est disponible dans [Back_Johnny_space/deploy-rpi.sh](Back_Johnny_space/deploy-rpi.sh).

Il installe :

- PostgreSQL
- Node.js si nécessaire
- le rôle et la base de données
- le fichier .env de production
- les dépendances backend
- le service systemd pour démarrer l’API automatiquement

Voir aussi [Back_Johnny_space/DEPLOYMENT.md](Back_Johnny_space/DEPLOYMENT.md).

## 10. Variables d’environnement typiques

```env
NODE_ENV=production
PORT=3001
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=johnnyspace
DB_USER=johnnyspace
DB_PASSWORD=StrongPassword123!
SOIL_DRY=30
SOIL_WET=70
TEMP_MIN=15
TEMP_MAX=30
HUMIDITY_MIN=40
HUMIDITY_MAX=80
```

## 11. Problèmes connus et dépannage

### Erreur EADDRINUSE

Le port 3001 est déjà utilisé par un ancien processus Node.

Vérifier puis tuer le PID :

```bash
sudo ss -lntp | grep 3001
sudo kill -9 <PID>
```

### PostgreSQL ne répond pas

Vérifier qu’il tourne :

```bash
sudo systemctl status postgresql
```

### Permissions sur les fichiers

Si le dossier est devenu inaccessible :

```bash
sudo chown -R johnny:johnny /home/johnny/Api/JohnnySpace/Back_Johnny_space
```

## 12. Objectif du projet

JohnnySpace vise à fournir un système autonome de suivi d’un jardin connecté, avec :

- surveillance des capteurs ;
- détection de conditions critiques ;
- action automatisée sur l’arrosage et l’éclairage ;
- interface simple et lisible pour l’utilisateur.

## 13. Références internes

- Backend : [Back_Johnny_space](Back_Johnny_space)
- Frontend : [Front_Johnny_space/johnnyFront](Front_Johnny_space/johnnyFront)
- Script de déploiement : [Back_Johnny_space/deploy-rpi.sh](Back_Johnny_space/deploy-rpi.sh)
- Fichier d’environnement exemple : [Back_Johnny_space/.env.production.example](Back_Johnny_space/.env.production.example)

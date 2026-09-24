# Documentation technique de déploiement – JohnnySpace API

Ce document décrit comment déployer l’API backend sur une Raspberry Pi avec PostgreSQL, en mode simple et robuste.

## 1. Objectif

Le backend Node.js/Express doit être déployé avec :

- PostgreSQL installé localement ;
- une base de données dédiée ;
- un fichier .env de production ;
- un service systemd pour démarrer automatiquement l’API ;
- un endpoint de santé pour vérifier le bon fonctionnement.

## 2. Prérequis

### Sur la Raspberry

- Debian / Raspberry Pi OS
- accès SSH
- droits sudo
- connexion réseau active

## 3. Copier le projet sur la Raspberry

Depuis ton PC Windows :

```powershell
scp -r "Trajectoire de mon dossier back" johnny@10.0.3.171:/home/johnny/Api/JohnnySpace/
```

Ensuite sur la Raspberry :

```bash
cd /home/johnny/Api/JohnnySpace
mv Back_Johnny_space api
cd /home/johnny/Api/JohnnySpace/api
```

## 4. Lancer le script de déploiement

```bash
cd /home/johnny/Api/JohnnySpace/api
chmod +x deploy-rpi.sh
sudo bash deploy-rpi.sh
```

Le script fait automatiquement :

- installation de PostgreSQL ;
- installation de Node.js si nécessaire ;
- création du rôle PostgreSQL ;
- création de la base de données ;
- génération du fichier .env ;
- installation des dépendances du backend ;
- création du service systemd ;
- redémarrage de l’API.

## 5. Variables du script

Le script utilise les variables suivantes :

```bash
APP_DIR=/home/johnny/Api/JohnnySpace/api
APP_USER=johnny
APP_GROUP=johnny
DB_NAME=johnnyspace
DB_USER=johnnyspace
DB_PASSWORD=StrongPassword123!
PORT=3001
```

## 6. Fichier .env généré

Le script crée le fichier :

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

## 7. Vérification PostgreSQL

Contrôler que PostgreSQL tourne :

```bash
sudo systemctl status postgresql
```

Se connecter à la base :

```bash
psql -h 127.0.0.1 -U johnnyspace -d johnnyspace
```

## 8. Vérification du service API

```bash
sudo systemctl status johnnyspace-api.service
```

Health check :

```bash
curl http://localhost:3001/api/health
```

Réponse attendue :

```json
{
  "status": "OK",
  "timestamp": "..."
}
```

## 9. Gestion du service

### Redémarrer

```bash
sudo systemctl restart johnnyspace-api.service
```

### Arrêter

```bash
sudo systemctl stop johnnyspace-api.service
```

### Démarrer

```bash
sudo systemctl start johnnyspace-api.service
```

### Voir les logs

```bash
sudo journalctl -u johnnyspace-api.service -f
```

## 12. Récapitulatif rapide

```bash
cd /home/johnny/Api/JohnnySpace/api
sudo bash deploy-rpi.sh
sudo systemctl status johnnyspace-api.service
curl http://localhost:3001/api/health
```

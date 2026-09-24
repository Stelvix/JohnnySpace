#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${APP_DIR:-$SCRIPT_DIR}"
APP_USER="${APP_USER:-johnny}"
APP_GROUP="${APP_GROUP:-johnny}"
DB_NAME="${DB_NAME:-johnnyspace}"
DB_USER="${DB_USER:-johnnyspace}"
DB_PASSWORD="${DB_PASSWORD:-StrongPassword123!}"
PORT="${PORT:-3001}"

echo "[1/6] Installation des paquets nécessaires..."
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib curl ca-certificates gnupg

if ! command -v node >/dev/null 2>&1; then
  echo "[2/6] Installation de Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! id "$APP_USER" >/dev/null 2>&1; then
  echo "[2/6] Création de l'utilisateur système..."
  sudo useradd --system --create-home --shell /usr/sbin/nologin "$APP_USER"
fi

if ! getent group "$APP_GROUP" >/dev/null 2>&1; then
  sudo groupadd "$APP_GROUP"
fi

sudo usermod -a -G "$APP_GROUP" "$APP_USER" >/dev/null 2>&1 || true
sudo chown -R "$APP_USER:$APP_GROUP" "$APP_DIR"

if [ ! -f "$APP_DIR/package.json" ]; then
  echo "Erreur : le backend n'est pas présent dans $APP_DIR."
  echo "Vérifie le chemin du dossier du projet et relance le script."
  exit 1
fi

sudo chown -R "$APP_USER:$APP_GROUP" "$APP_DIR"

echo "[3/6] Création de la base PostgreSQL..."
sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='${DB_USER}'" | grep -q 1 || \
  sudo -u postgres psql -c "CREATE ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASSWORD}';"

sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1 || \
  sudo -u postgres createdb -O "${DB_USER}" "${DB_NAME}"

sudo -u postgres psql -d "${DB_NAME}" -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};" >/dev/null

echo "[4/6] Génération du fichier .env de production..."
cat > "$APP_DIR/.env" <<EOF
NODE_ENV=production
PORT=${PORT}
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
SOIL_DRY=30
SOIL_WET=70
TEMP_MIN=15
TEMP_MAX=30
HUMIDITY_MIN=40
HUMIDITY_MAX=80
EOF

sudo chown "$APP_USER:$APP_GROUP" "$APP_DIR/.env"
sudo chmod 600 "$APP_DIR/.env"

echo "[5/6] Installation des dépendances du backend..."
cd "$APP_DIR"
npm install --omit=dev

echo "[6/6] Création du service systemd..."
sudo tee /etc/systemd/system/johnnyspace-api.service >/dev/null <<EOF
[Unit]
Description=JohnnySpace API
After=network.target postgresql.service

[Service]
Type=simple
User=${APP_USER}
Group=${APP_GROUP}
WorkingDirectory=${APP_DIR}
EnvironmentFile=${APP_DIR}/.env
ExecStart=/usr/bin/node ${APP_DIR}/server.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable johnnyspace-api.service
sudo systemctl restart johnnyspace-api.service

sleep 2
sudo systemctl status johnnyspace-api.service --no-pager --lines=20 || true

echo ""
echo "Déploiement terminé."
echo "API : http://<IP_RASPI>:${PORT}"
echo "Health check : http://<IP_RASPI>:${PORT}/api/health"

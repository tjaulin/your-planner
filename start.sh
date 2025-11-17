#!/bin/bash

# 🌸 Your Planner - Script de démarrage

echo "🌸 Bienvenue dans Your Planner!"
echo ""
echo "🚀 Démarrage de l'application..."
echo ""

# Vérifier si les dépendances sont installées
if [ ! -d "vendor" ]; then
    echo "📦 Installation des dépendances PHP..."
    composer install
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances JavaScript..."
    npm install
fi

# Vérifier si le fichier .env existe
if [ ! -f ".env" ]; then
    echo "⚙️  Configuration de l'environnement..."
    cp .env.example .env
    php artisan key:generate
fi

# Vérifier si la base de données est à jour
echo "🗄️  Vérification de la base de données..."
php artisan migrate --force

# Compiler les assets
echo "🎨 Compilation des assets..."
npm run build

# Lancer le serveur
echo ""
echo "✨ Tout est prêt!"
echo "🌸 L'application sera accessible sur: http://localhost:8000"
echo ""
echo "Pour arrêter le serveur, appuyez sur Ctrl+C"
echo ""

php artisan serve

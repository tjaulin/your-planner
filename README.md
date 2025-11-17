# 🌸 Your Planner - Ton compagnon bienveillant au quotidien
  
## About Laravel  

</div>Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:



---- [Simple, fast routing engine](https://laravel.com/docs/routing).

- [Powerful dependency injection container](https://laravel.com/docs/container).

## ✨ À propos- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.

- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).

**Your Planner** n'est pas une simple application de productivité. C'est un **compagnon personnel**, doux et bienveillant, qui aide à s'organiser, se détendre et retrouver confiance au quotidien.- Database agnostic [schema migrations](https://laravel.com/docs/migrations).

- [Robust background job processing](https://laravel.com/docs/queues).

Conçue avec amour pour Sara 💕- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).



---Laravel is accessible, powerful, and provides tools required for large, robust applications.



## 🎨 Philosophie du Design## Learning Laravel



- **Couleurs apaisantes** : Palette mauve pastel, blanc lavande et rose poudréLaravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

- **Interface minimaliste** : Épurée et non stressante

- **Tonalité bienveillante** : Chaque interaction est pensée pour encourager et réconforterIf you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

- **Responsive** : Fonctionne parfaitement sur mobile et desktop

## Laravel Sponsors

---

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

## 🚀 Fonctionnalités

### Premium Partners

### 🏠 Dashboard Personnalisé

- Aperçu des tâches du jour classées par catégorie- **[Vehikl](https://vehikl.com)**

- Citations motivantes quotidiennes- **[Tighten Co.](https://tighten.co)**

- Statistiques douces de progression- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**

- **[64 Robots](https://64robots.com)**

### 📋 Gestion des Tâches- **[Curotec](https://www.curotec.com/services/technologies/laravel)**

- Création, modification et suppression de tâches- **[DevSquad](https://devsquad.com/hire-laravel-developers)**

- Catégorisation (Travail, Loisir, Santé, Autre)- **[Redberry](https://redberry.international/laravel-development)**

- Niveau de priorité- **[Active Logic](https://activelogic.com)**

- Dates d'échéance

- Récurrence (quotidienne, hebdomadaire, mensuelle)## Contributing

- Système de validation avec checkbox

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

### 🌸 Espace Bien-être

- Suggestions d'activités bien-être (puzzle, dessin, lecture, méditation...)## Code of Conduct

- Journal personnel avec indicateur d'humeur

- Suivi doux des activités de la semaineIn order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

- Messages encourageants

## Security Vulnerabilities

### 🎨 Personnalisation

- Thème mauve pastel par défautIf you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

- Polices Poppins & Quicksand pour une lecture agréable

- Interface fluide avec micro-animations## License



---The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


## 🛠️ Stack Technique

```
Backend         : Laravel 11
Frontend        : Inertia.js + React 18
Styling         : TailwindCSS (personnalisé)
Auth            : Laravel Breeze
Base de données : SQLite (MySQL compatible)
```

---

## 📦 Installation

### Prérequis
- PHP >= 8.2
- Composer
- Node.js >= 18
- NPM ou Yarn

### Étapes

1. **Cloner le projet**
```bash
git clone [votre-repo]
cd your-planner
```

2. **Installer les dépendances PHP**
```bash
composer install
```

3. **Installer les dépendances JavaScript**
```bash
npm install
```

4. **Configurer l'environnement**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Configurer la base de données**
Le projet utilise SQLite par défaut. La base de données a déjà été créée.
Pour MySQL, éditez le fichier `.env` :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_planner
DB_USERNAME=root
DB_PASSWORD=
```

6. **Exécuter les migrations**
```bash
php artisan migrate
```

7. **Compiler les assets**
```bash
npm run build
# ou pour le développement :
npm run dev
```

8. **Lancer le serveur**
```bash
php artisan serve
```

L'application sera accessible sur `http://localhost:8000`

---

## 🎯 Utilisation

### Premier lancement
1. Créez un compte sur la page d'inscription
2. Connectez-vous
3. Découvrez votre dashboard personnalisé avec une citation du jour 🌸

### Créer une tâche
1. Cliquez sur "✨ Nouvelle tâche"
2. Remplissez les informations (titre, description, catégorie, priorité)
3. Ajoutez une date d'échéance si nécessaire
4. Choisissez une récurrence (optionnel)
5. Validez !

### Utiliser l'espace Bien-être
1. Accédez à la section "🌸 Bien-être"
2. Explorez les activités suggérées
3. Écrivez dans votre journal personnel
4. Choisissez votre humeur du jour
5. Consultez vos notes récentes

---

## 🌈 Palette de Couleurs

```
Mauve principal    : #C8A2C8
Blanc lavande      : #F8F8FF
Rose poudré        : #F2D7EE
Gris doux          : #F5F5F5
Lavande douce      : #E6E6FA
```

---

## 📁 Structure du Projet

```
your-planner/
├── app/
│   ├── Http/Controllers/
│   │   ├── TaskController.php
│   │   ├── NoteController.php
│   │   └── ProfileController.php
│   ├── Models/
│   │   ├── Task.php
│   │   ├── Note.php
│   │   ├── Theme.php
│   │   └── User.php
│   └── Policies/
│       ├── TaskPolicy.php
│       └── NotePolicy.php
├── database/
│   └── migrations/
│       ├── create_tasks_table.php
│       ├── create_themes_table.php
│       └── create_notes_table.php
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── DailyQuote.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── AddTaskModal.jsx
│   │   ├── Pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Wellbeing.jsx
│   │   └── Layouts/
│   │       └── AuthenticatedLayout.jsx
│   └── css/
│       └── app.css (Styles personnalisés)
└── routes/
    └── web.php
```

---

## 💬 Messages Bienveillants

L'application utilise une collection de citations motivantes qui changent chaque jour :

- "Aujourd'hui est une nouvelle opportunité de prendre soin de toi 🌸"
- "Chaque petit pas compte, tu fais de ton mieux 💜"
- "Tu es exactement là où tu dois être 🌼"
- "Prends le temps de respirer, tu mérites cette pause 🌿"
- "Ta valeur ne dépend pas de ta productivité 🦋"
- ... et bien d'autres !

---

## 🚧 Évolutions Futures (V2)

- [ ] Mode sombre avec palette pastel adaptée
- [ ] Notifications push douces
- [ ] Vue calendrier pour les tâches
- [ ] Export des notes en PDF
- [ ] Partage de listes entre utilisateurs
- [ ] Application mobile (PWA)
- [ ] Widget météo avec conseils bien-être
- [ ] Intégration méditation guidée
- [ ] Rappels bienveillants

---

## 🎨 Classes CSS Personnalisées

### Boutons
- `.btn-primary` : Bouton principal mauve
- `.btn-secondary` : Bouton secondaire rose poudré
- `.btn-ghost` : Bouton transparent

### Cartes
- `.card` : Carte de base avec ombre douce
- `.card-hover` : Carte interactive avec effet au survol

### Inputs
- `.input-pastel` : Input avec bordure lavande
- `.checkbox-pastel` : Checkbox personnalisée

### Badges
- `.badge-work` : Badge catégorie Travail
- `.badge-wellness` : Badge catégorie Loisir
- `.badge-health` : Badge catégorie Santé
- `.badge-other` : Badge catégorie Autre

---

## 🤝 Contribution

Ce projet est personnel, mais les suggestions sont les bienvenues ! N'hésitez pas à ouvrir une issue pour toute idée d'amélioration.

---

## 📄 Licence

Ce projet est sous licence MIT.

---

## 💜 Créé avec amour

Développé avec soin pour accompagner Sara dans son quotidien.

*"Ta valeur ne dépend pas de ta productivité"* ✨

---

<div align="center">
  
  **Prends soin de toi** 🌸
  
</div>

Ce guide vous aidera à installer et à exécuter l'application "Panier" localement sur votre machine. L'application utilise Node.js pour le backend, React pour le frontend, et MySQL comme base de données.

Prérequis
Assurez-vous d'avoir les éléments suivants installés sur votre machine :

Node.js (avec npm)
MySQL (ou utilisez XAMPP comme alternative)

Cloner le projet depuis GitHub

Étape 1: Installer les dépendances
Dans le dossier racine du projet, exécutez la commande suivante :
npm install

Étape 2: Configurer la base de données
Assurez-vous que votre serveur MySQL est en cours d'exécution.
Créez une base de données nommée ecommerce.

Étape 3: Démarrer le backend et le frontend simultanément
Dans le dossier racine du projet, exécutez la commande suivante :
npm start

Cela lancera à la fois le backend et le frontend grâce à concurrently.

Détails des Dépendances Principales :
axios : Bibliothèque HTTP pour effectuer des requêtes.
bcrypt : Pour le hachage sécurisé des mots de passe.
express : Framework pour construire des applications Web avec Node.js.
jsonwebtoken : Génération et vérification de JSON Web Tokens (JWT).
mysql2 : Pilote MySQL pour Node.js.
react-router-dom : Navigation déclarative pour React.
sequelize : ORM (Object-Relational Mapping) pour Node.js.

Accédez à http://localhost:3000 dans votre navigateur pour voir l'application "Panier" en action.

Félicitations ! Vous avez maintenant installé et démarré localement l'application "Ecommerce_Panier".
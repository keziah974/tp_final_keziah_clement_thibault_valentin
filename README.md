# Weather App - Application Meteo

Projet de groupe realise dans le cadre du cursus de developpement web a l'IPSSI.

## Presentation

Weather App est une application web developpee avec Angular permettant aux utilisateurs de rechercher une ville et de consulter en temps reel les donnees meteorologiques actuelles ainsi que les previsions detaillees sur 5 jours grace a l'API OpenWeather.

## Membres de l'equipe et repartition des taches

- Keziah (Membre 1) : Setup du projet, structure des dossiers, configuration du routing (/home, /weather/:city, /about), Navbar globale, page A propos statique, squelette du README et preparation des composants pour l'equipe.
- Clement (Membre 2) : Formulaire de recherche avec validation reactive, autocompletion et redirection vers la page meteo.
- Valentin (Membre 3) : Service API OpenWeather, requetes HTTP avec RxJS, typage TypeScript et gestion globale des erreurs.
- Thibault (Membre 4) : Affichage des conditions meteo actuelles et grille des previsions detaillees sur 5 jours.

## Technologies utilisees

- Angular (v21 - Standalone Components, Signals, Router, HttpClient)
- TypeScript
- HTML5 / CSS3
- RxJS
- OpenWeather API (Current Weather Data et 5 Day / 3 Hour Forecast)

## Installation et lancement

### Pre-requis

- Node.js (version 18 ou superieure recommandee)
- NPM
- Angular CLI

### Installation des dependances

```bash
npm install
```

### Lancement du serveur de developpement

```bash
ng serve
```

L'application sera accessible a l'adresse : `http://localhost:4200/`

## Configuration de la cle API OpenWeather

Pour recuperer les donnees meteorologiques, une cle API OpenWeather est necessaire :

1. Creer un compte sur https://openweathermap.org/
2. Generer une cle API dans la section API keys de votre compte.
3. Configurer la cle dans les fichiers d'environnement (`src/environments/environment.ts`) ou dans le service dedie :

```typescript
export const environment = {
  production: false,
  openWeatherApiKey: 'VOTRE_CLE_API_ICI',
  openWeatherApiUrl: 'https://api.openweathermap.org/data/2.5'
};
```

## Fonctionnalites

- Navigation fluide via le Router Angular (/home, /weather/:city, /about).
- Recherche de ville avec barre de recherche reactive (en cours de developpement par Clement).
- Recuperation asynchrone des donnees meteo via HttpClient (en cours de developpement par Valentin).
- Affichage de la meteo actuelle (temperature, ressenti, humidite, vent, icones) (en cours de developpement par Thibault).
- Previsions meteo detaillees sur 5 jours (en cours de developpement par Thibault).
- Page A propos presentant le projet, les technologies et les contributeurs.

## Architecture du projet

```text
src/
├── app/
│   ├── components/
│   │   └── navbar/
│   │       ├── navbar.component.ts
│   │       ├── navbar.component.html
│   │       └── navbar.component.css
│   ├── pages/
│   │   ├── home/
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.component.css
│   │   ├── weather/
│   │   │   ├── weather.component.ts
│   │   │   ├── weather.component.html
│   │   │   └── weather.component.css
│   │   └── about/
│   │       ├── about.component.ts
│   │       ├── about.component.html
│   │       └── about.component.css
│   ├── services/
│   ├── models/
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.ts
│   ├── app.html
│   └── app.css
├── styles.css
└── main.ts
```

## API OpenWeather

L'application exploite deux endpoints de l'API OpenWeather :
- Current Weather Data : `GET https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&lang=fr&appid={API_KEY}`
- 5 Day Forecast : `GET https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&lang=fr&appid={API_KEY}`

## Tests et collection Postman

La collection Postman pour tester les endpoints de l'API OpenWeather ainsi que les requetes de l'application sera disponible dans le dossier `postman/`.

## Difficultes rencontrees

Section a completer par l'equipe au fur et a mesure du developpement.

## Ameliorations futures

Section a completer par l'equipe (geolocalisation de l'utilisateur, mise en favoris des villes, passage Celsius/Fahrenheit, mode sombre, graphiques d'evolution des temperatures).

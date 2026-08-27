# MeteoVCTK

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.21.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Weather Service & API (OpenWeather)

### Configuration de la clé API

L'application utilise l'API OpenWeather via `WeatherService` (`src/app/core/weather.service.ts`). La clé API n'est jamais commitée dans le dépôt.

Pour configurer ta propre clé :

1. Copie `src/environments/environment.example.ts` vers `src/environments/environment.ts` (et `environment.prod.ts` si besoin).
2. Récupère une clé gratuite sur [openweathermap.org](https://openweathermap.org/api).
3. Remplace `YOUR_API_KEY_HERE` par ta clé dans `openWeatherApiKey`.

Ces fichiers (`environment.ts`, `environment.prod.ts`) sont listés dans `.gitignore` : ils ne doivent jamais être poussés sur le dépôt commun.

### Endpoints utilisés

| Endpoint | Méthode | Paramètres | Usage |
|---|---|---|---|
| `/data/2.5/weather` | GET | `q` (ville), `appid` (clé API), `units=metric` | Météo actuelle d'une ville |
| `/data/2.5/forecast` | GET | `q` (ville), `appid` (clé API), `units=metric` | Prévisions à 5 jours (par tranches de 3h) |

Base URL : `https://api.openweathermap.org/data/2.5`

### Collection Postman

Une collection Postman est disponible dans `postman/WeatherApp.postman_collection.json`.

Pour l'utiliser :

1. Dans Postman, `Import` puis sélectionner ce fichier.
2. Renseigner les variables de la collection :
   - `base_url` : déjà pré-remplie avec l'URL de l'API OpenWeather
   - `api_key` : ta clé API personnelle
   - `city` : ville à tester (ex. `Paris`)
3. Lancer les requêtes `Current Weather` et `Forecast`.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

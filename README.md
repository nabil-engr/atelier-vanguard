# Atelier Vanguard

Premium made-to-measure storefront and operations dashboard.

## Structure

- `api` — ASP.NET Core clean architecture API with Identity, JWT and PostgreSQL
- `ui` — Angular 20 + Bootstrap 5 responsive storefront and admin UI
- `stitch_luxury_atelier_e_commerce_system` — original Stitch design references

## Run with Docker

```bash
dotnet publish api/src/AtelierVanguard.Api/AtelierVanguard.Api.csproj -c Release -o api/publish
docker compose build ui
docker compose build api
docker compose up -d --no-build
```

- Website: http://localhost:4200
- API: http://localhost:5080
- Swagger: http://localhost:5080/swagger

Replace all development credentials and JWT keys before production deployment.

## Local development

```bash
cd ui
npm start
```

```bash
dotnet run --project api/src/AtelierVanguard.Api
```

The Angular demo uses local sample catalog data so every journey can be reviewed without starting PostgreSQL. API services are ready for wiring to the UI through Angular HttpClient.

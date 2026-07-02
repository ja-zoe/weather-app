# Weather App

One of my first ever projects: a simple weather dashboard that detects your location from your IP and shows the current conditions and daily forecast.

## How it works

- **Frontend** (`frontend/`) - React + TypeScript + Vite, styled-components
- **Backend** (`backend/`) - Express server that proxies two APIs so keys stay off the client:
  - [Geoapify](https://www.geoapify.com/) to resolve the visitor's IP to a city
  - [WeatherAPI](https://www.weatherapi.com/) for current conditions and forecast

## Running it

Create `backend/.env` with your own API keys:

```
WEATHER_API_KEY=...
LOCATION_API_KEY=...
```

Then either use Docker:

```bash
docker compose up --build
```

Or run the pieces directly:

```bash
cd backend && npm install && npm run node
cd frontend && npm install && npm run dev
```

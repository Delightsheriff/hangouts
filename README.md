# Hangouts

Discover and join nearby hangouts. Built with Expo SDK 58, Expo Router native tabs, Expo UI (SwiftUI), Expo Maps and Reanimated 4.

## Run

This app uses native modules (Expo UI, Expo Maps, Liquid Glass), so it needs a development build — Expo Go won't work.

```bash
npm install
npx expo run:ios      # or: npx expo run:android
```

After the first build, `npx expo start` is enough to iterate.

Android maps need a Google Maps API key — add it under `android.config.googleMaps.apiKey` in `app.json`.

## Structure

- `src/app` — routes: `(tabs)` for Home, Explore, Chats and Profile, and `hangout/[id]` for the detail screen
- `src/components` — UI; `*.ios.tsx` files use Expo UI SwiftUI views, with a React Native fallback beside them
- `src/data` — sample hangouts and filtering
- `src/store` — saved, waitlist and filter state
- `src/theme` — colours, gradients, type, spacing and shadows

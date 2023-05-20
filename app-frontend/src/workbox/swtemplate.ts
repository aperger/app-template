/* eslint-disable max-len */
/* eslint-disable no-console */
// Service worker
//
// References by Wouter
// https://medium.com/runic-software/simple-guide-to-workbox-in-angular-197c25396e68
// https://github.com/webmaxru/pwatter/blob/workbox/src/sw-default.js
// Caching strategies: https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate
// Example: https://github.com/JeremieLitzler/mws.nd.2018.s3/blob/master/sw.js
// References by Attila
// https://shdhumale.wordpress.com/2020/10/28/angular-pwa-with-workbox-using-webpack/

import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import {
  NetworkFirst,
  NetworkOnly,
  StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies';

import { skipWaiting, clientsClaim } from 'workbox-core';


declare const self: ServiceWorkerGlobalScope;
const componentName = 'Service Worker';

console.log('>>>>location', location);

// Enable debug mode during development
// const DEBUG_MODE = location.hostname === 'localhost';
const DEBUG_MODE = true;

const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 60;
const DAY_IN_SECONDS = HOUR_IN_SECONDS * 24;
const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;
const YEAR_IN_SECONDS = DAY_IN_SECONDS * 365;

const SERVICE_WORKER_VERSION = '1.0.0';

if (DEBUG_MODE) {
  console.debug(`Service worker version ${SERVICE_WORKER_VERSION} loading...`);
}

// -------------------------------------------------------------
// Precaching configuration
// -------------------------------------------------------------
cleanupOutdatedCaches();

// Precaching
// Make sure that all the assets passed in the array below are fetched and cached
// The empty array below is replaced at build time with the full list of assets to cache
// This is done by workbox-build-inject.js for the production build
const assetsToCache = self.__WB_MANIFEST;

// To customize the assets afterwards:
//assetsToCache = [...assetsToCache, ???];

if (DEBUG_MODE) {
  console.trace(
    `${componentName}:: Assets that will be cached!: `,
    assetsToCache
  );
}
precacheAndRoute(assetsToCache);

/ -------------------------------------------------------------
// Routes
// -------------------------------------------------------------
// Default page handler for offline usage,
// where the browser does not how to handle deep links
// it's a SPA, so each  that is a navigation should default to index.html
const defaultRouteHandler = createHandlerBoundToURL('/index.html');
const defaultNavigationRoute = new NavigationRoute(defaultRouteHandler, {
  denylist:[new RegExp('/logout')]
});
registerRoute(defaultNavigationRoute);

const networkFirstStrategy = new NetworkFirst({
  // Put all cached files in a cache named 'api'
  cacheName: 'api',
  plugins: [
    // Only requests that return with a 200 status are cached
    new CacheableResponsePlugin({
      statuses: [200],
    }),
  ],
});
registerRoute(
  ({ request }) => request.url.includes('api'),
  networkFirstStrategy
);

// *****************

/*
declare const self2: ServiceWorkerGlobalScope;
self2.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

precacheAndRoute(self2.__WB_MANIFEST);

registerRoute('https://jsonplaceholder.typicode.com/posts',
    new CacheFirst({
        cacheName: "json-data",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: YEAR_IN_SECONDS,
                maxEntries: 30,
                purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
            }),
        ],
    }),
);
*/
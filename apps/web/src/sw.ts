import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute, Route } from 'workbox-routing';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';
declare const self: ServiceWorkerGlobalScope;

// remove cache on update
cleanupOutdatedCaches();

// precache all assets
precacheAndRoute(self.__WB_MANIFEST);

// skip waiting for the new service worker to become active
self.skipWaiting();

// cache static assets
const staticRoute = new Route(
  ({ request }) => {
    return (
      request.destination === 'script' ||
      request.destination === 'document' ||
      request.destination === 'style' ||
      request.url.endsWith('.webmanifest')
    );
  },
  new StaleWhileRevalidate({
    cacheName: 'static',
  }),
);
registerRoute(staticRoute);

// cache images
const imageRoute = new Route(
  ({ request }) => {
    return request.destination === 'image';
  },
  new CacheFirst({
    cacheName: 'images',
  }),
);
registerRoute(imageRoute);

// cache api requests
const cacheableApiRequests = ['/api/v1/posts'];
const apiRoute = new Route(
  ({ request }) => {
    const pathname = new URL(request.url).pathname;
    return cacheableApiRequests.includes(pathname);
  },
  new NetworkFirst({
    cacheName: 'api',
  }),
);
registerRoute(apiRoute);

// cache navigations
const navigationRoute = new NavigationRoute(
  new StaleWhileRevalidate({
    cacheName: 'navigation',
  }),
);
registerRoute(navigationRoute);

// background sync

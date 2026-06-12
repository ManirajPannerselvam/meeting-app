import { browser } from '$app/environment';
import { initErrorHandler } from '$lib/debug/errorHandler';
import logger from '$lib/debug/logger';
import dbHealth from '$lib/health/dbHealth';
import routeHealth from '$lib/health/routeHealth';
import buttonHealth from '$lib/health/buttonHealth';

if (browser) {
  // initialize global error handler
  try {
    initErrorHandler();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Could not initialize error handler', e);
  }

  // run health checks asynchronously
  (async () => {
    try {
      await logger.log('SYSTEM', 'Starting health checks');

      const dbRes = await dbHealth.checkDBHealth();

      const routesToCheck = [
        '/',
        '/dashboard',
        '/meetings',
        '/minutes',
        '/reports',
        '/action-tracker',
        '/kpi',
        '/attendance',
        '/meeting-list',
        '/ai-summary',
        '/ai-assistant',
        '/analytics',
        '/devices',
        '/sim-inventory',
        '/profile',
        '/backup'
      ];

      const routeRes = await routeHealth.checkRoutes(routesToCheck);

      const buttons = buttonHealth.scanButtons();

      await logger.log('SYSTEM', `Health check summary DB:${JSON.stringify(dbRes)} ROUTES:${JSON.stringify(routeRes)} BUTTONS:${buttons.length}`);
    } catch (e) {
      await logger.error('SYSTEM', `Health checks failed: ${String(e)}`);
    }
  })();
}

export {};

import logger from './logger';

export function initErrorHandler() {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', async (ev: ErrorEvent) => {
    const page = window.location.pathname;
    const message = `${ev.message} at ${ev.filename}:${ev.lineno}:${ev.colno}\n${ev.error?.stack || ''}`;
    await logger.error(page || 'UNKNOWN', message);

    // display simple overlay
    try {
      showErrorOverlay(page || 'UNKNOWN', ev.message, ev.error?.stack || '');
    } catch (e) {
      // ignore
    }
  });

  window.addEventListener('unhandledrejection', async (ev: PromiseRejectionEvent) => {
    const page = window.location.pathname;
    const reason = (ev.reason && typeof ev.reason === 'object') ? JSON.stringify(ev.reason) : String(ev.reason);
    await logger.error(page || 'UNKNOWN', `UnhandledPromiseRejection: ${reason}`);
    try {
      showErrorOverlay(page || 'UNKNOWN', `UnhandledPromiseRejection`, reason);
    } catch (e) {
      // ignore
    }
  });
}

function showErrorOverlay(page: string, error: string, stack: string) {
  const existing = document.getElementById('__global_error_overlay');
  if (existing) return; // do not spam

  const overlay = document.createElement('div');
  overlay.id = '__global_error_overlay';
  overlay.style.position = 'fixed';
  overlay.style.right = '12px';
  overlay.style.bottom = '12px';
  overlay.style.zIndex = '99999';
  overlay.style.maxWidth = '420px';
  overlay.style.padding = '12px';
  overlay.style.background = 'rgba(200,20,20,0.95)';
  overlay.style.color = '#fff';
  overlay.style.fontFamily = 'monospace';
  overlay.style.fontSize = '12px';
  overlay.style.borderRadius = '6px';
  overlay.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';

  overlay.innerHTML = `
    <div style="font-weight:700;margin-bottom:6px">${page}</div>
    <div style="white-space:pre-wrap;max-height:200px;overflow:auto">${error}\n\n${stack}</div>
    <div style="margin-top:8px;font-size:11px;opacity:0.9">Suggested Fix: Check logs/app.log and contact admin</div>
    <div style="margin-top:8px;text-align:right"><button id="__overlay_close">Close</button></div>
  `;

  document.body.appendChild(overlay);
  const btn = document.getElementById('__overlay_close');
  if (btn) {
    btn.addEventListener('click', () => {
      overlay.remove();
    });
  }
}

export default {
  initErrorHandler
};

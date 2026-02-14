(function () {
  const cfg = window.__COMPASS_ANALYTICS__ || {};
  const path = location.pathname.replace(/\/index\.html$/, "/") + location.search;

  function loadGoatCounter(endpoint) {
    if (!endpoint) return;
    const normalized = endpoint.endsWith('/') ? endpoint : endpoint + '/';

    // Optional path override for cleaner reports
    window.goatcounter = window.goatcounter || {
      path: function () {
        return path;
      },
    };

    const s = document.createElement('script');
    s.async = true;
    s.src = '//gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', normalized + 'count');
    document.head.appendChild(s);
  }

  function sendSimplePing(endpoint) {
    if (!endpoint) return;
    const url = endpoint + (endpoint.includes('?') ? '&' : '?') +
      'path=' + encodeURIComponent(path) +
      '&ts=' + Date.now();
    fetch(url, { method: 'GET', mode: 'no-cors', keepalive: true }).catch(() => {});
  }

  if (cfg.provider === 'goatcounter' && cfg.endpoint) {
    loadGoatCounter(cfg.endpoint);
  } else if (cfg.provider === 'simplecounter' && cfg.endpoint) {
    sendSimplePing(cfg.endpoint);
  } else {
    // analytics disabled by default
  }
})();

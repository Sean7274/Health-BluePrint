/* Health Blueprint — GA4 analytics wrapper.
   GA_MEASUREMENT_ID is a placeholder; swap it for your real GA4 "G-XXXXXXXXXX"
   ID once you've created a property at analytics.google.com. Until then this
   file loads nothing and Analytics.track() calls are silent no-ops, so the
   rest of the app can call them unconditionally. */
(function (window) {
  "use strict";
  var GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
  var enabled = GA_MEASUREMENT_ID.indexOf("XXXX") === -1;

  if (enabled) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(script);
  }

  window.Analytics = {
    track: function (eventName, params) {
      if (!enabled || !window.gtag) return;
      window.gtag("event", eventName, params || {});
    }
  };
})(window);

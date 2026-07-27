/* Health Blueprint — icon system.
   A small, hand-authored set of line icons (24x24, consistent stroke
   weight) used everywhere in place of emoji, so the UI reads as one
   coherent visual system rather than a grab-bag of platform emoji glyphs.
   Usage: Icons.html("heart", {size:22, className:"icon-accent"}) */

window.Icons = (function () {
  "use strict";

  // Each entry is the *inner* SVG markup only (no outer <svg> wrapper).
  var PATHS = {
    // ---- specialties ----
    checkup: '<rect x="6" y="3.5" width="12" height="17" rx="2"/><path d="M9 3.5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.5"/><path d="M8.5 12.5l2.3 2.3L15.5 10"/>',
    oncology: '<circle cx="12" cy="8" r="4.2"/><path d="M9.3 11.5L7 20l5-3 5 3-2.3-8.5"/>',
    cardiology: '<path d="M12 20S3.5 14.3 3.5 8.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8.5 1.8C20.5 14.3 12 20 12 20z"/><path d="M6 11h2.5l1.5-3 2 5 1.5-3H16"/>',
    orthopedics: '<path d="M7 7a2.3 2.3 0 1 1 3.2 3.2l4.6 4.6a2.3 2.3 0 1 1-3.2 3.2 2.3 2.3 0 0 1-3.2-3.2L3.8 10.2A2.3 2.3 0 1 1 7 7z"/>',
    dental: '<path d="M12 3c-2.4 0-3.3 1.4-4.6 1.4C5.8 4.4 4.5 6 4.7 8.3c.2 2.6 1.3 3 1.6 6 .2 2.1.9 6.2 2.7 6.2 1.6 0 1.4-3.4 3-3.4s1.4 3.4 3 3.4c1.8 0 2.5-4.1 2.7-6.2.3-3 1.4-3.4 1.6-6C19.5 6 18.2 4.4 16.6 4.4 15.3 4.4 14.4 3 12 3z"/>',
    pediatrics: '<rect x="8" y="8" width="8" height="12" rx="2.5"/><path d="M10.5 8V6a1.5 1.5 0 0 1 3 0v2"/><path d="M8 13h8"/><circle cx="9.5" cy="4" r="1"/>',
    obgyn: '<circle cx="12" cy="9" r="5"/><path d="M12 14v7M9 18h6"/>',
    ophthalmology: '<path d="M2.5 12S6.5 5.5 12 5.5 21.5 12 21.5 12 17.5 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
    neurology: '<path d="M9 3.5a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.6A3 3 0 0 0 7 17a3 3 0 0 0 5-2V6a2.5 2.5 0 0 0-3-2.5z"/><path d="M15 3.5a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.6A3 3 0 0 1 17 17a3 3 0 0 1-5-2"/>',
    psychiatry: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5c1.8 0 2.4 1.3 1.6 2.4-1 1.3-2.6 1.1-2.6 3.1v.5"/><circle cx="11" cy="16" r=".9" fill="currentColor" stroke="none"/>',
    respiratory: '<path d="M12 3v7"/><path d="M12 10c-1 3-1.5 4-4 4-2.2 0-3.5-1.6-3.5-4.2C4.5 7 6 6 7 6.5S8.5 9 8.5 10.5"/><path d="M12 10c1 3 1.5 4 4 4 2.2 0 3.5-1.6 3.5-4.2C19.5 7 18 6 17 6.5S15.5 9 15.5 10.5"/><path d="M8.5 14c-.5 2 .3 4 1 5.5M15.5 14c.5 2-.3 4-1 5.5"/>',
    hematology: '<path d="M12 3.5S6 11 6 15a6 6 0 0 0 12 0c0-4-6-11.5-6-11.5z"/>',

    // ---- pillars ----
    medical: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    travel: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    food: '<path d="M4 11a8 8 0 0 0 16 0z"/><path d="M4 11h16"/><path d="M8 11c0-2.5.8-4.5 1.2-6M12 11c0-3 .3-5 .3-7M16 11c0-2 .5-3.7-.4-6.5"/><path d="M6.5 15.5L8 20h8l1.5-4.5"/>',
    safety: '<path d="M12 3l7 3v5.2c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V6z"/><path d="M9 12l2.2 2.2L15.5 9.5"/>',

    // ---- areas (7 archetypes) ----
    "area-landmark": '<path d="M4 20h16M6 20V9M18 20V9M4 9l8-5 8 5M9.5 9v11M14.5 9v11"/>',
    "area-skyline": '<path d="M3 20h18M5 20V10h3.5V20M10 20V6h4v14M15.5 20V13H19V20"/>',
    "area-coastal": '<path d="M4 8v6M4 8h3l2 3 2-3h3l2 3 2-3h2"/><path d="M2.5 17.5c1.2 1 2.4 1 3.6 0 1.2-1 2.4-1 3.6 0 1.2 1 2.4 1 3.6 0 1.2-1 2.4-1 3.6 0 1.2 1 2.4 1 3.6 0M2.5 21c1.2 1 2.4 1 3.6 0 1.2-1 2.4-1 3.6 0 1.2 1 2.4 1 3.6 0 1.2-1 2.4-1 3.6 0 1.2 1 2.4 1 3.6 0"/>',
    "area-lake": '<ellipse cx="12" cy="12" rx="8.5" ry="5.5"/><path d="M7.5 10.5c1-1 2-1 3 0s2 1 3 0 2-1 3 0"/>',
    "area-river": '<path d="M3 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M3 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M3 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2"/>',
    "area-mountain": '<path d="M2.5 19L9 7l4 6.5L15.5 10 21.5 19z"/>',
    "area-snow": '<path d="M12 2v20M4 7l16 10M20 7L4 17"/>',

    // ---- food subcategories ----
    "food-halal": '<path d="M14.5 3.5A8.5 8.5 0 1 0 14.5 20.5 9.8 9.8 0 0 1 14.5 3.5z"/><path d="M17 6.5l.6 1.7 1.7.2-1.3 1.2.4 1.7-1.4-1-1.4 1 .4-1.7-1.3-1.2 1.7-.2z"/>',
    "food-veg": '<path d="M6 20c-2-4-1.5-9 3-12.5 3-2.3 7-2.5 9-1.5-1 5-4 8-8 9.5-1.7.6-3 2-4 4.5z"/><path d="M6 20c1-3 3-6 6-8.5"/>',
    "food-allergy": '<path d="M12 3l9.5 17H2.5z"/><path d="M12 9.5v4.5M12 17v.1"/>',
    "food-dimsum": '<ellipse cx="12" cy="14" rx="8" ry="5"/><path d="M6 12.5c1.2-1.2 2.4-1.8 6-1.8s4.8.6 6 1.8"/><path d="M4 14h16"/>',
    "food-spicy": '<path d="M6 5c3-1.5 5 0 5 2.5 0 1.5-1 2-1 3.5 0 4 4.5 5 6.5 3 1.5-1.5 1.3-4-.3-4.8"/><path d="M9.5 10.5c-3 .5-5 3-4.3 6.3.6 2.8 3.3 4.3 6 3.6 3-.8 4.5-3.7 3.6-6.4"/>',
    "food-wheat": '<path d="M12 21V6"/><path d="M12 6c-1.8 0-3-1.2-3-3 1.8 0 3 1.2 3 3zM12 6c1.8 0 3-1.2 3-3-1.8 0-3 1.2-3 3z"/><path d="M12 10c-1.8 0-3-1.2-3-3 1.8 0 3 1.2 3 3zM12 10c1.8 0 3-1.2 3-3-1.8 0-3 1.2-3 3z"/><path d="M12 14c-1.8 0-3-1.2-3-3 1.8 0 3 1.2 3 3zM12 14c1.8 0 3-1.2 3-3-1.8 0-3 1.2-3 3z"/>',
    "food-fish": '<path d="M3 12c3.5-4 8-5.5 12-3.5 2 1 3.5 2.3 5 3.5-1.5 1.2-3 2.5-5 3.5-4 2-8.5.5-12-3.5z"/><path d="M3 12L1.5 9M3 12l-1.5 3"/><circle cx="15" cy="10.7" r=".8" fill="currentColor" stroke="none"/>',
    "food-western": '<path d="M6 3v9a2 2 0 0 0 4 0V3M8 3v18M8 12V3"/><path d="M16 3c-1.2 0-2 1.5-2 4s.8 4 2 4v10"/>',
    "food-tray": '<rect x="3" y="13" width="18" height="3" rx="1"/><path d="M12 13V9a4 4 0 0 1 4-4"/><path d="M8 13c0-3 1.8-5 4-5"/>',

    // ---- safety ----
    "safety-shield": '<path d="M12 3l7 3v5.2c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V6z"/><path d="M9 12l2.2 2.2L15.5 9.5"/>',
    "safety-phone": '<path d="M6 4h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2C10.5 19.5 4.5 13.5 4 6.2A2 2 0 0 1 6 4z"/>',
    "safety-embassy": '<path d="M4 20h16M6 20V9M18 20V9M4 9l8-5 8 5"/><path d="M12 6.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>',
    "safety-info": '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/>',

    // ---- misc UI ----
    location: '<path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.8 6.8 19.7l1-5.9-4.3-4.1 5.9-.8z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    cost: '<circle cx="12" cy="12" r="9"/><path d="M12 6.5v11M15 9c0-1.4-1.3-2.2-3-2.2s-3 .8-3 2.2 1.3 1.9 3 2.2c1.7.3 3 .8 3 2.3s-1.3 2.2-3 2.2-3-.8-3-2.2"/>',
    check: '<path d="M4.5 12.5l5 5 10-11"/>',
    close: '<path d="M5 5l14 14M19 5L5 19"/>',
    "arrow-left": '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    link: '<path d="M9.5 14.5l5-5"/><path d="M13 5.5h3a4 4 0 0 1 0 8h-2M11 18.5H8a4 4 0 0 1 0-8h2"/>',
    handshake: '<path d="M2.5 12l4-3.5 3 2 2.5-2 3 2 3-2.5 3.5 3"/><path d="M6.5 8.5l4 4.5-2 2a1.6 1.6 0 0 1-2.3 0 1.6 1.6 0 0 1 0-2.3"/><path d="M17.5 8.5l-4 4.5 2 2a1.6 1.6 0 0 0 2.3 0 1.6 1.6 0 0 0 0-2.3"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18z"/>',
    hospital: '<rect x="4" y="9" width="16" height="12" rx="1.5"/><path d="M9 21V15h6v6"/><path d="M12 3v4M10 5h4"/><path d="M8 9V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V9"/>',
    building: '<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2"/>'
  };

  function svg(name, opts) {
    opts = opts || {};
    var size = opts.size || 24;
    var inner = PATHS[name];
    if (!inner) return "";
    var cls = "icon-svg" + (opts.className ? " " + opts.className : "");
    return '<svg class="' + cls + '" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>";
  }

  // A single, consistent illustrated "hospital building" banner (Greek-
  // revival colonnade style), tinted per ranking tier. Used in place of a
  // real photo on the hospital detail page — see product note in data.js.
  var TIER_TINT = {
    "A++++": { deep: "#8a6d10", mid: "#c9a227", light: "#f6ecc9" },
    "A+++": { deep: "#8a3f14", mid: "#c8622a", light: "#f7ded0" },
    "A++": { deep: "#0a4c41", mid: "#0f6b5c", light: "#d9ece8" },
    "A+": { deep: "#1c3f7a", mid: "#2a6ec8", light: "#dbe7f7" },
    "A": { deep: "#3f3f3f", mid: "#6b6b6b", light: "#e6e6e6" }
  };
  function hospitalIllustration(tier) {
    var c = TIER_TINT[tier] || TIER_TINT.A;
    var cols = [58, 78, 98, 118, 138].map(function (x) {
      return '<rect x="' + (x - 3) + '" y="52" width="6" height="46" rx="2" fill="' + c.mid + '"/>';
    }).join("");
    return '<svg class="hospital-illustration" viewBox="0 0 200 130" role="img" aria-label="Illustration of hospital building">' +
      '<rect x="0" y="0" width="200" height="130" rx="18" fill="' + c.light + '"/>' +
      '<line x1="14" y1="106" x2="186" y2="106" stroke="' + c.mid + '" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="30" cy="96" r="10" fill="' + c.mid + '" opacity="0.5"/><rect x="28" y="96" width="4" height="10" fill="' + c.deep + '" opacity="0.5"/>' +
      '<circle cx="172" cy="96" r="10" fill="' + c.mid + '" opacity="0.5"/><rect x="170" y="96" width="4" height="10" fill="' + c.deep + '" opacity="0.5"/>' +
      '<rect x="40" y="50" width="120" height="48" fill="' + c.light + '" stroke="' + c.mid + '" stroke-width="2"/>' +
      cols +
      '<polygon points="30,50 170,50 100,20" fill="' + c.mid + '"/>' +
      '<rect x="34" y="98" width="132" height="8" rx="2" fill="' + c.deep + '"/>' +
      '<rect x="90" y="70" width="20" height="28" fill="' + c.deep + '"/>' +
      '<rect x="96" y="6" width="8" height="18" rx="2" fill="' + c.deep + '"/>' +
      '<rect x="93" y="11" width="14" height="8" rx="2" fill="' + c.deep + '"/>' +
    "</svg>";
  }

  return { html: svg, has: function (name) { return !!PATHS[name]; }, hospitalIllustration: hospitalIllustration };
})();

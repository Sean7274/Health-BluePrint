(function () {
  "use strict";

  var D = window.DATA;
  var I18N = window.I18N;

  var SUPPORTED_LANGS = Object.keys(I18N.meta);
  var FONT_STEPS = [0.9, 1, 1.1, 1.2, 1.35];

  var state = {
    lang: loadLang(),
    fontStepIndex: loadFontStepIndex()
  };

  var mainEl = document.getElementById("main");

  /* ---------------- persistence ---------------- */
  function loadLang() {
    var saved = localStorage.getItem("hb_lang");
    if (saved && SUPPORTED_LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "en");
    if (SUPPORTED_LANGS.indexOf(nav) !== -1) return nav;
    var short = nav.split("-")[0];
    if (short === "zh") return nav.toLowerCase().indexOf("tw") !== -1 || nav.toLowerCase().indexOf("hk") !== -1 ? "zh-TW" : "zh-CN";
    var match = SUPPORTED_LANGS.filter(function (l) { return l.split("-")[0] === short; })[0];
    return match || "en";
  }
  function saveLang(lang) { localStorage.setItem("hb_lang", lang); }
  function loadFontStepIndex() {
    var saved = parseInt(localStorage.getItem("hb_font_step"), 10);
    return isNaN(saved) ? 1 : Math.min(Math.max(saved, 0), FONT_STEPS.length - 1);
  }
  function saveFontStepIndex(i) { localStorage.setItem("hb_font_step", String(i)); }

  /* ---------------- i18n helper ---------------- */
  function t(key, vars) { return I18N.t(state.lang, key, vars); }

  /* ---------------- chrome (header/footer/lang) ---------------- */
  function renderChrome() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = (I18N.meta[state.lang] || I18N.meta.en).dir;
    document.documentElement.style.setProperty("--step", FONT_STEPS[state.fontStepIndex]);

    document.getElementById("brandName").textContent = t("brand.name");
    document.getElementById("brandNameFooter").textContent = t("brand.name");
    document.title = t("brand.name") + " — " + t("brand.tagline");

    document.getElementById("tripNavLabel").textContent = t("nav.trip");
    document.getElementById("joinNavLabel").textContent = t("nav.joinUs");

    document.getElementById("footerAboutTitle").textContent = t("footer.aboutTitle");
    document.getElementById("footerAboutText").textContent = t("footer.aboutText");
    document.getElementById("footerContactTitle").textContent = t("footer.contactUs");
    document.getElementById("footerDisclaimer").textContent = t("footer.disclaimer");
    document.getElementById("footerRights").textContent = t("footer.rights");
    document.getElementById("footerYear").textContent = String(new Date().getFullYear());

    var langSelect = document.getElementById("langSelect");
    langSelect.innerHTML = SUPPORTED_LANGS.map(function (code) {
      return '<option value="' + code + '"' + (code === state.lang ? " selected" : "") + '>' + I18N.meta[code].label + "</option>";
    }).join("");
    langSelect.onchange = function () {
      state.lang = langSelect.value;
      saveLang(state.lang);
      renderChrome();
      route();
    };

    document.getElementById("fontDecrease").onclick = function () { changeFontStep(-1); };
    document.getElementById("fontIncrease").onclick = function () { changeFontStep(1); };
    document.getElementById("fontReset").onclick = function () { state.fontStepIndex = 1; saveFontStepIndex(1); renderChrome(); };
  }
  function changeFontStep(delta) {
    state.fontStepIndex = Math.min(Math.max(state.fontStepIndex + delta, 0), FONT_STEPS.length - 1);
    saveFontStepIndex(state.fontStepIndex);
    renderChrome();
  }

  /* ---------------- routing ---------------- */
  function parseHash() {
    var hash = location.hash.replace(/^#/, "") || "/";
    var qIndex = hash.indexOf("?");
    var path = qIndex === -1 ? hash : hash.slice(0, qIndex);
    var queryStr = qIndex === -1 ? "" : hash.slice(qIndex + 1);
    var query = {};
    queryStr.split("&").forEach(function (pair) {
      if (!pair) return;
      var kv = pair.split("=");
      query[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
    });
    var segments = path.split("/").filter(Boolean);
    return { segments: segments, query: query };
  }

  function route() {
    var r = parseHash();
    window.scrollTo(0, 0);
    if (r.segments.length === 0) {
      renderHome();
    } else if (r.segments[0] === "hospitals") {
      renderHospitalList(r.query);
    } else if (r.segments[0] === "hospital" && r.segments[1]) {
      renderHospitalDetail(r.segments[1], r.query);
    } else if (r.segments[0] === "program" && r.segments[1]) {
      renderProgramDetail(r.segments[1], r.query);
    } else if (r.segments[0] === "agent" && r.segments[1]) {
      renderContact(r.segments[1], r.query);
    } else if (r.segments[0] === "join") {
      renderJoin();
    } else if (r.segments[0] === "trip") {
      renderTrip(r.query);
    } else if (r.segments[0] === "food") {
      renderInfoPage("food");
    } else if (r.segments[0] === "safety") {
      renderInfoPage("safety");
    } else {
      renderHome();
    }
  }
  window.addEventListener("hashchange", route);

  /* ---------------- shared helpers ---------------- */
  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function qs(obj) {
    var parts = Object.keys(obj).filter(function (k) { return obj[k]; }).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
    });
    return parts.length ? "?" + parts.join("&") : "";
  }
  function specialtyLabel(id) { return t("specialties." + id); }
  function areaLabel(id) { return t("areas." + id); }
  function hospitalById(id) { return D.hospitals.filter(function (h) { return h.id === id; })[0]; }
  function agentById(id) { return D.agents.filter(function (a) { return a.id === id; })[0]; }
  function routeById(id) { return D.routes.filter(function (r) { return r.id === id; })[0]; }
  function agentsForSpecialty(cat) { return D.agents.filter(function (a) { return a.specialties.indexOf(cat) !== -1; }); }
  function hospitalsForArea(area) {
    return D.hospitals.filter(function (h) { return h.area === area; })
      .sort(function (a, b) { return D.tierOrder.indexOf(a.tier) - D.tierOrder.indexOf(b.tier); });
  }
  function makeProgramId(hospitalId, tag) { return hospitalId + "-" + tag; }
  function parseProgramId(pid) {
    var dash = pid.indexOf("-");
    return { hospitalId: pid.slice(0, dash), tag: pid.slice(dash + 1) };
  }

  var AREA_ICONS = {
    beijing: "🏛️", shanghai: "🌆", tianjin: "🌉", chongqing: "🏔️", guangzhou: "🌴",
    shenzhen: "🏙️", hangzhou: "🌊", wenzhou: "⛰️", nanjing: "🏯", suzhou: "🌸",
    chengdu: "🐼", xian: "🗿", wuhan: "🌉", changsha: "🌶️", zhengzhou: "🏺",
    jinan: "💧", qingdao: "⚓", shenyang: "🏰", changchun: "🌳", harbin: "❄️",
    hefei: "🏞️", fuzhou: "🍵", nanchang: "📖"
  };
  function areaIcon(id) { return AREA_ICONS[id] || "📍"; }

  var SPECIALTY_ICONS = {
    checkup: "🩺", oncology: "🎗️", cardiology: "❤️", orthopedics: "🦴", dental: "🦷",
    pediatrics: "🧸", obgyn: "👶", ophthalmology: "👁️", neurology: "🧠",
    psychiatry: "💭", respiratory: "🫁", hematology: "🩸"
  };
  function specialtyIcon(id) { return SPECIALTY_ICONS[id] || "🏥"; }

  var TIER_CLASS_COLOR = { "A++++": "#b8860b", "A+++": "#c8622a", "A++": "#0f6b5c", "A+": "#2a6ec8", "A": "#6b6b6b" };
  function tierBadgeHtml(tier) {
    return '<span class="tier-badge" style="color:' + TIER_CLASS_COLOR[tier] + '">🏅 ' + esc(tier) + "</span>";
  }

  /* ---------------- HOME ---------------- */
  function renderHome() {
    mainEl.innerHTML =
      '<section class="hero">' +
        '<div class="hero-inner">' +
          "<h1>" + esc(t("hero.title")) + "</h1>" +
          '<p class="subtitle">' + esc(t("hero.subtitle")) + "</p>" +
          '<a class="btn btn-primary" href="#/hospitals">' + esc(t("hero.ctaStart")) + "</a>" +
          '<div class="trust-row">' +
            trustItem("✓", t("hero.trust1")) +
            trustItem("🌐", t("hero.trust2")) +
            trustItem("🤝", t("hero.trust3")) +
          "</div>" +
        "</div>" +
      "</section>" +

      '<section class="section container">' +
        "<h2>" + esc(t("pillars.sectionTitle")) + "</h2>" +
        '<div class="choice-row pillar-row">' +
          pillarCardHtml("🏥", t("pillars.medicalTitle"), t("pillars.medicalDesc"), "#/hospitals") +
          pillarCardHtml("🧭", t("pillars.travelTitle"), t("pillars.travelDesc"), "#/trip") +
          pillarCardHtml("🥢", t("pillars.foodTitle"), t("pillars.foodDesc"), "#/food") +
          pillarCardHtml("🛡️", t("pillars.safetyTitle"), t("pillars.safetyDesc"), "#/safety") +
        "</div>" +
      "</section>" +

      '<section class="section container">' +
        '<div class="step-indicator">' + esc(t("steps.specialty")) + "</div>" +
        '<div class="area-grid" id="specialtyGrid"></div>' +
      "</section>" +

      '<section class="section-tight container">' +
        '<div class="step-indicator">' + esc(t("steps.area")) + "</div>" +
        '<div class="chip-row" id="areaChips"></div>' +
      "</section>";

    var specialtyGrid = document.getElementById("specialtyGrid");
    D.specialties.forEach(function (s) {
      var link = document.createElement("a");
      link.href = "#/hospitals?specialty=" + s;
      link.className = "area-card";
      link.innerHTML = '<span class="icon" aria-hidden="true">' + specialtyIcon(s) + "</span><span>" + esc(specialtyLabel(s)) + "</span>";
      specialtyGrid.appendChild(link);
    });

    var areaChips = document.getElementById("areaChips");
    D.areas.forEach(function (id) {
      var link = document.createElement("a");
      link.href = "#/hospitals?area=" + id;
      link.className = "chip";
      link.textContent = areaIcon(id) + " " + areaLabel(id);
      areaChips.appendChild(link);
    });
  }
  function trustItem(icon, label) {
    return '<span class="trust-item"><span class="icon" aria-hidden="true">' + icon + "</span>" + esc(label) + "</span>";
  }
  function pillarCardHtml(icon, title, desc, href) {
    return '<a class="choice-card" href="' + href + '">' +
      '<span class="icon" aria-hidden="true">' + icon + "</span>" +
      "<span>" + esc(title) + "</span>" +
      '<span style="font-weight:400;font-size:0.85em;color:var(--color-text-muted);">' + esc(desc) + "</span>" +
    "</a>";
  }

  /* ---------------- FOOD / SAFETY INFO PAGES ---------------- */
  function renderInfoPage(key) {
    var page = D.pages[key];
    var titleKey = key === "food" ? "pillars.foodTitle" : "pillars.safetyTitle";
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/"><span class="arrow" aria-hidden="true">←</span>' + esc(t("common.back")) + "</a>" +
        '<h1 style="margin-top:14px;">' + esc(t(titleKey)) + "</h1>" +
        "<p>" + esc(D.text(page.intro, state.lang)) + "</p>" +
        '<div class="card-grid" style="margin-top:20px;">' +
          page.items.map(function (item) {
            return '<div class="card">' +
              '<div style="font-size:1.6em;">' + item.icon + "</div>" +
              "<h3>" + esc(D.text(item.title, state.lang)) + "</h3>" +
              "<p>" + esc(D.text(item.desc, state.lang)) + "</p>" +
            "</div>";
          }).join("") +
        "</div>" +
      "</section>";
  }

  /* ---------------- HOSPITAL LIST ---------------- */
  function renderHospitalList(query) {
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/"><span class="arrow" aria-hidden="true">←</span>' + esc(t("common.back")) + "</a>" +
        '<div class="step-indicator" style="margin-top:10px;">' + esc(t("steps.hospital")) + "</div>" +
        '<div class="filters-bar">' +
          '<div class="filter-group">' +
            '<label for="filterArea">' + esc(t("filters.areaLabel")) + "</label>" +
            '<select id="filterArea"></select>' +
          "</div>" +
          '<div class="filter-group">' +
            '<label for="filterSpecialty">' + esc(t("filters.specialtyLabel")) + "</label>" +
            '<select id="filterSpecialty"></select>' +
          "</div>" +
          '<div class="filter-group">' +
            '<label for="filterSearch">' + esc(t("filters.searchPlaceholder")) + "</label>" +
            '<input type="search" id="filterSearch" placeholder="' + esc(t("filters.searchPlaceholder")) + '">' +
          "</div>" +
        "</div>" +
        '<div id="resultsCount" class="results-count"></div>' +
        '<div id="hospitalResults" class="card-grid"></div>' +
      "</section>";

    var areaSel = document.getElementById("filterArea");
    areaSel.innerHTML = '<option value="">' + esc(t("filters.allAreas")) + "</option>" +
      D.areas.map(function (id) { return '<option value="' + id + '">' + esc(areaLabel(id)) + "</option>"; }).join("");
    areaSel.value = query.area || "";

    var specSel = document.getElementById("filterSpecialty");
    specSel.innerHTML = '<option value="">' + esc(t("filters.allSpecialties")) + "</option>" +
      D.specialties.map(function (s) { return '<option value="' + s + '">' + esc(specialtyLabel(s)) + "</option>"; }).join("");
    specSel.value = query.specialty || "";

    var searchInput = document.getElementById("filterSearch");

    function update() {
      var area = areaSel.value, specialty = specSel.value, term = searchInput.value.trim().toLowerCase();
      var list = D.hospitals.filter(function (h) {
        if (area && h.area !== area) return false;
        if (specialty && h.tags.indexOf(specialty) === -1) return false;
        if (term) {
          var hay = (h.name + " " + h.nameEn).toLowerCase();
          if (hay.indexOf(term) === -1) return false;
        }
        return true;
      }).sort(function (a, b) { return D.tierOrder.indexOf(a.tier) - D.tierOrder.indexOf(b.tier); });
      document.getElementById("resultsCount").textContent = t("filters.resultsCount", { n: list.length });
      var resultsEl = document.getElementById("hospitalResults");
      if (list.length === 0) {
        resultsEl.innerHTML = '<div class="empty-state">' + esc(t("filters.noResults")) + "</div>";
        return;
      }
      resultsEl.innerHTML = list.map(function (h) { return hospitalCardHtml(h, specSel.value); }).join("");
    }

    areaSel.onchange = update;
    specSel.onchange = update;
    searchInput.oninput = update;
    update();
  }

  function hospitalCardHtml(h, specialty) {
    return '<a class="card card-clickable" href="#/hospital/' + h.id + qs({ specialty: specialty || "" }) + '">' +
      '<div class="card-tags">' + tierBadgeHtml(h.tier) + h.tags.map(function (tag) { return '<span class="tag">' + esc(specialtyLabel(tag)) + "</span>"; }).join("") + "</div>" +
      "<h3>" + esc(h.name) + "</h3>" +
      '<p style="color:var(--color-text-muted);font-size:0.9em;margin:0;">' + esc(h.nameEn) + "</p>" +
      '<div class="card-meta">' +
        '<span>📍 ' + esc(areaLabel(h.area)) + "</span>" +
      "</div>" +
    "</a>";
  }

  /* ---------------- HOSPITAL DETAIL ---------------- */
  function renderHospitalDetail(id, query) {
    var h = hospitalById(id);
    if (!h) { renderHome(); return; }
    var routeId = query && query.route;
    var sel = routeId ? routeById(routeId) : null;
    var wantedSpecialty = query && query.specialty;
    var orderedTags = h.tags.slice();
    if (wantedSpecialty && orderedTags.indexOf(wantedSpecialty) !== -1) {
      orderedTags = [wantedSpecialty].concat(orderedTags.filter(function (tg) { return tg !== wantedSpecialty; }));
    }

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/hospitals"><span class="arrow" aria-hidden="true">←</span>' + esc(t("common.back")) + "</a>" +
        (sel ? '<div class="plan-summary"><span><strong>' + esc(t("contact.summaryRoute")) + '</strong>' + esc(D.text(sel.name, state.lang)) + "</span></div>" : "") +
        '<div class="detail-header" style="margin-top:14px;">' +
          '<div class="detail-title-block">' +
            "<h1>" + esc(h.name) + "</h1>" +
            '<div class="local-name">' + esc(h.nameEn) + "</div>" +
            '<div class="card-tags">' + tierBadgeHtml(h.tier) + h.tags.map(function (tag) { return '<span class="tag">' + esc(specialtyLabel(tag)) + "</span>"; }).join("") + "</div>" +
          "</div>" +
        "</div>" +
        '<div class="info-strip">' +
          "<span>📍 <strong>" + esc(areaLabel(h.area)) + "</strong></span>" +
          "<span>" + esc(t("hospital.tierLabel")) + ": <strong>" + esc(h.tier) + "</strong></span>" +
        "</div>" +
        (h.website
          ? '<p><a class="official-link" href="' + esc(h.website) + '" target="_blank" rel="noopener noreferrer">🔗 ' + esc(t("hospital.officialWebsite")) + "</a></p>"
          : '<p class="no-website-note">' + esc(t("hospital.officialWebsite")) + ": —</p>") +
        '<h2 style="margin-top:24px;">' + esc(t("hospital.programsTitle")) + "</h2>" +
        '<div class="card-grid">' + orderedTags.map(function (tag) { return specialtyCardHtml(h, tag, routeId, tag === wantedSpecialty); }).join("") + "</div>" +
      "</section>";
  }

  function specialtyCardHtml(h, tag, routeId, isRecommended) {
    var href = "#/program/" + makeProgramId(h.id, tag) + qs({ route: routeId || "" });
    return '<a class="card card-clickable' + (isRecommended ? " active" : "") + '" href="' + href + '">' +
      '<div class="card-tags"><span class="tag">' + esc(specialtyIcon(tag)) + " " + esc(specialtyLabel(tag)) + (isRecommended ? " ★" : "") + "</span></div>" +
      "<h3>" + esc(specialtyLabel(tag)) + "</h3>" +
      '<span class="btn btn-secondary btn-block">' + esc(t("program.viewDetails")) + "</span>" +
    "</a>";
  }

  /* ---------------- PROGRAM (SPECIALTY) DETAIL ---------------- */
  function renderProgramDetail(pid, query) {
    var parsed = parseProgramId(pid);
    var h = hospitalById(parsed.hospitalId);
    if (!h || h.tags.indexOf(parsed.tag) === -1) { renderHome(); return; }
    var tag = parsed.tag;
    var routeId = query && query.route;
    var agents = agentsForSpecialty(tag);

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/hospital/' + h.id + qs({ route: routeId || "" }) + '"><span class="arrow" aria-hidden="true">←</span>' + esc(t("common.back")) + "</a>" +
        '<div class="detail-title-block" style="margin-top:14px;">' +
          '<div class="card-tags">' + tierBadgeHtml(h.tier) + '<span class="tag">' + esc(specialtyLabel(tag)) + "</span></div>" +
          "<h1>" + esc(specialtyLabel(tag)) + "</h1>" +
          '<p class="local-name">' + esc(h.name) + " · " + esc(areaLabel(h.area)) + "</p>" +
        "</div>" +
        "<p>" + esc(t("program.genericNote")) + "</p>" +

        '<div class="step-indicator" style="margin-top:28px;">' + esc(t("steps.agent")) + "</div>" +
        "<h2>" + esc(t("program.agentsTitle")) + "</h2>" +
        "<p>" + esc(t("program.agentsSubtitle")) + "</p>" +
        '<div class="card-grid">' + agents.map(function (a) { return agentCardHtml(a, pid, routeId); }).join("") + "</div>" +
      "</section>";
  }

  function agentInitials(name) {
    return name.split(" ").map(function (part) { return part.charAt(0); }).slice(0, 2).join("").toUpperCase();
  }

  function agentCardHtml(a, programId, routeId) {
    var services = D.textList(a.services, state.lang);
    var langLabels = a.languages.map(function (code) { return (I18N.meta[code] || {}).label || code; });
    var href = "#/agent/" + a.id + qs({ program: programId, route: routeId || "" });
    return '<div class="card agent-card">' +
      '<div class="agent-top">' +
        '<div class="agent-avatar" aria-hidden="true">' + esc(agentInitials(a.name)) + "</div>" +
        "<div>" +
          "<h3 style='margin-bottom:2px;'>" + esc(a.name) + "</h3>" +
          '<div class="card-meta"><span class="rating-badge">★ ' + a.rating + "</span><span>" + esc(t("agent.yearsExp", { n: a.years })) + "</span></div>" +
        "</div>" +
      "</div>" +
      "<p>" + esc(D.text(a.bio, state.lang)) + "</p>" +
      '<div><strong style="font-size:0.85em;">' + esc(t("agent.languagesSpoken")) + ":</strong>" +
        '<div class="agent-langs">' + langLabels.map(function (l) { return '<span class="lang-pill">' + esc(l) + "</span>"; }).join("") + "</div>" +
      "</div>" +
      '<ul class="included-list">' + services.slice(0, 4).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
      '<a class="btn btn-primary btn-block" href="' + href + '">' + esc(t("agent.selectAgent")) + "</a>" +
    "</div>";
  }

  /* ---------------- CONTACT / BOOKING ---------------- */
  function renderContact(agentId, query) {
    var a = agentById(agentId);
    if (!a) { renderHome(); return; }
    var programId = query && query.program;
    var parsed = programId ? parseProgramId(programId) : null;
    var h = parsed ? hospitalById(parsed.hospitalId) : null;
    var routeId = query && query.route;
    var sel = routeId ? routeById(routeId) : null;

    var langOptions = SUPPORTED_LANGS.map(function (code) {
      return '<option value="' + code + '"' + (code === state.lang ? " selected" : "") + ">" + I18N.meta[code].label + "</option>";
    }).join("");

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="' + (programId ? "#/program/" + programId + qs({ route: routeId || "" }) : "#/") + '"><span class="arrow" aria-hidden="true">←</span>' + esc(t("common.back")) + "</a>" +
        '<div class="form-card" style="margin-top:14px;">' +
          "<h1>" + esc(t("contact.title")) + "</h1>" +
          "<p>" + esc(t("contact.subtitle")) + "</p>" +
          '<div class="form-summary">' +
            (h ? "<span><strong>" + esc(t("contact.summaryHospital")) + "</strong>" + esc(h.name) + "</span>" : "") +
            (parsed ? "<span><strong>" + esc(t("contact.summaryProgram")) + "</strong>" + esc(specialtyLabel(parsed.tag)) + "</span>" : "") +
            (sel ? "<span><strong>" + esc(t("contact.summaryRoute")) + "</strong>" + esc(D.text(sel.name, state.lang)) + "</span>" : "") +
            "<span><strong>" + esc(t("contact.summaryAgent")) + "</strong>" + esc(a.name) + "</span>" +
          "</div>" +
          '<div id="formArea">' +
          '<form id="inquiryForm">' +
            '<p class="required-note">' + esc(t("contact.requiredNote")) + "</p>" +
            '<div class="field-row">' +
              '<div class="field"><label for="cName">' + esc(t("contact.name")) + ' *</label><input id="cName" name="name" required></div>' +
              '<div class="field"><label for="cEmail">' + esc(t("contact.email")) + ' *</label><input id="cEmail" type="email" name="email" required></div>' +
            "</div>" +
            '<div class="field-row">' +
              '<div class="field"><label for="cPhone">' + esc(t("contact.phone")) + ' *</label><input id="cPhone" name="phone" required></div>' +
              '<div class="field"><label for="cCountry">' + esc(t("contact.country")) + '</label><input id="cCountry" name="country"></div>' +
            "</div>" +
            '<div class="field"><label for="cLang">' + esc(t("contact.preferredLanguage")) + '</label><select id="cLang" name="preferredLanguage">' + langOptions + "</select></div>" +
            '<div class="field"><label for="cMessage">' + esc(t("contact.message")) + '</label><textarea id="cMessage" name="message" placeholder="' + esc(t("contact.messagePlaceholder")) + '"></textarea></div>' +
            '<button type="submit" class="btn btn-primary btn-block">' + esc(t("contact.submit")) + "</button>" +
          "</form>" +
          "</div>" +
        "</div>" +
      "</section>";

    var form = document.getElementById("inquiryForm");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var fd = new FormData(form);
      var payload = {
        "form-name": "inquiry",
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        country: fd.get("country") || "",
        preferredLanguage: fd.get("preferredLanguage"),
        message: fd.get("message") || "",
        hospital: h ? h.name : "",
        program: parsed ? specialtyLabel(parsed.tag) : "",
        agent: a.name,
        route: sel ? D.text(sel.name, "en") : ""
      };
      var body = Object.keys(payload).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(payload[k]);
      }).join("&");

      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body })
        .then(function () { showSuccess(); })
        .catch(function () { showSuccess(); }); // static hosting: treat as best-effort, still confirm to user
    });

    function showSuccess() {
      document.getElementById("formArea").innerHTML = '<div class="success-box">✓ ' + esc(t("contact.success")) + "</div>";
    }
  }

  /* ---------------- JOIN AS AGENT ---------------- */
  function renderJoin() {
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/"><span class="arrow" aria-hidden="true">←</span>' + esc(t("common.back")) + "</a>" +
        '<div class="form-card" style="margin-top:14px;">' +
          "<h1>" + esc(t("join.title")) + "</h1>" +
          "<p>" + esc(t("join.subtitle")) + "</p>" +
          '<div id="joinFormArea">' +
          '<form id="joinForm">' +
            '<p class="required-note">' + esc(t("join.requiredNote")) + "</p>" +
            '<div class="field-row">' +
              '<div class="field"><label for="jName">' + esc(t("join.name")) + ' *</label><input id="jName" name="name" required></div>' +
              '<div class="field"><label for="jYear">' + esc(t("join.birthYear")) + ' *</label><input id="jYear" name="birthYear" type="number" min="1930" max="2015" required></div>' +
            "</div>" +
            '<div class="field-row">' +
              '<div class="field"><label for="jPhone">' + esc(t("join.phone")) + ' *</label><input id="jPhone" name="phone" required></div>' +
              '<div class="field"><label for="jEmail">' + esc(t("join.email")) + " (" + esc(t("common.optional")) + ')</label><input id="jEmail" type="email" name="email"></div>' +
            "</div>" +
            '<div class="field"><label for="jResume">' + esc(t("join.resume")) + " (" + esc(t("common.optional")) + ')</label>' +
              '<input id="jResume" type="file" name="resume" accept=".pdf,.doc,.docx">' +
              '<span style="color:var(--color-text-muted);font-size:0.85em;">' + esc(t("join.resumeHint")) + "</span>" +
            "</div>" +
            '<button type="submit" class="btn btn-primary btn-block">' + esc(t("join.submit")) + "</button>" +
          "</form>" +
          "</div>" +
        "</div>" +
      "</section>";

    var form = document.getElementById("joinForm");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var fd = new FormData(form);
      fd.set("form-name", "agent-application");
      fetch("/", { method: "POST", body: fd })
        .then(function () { showJoinSuccess(); })
        .catch(function () { showJoinSuccess(); });
    });

    function showJoinSuccess() {
      document.getElementById("joinFormArea").innerHTML = '<div class="success-box">✓ ' + esc(t("join.success")) + "</div>";
    }
  }

  /* ---------------- TRIP PLANNER ---------------- */
  function tripHref(query, patch) {
    var merged = {};
    Object.keys(query || {}).forEach(function (k) { if (query[k]) merged[k] = query[k]; });
    Object.keys(patch).forEach(function (k) { if (patch[k]) { merged[k] = patch[k]; } else { delete merged[k]; } });
    return "#/trip" + qs(merged);
  }

  function renderTrip(query) {
    query = query || {};
    var area = query.area || "";
    var hospitalId = query.hospital || "";
    var routeId = query.route || "";
    var selHospital = hospitalId ? hospitalById(hospitalId) : null;
    var selRoute = routeId ? routeById(routeId) : null;

    var html = '<section class="section container">';
    html += "<h1>" + esc(t("trip.title")) + "</h1><p>" + esc(t("trip.subtitle")) + "</p>";

    html += '<div class="plan-summary">';
    html += "<span><strong>" + esc(t("contact.summaryHospital")) + "</strong>" +
      (selHospital ? esc(selHospital.name) : '<span class="muted">' + esc(t("trip.noHospital")) + "</span>") + "</span>";
    if (selHospital) html += '<a class="link-btn" href="' + tripHref(query, { hospital: null }) + '">✕ ' + esc(t("trip.changeHospital")) + "</a>";
    html += "<span><strong>" + esc(t("contact.summaryRoute")) + "</strong>" +
      (selRoute ? esc(D.text(selRoute.name, state.lang)) : '<span class="muted">' + esc(t("trip.noRoute")) + "</span>") + "</span>";
    if (selRoute) html += '<a class="link-btn" href="' + tripHref(query, { route: null }) + '">✕ ' + esc(t("trip.changeRoute")) + "</a>";
    if (selHospital) {
      html += '<a class="btn btn-primary" href="#/hospital/' + selHospital.id + qs({ route: routeId }) + '">' + esc(t("trip.continueToAgents")) + "</a>";
    }
    html += "</div>";

    html += '<h2 style="margin-top:30px;">' + esc(t("trip.chooseRegion")) + "</h2>";
    html += '<div class="area-grid">';
    D.areas.forEach(function (id) {
      var active = id === area;
      html += '<a class="area-card' + (active ? " active" : "") + '" href="' + tripHref(query, { area: id }) + '">' +
        '<span class="icon" aria-hidden="true">' + areaIcon(id) + "</span><span>" + esc(areaLabel(id)) + "</span></a>";
    });
    html += "</div>";

    if (area) {
      var hospitalsInArea = hospitalsForArea(area).slice(0, 9);
      html += '<h2 style="margin-top:30px;">' + esc(t("trip.recommendedHospitals")) + " — " + esc(areaLabel(area)) + "</h2>";
      html += '<div class="card-grid">';
      hospitalsInArea.forEach(function (h) {
        var active = h.id === hospitalId;
        html += '<a class="card card-clickable' + (active ? " active" : "") + '" href="' + tripHref(query, { hospital: h.id }) + '">' +
          '<div class="card-tags">' + tierBadgeHtml(h.tier) + "</div>" +
          "<h3>" + esc(h.name) + "</h3>" +
          '<p style="color:var(--color-text-muted);font-size:0.9em;margin:0;">' + esc(h.nameEn) + "</p>" +
        "</a>";
      });
      html += "</div>";
    } else {
      html += '<h2 style="margin-top:30px;">' + esc(t("trip.chooseHospitalFirst")) + "</h2>";
      html += '<div class="filter-group" style="max-width:420px;"><input type="search" id="tripHospitalSearch" placeholder="' + esc(t("filters.searchPlaceholder")) + '"></div>';
      html += '<div class="card-grid" id="tripHospitalResults" style="margin-top:14px;"></div>';
    }

    var routesToShow = area ? D.routes.filter(function (r) { return r.area === area; }) : D.routes;
    html += '<h2 style="margin-top:30px;">' + esc(t("trip.recommendedRoutes")) + (area ? "" : " — " + esc(t("trip.anyRegion"))) + "</h2>";
    html += '<div class="card-grid">';
    routesToShow.forEach(function (r) {
      var active = r.id === routeId;
      html += '<div class="card route-card' + (active ? " active" : "") + '">' +
        "<h3>" + esc(D.text(r.name, state.lang)) + "</h3>" +
        '<div class="route-days">' + esc(t("trip.days", { n: r.days })) + "</div>" +
        '<strong style="font-size:0.85em;">' + esc(t("trip.highlights")) + ":</strong>" +
        '<ul class="included-list">' + D.textList(r.highlights, state.lang).map(function (hl) { return "<li>" + esc(hl) + "</li>"; }).join("") + "</ul>" +
        (active
          ? '<span class="btn btn-secondary btn-block" aria-current="true">✓ ' + esc(t("trip.selectThisRoute")) + "</span>"
          : '<a class="btn btn-primary btn-block" href="' + tripHref(query, { route: r.id }) + '">' + esc(t("trip.selectThisRoute")) + "</a>") +
      "</div>";
    });
    html += "</div>";

    html += "</section>";
    mainEl.innerHTML = html;

    if (!area) {
      var searchInput = document.getElementById("tripHospitalSearch");
      var resultsEl = document.getElementById("tripHospitalResults");
      function updateHospitalSearch() {
        var term = searchInput.value.trim().toLowerCase();
        if (!term) { resultsEl.innerHTML = ""; return; }
        var list = D.hospitals.filter(function (h) {
          return (h.name + " " + h.nameEn).toLowerCase().indexOf(term) !== -1;
        }).slice(0, 12);
        resultsEl.innerHTML = list.map(function (h) {
          return '<a class="card card-clickable" href="' + tripHref(query, { hospital: h.id }) + '">' +
            '<div class="card-tags">' + tierBadgeHtml(h.tier) + "</div>" +
            "<h3>" + esc(h.name) + "</h3>" +
            '<p style="color:var(--color-text-muted);font-size:0.9em;margin:0;">' + esc(h.nameEn) + "</p>" +
          "</a>";
        }).join("");
      }
      searchInput.oninput = updateHospitalSearch;
    }
  }

  /* ---------------- init ---------------- */
  renderChrome();
  route();
})();

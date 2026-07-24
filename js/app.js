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

    document.getElementById("footerAboutTitle").textContent = t("footer.aboutTitle");
    document.getElementById("footerAboutText").textContent = t("footer.aboutText");
    document.getElementById("footerContactTitle").textContent = t("contact.title") === "Request a Consultation" ? t("footer.contactUs") : t("footer.contactUs");
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
      renderHospitalDetail(r.segments[1]);
    } else if (r.segments[0] === "program" && r.segments[1]) {
      renderProgramDetail(r.segments[1]);
    } else if (r.segments[0] === "agent" && r.segments[1]) {
      renderContact(r.segments[1], r.query.program);
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
  function specialtyLabel(id) { return t("specialties." + id); }
  function areaLabel(id) { return t("areas." + id); }
  function hospitalById(id) { return D.hospitals.filter(function (h) { return h.id === id; })[0]; }
  function programById(id) { return D.programs.filter(function (p) { return p.id === id; })[0]; }
  function agentById(id) { return D.agents.filter(function (a) { return a.id === id; })[0]; }
  function programsForHospital(hid) { return D.programs.filter(function (p) { return p.hospitalId === hid; }); }
  function agentsForSpecialty(cat) { return D.agents.filter(function (a) { return a.specialties.indexOf(cat) !== -1; }); }

  function areaIcon(id) {
    var icons = { beijing: "🏛️", shanghai: "🌆", hangzhou: "🌊", guangzhou: "🌴", shenzhen: "🏙️", hainan: "🏝️", chengdu: "🐼", xian: "🏯" };
    return icons[id] || "📍";
  }
  function specialtyIcon(id) {
    var icons = { checkup: "🩺", oncology: "🎗️", tcm: "🌿", cosmetic: "✨", dental: "🦷", fertility: "👶", orthopedics: "🦴", cardiology: "❤️" };
    return icons[id] || "🏥";
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
        '<div class="step-indicator">' + esc(t("steps.area")) + "</div>" +
        '<div class="area-grid" id="areaGrid"></div>' +
      "</section>" +

      '<section class="section-tight container">' +
        "<h2>" + esc(t("filters.specialtyLabel")) + "</h2>" +
        '<div class="chip-row" id="specialtyChips"></div>' +
      "</section>";

    var areaGrid = document.getElementById("areaGrid");
    D.areas.forEach(function (a) {
      var link = document.createElement("a");
      link.href = "#/hospitals?area=" + a.id;
      link.className = "area-card";
      link.innerHTML = '<span class="icon" aria-hidden="true">' + areaIcon(a.id) + "</span><span>" + esc(areaLabel(a.id)) + "</span>";
      areaGrid.appendChild(link);
    });

    var chipRow = document.getElementById("specialtyChips");
    D.specialties.forEach(function (s) {
      var link = document.createElement("a");
      link.href = "#/hospitals?specialty=" + s;
      link.className = "chip";
      link.textContent = specialtyIcon(s) + " " + specialtyLabel(s);
      chipRow.appendChild(link);
    });
  }
  function trustItem(icon, label) {
    return '<span class="trust-item"><span class="icon" aria-hidden="true">' + icon + "</span>" + esc(label) + "</span>";
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
      D.areas.map(function (a) { return '<option value="' + a.id + '">' + esc(areaLabel(a.id)) + "</option>"; }).join("");
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
          var hay = (h.name + " " + h.localName + " " + D.text(h.desc, state.lang)).toLowerCase();
          if (hay.indexOf(term) === -1) return false;
        }
        return true;
      });
      document.getElementById("resultsCount").textContent = t("filters.resultsCount", { n: list.length });
      var resultsEl = document.getElementById("hospitalResults");
      if (list.length === 0) {
        resultsEl.innerHTML = '<div class="empty-state">' + esc(t("filters.noResults")) + "</div>";
        return;
      }
      resultsEl.innerHTML = list.map(hospitalCardHtml).join("");
    }

    areaSel.onchange = update;
    specSel.onchange = update;
    searchInput.oninput = update;
    update();
  }

  function hospitalCardHtml(h) {
    var progCount = programsForHospital(h.id).length;
    return '<a class="card card-clickable" href="#/hospital/' + h.id + '">' +
      '<div class="card-tags">' + h.tags.map(function (tag) { return '<span class="tag">' + esc(specialtyLabel(tag)) + "</span>"; }).join("") + "</div>" +
      "<h3>" + esc(h.name) + "</h3>" +
      '<div class="card-meta">' +
        '<span>📍 ' + esc(areaLabel(h.area)) + "</span>" +
        '<span class="rating-badge">★ ' + h.rating + "</span>" +
      "</div>" +
      "<p>" + esc(D.text(h.desc, state.lang)) + "</p>" +
      '<div class="card-meta"><span>' + esc(t("hospital.programsAvailable", { n: progCount })) + "</span></div>" +
    "</a>";
  }

  /* ---------------- HOSPITAL DETAIL ---------------- */
  function renderHospitalDetail(id) {
    var h = hospitalById(id);
    if (!h) { renderHome(); return; }
    var programs = programsForHospital(id);

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/hospitals"><span class="arrow" aria-hidden="true">←</span>' + esc(t("common.back")) + "</a>" +
        '<div class="detail-header" style="margin-top:14px;">' +
          '<div class="detail-title-block">' +
            "<h1>" + esc(h.name) + "</h1>" +
            '<div class="local-name">' + esc(h.localName) + "</div>" +
            '<div class="card-tags">' + h.tags.map(function (tag) { return '<span class="tag">' + esc(specialtyLabel(tag)) + "</span>"; }).join("") + "</div>" +
          "</div>" +
        "</div>" +
        '<div class="info-strip">' +
          "<span>📍 <strong>" + esc(areaLabel(h.area)) + "</strong></span>" +
          "<span>★ <strong>" + h.rating + "</strong></span>" +
          "<span>🏥 <strong>" + h.beds + "</strong> beds</span>" +
          "<span>👥 <strong>" + h.intlPatientsPerYear.toLocaleString() + "</strong>/yr intl. patients</span>" +
        "</div>" +
        "<h2>" + esc(t("hospital.aboutTitle")) + "</h2>" +
        "<p>" + esc(D.text(h.desc, state.lang)) + "</p>" +
        '<div class="step-indicator" style="margin-top:24px;">' + esc(t("steps.program")) + "</div>" +
        "<h2>" + esc(t("hospital.programsTitle")) + "</h2>" +
        '<div class="card-grid">' + programs.map(programCardHtml).join("") + "</div>" +
      "</section>";
  }

  function programCardHtml(p) {
    return '<a class="card card-clickable" href="#/program/' + p.id + '">' +
      '<div class="card-tags"><span class="tag">' + esc(specialtyLabel(p.category)) + "</span></div>" +
      "<h3>" + esc(D.text(p.name, state.lang)) + "</h3>" +
      "<p>" + esc(D.text(p.desc, state.lang)) + "</p>" +
      '<div class="card-meta">' +
        "<span>⏱ " + esc(D.text(p.duration, state.lang)) + "</span>" +
        "<span>💰 " + esc(p.price) + "</span>" +
      "</div>" +
      '<span class="btn btn-secondary btn-block">' + esc(t("program.viewDetails")) + "</span>" +
    "</a>";
  }

  /* ---------------- PROGRAM DETAIL ---------------- */
  function renderProgramDetail(id) {
    var p = programById(id);
    if (!p) { renderHome(); return; }
    var h = hospitalById(p.hospitalId);
    var agents = agentsForSpecialty(p.category);
    var includes = D.textList(p.includes, state.lang);

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/hospital/' + h.id + '"><span class="arrow" aria-hidden="true">←</span>' + esc(t("common.back")) + "</a>" +
        '<div class="detail-title-block" style="margin-top:14px;">' +
          '<div class="card-tags">' +
            '<span class="tag">' + esc(specialtyLabel(p.category)) + "</span>" +
          "</div>" +
          "<h1>" + esc(D.text(p.name, state.lang)) + "</h1>" +
          '<p class="local-name">' + esc(h.name) + " · " + esc(areaLabel(h.area)) + "</p>" +
        "</div>" +
        '<div class="info-strip">' +
          "<span>" + esc(t("program.duration")) + ": <strong>" + esc(D.text(p.duration, state.lang)) + "</strong></span>" +
          "<span>" + esc(t("program.priceRange")) + ": <strong>" + esc(p.price) + "</strong></span>" +
        "</div>" +
        "<p>" + esc(D.text(p.desc, state.lang)) + "</p>" +
        "<h2>" + esc(t("program.included")) + "</h2>" +
        '<ul class="included-list">' + includes.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" +

        '<div class="step-indicator" style="margin-top:28px;">' + esc(t("steps.agent")) + "</div>" +
        "<h2>" + esc(t("program.agentsTitle")) + "</h2>" +
        "<p>" + esc(t("program.agentsSubtitle")) + "</p>" +
        '<div class="card-grid">' + agents.map(function (a) { return agentCardHtml(a, p.id); }).join("") + "</div>" +
      "</section>";
  }

  function agentInitials(name) {
    return name.split(" ").map(function (part) { return part.charAt(0); }).slice(0, 2).join("").toUpperCase();
  }

  function agentCardHtml(a, programId) {
    var services = D.textList(a.services, state.lang);
    var langLabels = a.languages.map(function (code) { return (I18N.meta[code] || {}).label || code; });
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
      '<a class="btn btn-primary btn-block" href="#/agent/' + a.id + "?program=" + programId + '">' + esc(t("agent.selectAgent")) + "</a>" +
    "</div>";
  }

  /* ---------------- CONTACT / BOOKING ---------------- */
  function renderContact(agentId, programId) {
    var a = agentById(agentId);
    if (!a) { renderHome(); return; }
    var p = programId ? programById(programId) : null;
    var h = p ? hospitalById(p.hospitalId) : null;

    var langOptions = SUPPORTED_LANGS.map(function (code) {
      return '<option value="' + code + '"' + (code === state.lang ? " selected" : "") + ">" + I18N.meta[code].label + "</option>";
    }).join("");

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="' + (p ? "#/program/" + p.id : "#/") + '"><span class="arrow" aria-hidden="true">←</span>' + esc(t("common.back")) + "</a>" +
        '<div class="form-card" style="margin-top:14px;">' +
          "<h1>" + esc(t("contact.title")) + "</h1>" +
          "<p>" + esc(t("contact.subtitle")) + "</p>" +
          '<div class="form-summary">' +
            (h ? "<span><strong>" + esc(t("contact.summaryHospital")) + "</strong>" + esc(h.name) + "</span>" : "") +
            (p ? "<span><strong>" + esc(t("contact.summaryProgram")) + "</strong>" + esc(D.text(p.name, state.lang)) + "</span>" : "") +
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
        program: p ? D.text(p.name, "en") : "",
        agent: a.name
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

  /* ---------------- init ---------------- */
  renderChrome();
  route();
})();

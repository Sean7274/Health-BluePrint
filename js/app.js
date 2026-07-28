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
    document.getElementById("tripNavIcon").innerHTML = Icons.html("compass", { size: 17 });
    document.getElementById("joinNavIcon").innerHTML = Icons.html("handshake", { size: 17 });

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

    renderAuthControls();
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
    } else if (r.segments[0] === "request") {
      renderContact(r.query.agent || null, r.query);
    } else if (r.segments[0] === "join") {
      renderJoin();
    } else if (r.segments[0] === "trip") {
      renderTrip(r.query);
    } else if (r.segments[0] === "food") {
      renderInfoPage("food");
    } else if (r.segments[0] === "safety") {
      renderInfoPage("safety");
    } else if (r.segments[0] === "login") {
      renderLogin();
    } else if (r.segments[0] === "signup") {
      renderSignup();
    } else if (r.segments[0] === "account") {
      renderAccount();
    } else if (r.segments[0] === "admin") {
      renderAdmin();
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
  // A "route" can be one of our curated D.routes entries, or a rider-built
  // custom itinerary (id "custom") whose stops are carried in the
  // "waypoints" query param, pipe-delimited. resolveRoute() normalizes both
  // into the same shape so downstream pages don't need to know the difference.
  function resolveRoute(routeId, waypointsRaw) {
    if (!routeId) return null;
    if (routeId === "custom") {
      var stops = [];
      if (waypointsRaw) {
        try { stops = JSON.parse(waypointsRaw).filter(Boolean); } catch (e) { stops = []; }
      }
      if (stops.length === 0) return null;
      return { id: "custom", custom: true, stops: stops };
    }
    return routeById(routeId) || null;
  }
  function routeDisplayName(r) {
    return r.custom ? t("trip.customRouteLabel", { n: r.stops.length }) : D.text(r.name, state.lang);
  }
  function routeQS(query) {
    return { route: (query && query.route) || "", waypoints: (query && query.waypoints) || "" };
  }
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

  function areaIconName(id) { return Icons.has("area-" + id) ? "area-" + id : "location"; }

  var SPECIALTY_ICON_NAMES = ["checkup", "oncology", "cardiology", "orthopedics", "dental", "pediatrics", "obgyn", "ophthalmology", "neurology", "psychiatry", "respiratory", "hematology"];
  function specialtyIconName(id) { return SPECIALTY_ICON_NAMES.indexOf(id) !== -1 ? id : "checkup"; }

  // Deterministic hue index (1-6) so a given category always gets the same badge color.
  function hueFor(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    return (hash % 6) + 1;
  }
  function iconBadge(iconName, key, opts) {
    opts = opts || {};
    var size = opts.small ? " icon-badge-sm" : "";
    return '<span class="icon-badge icon-badge-' + hueFor(key) + size + '">' + Icons.html(iconName, { size: opts.small ? 20 : 26 }) + "</span>";
  }

  var TIER_CLASS_COLOR = { "A++++": "#b8860b", "A+++": "#c8622a", "A++": "#0f6b5c", "A+": "#2a6ec8", "A": "#6b6b6b" };
  function tierBadgeHtml(tier) {
    return '<span class="tier-badge" style="color:' + TIER_CLASS_COLOR[tier] + '">' + Icons.html("star", { size: 14 }) + " " + esc(tier) + "</span>";
  }

  /* ---------------- AUTH ---------------- */
  var authState = { user: null, profile: null, ready: false };
  function isAdmin() { return !!(authState.profile && authState.profile.role === "admin"); }

  function refreshProfile() {
    if (!authState.user) { authState.profile = null; return Promise.resolve(); }
    return window.sb.from("profiles").select("*").eq("id", authState.user.id).single()
      .then(function (res) { authState.profile = res.data || null; })
      .catch(function () { authState.profile = null; });
  }

  // Auth state is loaded asynchronously (a network round trip to Supabase),
  // so the header renders without login controls first, then fills in once
  // ready. If the visitor lands directly on #/account or #/admin (e.g. a
  // page refresh while already logged in), we re-run the router once that
  // first resolution completes so the page reflects real auth state instead
  // of permanently showing "please log in".
  function initAuth() {
    if (!window.sb) { authState.ready = true; renderAuthControls(); return; }
    var firstResolve = true;
    window.sb.auth.onAuthStateChange(function (event, session) {
      authState.user = session ? session.user : null;
      refreshProfile().then(function () {
        authState.ready = true;
        renderAuthControls();
        if (firstResolve) {
          firstResolve = false;
          var seg = parseHash().segments[0];
          if (seg === "account" || seg === "admin") route();
        }
      });
    });
  }

  function renderAuthControls() {
    var el = document.getElementById("authControls");
    if (!el) return;
    if (!authState.ready) { el.innerHTML = ""; return; }
    if (!authState.user) {
      el.innerHTML = '<a href="#/login" class="btn btn-secondary btn-nav">' + esc(t("auth.logIn")) + "</a>";
      return;
    }
    el.innerHTML =
      '<span class="auth-menu">' +
        '<a href="#/account" class="btn btn-secondary btn-nav">' + esc(t("auth.myRequests")) + "</a>" +
        (isAdmin() ? '<a href="#/admin" class="btn btn-secondary btn-nav">' + esc(t("auth.admin")) + "</a>" : "") +
        '<button type="button" class="btn btn-secondary btn-nav" id="logoutBtn">' + esc(t("auth.logOut")) + "</button>" +
      "</span>";
    document.getElementById("logoutBtn").onclick = function () {
      window.sb.auth.signOut().then(function () {
        authState.user = null;
        authState.profile = null;
        renderAuthControls();
        location.hash = "#/";
      });
    };
  }

  function formErrorHtml() { return '<div class="form-error" id="authFormError" hidden></div>'; }
  function showFormError(id, message) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
  }

  function renderLogin() {
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + esc(t("common.back")) + "</a>" +
        '<div class="form-card" style="margin-top:14px;max-width:480px;">' +
          "<h1>" + esc(t("auth.loginTitle")) + "</h1>" +
          "<p>" + esc(t("auth.loginSubtitle")) + "</p>" +
          '<div id="loginFormArea">' +
          '<form id="loginForm">' +
            '<div class="field"><label for="lEmail">' + esc(t("auth.emailLabel")) + '</label><input id="lEmail" type="email" name="email" required></div>' +
            '<div class="field"><label for="lPassword">' + esc(t("auth.passwordLabel")) + '</label><input id="lPassword" type="password" name="password" required minlength="6"></div>' +
            formErrorHtml() +
            '<button type="submit" class="btn btn-primary btn-block">' + esc(t("auth.submitLogin")) + "</button>" +
          "</form>" +
          '<p style="margin-top:14px;">' + esc(t("auth.noAccountPrompt")) + ' <a href="#/signup">' + esc(t("auth.createOne")) + "</a></p>" +
          "</div>" +
        "</div>" +
      "</section>";

    var form = document.getElementById("loginForm");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!window.sb) { showFormError("authFormError", t("auth.genericError")); return; }
      var fd = new FormData(form);
      window.sb.auth.signInWithPassword({ email: fd.get("email"), password: fd.get("password") })
        .then(function (res) {
          if (res.error || !res.data.session) { showFormError("authFormError", t("auth.loginError")); return; }
          authState.user = res.data.session.user;
          return refreshProfile().then(function () {
            authState.ready = true;
            renderAuthControls();
            location.hash = "#/account";
          });
        })
        .catch(function () { showFormError("authFormError", t("auth.genericError")); });
    });
  }

  function renderSignup() {
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + esc(t("common.back")) + "</a>" +
        '<div class="form-card" style="margin-top:14px;max-width:480px;">' +
          "<h1>" + esc(t("auth.signupTitle")) + "</h1>" +
          "<p>" + esc(t("auth.signupSubtitle")) + "</p>" +
          '<div id="signupFormArea">' +
          '<form id="signupForm">' +
            '<div class="field"><label for="sName">' + esc(t("auth.nameLabel")) + '</label><input id="sName" name="name" required></div>' +
            '<div class="field"><label for="sEmail">' + esc(t("auth.emailLabel")) + '</label><input id="sEmail" type="email" name="email" required></div>' +
            '<div class="field"><label for="sPassword">' + esc(t("auth.passwordLabel")) + '</label><input id="sPassword" type="password" name="password" required minlength="6"></div>' +
            formErrorHtml() +
            '<button type="submit" class="btn btn-primary btn-block">' + esc(t("auth.submitSignup")) + "</button>" +
          "</form>" +
          '<p style="margin-top:14px;">' + esc(t("auth.haveAccountPrompt")) + ' <a href="#/login">' + esc(t("auth.logInInstead")) + "</a></p>" +
          "</div>" +
        "</div>" +
      "</section>";

    var form = document.getElementById("signupForm");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!window.sb) { showFormError("authFormError", t("auth.genericError")); return; }
      var fd = new FormData(form);
      window.sb.auth.signUp({
        email: fd.get("email"),
        password: fd.get("password"),
        options: { data: { full_name: fd.get("name") } }
      }).then(function (res) {
        if (res.error) { showFormError("authFormError", t("auth.signupError")); return; }
        document.getElementById("signupFormArea").innerHTML = '<div class="success-box">' + Icons.html("check", { size: 18 }) + esc(t("auth.signupSuccess")) + "</div>";
      }).catch(function () { showFormError("authFormError", t("auth.genericError")); });
    });
  }

  var ACCOUNT_STATUS_KEYS = { pending: "statusPending", assigned: "statusAssigned", confirmed: "statusConfirmed", completed: "statusCompleted", cancelled: "statusCancelled" };

  function bookingCardHtml(b) {
    var dateStr = b.created_at ? new Date(b.created_at).toLocaleDateString(state.lang) : "";
    var statusKey = ACCOUNT_STATUS_KEYS[b.status] || "statusPending";
    var hospital = b.hospital_id ? hospitalById(b.hospital_id) : null;
    return '<div class="card">' +
      '<div class="card-tags"><span class="tag">' + esc(t("account." + statusKey)) + "</span></div>" +
      "<h3>" + esc(hospital ? hospital.name : (b.specialty ? specialtyLabel(b.specialty) : t("contact.title"))) + "</h3>" +
      '<p style="color:var(--color-text-muted);font-size:0.85em;">' + esc(t("account.submittedOn", { date: dateStr })) + "</p>" +
    "</div>";
  }

  function renderAccount() {
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + esc(t("common.back")) + "</a>" +
        '<h1 style="margin-top:14px;">' + esc(t("account.title")) + "</h1>" +
        "<p>" + esc(t("account.subtitle")) + "</p>" +
        '<div id="accountResults" class="card-grid" style="margin-top:16px;"></div>' +
      "</section>";

    var el = document.getElementById("accountResults");
    if (!authState.ready) { el.innerHTML = ""; return; }
    if (!authState.user) {
      el.innerHTML = '<div class="empty-state">' + esc(t("account.loginRequired")) + ' <a href="#/login">' + esc(t("auth.logIn")) + "</a></div>";
      return;
    }
    if (!window.sb) { el.innerHTML = '<div class="empty-state">' + esc(t("auth.genericError")) + "</div>"; return; }
    window.sb.from("bookings").select("*").eq("user_id", authState.user.id).order("created_at", { ascending: false })
      .then(function (res) {
        var rows = res.data || [];
        if (rows.length === 0) { el.innerHTML = '<div class="empty-state">' + esc(t("account.noRequests")) + "</div>"; return; }
        el.innerHTML = rows.map(bookingCardHtml).join("");
      })
      .catch(function () { el.innerHTML = '<div class="empty-state">' + esc(t("auth.genericError")) + "</div>"; });
  }

  /* ---------------- ADMIN ---------------- */
  function renderAdmin() {
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + esc(t("common.back")) + "</a>" +
        '<h1 style="margin-top:14px;">' + esc(t("admin.title")) + "</h1>" +
        '<div id="adminBody"></div>' +
      "</section>";

    var body = document.getElementById("adminBody");
    if (!authState.ready) { body.innerHTML = ""; return; }
    if (!authState.user || !isAdmin()) {
      body.innerHTML = '<div class="empty-state">' + esc(t("admin.notAuthorized")) + "</div>";
      return;
    }
    if (!window.sb) { body.innerHTML = '<div class="empty-state">' + esc(t("auth.genericError")) + "</div>"; return; }

    body.innerHTML =
      '<div class="filters-bar" style="margin-top:10px;">' +
        '<button type="button" class="btn btn-secondary" id="tabRequests">' + esc(t("admin.requestsTab")) + "</button>" +
        '<button type="button" class="btn btn-secondary" id="tabAgentApps">' + esc(t("admin.agentAppsTab")) + "</button>" +
      "</div>" +
      '<div id="adminTabContent" style="margin-top:16px;"></div>';

    document.getElementById("tabRequests").onclick = loadAdminRequests;
    document.getElementById("tabAgentApps").onclick = loadAdminAgentApps;
    loadAdminRequests();
  }

  function loadAdminRequests() {
    var content = document.getElementById("adminTabContent");
    content.innerHTML = "";
    window.sb.from("bookings").select("*").order("created_at", { ascending: false })
      .then(function (res) {
        var rows = res.data || [];
        if (rows.length === 0) { content.innerHTML = '<div class="empty-state">' + esc(t("admin.noRequests")) + "</div>"; return; }
        content.innerHTML = '<div class="card-grid">' + rows.map(adminBookingCardHtml).join("") + "</div>";
        content.querySelectorAll("[data-status-select]").forEach(function (sel) {
          sel.onchange = function () {
            window.sb.from("bookings").update({ status: sel.value, updated_at: new Date().toISOString() }).eq("id", sel.getAttribute("data-status-select"))
              .then(function () { loadAdminRequests(); });
          };
        });
      })
      .catch(function () { content.innerHTML = '<div class="empty-state">' + esc(t("auth.genericError")) + "</div>"; });
  }

  function adminBookingCardHtml(b) {
    var opts = ["pending", "assigned", "confirmed", "completed", "cancelled"].map(function (s) {
      return '<option value="' + s + '"' + (s === b.status ? " selected" : "") + ">" + esc(t("account." + ACCOUNT_STATUS_KEYS[s])) + "</option>";
    }).join("");
    var hospital = b.hospital_id ? hospitalById(b.hospital_id) : null;
    return '<div class="card">' +
      "<h3>" + esc(b.full_name) + "</h3>" +
      '<p style="font-size:0.85em;color:var(--color-text-muted);">' + esc(b.email) + (b.phone ? " · " + esc(b.phone) : "") + "</p>" +
      (hospital ? "<p><strong>" + esc(t("contact.summaryHospital")) + "</strong>" + esc(hospital.name) + "</p>" : "") +
      (b.specialty ? "<p><strong>" + esc(t("contact.summaryProgram")) + "</strong>" + esc(specialtyLabel(b.specialty)) + "</p>" : "") +
      (b.message ? '<p style="white-space:pre-line;">' + esc(b.message) + "</p>" : "") +
      '<div class="field"><label>' + esc(t("admin.statusLabel")) + '</label><select data-status-select="' + esc(b.id) + '">' + opts + "</select></div>" +
    "</div>";
  }

  function loadAdminAgentApps() {
    var content = document.getElementById("adminTabContent");
    content.innerHTML = "";
    window.sb.from("agent_applications").select("*").order("created_at", { ascending: false })
      .then(function (res) {
        var rows = res.data || [];
        if (rows.length === 0) { content.innerHTML = '<div class="empty-state">' + esc(t("admin.noApplications")) + "</div>"; return; }
        content.innerHTML = '<div class="card-grid">' + rows.map(adminAgentAppCardHtml).join("") + "</div>";
        content.querySelectorAll("[data-approve]").forEach(function (btn) {
          btn.onclick = function () { setAgentAppStatus(btn.getAttribute("data-approve"), "approved"); };
        });
        content.querySelectorAll("[data-reject]").forEach(function (btn) {
          btn.onclick = function () { setAgentAppStatus(btn.getAttribute("data-reject"), "rejected"); };
        });
      })
      .catch(function () { content.innerHTML = '<div class="empty-state">' + esc(t("auth.genericError")) + "</div>"; });
  }

  function setAgentAppStatus(id, status) {
    window.sb.from("agent_applications").update({ status: status }).eq("id", id).then(function () { loadAdminAgentApps(); });
  }

  function adminAgentAppCardHtml(a) {
    var statusLabel = a.status === "approved" ? t("admin.approved") : a.status === "rejected" ? t("admin.rejected") : t("account.statusPending");
    return '<div class="card">' +
      '<div class="card-tags"><span class="tag">' + esc(statusLabel) + "</span></div>" +
      "<h3>" + esc(a.full_name) + "</h3>" +
      '<p style="font-size:0.85em;color:var(--color-text-muted);">' + esc(a.email) + (a.phone ? " · " + esc(a.phone) : "") + "</p>" +
      (a.city ? "<p>" + esc(a.city) + "</p>" : "") +
      (a.message ? '<p style="white-space:pre-line;">' + esc(a.message) + "</p>" : "") +
      (a.status === "pending"
        ? '<div class="field-row"><button type="button" class="btn btn-primary" data-approve="' + esc(a.id) + '">' + esc(t("admin.approve")) + '</button><button type="button" class="btn btn-secondary" data-reject="' + esc(a.id) + '">' + esc(t("admin.reject")) + "</button></div>"
        : "") +
    "</div>";
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
            trustItem("check", t("hero.trust1")) +
            trustItem("globe", t("hero.trust2")) +
            trustItem("handshake", t("hero.trust3")) +
          "</div>" +
        "</div>" +
        Icons.heroSkyline() +
      "</section>" +

      '<section class="section container">' +
        "<h2>" + esc(t("pillars.sectionTitle")) + "</h2>" +
        '<div class="choice-row pillar-row">' +
          pillarCardHtml("medical", "pillar-1", t("pillars.medicalTitle"), t("pillars.medicalDesc"), "#/hospitals") +
          pillarCardHtml("travel", "pillar-2", t("pillars.travelTitle"), t("pillars.travelDesc"), "#/trip") +
          pillarCardHtml("food", "pillar-3", t("pillars.foodTitle"), t("pillars.foodDesc"), "#/food") +
          pillarCardHtml("safety", "pillar-4", t("pillars.safetyTitle"), t("pillars.safetyDesc"), "#/safety") +
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
      link.innerHTML = iconBadge(specialtyIconName(s), s) + "<span>" + esc(specialtyLabel(s)) + "</span>";
      specialtyGrid.appendChild(link);
    });

    var areaChips = document.getElementById("areaChips");
    D.areas.forEach(function (id) {
      var link = document.createElement("a");
      link.href = "#/hospitals?area=" + id;
      link.className = "chip";
      link.innerHTML = Icons.html(areaIconName(id), { size: 16 }) + " " + esc(areaLabel(id));
      areaChips.appendChild(link);
    });
  }
  function trustItem(iconName, label) {
    return '<span class="trust-item">' + Icons.html(iconName, { size: 18 }) + esc(label) + "</span>";
  }
  function pillarCardHtml(iconName, key, title, desc, href) {
    return '<a class="choice-card" href="' + href + '">' +
      iconBadge(iconName, key) +
      "<span>" + esc(title) + "</span>" +
      '<span style="font-weight:400;font-size:0.85em;color:var(--color-text-muted);">' + esc(desc) + "</span>" +
    "</a>";
  }

  /* ---------------- FOOD / SAFETY INFO PAGES ---------------- */
  function renderInfoPage(key) {
    var page = D.pages[key];
    var titleKey = key === "food" ? "pillars.foodTitle" : "pillars.safetyTitle";
    var html =
      '<section class="section container">' +
        '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + esc(t("common.back")) + "</a>" +
        '<h1 style="margin-top:14px;">' + esc(t(titleKey)) + "</h1>" +
        "<p>" + esc(D.text(page.intro, state.lang)) + "</p>" +
        '<div class="card-grid" style="margin-top:20px;">' +
          page.items.map(function (item) {
            return '<div class="card">' +
              iconBadge(item.icon, item.icon) +
              "<h3>" + esc(D.text(item.title, state.lang)) + "</h3>" +
              "<p>" + esc(D.text(item.desc, state.lang)) + "</p>" +
            "</div>";
          }).join("") +
        "</div>";

    if (key === "safety") {
      html += '<h2 style="margin-top:34px;">' + Icons.html("safety-phone", { size: 20, className: "icon-accent" }) + " " + esc(D.text(page.emergencyTitle, state.lang)) + "</h2>";
      html += '<div class="card-grid">' + page.emergencyContacts.map(function (c) {
        return '<div class="card" style="text-align:center;">' +
          iconBadge(c.icon, c.number, { small: true }) +
          '<div style="font-size:1.6em;font-weight:800;color:var(--color-primary-dark);">' + esc(c.number) + "</div>" +
          "<div>" + esc(D.text(c.label, state.lang)) + "</div>" +
        "</div>";
      }).join("") + "</div>";

      var cd = page.cityData;
      html += '<div class="card" style="margin-top:34px;padding:26px;">' +
        "<h2>" + esc(D.text(cd.title, state.lang)) + "</h2>" +
        "<p>" + esc(D.text(cd.disclaimer, state.lang)) + "</p>" +
        "<p>" + esc(D.text(cd.eiu, state.lang)) + "</p>" +
        "<p>" + esc(D.text(cd.numbeoCaveat, state.lang)) + "</p>" +
        '<div class="card-grid" style="margin:16px 0;">' +
          cd.numbeo.map(function (row) {
            return '<div class="card" style="text-align:center;padding:14px;">' +
              "<strong>" + esc(areaLabel(row.area)) + "</strong>" +
              '<div style="font-size:1.4em;font-weight:800;color:var(--color-primary-dark);">' + row.score + "</div>" +
            "</div>";
          }).join("") +
        "</div>" +
        '<p class="required-note">' + esc(D.text(cd.uncoveredNote, state.lang)) + "</p>" +
        "<p>" + esc(D.text(cd.generalNote, state.lang)) + "</p>" +
      "</div>";
    }

    if (key === "food") {
      html += '<h2 style="margin-top:34px;">' + esc(t("food.dishesTitle")) + "</h2>";
      html += '<div class="filters-bar" id="dishFilters">' +
        DIET_FILTERS.map(function (f) {
          return '<label class="filter-check"><input type="checkbox" data-filter="' + f.key + '"> ' + esc(t("food." + f.labelKey)) + "</label>";
        }).join("") +
      "</div>";
      html += '<div class="card-grid" id="dishResults" style="margin-top:16px;"></div>';
    }

    html += '<div class="form-card" style="margin-top:34px;text-align:center;">' +
      "<h2>" + esc(t("contact.title")) + "</h2>" +
      "<p>" + esc(t(key === "food" ? "pillars.foodDesc" : "pillars.safetyDesc")) + "</p>" +
      '<a class="btn btn-primary" href="#/request' + qs({ topic: key }) + '">' + esc(t("contact.submit")) + "</a>" +
    "</div>";

    html += "</section>";
    mainEl.innerHTML = html;

    if (key === "food") initDishFilters(page.dishes);
  }

  var DIET_FILTERS = [
    { key: "pork", labelKey: "filterNoPork" },
    { key: "beef", labelKey: "filterNoBeef" },
    { key: "seafood", labelKey: "filterNoSeafood" },
    { key: "alcohol", labelKey: "filterNoAlcohol" },
    { key: "spicy", labelKey: "filterNoSpicy" },
    { key: "vegetarian", labelKey: "filterVegetarian" }
  ];
  var DISH_TAG_LABEL_KEYS = { pork: "tagPork", beef: "tagBeef", lamb: "tagLamb", poultry: "tagPoultry", seafood: "tagSeafood", alcohol: "tagAlcohol", spicy: "tagSpicy", vegOption: "tagVegOption" };

  function dishCardHtml(d) {
    var media = d.photo
      ? '<div class="dish-media" data-icon="' + esc(d.icon) + '" data-key="' + esc(d.id) + '"><img class="dish-photo" src="' + esc(d.photo) + '" alt="" loading="lazy"></div>'
      : '<div class="dish-media">' + iconBadge(d.icon, d.id, { small: true }) + "</div>";
    return '<div class="card">' +
      media +
      "<h3>" + esc(D.text(d.name, state.lang)) + "</h3>" +
      "<p>" + esc(D.text(d.desc, state.lang)) + "</p>" +
      '<div class="card-tags">' + d.tags.map(function (tg) { return '<span class="tag">' + esc(t("food." + DISH_TAG_LABEL_KEYS[tg])) + "</span>"; }).join("") + "</div>" +
    "</div>";
  }

  function wireDishPhotoFallbacks(container) {
    container.querySelectorAll(".dish-media[data-icon] img").forEach(function (img) {
      img.onerror = function () {
        var el = img.parentElement;
        el.outerHTML = '<div class="dish-media">' + iconBadge(el.getAttribute("data-icon"), el.getAttribute("data-key"), { small: true }) + "</div>";
      };
    });
  }

  function initDishFilters(dishes) {
    var checks = document.querySelectorAll("#dishFilters input[type=checkbox]");
    var resultsEl = document.getElementById("dishResults");
    function update() {
      var active = {};
      checks.forEach(function (c) { if (c.checked) active[c.getAttribute("data-filter")] = true; });
      var list = dishes.filter(function (d) {
        if (active.pork && d.tags.indexOf("pork") !== -1) return false;
        if (active.beef && d.tags.indexOf("beef") !== -1) return false;
        if (active.seafood && d.tags.indexOf("seafood") !== -1) return false;
        if (active.alcohol && d.tags.indexOf("alcohol") !== -1) return false;
        if (active.spicy && d.tags.indexOf("spicy") !== -1) return false;
        if (active.vegetarian) {
          var meaty = ["pork", "beef", "lamb", "poultry", "seafood"].some(function (m) { return d.tags.indexOf(m) !== -1; });
          if (meaty && d.tags.indexOf("vegOption") === -1) return false;
        }
        return true;
      });
      resultsEl.innerHTML = list.length ? list.map(dishCardHtml).join("") : '<div class="empty-state">' + esc(t("food.noDishesMatch")) + "</div>";
      wireDishPhotoFallbacks(resultsEl);
    }
    checks.forEach(function (c) { c.onchange = update; });
    update();
  }

  /* ---------------- HOSPITAL LIST ---------------- */
  function renderHospitalList(query) {
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + '' + esc(t("common.back")) + "</a>" +
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
      wireHospitalPhotoFallbacks(resultsEl);
    }

    areaSel.onchange = update;
    specSel.onchange = update;
    searchInput.oninput = update;
    update();
  }

  // Only real photos/logos are shown here — no decorative placeholder when
  // neither is available, per product decision to avoid generic illustrations.
  function hospitalCardHtml(h, specialty) {
    var media = h.photo
      ? '<div class="hospital-card-media"><img class="hospital-card-photo" src="' + esc(h.photo) + '" alt="" loading="lazy"></div>'
      : (h.logo ? '<div class="hospital-card-media"><img class="hospital-card-photo" src="' + esc(h.logo) + '" alt="" loading="lazy"></div>' : "");
    return '<a class="card card-clickable" href="#/hospital/' + h.id + qs({ specialty: specialty || "" }) + '">' +
      media +
      '<div class="card-tags">' + tierBadgeHtml(h.tier) + h.tags.map(function (tag) { return '<span class="tag">' + esc(specialtyLabel(tag)) + "</span>"; }).join("") + "</div>" +
      "<h3>" + esc(h.name) + "</h3>" +
      '<p style="color:var(--color-text-muted);font-size:0.9em;margin:0;">' + esc(h.nameEn) + "</p>" +
      '<div class="card-meta">' +
        "<span>" + Icons.html("location", { size: 14 }) + esc(areaLabel(h.area)) + "</span>" +
      "</div>" +
    "</a>";
  }

  function wireHospitalPhotoFallbacks(container) {
    container.querySelectorAll(".hospital-card-media img").forEach(function (img) {
      img.onerror = function () { img.parentElement.remove(); };
    });
  }

  /* ---------------- HOSPITAL DETAIL ---------------- */
  function renderHospitalDetail(id, query) {
    var h = hospitalById(id);
    if (!h) { renderHome(); return; }
    var rq = routeQS(query);
    var sel = resolveRoute(rq.route, rq.waypoints);
    var wantedSpecialty = query && query.specialty;
    var orderedTags = h.tags.slice();
    if (wantedSpecialty && orderedTags.indexOf(wantedSpecialty) !== -1) {
      orderedTags = [wantedSpecialty].concat(orderedTags.filter(function (tg) { return tg !== wantedSpecialty; }));
    }

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/hospitals">' + Icons.html("arrow-left", { size: 18 }) + '' + esc(t("common.back")) + "</a>" +
        (sel ? '<div class="plan-summary"><span><strong>' + esc(t("contact.summaryRoute")) + '</strong>' + esc(routeDisplayName(sel)) + "</span></div>" : "") +
        hospitalPhotoBlockHtml(h) +
        '<div class="detail-header">' +
          '<div class="detail-title-block">' +
            "<h1>" + esc(h.name) + "</h1>" +
            '<div class="local-name">' + esc(h.nameEn) + "</div>" +
            '<div class="card-tags">' + tierBadgeHtml(h.tier) + h.tags.map(function (tag) { return '<span class="tag">' + esc(specialtyLabel(tag)) + "</span>"; }).join("") + "</div>" +
          "</div>" +
        "</div>" +
        '<div class="info-strip">' +
          "<span>" + Icons.html("location", { size: 14 }) + "<strong>" + esc(areaLabel(h.area)) + "</strong></span>" +
          "<span>" + esc(t("hospital.tierLabel")) + ": <strong>" + esc(h.tier) + "</strong></span>" +
        "</div>" +
        (h.website
          ? '<p><a class="official-link" href="' + esc(h.website) + '" target="_blank" rel="noopener noreferrer">' + Icons.html("link", { size: 16 }) + esc(t("hospital.officialWebsite")) + "</a></p>"
          : '<p class="no-website-note">' + esc(t("hospital.officialWebsite")) + ": —</p>") +
        '<h2 style="margin-top:24px;">' + esc(t("hospital.programsTitle")) + "</h2>" +
        '<div class="card-grid">' + orderedTags.map(function (tag) { return specialtyCardHtml(h, tag, rq, tag === wantedSpecialty); }).join("") + "</div>" +
      "</section>";

    var photoBlock = mainEl.querySelector(".hospital-photo-block");
    if (photoBlock) {
      var photoImg = photoBlock.querySelector("img");
      // Real photos/logos are hotlinked from external sources we can't
      // guarantee stay up — if one fails to load, remove the block entirely
      // rather than showing a generic placeholder illustration.
      photoImg.onerror = function () { photoBlock.remove(); };
    }
  }

  // Only a real photo or a real hospital logo is shown — if neither is
  // available, nothing is rendered here (no decorative placeholder).
  function hospitalPhotoBlockHtml(h) {
    if (h.photo) {
      return '<div class="hospital-photo-block">' +
        '<img class="hospital-illustration" src="' + esc(h.photo) + '" alt="' + esc(h.name) + '" loading="lazy">' +
        '<p class="illustration-note">' + esc(t("hospital.photoNote")) + (h.photoSource ? " (" + esc(h.photoSource) + ")" : "") + "</p>" +
      "</div>";
    }
    if (h.logo) {
      return '<div class="hospital-photo-block">' +
        '<img class="hospital-illustration" src="' + esc(h.logo) + '" alt="' + esc(h.name) + '" loading="lazy">' +
      "</div>";
    }
    return "";
  }

  function specialtyCardHtml(h, tag, rq, isRecommended) {
    var href = "#/program/" + makeProgramId(h.id, tag) + qs(rq);
    return '<a class="card card-clickable' + (isRecommended ? " active" : "") + '" href="' + href + '">' +
      iconBadge(specialtyIconName(tag), tag, { small: true }) +
      "<h3>" + esc(specialtyLabel(tag)) + (isRecommended ? " " + Icons.html("star", { size: 15, className: "icon-accent" }) : "") + "</h3>" +
      '<span class="btn btn-secondary btn-block">' + esc(t("program.viewDetails")) + "</span>" +
    "</a>";
  }

  /* ---------------- PROGRAM (SPECIALTY) DETAIL ---------------- */
  function renderProgramDetail(pid, query) {
    var parsed = parseProgramId(pid);
    var h = hospitalById(parsed.hospitalId);
    if (!h || h.tags.indexOf(parsed.tag) === -1) { renderHome(); return; }
    var tag = parsed.tag;
    var rq = routeQS(query);
    var agents = agentsForSpecialty(tag);

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/hospital/' + h.id + qs(rq) + '">' + Icons.html("arrow-left", { size: 18 }) + '' + esc(t("common.back")) + "</a>" +
        '<div class="detail-title-block" style="margin-top:14px;">' +
          '<div class="card-tags">' + tierBadgeHtml(h.tier) + '<span class="tag">' + esc(specialtyLabel(tag)) + "</span></div>" +
          "<h1>" + esc(specialtyLabel(tag)) + "</h1>" +
          '<p class="local-name">' + esc(h.name) + " · " + esc(areaLabel(h.area)) + "</p>" +
        "</div>" +
        "<p>" + esc(t("program.genericNote")) + "</p>" +

        '<div class="step-indicator" style="margin-top:28px;">' + esc(t("steps.agent")) + "</div>" +
        "<h2>" + esc(t("program.agentsTitle")) + "</h2>" +
        "<p>" + esc(t("program.agentsSubtitle")) + "</p>" +
        '<div class="card-grid">' + agents.map(function (a) { return agentCardHtml(a, pid, rq); }).join("") + "</div>" +
      "</section>";
  }

  function agentInitials(name) {
    return name.split(" ").map(function (part) { return part.charAt(0); }).slice(0, 2).join("").toUpperCase();
  }

  function agentCardHtml(a, programId, rq) {
    var services = D.textList(a.services, state.lang);
    var langLabels = a.languages.map(function (code) { return (I18N.meta[code] || {}).label || code; });
    var href = "#/agent/" + a.id + qs(Object.assign({ program: programId }, rq));
    return '<div class="card agent-card">' +
      '<div class="agent-top">' +
        '<div class="agent-avatar" aria-hidden="true">' + esc(agentInitials(a.name)) + "</div>" +
        "<div>" +
          "<h3 style='margin-bottom:2px;'>" + esc(a.name) + "</h3>" +
          '<div class="card-meta"><span class="rating-badge">' + Icons.html("star", { size: 13 }) + a.rating + "</span><span>" + esc(t("agent.yearsExp", { n: a.years })) + "</span></div>" +
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
    var a = agentId ? agentById(agentId) : null;
    var programId = query && query.program;
    var parsed = programId ? parseProgramId(programId) : null;
    var h = parsed ? hospitalById(parsed.hospitalId) : null;
    var rq = routeQS(query);
    var sel = resolveRoute(rq.route, rq.waypoints);
    var topic = query && query.topic;

    var langOptions = SUPPORTED_LANGS.map(function (code) {
      return '<option value="' + code + '"' + (code === state.lang ? " selected" : "") + ">" + I18N.meta[code].label + "</option>";
    }).join("");

    var backHref = programId ? "#/program/" + programId + qs(rq)
      : topic === "food" ? "#/food" : topic === "safety" ? "#/safety" : (sel ? "#/trip" + qs(rq) : "#/");

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="' + backHref + '">' + Icons.html("arrow-left", { size: 18 }) + '' + esc(t("common.back")) + "</a>" +
        '<div class="form-card" style="margin-top:14px;">' +
          "<h1>" + esc(t("contact.title")) + "</h1>" +
          "<p>" + esc(a ? t("contact.subtitle") : t("contact.subtitleGeneral")) + "</p>" +
          '<div class="form-summary">' +
            (h ? "<span><strong>" + esc(t("contact.summaryHospital")) + "</strong>" + esc(h.name) + "</span>" : "") +
            (parsed ? "<span><strong>" + esc(t("contact.summaryProgram")) + "</strong>" + esc(specialtyLabel(parsed.tag)) + "</span>" : "") +
            (sel ? "<span><strong>" + esc(t("contact.summaryRoute")) + "</strong>" + esc(routeDisplayName(sel)) + "</span>" : "") +
            (topic === "food" ? "<span><strong>" + esc(t("contact.summaryProgram")) + "</strong>" + esc(t("pillars.foodTitle")) + "</span>" : "") +
            (topic === "safety" ? "<span><strong>" + esc(t("contact.summaryProgram")) + "</strong>" + esc(t("pillars.safetyTitle")) + "</span>" : "") +
            (a ? "<span><strong>" + esc(t("contact.summaryAgent")) + "</strong>" + esc(a.name) + "</span>" : "") +
          "</div>" +
          (sel && sel.custom ? '<ul class="included-list">' + sel.stops.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" : "") +
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
            '<div class="form-error" id="bookingFormError" hidden></div>' +
            '<button type="submit" class="btn btn-primary btn-block">' + esc(t("contact.submit")) + "</button>" +
          "</form>" +
          "</div>" +
        "</div>" +
      "</section>";

    var form = document.getElementById("inquiryForm");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var submitBtn = form.querySelector("button[type=submit]");
      var fd = new FormData(form);
      var payload = {
        user_id: authState.user ? authState.user.id : null,
        full_name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        hospital_id: h ? h.id : null,
        specialty: parsed ? parsed.tag : (topic || null),
        route_data: sel || null,
        message: buildBookingMessage(fd, a, sel, topic)
      };
      if (!window.sb) { showFormError("bookingFormError", t("auth.genericError")); return; }
      submitBtn.disabled = true;
      window.sb.from("bookings").insert(payload)
        .then(function (res) {
          submitBtn.disabled = false;
          if (res.error) { showFormError("bookingFormError", t("auth.genericError")); return; }
          showSuccess();
        })
        .catch(function () { submitBtn.disabled = false; showFormError("bookingFormError", t("auth.genericError")); });
    });

    function showSuccess() {
      document.getElementById("formArea").innerHTML = '<div class="success-box">' + Icons.html("check", { size: 18 }) + esc(t("contact.success")) + "</div>";
    }
  }

  // The bookings table keeps only structured columns (hospital/specialty);
  // everything else useful for a human reviewing the request — which demo
  // agent they picked, the trip route, their country/preferred language —
  // gets folded into the free-text message so no schema change is needed.
  function buildBookingMessage(fd, a, sel, topic) {
    var parts = [];
    var userMsg = fd.get("message");
    if (userMsg) parts.push(userMsg);
    if (a) parts.push("Requested agent: " + a.name);
    if (sel) parts.push("Route: " + (sel.custom ? "Custom (" + sel.stops.join(", ") + ")" : D.text(sel.name, "en")));
    if (topic === "food") parts.push("Topic: Food & Dining");
    if (topic === "safety") parts.push("Topic: Safety");
    var country = fd.get("country"); if (country) parts.push("Country: " + country);
    var lang = fd.get("preferredLanguage"); if (lang) parts.push("Preferred language: " + lang);
    return parts.join("\n");
  }

  /* ---------------- JOIN AS AGENT ---------------- */
  function renderJoin() {
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + '' + esc(t("common.back")) + "</a>" +
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
            '<div class="form-error" id="joinFormError" hidden></div>' +
            '<button type="submit" class="btn btn-primary btn-block">' + esc(t("join.submit")) + "</button>" +
          "</form>" +
          "</div>" +
        "</div>" +
      "</section>";

    var form = document.getElementById("joinForm");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var submitBtn = form.querySelector("button[type=submit]");
      var fd = new FormData(form);
      var resumeFile = fd.get("resume");
      var hasResume = !!(resumeFile && resumeFile.name);

      // The resume file itself still goes through Netlify Forms (it already
      // handles file storage + emailing it to us, so there's no need to set
      // up Supabase Storage for this yet). The structured fields also go
      // into Supabase so the application shows up in the admin dashboard
      // and can be approved/rejected and tracked.
      fd.set("form-name", "agent-application");
      var netlifySubmit = fetch("/", { method: "POST", body: fd }).catch(function () {});

      var dbPayload = {
        user_id: authState.user ? authState.user.id : null,
        full_name: fd.get("name"),
        email: fd.get("email") || "",
        phone: fd.get("phone"),
        message: "Birth year: " + (fd.get("birthYear") || "—") + (hasResume ? " · Resume attached (see email notification)" : " · No resume attached")
      };
      var dbSubmit = window.sb ? window.sb.from("agent_applications").insert(dbPayload) : Promise.resolve();

      submitBtn.disabled = true;
      Promise.all([netlifySubmit, dbSubmit])
        .then(function () { submitBtn.disabled = false; showJoinSuccess(); })
        .catch(function () { submitBtn.disabled = false; showJoinSuccess(); });
    });

    function showJoinSuccess() {
      document.getElementById("joinFormArea").innerHTML = '<div class="success-box">' + Icons.html("check", { size: 18 }) + esc(t("join.success")) + "</div>";
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
    var rq = routeQS(query);
    var selHospital = hospitalId ? hospitalById(hospitalId) : null;
    var selRoute = resolveRoute(rq.route, rq.waypoints);
    // In-memory draft list for the custom-route builder. Seeded from the
    // URL if a custom route is already active, so editing an existing
    // custom route (rather than starting over) works too.
    var customStops = (selRoute && selRoute.custom) ? selRoute.stops.slice() : [];

    var html = '<section class="section container">';
    html += '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + esc(t("common.back")) + "</a>";
    html += '<h1 style="margin-top:14px;">' + esc(t("trip.title")) + "</h1><p>" + esc(t("trip.subtitle")) + "</p>";

    html += '<div class="plan-summary">';
    html += "<span><strong>" + esc(t("contact.summaryHospital")) + "</strong>" +
      (selHospital ? esc(selHospital.name) : '<span class="muted">' + esc(t("trip.noHospital")) + "</span>") + "</span>";
    if (selHospital) html += '<a class="link-btn" href="' + tripHref(query, { hospital: null }) + '">' + Icons.html("close", { size: 14 }) + esc(t("trip.changeHospital")) + "</a>";
    html += "<span><strong>" + esc(t("contact.summaryRoute")) + "</strong>" +
      (selRoute ? esc(routeDisplayName(selRoute)) : '<span class="muted">' + esc(t("trip.noRoute")) + "</span>") + "</span>";
    if (selRoute) html += '<a class="link-btn" href="' + tripHref(query, { route: null, waypoints: null }) + '">' + Icons.html("close", { size: 14 }) + esc(t("trip.changeRoute")) + "</a>";
    if (selHospital || selRoute) {
      html += '<a class="btn btn-primary" href="' + (selHospital ? "#/hospital/" + selHospital.id + qs(rq) : "#/request" + qs(rq)) + '">' + esc(t("trip.continueToAgents")) + "</a>";
    }
    html += "</div>";

    html += '<h2 style="margin-top:30px;">' + esc(t("trip.chooseRegion")) + "</h2>";
    html += '<div class="area-grid">';
    D.areas.forEach(function (id) {
      var active = id === area;
      html += '<a class="area-card' + (active ? " active" : "") + '" href="' + tripHref(query, { area: id }) + '">' +
        iconBadge(areaIconName(id), id) + "<span>" + esc(areaLabel(id)) + "</span></a>";
    });
    html += "</div>";

    html += '<div id="tripResults">';

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
      var active = r.id === rq.route;
      html += '<div class="card route-card' + (active ? " active" : "") + '">' +
        "<h3>" + esc(D.text(r.name, state.lang)) + "</h3>" +
        '<div class="route-days">' + esc(t("trip.days", { n: r.days })) + "</div>" +
        '<strong style="font-size:0.85em;">' + esc(t("trip.highlights")) + ":</strong>" +
        '<ul class="included-list">' + D.textList(r.highlights, state.lang).map(function (hl) { return "<li>" + esc(hl) + "</li>"; }).join("") + "</ul>" +
        (active
          ? '<span class="btn btn-secondary btn-block" aria-current="true">' + Icons.html("check", { size: 16 }) + esc(t("trip.selectThisRoute")) + "</span>"
          : '<a class="btn btn-primary btn-block" href="' + tripHref(query, { route: r.id, waypoints: null }) + '">' + esc(t("trip.selectThisRoute")) + "</a>") +
      "</div>";
    });
    html += "</div>";

    html += '<div class="form-card" style="margin-top:20px;max-width:560px;">' +
      "<h3>" + esc(t("trip.buildCustomRoute")) + "</h3>" +
      "<p>" + esc(t("trip.buildCustomRouteDesc")) + "</p>" +
      '<div class="field-row" style="align-items:flex-end;">' +
        '<div class="field" style="margin-bottom:0;flex:1;"><input type="text" id="customStopInput" placeholder="' + esc(t("trip.stopPlaceholder")) + '"></div>' +
        '<button type="button" class="btn btn-secondary" id="addStopBtn" style="margin-bottom:16px;">' + esc(t("trip.addStop")) + "</button>" +
      "</div>" +
      '<ul class="included-list" id="customStopsList"></ul>' +
      '<a class="btn btn-primary btn-block" id="useCustomRouteBtn" style="margin-top:10px;">' + esc(t("trip.useCustomRoute")) + "</a>" +
    "</div>";

    html += "</div>"; // #tripResults
    html += "</section>";
    mainEl.innerHTML = html;

    if (area) {
      var resultsSection = document.getElementById("tripResults");
      if (resultsSection) resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

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

    // Custom route builder: add/remove stops purely client-side (no
    // navigation) so typing doesn't get interrupted by a full re-render;
    // only "Use This Custom Route" commits the list to the URL.
    var stopInput = document.getElementById("customStopInput");
    var stopsListEl = document.getElementById("customStopsList");
    var useBtn = document.getElementById("useCustomRouteBtn");

    function renderStopsList() {
      stopsListEl.innerHTML = customStops.length
        ? customStops.map(function (s, i) {
            return '<li style="display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
              "<span>" + esc(s) + "</span>" +
              '<button type="button" class="link-btn" data-remove-stop="' + i + '">' + Icons.html("close", { size: 14 }) + esc(t("trip.removeStop")) + "</button>" +
            "</li>";
          }).join("")
        : '<li class="muted">' + esc(t("trip.noStopsYet")) + "</li>";
      useBtn.href = customStops.length ? tripHref(query, { route: "custom", waypoints: JSON.stringify(customStops) }) : "#";
      stopsListEl.querySelectorAll("[data-remove-stop]").forEach(function (btn) {
        btn.onclick = function () {
          customStops.splice(parseInt(btn.getAttribute("data-remove-stop"), 10), 1);
          renderStopsList();
        };
      });
    }
    function addStop() {
      var val = stopInput.value.trim();
      if (!val) return;
      customStops.push(val);
      stopInput.value = "";
      renderStopsList();
      stopInput.focus();
    }
    document.getElementById("addStopBtn").onclick = addStop;
    stopInput.addEventListener("keydown", function (ev) { if (ev.key === "Enter") { ev.preventDefault(); addStop(); } });
    renderStopsList();
  }

  /* ---------------- scroll-to-top ---------------- */
  function initScrollTop() {
    var btn = document.getElementById("scrollTopBtn");
    if (!btn) return;
    btn.innerHTML = Icons.html("arrow-up", { size: 22 });
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", function () {
      btn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
  }

  /* ---------------- init ---------------- */
  renderChrome();
  route();
  initScrollTop();
  initAuth();
})();

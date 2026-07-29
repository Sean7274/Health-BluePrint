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
    document.getElementById("footerTermsLink").textContent = t("footer.termsLink");
    document.getElementById("footerPrivacyLink").textContent = t("footer.privacyLink");

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
      renderLogin(r.query);
    } else if (r.segments[0] === "signup") {
      renderSignup();
    } else if (r.segments[0] === "account") {
      renderAccount();
    } else if (r.segments[0] === "admin") {
      renderAdmin();
    } else if (r.segments[0] === "terms") {
      renderLegalPage("terms");
    } else if (r.segments[0] === "privacy") {
      renderLegalPage("privacy");
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
  // Riders can select any number of curated D.routes entries at once (ids
  // carried comma-separated in the "routes" query param), plus at most one
  // self-built custom itinerary (its stops carried as JSON in "waypoints").
  // resolveRoutes() normalizes all of that into a single flat list so
  // downstream pages just deal with an array of route-like objects.
  function resolveRoutes(routesRaw, waypointsRaw) {
    var list = [];
    (routesRaw || "").split(",").filter(Boolean).forEach(function (id) {
      var r = routeById(id);
      if (r) list.push(r);
    });
    if (waypointsRaw) {
      var stops = [];
      try { stops = JSON.parse(waypointsRaw).filter(Boolean); } catch (e) { stops = []; }
      if (stops.length) list.push({ id: "custom", custom: true, stops: stops });
    }
    return list;
  }
  function routeDisplayName(r) {
    return r.custom ? t("trip.customRouteLabel", { n: r.stops.length }) : D.text(r.name, state.lang);
  }
  function routesDisplayNames(list) {
    return list.map(routeDisplayName).join(", ");
  }
  function routeQS(query) {
    return { routes: (query && query.routes) || "", waypoints: (query && query.waypoints) || "" };
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

  // Phone sign-in needs an SMS provider (e.g. Twilio) configured in
  // Supabase, which costs money and hasn't been set up yet — hidden until
  // that's ready. Flip this back on once it is; no other code changes
  // needed, identifierToggleHtml/wireIdentifierToggle handle both cases.
  var PHONE_AUTH_ENABLED = false;

  // Shared "Email / Phone" identifier toggle used on signup and login: a
  // single input that switches type/label/placeholder instead of showing
  // two separate fields, since a person only ever signs up/in with one.
  function identifierToggleHtml(prefix) {
    if (!PHONE_AUTH_ENABLED) {
      return '<div class="field"><label for="' + prefix + 'Identifier">' + esc(t("auth.emailLabel")) + '</label>' +
        '<input id="' + prefix + 'Identifier" type="email" required>' +
      "</div>";
    }
    return '<div class="method-toggle" role="tablist">' +
      '<button type="button" class="method-btn active" id="' + prefix + 'MethodEmail">' + esc(t("auth.emailMethod")) + "</button>" +
      '<button type="button" class="method-btn" id="' + prefix + 'MethodPhone">' + esc(t("auth.phoneMethod")) + "</button>" +
    "</div>" +
    '<div class="field"><label for="' + prefix + 'Identifier" id="' + prefix + 'IdentifierLabel">' + esc(t("auth.emailLabel")) + '</label>' +
      '<input id="' + prefix + 'Identifier" type="email" required>' +
      '<span id="' + prefix + 'IdentifierHint" style="color:var(--color-text-muted);font-size:0.85em;" hidden>' + esc(t("auth.phoneHint")) + "</span>" +
    "</div>";
  }
  function wireIdentifierToggle(prefix) {
    var input = document.getElementById(prefix + "Identifier");
    if (!PHONE_AUTH_ENABLED) {
      return { getMethod: function () { return "email"; }, getValue: function () { return input.value.trim(); } };
    }
    var method = "email";
    var emailBtn = document.getElementById(prefix + "MethodEmail");
    var phoneBtn = document.getElementById(prefix + "MethodPhone");
    var label = document.getElementById(prefix + "IdentifierLabel");
    var hint = document.getElementById(prefix + "IdentifierHint");
    function setMethod(m) {
      method = m;
      emailBtn.classList.toggle("active", m === "email");
      phoneBtn.classList.toggle("active", m === "phone");
      input.type = m === "email" ? "email" : "tel";
      label.textContent = m === "email" ? t("auth.emailLabel") : t("auth.phoneLabel");
      hint.hidden = m === "email";
      input.value = "";
    }
    emailBtn.onclick = function () { setMethod("email"); };
    phoneBtn.onclick = function () { setMethod("phone"); };
    return { getMethod: function () { return method; }, getValue: function () { return input.value.trim(); } };
  }

  function renderLogin(query) {
    query = query || {};
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + esc(t("common.back")) + "</a>" +
        '<div class="form-card" style="margin-top:14px;max-width:480px;">' +
          "<h1>" + esc(t("auth.loginTitle")) + "</h1>" +
          "<p>" + esc(t("auth.loginSubtitle")) + "</p>" +
          (query.verified ? '<div class="success-box" style="margin-bottom:16px;">' + Icons.html("check", { size: 18 }) + esc(t("auth.verifiedBanner")) + "</div>" : "") +

          '<div id="loginPasswordStep">' +
            '<div id="loginFormArea">' +
            '<form id="loginForm">' +
              identifierToggleHtml("lPw") +
              '<div class="field"><label for="lPassword">' + esc(t("auth.passwordLabel")) + '</label><input id="lPassword" type="password" required minlength="6"></div>' +
              formErrorHtml() +
              '<button type="submit" class="btn btn-primary btn-block">' + esc(t("auth.submitLogin")) + "</button>" +
            "</form>" +
            '<p style="margin-top:14px;"><button type="button" class="link-btn" id="showCodeLoginBtn">' + esc(t("auth.loginWithCode")) + "</button></p>" +
            '<p style="margin-top:6px;">' + esc(t("auth.noAccountPrompt")) + ' <a href="#/signup">' + esc(t("auth.createOne")) + "</a></p>" +
            "</div>" +
          "</div>" +

          '<div id="loginCodeStep" hidden>' +
            '<div id="loginCodeRequest">' +
              "<p>" + esc(t("auth.loginWithCodeSubtitle")) + "</p>" +
              identifierToggleHtml("lCode") +
              '<div class="form-error" id="loginCodeError" hidden></div>' +
              '<button type="button" class="btn btn-primary btn-block" id="sendCodeBtn">' + esc(t("auth.sendCode")) + "</button>" +
              '<p style="margin-top:14px;"><button type="button" class="link-btn" id="backToPasswordBtn">' + esc(t("auth.backToPassword")) + "</button></p>" +
            "</div>" +
            '<div id="loginCodeVerify" hidden>' +
              '<p id="loginCodeSentSubtitle"></p>' +
              '<div class="field"><label for="lcCode">' + esc(t("auth.codeLabel")) + '</label><input id="lcCode" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code"></div>' +
              '<div class="form-error" id="loginCodeVerifyError" hidden></div>' +
              '<button type="button" class="btn btn-primary btn-block" id="verifyCodeBtn">' + esc(t("auth.verifyCode")) + "</button>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>";

    function completeLogin(session) {
      authState.user = session.user;
      return refreshProfile().then(function () {
        authState.ready = true;
        renderAuthControls();
        location.hash = "#/";
      });
    }

    var pwIdentifier = wireIdentifierToggle("lPw");
    var form = document.getElementById("loginForm");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!window.sb) { showFormError("authFormError", t("auth.genericError")); return; }
      var value = pwIdentifier.getValue();
      var password = document.getElementById("lPassword").value;
      var creds = pwIdentifier.getMethod() === "email" ? { email: value, password: password } : { phone: value, password: password };
      window.sb.auth.signInWithPassword(creds)
        .then(function (res) {
          if (res.error || !res.data.session) { showFormError("authFormError", t("auth.loginError")); return; }
          return completeLogin(res.data.session);
        })
        .catch(function () { showFormError("authFormError", t("auth.genericError")); });
    });

    var codeIdentifier = wireIdentifierToggle("lCode");
    document.getElementById("showCodeLoginBtn").onclick = function () {
      document.getElementById("loginPasswordStep").hidden = true;
      document.getElementById("loginCodeStep").hidden = false;
    };
    document.getElementById("backToPasswordBtn").onclick = function () {
      document.getElementById("loginCodeStep").hidden = true;
      document.getElementById("loginPasswordStep").hidden = false;
    };

    var codeMethod = "email";
    var codeValue = "";
    document.getElementById("sendCodeBtn").onclick = function () {
      if (!window.sb) { showFormError("loginCodeError", t("auth.genericError")); return; }
      codeMethod = codeIdentifier.getMethod();
      codeValue = codeIdentifier.getValue();
      if (!codeValue) { showFormError("loginCodeError", t("auth.genericError")); return; }
      // shouldCreateUser:false so this "alternative sign-in" path can only
      // be used to log in to an existing account, not silently create one.
      var opts = { options: { shouldCreateUser: false } };
      opts[codeMethod] = codeValue;
      window.sb.auth.signInWithOtp(opts)
        .then(function (res) {
          if (res.error) { showFormError("loginCodeError", t("auth.genericError")); return; }
          document.getElementById("loginCodeRequest").hidden = true;
          document.getElementById("loginCodeVerify").hidden = false;
          var subtitleKey = codeMethod === "email" ? "auth.codeSentSubtitle" : "auth.codeSentSubtitlePhone";
          var vars = codeMethod === "email" ? { email: codeValue } : { phone: codeValue };
          document.getElementById("loginCodeSentSubtitle").textContent = t(subtitleKey, vars);
        })
        .catch(function () { showFormError("loginCodeError", t("auth.genericError")); });
    };

    document.getElementById("verifyCodeBtn").onclick = function () {
      var code = document.getElementById("lcCode").value.trim();
      if (!code) { showFormError("loginCodeVerifyError", t("auth.codeRequired")); return; }
      var verifyOpts = { token: code, type: codeMethod === "email" ? "email" : "sms" };
      verifyOpts[codeMethod] = codeValue;
      window.sb.auth.verifyOtp(verifyOpts)
        .then(function (res) {
          if (res.error || !res.data.session) { showFormError("loginCodeVerifyError", t("auth.verifyError")); return; }
          return completeLogin(res.data.session);
        })
        .catch(function () { showFormError("loginCodeVerifyError", t("auth.genericError")); });
    };
  }

  function renderSignup() {
    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + esc(t("common.back")) + "</a>" +
        '<div class="form-card" style="margin-top:14px;max-width:480px;">' +

          '<div id="signupStep1">' +
            "<h1>" + esc(t("auth.signupTitle")) + "</h1>" +
            "<p>" + esc(t("auth.signupSubtitle")) + "</p>" +
            '<div id="signupFormArea">' +
            '<form id="signupForm">' +
              '<div class="field"><label for="sName">' + esc(t("auth.nameLabel")) + '</label><input id="sName" name="name" required></div>' +
              identifierToggleHtml("s") +
              '<div class="field"><label for="sPassword">' + esc(t("auth.passwordLabel")) + '</label><input id="sPassword" type="password" name="password" required minlength="6"></div>' +

              '<div class="field"><label for="sResidenceCountry">' + esc(t("auth.residenceCountryLabel")) + ' *</label><input id="sResidenceCountry" name="residenceCountry" required></div>' +
              '<div class="field"><label for="sGender">' + esc(t("auth.genderLabel")) + " (" + esc(t("common.optional")) + ')</label>' +
                '<select id="sGender" name="gender">' +
                  '<option value="">' + esc(t("auth.genderPreferNotToSay")) + "</option>" +
                  '<option value="male">' + esc(t("auth.genderMale")) + "</option>" +
                  '<option value="female">' + esc(t("auth.genderFemale")) + "</option>" +
                  '<option value="other">' + esc(t("auth.genderOther")) + "</option>" +
                "</select>" +
              "</div>" +
              '<div class="field-row">' +
                '<div class="field"><label for="sAge">' + esc(t("auth.ageLabel")) + " (" + esc(t("common.optional")) + ')</label><input id="sAge" name="age" type="number" min="0" max="120"></div>' +
                '<div class="field"><label for="sFamilySize">' + esc(t("auth.familySizeLabel")) + " (" + esc(t("common.optional")) + ')</label><input id="sFamilySize" name="familySize" type="number" min="1" max="20"></div>' +
              "</div>" +
              '<div class="field"><label for="sFoodPreference">' + esc(t("auth.foodPreferenceLabel")) + " (" + esc(t("common.optional")) + ')</label><input id="sFoodPreference" name="foodPreference"></div>' +

              '<label class="agree-check"><input type="checkbox" id="sAgreeTerms" required><span>' +
                t("auth.agreeToTerms", {
                  terms: '<a href="#/terms" target="_blank" rel="noopener noreferrer">' + esc(t("legal.termsTitle")) + "</a>",
                  privacy: '<a href="#/privacy" target="_blank" rel="noopener noreferrer">' + esc(t("legal.privacyTitle")) + "</a>"
                }) +
              "</span></label>" +

              formErrorHtml() +
              '<button type="submit" class="btn btn-primary btn-block">' + esc(t("auth.submitSignup")) + "</button>" +
            "</form>" +
            '<p style="margin-top:14px;">' + esc(t("auth.haveAccountPrompt")) + ' <a href="#/login">' + esc(t("auth.logInInstead")) + "</a></p>" +
            "</div>" +
          "</div>" +

          '<div id="signupStep2" hidden>' +
            "<h1>" + esc(t("auth.verifyTitle")) + "</h1>" +
            '<p id="signupVerifySubtitle"></p>' +
            '<form id="signupVerifyForm">' +
              '<div class="field"><label for="sCode">' + esc(t("auth.codeLabel")) + '</label><input id="sCode" name="code" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code"></div>' +
              '<div class="form-error" id="signupVerifyError" hidden></div>' +
              '<button type="submit" class="btn btn-primary btn-block">' + esc(t("auth.verifyCode")) + "</button>" +
            "</form>" +
            '<p style="margin-top:14px;"><button type="button" class="link-btn" id="resendCodeBtn">' + esc(t("auth.resendCode")) + "</button></p>" +
            '<p style="margin-top:6px;">' + esc(t("auth.alreadyVerifiedPrompt")) + ' <a href="#/login">' + esc(t("auth.logInInstead")) + "</a></p>" +
          "</div>" +

        "</div>" +
      "</section>";

    var signedUpMethod = "email";
    var signedUpValue = "";
    var signupIdentifier = wireIdentifierToggle("s");
    var form = document.getElementById("signupForm");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!window.sb) { showFormError("authFormError", t("auth.genericError")); return; }
      var fd = new FormData(form);
      signedUpMethod = signupIdentifier.getMethod();
      signedUpValue = signupIdentifier.getValue();
      var profileData = {
        full_name: fd.get("name"),
        gender: fd.get("gender") || null,
        age: fd.get("age") || null,
        residence_country: fd.get("residenceCountry"),
        family_size: fd.get("familySize") || null,
        food_preference: fd.get("foodPreference") || null
      };
      var signUpArgs = {
        password: fd.get("password"),
        options: { data: profileData }
      };
      signUpArgs[signedUpMethod] = signedUpValue;
      window.sb.auth.signUp(signUpArgs).then(function (res) {
        if (res.error) { showFormError("authFormError", t("auth.signupError")); return; }
        document.getElementById("signupStep1").hidden = true;
        document.getElementById("signupStep2").hidden = false;
        var subtitleKey = signedUpMethod === "email" ? "auth.verifySubtitle" : "auth.verifySubtitlePhone";
        var vars = signedUpMethod === "email" ? { email: signedUpValue } : { phone: signedUpValue };
        document.getElementById("signupVerifySubtitle").textContent = t(subtitleKey, vars);
      }).catch(function () { showFormError("authFormError", t("auth.genericError")); });
    });

    var verifyForm = document.getElementById("signupVerifyForm");
    verifyForm.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!window.sb) { showFormError("signupVerifyError", t("auth.genericError")); return; }
      var code = (new FormData(verifyForm)).get("code");
      code = code ? code.trim() : "";
      if (!code) { showFormError("signupVerifyError", t("auth.codeRequired")); return; }
      var verifyOpts = { token: code, type: signedUpMethod === "email" ? "signup" : "sms" };
      verifyOpts[signedUpMethod] = signedUpValue;
      window.sb.auth.verifyOtp(verifyOpts)
        .then(function (res) {
          if (res.error) { showFormError("signupVerifyError", t("auth.verifyError")); return; }
          // Verifying via code logs the user in immediately, but per the
          // requested flow we always send people to the login page to sign
          // in explicitly rather than silently continuing a session here.
          return window.sb.auth.signOut().then(function () {
            authState.user = null;
            authState.profile = null;
            location.hash = "#/login" + qs({ verified: "1" });
          });
        })
        .catch(function () { showFormError("signupVerifyError", t("auth.genericError")); });
    });

    document.getElementById("resendCodeBtn").onclick = function () {
      if (!signedUpValue || !window.sb) return;
      var resendOpts = { type: signedUpMethod === "email" ? "signup" : "sms" };
      resendOpts[signedUpMethod] = signedUpValue;
      window.sb.auth.resend(resendOpts);
    };
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
        content.querySelectorAll("[data-download-resume]").forEach(function (btn) {
          btn.onclick = function () {
            window.sb.storage.from("resumes").createSignedUrl(btn.getAttribute("data-download-resume"), 60)
              .then(function (res) { if (res.data) window.open(res.data.signedUrl, "_blank", "noopener"); });
          };
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
      (a.resume_path ? '<button type="button" class="btn btn-secondary" data-download-resume="' + esc(a.resume_path) + '">' + esc(t("admin.downloadResume")) + "</button>" : "") +
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

  // ---- Reusable photo carousel (hospitals, dishes, routes, cities) ----
  // Only the currently-shown photo is ever fetched: additional photos for
  // the same subject load on demand as a visitor clicks through, so a card
  // with 3 photos costs exactly the same as 1 on initial page load — this
  // is deliberate, since hotlinked photos are the site's biggest load-time
  // cost and eagerly fetching every slide of every carousel would multiply
  // that cost by however many photos each subject has.
  function carouselHtml(photos, wrapperClass, imgClass, altText, extraAttrs) {
    var urls = (photos || []).map(function (p) { return p.url; });
    if (urls.length === 0) return "";
    var html = '<div class="' + wrapperClass + ' photo-carousel"' + (extraAttrs || "") +
      ' data-photos=\'' + esc(JSON.stringify(urls)) + '\' data-idx="0">' +
      '<img class="' + imgClass + '" src="' + esc(urls[0]) + '" alt="' + esc(altText || "") + '" loading="lazy">';
    if (urls.length > 1) {
      html += '<button type="button" class="carousel-arrow carousel-prev" aria-label="' + esc(t("common.prevPhoto")) + '">' + Icons.html("arrow-left", { size: 14 }) + "</button>" +
        '<button type="button" class="carousel-arrow carousel-next" aria-label="' + esc(t("common.nextPhoto")) + '">' + Icons.html("arrow-right", { size: 14 }) + "</button>" +
        '<div class="carousel-dots">' + urls.map(function (_, i) { return '<span class="carousel-dot' + (i === 0 ? " active" : "") + '"></span>'; }).join("") + "</div>";
    }
    return html + "</div>";
  }

  // onExhausted(el) runs once every photo for that carousel has failed to
  // load; defaults to just removing the block. Individual failures before
  // that just advance to the next photo automatically.
  function wireCarousels(container, onExhausted) {
    container.querySelectorAll(".photo-carousel").forEach(function (el) {
      var photos;
      try { photos = JSON.parse(el.getAttribute("data-photos")); } catch (e) { photos = []; }
      var img = el.querySelector("img");

      function finish() { if (onExhausted) onExhausted(el); else el.remove(); }
      function show(i) {
        if (photos.length === 0) { finish(); return; }
        var idx = ((i % photos.length) + photos.length) % photos.length;
        img.src = photos[idx];
        el.setAttribute("data-idx", String(idx));
        el.querySelectorAll(".carousel-dot").forEach(function (d, di) { d.classList.toggle("active", di === idx); });
      }
      img.onerror = function () {
        var idx = parseInt(el.getAttribute("data-idx"), 10) || 0;
        photos.splice(idx, 1);
        if (photos.length === 0) { finish(); return; }
        var dotsWrap = el.querySelector(".carousel-dots");
        if (dotsWrap) dotsWrap.remove();
        show(idx);
      };
      var prevBtn = el.querySelector(".carousel-prev");
      var nextBtn = el.querySelector(".carousel-next");
      if (prevBtn) prevBtn.onclick = function (ev) { ev.preventDefault(); ev.stopPropagation(); show(parseInt(el.getAttribute("data-idx"), 10) - 1); };
      if (nextBtn) nextBtn.onclick = function (ev) { ev.preventDefault(); ev.stopPropagation(); show(parseInt(el.getAttribute("data-idx"), 10) + 1); };
      el.querySelectorAll(".carousel-dot").forEach(function (dot, di) {
        dot.onclick = function (ev) { ev.preventDefault(); ev.stopPropagation(); show(di); };
      });
    });
  }

  function dishCardHtml(d) {
    var carousel = carouselHtml(d.photos, "dish-media", "dish-photo", "", ' data-icon="' + esc(d.icon) + '" data-key="' + esc(d.id) + '"');
    var media = carousel || ('<div class="dish-media">' + iconBadge(d.icon, d.id, { small: true }) + "</div>");
    return '<div class="card">' +
      media +
      "<h3>" + esc(D.text(d.name, state.lang)) + "</h3>" +
      "<p>" + esc(D.text(d.desc, state.lang)) + "</p>" +
      '<div class="card-tags">' + d.tags.map(function (tg) { return '<span class="tag">' + esc(t("food." + DISH_TAG_LABEL_KEYS[tg])) + "</span>"; }).join("") + "</div>" +
    "</div>";
  }

  function wireDishCarousels(container) {
    wireCarousels(container, function (el) {
      el.outerHTML = '<div class="dish-media">' + iconBadge(el.getAttribute("data-icon"), el.getAttribute("data-key"), { small: true }) + "</div>";
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
      wireDishCarousels(resultsEl);
    }
    checks.forEach(function (c) { c.onchange = update; });
    update();
  }

  /* ---------------- LEGAL PAGES (Terms / Privacy) ---------------- */
  // Original drafts, not copied from any other site — deliberately English
  // only for now (translating legal text accurately needs professional
  // review, not a template swap). Bracketed [PLACEHOLDER] text marks things
  // only the site owner can fill in: legal entity name, governing
  // jurisdiction, and a real contact address. This is a starting point, not
  // a substitute for a lawyer's review before relying on it with real users.
  var LEGAL_LAST_UPDATED = "July 28, 2026";
  var LEGAL_CONTACT_EMAIL = "hello@healthblueprint.example";
  var LEGAL_ENTITY = "[YOUR LEGAL ENTITY NAME]";

  var LEGAL_CONTENT = {
    terms: {
      titleKey: "legal.termsTitle",
      sections: [
        { heading: "1. Agreement to Terms", body: [
          'By creating an account, submitting a request, or otherwise using the Health Blueprint website (the "Service"), you agree to these Terms of Service. If you do not agree, please do not use the Service.'
        ] },
        { heading: "2. What Health Blueprint Is (and Isn't)", body: [
          "Health Blueprint is a directory and facilitation platform. We help international patients find publicly-ranked hospitals in China, browse general information about medical specialties offered, and connect with independent local agents who can assist with logistics, translation, and travel coordination.",
          "Health Blueprint is not a hospital, clinic, medical provider, or insurance company. We do not employ doctors, nurses, or medical staff, and we do not practice medicine. We do not provide medical advice, diagnosis, or treatment recommendations of any kind."
        ] },
        { heading: "3. Eligibility and Accounts", body: [
          "You must be able to form a legally binding contract to create an account. If you are submitting a request on behalf of a family member (including a minor), you represent that you are their parent, legal guardian, or otherwise authorized to act on their behalf.",
          "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Please notify us promptly if you suspect unauthorized use of your account."
        ] },
        { heading: "4. Independent Agents and Hospitals", body: [
          "Agents listed on Health Blueprint are independent contractors or independent businesses, not our employees or legal agents. Hospitals listed on Health Blueprint are independent, separately-operated institutions; their inclusion in our directory (including tier rankings sourced from the publicly published 2023 China Hospital Ranking) does not constitute our endorsement, guarantee, or verification of any specific doctor, department, outcome, or service quality.",
          "You are responsible for independently verifying the credentials, licensing, and suitability of any agent or hospital before relying on their services."
        ] },
        { heading: "5. No Medical Advice", body: [
          "Nothing on this Service constitutes medical advice. Information about specialties, hospitals, and treatment categories is provided for general informational purposes only. Always consult a qualified physician regarding any medical condition, diagnosis, or treatment decision."
        ] },
        { heading: "6. Submitting a Request", body: [
          "Submitting a booking request through Health Blueprint is an expression of interest, not a confirmed booking, appointment, or contract with a hospital or agent. Actual scheduling, pricing, medical evaluation, and terms of service are determined directly between you and the agent/hospital you are connected with. Health Blueprint is not a party to that arrangement."
        ] },
        { heading: "7. Fees", body: [
          "Creating an account and submitting a request through Health Blueprint is currently free of charge. Any fees charged by an agent or hospital for their own services are separate from, and not controlled by, Health Blueprint, and will be disclosed to you directly by that agent or hospital. <mark>[If Health Blueprint later charges platform fees or earns referral commissions, that arrangement should be disclosed here.]</mark>"
        ] },
        { heading: "8. User Content and Conduct", body: [
          "You agree to provide accurate information when creating an account, submitting a request, or applying to become an agent. You agree not to: (a) impersonate any person or entity; (b) submit false, fraudulent, or misleading information; (c) use the Service to harass, abuse, or harm any agent, hospital, or other user; (d) attempt to scrape, reverse-engineer, or interfere with the Service; or (e) use the Service for any unlawful purpose.",
          "Any information you submit — including messages describing your medical or travel needs — may be shared with the agent or hospital relevant to your request, solely to help fulfill that request."
        ] },
        { heading: "9. Third-Party Services and Links", body: [
          "The Service links to official hospital websites and relies on third-party infrastructure providers — including Supabase for account and data storage, and Netlify for hosting and form processing — to operate. We are not responsible for the content, availability, or practices of third-party websites or services."
        ] },
        { heading: "10. Intellectual Property", body: [
          "The Health Blueprint name, logo, and original site content are owned by <mark>" + LEGAL_ENTITY + "</mark>. Photographs of hospitals, dishes, cities, and travel destinations are sourced from Wikimedia Commons, credited on each page, and remain the property of their original contributors under their respective licenses."
        ] },
        { heading: "11. Disclaimers", body: [
          'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT ANY HOSPITAL RANKING, AGENT INFORMATION, OR OTHER CONTENT ON THE SERVICE IS ACCURATE, COMPLETE, OR CURRENT.'
        ] },
        { heading: "12. Limitation of Liability", body: [
          "TO THE MAXIMUM EXTENT PERMITTED BY LAW, <mark>" + LEGAL_ENTITY + "</mark> SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM (A) YOUR USE OF OR INABILITY TO USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY AGENT, HOSPITAL, OR THIRD PARTY, INCLUDING ANY MEDICAL OUTCOME; OR (C) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT."
        ] },
        { heading: "13. Indemnification", body: [
          "You agree to indemnify and hold harmless <mark>" + LEGAL_ENTITY + "</mark> from any claims, damages, losses, or expenses (including reasonable legal fees) arising from your violation of these Terms or misuse of the Service."
        ] },
        { heading: "14. Termination", body: [
          "We may suspend or terminate your account at any time if we believe you have violated these Terms. You may stop using the Service and request account deletion at any time by contacting us."
        ] },
        { heading: "15. Governing Law and Disputes", body: [
          "<mark>[These Terms are governed by the laws of [JURISDICTION], without regard to conflict-of-law principles, and disputes will be resolved in [COURTS/ARBITRATION FORUM]. This section needs to be completed based on where your business is legally established — get a lawyer's input here.]</mark>"
        ] },
        { heading: "16. Changes to These Terms", body: [
          'We may update these Terms from time to time. If we make material changes, we will update the "Last updated" date at the top of this page. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.'
        ] },
        { heading: "17. Contact Us", body: [
          'Questions about these Terms? Contact us at <a href="mailto:' + LEGAL_CONTACT_EMAIL + '">' + LEGAL_CONTACT_EMAIL + "</a> <mark>[replace with your real contact email]</mark>."
        ] }
      ]
    },
    privacy: {
      titleKey: "legal.privacyTitle",
      sections: [
        { heading: "1. Introduction", body: [
          "This Privacy Policy explains what personal information Health Blueprint collects, how we use it, and the choices you have. By using the Service, you agree to the practices described here."
        ] },
        { heading: "2. Information We Collect", body: [
          "<strong>Account information:</strong> when you sign up, we collect your email address (or phone number, once that sign-in option is enabled) and a password, stored securely by our authentication provider, Supabase — we never see or store your password in plain text.",
          "<strong>Profile information:</strong> at sign-up, we ask for your gender, age, country of residence, family size, and food preference. Country of residence is required; the rest are optional.",
          "<strong>Booking request information:</strong> when you submit a request, we collect your name, email, phone number, your preferred language, and any details you choose to share about your medical or travel needs, plus which hospital/specialty/route the request relates to.",
          "<strong>Agent application information:</strong> if you apply to become an agent, we collect your name, birth year, phone number, optional email, and an optional resume, transmitted via our form-processing provider, Netlify.",
          "<strong>Usage preferences:</strong> we store your selected display language and text-size preference in your browser's local storage. This stays on your device and is not sent to our servers."
        ] },
        { heading: "3. How We Use Your Information", body: [
          "We use your information to create and manage your account, process and route your booking requests to the relevant agent, verify your identity when you log in, communicate with you about your requests, and improve the Service.",
          "We do not sell your personal information."
        ] },
        { heading: "4. How We Share Your Information", body: [
          "<strong>With agents and hospitals:</strong> information relevant to your request — such as your name, contact details, and any message you provide — is shared with the agent or hospital you're connecting with, solely to help fulfill your request.",
          "<strong>With service providers:</strong> we use Supabase (database and authentication) and Netlify (hosting and form processing) to operate the Service. These providers process data on our behalf.",
          "<strong>For legal reasons:</strong> we may disclose information if required by law, or to protect the rights, safety, or property of Health Blueprint, our users, or others."
        ] },
        { heading: "5. Health-Related Information You Choose to Share", body: [
          'The free-text fields on our request form (such as "tell us about your needs") may contain health-related information you voluntarily choose to share, to help us connect you with the right hospital and agent. We only share this with the specific agent/hospital relevant to your request. Please avoid including more detail than necessary to describe your care-coordination needs.'
        ] },
        { heading: "6. International Data Transfers", body: [
          "Health Blueprint connects international patients with hospitals and agents based in China. As a result, information you submit may be transferred to and processed by agents, hospitals, or service providers located in China or other countries, which may have different data protection laws than your home country. <mark>[If you operate under GDPR, China's PIPL, or similar cross-border transfer regimes, this section needs a lawyer's review to add the required safeguards.]</mark>"
        ] },
        { heading: "7. Data Retention", body: [
          'We retain your account and request information for as long as your account is active, or as needed to provide the Service, comply with legal obligations, and resolve disputes. You can request deletion of your account and associated data at any time (see "Your Rights" below).'
        ] },
        { heading: "8. Your Rights and Choices", body: [
          'Depending on where you live, you may have the right to access, correct, or delete your personal information, or to object to certain processing. To exercise these rights, contact us at <a href="mailto:' + LEGAL_CONTACT_EMAIL + '">' + LEGAL_CONTACT_EMAIL + '</a> <mark>[replace with your real contact email]</mark>.'
        ] },
        { heading: "9. Children's Privacy", body: [
          'The Service is not directed to children, and we do not knowingly collect account information from anyone under 16. The "family size" field is meant for describing family members traveling with you, not for creating accounts on their behalf. If you believe a child has provided us with personal information, please contact us so we can remove it.'
        ] },
        { heading: "10. Cookies and Local Storage", body: [
          "We use browser local storage — not third-party tracking cookies — to remember your language and text-size preferences. We do not currently use analytics or advertising trackers. <mark>[Update this section if you add analytics, e.g. Google Analytics or Plausible, in the future.]</mark>"
        ] },
        { heading: "11. Security", body: [
          "We rely on Supabase's security infrastructure, including encrypted password storage and row-level access controls, to protect your data. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security."
        ] },
        { heading: "12. Changes to This Policy", body: [
          'We may update this Privacy Policy from time to time. If we make material changes, we will update the "Last updated" date at the top of this page.'
        ] },
        { heading: "13. Contact Us", body: [
          'Questions about this Privacy Policy or your personal information? Contact us at <a href="mailto:' + LEGAL_CONTACT_EMAIL + '">' + LEGAL_CONTACT_EMAIL + '</a> <mark>[replace with your real contact email]</mark>.'
        ] }
      ]
    }
  };

  function renderLegalPage(key) {
    var content = LEGAL_CONTENT[key];
    var html = '<section class="section container legal-page">' +
      '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + esc(t("common.back")) + "</a>" +
      '<h1 style="margin-top:14px;">' + esc(t(content.titleKey)) + "</h1>" +
      '<p class="legal-updated">' + esc(t("legal.lastUpdated", { date: LEGAL_LAST_UPDATED })) + "</p>" +
      '<p class="legal-note">' + esc(t("legal.englishOnlyNote")) + "</p>";
    content.sections.forEach(function (s) {
      html += "<h2>" + esc(s.heading) + "</h2>";
      s.body.forEach(function (p) { html += "<p>" + p + "</p>"; });
    });
    html += "</section>";
    mainEl.innerHTML = html;
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
      wireCarousels(resultsEl);
    }

    areaSel.onchange = update;
    specSel.onchange = update;
    searchInput.oninput = update;
    update();
  }

  // Only real photos/logos are shown here — no decorative placeholder when
  // neither is available, per product decision to avoid generic illustrations.
  function hospitalCardHtml(h, specialty) {
    var media = carouselHtml(h.photos, "hospital-card-media", "hospital-card-photo", "") ||
      (h.logo ? '<div class="hospital-card-media"><img class="hospital-card-photo" src="' + esc(h.logo) + '" alt="" loading="lazy"></div>' : "");
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

  /* ---------------- HOSPITAL DETAIL ---------------- */
  function renderHospitalDetail(id, query) {
    var h = hospitalById(id);
    if (!h) { renderHome(); return; }
    var rq = routeQS(query);
    var sel = resolveRoutes(rq.routes, rq.waypoints);
    var wantedSpecialty = query && query.specialty;
    var orderedTags = h.tags.slice();
    if (wantedSpecialty && orderedTags.indexOf(wantedSpecialty) !== -1) {
      orderedTags = [wantedSpecialty].concat(orderedTags.filter(function (tg) { return tg !== wantedSpecialty; }));
    }

    // Hospital and travel routes are independent choices that can still be
    // combined: this link carries the hospital along to the trip planner so
    // picking (or changing) routes never loses the hospital already chosen.
    var routeLinkHref = tripHref(query, { hospital: h.id });

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="#/hospitals">' + Icons.html("arrow-left", { size: 18 }) + '' + esc(t("common.back")) + "</a>" +
        '<div class="plan-summary"><span><strong>' + esc(t("contact.summaryRoute")) + "</strong>" +
          (sel.length ? esc(routesDisplayNames(sel)) : '<span class="muted">' + esc(t("trip.noRoute")) + "</span>") +
          '</span><a class="link-btn" href="' + routeLinkHref + '">' + esc(sel.length ? t("trip.changeRoute") : t("trip.addRoute")) + "</a></div>" +
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

    // Real photos/logos are hotlinked from external sources we can't
    // guarantee stay up — wireCarousels tries every remaining photo before
    // giving up; if all of them fail, remove the whole wrap (carousel +
    // caption) rather than showing a generic placeholder illustration.
    wireCarousels(mainEl, function (el) { el.parentElement.remove(); });
    var logoImg = mainEl.querySelector(".hospital-photo-wrap .hospital-photo-block:not(.photo-carousel) img");
    if (logoImg) logoImg.onerror = function () { logoImg.closest(".hospital-photo-wrap").remove(); };
  }

  // Only a real photo (or, failing that, a real hospital logo) is shown —
  // if neither is available, nothing is rendered here (no decorative
  // placeholder illustration).
  function hospitalPhotoBlockHtml(h) {
    var carousel = carouselHtml(h.photos, "hospital-photo-block", "hospital-illustration", h.name);
    if (carousel) {
      var source = h.photos && h.photos[0] ? h.photos[0].source : "";
      return '<div class="hospital-photo-wrap">' + carousel +
        '<p class="illustration-note">' + esc(t("hospital.photoNote")) + (source ? " (" + esc(source) + ")" : "") + "</p>" +
      "</div>";
    }
    if (h.logo) {
      return '<div class="hospital-photo-wrap"><div class="hospital-photo-block"><img class="hospital-illustration" src="' + esc(h.logo) + '" alt="' + esc(h.name) + '" loading="lazy"></div></div>';
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
    var sel = resolveRoutes(rq.routes, rq.waypoints);
    var topic = query && query.topic;

    var langOptions = SUPPORTED_LANGS.map(function (code) {
      return '<option value="' + code + '"' + (code === state.lang ? " selected" : "") + ">" + I18N.meta[code].label + "</option>";
    }).join("");

    var backHref = programId ? "#/program/" + programId + qs(rq)
      : topic === "food" ? "#/food" : topic === "safety" ? "#/safety" : (sel.length ? "#/trip" + qs(rq) : "#/");

    mainEl.innerHTML =
      '<section class="section container">' +
        '<a class="btn-back" href="' + backHref + '">' + Icons.html("arrow-left", { size: 18 }) + '' + esc(t("common.back")) + "</a>" +
        '<div class="form-card" style="margin-top:14px;">' +
          "<h1>" + esc(t("contact.title")) + "</h1>" +
          "<p>" + esc(a ? t("contact.subtitle") : t("contact.subtitleGeneral")) + "</p>" +
          '<div class="form-summary">' +
            (h ? "<span><strong>" + esc(t("contact.summaryHospital")) + "</strong>" + esc(h.name) + "</span>" : "") +
            (parsed ? "<span><strong>" + esc(t("contact.summaryProgram")) + "</strong>" + esc(specialtyLabel(parsed.tag)) + "</span>" : "") +
            (sel.length ? "<span><strong>" + esc(t("contact.summaryRoute")) + "</strong>" + esc(routesDisplayNames(sel)) + "</span>" : "") +
            (topic === "food" ? "<span><strong>" + esc(t("contact.summaryProgram")) + "</strong>" + esc(t("pillars.foodTitle")) + "</span>" : "") +
            (topic === "safety" ? "<span><strong>" + esc(t("contact.summaryProgram")) + "</strong>" + esc(t("pillars.safetyTitle")) + "</span>" : "") +
            (a ? "<span><strong>" + esc(t("contact.summaryAgent")) + "</strong>" + esc(a.name) + "</span>" : "") +
          "</div>" +
          sel.filter(function (r) { return r.custom; }).map(function (r) {
            return '<ul class="included-list">' + r.stops.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>";
          }).join("") +
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
        route_data: sel.length ? sel : null,
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
    if (sel.length) parts.push("Routes: " + sel.map(function (r) { return r.custom ? "Custom (" + r.stops.join(", ") + ")" : D.text(r.name, "en"); }).join(" | "));
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

      submitBtn.disabled = true;

      var uploadResume = hasResume && window.sb
        ? window.sb.storage.from("resumes").upload(Date.now() + "-" + resumeFile.name, resumeFile)
        : Promise.resolve(null);

      uploadResume.then(function (uploadRes) {
        var resumePath = uploadRes && uploadRes.data ? uploadRes.data.path : null;
        var dbPayload = {
          user_id: authState.user ? authState.user.id : null,
          full_name: fd.get("name"),
          email: fd.get("email") || "",
          phone: fd.get("phone"),
          message: "Birth year: " + (fd.get("birthYear") || "—"),
          resume_path: resumePath
        };
        return window.sb ? window.sb.from("agent_applications").insert(dbPayload) : Promise.resolve();
      })
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
    var selRoutes = resolveRoutes(rq.routes, rq.waypoints);
    var selectedRouteIds = (rq.routes || "").split(",").filter(Boolean);
    // In-memory draft list for the custom-route builder. Seeded from the
    // URL if a custom route is already active, so editing an existing
    // custom route (rather than starting over) works too.
    var customRouteEntry = selRoutes.filter(function (r) { return r.custom; })[0];
    var customStops = customRouteEntry ? customRouteEntry.stops.slice() : [];

    var html = '<section class="section container">';
    html += '<a class="btn-back" href="#/">' + Icons.html("arrow-left", { size: 18 }) + esc(t("common.back")) + "</a>";
    html += '<h1 style="margin-top:14px;">' + esc(t("trip.title")) + "</h1><p>" + esc(t("trip.subtitle")) + "</p>";

    html += '<div class="plan-summary">';
    html += "<span><strong>" + esc(t("contact.summaryHospital")) + "</strong>" +
      (selHospital ? esc(selHospital.name) : '<span class="muted">' + esc(t("trip.noHospital")) + "</span>") + "</span>";
    if (selHospital) html += '<a class="link-btn" href="' + tripHref(query, { hospital: null }) + '">' + Icons.html("close", { size: 14 }) + esc(t("trip.changeHospital")) + "</a>";
    html += "<span><strong>" + esc(t("contact.summaryRoute")) + "</strong>" +
      (selRoutes.length ? esc(routesDisplayNames(selRoutes)) : '<span class="muted">' + esc(t("trip.noRoute")) + "</span>") + "</span>";
    if (selRoutes.length) html += '<a class="link-btn" href="' + tripHref(query, { routes: null, waypoints: null }) + '">' + Icons.html("close", { size: 14 }) + esc(t("trip.changeRoute")) + "</a>";
    if (selHospital || selRoutes.length) {
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
      var cityPhotos = (D.cityPhotos && D.cityPhotos[area]) || [];
      html += carouselHtml(cityPhotos, "city-photo-block", "city-photo", areaLabel(area));
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
    html += '<h2 id="recommendedRoutesHeading" style="margin-top:30px;">' + esc(t("trip.recommendedRoutes")) + (area ? "" : " — " + esc(t("trip.anyRegion"))) + "</h2>";
    html += '<div class="card-grid">';
    routesToShow.forEach(function (r) {
      var active = selectedRouteIds.indexOf(r.id) !== -1;
      var toggledIds = active ? selectedRouteIds.filter(function (id) { return id !== r.id; }) : selectedRouteIds.concat([r.id]);
      var media = carouselHtml(r.photos, "route-card-media", "route-card-photo", "");
      html += '<div class="card route-card' + (active ? " active" : "") + '">' +
        media +
        "<h3>" + esc(D.text(r.name, state.lang)) + "</h3>" +
        '<div class="route-days">' + esc(t("trip.days", { n: r.days })) + "</div>" +
        '<strong style="font-size:0.85em;">' + esc(t("trip.highlights")) + ":</strong>" +
        '<ul class="included-list">' + D.textList(r.highlights, state.lang).map(function (hl) { return "<li>" + esc(hl) + "</li>"; }).join("") + "</ul>" +
        '<a class="btn ' + (active ? "btn-secondary" : "btn-primary") + ' btn-block" href="' + tripHref(query, { routes: toggledIds.join(",") }) + '">' +
          (active ? Icons.html("check", { size: 16 }) + esc(t("trip.removeRoute")) : esc(t("trip.selectThisRoute"))) +
        "</a>" +
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
    wireCarousels(mainEl);

    if (area) {
      var routesHeading = document.getElementById("recommendedRoutesHeading");
      if (routesHeading) routesHeading.scrollIntoView({ behavior: "smooth", block: "start" });
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
      useBtn.href = customStops.length ? tripHref(query, { waypoints: JSON.stringify(customStops) }) : "#";
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

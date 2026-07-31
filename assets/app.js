/* =====================================================================
   TECHNIK / DARSTELLUNG  –  ÖTB Turnverein Drösing
   =====================================================================
   Diese Datei baut aus den Inhalten in content.js die fertige Seite.
   Für normale Textänderungen musst du hier NICHTS anfassen.
   ===================================================================== */
(function () {
  "use strict";
  var D = {};   // wird beim Start aus content.json geladen

  /* ---------- kleine Helfer ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  // Bildpfad robust auflösen (funktioniert mit CMS-Uploads und Kurzpfaden)
  function imgPath(x) {
    if (!x) return "";
    if (/^https?:\/\//.test(x)) return x;
    if (x.charAt(0) === "/") return x.slice(1);      // "/assets/..." -> "assets/..."
    if (x.indexOf("assets/") === 0) return x;        // bereits vollständig
    return "assets/images/" + x;                     // z. B. "anlagen/x.jpg", "sponsorlogos/x.jpg"
  }
  function get(path) {
    return path.split(".").reduce(function (o, k) {
      return (o == null) ? undefined : o[k];
    }, D);
  }
  function initials(name) {
    var parts = String(name).split(/\s+/).filter(function (w) {
      return /^[A-Za-zÀ-ÿ]/.test(w) && w.replace(/[^A-Za-zÀ-ÿ]/g, "").length > 1;
    });
    if (!parts.length) parts = String(name).split(/\s+/);
    var a = parts[0] || "", b = parts.length > 1 ? parts[parts.length - 1] : "";
    return ((a[0] || "") + (b[0] || "")).toUpperCase();
  }

  /* ---------- Icons (Inline-SVG, keine externe Bibliothek) ---------- */
  var S = 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    menu:     '<svg viewBox="0 0 24 24" ' + S + '><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close:    '<svg viewBox="0 0 24 24" ' + S + '><path d="M6 6l12 12M18 6L6 18"/></svg>',
    mail:     '<svg viewBox="0 0 24 24" ' + S + '><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    phone:    '<svg viewBox="0 0 24 24" ' + S + '><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.24 1Z"/></svg>',
    pin:      '<svg viewBox="0 0 24 24" ' + S + '><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock:    '<svg viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" ' + S + '><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
    building: '<svg viewBox="0 0 24 24" ' + S + '><path d="M3 21h18M5 21V5l7-2v18M19 21V9l-7-3M9 9h0M9 13h0M9 17h0"/></svg>',
    trophy:   '<svg viewBox="0 0 24 24" ' + S + '><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3"/></svg>',
    users:    '<svg viewBox="0 0 24 24" ' + S + '><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 20a5.5 5.5 0 0 0-3-4.9"/></svg>',
    ball:     '<svg viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="12" r="9"/><path d="M12 3c3 3 3 15 0 18M3 12c3-3 15-3 18 0M5 6c4 2 10 2 14 0M5 18c4-2 10-2 14 0"/></svg>',
    heart:    '<svg viewBox="0 0 24 24" ' + S + '><path d="M12 20s-7-4.6-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7-2.5C19 10.4 12 20 12 20Z"/></svg>',
    baby:     '<svg viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="6" r="2.4"/><path d="M8 11c1.3 1.3 6.7 1.3 8 0M6 14l3 2 3-1 3 1 3-2M9 20l3-2 3 2"/></svg>',
    child:    '<svg viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="5" r="2.2"/><path d="M12 8v7M7 11h10M9 21l3-4 3 4"/></svg>',
    music:    '<svg viewBox="0 0 24 24" ' + S + '><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>',
    dumbbell: '<svg viewBox="0 0 24 24" ' + S + '><path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/></svg>',
    step:     '<svg viewBox="0 0 24 24" ' + S + '><path d="M3 18h6v-4h6v-4h6"/><path d="M3 18v-2M21 8v-2"/></svg>',
    arrow:    '<svg viewBox="0 0 24 24" ' + S + '><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.5-3.1h-3.2V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.8-.1-1.7-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.2H7.3V14h2.8v8h3.4z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="3.9"/><circle cx="17.4" cy="6.6" r="1.05" fill="currentColor" stroke="none"/></svg>'
  };
  var ANGEBOT_ICON = {
    krabbel: "baby", elternkind: "users", kinder: "child", geraete: "dumbbell",
    damen: "heart", step: "step", dance: "music", faustball: "ball"
  };

  /* ---------- Bausteine ---------- */
  function chip(icon, text, cls) {
    return '<span class="chip ' + (cls || "") + '">' + (icon ? ICONS[icon] : "") + esc(text) + "</span>";
  }
  function personChip(name) {
    return '<li><span class="avatar">' + esc(initials(name)) + "</span>" + esc(name) + "</li>";
  }
  // Rundes Personen-Bild: Foto (falls vorhanden) sonst Initialen-Platzhalter
  function avatar(name, bild, cls) {
    cls = cls || "avatar-lg";
    return bild
      ? '<div class="' + cls + ' has-photo"><img src="' + esc(imgPath(bild)) + '" alt="' + esc(name) + '" loading="lazy"></div>'
      : '<div class="' + cls + '">' + esc(initials(name)) + "</div>";
  }
  function socialLinks(cls) {
    var s = (D.verein || {}).social || {}, out = "";
    if (s.facebook)  out += '<a href="' + esc(s.facebook)  + '" target="_blank" rel="noopener" aria-label="Facebook">'  + ICONS.facebook  + "</a>";
    if (s.instagram) out += '<a href="' + esc(s.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.instagram + "</a>";
    return out ? '<div class="social ' + (cls || "") + '">' + out + "</div>" : "";
  }
  // Klickbare Kontakt-Links (Telefon/E-Mail) für Leitungs-/Betreuer-Personen
  function kontaktLinks(p) {
    var out = "";
    if (p.tel)   out += '<a class="kontakt-link" href="tel:' + esc((p.tel + "").replace(/[^+0-9]/g, "")) + '">' + ICONS.phone + "<span>" + esc(p.tel) + "</span></a>";
    if (p.email) out += '<a class="kontakt-link" href="mailto:' + esc(p.email) + '">' + ICONS.mail + "<span>" + esc(p.email) + "</span></a>";
    return out;
  }
  function leiterZeile(p) {
    var rolle = p.rolle ? ' <span class="leiter-rolle">· ' + esc(p.rolle) + "</span>" : "";
    var k = kontaktLinks(p);
    return '<div class="leiter"><span class="leiter-name">' + esc(p.name) + rolle + "</span>" +
      (k ? '<span class="leiter-kontakt">' + k + "</span>" : "") + "</div>";
  }
  // Leitungsblock eines Angebots (unterstützt "leitungen"-Liste und altes "leitung"-Textfeld)
  function angebotLeitung(a) {
    var leiter = (a.leitungen && a.leitungen.length) ? a.leitungen : (a.leitung ? [{ name: a.leitung }] : []);
    if (!leiter.length) return "";
    return '<div class="leitung"><span class="leitung-label">Leitung</span>' + leiter.map(leiterZeile).join("") + "</div>";
  }

  /* ---------- Navigation-Konfiguration ---------- */
  var NAV = [
    { id: "ueber-uns",      label: "Über uns",      page: "ueber-uns.html" },
    { id: "angebot",        label: "Angebot",       page: "angebot.html" },
    { id: "mitgliedschaft", label: "Mitgliedschaft",page: "mitgliedschaft.html" },
    { id: "faustball",      label: "Faustball",     page: "faustball.html" },
    { id: "kontakt",        label: "Kontakt",       page: "kontakt.html" }
  ];
  function variant() { return document.body.getAttribute("data-variant") || "onepager"; }
  function currentPage() { return document.body.getAttribute("data-page") || "start"; }
  function hrefFor(id) {
    var v = variant();
    var standalone = (id === "impressum" || id === "datenschutz");
    if (v === "subpage") {            // eigenständige Seite -> zurück zur Startseite
      if (standalone) return id + ".html";
      if (id === "start") return "index.html";
      return "index.html#" + id;
    }
    if (v === "seiten") {
      if (standalone) return id + ".html";
      return id === "start" ? "index.html" : id + ".html";
    }
    // onepager (Startseite)
    if (standalone) return id + ".html";
    return "#" + id;
  }

  /* ---------- Header ---------- */
  function buildHeader() {
    var heroEl = document.querySelector(".hero, .page-header");
    var hasHero = !!heroEl;
    var onHero = heroEl ? " on-hero" : "";
    var startSolid = heroEl ? "" : " solid";
    var links = NAV.map(function (i) {
      var active = (variant() === "seiten" && i.id === currentPage()) ? " active" : "";
      return '<li><a href="' + hrefFor(i.id) + '" data-nav="' + i.id + '" class="' + active.trim() + '">' + esc(i.label) + "</a></li>";
    }).join("");
    return '' +
      '<nav class="nav' + onHero + startSolid + '" id="siteNav" data-hashero="' + (hasHero ? 1 : 0) + '">' +
        '<div class="container">' +
          '<a class="brand" href="' + hrefFor("start") + '" aria-label="Zur Startseite"><img class="brand-logo" src="assets/images/logo.png" alt="ÖTB Turnverein Drösing"></a>' +
          '<button class="nav-toggle" id="navToggle" aria-label="Menü öffnen" aria-expanded="false">' + ICONS.menu + "</button>" +
          '<ul class="nav-links" id="navLinks">' + links + "</ul>" +
          '<a class="btn btn-primary nav-cta-desktop" href="' + hrefFor("mitgliedschaft") + '">Mitglied werden</a>' +
        "</div>" +
      "</nav>";
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    var v = D.verein || {};
    var bereiche = NAV.filter(function (i) { return i.id !== "start"; }).map(function (i) {
      return '<li><a href="' + hrefFor(i.id) + '">' + esc(i.label) + "</a></li>";
    }).join("");
    return '' +
      '<footer class="footer"><div class="container">' +
        '<div class="footer-top">' +
          '<div><div class="brand"><img class="brand-logo" src="assets/images/logo.png" alt="ÖTB-TV Drösing"></div>' +
            '<p style="margin-top:16px;max-width:36ch;color:#9aa3b0">' + esc(v.intro || "") + "</p>" +
            socialLinks("social-footer") + "</div>" +
          '<div><h4>Bereiche</h4><ul>' + bereiche + "</ul></div>" +
          '<div><h4>Kontakt</h4><ul>' +
            "<li>" + esc(v.ort || "") + "</li>" +
            '<li><a href="mailto:' + esc(v.email) + '">' + esc(v.email) + "</a></li>" +
            '<li><a href="' + hrefFor("kontakt") + '">Kontaktformular</a></li>' +
            '<li><a href="' + hrefFor("impressum") + '">Impressum</a></li>' +
            '<li><a href="' + hrefFor("datenschutz") + '">Datenschutz</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " " + esc(v.name || "") + "</span>" +
          "<span>Prototyp · " + esc(v.ort || "") + "</span></div>" +
      "</div></footer>";
  }

  /* ---------- Abschnitt-Renderer ---------- */
  var RENDER = {
    header: buildHeader,
    footer: buildFooter,

    ueberUnsText: function () {
      return '<p class="lead">' + esc((D.ueberUns || {}).text) + "</p>";
    },

    // Kleine Pillen im Titelbild – automatisch aus allen Angeboten (immer vollständig, im Panel editierbar)
    heroBadges: function () {
      return (D.angebote || []).map(function (a) { return "<span>" + esc(a.titel) + "</span>"; }).join("");
    },

    // Optionen für das Anmeldeformular – automatisch aus den Angeboten
    angebotOptions: function () {
      var opts = '<option value="">Bitte wählen …</option>';
      (D.angebote || []).forEach(function (a) { opts += "<option>" + esc(a.titel) + "</option>"; });
      return opts + "<option>Noch unentschlossen</option>";
    },

    leitung: function () {
      return '<div class="grid grid-3">' + ((D.ueberUns || {}).leitung || []).map(function (p) {
        return '<article class="card leader reveal">' + avatar(p.name, p.bild, "avatar-lg") +
          "<h3>" + esc(p.name) + '</h3><div class="rolle">' + esc(p.rolle) + "</div></article>";
      }).join("") + "</div>";
    },

    trainerVorturner: function () {
      var u = D.ueberUns || {};
      function listCard(title, icon, arr) {
        return '<article class="card reveal"><div class="icon-badge">' + ICONS[icon] + "</div><h3>" +
          esc(title) + '</h3><ul class="people">' + (arr || []).map(personChip).join("") + "</ul></article>";
      }
      return '<div class="grid grid-2">' +
        listCard("Faustball-Trainer", "trophy", u.trainer) +
        listCard("Vorturner-Team", "users", u.vorturner) + "</div>";
    },

    anlagen: function () {
      return '<div class="grid grid-3">' + ((D.ueberUns || {}).anlagen || []).map(function (a) {
        var media = a.bild
          ? '<div class="card-photo"><img src="' + esc(imgPath(a.bild)) + '" alt="' + esc(a.name) + '" loading="lazy"></div>'
          : '<div class="card-photo card-photo--ph">' + ICONS.building + "</div>";
        return '<article class="card card--media reveal">' + media +
          '<div class="card-body"><h3>' + esc(a.name) + '</h3><p class="muted">' + esc(a.text) + "</p></div></article>";
      }).join("") + "</div>";
    },

    angebote: function () {
      return '<div class="grid grid-3">' + (D.angebote || []).map(function (a) {
        var termin = a.tag ? (a.tag + (a.zeit ? "" : "")) : "Termin auf Anfrage";
        return '<article class="card offer reveal"><div class="icon-badge">' +
          (ICONS[ANGEBOT_ICON[a.icon]] || ICONS.ball) + "</div>" +
          "<h3>" + esc(a.titel) + '</h3><p class="muted">' + esc(a.text) + "</p>" +
          '<div class="meta">' + chip("", a.zielgruppe, "accent") + "</div>" +
          '<div class="meta">' + chip("calendar", a.tag || "auf Anfrage", "") +
          (a.zeit ? chip("clock", a.zeit, "time") : "") + "</div>" +
          angebotLeitung(a) + "</article>";
      }).join("") + "</div>";
    },

    hallenplan: function () {
      var h = D.hallenplan || {};
      return '<div class="plan-grid">' + (h.tage || []).map(function (t) {
        var rows = (t.eintraege || []).map(function (e) {
          var zeit = (e.von && e.bis) ? (e.von + "–" + e.bis) : "";
          return '<div class="plan-row">' +
            (zeit ? '<span class="plan-time">' + ICONS.clock + esc(zeit) + "</span>"
                  : '<span class="plan-time plan-time--flex">' + ICONS.clock + "flexibel</span>") +
            '<span class="plan-group">' + esc(e.gruppe || "") + "</span></div>";
        }).join("");
        return '<article class="card plan-day reveal"><h4>' + ICONS.calendar + esc(t.tag) + "</h4>" + rows + "</article>";
      }).join("") + "</div>";
    },

    mitgliedschaft: function () {
      var m = D.mitgliedschaft || {};
      var rows = (m.beitraege || []).map(function (b) {
        var hl = /Familie/i.test(b.typ) ? " class=\"price-highlight\"" : "";
        return "<tr" + hl + "><td>" + esc(b.typ) + '</td><td class="price">' + esc(b.preis) + "</td></tr>";
      }).join("");
      var fit = (m.fitnessraum || []).map(function (b) {
        return "<tr><td>" + esc(b.typ) + '</td><td class="price">' + esc(b.preis) + "</td></tr>";
      }).join("");
      var hinweise = (m.hinweise || []).map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("");
      var bank = m.bank || {};
      return '' +
        '<div class="grid grid-2">' +
          '<article class="card table-card reveal"><table class="data"><thead><tr><th>Mitgliedschaft</th><th>Beitrag</th></tr></thead><tbody>' +
            rows + "</tbody></table></article>" +
          '<div>' +
            '<article class="card reveal" style="margin-bottom:22px"><h3>Fitnessraum / Kraftkammer</h3>' +
              '<table class="data" style="margin-top:8px"><tbody>' + fit + "</tbody></table></article>" +
            '<article class="card reveal"><div class="icon-badge">' + ICONS.building + "</div>" +
              "<h3>Bankverbindung</h3>" +
              '<p class="muted" style="margin:.2rem 0 .6rem">' + esc(bank.institut) + "</p>" +
              '<div class="tag" style="font-size:1rem;font-weight:700;letter-spacing:.02em">' + esc(bank.iban) + "</div>" +
              '<p class="muted" style="margin-top:.7rem">Verwendungszweck: ' + esc(bank.verwendung) + "</p></article>" +
          "</div>" +
        "</div>" +
        '<div class="grid grid-2" style="margin-top:22px">' +
          '<article class="card reveal"><h3>Gut zu wissen</h3><ul class="muted" style="margin:.4rem 0 0;padding-left:1.1rem">' +
            hinweise + "</ul></article>" +
          '<div class="callout reveal" style="display:flex;flex-direction:column;justify-content:center">' +
            "<h2>Werde Teil des Vereins</h2><p>Melde dich unkompliziert über unser Anmeldeformular an.</p>" +
            '<a class="btn btn-light" style="align-self:center" href="' + esc(m.anmeldungUrl) + '">Zur Anmeldung ' + ICONS.arrow + "</a></div>" +
        "</div>";
    },

    faustballIntro: function () {
      var f = D.faustball || {};
      var stats = [
        { n: "1. Bundesliga", l: "unsere Herren 1" },
        { n: "U10 – Herren", l: "Teams für jede Altersklasse" },
        { n: "ab 10 Jahren", l: "Nachwuchsförderung" }
      ];
      return '' +
        '<div class="grid grid-2 faustball-lead" style="align-items:center;margin-bottom:2.2rem">' +
          '<figure class="faustball-photo reveal"><img src="assets/images/team-hero.jpg" ' +
            'alt="1. Bundesliga-Mannschaft des ÖTB Drösing" loading="lazy">' +
            "<figcaption>Unsere 1. Bundesliga-Mannschaft</figcaption></figure>" +
          '<div class="reveal"><p class="lead" style="margin:0">' + esc(f.intro) + "</p></div>" +
        "</div>" +
        '<div class="grid grid-3">' + stats.map(function (s) {
          return '<article class="card center reveal"><div class="icon-badge" style="margin:0 auto 12px">' + ICONS.trophy +
            '</div><h3 style="color:var(--accent)">' + esc(s.n) + '</h3><p class="muted" style="margin:0">' + esc(s.l) + "</p></article>";
        }).join("") + "</div>";
    },

    betreuer: function () {
      return '<div class="grid grid-4">' + ((D.faustball || {}).betreuer || []).map(function (p) {
        var k = kontaktLinks(p);
        return '<article class="card leader reveal">' + avatar(p.name, p.bild, "avatar-lg") +
          "<h3 style=\"font-size:1.05rem\">" + esc(p.name) + '</h3><div class="rolle">' + esc(p.rolle) + "</div>" +
          (k ? '<div class="leiter-kontakt" style="justify-content:center;margin-top:.7rem">' + k + "</div>" : "") +
          "</article>";
      }).join("") + "</div>";
    },

    sponsoren: function () {
      return '<div class="sponsors">' + ((D.faustball || {}).sponsoren || []).map(function (s) {
        var inner = s.logo
          ? '<img src="' + esc(imgPath(s.logo)) + '" alt="' + esc(s.name) + '" loading="lazy">'
          : '<span class="sponsor-name">' + esc(s.name) + "</span>";
        var tile = '<div class="sponsor reveal" title="' + esc(s.name) + '">' + inner + "</div>";
        return (s.url && s.url !== "#")
          ? '<a class="sponsor-link" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + tile + "</a>"
          : tile;
      }).join("") + "</div>";
    },

    kontakt: function () {
      var k = D.kontakt || {}, v = D.verein || {};
      return '<div class="contact-grid">' +
        '<div class="contact-info reveal"><p class="lead">' + esc(k.text) + "</p>" +
          '<div class="item"><div class="icon-badge">' + ICONS.mail + "</div><div><b>E-Mail</b><br>" +
            '<a href="mailto:' + esc(k.email) + '">' + esc(k.email) + "</a></div></div>" +
          '<div class="item"><div class="icon-badge">' + ICONS.pin + "</div><div><b>Adresse</b><br>" + esc(k.ort) + "</div></div>" +
          socialLinks("social-contact") +
        "</div>" +
        '<form class="card reveal js-form" data-to="' + esc(k.email) + '" data-subject="Anfrage über die Website">' +
          '<div class="form-field"><label for="kf-name">Name</label><input id="kf-name" name="name" required></div>' +
          '<div class="form-field"><label for="kf-mail">E-Mail</label><input id="kf-mail" name="mail" type="email" required></div>' +
          '<div class="form-field"><label for="kf-msg">Nachricht</label><textarea id="kf-msg" name="msg" rows="5" required></textarea></div>' +
          '<button class="btn btn-primary" type="submit">Nachricht senden ' + ICONS.arrow + "</button>" +
          '<p class="form-note">' + esc(k.hinweis) + "</p>" +
        "</form></div>";
    },

    impressum: function () {
      var i = D.impressum || {};
      function row(label, val) {
        return val ? '<div class="row"><b>' + esc(label) + "</b><span>" + val + "</span></div>" : "";
      }
      return '<div class="legal">' +
        row("Verein", esc(i.name)) +
        row("Sitz / Anschrift", esc(i.adresse)) +
        row("ZVR-Zahl", esc(i.zvr)) +
        row("E-Mail", '<a href="mailto:' + esc(i.email) + '">' + esc(i.email) + "</a>") +
        row("Telefon", esc(i.telefon)) +
        row("Website", esc(i.website)) +
        row("Vertretungsbefugt", esc(i.vertretung)) +
        row("Vereinszweck", esc(i.vereinszweck)) +
        row("Vereinsbehörde", esc(i.behoerde)) +
        row("Inhaltlich verantwortlich", esc(i.verantwortlich)) +
        '<p class="muted" style="margin-top:1.4rem">' + esc(i.rechtstext) + "</p>" +
        '<p style="margin-top:1rem"><a class="btn btn-ghost" href="' + hrefFor("datenschutz") +
        '">Zur Datenschutzerklärung ' + ICONS.arrow + "</a></p></div>";
    },

    datenschutz: function () {
      var d = D.datenschutz || {}, v = D.verein || {};
      function h(t) { return "<h3 style=\"margin:1.6rem 0 .5rem\">" + t + "</h3>"; }
      function p(t) { return '<p class="muted">' + t + "</p>"; }
      return '<div class="legal">' +
        p("<b>Stand:</b> " + esc(d.stand)) +
        h("1. Verantwortlicher") +
        p(esc(d.verantwortlich)) +
        h("2. Welche Daten wir verarbeiten und wozu") +
        p("<b>Kontaktformular:</b> Name, E-Mail-Adresse und Deine Nachricht – ausschließlich " +
          "zur Bearbeitung und Beantwortung Deiner Anfrage.") +
        p("<b>Anmeldeformular:</b> Vor- und Nachname, Geburtsdatum, Anschrift, E-Mail, Telefon, " +
          "gewünschtes Angebot und Art der Mitgliedschaft – zur Aufnahme und Verwaltung der " +
          "Vereinsmitgliedschaft.") +
        p("<b>Server-Protokolle:</b> Beim Aufruf der Website werden vom Hosting-Anbieter " +
          "technisch notwendige Daten (z. B. IP-Adresse, Datum/Uhrzeit) kurzzeitig verarbeitet, " +
          "um den sicheren Betrieb zu gewährleisten.") +
        h("3. Rechtsgrundlagen") +
        p("Vertrag bzw. Mitgliedschaft (Art. 6 Abs. 1 lit. b DSGVO), Deine Einwilligung bei " +
          "Anfragen (lit. a) sowie unser berechtigtes Interesse an einem sicheren Webauftritt " +
          "(lit. f).") +
        h("4. Weitergabe von Daten") +
        p(esc(d.weitergabe)) +
        h("5. Speicherdauer") +
        p("Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck " +
          "oder aufgrund gesetzlicher Aufbewahrungspflichten erforderlich ist. Anfragen über " +
          "das Kontaktformular werden nach abschließender Bearbeitung gelöscht.") +
        h("6. Cookies & Tracking") +
        p("Diese Website verwendet <b>keine</b> Cookies zu Analyse- oder Werbezwecken und " +
          "setzt <b>keine</b> Tracking-Dienste ein.") +
        h("7. Deine Rechte") +
        p("Dir stehen die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der " +
          "Verarbeitung, Datenübertragbarkeit und Widerspruch zu. Eine erteilte Einwilligung " +
          "kannst Du jederzeit widerrufen. Wende Dich dafür an " +
          '<a href="mailto:' + esc(v.email) + '">' + esc(v.email) + "</a>.") +
        h("8. Beschwerderecht") +
        p("Du hast das Recht, Dich bei der Datenschutzbehörde zu beschweren: " +
          "Österreichische Datenschutzbehörde, Barichgasse 40–42, 1030 Wien, " +
          '<a href="https://www.dsb.gv.at" target="_blank" rel="noopener">www.dsb.gv.at</a>.') +
        "</div>";
    }
  };

  /* ---------- Text-/Link-Bindungen (data-text / data-href) ---------- */
  function bindAttributes() {
    document.querySelectorAll("[data-text]").forEach(function (n) {
      var val = get(n.getAttribute("data-text"));
      if (val != null) n.textContent = val;
    });
    document.querySelectorAll("[data-href]").forEach(function (n) {
      var val = get(n.getAttribute("data-href"));
      if (val != null) n.setAttribute("href", n.getAttribute("data-mailto") != null ? "mailto:" + val : val);
    });
    document.querySelectorAll("[data-link]").forEach(function (n) {
      n.setAttribute("href", hrefFor(n.getAttribute("data-link")));
    });
  }

  /* ---------- Alle [data-render] befüllen ---------- */
  function renderAll() {
    document.querySelectorAll("[data-render]").forEach(function (node) {
      var name = node.getAttribute("data-render");
      if (RENDER[name]) node.innerHTML = RENDER[name]();
      else console.warn("Kein Renderer für:", name);
    });
  }

  /* ---------- Navigation: Menü, Sticky, Scroll-Spy ---------- */
  function setupNav() {
    var nav = document.getElementById("siteNav");
    if (!nav) return;
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    var hasHero = nav.getAttribute("data-hashero") === "1";
    var heroEl = document.querySelector(".hero, .page-header");

    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.innerHTML = open ? ICONS.close : ICONS.menu;
      });
      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.innerHTML = ICONS.menu;
        }
      });
    }

    function onScroll() {
      if (heroEl) {
        nav.classList.toggle("solid", window.scrollY > heroEl.offsetHeight - 72);
      }
    }
    if (hasHero) { onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); }

    // Scroll-Spy nur auf der Onepager-Variante
    if (variant() === "onepager") {
      var sections = NAV.map(function (i) { return document.getElementById(i.id); }).filter(Boolean);
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            document.querySelectorAll(".nav-links a").forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("data-nav") === en.target.id);
            });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---------- Einblenden beim Scrollen ---------- */
  function setupReveal() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); }); return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (e) {
      // sanfter Staffel-Effekt: Karten in derselben Reihe leicht versetzt einblenden
      var sibs = Array.prototype.filter.call(e.parentNode.children, function (c) {
        return c.classList && c.classList.contains("reveal");
      });
      var idx = sibs.indexOf(e);
      if (idx > 0) e.style.transitionDelay = Math.min(idx, 6) * 70 + "ms";
      io.observe(e);
    });
  }

  /* ---------- Formulare: automatischer Versand (Web3Forms) + Fallback ---------- */
  function collectFields(form) {
    var data = {}, lines = [];
    form.querySelectorAll("input, select, textarea").forEach(function (fld) {
      if (!fld.name || fld.name === "botcheck") return;
      if ((fld.type === "checkbox" || fld.type === "radio") && !fld.checked) return;
      var lab = form.querySelector('label[for="' + fld.id + '"]');
      var label = lab ? lab.textContent.replace(/\*/g, "").trim() : fld.name;
      var val = (fld.type === "checkbox") ? "Ja" : fld.value;
      data[label] = val; lines.push(label + ": " + val);
    });
    return { data: data, lines: lines };
  }
  function formMessage(form, ok, text) {
    form.innerHTML = '<div style="text-align:center;padding:26px 8px">' +
      '<div class="icon-badge" style="margin:0 auto 14px">' + (ok ? ICONS.mail : ICONS.close) + "</div>" +
      "<h3>" + (ok ? "Danke!" : "Das hat nicht geklappt") + "</h3>" +
      '<p class="muted">' + esc(text) + "</p></div>";
  }
  function mailtoFallback(to, subject, lines) {
    window.location.href = "mailto:" + to +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }
  function setupForms() {
    var key = (D.verein || {}).formKey;
    document.querySelectorAll("form.js-form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var subject = form.getAttribute("data-subject") || "Nachricht über die Website";
        var to = form.getAttribute("data-to") || (D.verein || {}).email;
        var f = collectFields(form);
        if (!key) { mailtoFallback(to, subject, f.lines); return; }   // noch kein Schlüssel -> E-Mail-Programm
        var payload = f.data;
        payload.access_key = key;
        payload.subject = subject;
        payload.from_name = (D.verein || {}).formName || "Website";
        var btn = form.querySelector("[type=submit]"), label = btn ? btn.innerHTML : "";
        if (btn) { btn.disabled = true; btn.textContent = "Wird gesendet …"; }
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        }).then(function (r) { return r.json(); })
          .then(function (res) {
            if (res.success) { formMessage(form, true, "Deine Nachricht wurde gesendet – wir melden uns bald bei Dir."); }
            else { throw new Error(res.message || "Fehler"); }
          })
          .catch(function () {
            if (btn) { btn.disabled = false; btn.innerHTML = label; }
            mailtoFallback(to, subject, f.lines);   // Fallback: E-Mail-Programm
          });
      });
    });
  }

  /* ---------- Start: Inhalte laden, dann Seite aufbauen ---------- */
  function boot() {
    renderAll();       // Header, Footer und alle Abschnitte erzeugen
    bindAttributes();  // einzelne Texte/Links setzen
    setupNav();
    setupForms();
    setupReveal();
  }
  document.addEventListener("DOMContentLoaded", function () {
    fetch("content.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) { D = data; window.INHALT = data; boot(); })
      .catch(function (err) {
        console.error("Inhalte konnten nicht geladen werden:", err);
        var m = document.querySelector("main") || document.body;
        m.insertAdjacentHTML("afterbegin",
          '<p style="max-width:640px;margin:120px auto;padding:0 22px;text-align:center;color:#b00">' +
          "Die Inhalte konnten nicht geladen werden. Bitte die Seite über einen Webserver öffnen " +
          "(nicht per Doppelklick auf die Datei).</p>");
      });
  });
})();

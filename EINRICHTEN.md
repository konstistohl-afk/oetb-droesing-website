# Einrichten: Live-Schaltung, visuelles Bearbeiten & automatische Formulare

Diese Anleitung führt Dich durch die einmalige Einrichtung. **Alles ist kostenlos.**
Am Ende hast Du:
- die Website live unter **oetbdroesing.com**,
- ein **visuelles Bearbeiten im Browser** (wie bei Wix),
- **Formulare, die automatisch** ins Postfach senden.

> Die ganze Technik ist bereits vorbereitet. Du legst nur die Konten an – **ich begleite
> Dich Schritt für Schritt** (ich kann keine Konten für Dich erstellen). Plane ~20–30 Min ein.

---

## Schritt 1 – Automatischer Formularversand (5 Min)
Damit Anmeldungen & Nachrichten automatisch ins Postfach kommen (statt das E-Mail-Programm
zu öffnen):

1. Geh auf **https://web3forms.com**.
2. Gib eure Vereins-E-Mail ein: **oetb-droesing@gmail.com** → „Create Access Key“.
3. Du bekommst per E-Mail einen **Access Key** (eine lange Zeichenfolge).
4. Diesen Schlüssel tragen wir bei `verein` → `formKey` ein (jetzt in `content.json`,
   später bequem im Bearbeitungs-Panel). Schick ihn mir, dann setze ich ihn ein – oder
   Du fügst ihn selbst zwischen die Anführungszeichen ein.

✅ Sobald der Schlüssel drin ist, senden **beide Formulare automatisch** an
`oetb-droesing@gmail.com`. Ohne Schlüssel öffnet sich als Rückfall weiterhin das
E-Mail-Programm – es geht also nie etwas verloren.

---

## Schritt 2 – GitHub-Konto (Speicher für die Seite)
GitHub ist der kostenlose „Aktenschrank“, in dem die Website liegt.

1. Konto anlegen auf **https://github.com** (E-Mail, Passwort, fertig).
2. Neues **Repository** erstellen (z. B. Name `oetb-droesing-website`), auf **privat** oder
   **öffentlich** – beides geht.
3. Die Projektdateien hochladen. Am einfachsten mit **GitHub Desktop**
   (https://desktop.github.com) – damit werden auch versteckte Dateien wie `.pages.yml`
   zuverlässig mitgenommen. (Ich zeige Dir die genauen Klicks, wenn es so weit ist.)

> Wichtig: Die Datei **`.pages.yml`** muss mit hochgeladen werden – sie steuert das
> Bearbeitungs-Panel. Wir prüfen das gemeinsam.

---

## Schritt 3 – Netlify-Konto (bringt die Seite online)
Netlify stellt die Seite kostenlos ins Internet und aktualisiert sie automatisch.

1. Konto anlegen auf **https://www.netlify.com** – am besten mit **„Sign up with GitHub“**
   (dann sind beide gleich verbunden).
2. **„Add new site“ → „Import an existing project“ → GitHub** → euer Repository auswählen.
3. Es ist **keine Build-Einstellung** nötig (die Seite ist fertig). Auf **„Deploy“** klicken.
4. Nach ~1 Minute ist die Seite unter einer Test-Adresse (`…​.netlify.app`) live.

---

## Schritt 4 – Eure Domain oetbdroesing.com verbinden
Details stehen in **`HOCHLADEN.md`** (Domain in Netlify hinzufügen + beim Domain-Anbieter
die Einträge setzen). Wichtig: die alte Wix-Seite erst abschalten, wenn alles läuft.

---

## Schritt 5 – Visuelles Bearbeiten aktivieren (Pages CMS)
1. Geh auf **https://app.pagescms.org**.
2. **„Sign in with GitHub“** → Zugriff auf euer Repository erlauben.
3. Pages CMS erkennt die Datei `.pages.yml` automatisch und zeigt Dir alle Bereiche als
   **Formulare**: Angebot, Zeiten, Preise, Vereinsleitung, Betreuer, Sponsoren (mit
   **Foto-Upload**), Impressum usw.
4. Ändern → **„Save“**. Pages CMS speichert nach GitHub, Netlify aktualisiert die Website
   automatisch (in ~1 Min). **Das ist der Wix-Ablauf.**

> Melde Dich mit demselben GitHub-Login an – fertig. Mehrere Vorstandsmitglieder können
> so bearbeiten, wenn sie Zugriff aufs Repository haben.

---

## Danach: So bearbeitest Du die Seite
- **Bequem:** auf **app.pagescms.org** einloggen, im Formular ändern, speichern.
- **Direkt (für Technik-Affine):** die Datei `content.json` bearbeiten (siehe `ANLEITUNG.md`).
- **Oder:** Du sagst mir, was geändert werden soll, und ich mache es.

---

## Überblick der Konten
| Dienst | Wofür | Kosten |
|---|---|---|
| Web3Forms | automatischer Formularversand | gratis |
| GitHub | Speicher der Website + Login fürs Panel | gratis |
| Netlify | Hosting (bringt Seite online) | gratis |
| Pages CMS | visuelles Bearbeiten im Browser | gratis |
| Domain oetbdroesing.com | eure Adresse | ~10–20 €/Jahr |

Sag mir einfach, bei welchem Schritt Du gerade bist – ich helfe Dir durch jeden einzelnen.

# Domain oetbdroesing.com mit der Website verbinden

Die Website ist bereits **live und fertig eingerichtet** über GitHub Pages:
👉 **https://konstistohl-afk.github.io/oetb-droesing-website/**

Diese Anleitung zeigt den **letzten verbleibenden Schritt**: eure Domain
`oetbdroesing.com` auf diese Adresse zeigen lassen, damit die Website unter der
gewohnten Adresse erreichbar ist. Kosten dafür: **0 €** (HTTPS/Schloss-Symbol ist bei
GitHub Pages automatisch dabei, keine weiteren Gebühren).

> **Wichtig vorab:** Die **alte Wix-Seite bleibt bis zum Schluss online**. Erst wenn die
> DNS-Einträge unten gesetzt sind, zeigt die Domain auf die neue Seite um. Bis dahin ist
> nichts „weg".

---

## Ausgangslage (geprüft)
- **Registrar** (wo die Domain „gehört" und jährlich verlängert wird): **Network
  Solutions** – Ablaufdatum 18.11.2026, Kosten **21,35 €/Jahr**.
- **DNS-Verwaltung** (wo eingestellt wird, wohin die Domain zeigt): **Wix** – ihr habt
  dort Zugang über das Konto, unter dem auch die aktuelle (alte) Website liegt.

➡️ Das bedeutet: Die DNS-Einträge werden **im Wix-Login** geändert. Network Solutions
muss dafür **nicht** angefasst werden.

---

## Schritt 1 – GitHub die Domain zuweisen
1. Im Repository **`oetb-droesing-website`** auf GitHub: **Settings → Pages**.
2. Unter **„Custom domain"** eintragen: `oetbdroesing.com` → **Save**.
   *(GitHub legt dabei automatisch eine Datei `CNAME` im Repo an – normal, nichts weiter
   zu tun.)*
3. Es erscheint zunächst „DNS check unsuccessful" – das ist normal, solange Schritt 2
   noch nicht gemacht ist.

## Schritt 2 – Bei Wix die DNS-Einträge setzen
1. Bei **wix.com** einloggen → **Domains** → `oetbdroesing.com` auswählen.
2. Im „…"-Menü neben der Domain auf **„Manage DNS records"** klicken.
3. **A-Einträge** für die nackte Domain (Host `@` bzw. leer) – bestehenden A-Eintrag
   ersetzen durch genau diese 4 Adressen:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
4. **CNAME-Eintrag** für `www`:
   ```
   Host: www
   Ziel: konstistohl-afk.github.io
   ```
5. Speichern.

## Schritt 3 – Warten & HTTPS aktivieren
- DNS-Änderungen brauchen **einige Minuten bis zu 24–48 Stunden**.
- Danach in GitHub unter **Settings → Pages** nachsehen: Es sollte
  **„DNS check successful"** stehen.
- Dann erscheint das Kästchen **„Enforce HTTPS"** – anhaken. Das Schloss-Symbol wird
  automatisch und kostenlos aktiviert (kann nach dem DNS-Check noch etwas dauern).

---

## Danach: Wix-Website-Abo kündigen (Domain bleibt)
Domain-Registrierung und Website-Hosting sind bei Wix **getrennte Kostenpunkte**.

1. Prüfen unter **Account Settings → Premium Subscriptions / Billing History**, was
   genau als „Website-Plan" berechnet wird (getrennt von der Domain).
2. **Erst kündigen, wenn Schritt 1–3 sicher funktionieren** (also `oetbdroesing.com`
   erfolgreich die neue Seite zeigt) – zur Sicherheit.
3. Gekündigt wird nur der **Website-/Hosting-Plan**. Die **Domain bleibt bei Wix
   registriert** (21,35 €/Jahr, läuft separat weiter) – das ist die einzige laufende
   Kosten, die übrig bleibt.

> Ein vollständiger Umzug der Domain zu einem anderen Registrar („Transfer away from
> Wix") ist **nicht nötig** – der spart nur ca. 10 €/Jahr, dauert aber 5–7 Tage und
> lohnt den Aufwand nicht. Bei Wix bleiben ist der einfachere Weg.

---

## ⚠️ Wichtige Hinweise
- **E-Mail:** Ihr nutzt `oetbdroesing@gmail.com` (kein `@oetbdroesing.com`) – daher
  vermutlich keine E-Mail-Einträge (MX) zu beachten. Falls doch irgendwo eine
  `@oetbdroesing.com`-Adresse existiert, vorher bei Wix die MX-Einträge notieren.
- **Kein Risiko:** Solange die DNS-Einträge nicht geändert sind, bleibt die alte Seite
  normal erreichbar.

---

## Änderungen künftig veröffentlichen
Der Code liegt im GitHub-Repo **`oetb-droesing-website`**, lokal gespiegelt unter
`/Users/konsti/Documents/GitHub/oetb-droesing-website` (geklont mit **GitHub Desktop**).

- **Inhalte** (Texte, Zeiten, Preise, Fotos, Sponsoren): bequem über das visuelle Panel
  **app.pagescms.org** – Änderung, „Save", nach ~1 Minute live.
- **Größere/technische Änderungen** (Layout, neue Seiten): werden vorbereitet und landen
  im GitHub-Ordner; in **GitHub Desktop** dann nur noch **„Commit to main"** →
  **„Push origin"** – ebenfalls nach ~1 Minute live.

Die Domain bleibt bei alldem unverändert – sie zeigt dauerhaft auf dieselbe
GitHub-Pages-Adresse.

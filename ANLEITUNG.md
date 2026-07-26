# Anleitung: Website ändern

Es gibt **zwei Wege**, die Inhalte zu ändern:

1. **Bequem im Browser (empfohlen):** das visuelle Panel auf **app.pagescms.org** –
   Login mit GitHub, alles über Formulare, mit Foto-Upload. Einrichtung: siehe
   **`EINRICHTEN.md`**. Das ist der Wix-artige Weg.
2. **Direkt in der Datei:** alle Inhalte stehen in **`content.json`**. Text zwischen den
   `"Anführungszeichen"` austauschen, speichern.

> **Wichtigste Regel beim Datei-Weg:** Ändere nur den Text **zwischen den
> `"Anführungszeichen"`**. Lass Klammern `{ } [ ]`, Doppelpunkte `:` und Kommas `,` stehen.
> In `content.json` stehen **auch die Bezeichnungen** in Anführungszeichen (z. B. `"zeit"`).

---

## Vorschau / Öffnen
Die Seite lädt ihre Inhalte aus `content.json` – dafür braucht es einen kleinen Server
(Doppelklick auf die Datei reicht **nicht** mehr):
- Lokal: im Ordner `python3 server.py` ausführen und `http://127.0.0.1:8000` öffnen.
- Oder einfach die **live geschaltete** Seite verwenden (siehe `EINRICHTEN.md`).

Zum direkten Bearbeiten `content.json` mit einem Texteditor öffnen (z. B. **Visual Studio
Code** – gratis, warnt bei Tippfehlern).

---

## Häufige Änderungen (Datei-Weg, mit Beispiel)

### Eine Trainingszeit ändern
Abschnitt `angebote`, gewünschtes Angebot:
```json
{ "titel": "Kinderturnen", "tag": "Dienstag", "zeit": "16:45–18:15", "leitung": "Verena Friedrich" }
```
➡️ `"zeit": "16:45–18:15"` z. B. in `"17:00–18:30"` ändern (genauso `tag`, `zielgruppe`, `leitung`).

### Einen Mitgliedsbeitrag ändern
Abschnitt `mitgliedschaft` → `beitraege`:
```json
{ "typ": "Erwachsene", "preis": "55 € / Jahr" }
```
➡️ Nur die Zahl im Preis ändern, z. B. `"60 € / Jahr"`.

### Einen Sponsor hinzufügen / austauschen
Am einfachsten im Panel (Logo hochladen). Per Datei:
1. Logo in den Ordner `assets/images/sponsorlogos/` legen (`.png` transparent oder `.jpg`, ~400 px breit).
2. In `content.json` unter `faustball` → `sponsoren` ergänzen:
```json
{ "name": "Neue Firma", "logo": "assets/images/sponsorlogos/neue-firma.png" }
```
➡️ Einen Sponsor entfernen: den ganzen `{ … }`-Block löschen.

### Vereinsleitung / Betreuer ändern
Abschnitte `ueberUns` → `leitung` bzw. `faustball` → `betreuer`. Pro Person:
```json
{ "name": "Thomas Kvasnicka", "rolle": "Obmann", "bild": "" }
```
➡️ `"bild": ""` = Initialen-Platzhalter. Für ein Foto: Datei in `assets/images/personen/`
legen und z. B. `"bild": "assets/images/personen/thomas.jpg"` eintragen.

---

## Farbe der Website ändern
In `assets/styles.css` ganz oben:
```css
--accent: #1877c9;   /* Vereins-Blau (Hauptfarbe) */
```
➡️ Diesen einen Wert ändern – die **gesamte** Website färbt sich um.
(`--accent-2: #e11f1a` ist der kleine Rot-Akzent.)

---

## Logo & Fotos austauschen
Alle Bilder liegen in `assets/images/`:
- **Logo** (Menü + Fußzeile): `logo.png` – gleichnamig ersetzen.
- **Titelbild-Collage:** `anlagen/turnhalle.jpg`, `anlagen/kraftraum.jpg`, `team-hero.jpg`.
  *Für die Faustballanlage fehlt noch ein Foto – sobald es da ist, tauschen wir Panel 3.*
- **Anlagen-Fotos** (Über uns): in `assets/images/anlagen/`, verknüpft über das Feld `bild`.
- **Favicon** (Tab-Symbol): `favicon.png`.

Im Panel geht das per Foto-Upload noch bequemer. Passt ein Ausschnitt nicht, sag mir Bescheid.

---

## Facebook & Instagram
In `content.json` unter `verein` → `social`:
```json
"social": {
  "facebook": "https://www.facebook.com/Faustballteam/?locale=de_DE",
  "instagram": "https://www.instagram.com/oetb_droesing/"
}
```
➡️ Eine Zeile leer (`""`) blendet das Symbol aus. Icons erscheinen in Fußzeile + Kontakt.

---

## Formulare (Kontakt & Anmeldung)
Beide Formulare senden **automatisch** an `oetb-droesing@gmail.com`, sobald der
**Web3Forms-Schlüssel** unter `verein` → `formKey` eingetragen ist (siehe `EINRICHTEN.md`,
Schritt 1). Ohne Schlüssel öffnen sie als Rückfall das E-Mail-Programm – es geht also nie
etwas verloren. Die Auswahl „Gewünschtes Angebot“ füllt sich automatisch aus den Angeboten.

---

## Impressum & Datenschutz
- **Impressum:** `content.json` → `impressum` (Verein, ZVR-Zahl, Vereinszweck, Behörde …).
- **Datenschutz:** anpassbare Teile in `content.json` → `datenschutz`; der rechtliche
  Standardtext wird automatisch ergänzt.
- Beide Seiten (`impressum.html`, `datenschutz.html`) sind in der Fußzeile verlinkt.

---

## Animationen
Inhalte blenden beim Scrollen sanft ein, das Titelbild zoomt langsam – bewusst dezent.
Wer „Bewegung reduzieren“ im System aktiviert hat, bekommt automatisch die ruhige Variante.

---

## Wenn etwas nicht mehr angezeigt wird
Fast immer ist beim Datei-Weg ein `"`, `,` oder eine `}`-Klammer verrutscht.
1. Letzte Änderung rückgängig machen (Strg/Cmd+Z).
2. In Visual Studio Code werden Fehler rot markiert.
3. Beim Panel-Weg kann das kaum passieren – dort füllst du nur Felder aus.

# Website hochladen & mit der Domain oetbdroesing.com verbinden

Diese Anleitung zeigt Schritt für Schritt, wie die neue Website online geht – **unter
Deiner bestehenden Adresse `oetbdroesing.com`**. Kosten: **0 €** (kostenloses Hosting
inkl. HTTPS-Verschlüsselung).

Es gibt zwei Teile:
1. **Website online stellen** (auf einen Hoster laden)
2. **Deine Domain damit verbinden** (`oetbdroesing.com` auf die neue Seite zeigen lassen)

> **Wichtig vorab:** Lass Deine **aktuelle Wix-Seite online**, bis die neue Seite fertig
> verbunden ist. So ist die Website nie „weg“. Erst ganz am Schluss umschalten.

---

## Teil 1 – Website online stellen (mit Netlify, gratis)

1. Geh auf **https://www.netlify.com** und erstelle ein **kostenloses Konto**
   (z. B. mit Deiner E-Mail oder dem Google-Login).
2. Klick auf **„Add new site“ → „Deploy manually“**.
3. Zieh den **ganzen Ordner** `Website` (also `/Users/konsti/Documents/Claude/Website`)
   mit der Maus in das Feld und lass los.
4. Nach ein paar Sekunden ist die Seite online – Du bekommst eine Test-Adresse wie
   `https://oetb-droesing-xy12.netlify.app`. Öffne sie und prüfe, ob alles passt.
5. **Namen anpassen (optional):** Unter **Site configuration → Change site name** kannst
   Du z. B. `oetb-droesing` wählen → `https://oetb-droesing.netlify.app`.

✅ Damit ist die Website online. Fehlt nur noch Deine echte Domain.

---

## Teil 2 – Domain `oetbdroesing.com` verbinden

### Schritt A: Domain in Netlify hinterlegen
1. In Netlify: **Domain management → Add a domain**.
2. `oetbdroesing.com` eingeben und bestätigen.
3. Netlify zeigt Dir jetzt an, **welche Einträge Du setzen musst**. Diese Werte trägst
   Du im nächsten Schritt bei Deinem Domain-Anbieter ein. (Genau die von Netlify
   angezeigten Werte verwenden – die folgenden sind nur Beispiele.)

### Schritt B: Beim Domain-Anbieter die Einträge setzen
Zuerst musst Du wissen, **wo `oetbdroesing.com` verwaltet wird**. Zwei häufige Fälle:

**Fall 1 – Die Domain gehört zu Wix:**
- Melde Dich bei **Wix** an → **Domains**.
- Dort kannst Du die Domain von der alten Wix-Seite lösen und die DNS-Einträge auf
  Netlify zeigen lassen (siehe Werte unten).
- Alternativ: die Domain zu einem eigenen Anbieter „transferieren“ – frag im Zweifel
  den Wix-Support, das ist der sauberste Weg.

**Fall 2 – Die Domain ist bei einem eigenen Anbieter** (z. B. World4You, united-domains,
GoDaddy, Namecheap …):
- Dort einloggen → **DNS-Einstellungen / DNS-Verwaltung** der Domain öffnen.

In **beiden** Fällen trägst Du die von Netlify genannten Einträge ein – typischerweise:

| Typ   | Name / Host | Wert (Beispiel – Netlify zeigt Dir den echten) |
|-------|-------------|------------------------------------------------|
| A     | `@`         | `75.2.60.5`                                    |
| CNAME | `www`       | `oetb-droesing.netlify.app`                    |

> Bequemer geht es, wenn Netlify die komplette DNS-Verwaltung übernimmt: Dann stellst Du
> beim Anbieter nur die **Nameserver** auf die von Netlify angezeigten um (z. B.
> `dns1.p0X.nsone.net`). Netlify richtet den Rest automatisch ein.

### Schritt C: Warten & HTTPS
- DNS-Änderungen brauchen **einige Minuten bis zu 24–48 Stunden**, bis sie überall
  greifen. Das ist normal.
- Das **Schloss-Symbol (HTTPS)** aktiviert Netlify danach **automatisch und gratis** –
  nichts weiter zu tun.

---

## ⚠️ Wichtige Hinweise

- **Wix erst danach kündigen:** Falls die Domain über Wix läuft, kündige das Wix-Abo
  **nicht**, bevor die Domain sicher umgezogen bzw. verbunden ist – sonst könntest Du die
  Domain verlieren. Im Zweifel Wix-Support fragen.
- **E-Mail beachten:** Falls es E-Mail-Adressen mit `@oetbdroesing.com` gibt, beim
  Umstellen der Nameserver aufpassen, dass die E-Mail-Einträge (MX) mitübernommen werden.
  (Ihr verwendet `oetbdroesing@gmail.com` → vermutlich kein Problem, aber sicherheitshalber
  prüfen.)
- **Kein Risiko:** Solange Du die DNS erst am Schluss umstellst, bleibt die alte Seite
  bis dahin normal erreichbar.

---

## Später Änderungen veröffentlichen
Wenn wir am Inhalt etwas ändern (`content.json`):
1. In Netlify auf **Deploys** gehen.
2. Den aktualisierten Ordner `Website` erneut ins Feld ziehen.
3. Fertig – die Seite ist sofort aktuell, die Domain bleibt gleich.

---

## Alternative Hoster (falls gewünscht)
Funktionieren nach demselben Prinzip, ebenfalls gratis inkl. HTTPS:
- **Cloudflare Pages** (cloudflare.com) – sehr schnell, Cloudflare kann auch die Domain
  verwalten.
- **GitHub Pages** – gut, wenn die Dateien ohnehin auf GitHub liegen.

Wenn Du möchtest, begleite ich Dich beim Hochladen Schritt für Schritt – sag mir einfach,
**wo die Domain `oetbdroesing.com` aktuell verwaltet wird** (bei Wix oder bei einem
anderen Anbieter), dann gebe ich Dir die exakt passenden Klicks.

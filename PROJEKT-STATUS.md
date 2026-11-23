# Projekt-Status — GregsWebdesign Website

Kontext für Claude: Dies ist ein bestehendes, bereits live geschaltetes Projekt. Bitte nicht von vorne planen — lies diese Datei, dann direkt an das anknüpfen, was der Nutzer als Nächstes möchte.

## Was das Projekt ist
Portfolio-Website für den nebenberuflichen Webdesign-Service "GregsWebdesign" (Inhaber: Gregory Gygli, Zürich/Hütten SZ). Zielgruppe: kleine Schweizer Unternehmen (Coiffeure, Barbers, Detailer, Personal Trainer etc.).

## Live-URLs
- Hauptseite: https://gregswebdesign.netlify.app
- Demo-Projekt (Barbershop): https://gregswebdesign.netlify.app/demo-coiffeur/
- Demo-Projekt (Auto Detailing): https://gregswebdesign.netlify.app/demo-autodetailing/
- Demo-Projekt (Personal Trainer, mehrseitig): https://gregswebdesign.netlify.app/demo-personaltrainer/
- Demo-Projekt (Damencoiffeur, mehrseitig): https://gregswebdesign.netlify.app/demo-damensalon/

## Struktur
- `index.html`, `impressum.html`, `datenschutz.html` — Hauptseite (Onepage + 2 rechtliche Seiten)
- `css/style.css`, `js/script.js` — geteiltes Styling/Skript der Hauptseite
- `Bilder/` — Logo (logo-icon-dark.png / -white.png), Portfolio-Thumbnail, `ueber-mich.jpg` (echtes Foto von Gregory)
- `Demo-Coiffeur/` — eigenständige Demo-Website "FADEHOUSE Barbershop" (Onepager, dunkles Design, Gold-Akzent #C9A15C, Bebas Neue), verlinkt von der Portfolio-Sektion der Hauptseite
- `Demo-AutoDetailing/` — eigenständige Demo-Website "APEX DETAILING" (Onepager, dunkles Design, Rot-Akzent #D7263D, Bebas Neue, inkl. Video-Sektion), verlinkt von der Portfolio-Sektion
- `Demo-PersonalTrainer/` — eigenständige Demo-Website "IRONWILL Coaching" (**mehrseitig**: index/programme/ueber-mich/galerie/kontakt.html, dunkles Design, Orange-Akzent #FF7A1A, Schriftart Anton), verlinkt von der Portfolio-Sektion
- `Demo-Damensalon/` — eigenständige Demo-Website "AVELINE Hair Studio" (**mehrseitig**: index/leistungen/ueber-uns/galerie/kontakt.html, **helles** Design (einziges helles unter den Demos), Rosé-Akzent #B8757F, Schriftart Playfair Display), verlinkt von der Portfolio-Sektion
- `Bilder_beispiel_webseite/` — Rohbilder (lizenzfreie Pexels-Fotos) für die Barbershop-Demo
- `robots.txt`, `sitemap.xml` — für Google-Indexierung (siehe SEO-Abschnitt unten)
- `Akquise/Akquise-Tracker.xlsx` — Excel mit Tab "Übersicht" (automatische Zählungen per Formel) und Tab "Akquise-Tracker" (Liste aller angeschriebenen Firmen). **Nicht in Git** (lokale Arbeitsdatei, nur auf diesem Rechner, kein Grund sie zu committen)
- `netlify/functions/submission-created.mjs` + `netlify/lib/lead.mjs` — kleine Netlify-Funktion: schickt bei einer echten Formular-Anfrage eine Mail (Formspree) und eine Push-Nachricht aufs Handy (ntfy). Speichert nichts. Kein Secret im Code, das Topic kommt aus der Netlify-Umgebungsvariable `NTFY_TOPIC`.
- `Admin-Lokal/` — **nur lokal, in .gitignore, nie hochladen**: Verwaltungsseite für Anfragen und Projekte (Start mit `Start.bat`, http://localhost:4310, Login per Passwort). Enthält `.env` (Passwort, Netlify-Token, Topic) und `daten/projekte.json` (die Daten). Anleitung in `Admin-Lokal/LIESMICH.txt`.
- ` - Deploy` Ordner (Geschwisterordner, nicht in Git) — schlanke Kopie zum manuellen Hochladen auf Netlify (veraltet, seit Git-Auto-Deploy nicht mehr nötig, siehe unten)
- ` - Backup 2026-08-11` Ordner (Geschwisterordner) — Sicherungskopie vor grösseren Design-Änderungen

## Wichtige Fakten
- Marke: **GregsWebdesign**, Kontakt-Mail: **info.gregswebdesign@gmail.com**
- Telefon: 079 152 35 16 · Privatadresse bewusst NICHT öffentlich (steht weder im Impressum noch in dieser Datei, Repo ist public). Rechtlich braucht das Impressum bei echten Kunden eine Postadresse, Lösung wäre ein Postfach.
- Kontaktformular: **Netlify Forms** (Formularname `kontakt`, Spam-Schutz per Honeypot `bot-field`), mit **Formspree** (`mvkpallz`) als Reserve im Skript, falls Netlify nicht antwortet. Details siehe Abschnitt "Anfragen-Verwaltung".
- Hosting: **Netlify**, Account-Login-Mail `info.gregswebdesign@gmail.com` (gewechselt von `gregorygygli@gmail.com`)
- Deployment: **automatisch über GitHub** (Continuous Deployment, Branch `master`, Publish directory `.`) — kein manuelles Drag & Drop mehr nötig, einfach `git push`
- Farbschema Hauptseite: hell, Blau-Akzent (#2A4CE0). Demo-Projekte: 3 dunkel + 1 hell (Damensalon), je eigener Akzent (siehe Struktur oben) zur optischen Unterscheidung
- Für Videos/grosse Bilder in Demo-Projekten: **ffmpeg** ist lokal installiert (winget, User-Scope) — vor dem Commit grosse 4K-Videos/Bilder komprimieren (z.B. `-vf scale=1280:720 -crf 27 -an`), sonst wird das Repo unnötig aufgebläht

## Offene Punkte / als Nächstes geplant
- Keine Social-Media-Links im Footer (noch keine Accounts) — Insta-Bio-Text wurde aber schon entworfen (siehe Chat-Historie), Account evtl. inzwischen erstellt
- Eigene Domain noch nicht gekauft (aktuell nur `.netlify.app`-Subdomain) — bewusst erst geplant, sobald erster Kunde/erstes Geld reinkommt
- Website ist inhaltlich/technisch komplett fertig (alle 3 Demos, echtes Foto, SEO-Grundlagen, keine bekannten Bugs). **Aktueller Fokus liegt auf Kundenakquise**, nicht mehr auf der Website selbst
- Google Search Console: Indexierung für die Startseite wurde beantragt, aber Tageskontingent war überschritten — ggf. nochmal versuchen (Konto: gleiche Google-Mail wie sonst verwendet)

## Bugfixes (2026-08-12)
- **Mobile-Menü-Bug**: Nach dem Scrollen deckte das aufgeklappte Hamburger-Menü nicht mehr den ganzen Bildschirm ab. Ursache: `backdrop-filter` auf dem gescrollten Header erzeugte einen neuen CSS-Containing-Block für das darin verschachtelte `position:fixed`-Menü. Fix: Menü liegt jetzt als Geschwister-Element ausserhalb von `<header>`, betrifft alle 4 Sites (Hauptseite + 3 Demos).
- **Hero-Badges auf Mobile**: "In der Schweiz entwickelt" / "Schnelle Ladezeit" waren unter 860px Breite komplett per `display:none` versteckt — unnötig, getestet bis 360px ohne Overflow-Probleme. Jetzt nur auf ≤480px leicht verkleinert statt komplett versteckt.

## SEO (2026-08-12)
- `robots.txt` (erlaubt alles, verweist auf Sitemap) und `sitemap.xml` (Hauptseite, Impressum, Datenschutz — Demo-Seiten bewusst nicht drin, die haben `noindex`) hinzugefügt
- Google Search Console eingerichtet und verifiziert (Verification-Tag im `<head>` von `index.html`), Sitemap eingereicht
- Property-Typ: URL-Präfix `https://gregswebdesign.netlify.app`

## Kundenakquise (laufend, seit 2026-08-12)
Gregory schreibt aktiv lokale Betriebe ohne eigene Website an (Fokus bisher: Coiffeure/Barbershops in der Region Zürich/Zürichsee). Ablauf, der sich eingespielt hat:
1. Gregory schickt Screenshot von Instagram-Profil/Google-Maps-Eintrag einer Firma ohne Website
2. Claude entwirft eine kurze, lockere Anfrage-Nachricht (kein "KI-Ton": kurz, keine Gedankenstriche, keine Abkürzungen wie "u.a.", korrekte Gross-/Kleinschreibung, meist mit Link zur passenden Demo-Seite je nach Branche)
3. Gregory verschickt die Nachricht selbst (Claude verschickt nie direkt, keine Account-Logins)
4. **Wichtig:** Sobald Claude eine Nachricht entworfen hat, trägt Claude die Firma automatisch in `Akquise/Akquise-Tracker.xlsx` ein (Status "Angeschrieben", Notiz "gesendet") — Gregory schickt es ohnehin praktisch immer direkt ab. Tracker wird ergänzt, nie komplett neu gebaut (sonst gehen Gregorys eigene Änderungen an der Datei verloren).
5. Bisher angeschrieben (Stand 2026-08-12): Adil'S Barbershop (Jona), Stella Russo Hairstudio (Lachen, per Mail, da schon eigene Website — Ansatz dort: nicht "keine Website" sondern "moderneres Redesign"), The Kovli Barber (Wolfhausen ZH), Hawler_Barbershop, K&D Barbershop (Wald ZH), Coiffeur Bahnhof Jona

## Anfragen-Verwaltung (Admin lokal, gebaut 2026-11-23)
Ziel: Anfragen vom Kontaktformular sauber verwalten, ohne dass die Verwaltung im Internet steht.
- **Weg einer Anfrage:** Besucher sendet Formular auf der Website → Netlify Forms speichert es (Quelle der Wahrheit) → Funktion `submission-created` filtert Spam und schickt bei echten Anfragen eine **Mail an Gregorys Gmail (über Formspree, wie früher)** und einen Push aufs Handy (ntfy-App), beides unabhängig voneinander → die lokale Admin-Seite holt die Anfrage per Netlify-API ab (`NETLIFY_TOKEN` in `Admin-Lokal/.env`) und zeigt sie in der Projektliste.
- **Nur echte Anfragen:** nur das Formular `kontakt` löst Push aus. Verworfen werden: Honeypot ausgefüllt, ungültige Mail, Nachricht unter 5 Zeichen, mehr als 2 Links in der Nachricht. Mails von Instagram o.ä. kommen nie an, weil es keinen Mail-Weg gibt.
- **Status pro Eintrag:** Neue Anfrage, Offerte geschickt, Ich bin dran, Wartet auf Kunde, Fertig, Abgesagt. Preis und Notizen pro Projekt, Projekte lassen sich auch von Hand anlegen.
- **Sicherheit lokal:** nur auf 127.0.0.1 erreichbar, Login mit Passwort (Cookie HttpOnly/SameSite=Strict, nach 5 Fehlversuchen 10 Minuten Sperre), Schutz gegen fremde Webseiten (Host-/Origin-Prüfung, eigener Header).
- **Setup-Schritte, die Gregory selbst machen muss** (nicht automatisierbar): `ADMIN_PASSWORD` und `NETLIFY_TOKEN` in `Admin-Lokal/.env`; ntfy-App + Topic; `NTFY_TOPIC` als Umgebungsvariable in Netlify. Danach Website einmal deployen. Siehe `Admin-Lokal/LIESMICH.txt`.
- **Nach dem ersten Deploy prüfen:** In Netlify unter Forms muss das Formular `kontakt` erscheinen. Mit einer Testanfrage prüfen, dass sie in der Admin-Liste landet und der Push ankommt. Falls Netlify das Formular nicht erkennt, greift die Reserve (Formspree), es geht also keine Anfrage verloren.
- Netlify-Credits beachten (Free-Plan, 300 pro Monat, ein Deploy kostet ca. 15).

## GitHub-Einrichtung (abgeschlossen, 2026-08-12)
Repo ist live und public: https://github.com/infogregswebdesign-hash/gregswebdesign
GitHub-Account: infogregswebdesign-hash. Anmeldung lokal über GitHub CLI (`gh`), installiert per winget (User-Scope, da MSI-Installer Admin-Elevation braucht die im Terminal nicht klappt — ggf. bei zukünftigen Installs `--scope user` verwenden).
Netlify ist mit dem Repo verknüpft (Continuous Deployment) — `git push` reicht für ein Live-Update, der `- Deploy`-Ordner wird nicht mehr gebraucht.

## Nach jeder Änderung
Denk daran: Änderungen an den Dateien hier aktualisieren die Live-Website NICHT automatisch. Der `- Deploy`-Ordner (falls vorhanden) muss aktualisiert und erneut auf Netlify gezogen werden.

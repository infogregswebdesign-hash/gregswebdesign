# Projekt-Status — GregsWebdesign Website

Kontext für Claude: Dies ist ein bestehendes, bereits live geschaltetes Projekt. Bitte nicht von vorne planen — lies diese Datei, dann direkt an das anknüpfen, was der Nutzer als Nächstes möchte.

## Was das Projekt ist
Portfolio-Website für den nebenberuflichen Webdesign-Service "GregsWebdesign" (Inhaber: Gregory Gygli, Zürich/Hütten SZ). Zielgruppe: kleine Schweizer Unternehmen (Coiffeure, Barbers, Detailer, Personal Trainer etc.).

## Live-URLs
- Hauptseite: https://gregswebdesign.netlify.app
- Demo-Projekt (Barbershop): https://gregswebdesign.netlify.app/demo-coiffeur/
- Demo-Projekt (Auto Detailing): https://gregswebdesign.netlify.app/demo-autodetailing/
- Demo-Projekt (Personal Trainer, mehrseitig): https://gregswebdesign.netlify.app/demo-personaltrainer/

## Struktur
- `index.html`, `impressum.html`, `datenschutz.html` — Hauptseite (Onepage + 2 rechtliche Seiten)
- `css/style.css`, `js/script.js` — geteiltes Styling/Skript der Hauptseite
- `Bilder/` — Logo (logo-icon-dark.png / -white.png), Portfolio-Thumbnail
- `Demo-Coiffeur/` — eigenständige Demo-Website "FADEHOUSE Barbershop" (Onepager, dunkles Design, Gold-Akzent #C9A15C, Bebas Neue), verlinkt von der Portfolio-Sektion der Hauptseite
- `Demo-AutoDetailing/` — eigenständige Demo-Website "APEX DETAILING" (Onepager, dunkles Design, Rot-Akzent #D7263D, Bebas Neue, inkl. Video-Sektion), verlinkt von der Portfolio-Sektion
- `Demo-PersonalTrainer/` — eigenständige Demo-Website "IRONWILL Coaching" (**mehrseitig**: index/programme/ueber-mich/galerie/kontakt.html, dunkles Design, Orange-Akzent #FF7A1A, Schriftart Anton), verlinkt von der Portfolio-Sektion
- `Bilder_beispiel_webseite/` — Rohbilder (lizenzfreie Pexels-Fotos) für die Barbershop-Demo
- ` - Deploy` Ordner (Geschwisterordner, nicht in Git) — schlanke Kopie zum manuellen Hochladen auf Netlify (veraltet, seit Git-Auto-Deploy nicht mehr nötig, siehe unten)
- ` - Backup 2026-08-11` Ordner (Geschwisterordner) — Sicherungskopie vor grösseren Design-Änderungen

## Wichtige Fakten
- Marke: **GregsWebdesign**, Kontakt-Mail: **info.gregswebdesign@gmail.com**
- Telefon: 079 152 35 16 · Adresse (Impressum): Auf der Au 12, 8825 Hütten
- Kontaktformular läuft über **Formspree** (Endpoint-ID `mvkpallz`), sendet an obige Mail
- Hosting: **Netlify**, Account-Login-Mail `info.gregswebdesign@gmail.com` (gewechselt von `gregorygygli@gmail.com`)
- Deployment: **automatisch über GitHub** (Continuous Deployment, Branch `master`, Publish directory `.`) — kein manuelles Drag & Drop mehr nötig, einfach `git push`
- Farbschema Hauptseite: hell, Blau-Akzent (#2A4CE0). Alle Demo-Projekte: dunkel, je eigener Akzent (siehe Struktur oben) zur optischen Unterscheidung
- Für Videos/grosse Bilder in Demo-Projekten: **ffmpeg** ist lokal installiert (winget, User-Scope) — vor dem Commit grosse 4K-Videos/Bilder komprimieren (z.B. `-vf scale=1280:720 -crf 27 -an`), sonst wird das Repo unnötig aufgebläht

## Offene Punkte / als Nächstes geplant
- Kein eigenes Foto bei "Über mich" (noch Platzhalter-Initialen "GG")
- Keine Social-Media-Links im Footer (noch keine Accounts)
- Eigene Domain noch nicht gekauft (aktuell nur `.netlify.app`-Subdomain)
- Alle drei Portfolio-Demos (Barbershop, Auto Detailing, Personal Trainer) sind jetzt fertig und verlinkt — nächster sinnvoller Schritt wäre eher Polish an der Hauptseite als weitere Demos

## GitHub-Einrichtung (abgeschlossen, 2026-08-12)
Repo ist live und public: https://github.com/infogregswebdesign-hash/gregswebdesign
GitHub-Account: infogregswebdesign-hash. Anmeldung lokal über GitHub CLI (`gh`), installiert per winget (User-Scope, da MSI-Installer Admin-Elevation braucht die im Terminal nicht klappt — ggf. bei zukünftigen Installs `--scope user` verwenden).
Netlify ist mit dem Repo verknüpft (Continuous Deployment) — `git push` reicht für ein Live-Update, der `- Deploy`-Ordner wird nicht mehr gebraucht.

## Nach jeder Änderung
Denk daran: Änderungen an den Dateien hier aktualisieren die Live-Website NICHT automatisch. Der `- Deploy`-Ordner (falls vorhanden) muss aktualisiert und erneut auf Netlify gezogen werden.

# Projekt-Status — GregsWebdesign Website

Kontext für Claude: Dies ist ein bestehendes, bereits live geschaltetes Projekt. Bitte nicht von vorne planen — lies diese Datei, dann direkt an das anknüpfen, was der Nutzer als Nächstes möchte.

## Was das Projekt ist
Portfolio-Website für den nebenberuflichen Webdesign-Service "GregsWebdesign" (Inhaber: Gregory Gygli, Zürich/Hütten SZ). Zielgruppe: kleine Schweizer Unternehmen (Coiffeure, Barbers, Detailer, Personal Trainer etc.).

## Live-URLs
- Hauptseite: https://gregswebdesign.netlify.app
- Demo-Projekt (Barbershop): https://gregswebdesign.netlify.app/demo-coiffeur/

## Struktur
- `index.html`, `impressum.html`, `datenschutz.html` — Hauptseite (Onepage + 2 rechtliche Seiten)
- `css/style.css`, `js/script.js` — geteiltes Styling/Skript der Hauptseite
- `Bilder/` — Logo (logo-icon-dark.png / -white.png), Portfolio-Thumbnail
- `Demo-Coiffeur/` — eigenständige Demo-Website "FADEHOUSE Barbershop" (eigenes dunkles Design, eigenes css/js/Bilder), verlinkt von der Portfolio-Sektion der Hauptseite
- `Bilder_beispiel_webseite/` — Rohbilder (lizenzfreie Pexels-Fotos) für die Demo-Website
- ` - Deploy` Ordner (Geschwisterordner, nicht in Git) — schlanke Kopie zum manuellen Hochladen auf Netlify (Drag & Drop unter app.netlify.com/drop bzw. im bestehenden Netlify-Projekt "Deploys"-Tab)
- ` - Backup 2026-08-11` Ordner (Geschwisterordner) — Sicherungskopie vor grösseren Design-Änderungen

## Wichtige Fakten
- Marke: **GregsWebdesign**, Kontakt-Mail: **info.gregswebdesign@gmail.com**
- Telefon: 079 152 35 16 · Adresse (Impressum): Auf der Au 12, 8825 Hütten
- Kontaktformular läuft über **Formspree** (Endpoint-ID `mvkpallz`), sendet an obige Mail
- Hosting: **Netlify**, manuelles Deployment per Drag & Drop (kein Git-Auto-Deploy eingerichtet)
- Farbschema Hauptseite: hell, Blau-Akzent (#2A4CE0). Demo-Seite: dunkel, Gold-Akzent (#C9A15C), eigene Schriftart Bebas Neue

## Offene Punkte / als Nächstes geplant
- GitHub-Repo ist lokal initialisiert (erster Commit gemacht), aber noch **nicht** mit github.com verbunden — Nutzer wollte das "an einem anderen Tag" fertig einrichten (siehe Anleitung weiter unten)
- Kein eigenes Foto bei "Über mich" (noch Platzhalter-Initialen "GG")
- Keine Social-Media-Links im Footer (noch keine Accounts)
- Weitere Demo-Projekte (Auto Detailing, Personal Trainer) sind auf der Hauptseite als reine Konzeptkarten ohne echte Demo-Website hinterlegt — evtl. später wie beim Barbershop ausbauen
- Eigene Domain noch nicht gekauft (aktuell nur `.netlify.app`-Subdomain)

## GitHub-Einrichtung (angefangen, nicht abgeschlossen)
Lokales Git-Repo existiert bereits (`git log` zeigt Commits). Für die Fortsetzung: GitHub Desktop installieren (desktop.github.com), mit GitHub-Konto anmelden, "Add Local Repository" auf diesen Ordner, dann "Publish repository".

## Nach jeder Änderung
Denk daran: Änderungen an den Dateien hier aktualisieren die Live-Website NICHT automatisch. Der `- Deploy`-Ordner (falls vorhanden) muss aktualisiert und erneut auf Netlify gezogen werden.

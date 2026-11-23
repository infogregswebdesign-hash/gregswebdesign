// Auswertung von Formular-Einsendungen und Push-Nachricht aufs Handy.
// Diese Datei ist oeffentlich (Repo ist public): keine Secrets, kein Speichern von Kundendaten.
// Das Push-Topic kommt nur aus der Netlify-Umgebungsvariable NTFY_TOPIC.

export const ID_RE = /^[A-Za-z0-9_-]{1,64}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPIC_RE = /^[A-Za-z0-9_-]{1,64}$/;

// Einzeilige Felder: Leerraum zusammenfassen, Laenge begrenzen
export const line = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
// Mehrzeilige Felder: Zeilenumbrueche behalten
export const text = (v, max) => String(v ?? '').replace(/\r\n?/g, '\n').trim().slice(0, max);

export function newId() {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 20);
}

// Macht aus einer Formular-Einsendung einen Eintrag.
// Gibt null zurueck, wenn es keine echte Anfrage ist (Bot, Spam, unvollstaendig).
export function leadFromSubmission(data, meta = {}) {
  if (!data || typeof data !== 'object') return null;
  if (data['bot-field']) return null; // Honeypot ausgefuellt: Bot

  const name = line(data.name, 120);
  const email = line(data.email, 200).toLowerCase();
  const message = text(data.message, 4000);

  if (!name || !EMAIL_RE.test(email) || message.length < 5) return null;
  if ((message.match(/https?:\/\//gi) || []).length > 2) return null; // typischer Link-Spam

  const now = new Date().toISOString();
  const id = ID_RE.test(String(meta.id || '')) ? String(meta.id) : newId();
  return {
    id,
    source: 'formular',
    status: 'neu',
    name,
    company: line(data.company, 160),
    email,
    phone: line(data.phone, 60),
    type: line(data.type, 80),
    budget: line(data.budget, 80),
    message,
    price: null,
    notes: '',
    createdAt: meta.createdAt || now,
    updatedAt: now,
  };
}

export function pushConfigured(env) {
  return TOPIC_RE.test(String(env.NTFY_TOPIC || ''));
}

// Push aufs Handy ueber ntfy (kostenlos, keine Registrierung).
// Das Topic ist das "Passwort", daher kommt es nur aus der Umgebung.
export async function sendPush(env, { title, message, click }, fetchImpl = fetch) {
  const topic = String(env.NTFY_TOPIC || '');
  if (!TOPIC_RE.test(topic)) return { sent: false, reason: 'no-topic' };
  const server = String(env.NTFY_SERVER || 'https://ntfy.sh').replace(/\/$/, '');
  const body = { topic, title, message, priority: 4, tags: ['bell'] };
  if (click) body.click = click;
  const res = await fetchImpl(server, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { sent: res.ok, status: res.status };
}

export function leadPushText(lead) {
  const who = lead.company ? `${lead.name} (${lead.company})` : lead.name;
  const extra = [lead.type, lead.budget].filter(Boolean).join(', ');
  return {
    title: 'Neue Website-Anfrage',
    message: extra ? `${who}\n${extra}` : who,
  };
}

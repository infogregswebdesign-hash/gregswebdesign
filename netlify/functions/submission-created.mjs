import { leadFromSubmission, leadPushText, sendPush } from '../lib/lead.mjs';

// Wird von Netlify automatisch nach jeder Formular-Einsendung ausgefuehrt.
// Macht nur eines: bei einer echten Anfrage (kein Spam) eine Push-Nachricht aufs Handy schicken.
// Die Mail an dich kommt von Netlify selbst (Forms > Form notifications), nicht von hier.
// Gespeichert wird nichts: die Einsendung liegt bei Netlify (Forms) und wird von der lokalen Admin-Seite abgeholt.
export const handler = async (event) => {
  try {
    const { payload } = JSON.parse(event.body || '{}');
    if (!payload || payload.form_name !== 'kontakt') {
      return { statusCode: 200, body: 'ignoriert (anderes Formular)' };
    }

    const lead = leadFromSubmission(payload.data, { id: payload.id, createdAt: payload.created_at });
    if (!lead) {
      console.log('Einsendung verworfen (Spam oder unvollstaendig), kein Push');
      return { statusCode: 200, body: 'verworfen' };
    }

    const result = await sendPush(process.env, leadPushText(lead));
    if (!result.sent) console.log('Push nicht gesendet:', result.reason || result.status);
    return { statusCode: 200, body: result.sent ? 'push gesendet' : 'kein push' };
  } catch (err) {
    console.error('submission-created Fehler', err);
    return { statusCode: 200, body: 'Fehler (siehe Logs)' };
  }
};

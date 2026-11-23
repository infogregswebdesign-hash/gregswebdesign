import { leadFromSubmission, leadPushText, sendPush, sendMail } from '../lib/lead.mjs';

// Wird von Netlify automatisch nach jeder Formular-Einsendung ausgefuehrt.
// Bei einer echten Anfrage (kein Spam): Mail an dich und Push aufs Handy.
// Gespeichert wird hier nichts, die Einsendung liegt bei Netlify (Forms) und wird von der lokalen Admin-Seite abgeholt.
export const handler = async (event) => {
  try {
    const { payload } = JSON.parse(event.body || '{}');
    if (!payload || payload.form_name !== 'kontakt') {
      return { statusCode: 200, body: 'ignoriert (anderes Formular)' };
    }

    const lead = leadFromSubmission(payload.data, { id: payload.id, createdAt: payload.created_at });
    if (!lead) {
      console.log('Einsendung verworfen (Spam oder unvollstaendig), keine Mail, kein Push');
      return { statusCode: 200, body: 'verworfen' };
    }

    // Beides unabhaengig voneinander: Fehlt das Push-Topic oder klemmt ein Dienst, kommt der andere Weg trotzdem durch.
    const [push, mail] = await Promise.allSettled([
      sendPush(process.env, leadPushText(lead)),
      sendMail(process.env, lead),
    ]);
    const report = (name, r) =>
      r.status === 'rejected'
        ? console.error(`${name} fehlgeschlagen`, r.reason)
        : !r.value.sent && console.log(`${name} nicht gesendet:`, r.value.reason || r.value.status);
    report('Push', push);
    report('Mail', mail);

    return {
      statusCode: 200,
      body: `mail: ${mail.status === 'fulfilled' && mail.value.sent}, push: ${push.status === 'fulfilled' && push.value.sent}`,
    };
  } catch (err) {
    console.error('submission-created Fehler', err);
    return { statusCode: 200, body: 'Fehler (siehe Logs)' };
  }
};

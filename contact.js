import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      await db.query(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [name, email, message]
      );
      res.status(200).json({ message: 'Contact saved successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Database error', details: err });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

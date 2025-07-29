import db from '../../lib/db';

export default async function handler(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM shoes');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err });
  }
}

import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',         // <-- yaha apna MySQL username likho
  password: 'password', // <-- yaha apna MySQL password likho
  database: 'kickit'
});

export default db;

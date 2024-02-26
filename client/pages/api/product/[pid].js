import pool from '../../../../server/db.mjs';

export default async function handler(req, res) {
    const { pid } = req.query;

    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM product WHERE id = ?', [pid]);
      res.status(200).json({ data: rows[0]});
  
      // Release the connection back to the pool
      connection.release();
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
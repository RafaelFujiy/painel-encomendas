import { Request, Response } from 'express';
import { pool } from '../config/db';

export const listarEncomendas = async (req: Request, res: Response) => {
  const resultado = await pool.query('SELECT * FROM encomendas ORDER BY id');
  res.json(resultado.rows);
};

export const criarEncomenda = async (req: Request, res: Response) => {
  const { codigo_rastreio, cliente, cidade_destino } = req.body;

  if (!codigo_rastreio || !cliente || !cidade_destino) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  const resultado = await pool.query(
    'INSERT INTO encomendas (codigo_rastreio, cliente, cidade_destino) VALUES ($1, $2, $3) RETURNING *',
    [codigo_rastreio, cliente, cidade_destino]
  );

  res.status(201).json(resultado.rows[0]);
};

export const atualizarStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const resultado = await pool.query(
    'UPDATE encomendas SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );

  if (resultado.rows.length === 0) {
    return res.status(404).json({ erro: 'Encomenda não encontrada' });
  }

  res.json(resultado.rows[0]);
};

export const deletarEncomenda = async (req: Request, res: Response) => {
  const { id } = req.params;
  const resultado = await pool.query('DELETE FROM encomendas WHERE id = $1', [id]);

  if (resultado.rowCount === 0) {
    return res.status(404).json({ erro: 'Encomenda não encontrada' });
  }

  res.status(204).send();
};
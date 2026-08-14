import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Encomenda } from './types';

const API_URL = 'http://localhost:3000';

function App() {
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [codigoRastreio, setCodigoRastreio] = useState('');
  const [cliente, setCliente] = useState('');
  const [cidadeDestino, setCidadeDestino] = useState('');

  const carregarEncomendas = async () => {
    const resposta = await axios.get<Encomenda[]>(`${API_URL}/encomendas`);
    setEncomendas(resposta.data);
  };

  useEffect(() => {
    carregarEncomendas();
  }, []);

  const criarEncomenda = async (evento: React.FormEvent) => {
    evento.preventDefault();
    await axios.post(`${API_URL}/encomendas`, {
      codigo_rastreio: codigoRastreio,
      cliente,
      cidade_destino: cidadeDestino,
    });
    setCodigoRastreio('');
    setCliente('');
    setCidadeDestino('');
    carregarEncomendas();
  };

  const avancarStatus = async (id: number, statusAtual: string) => {
    const proximoStatus =
      statusAtual === 'pendente' ? 'em transporte' :
      statusAtual === 'em transporte' ? 'entregue' : 'entregue';
    await axios.patch(`${API_URL}/encomendas/${id}`, { status: proximoStatus });
    carregarEncomendas();
  };

  const removerEncomenda = async (id: number) => {
    await axios.delete(`${API_URL}/encomendas/${id}`);
    carregarEncomendas();
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Painel de Encomendas</h1>

      <form onSubmit={criarEncomenda} style={{ marginBottom: 24 }}>
        <input
          placeholder="Código de rastreio"
          value={codigoRastreio}
          onChange={(e) => setCodigoRastreio(e.target.value)}
        />
        <input
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        <input
          placeholder="Cidade destino"
          value={cidadeDestino}
          onChange={(e) => setCidadeDestino(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {encomendas.map((encomenda) => (
          <li key={encomenda.id} style={{ marginBottom: 8 }}>
            <strong>{encomenda.codigo_rastreio}</strong> — {encomenda.cliente} → {encomenda.cidade_destino}
            {' '}[{encomenda.status}]
            <button onClick={() => avancarStatus(encomenda.id, encomenda.status)}>
              Avançar status
            </button>
            <button onClick={() => removerEncomenda(encomenda.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
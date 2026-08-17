Painel de Rastreamento de Encomendas

Projeto de estudo full stack: cadastro e acompanhamento de encomendas por transportadora.

Stack
Backend: Node.js + TypeScript + Express
Banco de dados: PostgreSQL (via Docker)
Frontend: React + TypeScript (Vite)

Como rodar

1. Banco de dados

docker compose up -d

2. Backend

Roda em http://localhost:3000

3. Frontend

Roda em http://localhost:5173

Endpoints
GET /encomendas — lista todas
POST /encomendas — cria uma nova
PATCH /encomendas/:id — atualiza o status
DELETE /encomendas/:id — remove

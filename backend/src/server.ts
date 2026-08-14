import express from "express";
import cors from 'cors';
import encomendasRoutes from './routes/encomendasRoutes'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(encomendasRoutes);

app.listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}`)
});

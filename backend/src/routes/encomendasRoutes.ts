import { Router } from 'express';
import {
    listarEncomendas,
    criarEncomenda,
    atualizarStatus,
    deletarEncomenda,
} from '../controllers/encomendaController'

const router = Router();

router.get('/encomendas', listarEncomendas);
router.post('/encomendas', criarEncomenda);
router.patch('/encomendas/:id', atualizarStatus);
router.delete('/encomendas/:id', deletarEncomenda);

export default router;

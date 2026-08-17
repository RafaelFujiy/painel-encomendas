import { formatarStatus } from './formatarStatus';

test('formata a primeira letra do status em maiúscula', () => {
  expect(formatarStatus('pendente')).toBe('Pendente');
});
import { z } from "zod";

const validateCpfCnpj = (value: unknown) => {
  if (!value || typeof value !== 'string') return false;

  if (value.length === 14) {
    return /^(\d{3})(\.?)\d{3}(\.?)\d{3}-(\d{2})$/.test(value);
  }

  if (value.length === 18) {
    return /^(\d{2})(\.?)\d{3}(\.?)\d{3}(\/|\.)?\d{4}-(\d{2})$/.test(value);
  }

  return false;
}

export const CooperadoSchema = z.object({
  IdCooperado: z.number().optional(),
  nomeCooperado: z.string().min(1, { message: 'Nome é obrigatório' }),
  cpfCnpj:z.custom(validateCpfCnpj, { message: 'CPF/CNPJ inválido' }),
  fazenda: z.string().min(1, { message: 'Fazenda é obrigatória' }),
  inscricaoEstadual:z.string().optional(),
  cep:z.string().min(9, { message: 'Insira um CEP válido' }),
  logradouro: z.string().min(1, { message: 'Logradouro é obrigatório' }),
  numero:z.string().min(1, { message: 'Número é obrigatório' }),
  bairro:z.string().min(1, { message: 'Bairro é obrigatório' }),
  complemento: z.string().min(1, { message: 'Complemento é obrigatório' }),
  cidade: z.string().min(1, { message: 'Cidade é obrigatório' }),
  estado:z.string().min(1, { message: 'Estado é obrigatório' }),
  codIbge: z.number().min(1, { message: 'Código do IBGE é obrigatório' }),
  latitude: z.string(),
  longitude: z.string()
}).refine(data => {
  if (data.cpfCnpj.length === 18) {
    return data.inscricaoEstadual !== null && data.inscricaoEstadual !== '';
  }
  return true;
}, {
  path: ['inscricaoEstadual'],
  message: 'Inscrição Estadual é obrigatória no caso de pessoa jurídica.',
});

export type Cooperado = z.infer<typeof CooperadoSchema>
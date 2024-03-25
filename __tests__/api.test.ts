import Login from '@/app/auth/login/login';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { Cooperado } from '@/schemas/cooperado.schema';
import { render } from '@testing-library/react';
import axios from 'axios';

const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

describe('Get All Cooperados', () => {
  it('deve retornar uma lista de cooperados', async () => {
    const cooperado_example = {
      IdCooperado: 5,
      nomeCooperado: "Antônio Fagundes",
      cpfCnpj: "15566699922",
      fazenda: "Fazenda Robertão",
      inscricaoEstadual: "68796",
      cep: "75908370",
      logradouro: "Rua 129",
      numero: "100",
      bairro: "Jardim Presidente",
      complemento: null,
      cidade: "Rio Verde",
      estado: "Goiás",
      codIbge: 5218805,
      latitude: "-17.797891",
      longitude: "-50.934310"
    };

    try {
      const data = await fetchData(API_ENDPOINTS.GET_COOPERADOS);
      expect(Array.isArray(data)).toBe(true);
      data.forEach((registro: Cooperado) => {
        expect(registro).toMatchObject(cooperado_example);
      });
    } catch (error) {
      throw error;
    }
  });
});

describe('Get Detailed Cooperado', () => {
  it('deve retornar os dados de um cooperado específico', async () => {
    const cooperado_example = {
      IdCooperado: 5,
      nomeCooperado: "Antônio Fagundes",
      cpfCnpj: "15566699922",
      fazenda: "Fazenda Robertão",
      inscricaoEstadual: "68796",
      cep: "75908370",
      logradouro: "Rua 129",
      numero: "100",
      bairro: "Jardim Presidente",
      complemento: null,
      cidade: "Rio Verde",
      estado: "Goiás",
      codIbge: 5218805,
      latitude: "-17.797891",
      longitude: "-50.934310"
    };

    try {
      const data = await fetchData(API_ENDPOINTS.GET_DETAILED_COOPERADO + '5');
      expect(data).toMatchObject(cooperado_example);
    } catch (error) {
      throw error;
    }
  });})

  describe('LOGIN', () => {
    it('deve retornar um Bearer Token apropriado', async () => {
      try {
        const token_object = {
            "access_token": "lnp-Bwtk5bKPo2plnUHaiEOfu3QaZ6NobUV3ofquS36rjXVfTve3q-oqKYqK0c193oiTO0bdxcaLpQHW73PF310t0xBynQk-sRWASTNyMKYwB7g_bnXIl25yEZd9Bnpak45uG5sp2x7dRuGf-SCuhGYVFVzICWfBQxUP-zumCv-1AQMo6gvKw-iduyRoCwrOuMpuKWk0X7HQPloh37AAfqqkm7jggZCZIaL4SI1dKnavlXH7VBY9LiEe6VcCWtpiLV_KU6SFTT8Dn3oupctdYj-bVoUdsb0SRNvaj5DnaRKHaZ-Ibk_L6-cOi1CIeLVP",
            "token_type": "bearer",
            "expires_in": 86399
        }
        const data = await axios.post(API_ENDPOINTS.LOGIN, {
          username: 'DevComigoTeste',
          password: '72Ww09w5*E!c',
        });
        expect(data).toMatchObject(token_object);
      } catch (error) {
        throw error;
      }
    });})

    describe('Teste de Renderização do componente de Login', () => {
      it('deve renderizar corretamente', () => {
        const container: any = render(Login());
    
        expect(
          container.querySelector('#login-form'),
        ).toBeInTheDocument(),
      });
    });

# README - Desafio COMIGO

## Soluções Utilizadas:

- **Gerenciamento de Estado com Redux:** Utilizei Redux para manter o estado da aplicação centralizado e facilitar a manipulação de dados em toda a aplicação.
  
- **Requisições HTTP com Axios:** Utilizei Axios para realizar requisições HTTP assíncronas para buscar e enviar dados para o servidor.

- **Componentes de UI Estilizados com shadcn/ui:** Utilizamos shadcn/ui para criar interfaces de usuário modernas com facilidade.

- **Testes Automatizados com Jest:** Utilizei Jest para escrever testes de entrada, incluindo principalmente as requisições principais do sistema.

- **Validação de Dados com Zod:** Utilizei do Zod para validar dados de entrada e garantir a integridade dos dados manipulados pela aplicação.

- **Gerenciamento de Formulários com react-form:** Utilizei react-form para simplificar o processo de criação e validação de formulários em nossa aplicação.

- **Integração com APIs de Geocoding (Google Maps) e ViaCEP:** Utilizei APIs de Geocoding para converter endereços em coordenadas geográficas e APIs de CEP para obter informações detalhadas de endereços com base no CEP fornecido.

## Ideias para Melhorias Futuras:

Se eu tivesse mais tempo para trabalhar nesta aplicação, algumas ideias que poderiam ser exploradas incluem:

1. **Criação de mais Testes:** Expandir a cobertura de testes na aplicação, criando testes adicionais para garantir uma maior confiabilidade e robustez do código.

2. **Implementação de uma Porta Websocket ao Backend:** Introduzir uma conexão via Websocket entre o frontend e o backend para evitar requisições desnecessárias e permitir uma comunicação em tempo real entre os componentes da aplicação. Isso pode melhorar significativamente o desempenho e a eficiência, especialmente em casos de atualizações frequentes de dados.

3. **Adição de Cache de Dados:** Introduzir um sistema de cache para armazenar dados frequentemente acessados ​​em memória ou em um banco de dados de cache, reduzindo o tempo de resposta e minimizando a carga no servidor.

4. **Otimização de Desempenho:** Realizar otimizações de desempenho, como a redução do tamanho e a compressão de recursos estáticos, otimização de consultas de banco de dados e implementação de técnicas de carregamento lazy para acelerar o carregamento da página.

## Instrução de Uso:

A aplicação consiste em três telas, a de Login, de cooperados (onde é possível visualizar todos os registros de cooperados), e de detalhes de um cooperado em particular. 

Ao selecionar um cooperado da tabela, você será redirecionado para uma tela de edição, onde pode modificar os dados devidamente e enviar a sua solicitação.

Você também tem a opção de utilizar a função 'Adicionar Cooperado', onde será redirecionado para a mesma tela de detalhes, porém com os campos resetados.

Ao realizar o Login, um token de autenticação é guardado pelo sistema, enquanto o token for válido, você continuará logado.

Sobre a tela de edição/criação de cooperado: nesta tela, como dito anteriormente, você pode informar os detalhes do cooperado para fazer a sua solitação. Para informar os dados de endereço, o sistema conta com algumas funcionalidades que facilitam o preenchimento pelo usuário, estes são: busca por cep, quando preenchido o campo de CEP, o usuário pode escolher realizar a busca, que preencherá alguns campos de endereço automaticamente; mapa para seleção exata de local, ao selecionar um local do mapa, os dados de endereço disponíveis serão enviados para o formulário. 

## Executar o Projeto em uma VM limpa:

Para executar este projeto em sua máquina local, utilize o script abaixo:

```bash
#!/bin/sh

# Script de configuração e execução da aplicação Next.js

# Instalar o Git
apt-get update
apt-get install -y git

# Instalar o Node.js e o npm usando NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | sh
. ~/.bashrc
nvm install node

# Clonar o repositório do GitHub
git clone https://github.com/caioValiati/desafio/tree/master

# Entrar no diretório do projeto
cd minha_aplicacao_nextjs

# Instalar as dependências do projeto
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

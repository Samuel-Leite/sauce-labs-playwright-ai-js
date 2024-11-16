# Automação de Testes End-to-End com Playwright


## 🚀 INTRODUÇÃO:

O projeto de automação de testes end-to-end utilizando o framework Playwright, visa fornecer uma estrutura robusta para automatizar testes em aplicações web, com foco na eficiência e na integração contínua e entrega contínua (CI/CD) através da Pipeline do Jenkins e Github Actions. Utilizando as tecnologias mais recentes, como Docker e Docker Compose, juntamente com as melhores práticas de desenvolvimento, este projeto oferece uma solução completa para garantir a qualidade do software em cada etapa do ciclo de desenvolvimento. Como base para os testes, utilizamos a plataforma [Swag Labs](https://www.saucedemo.com/) como template, proporcionando um cenário realista para os casos de teste.
Além disso, como parte do compromisso com a qualidade do código e a consistência no desenvolvimento, implementamos o ESLint e o Prettier, com o objetivo de manter um código limpo, legível e livre de erros, contribuindo para a qualidade geral do projeto.

## 💻 TECNOLOGIAS:

- VS Code
- Node.js
- Java 11
- Playwright
- JavaScript
- CI/CD: Jenkins e Github Actions
- Docker
- Docker Compose

## 🤖 CONFIGURAÇÕES:

- Clonar o projeto na máquina local
- Executar no terminal do diretório do projeto o comando:

```
'npm install'
```

- Informar os dados necessários no arquivo dotEnv:

```
# Selecionar o dispositivo que precisa executar os testes
DEVICE=Pixel 5

# Navegador a ser utilizado durante os testes
BROWSER='chromium'

# Ao executar os testes através do Docker preencher 'true', caso contrário, preencher com 'false'
DOCKER=false

# Selecionar o ambiente que vai executar os testes: 'uat' ou 'prod'
ENV=uat
```
- Executar todos os testes:

```
npm run regression
```

- Executar o teste através de tag:

```
npm run tag '@nome_tag'
```

## 📂 ESTRUTURA DO PROJETO:

| Diretório       | Finalidade                                                                             |
| --------------- | -------------------------------------------------------------------------------------- |
| ./husky         | Configuração da automação dos commits                                                  |
| ./helpers       | Configuração com Custom Commands e Hooks com funções utilizadas na automação           |
| ./resource/conf | Documentos pertinentes a configurações realizadas durante o projeto                    |
| ./resource/data | Credenciais para logar na aplicação                                                    |
| ./tests         | Testes E2E, e pages concernentes aos testes automatizados                              |


## DOCKER
Para executar os testes através do Docker, utilizar os seguintes comandos no terminal do VS Code

- Inicializar o Docker Desktop

- Contruir a imagem do Docker

```
docker build -t {nome_imagem_docker} .
```

- Para removar/excluir a imagem do Docker, execute o comando abaixo:
```
docker rmi {nome_imagem_docker}
```

- Para executar os testes, é através do comando no terminal do VS Code
```
docker run --rm -v "${PWD}/output:/usr/src/app/output" {nome_imagem_docker}
```

## TESTES CONTINUOS ATRAVÉS DO DOCKER COMPOSE - JENKINS

### Configuração:
- Instalar o Docker Compose Desktop,
- Inicializar a imagem do Docker Compose acessando o terminal no diretório executando o seguinte comando:
```
<!-- Construir a imagem do Docker Compose -->
docker build -t my-jenkins .

<!-- Inicializar o Jenkins através do Docker Compose -->
docker compose up -d
```
- Encerrar o Jenkins do Docker Compose, execute o seguinte comando no terminal:
```
docker compose down
```

- Para logar no Jenkins através do Docker Compose, é necessário acessar o seguinte endereço:
```
http://localhost:8080/
```

- Para encontrar a senha gerada pelo Docker para informar na configuração do Jenkins, por favor acessar: Docker Desktop > Volumes > selecionar a imagem do Docker que construiu >
clicar em 'In Use' > pesquisar pelo nome da imagem que construiu do Docker Compose > nos logs vai estar informando a senha

- Prosseguir com a configuração necessária do Jenkins para estar elegível o uso


## CONCLUSÃO:

Ao longo deste projeto, alcançamos diversos objetivos essenciais, desde a construção de testes automatizados até a implementação de uma pipeline de CI/CD eficiente. Utilizando as tecnologias mais recentes e modernas, conseguimos criar uma estrutura sólida e escalável para garantir a qualidade do software.

## 🔗 Links para Apoio:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Hub Docker](https://hub.docker.com/)
- [Jenkins - Configuring Content Security Policy](https://www.jenkins.io/doc/book/security/configuring-content-security-policy/)
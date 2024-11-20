# Automação de Testes End-to-End com Playwright


## 🚀 INTRODUÇÃO:

Este projeto de automação de testes end-to-end utiliza o Playwright para garantir a qualidade das aplicações web, com integração contínua (CI/CD) via Jenkins e Github Actions. Tecnologias como Docker, Docker Compose e Percy são empregadas para melhorar a eficiência dos testes e detectar mudanças visuais inesperadas, assegurando a qualidade geral do desenvolvimento.

## 🌟 DESTAQUES DO PROJETO:
- **Testes Automatizados com Playwright:** Garantia de testes rápidos, robustos e escaláveis em ambientes de navegação real.
- **Integração com Percy:** Detecta mudanças visuais inesperadas e garante a consistência da interface.
- **Docker & Docker Compose:** Criação de ambientes consistentes e isolados para execução de testes, sem necessidade de configuração manual.
- **CI/CD com Jenkins e Github Actions:** Pipeline automatizada que valida cada alteração de código, assegurando entregas contínuas e rápidas.

## 💻 TECNOLOGIAS:

- VS Code
- Node.js
- Java 11
- Playwright
- JavaScript
- CI/CD: Jenkins e Github Actions
- Docker
- Docker Compose
- Percy
- Husky
- Logger Winston

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

## ✅ COMANDOS PARA EXECUTAR OS TESTES:

- Executar todos os testes:

```
npm run regression
```

- Executar o teste através de tag:

```
npm run tag '@nome_tag'
```

- Executar teste regressivo contemplando visual testing (percy):

```
npm run percy
```

## 📂 ESTRUTURA DO PROJETO:

| Diretório              | Finalidade                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------- |
| ./github               | Configuração para executar pipeline do Github Actions                                  |
| ./husky                | Configuração dos commits                                                               |
| ./docker               | Arquivo em zip com as configurações do Docker Compose com Jenkins                      |
| ./helpers/browsers     | configuração personalizada para os navegadores e dispositivos                          |
| ./helpers/dataYaml     | Configurações para ler arquivos YAML                                                   |
| ./helpers/hooks        | Configurações que executam antes e depois de cada teste (@Before, @After)              |
| ./helpers/logger       | Gerenciamento do log Winston para registrar mensagens no console e em arquivo          |
| ./resource/conf        | Gerenciar as URLs de acordo com os ambientes: prod e uat                               |
| ./resource/data        | Credenciais para logar na aplicação de acordo com os ambientes: prod e uat             |
| ./tests/e2e            | Contém os cenários de testes para serem executados                                     |
| ./tests/pages          | Contém pages de acordo com cada página da aplicação Web/UI                             |
| env                    | Variáveis de ambiente                                                                  |
| changelog.config       | Arquivo com os padrões para o commit                                                   |
| docker-compose.yml     | Configuração para rodar dois contêineres Docker: Jenkins e  Docker-in-Docker           |
| Dockerfile             | Cria uma imagem de contêiner que configura um ambiente para rodar testes automatizados |
| Jenkinsfile            | Script para executar pipeline e gerar o relatório Allure                               |


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
- Instalar o Docker Compose Desktop
- Inicializar a imagem do Docker Compose acessando o terminal na pasta `.\docker` executando o seguinte comando:
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

- Para encontrar a senha gerada pelo Docker Compose para informar na configuração do Jenkins, por favor acessar: Docker Desktop > Volumes > selecionar a imagem do Docker que construiu > clicar em 'In Use' > pesquisar pelo nome da imagem que construiu do Docker Compose > nos logs vai estar informando a senha

- Acessar o Jenkins: Abra o Jenkins acessando: `http://localhost:8080/` e finalize o processo de instalação

- Prosseguir com a configuração necessária do Jenkins para estar elegível o uso

- Instalar os plugins: Para executar a Pipeline no Jenkins em um contâiner do Docker, é necessário instalar o plugin 'Docker Pipeline, Docker, Pipeline: Stage View, Blue Ocean, Allure'

- Configurar as credenciais integrado ao Github, deve acessar: Gerenciar Jenkins > Credencials > clicar em System > clicar em Global credentials (unrestricted) > clicar em Add Credentials > após preencher as seguintes informações abaixo > clicar em Create
    - Kind: Username with password
    - Scope: Global (Jenkins, nodes, items, all child items, etc)
    - Username: nome do usuário no repositório 
    - Password: senha do Github

- Configurar o Allure Report, deve acessar: Gerenciar Jenkins > Tools > Allure Commandline instalações > Allure Commandline > preencher as seguintes informações abaixo:
    - Nome: informar o nome para identificar
    - Versão (From Maven Central): selecionar a versão mais recente

- Criar e executar a pipeline do Jenkins referenciando ao Github juntamente com o arquivo Jenkinsfile

## VISUAL TESTING - PERCY
O Percy integrado ao Playwright é uma ferramenta de testes visuais que captura snapshot das páginas durante os testes e compara com versões anteriores para detectar mudanças inesperadas na aparência da aplicação. Para configurar é necessário acessar o [link](https://www.browserstack.com/docs/percy/integrate/playwright) e após a configuração irá visualizar os snapshot através do [link](https://percy.io/).

É necessário configurar o Token do Percy na raiz do projeto através do terminal pelo comando: `$Env:PERCY_TOKEN="web_{codigo_token}"` - o token do percy é gerado após configuração do [link](https://www.browserstack.com/docs/percy/integrate/playwright).

- Comando para executar o visual testing (percy):
```
npx percy exec -- <command to run the test script file>
```

## CONCLUSÃO:

Neste projeto, alcançamos importantes objetivos, como a criação de testes automatizados e a implementação de uma pipeline de CI/CD eficiente. Ao utilizar tecnologias modernas como Playwright, Docker, Docker Compose e Percy, conseguimos construir uma estrutura sólida e escalável para garantir a qualidade contínua do software.

## 🔗 Links para Apoio:
- [Playwright](https://playwright.dev/)
- [Website Percy](https://percy.io/)
- [Configuração do Percy](https://www.browserstack.com/docs/percy/integrate/playwright)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Hub Docker](https://hub.docker.com/)
- [Jenkins - Configuring Content Security Policy](https://www.jenkins.io/doc/book/security/configuring-content-security-policy/)
- [Winston Logger](https://amirmustafaofficial.medium.com/winston-production-level-logger-in-javascript-b77548044764)
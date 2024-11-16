pipeline {
    agent any

    environment {
        PLAYWRIGHT_BROWSERS_PATH = '/ms-playwright'  // Ajuste conforme necessário
    }

    stages {
        stage('Install dependencies') {
            agent {
                docker {
                    image 'node:22.2-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                script {
                    // Exibe versões do Node.js e NPM
                    sh '''
                        node --version
                        npm --version
                        npm install
                        npx playwright install
                    '''
                }
            }
        }

        stage('Run Playwright Tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.35.0-focal'
                    reuseNode true
                }
            }
            steps {
                script {
                    // Executa os testes Playwright com Allure Reporter
                    sh '''
                        npx playwright test --reporter=line,allure
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                // Gera o relatório Allure após os testes
                allure([
                    includeProperties: false,
                    jdk: '', // Deixe em branco para usar a versão padrão do JDK
                    results: 'allure-results'  // Diretório onde os resultados dos testes são salvos
                ])
            }

            // Publica o relatório HTML se necessário
            publishHTML([
                allowMissing: false, 
                alwaysLinkToLastBuild: false, 
                keepAll: false, 
                reportDir: 'output', 
                reportFiles: 'index.html', 
                reportName: 'Playwright Test Report', 
                reportTitles: '', 
                useWrapperFileDirectly: true
            ])
        }
    }
}

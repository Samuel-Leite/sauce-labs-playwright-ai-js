pipeline {
    agent any

    stages {
        stage('Verify Docker Access') {
            steps {
                sh 'docker --version'
                sh 'docker ps'
            }
        }
        stage('Install dependencies') {
            agent {
                docker {
                    image 'node:22.2-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                script {
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
                    image 'mcr.microsoft.com/playwright:v1.48.1'
                    reuseNode true
                }
            }
            steps {
                script {
                    sh '''
                        npx playwright test
                        ls -la allure-results
                    '''
                }
            }
        }
stage('Generate Allure Report') {
            agent {
                docker {
                    image 'frankescobar/allure-docker-service:latest'
                    reuseNode true
                    args '-v /var/jenkins_home/workspace/swag-labs/allure-results:/allure-results -v /var/jenkins_home/workspace/swag-labs/allure-report:/allure-report:z'
                }
            }
            steps {
                script {
                    sh '''
                        mkdir -p /allure-report
                        allure generate /allure-results --clean -o /allure-report
                        ls -la /allure-report
                    '''
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                script {
                    // Verificar se o diretório de relatório foi gerado corretamente
                    sh '''
                        ls -la /allure-report  # Verificar a existência do diretório de relatório
                    '''
                    // Corrigir o comando mv para mover para o local correto
                    sh '''
                        mv /allure-report/* /var/jenkins_home/workspace/swag-labs/allure-report/
                    '''
                }
                allure includeProperties: false, jdk: '', reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-report']]
            }
        }
    }
}
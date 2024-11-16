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
                    image 'mcr.microsoft.com/playwright:v1.35.0-focal'
                    reuseNode true
                }
            }
            steps {
                script {
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
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: 'allure-results'
                ])
            }

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

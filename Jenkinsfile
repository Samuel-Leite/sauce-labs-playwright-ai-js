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
                    args '--user root'
                }
            }
            steps {
                script {
                    sh '''
                        apk add --no-cache wget tar
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
                }
            }
            steps {
                sh 'npx playwright test --reporter=allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh '''
                    wget -qO- https://github.com/allure-framework/allure2/releases/download/2.22.5/allure-2.22.5.tgz | tar -xz -C /tmp
                    /tmp/allure-2.22.5/bin/allure generate allure-results --clean -o allure-report
                '''
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure includeProperties: false, jdk: '', reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-results']]
            }
        }
    }
}
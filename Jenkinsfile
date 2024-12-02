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
                withCredentials([string(credentialsId: 'ZEROSTEP_TOKEN', variable: 'ZEROSTEP_TOKEN')]) {
                    sh '''
                        node --version
                        npm --version
                        export ZEROSTEP_TOKEN=$ZEROSTEP_TOKEN
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
                withCredentials([string(credentialsId: 'ZEROSTEP_TOKEN', variable: 'ZEROSTEP_TOKEN')]) {
                    sh '''
                        export ZEROSTEP_TOKEN=$ZEROSTEP_TOKEN
                        npx playwright test
                    '''
                }
            }
        }
        stage('Generate Allure Report') {
            steps {
                git 'https://github.com/eroshenkoam/allure-example.git'
                sh './gradlew clean test'
            }
            post {
                always {
                    allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                }
            }
        }
    }
}
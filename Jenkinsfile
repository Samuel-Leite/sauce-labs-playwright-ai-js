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
                }
            }
            steps {
                script {
                    sh '''
                        allure generate allure-results --clean -o allure-report
                    '''
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure includeProperties: false, jdk: '', reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-report']]
            }
        }
    }
}
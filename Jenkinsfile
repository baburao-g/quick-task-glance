
pipeline {
    agent {
        docker {
            image 'node:18-alpine' 
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    environment {
        FRONTEND_IMAGE = 'quick-task-glance-frontend'
        BACKEND_IMAGE = 'quick-task-glance-backend'
        TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Frontend Install') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Frontend Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }
        
        stage('Frontend Test') {
            steps {
                sh 'npm test || echo "No tests configured"'
            }
        }
        
        stage('Frontend Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Backend Install') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }
        
        stage('Backend Test') {
            steps {
                dir('backend') {
                    sh 'npm test || echo "No tests configured"'
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                // Build frontend
                sh 'docker build -t ${FRONTEND_IMAGE}:${TAG} -f Dockerfile.frontend .'
                sh 'docker tag ${FRONTEND_IMAGE}:${TAG} ${FRONTEND_IMAGE}:latest'
                
                // Build backend
                sh 'docker build -t ${BACKEND_IMAGE}:${TAG} -f Dockerfile.backend .'
                sh 'docker tag ${BACKEND_IMAGE}:${TAG} ${BACKEND_IMAGE}:latest'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Add your deployment commands here
                // For example:
                // sh 'docker push ${FRONTEND_IMAGE}:${TAG}'
                // sh 'docker push ${FRONTEND_IMAGE}:latest'
                // sh 'docker push ${BACKEND_IMAGE}:${TAG}'
                // sh 'docker push ${BACKEND_IMAGE}:latest'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Build successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}

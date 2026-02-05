#!/bin/bash

# Refined Jiji - Production Deployment Script

set -e  # Exit on any error

echo "🚀 Starting Refined Jiji Production Deployment"
echo "=============================================="

# Configuration
NAMESPACE="refined-jiji-prod"
DOCKER_REGISTRY="refinedjiji"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Function to check prerequisites
check_prerequisites() {
    echo -e "\n${BLUE}Checking prerequisites...${NC}"

    # Check if kubectl is configured
    if ! kubectl cluster-info >/dev/null 2>&1; then
        echo -e "${RED}❌ kubectl is not configured or cluster is not accessible${NC}"
        exit 1
    fi

    # Check if namespace exists, create if not
    if ! kubectl get namespace $NAMESPACE >/dev/null 2>&1; then
        echo "Creating namespace $NAMESPACE..."
        kubectl create namespace $NAMESPACE
    fi

    echo -e "${GREEN}✅ Prerequisites check passed${NC}"
}

# Function to deploy infrastructure
deploy_infrastructure() {
    echo -e "\n${BLUE}Deploying infrastructure...${NC}"

    # Deploy namespace
    echo "Deploying namespace..."
    kubectl apply -f k8s/production/namespace.yaml

    # Deploy ConfigMaps and Secrets
    echo "Deploying configuration..."
    kubectl apply -f k8s/production/config.yaml

    # Deploy database
    echo "Deploying PostgreSQL..."
    kubectl apply -f k8s/production/database.yaml

    # Wait for database to be ready
    echo "Waiting for PostgreSQL to be ready..."
    kubectl wait --for=condition=ready pod -l app=postgres -n $NAMESPACE --timeout=300s

    # Deploy Redis
    echo "Deploying Redis..."
    kubectl apply -f k8s/production/redis.yaml

    # Wait for Redis to be ready
    echo "Waiting for Redis to be ready..."
    kubectl wait --for=condition=ready pod -l app=redis -n $NAMESPACE --timeout=60s

    echo -e "${GREEN}✅ Infrastructure deployed${NC}"
}

# Function to deploy application
deploy_application() {
    echo -e "\n${BLUE}Deploying application...${NC}"

    # Deploy backend
    echo "Deploying backend..."
    kubectl apply -f k8s/production/backend.yaml

    # Wait for backend to be ready
    echo "Waiting for backend to be ready..."
    kubectl wait --for=condition=ready pod -l app=backend -n $NAMESPACE --timeout=300s

    # Deploy webapp
    echo "Deploying webapp..."
    kubectl apply -f k8s/production/webapp.yaml

    # Wait for webapp to be ready
    echo "Waiting for webapp to be ready..."
    kubectl wait --for=condition=ready pod -l app=webapp -n $NAMESPACE --timeout=300s

    echo -e "${GREEN}✅ Application deployed${NC}"
}

# Function to deploy ingress and monitoring
deploy_networking() {
    echo -e "\n${BLUE}Deploying networking and monitoring...${NC}"

    # Deploy ingress
    echo "Deploying ingress..."
    kubectl apply -f k8s/production/ingress.yaml

    # Deploy monitoring (optional - comment out if not needed)
    echo "Deploying monitoring stack..."
    # kubectl apply -f k8s/production/monitoring.yaml

    echo -e "${GREEN}✅ Networking deployed${NC}"
}

# Function to run health checks
run_health_checks() {
    echo -e "\n${BLUE}Running health checks...${NC}"

    # Check backend health
    if kubectl exec -n $NAMESPACE deployment/refined-jiji-backend -- curl -f http://localhost:5000/health >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend health check passed${NC}"
    else
        echo -e "${RED}❌ Backend health check failed${NC}"
        exit 1
    fi

    # Check webapp health
    if kubectl exec -n $NAMESPACE deployment/refined-jiji-webapp -- curl -f http://localhost:3000/api/health >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Webapp health check passed${NC}"
    else
        echo -e "${RED}❌ Webapp health check failed${NC}"
        exit 1
    fi

    echo -e "${GREEN}✅ All health checks passed${NC}"
}

# Function to display deployment status
show_status() {
    echo -e "\n${BLUE}Deployment Status${NC}"
    echo "=================="

    echo -e "\nPods:"
    kubectl get pods -n $NAMESPACE

    echo -e "\nServices:"
    kubectl get services -n $NAMESPACE

    echo -e "\nIngress:"
    kubectl get ingress -n $NAMESPACE

    echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Update DNS records to point to your ingress IP"
    echo "2. Configure SSL certificates"
    echo "3. Set up monitoring alerts"
    echo "4. Run database migrations if needed"
    echo "5. Test the application thoroughly"
}

# Main deployment flow
main() {
    check_prerequisites
    deploy_infrastructure
    deploy_application
    deploy_networking
    run_health_checks
    show_status
}

# Run main function
main "$@"
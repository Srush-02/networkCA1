# Automated Container Deployment and Administration in the Cloud

## Automated HealthCare App Deployment on Azure using AWS CloudFormation, EC2 instance, Ansible, Docker & GitHub Actions.

Project structure:


Step 1: Code commited to github repository 
Step 2: A GitHub Actions workflow will automatically triggered by pushing the code on specif branch/ main.
        This image push to ECR.
Step 3: We have defined ansible yml file which excuted by .gitHub/workflows
 Triggered ansible file generated playBook file which will connected to server and performed some events such as:
 3.1 Installing required dependencies with adding docker's official key
 3.2 Instaling Docker on EC2 via script
 3.3 Enabling and starting the Docker service 
  After code deployment on EC2, Docker pulls created images from ECR to run the containers.
Step 4: WE have added docker compose file to manage multiple docker container application. We are using inventory yml file how    to connect using SSH key and which server Ansible hosts will run on defined task.
Step 5: Docker is ready to run applications which is defined in Dockerfiles.
Step 6: Using AWS instance public IP, docker container runs on EC2 instance to run web application.

1.To create stack :
aws cloudformation create-stack \
  --stack-name MyEC2Stack \
  --template-body file://Ec2WithDockerInstll.yaml \
  --parameters ParameterKey=KeyName,ParameterValue=srushti-ec2-keyPair \
  --capabilities CAPABILITY_NAMED_IAM

2.This yml runs automatically on gitHub action for deployement to Ec2 instance and run Ansible playBook.
name: Deploy to EC2 via Ansible

on:
  push:
    branches:
      - main  # or your target branch
  workflow_dispatch:  # Allow manual trigger

jobs:
  deploy:
    name: Ansible Deploy
    runs-on: ubuntu-latest

    env:
      EC2_HOST: ${{ secrets.EC2_HOST }}
      PRIVATE_KEY: ${{ secrets.EC2_PRIVATE_KEY }}
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Install dependencies
        run: |
          sudo apt update
          sudo apt install -y python3-pip
          pip install ansible boto3 botocore

      - name: Prepare SSH key
        run: |
          echo "$PRIVATE_KEY" > ansible/temp_key.pem 
          chmod 400 ansible/temp_key.pem

      - name: Run Ansible Playbook
        working-directory: ./ansible
        env:
          ANSIBLE_HOST_KEY_CHECKING: "False"
        run: |
          ansible-playbook -i inventory.yaml deploy.yaml

      - name: Clean up SSH key
        if: always()
        run: rm -f ansible/temp_key.pem


        version: "3.9"

services:
  web80:
    image: 668426476528.dkr.ecr.eu-west-1.amazonaws.com/srh/webui:latest
    ports:
      - "80:80"
    restart: always

  web8080:
    image: 668426476528.dkr.ecr.eu-west-1.amazonaws.com/srh/deploy:latest
    ports:
      - "8082:8082"
    restart: always


    3.Docker compose :
    version: "3.9"

services:
  web80:
    image: 668426476528.dkr.ecr.eu-west-1.amazonaws.com/srh/webui:latest
    ports:
      - "80:80"
    restart: always

  web8080:
    image: 668426476528.dkr.ecr.eu-west-1.amazonaws.com/srh/deploy:latest
    ports:
      - "8082:8082"
    restart: always
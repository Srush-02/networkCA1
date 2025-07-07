Step 1: Code commited to github repository 
Step 2: A GitHub Actions workflow will automatically triggered by pushing the code on specif branch/ main.
Step 3: We have defined ansible yml file which excuted by .gitHub/workflows
 Triggered ansible file generated playBook file which will connected to server and performed some events such as:
 3.1 Installing required dependencies with adding docker's official key
 3.2 Instaling Docker on EC2 via script
 3.3 Enabling and starting the Docker service 
Strip 4: Docker is ready to run applications which is defined in Dockerfiles .

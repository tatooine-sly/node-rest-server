# WebServer + RestServer
[Curso Node: De cero a experto, Fernando Herrera](
https://www.udemy.com/course/node-de-cero-a-experto/)


Ejecutar ```npm install``` para reconstruir los módulos de node.


## Despliegue en AWS

### Conexión con AWS:
```ssh -i "AWS_tests.pem" ec2-user@ec2-54-209-135-217.compute-1.amazonaws.com```

### Instalaciones

```bash 
# install git
sudo yum install git

# Install and run nvm
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm install v16.15.1

# Check node version
node -v

# Clone repository
git clone https://github.com/tatooine-sly/node-rest-server.git

# Install modules and run app
cd node-rest-server/
npm install -g nodemon
npm install
nodemon app
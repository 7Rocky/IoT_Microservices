# IoT_Microservices

## Before you begin

You'll need to have at least Kubernetes (Minikube) and Docker installed on your machine to run the application.

If you want to modify the application, you may need to install the following:

* [Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
* Docker ([Docker Desktop](https://www.docker.com/products/docker-desktop) and a [Docker Hub](https://hub.docker.com) account)
* [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm)
* Java Development Kit: [jdk8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [Arduino IDE](https://www.arduino.cc/en/main/software)

## 1. Clone the repository

```
git clone https://github.com/7Rocky/IoT_Microservices.git
cd IoT_Microservices
```

## 2. Develop Node.js microservices

There are two microservices developed on Node.js: [temperature-ms](https://github.com/7Rocky/IoT_Microservices/tree/master/temperature-ms) and [orchestrator-ms](https://github.com/7Rocky/IoT_Microservices/tree/master/orchestrator-ms). You will need to execute the following commands to run the microservice locally:

```
cd temperature-ms
npm install
npm start
```

## 3. Develop Angular microservice

There is one microservice developed on Angular: [angular-ms](https://github.com/7Rocky/IoT_Microservices/tree/master/angular-ms). You will need to execute the following commands to run the microservice locally:

```
cd angular-ms/iot-app
npm install
npm start
```

This will open your web browser on `http://localhost:4200` and watch for changes you make.

To build the application for production, execute:

```
npm run build
```

This command will generate bundle files on a `dist` folder.

## 4. Develop Java microservice

There is one microservice developed on Java: [humidity-ms](https://github.com/7Rocky/IoT_Microservices/tree/master/humidity-ms). You will need to execute the following commands to run the microservice locally:

```
cd humidity-ms
./mvnw spring-boot:run
```

This will start a process listening on port 8080.

To build de application on a JAR file, run:

```
./mvnw clean package
```

This will generate a JAR file in a directory called `target`.

## 5. Program Arduino board

You will need to use Arduino IDE and open [main.ino](https://github.com/7Rocky/IoT_Microservices/tree/master/arduino-iot/main/main.ino) file. I recommend using [Arduino Uno WiFi Rev2](https://store.arduino.cc/arduino-uno-wifi-rev2) and [Grove Temperature sensor](https://store.arduino.cc/grove-temperature-sensor), which are the ones I've been using in this project. Otherwise, you may use another Arduino board that supports WiFi connection or find a WiFi module.

You will have to add your WiFi SSID and password to the [main-template.h](https://github.com/7Rocky/IoT_Microservices/tree/master/arduino-iot/main/main-template.h) file, as well as the IP address and port you desire your Arduino to listen on. Then, change the filename to simply `main.h`.

Finally, upload the program to your Arduino board.

## 6. Use Docker

To build a Docker image and run it locally, you will need to have Docker running and to be placed in the same directory of a Dockerfile:

```
docker build -t my-new-image .
docker run -p 4000:4000 my-new-image
```

Note: `-p 4000:4000` argument is mapping the listening port on the container application to a port on your machine.

You will need to push your image to Docker Hub to deploy it on Kubernetes:

```
docker build -t <your-username>/my-new-image .
docker push <your-username>/my-new-image
```

## 7. Deploy the application with Kubernetes

At first, you need to start Minikube:

```
minikube start
```

There is a directory called [manifests-k8s](https://github.com/7Rocky/IoT_Microservices/tree/master/manifests-k8s) where you can find all YAML files to create Deployments and Services for each microservice. For example, run:

```
cd manifests-k8s
kubectl apply -f angular-ms.yaml
kubectl apply -f orchestrator-ms.yaml
kubectl apply -f temperature-ms.yaml
kubectl apply -f humidity-ms.yaml
```

If you go now to `http://192.168.99.100:31600/` you will see the Angular application. In case your Minikube IP address is different, you can run the following command:

```
minikube service angular-ms
```

## 8. Deploy your own Docker images on Kubernetes

Take a look at the YAML files and note that there is a property called `image: 7rocky/<name-of-the-image>`. You will need to change `7rocky` for your username, and put the name of the Docker image you want to deploy (the image must be uploaded to [Docker Hub](https://hub.docker.com)).

There are some microservices that need the Arduino IP address. For that, Kubernetes offers the possibility to configure environment variables. For example:

```
...
env:
- name: ARDUINO
  value: 192.168.1.50
...
```

So, if you modify the IP address on the Arduino project, do not forget to change it on the YAML files.

## 9. Stop the application

First, delete all deployments and services running on Kubernetes:

```
kubectl delete deployment angular-ms orchestrator-ms temperature-ms humidity-ms
kubectl delete service angular-ms orchestrator-ms temperature-ms humidity-ms 
```

Use `kubectl get all` to check there are no instances running.

Then, execute `minikube stop` to finish the process.

If there are Docker containers running, run `docker ps -a` and see the container IDs:

```
docker rm <container-id>
```

If you want to delete a Docker image, run `docker images` and see the image IDs:

```
docker rmi <image-id>
```

## Recommendations

For developing and producing this application, [Visual Studio Code](https://code.visualstudio.com) is a great tool to do it. These extensions are really useful for this project:

* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
* [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
* [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot) and [Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
* [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

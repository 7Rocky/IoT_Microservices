# IoT_Microservices

You may check the web application at: https://iot-microservices.eu-gb.mybluemix.net.

## Before you begin

You'll need to have at least Kubernetes (Minikube) and Docker installed on your machine to run the application.

If you want to modify the application, you may need to install the following:

* [Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
* Docker ([Docker Desktop](https://www.docker.com/products/docker-desktop) and a [Docker Hub](https://hub.docker.com) account)
* [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm)
* [Go](https://golang.org/dl/)
* [Python](https://www.python.org/downloads/)
* [Arduino IDE](https://www.arduino.cc/en/main/software)

## 1. Clone the repository

```bash
git clone https://github.com/7Rocky/IoT_Microservices.git
cd IoT_Microservices
```

## 2. Develop Node.js microservices

There are four microservices developed on Node.js: [measure-ms](https://github.com/7Rocky/IoT_Microservices/tree/master/measure-ms), [microcontrollers-ms](https://github.com/7Rocky/IoT_Microservices/tree/master/microcontrollers-ms), [orchestrator-ms](https://github.com/7Rocky/IoT_Microservices/tree/master/orchestrator-ms) and [publisher-ms](https://github.com/7Rocky/IoT_Microservices/tree/master/publisher-ms). You will need to execute the following commands to run the microservice locally:

```bash
cd measure-ms
npm install
npm run dev
```

You can test each Node.js microservice using this command:

```bash
npm test
```

If you are not using an Arduino board, you can mock it using the [fake-arduino-iot](https://github.com/7Rocky/IoT_Microservices/tree/master/fake-arduino-iot) Node.js application. For this task, run `npm install` and `npm start` at this directory.

## 3. Develop Angular microservice

There is one microservice developed on Angular: [angular-ms](https://github.com/7Rocky/IoT_Microservices/tree/master/angular-ms). You will need to execute the following commands to run the microservice locally:

```bash
cd angular-ms/iot-app
npm install
npm start
```

These commands will open your web browser on `http://localhost:4200` and watch for changes you make.

To build the application for production, execute:

```bash
npm run build
```

This command will generate bundle files on a `dist` folder.

## 4. Develop Go microservice

There is one microservice developed in Go: [auth-ms](https://github.com/7Rocky/IoT_Microservices/tree/master/auth-ms). You will need to execute the following commands to run the microservice locally:

```bash
cd auth-ms/src
go mod download
go run main.go
```

This will start a process listening on port 5000.

To build de application to an executable file, run:

```bash
go build -o main
```

## 5. Develop Python microservice

First, you must install the project dependencies using:

```bash
cd stats-ms
pip install -r requirements
```

And then, run the application:

```bash
python -m src
```

To test the application, use:

```bash
python -m unittest discover
```

## 6. Program Arduino board

You will need to use Arduino IDE and open [main.ino](https://github.com/7Rocky/IoT_Microservices/tree/master/arduino-iot/main/main.ino) file. I recommend using [Arduino Uno WiFi Rev2](https://store.arduino.cc/arduino-uno-wifi-rev2), [Grove Temperature sensor](https://store.arduino.cc/grove-temperature-sensor) and [Grove Moisture sensor](https://store.arduino.cc/grove-moisture-sensor), which are the ones I've been using in this project. Otherwise, you may use another Arduino board that supports WiFi connection or find a WiFi module.

You will have to add your WiFi SSID and password to the [main-template.h](https://github.com/7Rocky/IoT_Microservices/tree/master/arduino-iot/main/main-template.h) file, as well as the IP address and port you desire your Arduino to listen on. Then, change the filename to simply `main.h`.

Finally, upload the program to your Arduino board.

## 9. Use Docker

To build a Docker image and run it locally for testing, you will need to have Docker running and to be placed in the same directory of a Dockerfile:

```bash
docker build -t my-new-image .
docker run -p 4000:4000 my-new-image
```

**Note**: `-p 4000:4000` argument is mapping the listening port on the container application to a port on your machine.

You will need to push your image to Docker Hub to deploy it on Kubernetes later:

```bash
docker build -t <your-username>/my-new-image .
docker push <your-username>/my-new-image
```

## 8. Deploy the application with Kubernetes

At first, you need to start Minikube:

```bash
minikube start
```

There is a directory called [manifests-k8s](https://github.com/7Rocky/IoT_Microservices/tree/master/manifests-k8s) where you can find all YAML files to create Deployments and Services for each microservice. For example, run:

```bash
cd manifests-k8s
kubectl apply -f config
kubectl apply -f prod
```

**Note**: The order is important because some microservices depend on others existence.

If you go now to `http://192.168.99.100:31600/` you will see the Angular application. In case your Minikube IP address is different, you can run the following commands:

```bash
minikube service angular-ms
```

```bash
minikube ip
```

To use database services locally, there are `mongo-dev.yaml`, `mysql-dev.yaml` and `rabbitmq-dev.yaml` (in a folder called `/dev`), which can be accessed from a NodePort. The microservices code are aware of dev/prod environments, you will not need to configure anything presumably.

Kubernetes offers the possibility to configure environment variables. All relevant environment variables are placed in [env-configmap.yaml](https://github.com/7Rocky/IoT_Microservices/tree/master/manifests-k8s/config/env-configmap.yaml) and [secrets.yaml](https://github.com/7Rocky/IoT_Microservices/tree/master/manifests-k8s/config/secrets.yaml).

## 9. Deploy your own Docker images on Kubernetes

Take a look at the YAML files and note that there is a property called `image: 7rocky/<name-of-the-image>`. You will need to change `7rocky` for your username, and put the name of the Docker image you want to deploy (the image must be uploaded to [Docker Hub](https://hub.docker.com)).

However, if you just want to try the application, you are allowed to use the images that are already set, because they are accesible from Docker Hub.

## 10. Stop the application

First, delete all deployments and services running on Kubernetes:

```bash
kubectl delete -f prod
```

**Note**: If you delete [pvc-k8s](https://github.com/7Rocky/IoT_Microservices/tree/master/manifests-k8s/config/pvc-k8s) files, the data stored in the corresponding database will be erased. Deleting its Service or StatefulSet will not affect to the data storage.

Use `kubectl get all` to check there are no instances running.

Then, execute `minikube stop` to finish the process.

If there are Docker containers running, run `docker ps -a` and see the container IDs:

```bash
docker rm <container-id>
```

If you want to delete a Docker image, run `docker images` and see the image IDs:

```bash
docker rmi <image-id>
```

## Recommendations

For developing and producing this application, [Visual Studio Code](https://code.visualstudio.com) is a great tool to do it. These extensions are really useful for this project:

* [Anaconda Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-python.anaconda-extension-pack)
* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
* [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
* [Go](https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go)
* [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
* [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

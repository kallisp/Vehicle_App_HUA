# README #

## Introduction ##

* Vehicle Transfer Application | Front-end and Application Gateway component

# Run the app in development mode #

* Manually Install node.js

* #### `npm init`
* #### `npm install`
* #### `npm start`

</br >

* change apiURL value for development mode in config.js

* Open http://localhost:3000 to view it in the browser.

###  GET Endpoints
* Register page http://localhost:3000/sign-up
* Login page http://localhost:3000/login
* User's home page http://localhost:3000/citizen-dashboard
* Employee's home page http://localhost:3000/employee-applications

</br >

# Run the app in production mode #

# **Docker**

## Create docker image from frontend.Dockerfile and tag it with a name
```bash
* docker build -f frontend.Dockerfile . --tag react-nginx:latest
```

## Create container from specific image
```bash
* docker run -d -p 3000:80 -d --name react-nginx:latest
```

## Shell access into a container 
```bash
* docker exec -it <container-id> sh
```

## Upload images on Github Packages 
```bash
* docker build -t ghcr.io/kallisp/react-nginx:latest -f frontend.Dockerfile .
```

## Push to github repository
```bash
docker push ghcr.io/kallisp/react-nginx:latest
```

</br >

# **Deploy the project to a kubernetes cluster**

## kubectl alias
```bash
echo "alias k=microk8s.kubectl" >> ~/.profile
source ~/.profile
```

## Apply/Delete all components' yml files from k8s folder or separately

* **db** 
```bash
    k apply -f k8s/db | k delete -f k8s/db

    k apply -f k8s/postgres-configmap.yaml
    k apply -f k8s/postgres-pvc.yml
    k apply -f k8s/postgres-deployment.yml
    k apply -f k8s/postgres-clip.yml
```

* **node-server**
```bash
    k apply -f k8s/node-server | k delete -f k8s/node-server

    k apply -f k8s/node-server-configmap.yml
    k apply -f k8s/node-server-deployment.yml
    k apply -f k8s/node-server-clip.yml
```

* **mail-server**
```bash
    k apply -f k8s/mail-server | k delete -f k8s/mail-server

    k apply -f k8s/mail-server-configmap.yml
    k apply -f k8s/mail-server-deployment.yml
    k apply -f k8s/mail-server-clip.yml
```

* **client**
```bash
    k apply -f k8s/client | k delete -f k8s/client

    k apply -f k8s/client-deployment.yml
    k apply -f k8s/client-clip.yml
```

* **ingress**
```bash
    k apply -f k8s/ingress | k delete -f k8s/ingress

    k apply -f k8s/client-ingress-ssl.yml
```

## kubectl useful commands when apply yml files to check if the components are up and running

```bash
k get nodes | k get nodes -o wide
k get pods | k get pods -o wide
k get deployments | k get deployments -o wide
k get svc | k get svc -o wide
k get secrets
k describe pod --pod-name
k logs -f --pod-name
```
</br >

# Examples

```bash
k get pods 

NAME                                      READY   STATUS    RESTARTS   AGE
mail-server-deployment-8587f88795-j5klc   1/1     Running   3          47h
client-deployment-69559cbb46-hwwjv        1/1     Running   4          2d22h
postgresdb-55d4bb54d4-5bcjn               1/1     Running   4          2d22h
node-server-deployment-7dd7f5476f-8tcjd   1/1     Running   3          47h
```

```bash
k get deployments 

NAME                     READY   UP-TO-DATE   AVAILABLE   AGE
mail-server-deployment   1/1     1            1           47h
client-deployment        1/1     1            1           2d22h
postgresdb               1/1     1            1           2d22h
node-server-deployment   1/1     1            1           47h
```

```bash
k get svc 

NAME             TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes       ClusterIP      10.152.183.1     <none>        443/TCP          5d
db               ClusterIP      10.152.183.152   <none>        5432/TCP         4d3h
client-clip      ClusterIP      10.152.183.170   <none>        3000/TCP         4d
server-service   LoadBalancer   10.152.183.155   <pending>     8000:30102/TCP   3d
mail             ClusterIP      10.152.183.116   <none>        5000/TCP         45h
```

```bash
k get cm

NAME                 DATA   AGE
kube-root-ca.crt     1      5d
postgres-config      3      4d3h
node-server-config   5      4d2h
mail-server-config   2      47h
```

```bash
k get pvc

NAME           STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS        AGE
pg-pvc-claim   Bound    pvc-a688059d-71b2-4a7f-82bb-6651c0f48796   1Gi        RWO            microk8s-hostpath   2d22h
```

```bash
k get ing

NAME                  CLASS    HOSTS                ADDRESS     PORTS     AGE
ingress-service-ssl   public   kspyrou.cloudns.cl   127.0.0.1   80, 443   2d22h
```

```bash
k get secrets

NAME                                 TYPE                                  DATA   AGE
default-token-jk7dv                  kubernetes.io/service-account-token   3      5d
dockerconfigjson-github-com          kubernetes.io/dockerconfigjson        1      4d20h
tls-secret                           Opaque                                3      4d18h
dockerconfigjson-github-com-server   kubernetes.io/dockerconfigjson        1      4d4h
```

</br >

# **Use case scenarios**

## App URL
https://kspyrou.cloudns.cl

-- SSL Certificate expires on **Jul 13, 2021**

</br >

## Accounts
### Employee: 
username: mariap \
password: maria123 \
email: vehicle.app.hua@gmail.com | password: vehicleapp123 

</br >

### Citizen: 
* User1 \
username: ellenk \
password: ellen123 \
email: vehicle.user.hua@gmail.com | password: vehicleuser123

* User2 \
username: giannis \
password: giannis123 \
email: vehicle.user2.hua@gmail.com | password: vehicleuser123







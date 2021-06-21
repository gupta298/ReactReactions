# SmartWardrobe

In order to run you need to install `Docker` and `docker-compose` and take the following steps:

* Clone this respository
* Create the file server/src/firebase/credentials.json
* Create the file frontend/src/firebaseConfig.json with the configuration that you app needs to contact the firebase authentication server.
* Then run `docker-compose build`
* And finally `docker-compose up`

When the `server` and the `frontend` finish to load you should be able to contact the frontend at [this address](localhot:3000/login)
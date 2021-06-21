FROM node:16.3.0


RUN mkdir -p /app
WORKDIR /app

# Install packages for creatin server
RUN npm init -y
RUN npm install express cors
RUN npm install -D nodemon
RUN npm install -g json
RUN npm install -g body-parser

# change app name and add start script to package.json file
RUN json -I -f package.json -e "this.name='reactreactions-server'"
RUN json -I -f package.json -e "this.scripts.start='nodemon index.js'"


ADD src /app

#ENTRYPOINT [ "sleep", "infinity" ]
ENTRYPOINT ["npm","run","start"]
FROM node:alpine as builder

#set working directory

WORKDIR /var/www/app
#copy package.json to working dir to prevent reinstallation
#of npm packages 
COPY package.json yarn.lock ./

#run package installations
RUN yarn install

#copy the project into the working dir
COPY . /var/www/app




EXPOSE 3000

CMD ["yarn","start"]

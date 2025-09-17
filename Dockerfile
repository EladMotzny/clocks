#Specify the Node version
FROM node:22.18.0

#Sets the context for all the commands that comes after
WORKDIR /app

#Copy the package files to the container
COPY package*.json ./

#And install all of the dependencies
RUN npm install

#Copy all the files of our project into the container /app folder
COPY . .

#Run on port 3000
EXPOSE 3000

#Start the dev server
CMD npm run dev
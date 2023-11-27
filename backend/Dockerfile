# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Expose the port the app runs on
<<<<<<< HEAD
EXPOSE 8080
=======
EXPOSE 3000
>>>>>>> 31326cd9a969e11594653d5050510b485fa2e3df


# Define the command to run your app
CMD ["npm", "start"]
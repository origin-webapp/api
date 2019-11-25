# First line is FROM what base image
FROM node:8

# Copy package JSONfile from our machine into the docker container
# The * just ensures package and package-lock are copied
COPY package*.json ./

# Install node packages
RUN npm install

# Copy the rest of the projects code
COPY . .

# Port this is just specifing what ports should be accessible
# the -p command while running the container to publish the port
EXPOSE 3000

# Set up environment variables, you could also use ARG and require those arguments to be passed into the dockerfile from the host
ENV PORT 3000

# execute this line when instance is created form the image
# could also use ENTRYPOINT
CMD ["npm", "run", "deploy"]

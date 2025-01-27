# Use the official MongoDB image from Docker Hub
FROM mongo:8.0.4

# Set the working directory inside the container
WORKDIR /data/db

# Copy the custom MongoDB configuration file
COPY ./docker/mongodb/mongod.conf /etc/mongod.conf

# Expose the default MongoDB port
EXPOSE 28017

# Command to run MongoDB
CMD ["mongod", "--config", "/etc/mongod.conf"]
# Use the latest Node.js image
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY ./yarn.lock ./

# Install dependencies
RUN yarn install

COPY ../../ ./

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["yarn", "dev"]
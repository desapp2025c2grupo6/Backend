FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies (including devDependencies needed for build)
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build transpiled files
RUN npm run build

EXPOSE 3001

# Start the server (uses dist/bin/www)
CMD ["npm", "run", "server"]

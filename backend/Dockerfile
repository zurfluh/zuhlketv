FROM node:6

# Install app dependencies
COPY package.json /app/package.json
RUN cd /app; npm install

# Copy secrets (even just for the example)
COPY .env.example /app/.env.example

# "Install" app
COPY dist /app/dist

WORKDIR /app
EXPOSE 4000

CMD ["node", "/app/dist/server.js"]

# build this (in the same folder than this file):
# sudo docker build -t tvbrowser-backend .

# preparation for run (execute just once)
# sudo docker network create tvbrowser

# run this:
# sudo docker run -p 4000:4000 --network tvbrowser --name tvbrowser-backend tvbrowser-backend

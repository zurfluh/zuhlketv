FROM node:6

# Install app dependencies
COPY package.json /app/package.json
RUN cd /app; npm install

# Use yarn to serve
RUN npm install -g yarn
RUN yarn global add serve

# "Install" app
COPY build /app/build

WORKDIR /app
EXPOSE 3000

CMD ["serve", "-s", "build"]

# build this (in the same folder than this file):
# sudo docker build -t tvbrowser-frontend .

# preparation for run (execute just once, you probably already did this for the backend)
# sudo docker network create tvbrowser

# run this:
# sudo docker run -p 5000:5000 --network tvbrowser --name tvbrowser-frontend tvbrowser-frontend


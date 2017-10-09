# Frontend

- Install [Node.js](https://nodejs.org/en/)
- (Install [VS Code](https://code.visualstudio.com/))
- Install dependencies
```
npm install
```

Run in development mode - port 3000
```
npm start
```

Build a production version, which will be put into a **build** folder.
```
npm run build
```

## Docker

build this (in the same folder than this file):
```
sudo docker build -t florianbesser/tvbrowser-frontend .
```

preparation for run (execute just once, you probably already did this for the backend)
```
sudo docker network create tvbrowser
```

run this:
```
sudo docker run -p 5000:5000 --network tvbrowser --name tvbrowser-frontend florianbesser/tvbrowser-frontend
```

or run as daemon mounting the config from the host file system:
```
docker run -d -p 80:5000 -v /home/myuser/config.js:/app/build/config.js --name tvbrowser-frontend florianbesser/tvbrowser-frontend
```

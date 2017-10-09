# Backend

- Install [Node.js](https://nodejs.org/en/)
- (Install [VS Code](https://code.visualstudio.com/))
- Install dependencies
```
npm install
```

Run in development mode - port 4000
```
npm start
```

Build a production version
```
npm run build
```

## Docker

build this (in the same folder than this file):
```
sudo docker build -t florianbesser/tvbrowser-backend .
```

preparation for run (execute just once)
```
sudo docker network create tvbrowser
```

run this:
```
sudo docker run -p 4000:4000 --network tvbrowser --name tvbrowser-backend florianbesser/tvbrowser-backend
```

or run as daemon:
```
docker run -d -p 80:4000 --name tvbrowser-backend florianbesser/tvbrowser-backend
```

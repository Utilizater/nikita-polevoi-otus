import express, { Application, Request, Response } from 'express';
import socketio from 'socket.io';
import http from 'http';
import path from 'path';
import fs from 'fs';

const PORT = 3000;

const app: Application = express();
const server = http.createServer(app);
//@ts-ignore
const io = socketio(server);

app.use(express.static('public'));

app.get('/route', async (req: Request, res: Response) => {
  const fileData = await fs.promises.readFile(
    path.resolve('dataBase', 'database.txt'),
    'utf-8'
  );

  res.send(fileData.split('\n').filter((el) => el));
});

io.on('connection', (socket) => {
  console.log('New web socket connection');
  socket.on('sendLocation', (message, callback) => {
    const data: string = message.latitude + ':' + message.longitude + '\n';
    try {
      fs.appendFile(path.resolve('dataBase', 'database.txt'), data, () => {});
    } catch (err) {
      console.log(err);
    }
  });
});

server.listen(PORT, () => {
  console.log(`server is run on ${PORT} port`);
});

//to make web socket connection - done
//to make ui approach where user start and stop tracking regime - done
//to get and store on server (to json file) lat and lon. - done
//send rout array from back to front - done
//add clean data base function

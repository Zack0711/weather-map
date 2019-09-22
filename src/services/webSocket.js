import { WebSocket, Server } from 'mock-socket';

window.WebSocket = WebSocket;

const wsUri = "ws://echo.websocket.org/";

/*
const mockServer = new Server(wsUri);

mockServer.on('connection', socket => {
  socket.on('message', () => {
  	console.log('XDD')
  });
  socket.on('close', () => {});
  socket.send('message!!');
  socket.close();
});
*/

//mockServer.emit('room', 'XD')

const chatRoomSocket = new WebSocket(wsUri);

chatRoomSocket.onopen = (e) => { console.log(e) };
chatRoomSocket.onclose = (e) => { console.log(e) };
chatRoomSocket.onmessage = (e) => { 
	console.log(e.data)
};
chatRoomSocket.onerror = (e) => { console.log(e) };

export {
	chatRoomSocket,
}
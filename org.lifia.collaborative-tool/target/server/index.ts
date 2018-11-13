import Server from './server';
import * as http from 'http';
import EventDispatcher from  './src/events/event.dispatcher';

const serverExpress = Server.init(3000);
const server = http.createServer(serverExpress.app);
const eventDispatcher = new EventDispatcher(server);

server.listen(3000, () => {
	console.log(`Server started on port ${server.address().port}`);
});

export default eventDispatcher;

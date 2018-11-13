import * as socketIO from 'socket.io';
import * as http from 'http';
import awarenessController from  '../controllers/awareness.controller';
import processContextController from  '../controllers/process-context.controller';

export default class EventDispatcher {

	private io: socketIO.Server;
	public socket: socketIO.Socket;

	constructor(private server: http.Server) {
		this.io = socketIO.listen(server);
		this.init();
	}

	init() {
		this.io.on('connection', (socket: SocketIO.Socket) => {
			console.log("New socket connected");
			this.subscribeMoverFicha(socket);

		});


		this.io.sockets.emit("broadcast", {data: 'Hola'});
	}

	getSocket(): socketIO.Server {
		return this.io;
	}

	subscribeMoverFicha(socket: SocketIO.Socket) {
		this.socket = socket;
		socket.on("event", (data: any) => {
			var idRoom = processContextController.findUserRoom(data.user).then(context => {
				console.log("idRoom --->>>", context);
				this.io.in(context._id).emit('moverficha', 'HOLA MUNDO');
			});
		});
	}

}

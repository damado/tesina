/// <reference types="socket.io" />
/// <reference types="node" />
import * as socketIO from 'socket.io';
import * as http from 'http';
export default class EventDispatcher {
    private server;
    private io;
    socket: socketIO.Socket;
    constructor(server: http.Server);
    init(): void;
    getSocket(): socketIO.Server;
    subscribeMoverFicha(socket: SocketIO.Socket): void;
}

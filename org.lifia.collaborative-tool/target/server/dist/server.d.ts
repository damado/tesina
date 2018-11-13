/// <reference types="express" />
import * as express from 'express';
export default class Server {
    private port;
    app: express.Application;
    router: express.Router;
    constructor(port: number);
    static init(port: number): Server;
    start(callback?: Function): void;
    /** Configuration Express. **/
    private config();
    /** Configuration mongodb **/
    private configMongoDb();
    private configCors();
    /** Configuration API endpoints. **/
    private routes();
}

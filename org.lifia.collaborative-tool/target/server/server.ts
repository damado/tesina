import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import UserController from  './src/controllers/user.controller';
import ProcessContextController from  './src/controllers/process-context.controller';

export default class Server {

	public app: express.Application;
	public router: express.Router;

	constructor(private port: number) {
		this.app = express();
    this.router = express.Router();
    this.config();
    this.routes();
	}

	static init(port: number): Server {
		return new Server(port);
	}

	public start(callback?: Function) {
		this.app.listen(this.port, callback);
	}

	  /** Configuration Express. **/
  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.configMongoDb();
    this.configCors();
  }

  /** Configuration mongodb **/
  private configMongoDb(): void {
    const MONGO_URI = 'mongodb://localhost/db-collaborative';
    mongoose.connect(MONGO_URI || process.env.MONGO_URI);
  }

  private configCors(): void {
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  /** Configuration API endpoints. **/
  private routes(): void {
    this.router = express.Router();
    this.app.use('/', this.router);
    this.app.use('/users', UserController);
    this.app.use('/process-context', ProcessContextController.router);
  }

}

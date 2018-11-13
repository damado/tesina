// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import * as mongoose from 'mongoose';
// import * as cors from 'cors';
// import UserController from  './controllers/user.controller';
// // Creates and configures an ExpressJS web server.
// class App {
//   public express: express.Application;
//   public router: express.Router;
//   constructor() {
//     this.express = express();
//     // this.expressWs = expressWs(this.express);
//     this.router = express.Router();
//     this.config();
//     this.routes();
//   }
//   /** Configuration Express. **/
//   private config(): void {
//     this.express.use(bodyParser.urlencoded({ extended: true }));
//     this.express.use(bodyParser.json());
//     this.configMongoDb();
//     this.configCors();
//   }
//   /** Configuration mongodb **/
//   private configMongoDb(): void {
//     const MONGO_URI = 'mongodb://localhost/db-collaborative';
//     mongoose.connect(MONGO_URI || process.env.MONGO_URI);
//   }
//   /** Configuration API endpoints. **/
//   private routes(): void {
//     this.router = express.Router();
//     this.express.use('/', this.router);
//     this.express.use('/users', UserController);
//   }
//   private configCors(): void {
//     this.express.use((req, res, next) => {
//       res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//       res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//       res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
//       res.header('Access-Control-Allow-Credentials', 'true');
//       next();
//     });
//   }
// }
// export default new App().express;
//# sourceMappingURL=app.js.map
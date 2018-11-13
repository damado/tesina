import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserController {

	public router: Router;
	
	constructor() {
		this.router = Router();
		this.routes();
	}

	public getUsers(req: Request, res: Response) {
		User.find({})
			.then((data) => {
				const status = res.statusCode;
				res.status(200).json({
					status,
					data
				});
			})
			.catch((error) => {
				const status = res.statusCode;
				res.json({
					status,
					error
				})
			});
	}

	public createUser(req: Request, res: Response) {
		const username: string = req.body.username;
		const password: string = req.body.password;
		const role: string = req.body.role;
		const user = new User({
			username: username,
			password: password,
			role: role
		});
		user.save({})
			.then((data) => {
				const status = res.statusCode;
				res.status(200).json({
					status,
					data
				});
			})
			.catch((error) => {
				const status = res.statusCode;
				res.json({
					status,
					error
				})
			});
	}

	public getUser(req: Request, res: Response) {
		const user = {
			username: req.body.username,
			password: req.body.password
		};
		User.find(user)
			.then((data) => {
				const status = res.statusCode;
				res.status(200).json({
					status,
					data
				});
			})
			.catch((error) => {
				const status = res.statusCode;
				res.json({
					status,
					error
				})
			});
	}

	public routes() {
		this.router.get('/', this.getUsers);
		this.router.post('/', this.createUser);
		this.router.post('/login', this.getUser);
	}
}

const userController = new UserController();
userController.routes();

export default userController.router;
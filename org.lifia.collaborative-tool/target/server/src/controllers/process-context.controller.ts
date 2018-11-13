import { Router, Request, Response, NextFunction } from 'express';
import { CollaborativeActivityContext, RolesContext } from '../models/collaborative-activity-context';
import * as ContextSettings from '../config-collaborative-tool';
import eventDispatcher from '../../index';

class ProcessContextController {
	
	public router: Router;
	private collaborativeActivityName: string;
	private roleName: string;
	private username: string;
	private activitySearched: any;
	private roleProcessed: boolean;
	private sumUserNumber: boolean;
	
	constructor() {
		this.router = Router();
		this.routes();
	}

	public routes() {
		this.router.post('/', this.create.bind(this));
		// this.router.get('/', this.getUsers);
		// this.router.post('/', this.createUser);
	}

	public create(req: Request, res: Response) {
		this.collaborativeActivityName = req.body.collaborativeActivityName;
		this.roleName = req.body.roleName;
		this.username = req.body.username;
		this.roleProcessed = false;
		this.sumUserNumber = false;
		const status = res.statusCode;
		let activityContext = {
			collaborativeActivityName: this.collaborativeActivityName,
		};
		CollaborativeActivityContext.find(activityContext)
			.then((data => {
				this.processActivityContext(data);
			}).bind(this));
		res.status(200).json({
			status
		});
	}

	private processActivityContext(data: Array<any>) {
		if (data.length > 0) {
			data.forEach((activity) => {
				if (!this.roleProcessed) {
					this.activitySearched = activity;
					let newRoleName = this.processUserFreeRole();
					if(newRoleName) {
						this.updateActivityContext(newRoleName);
						return;
					}
					return;
				}
			});
		}
		if (!this.roleProcessed) {
			this.createFirstActivityContext();
		}
	}

	private createFirstActivityContext() {
		CollaborativeActivityContext.count({}, (err, count) => {
			let activityContext = new CollaborativeActivityContext({
				collaborativeActivityName: this.collaborativeActivityName,
				users: [this.username],
				roles: [this.createFirsRoleContext()]
			});
			activityContext.save({}).then(context => {
				eventDispatcher.socket.join(context._id);
			});
		});
	}

	private createFirsRoleContext() {
		return new RolesContext({
			name: this.getFreeFirstRoleInActivity(),
			usersNumber: 1
		});
	}

	private createActivityContext(roleName: string) {
		let activityContext = new CollaborativeActivityContext({
			collaborativeActivityName: this.collaborativeActivityName,
			users: [this.username],
			roles: [this.createsRoleContext(roleName)]
		});
		activityContext.save({});
	}

	private createsRoleContext(roleName: string) {
		return new RolesContext({
			name: roleName,
			usersNumber: 1
		});
	}


	private getFreeFirstRoleInActivity() {
		let freeRoleFirst;
		ContextSettings.ContextConfiguration.activities.forEach((activityConfig) => {
			if (activityConfig.name === this.collaborativeActivityName) {
				freeRoleFirst = activityConfig.roles[0].name;
				return;
			}
		});
		return freeRoleFirst;
	}

	private processUserFreeRole(): string {
		let newRoleForUser;
		ContextSettings.ContextConfiguration.activities.forEach((activityConfig) => {
			if (activityConfig.name === this.activitySearched.collaborativeActivityName) {
				newRoleForUser = this.processRolesConfig(activityConfig.roles, this.activitySearched.roles);
			}
		});
		return newRoleForUser;
	}

	private getUserRoleInSearchedActivity(): any {
		return this.activitySearched.roles.find((role) => {
			return role.name == this.roleName;
		});
	}

	private processRolesConfig(rolesConfig: Array<any>, roles: Array<any>) {
		let nameFreeRole;
		let nameSearched = false;
		rolesConfig.forEach((roleConfig) => {
			if (!nameSearched) {
				const role = this.searchRoleInActivity(roleConfig, roles);
				if (role && role.usersNumber < roleConfig.usersOnlineNumberAllowed) {
					nameSearched = true;
					this.sumUserNumber = true;
					nameFreeRole = role.name;
				}
				if (!role) {
					nameSearched = true;
					nameFreeRole = roleConfig.name;
				}
			}
		});
		return nameFreeRole;
	}

	private searchRoleInActivity(roleConfig: any, roles: Array<any>) {
		return (roles.filter((role) => roleConfig.name === role.name))[0];
	}

	private updateActivityContext(newRoleName: string) {
		this.roleProcessed = true;
		this.activitySearched.users.push(this.username);
		this.processUserNumber(newRoleName);
		eventDispatcher.socket.join(this.activitySearched._id);
		this.activitySearched.save();
	}

	private processUserNumber(roleName: string): void {
		if (this.sumUserNumber) {
			this.updateUsersNumberInActivity(roleName);
			return;
		}
		this.activitySearched.roles.push({
			name: roleName,
			usersNumber: 1
		});
	}

	private updateUsersNumberInActivity(roleName: string):  void {
		this.activitySearched.roles.forEach(role => {
			if (role.name === roleName) {
				role.usersNumber++;
			}
		});
	}

	public findUserRoom(user: string): any {
		let searchedUser = {
			users: {
			 "$in" : [user]
			}
		};
		return CollaborativeActivityContext.find(searchedUser);
	}

}

const processContextController = new ProcessContextController();
processContextController.routes();

export default processContextController;

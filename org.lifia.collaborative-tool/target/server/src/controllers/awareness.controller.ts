import { Router, Request, Response, NextFunction } from 'express';
import Awareness from '../models/Awareness';

class AwarenessController {
	
	constructor() {}

	create(username: string, data: string) {
		const awareness = new Awareness({
			username: username,
			data: data
		});



		// awareness.isNew = false;
		// awareness.save().then((data) => {
			// console.log("holaa", pt.getWss().clients);
			// ws.getWss().clients.forEach(c => {
			// 	c.send("envio dataaaaaaaaaaaaaaaaaaaaaaaaaaaa");
			// })
		// });
		// console.log(pt);
		// pt.send("te envio algo");
	}

}

const awarenessController = new AwarenessController();

export default awarenessController;
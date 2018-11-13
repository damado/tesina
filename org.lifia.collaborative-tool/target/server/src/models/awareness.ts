import { Schema, model } from 'mongoose';

let AwarenessSchema: Schema = new Schema({
	username: {
		type: String,
		default: '',
		required: true,
		unique: true
	},
	data: {
		type: String,
		default: '',
		required: true
	}
});

export default model('Awareness', AwarenessSchema);
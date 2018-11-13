import { Schema, model } from 'mongoose';

let UserSchema: Schema = new Schema({
	username: {
		type: String,
		default: '',
		required: true,
		unique: true
	},
	password: {
		type: String,
		default: '',
		required: true
	},
	role: {
		type: String,
		default: '',
		required: true
	}
});

export default model('User', UserSchema);

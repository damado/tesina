import { Schema, model } from 'mongoose';

let RolesContextSchema: Schema = new Schema({
	name: {
		type: String,
		default: '',
		required: true,
		unique: true
	},
	usersNumber: {
		type: Number,
		default: 0,
		required: true
	}
});

export default model('RolesContext', RolesContextSchema);
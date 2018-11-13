import { Schema, model } from 'mongoose';
import User from './user';

let RolesContextSchema: Schema = new Schema({
	name: {
		type: String,
		default: '',
	},
	usersNumber: {
		type: Number,
		default: 0,
	}
});

let CollaborativeActivityContextSchema: Schema = new Schema({
	collaborativeActivityName: {
		type: String,
		default: '',
	},
	users: [{
		type: String
	}],
	roles: [RolesContextSchema],
	room: {type: String}
});


let RolesContext = model('RolesContext', RolesContextSchema);
let CollaborativeActivityContext = model('CollaborativeActivityContext', CollaborativeActivityContextSchema);

CollaborativeActivityContextSchema.pre('save', function(next) {
    var doc = this;
    CollaborativeActivityContext.findByIdAndUpdate({_id: doc._id}, {$inc: { seq: 1} }, function(error, counter)   {
    	console.log("this", doc);
        if(error)
            return next(error);
        doc.room = counter.toString();
        next();
    });
});

export {RolesContext, CollaborativeActivityContext}

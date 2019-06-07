import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import './main.html';

Template.body.helpers({
	notes(){
		return Notes.find({});
	}
});


Template.add.events({
	'submit .add-form':function(){
		event.preventDefault();
		const target = event.target;
		const text = target.text.value;
		Notes.insert({
			text,
			ceratedAt: new Date()
		});

		target.text.value = '';
		$('#addModal').modal('close');
		return false;
	}
});

Template.note.events({
	'click .delete-note':function(){
		Notes.remove(this._id);
		return false;
	}
});


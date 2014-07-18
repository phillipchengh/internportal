var keystone = require('keystone');
	Types = keystone.Field.Types;

/**
 * Group Model
 * ===========
 */

var Group = new keystone.List('Group', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Group.add({
	name: { type: String, required: true }
});

Group.relationship({ ref: 'User', path: 'groups' });
Group.relationship({ ref: 'Post', path: 'groups' });
Group.relationship({ ref: 'Checklist', path:'groups' });

Group.register();

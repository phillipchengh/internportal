var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * CheckitemInstance Model
 * ==========
 */

var CheckitemInstance = new keystone.List('CheckitemInstance', {
  map: { name: 'checkitem' },
  nocreate: true,
  nodelete: true
});

CheckitemInstance.add({
  checkitem: { type: Types.Relationship, ref: 'Checkitem', noedit: true },
  completed: { type: Types.Boolean, default: false },
  user: { type: Types.Relationship, ref: 'User', noedit: true }
});

CheckitemInstance.relationship({ ref: 'ChecklistInstance', path: 'checkitemInstances' });

CheckitemInstance.defaultColumns = 'checkitem, user, completed';
CheckitemInstance.register();

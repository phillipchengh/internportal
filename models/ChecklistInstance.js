var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * ChecklistInstance Model
 * ==========
 */

var ChecklistInstance = new keystone.List('ChecklistInstance', {
  map: { name: 'checklist' },
  nocreate: true
});

ChecklistInstance.add({
  checklist: { type: Types.Relationship, ref: 'Checklist', noedit: true },
  checkitemInstances: { type: Types.Relationship, ref: 'CheckitemInstance', many: true, noedit: true },
  completed: { type: Types.Boolean, default: false },
  user: { type: Types.Relationship, ref: 'User', noedit: true }
});

ChecklistInstance.defaultColumns = 'checklist, checkitemInstances, user, completed';
ChecklistInstance.register();

var keystone = require('keystone'),
	Types = keystone.Field.Types,
  async = require('async');

/**
 * Checklist Model
 * ==========
 */

var Checklist = new keystone.List('Checklist', {
  map: { name: 'title' },
  autokey: { from: 'title', path: 'key', unique: 'true' }
});

Checklist.add({
  title: { type: String, required: true },
  checkitems: { type: Types.Relationship, ref: 'Checkitem', many: true },
  dueDate: { type: Types.Date },
  groups: { type: Types.Relationship, ref: 'Group', many: true },
  users: { type: Types.Relationship, ref: 'User', many: true },
  createdAt: { type: Date, default: Date.now }
});

Checklist.relationship({ ref: 'ChecklistInstance', path: 'checklist' });

Checklist.schema.post('save', function(doc) {
  if (this.groups != null && this.groups.length > 0) {

    var q = keystone.list('User').model.find()
    .populate('groups')
    .where('groups').in(this.groups);

    //TODO converge all users and remove dupes
    var thisChecklist = this;
    var asyncSave = function(object, callback) {
      console.log('Saving: ' + object);
      object.save(callback);
    };
    var asyncDone = function(err) {
      if (err) {
        console.log(err);
      }
    };
    q.exec(function(err, groupUsers) {
      var i, j;
      var toSave = [];
      for (i = 0; i < groupUsers.length; i++) {
        var checkitemInstanceModels = [];
        for (j = 0; j < thisChecklist.checkitems.length; j++) {
          var checkitemInstanceModel = keystone.list('CheckitemInstance').model({
            checkitem: thisChecklist.checkitems[j],
            complete: false,
            user: groupUsers[i]
          });
          checkitemInstanceModels.push(checkitemInstanceModel);
          toSave.push(checkitemInstanceModel);
        }
        var checklistInstanceModel = keystone.list('ChecklistInstance').model({
          checklist: thisChecklist,
          checkitemInstances: checkitemInstanceModels,
          user: groupUsers[i]
        });
        toSave.push(checklistInstanceModel);
      }
      async.each(toSave, asyncSave, asyncDone);
    });
  }
});

Checklist.defaultSort = '-createdAt';
Checklist.defaultColumns = 'title, groups, createdAt, dueDate';
Checklist.register();

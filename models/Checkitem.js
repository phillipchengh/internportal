var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Checkitem Model
 * ==========
 */

  var Checkitem = new keystone.List('Checkitem', {
    map: { name: 'title' }
  });

  Checkitem.add({
    title: { type: String, required: true },
    text: { type: Types.Html, wysiwyg: true, height: 400 },
    createdAt: { type: Date, default: Date.now }
  });


  Checkitem.relationship({ ref: 'Checklist', path: 'checkitems' });
  Checkitem.relationship({ ref: 'CheckitemInstance', path: 'checkitem' });

  Checkitem.defaultSort = '-createdAt';
  Checkitem.defaultColumns = 'title, text, createdAt';
  Checkitem.register();

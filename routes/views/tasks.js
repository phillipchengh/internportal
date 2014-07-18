var keystone = require('keystone'),
async = require('async');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
  locals = res.locals;

  // Init locals
  locals.checklists = [];

  view.on('init', function(next) {
    var i, j, k;
    keystone.list('ChecklistInstance').model.find()
    //    .where('completed', 'false')
    .populate('checkitemInstances checklist user')
    .where('user', req.user)
    .sort('completed createdAt')
    .exec(function(err, res) {
      if (err || !res.length) {
        console.log(err);
      }
      locals.checklists = res;
      keystone.list('CheckitemInstance').model.find(res)
      .populate('checkitem user')
      .where('user', req.user)
      .sort('createdAt')
      .exec(function(err2, res2) {
        if (err2 || !res2.length) {
          console.log(err2);
        }
        for (i = 0; i < res2.length; i++) {
          for (j = 0; j < locals.checklists.length; j++) {
            if (!locals.checklists[j].task) {
              locals.checklists[j].task = [];
            }
            for (k = 0; k < locals.checklists[j].checkitemInstances.length; k++) {
              var thisId = JSON.stringify(res2[i]._id);
              var thatId = JSON.stringify(locals.checklists[j].checkitemInstances[k]._id);
              if (thisId === thatId) {
                locals.checklists[j].task.push(res2[i]);
              } else {
                console.log('skip');
              }
            }
          }
        }
        next(err);
      });
    });
  });

  // Render the view
  view.render('tasks');

};

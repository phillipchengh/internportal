var keystone = require('keystone'),
async = require('async');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
  locals = res.locals;

  // Init locals
  locals.interns = [];

  view.on('init', function(next) {
    var i, j, k;
    keystone.list('User').model.find()
    .populate('groups')
    .sort('-year')
    .exec(function(err, res) {
      if (err || !res.length) {
        console.log(err);
      }
      var resYears = [];
      for (i = 0; i < res.length; i++) {
        var thisYear = res[i].year;
        var thisRes = {};
        if (resYears.indexOf(thisYear) === -1) {
          thisRes.year = thisYear;
          thisRes.persons = [];
          resYears.push(thisYear);
          locals.interns.push(thisRes);
        } else {
          for (j = 0; j < locals.interns.length; j++) {
            if (locals.interns[j].year == thisYear) {
              thisRes = locals.interns[j];
              break;
            }
          }
        }
        for (k = 0; k < res[i].groups.length; k++) {
          if (res[i].groups[k].name === 'Intern') {
            thisRes.persons.push(res[i]);  
            break;
          }
        }
      }
      next(err);
    });
  });

  // Render the view
  view.render('interns');

};

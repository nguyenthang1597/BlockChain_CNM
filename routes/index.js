const createError = require('http-errors');
const test = require('./test');

module.exports = (app) => {
  app.use('/', test);
  app.use(function(req, res, next) {
    next(createError(404));
  });
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err);
  });
}

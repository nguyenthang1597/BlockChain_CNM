const createError = require('http-errors');
const detail = require('./detail')
const payment = require('./payment')
const post = require('./post')
const login = require('./login')
module.exports = (app) => {
  app.use('/detail', detail);
  app.use('/payment', payment);
  app.use('/post', post);
  app.use('/login', login)
  app.use(function(req, res, next) {
    next(createError(404));
  });
  app.use(function(err, req, res, next) {
    console.log(err);
    res.locals.message = err.message;

    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err);
  });
}

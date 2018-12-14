const mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/blockchain_cnm';
// var mongoDB = 'mongodb://nguyenthang1597:hieu19091997@ds029635.mlab.com:29635/blockchain_cnm';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

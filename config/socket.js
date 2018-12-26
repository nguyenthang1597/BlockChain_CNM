const WebSocket = require('ws');


const wssPostInteract = new WebSocket.Server({port: 8081});
const wssUpdateAccount = new WebSocket.Server({port: 8082})





module.exports = {
  wssPostInteract,
  wssUpdateAccount
};

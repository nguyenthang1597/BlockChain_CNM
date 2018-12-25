let fetch = require('node-fetch');
const vstruct = require('varstruct')
const {encode, decode, sign} = require('./lib/transaction')
const Transaction = require('./models/Transaction')
require('./config/mongoose')
const rpc = require('./config/rpc')

let tx = {
  version: 1,
  account: 'GAJQ47RMDTXYTCBMMW4A4DUMTB5RQLTGQZDMMABW6RTQJGKINJ4JTRTP',
  sequence: 74,
  memo: Buffer.alloc(0),
  operation: 'update_account',
  params: {
    key: 'followings',
    value: {
      addresses: ['GDFNYQOHLZEHUQTUHWB4IH34QXXB6YEXJT5UFKM4O2D3CFGFWEQS4EB4']
    }
  },
  signature: Buffer.alloc(64,0)
}
sign(tx, 'SARDDYAEVEABQTGOZEDOI454XUBXCF5LMNDX6Q3MGFZ53MONF2XDDQIU')

let _encode = encode(tx)
let txString = _encode.toString('base64');
rpc.broadcastTxSync({tx: `${txString}`})
.then(res => console.log(res))
console.log(_encode);


// let _encode = encode(tx);
// console.log(_encode);
// let _tx = decode(_encode)
// console.log(_tx);

// const test = vstruct([
//   { name: 'version', type: vstruct.UInt8 },
//   { name: 'other', type: vstruct.UInt64BE}
// ])

// let txt = 'ATDWu4CH2zGdowQnEtrh97wGDp8eSyq6foVuU1x8Q6ipEpB7AAAAAAAAAHAABQBAGxcK6JOx+jeq80d4D1n+J0sc4t5N/otdQRX9aavkuTcAHgEAG1Zp4buHdCBOYW0gxJHDoyB2w7QgxJHhu4tjaHWDzSH2Bpjkm/h635ZlRXcO8SgLuPSEapke0g0U0rvL6uIakjDMOVxXRWMqZy14J1EwAulSurU1XHeQO7uBvgo='

// let buffer = Buffer.from(txt, 'base64');
// let tx = decode(buffer)
// console.log(tx);

// // let _test = _Transaction.decode(buffer);
// // console.log(_test);



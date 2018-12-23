const { Keypair } = require('stellar-base');
const key = Keypair.fromSecret('SARDDYAEVEABQTGOZEDOI454XUBXCF5LMNDX6Q3MGFZ53MONF2XDDQIU');
console.log(key.publicKey());

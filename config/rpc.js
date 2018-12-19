const tendermint = require('tendermint')
const rpcUrl = 'wss://komodo.forest.network:443'
const rpc = tendermint.RpcClient(rpcUrl);

module.exports = rpc;

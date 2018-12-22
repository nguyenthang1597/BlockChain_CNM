const Transaction = require('../../models/Transaction')
const getMoney = require ('./getMoney')
const moment = require('moment')
const {decode} = require('../transaction/index')
const BANDWIDTH_PERIOD = 86400
const MAX_BLOCK_SIZE = 22020096
const RESERVE_RATIO = 1
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD
module.exports = async function(address){
    let now = new Date()
    let now1 = new Date(now - BANDWIDTH_PERIOD*1000).toISOString()
    let transaction = await Transaction.find({"Address":address, $and: [{Time: {$gte: now1}},{Time: {$lte: now.toISOString()}}]})
    let money = await getMoney(address)
    let bandwithLimit = money * NETWORK_BANDWIDTH /MAX_CELLULOSE
    let bandwith = 0
    transaction.forEach((i,index)=>{
        let t = (transaction[index+1]?moment(transaction[index+1]).unix():moment().unix())
        let time = t- moment(i.Time).unix()
        console.log(i.Size)
        console.log("Time",time)
        bandwith =i.Size + bandwith* (Math.max(0, (BANDWIDTH_PERIOD - time)/BANDWIDTH_PERIOD))
        time = moment(i.Time).unix()
        console.log("Bandwith",bandwith)
    })
    return Math.ceil(bandwithLimit - bandwith)
}

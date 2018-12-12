require('./config/mongoose');

const GetByAddress = require('./controllers/GetByAddress');

async function test(){
    let rows = await GetByAddress('GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI', 1, 30);
    console.log(rows);
}

test();;

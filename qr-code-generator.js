const fs = require('fs');
const qrcode = require('qrcode');
const uuid = require("uuid")


const filepath = "./qrcodes.html"
const codePairsCount  = 5000

let codes = ``;


run().catch(error => console.error(error.stack));


async function run() {

    let uuids = getUUIDs();

    codes = await append(uuids);
    fs.writeFileSync(filepath, `${codes}`);
    console.log(`Wrote to ${filepath}`);
}

function getUUIDs(){
    let uuids = []
    for (let i = 0; i < codePairsCount; i++) {
        let currUUID = uuid.v1();
        //console.log(currUUID)
        uuids.push(currUUID)
    }
    return uuids
}

async function append(uuids) {
    for (let i=0; i < uuids.length; i++) {
        const res = await qrcode.toDataURL(`${uuids[i]}`);
        codes += `<img src="${res}" style="height: 6rem"><img src="${res}" style="height: 6rem">`;
        console.log(res)
    }
    return codes;
}





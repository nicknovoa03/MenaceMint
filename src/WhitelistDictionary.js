
function WhitelistDictionary() {

    const whitelist = ["0x4b32038CD6D1cDEE6Cd9357b8A2Ec6E4eC77eEef","0x2F911faDA0dB8194AE937BFEe18669Da01F7f622"]

    var wlDict = {};
    for (var i = 0; i < whitelist.length; i++) {
        wlDict[whitelist[i].toLocaleLowerCase()] = true;
    }
    //return JSON.parse( JSON.stringify(wlDict));
    return wlDict
}

export default WhitelistDictionary;
function parseData(elem){
    return JSON.parse(elem);
}

async function getParsedData(){
    var data = await getArrayFile().catch(function (err) { console.error(err) });
    var parsedData = [];
    for(var i = 0; i < data.length -1; i++){
        var elem = parseData(data[i]);
        if(elem["accessor"]){ 
            parsedData.push(elem);
        }
    }
    //console.debug(parsedData);
    return parsedData;
}
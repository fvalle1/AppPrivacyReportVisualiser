async function getFile(){
    var text = document.getElementById('uploadedFile').files[0].text();
    // console.debug(text);
    return text;
}

async function getArrayFile(){
    var file = await getFile().catch(function(err){console.error(err)});
    // console.debug(file);
    return file.split("\n");
}

async function run(){
    document.getElementById('output').style.visibility = 'visible';
    // console.debug(data);
    plotAll();
}
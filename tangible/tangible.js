const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

let objectsInFolder = [];

function objectsCharge(folder) {
  var files;
  try {
    files = fs.readdirSync(folder);
    files.forEach(fileName => {
      let fileStat = fs.statSync(folder + fileName).isDirectory();
      if (!fileStat) {
        let sub = fileName.substr(fileName.length - 4);
        //only accept this type of objects
        if (sub == "gltf" || sub == ".glb") {
          let objModel = "url(/assets/models/" + fileName + ")";
          objectsInFolder.push(objModel);
        }
      }
    });
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      console.log("No existe el directorio. 0 Modelos encontrados");
    } 
    else{
      console.log(err);
    }
  }
}

app.get('/server', function (req, res) {
  objectsCharge(__dirname + '/assets/models/');
  //console.log(objectsInFolder);
  res.send(objectsInFolder);
});

app.use('/', express.static(path.join(__dirname, "/")));



app.listen(3000, function () {
  console.log('Cargado Tangible en el puerto 3000');
});

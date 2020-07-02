const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

let objectsInFolder = [];

/*const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

// Let the app use json
 
app.use(bodyParser.json());
app.use(bodyParser.raw());
*/


/**
 * Method to get all file names from the folder directory and save it into an array
 * @param {*} folder directory which is used to ge file names from it
 */
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
    else {
      console.log(err);
    }
  }
}

/**
 * get request to get file names from project directory to get models
 */
app.get('/server', function (req, res) {
  objectsCharge(__dirname + '/assets/models/');
  //send the array with all file names on it
  res.send(objectsInFolder);
});

/*
The methods below are used to create data files in project directory

//post request to get the calibration data times 
app.post('/calibrar', function (req, res) {

  let string = JSON.stringify(req.body["Time"]);
  string = string.slice(1, -1);
  let news = string.split(',');
  let data = "Time\n";
  for (let i = 0; i < news.length; i++) {
    data += news[i] + '\n';
  }
  fs.writeFile('data.csv', data, function (err) {
    if (err) return console.log(err);
  });


});

post request to get the rotation data times and values from sensors 
app.post('/rotar', function (req, res) {
  let time = JSON.stringify(req.body["Time"]);
  let degX = JSON.stringify(req.body["DegX"]);
  let degY = JSON.stringify(req.body["DegY"]);
  let degZ = JSON.stringify(req.body["DegZ"]);
  time = time.slice(1, -1);
  degX = degX.slice(1, -1);
  degY = degY.slice(1, -1);
  degZ = degZ.slice(1, -1);
  let newtime = time.split(',');
  let newdegX = degX.split(',');
  let newdegY = degY.split(',');
  let newdegZ = degZ.split(',');
  let data = "Time,DegX,DegY,DegZ\n";
  for (let i = 0; i < newtime.length; i++) {
    data += newtime[i] + ',' + newdegX[i] + ',' + newdegY[i] + ',' + newdegZ[i] + '\n';
  }
  fs.writeFile('rotar.csv', data, function (err) {
    if (err) return console.log(err);
  });


});

post request to get the displace data times and values from sensors
app.post('/mover', function (req, res) {
  let time = JSON.stringify(req.body["Time"]);
  let degX = JSON.stringify(req.body["pitch"]);
  let degY = JSON.stringify(req.body["roll"]);
  time = time.slice(1, -1);
  degX = degX.slice(1, -1);
  degY = degY.slice(1, -1);
  let newtime = time.split(',');
  let newdegX = degX.split(',');
  let newdegY = degY.split(',');
  let data = "Time,DegX,DegY\n";
  for (let i = 0; i < newtime.length; i++) {
    data += newtime[i] + ',' + newdegX[i] + ',' + newdegY[i] + '\n';
  }
  fs.writeFile('mover.csv', data, function (err) {
    if (err) return console.log(err);
  });


});

post request to get the free data times and values from sensors
app.post('/libre', function (req, res) {
  let time = JSON.stringify(req.body["Time"]);
  let degX = JSON.stringify(req.body["pitch"]);
  let degY = JSON.stringify(req.body["roll"]);
  let degZ = JSON.stringify(req.body["DegZ"]);
  time = time.slice(1, -1);
  degX = degX.slice(1, -1);
  degY = degY.slice(1, -1);
  degZ = degZ.slice(1, -1);
  let newtime = time.split(',');
  let newdegX = degX.split(',');
  let newdegY = degY.split(',');
  let newdegZ = degZ.split(',');
  let data = "Time,pitch,roll,DegZ\n";
  for (let i = 0; i < newtime.length; i++) {
    data += newtime[i] + ',' + newdegX[i] + ',' + newdegY[i] + ',' + newdegZ[i] + '\n';
  }
  fs.writeFile('libre.csv', data, function (err) {
    if (err) return console.log(err);
  });


});
*/

/**
 * express server
 */
app.use('/', express.static(path.join(__dirname, "/")));


/**
 * Launch the server on the port indicated
 */
app.listen(3000, function () {
  console.log('Cargado Tangible en el puerto 3000');
});

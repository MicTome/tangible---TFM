

function controllerBoxStart() {
  setTimeout(function () {
    chargeObjects(); //Charge objects shape
    chargeSelection();
    communication(); //Charge websocket comunication
  }, 300);
}

function controllerBoxR() {
  if (connectionAchieved) {
    rotationScreen = true;
    selectionScreen = false;
    initWS("init");
    chargeRotation();
  }
}

function controllerBoxD() {
  if (connectionAchieved) {
    initWS("init");
    chargeDisplace();
  }
}

function controllerBoxF() {
  if (connectionAchieved) {
    initWS("init");
    chargeFree();
  }
}

function controllerBoxS() {
  shapeScreen = true;
  selectionScreen = false;
  chargeShape();//charge 2 times to give it time to the configuration
  chargeShape();
}

function controllerReconnect() {
  setTimeout(function () {
    times = 0;
    connectionClosed = false;
    connectionAchieved = false;
    communication();
  }, 300);
}

function controllerDisconnect() {
  setTimeout(function () {
    end();
  }, 300);
}

function controllerBackR() {
  setTimeout(function () {
    stopWS("stop");
    chargeFromRotation();
    clearSensorVariables();
  }, 300);
}

function controllerBackD() {
  setTimeout(function () {
    stopWS("stop");
    chargeFromDisplace();
    clearSensorVariables();
  }, 300);
}

function controllerBackF() {
  setTimeout(function () {
    stopWS("stop");
    chargeFromFree();
    clearSensorVariables();
  }, 300);
}

function controllerBackS() {
  setTimeout(function () {
    chargeFromShape();
  }, 300);
}

function controllerTangibleD(evt) {
  if (displaceScreen) {
    interaction(evt);
  }
}

function controllerSelectLS() {
  index -= 1;
  positionObjects(0);
}

function controllerSelectRS() {
  index += 1;
  positionObjects(1);
}

function controllerSelectObject() {
  changeShapeOffAll();
  setTimeout(function () {
    chargeFromShape();
  }, 300);
}

function controllerUpdate() {
  setTimeout(function () {
    updateShapeScene();
  }, 300);
}
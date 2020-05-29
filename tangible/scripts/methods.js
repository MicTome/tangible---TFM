function showText(name) {
  if (name == "sofa2D") {
    sofa2DHit = true;
    console.log("sofahit: " + sofa2DHit);
    sofa2Dtext.setAttribute('visible', true);

  }
  else if (name == "robot") {
    robotHit = true;
    console.log("robot: " + robotHit);
    robotText.setAttribute('visible', true);
    let x = robot.object3D.position.x - 1;
    let y = robot.object3D.position.y;
    let z = robot.object3D.position.z;
    robot.setAttribute('animation__position', "property: position; to: " + x + " " + y + " " + z + "; dur:1000; loop: false");
    x = robotText.object3D.position.x - 1;
    y = robotText.object3D.position.y;
    z = robotText.object3D.position.z;
    robotText.setAttribute('animation__position', "property: position; to: " + x + " " + y + " " + z + "; dur:1000; loop: false");
  }
}

function interaction(evt) {
  let i = 0;
  for (i = 0; i < evt.detail.els.length; i++) {
    showText(evt.detail.els[i].id);
  }
  if (evt.detail.els.length == 0) {
    if (sofa2DHit) {
      soda2DHit = false;
      sofa2Dtext.setAttribute('visible', false);
    }
    if (robotHit) {
      robotHit = false;
      robotText.setAttribute('visible', false);
    }
  }
}

/**
 * Position the carousel objects and change their shape depending on idex value
 * @param {int} dir This parameter only accepts 3 values:
 * 0: It's the default value when the carousel is charged
 * 1: It's the right direction value and change the shape from center object to the right one.
 *    Index is changed out of the method
 * 2: It's the left direction value and change the shape from center object to the left one.
 *    Index is changed out of the method
 */
function positionObjects(dir) {

  //This ifelse sentence makes sure that the values before and after don't go out of the 
  //selectableObjects array
  let before, after;
  if (index > (selectableObjects.length - 1))
    index = 0;
  else if (index < 0)
    index = selectableObjects.length - 1;

  if ((index - 1) < 0) {
    before = selectableObjects.length - 1;
    after = index + 1;
  }
  else if ((index + 1) > (selectableObjects.length - 1)) {
    before = index - 1;
    after = 0;
  }
  else {
    before = index - 1;
    after = index + 1;
  }

  //left direction
  if (dir == 0) {
    //set position
    objectLeft.setAttribute('position', "-9 0 -8");
    object.setAttribute('position', "0 0 0");
    objectRight.setAttribute('position', "9 0 -8");
    //remove other models in the variable
    objectLeft.removeAttribute('gltf-model');
    object.removeAttribute('gltf-model');
    objectRight.removeAttribute('gltf-model');
    //change the model and the material of the a-frame entity through variable
    objectLeft.setAttribute('gltf-model', selectableObjects[before]);
    object.setAttribute('gltf-model', selectableObjects[index]);
    objectRight.setAttribute('gltf-model', selectableObjects[after]);
    //use the created component to make the size manageable
    objectLeft.setAttribute('autoscale', '2.7');
    object.setAttribute('autoscale', '2.7');
    objectRight.setAttribute('autoscale', '2.7');

  }
  //right direction
  else if (dir == 1) {
    objectLeft.setAttribute('position', "-9 0 -8");
    object.setAttribute('position', "0 0 0");
    objectRight.setAttribute('position', "9 0 -8");
    objectLeft.removeAttribute('gltf-model');
    object.removeAttribute('gltf-model');
    objectRight.removeAttribute('gltf-model');
    objectLeft.setAttribute('gltf-model', selectableObjects[before]);
    object.setAttribute('gltf-model', selectableObjects[index]);
    objectRight.setAttribute('gltf-model', selectableObjects[after]);
    objectLeft.setAttribute('autoscale', '2.7');
    object.setAttribute('autoscale', '2.7');
    objectRight.setAttribute('autoscale', '2.7');
  }
  //default position
  else if (dir == 2) {
    objectLeft.setAttribute('position', "-9 0 -8");
    object.setAttribute('position', "0 0 0");
    objectRight.setAttribute('position', "9 0 -8");
    objectLeft.removeAttribute('gltf-model');
    object.removeAttribute('gltf-model');
    objectRight.removeAttribute('gltf-model');
    objectLeft.setAttribute('gltf-model', selectableObjects[before]);
    object.setAttribute('gltf-model', selectableObjects[index]);
    objectRight.setAttribute('gltf-model', selectableObjects[after]);
    objectLeft.setAttribute('autoscale', '2.7');
    object.setAttribute('autoscale', '2.7');
    objectRight.setAttribute('autoscale', '2.7');
  }

}


/**
 * Method used to update the object list of carousel
 * 1º. Charge the list
 * 2º. Charge 2 times the shape scene to give the list to be updated
 * 3º. Set the default carousel positions
 */
function updateShapeScene() {
  chargeObjects();
  chargeShape();
  chargeShape();
  positionObjects(2);
}


/**
 * When a shape is selected, change teh tangible objects shape and the selection boxes shape too
 */
function changeShapeOffAll() {
  //Remove other models on the object
  boxR.removeAttribute('gltf-model');
  boxD.removeAttribute('gltf-model');
  boxF.removeAttribute('gltf-model');
  boxS.removeAttribute('gltf-model');
  //Gives the new one
  boxR.setAttribute('gltf-model', selectableObjects[index]);
  boxD.setAttribute('gltf-model', selectableObjects[index]);
  boxF.setAttribute('gltf-model', selectableObjects[index]);
  boxS.setAttribute('gltf-model', selectableObjects[index]);
  //Rescale it
  boxR.setAttribute('autoscale', '3');
  boxD.setAttribute('autoscale', '2.5');
  boxF.setAttribute('autoscale', '3');
  boxS.setAttribute('autoscale', '3');

  tangibleR.removeAttribute('gltf-model');
  tangibleD.removeAttribute('gltf-model');
  tangibleF.removeAttribute('gltf-model');
  tangibleR.setAttribute('gltf-model', selectableObjects[index]);
  tangibleD.setAttribute('gltf-model', selectableObjects[index]);
  tangibleF.setAttribute('gltf-model', selectableObjects[index]);
  tangibleR.setAttribute('autoscale', '2');
  tangibleD.setAttribute('autoscale', '2');
  tangibleF.setAttribute('autoscale', '2');
}

/**
 * Method that fill the objects list through an http request because
 * navigator core security doesn't let you access to system files
 */
function chargeObjects() {
  while (selectableObjects.length > 0)
    selectableObjects.pop();

  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/server', true);
  xhr.onload = function () {
    // Request finished. Do processing here.
    if (xhr.readyState == 4 && xhr.status == "200") {
      selectableObjects = JSON.parse(xhr.responseText);

    }
    else {
      console.log("Error al obtener los modelos");
    }
    //if there's no object in the directory, gives all changed object a box model
    if (selectableObjects.length == 0) {
      object.setAttribute('geometry', "primitive: box; width: 1; height: 1; depth: 2");
      objectLeft.setAttribute('geometry', "primitive: box; width: 1; height: 1; depth: 2");
      objectRight.setAttribute('geometry', "primitive: box; width: 1; height: 1; depth: 2");
      tangibleD.setAttribute('geometry', "primitive: box; width: 1; height: 1; depth: 1.5");
      tangibleF.setAttribute('geometry', "primitive: box; width: 1; height: 1; depth: 1.5");
      tangibleR.setAttribute('geometry', "primitive: box; width: 1; height: 1; depth: 1.5");
    }
    //if not, transform the tangibles
    else {
      tangibleR.setAttribute('gltf-model', selectableObjects[0]);
      tangibleD.setAttribute('gltf-model', selectableObjects[0]);
      tangibleF.setAttribute('gltf-model', selectableObjects[0]);
      tangibleR.setAttribute('autoscale', '2');
      tangibleD.setAttribute('autoscale', '2');
      tangibleF.setAttribute('autoscale', '2');
    }
  };

  xhr.send(null);
}

function getSensorData() {
  let data = "";
  data = JSON.parse(content);
  gx = parseFloat(data.gyroX);
  gy = parseFloat(data.gyroY);
  gz = parseFloat(data.gyroZ);
  ax = parseFloat(data.accelX);
  ay = parseFloat(data.accelY);
  az = parseFloat(data.accelZ);
}

function clearSensorVariables() {
  gx = 0.0;
  gy = 0.0;
  gz = 0.0;
  ax = 0.0;
  ay = 0.0;
  az = 0.0;
}

function rotation() {
  getSensorData();
  conversionGyroValues();
  //Every 87 g/s in positive means 1º to right. 7813/90 = ~87
  /*if (Math.abs(gxB - gx) > difgX / 2) {
    let aux = 0.0;
    if (gx > -6) {
      aux = gx / 180.0;
    }
    else if (gx < -8) {
      aux = gx / 200.0;
    }

    degreesX -= aux;

    if (degreesX > 0) {
      degreesX -= 360.0;
      degreesXdriftPos++;
    }
    else if (degreesX < -360) {
      degreesX = 0.0;
      degreesXdriftNeg--;
    }
    if (degreesXdriftPos >= 6) {
      //degreesX -= 0.81;
      degreesXdriftPos = 0;
    }
    if (degreesXdriftNeg >= 6) {
      //degreesX -= 0.81;
      degreesXdriftNeg = 0;
    }
    gxBaux = gx;
  }
  //let radX = degreesX * pi / 180.0;
  if (Math.abs(gyBaux - gy) > difgY) {
    if (gy > 19) {
      aux = gy / 180.0;
      degreesYdriftPos++;
    }
    else if (gy < 18) {
      aux = gy / 200.0;
      degreesYdriftNeg++;
    }

    degreesY -= aux;

    if (degreesY > 0) {
      degreesY -= 360.0;
    }
    else if (degreesY < -360) {
      degreesY = 0.0;
    }
    if (degreesYdriftPos >= 8) {
      //degreesY -= 0.81;
      degreesYdriftPos = 0;
    }
    if (degreesYdriftNeg >= 8) {
      //degreesY += 0.81;
      degreesYdriftPos = 0;
    }
    gyBaux = gy;
  }

  //let radY = degreesY * pi / 180.0;
  if (Math.abs(gzBaux - gz) > difgZ) {
    if (gz > -6) {
      aux = gz / 180.0;
      degreesZdriftPos++;
    }
    else if (gz < -8) {
      aux = gz / 180.0;
      degreesZdriftNeg++;
    }

    degreesZ -= aux;

    if (degreesZ > 0) {
      degreesZ -= 360.0;
    }
    else if (degreesZ < -360) {
      degreesZ = 0.0;
    }
    if (degreesZdriftPos >= 8) {
      degreesZ -= 0.746;
      degreesZdriftPos = 0;
    }
    if (degreesZdriftNeg >= 8) {
      degreesZ += 0.550;
      degreesZdriftNeg = 0;
    }
    radZ = degreesZ * pi / 180.0;
  }*/
  //console.log("pitch: " + ax + "; roll: " + ay + "; yaw: " + az + "; dir: " + dir);
  //let yaw = -(Math.atan2(Math.sqrt(ay * ay + ax * ax), az));// * 180.0) / pi;
  let paux = 0.0;
  if (gx > 100.0 || gx < -100) {
    pitch = -(Math.atan2(ax, Math.sqrt(ay * ay + az * az)));// * 180.0) / pi;
    if (Math.abs(pitchB - pitch) > difX / 2) {
      //Y Z
      if ((degreesY < -270 || degreesY > -90) && (degreesZ < -270 || degreesZ > -90)) {
        if (degreesX < -270 || degreesX > -90) {
          pitch = pitch;
        }
        if (degreesX < -180 && degreesX > -270) {

          paux = radValueMax - pitch;
          pitch = paux;
        }
        if (degreesX > -180 && degreesX < -90) {

          paux = -radValueMax - pitch;
          pitch = paux;
        }
      }
      //Y -Z
      else if ((degreesY < -270 || degreesY > -90) && (degreesZ > -270 && degreesZ < -90)) {
        if (degreesX < -270 || degreesX > -90) {

          pitch = -pitch;
        }
        else if (degreesX < -180 && degreesX > -270) {

          paux = -radValueMax - pitch;
          pitch = paux;
        }
        else if (degreesX > -180 && degreesX < -90) {

          paux = -radValueMax - pitch;
          pitch = paux;
        }
      }
      //-Y Z
      else if ((degreesY > -270 && degreesY < -90) && (degreesZ < -270 || degreesZ > -90)) {
        if (degreesX < -270 || degreesX > -90) {

          pitch = pitch;
        }
        else if (degreesX < -180 && degreesX > -270) {

          paux = -radValueMax - pitch;
          pitch = paux;
        }
        else if (degreesX > -180 && degreesX < -90) {

          paux = radValueMax - pitch;
          pitch = paux;
        }
      }
      //-Y -Z
      else if ((degreesY > -270 && degreesY < -90) && (degreesZ > -270 && degreesZ < -90)) {
        if (degreesX < -270 || degreesX > -90) {

          pitch = -pitch;
        }
        else if (degreesX < -180 && degreesX > -270) {

          paux = radValueMax - pitch;
          pitch = paux;
        }
        else if (degreesX > -180 && degreesX < -90) {

          paux = -radValueMax - pitch;
          pitch = paux;
        }
      }
      tangibleR.object3D.rotation.x = pitch;
      pitchB = pitch;
    }

  }

  if (gy > 100.0 || gy < -100) {
    roll = -(Math.atan2(ay, Math.sqrt(ax * ax + az * az)));// * 180.0 / pi;
    if (Math.abs(rollB - roll) > difY / 2) {
      //X Z
      if ((degreesX < -270 || degreesX > -90) && (degreesZ < -270 || degreesZ > -90)) {
        if (degreesY < -270 || degreesY > -90) {

          roll = roll;
        }
        if (degreesY < -180 && degreesY > -270) {

          paux = radValueMax - roll;
          roll = paux;
        }
        if (degreesY > -180 && degreesY < -90) {

          paux = -radValueMax - roll;
          roll = paux;
        }
      }
      //X -Z
      else if ((degreesX < -270 || degreesX > -90) && (degreesZ > -270 && degreesZ < -90)) {
        if (degreesY < -270 || degreesY > -90) {

          roll = roll;
        }
        else if (degreesY < -180 && degreesY > -270) {

          paux = -radValueMax - roll;
          roll = paux;
        }
        else if (degreesY > -180 && degreesY < -90) {

          paux = radValueMax - roll;
          roll = paux;
        }
      }
      //-X Z
      else if ((degreesX > -270 && degreesX < -90) && (degreesZ < -270 || degreesZ > -90)) {
        if (degreesY < -270 || degreesY > -90) {

          roll = roll;
        }
        else if (degreesY < -180 && degreesY > -270) {

          paux = -radValueMax - roll;
          roll = paux;
        }
        else if (degreesY > -180 && degreesY < -90) {

          paux = radValueMax - roll;
          roll = paux;
        }
      }
      //-X -Z
      else if ((degreesX > -270 && degreesX < -90) && (degreesZ > -270 && degreesZ < -90)) {
        if (degreesY < -270 || degreesY > -90) {

          roll = -roll;
        }
        else if (degreesY < -180 && degreesY > -270) {

          paux = radValueMax - roll;
          roll = paux;
        }
        else if (degreesY > -180 && degreesY < -90) {

          paux = -radValueMax - roll;
          roll = paux;
        }
      }
      tangibleR.object3D.rotation.z = roll;
      rollB = roll;
    }
  }
  if (Math.abs(gzBaux - gz) > difgZ) {
    tangibleR.object3D.rotation.y = radZ;
    gzBaux = gz;
  }
  // console.log("dx: " + degreesX + "; dy: " + degreesY + "; dz: " + degreesZ + "; roll: " + roll);
}

function displace() {
  getSensorData();

  //console.log("x: " + ax + "; y: " + ay + "; z: " + az);
  let pitch = -(Math.atan2(ax, Math.sqrt(ay * ay + az * az))) * 180.0 / pi;
  let roll = -(Math.atan2(ay, Math.sqrt(ax * ax + az * az))) * 180.0 / pi;
  //let yaw = -(Math.atan2(Math.sqrt(ay * ay + ax * ax), az)) * 180.0 / pi;
  //displace forward
  if (pitch <= -6.0 && pitch >= -80.0) {
    if (pitch <= -16.0)
      tangibleD.object3D.position.z -= 0.03;
    if (pitch < -16.0 && pitch >= -26.0)
      tangibleD.object3D.position.z -= 0.06;
    if (pitch < -26.0 && pitch >= -40.0)
      tangibleD.object3D.position.z -= 0.1;
    //displace down
    if (pitch < -55.0 && pitch >= -80.0)
      tangibleD.object3D.position.y -= 0.1;

    let pitchx = (pitch * pi / 180).toFixed(5);
    if (Math.abs(pitchB - pitchx) > difX) {
      tangibleD.object3D.rotation.x = pitchx;
      pitchB = pitchx;
    }
  }

  //displace backward
  if (pitch >= 6.0 && pitch <= 80.0) {
    if (pitch <= 16.0)
      tangibleD.object3D.position.z += 0.03;
    if (pitch > 16.0 && pitch <= 26.0)
      tangibleD.object3D.position.z += 0.06;
    if (pitch > 26.0 && pitch <= 40.0)
      tangibleD.object3D.position.z += 0.1;
    //displace up
    if (pitch > 55.0 && pitch <= 80.0)
      tangibleD.object3D.position.y += 0.1;

    let pitchx = (pitch * pi / 180).toFixed(5);
    if (Math.abs(pitchB - pitchx) > difX) {
      tangibleD.object3D.rotation.x = pitchx;
      pitchB = pitchx;
    }
  }

  if (pitch > -6.0 && pitch < 6.0)
    tangibleD.object3D.rotation.x = 0.0;

  //displace left
  if (roll <= -6.0 && roll >= -65.0) {
    if (roll <= -16.0)
      tangibleD.object3D.position.x += 0.03;
    if (roll < -16.0 && roll >= -26.0)
      tangibleD.object3D.position.x += 0.06;
    if (roll < -26.0 && roll >= -65.0)
      tangibleD.object3D.position.x += 0.1;

    let rolla = (roll * pi / 180).toFixed(5);
    if (Math.abs(rollB - rolla) > difY) {
      tangibleD.object3D.rotation.z = rolla;
      rollB = rolla;
    }
  }

  //displace right
  if (roll >= 6.0 && roll <= 65.0) {
    if (roll <= 16.0)
      tangibleD.object3D.position.x -= 0.03;
    if (roll > 16.0 && roll <= 26.0)
      tangibleD.object3D.position.x -= 0.06;
    if (roll > 26.0 && roll <= 65.0)
      tangibleD.object3D.position.x -= 0.1;

    let rolla = (roll * pi / 180).toFixed(5);
    if (Math.abs(rollB - rolla) > difY) {
      tangibleD.object3D.rotation.z = rolla;
      rollB = rolla;
    }
  }

  conversionGyroValues();
/*
  if (Math.abs(gzBaux - gz) > difgZ) {
    if (gz > -6) {
      aux = gz / 180.0;
      degreesZdriftPos++;
    }
    else if (gz < -8) {
      aux = gz / 180.0;
      degreesZdriftNeg++;
    }

    degreesZ -= aux;

    if (degreesZ > 0) {
      degreesZ -= 360.0;
    }
    else if (degreesZ < -360) {
      degreesZ = 0.0;
    }
    if (degreesZdriftPos >= 8) {
      degreesZ -= 0.746;
      degreesZdriftPos = 0;
    }
    if (degreesZdriftNeg >= 8) {
      //degreesZ += 0.250;
      degreesZdriftNeg = 0;
    }
    radZ = degreesZ * pi / 180.0;
  }*/

  if (Math.abs(gzBaux - gz) > difgZ) {
    tangibleD.object3D.rotation.y = radZ;
    gzBaux = gz;
  }

  if (roll > -6.0 && roll < 6.0)
    tangibleD.object3D.rotation.z = 0.0;

  if ((tangibleD.object3D.position.x - camaraD.object3D.position.x) > 2.0) {
    camaraD.object3D.position.x += 0.1;

  }
  else if ((tangibleD.object3D.position.x - camaraD.object3D.position.x) < -2.0) {
    camaraD.object3D.position.x -= 0.1;
  }

  if ((tangibleD.object3D.position.y - camaraD.object3D.position.y) > 2.0) {
    camaraD.object3D.position.y += 0.1;

  }
  else if ((tangibleD.object3D.position.y - camaraD.object3D.position.y) < -2.0) {
    camaraD.object3D.position.y -= 0.1;
  }
  let difBC = backD.object3D.position.x - camaraD.object3D.position.x;
  if (difBC > -0.75 || difBC < -0.75) {
    backD.object3D.position.x = -0.75 + camaraD.object3D.position.x;
  }
  difBC = backD.object3D.position.y - camaraD.object3D.position.y;
  if (difBC > -0.3 || difBC < -0.3) {
    backD.object3D.position.y = -0.3 + camaraD.object3D.position.y;
  }
}

function free() {
  getSensorData();
  let pitch = -(Math.atan2(ax, Math.sqrt(ay * ay + az * az))) * 180.0 / pi;
  let roll = -(Math.atan2(ay, Math.sqrt(ax * ax + az * az))) * 180.0 / pi;

  conversionGyroValues();


  if (gx > 100.0 || gx < -100) {
    pitch = -(Math.atan2(ax, Math.sqrt(ay * ay + az * az)));// * 180.0) / pi;
    if (Math.abs(pitchB - pitch) > difX / 2) {
      //Y Z
      if ((degreesY < -270 || degreesY > -90) && (degreesZ < -270 || degreesZ > -90)) {
        if (degreesX < -270 || degreesX > -90) {
          pitch = pitch;
        }
      }
      //Y -Z
      else if ((degreesY < -270 || degreesY > -90) && (degreesZ > -270 && degreesZ < -90)) {
        if (degreesX < -270 || degreesX > -90) {

          pitch = -pitch;
        }
      }
      //-Y Z
      tangibleF.object3D.rotation.x = pitch;
      pitchB = pitch;
    }

  }

  if (gy > 100.0 || gy < -100) {
    roll = -(Math.atan2(ay, Math.sqrt(ax * ax + az * az)));// * 180.0 / pi;
    if (Math.abs(rollB - roll) > difY / 2) {
      //X Z
      if ((degreesX < -270 || degreesX > -90) && (degreesZ < -270 || degreesZ > -90)) {
        if (degreesY < -270 || degreesY > -90) {

          roll = roll;
        }
      }
      //X -Z
      else if ((degreesX < -270 || degreesX > -90) && (degreesZ > -270 && degreesZ < -90)) {
        if (degreesY < -270 || degreesY > -90) {

          roll = -roll;
        }
      }
      tangibleF.object3D.rotation.z = roll;
      rollB = roll;
    }
  }
  if (Math.abs(gzBaux - gz) > difgZ) {
    tangibleF.object3D.rotation.y = radZ;
    gzBaux = gz;
  }

  if ((radZ < -5.45 || radZ > -0.62)) {
    //displace forward
    if (pitch <= -6.0 && pitch >= -80.0) {
      if (pitch <= -16.0) {
        tangibleF.object3D.position.x += 0.03 * Math.sin(radZ);
        tangibleF.object3D.position.z -= 0.03 * Math.cos(radZ);
      }
      if (pitch < -16.0 && pitch >= -26.0) {
        tangibleF.object3D.position.x += 0.06 * Math.sin(radZ);
        tangibleF.object3D.position.z -= 0.06 * Math.cos(radZ);
      }
      if (pitch < -26.0 && pitch >= -40.0) {
        tangibleF.object3D.position.x += 0.1 * Math.sin(radZ);
        tangibleF.object3D.position.z -= 0.1 * Math.cos(radZ);
      }
      //displace down
      if (pitch < -55.0 && pitch >= -80.0)
        tangibleF.object3D.position.y -= 0.1;
    }

    //displace backward
    if (pitch >= 6.0 && pitch <= 80.0) {
      if (pitch <= 16.0) {
        tangibleF.object3D.position.x -= 0.03 * Math.sin(radZ);
        tangibleF.object3D.position.z += 0.03 * Math.cos(radZ);
      }
      if (pitch > 16.0 && pitch <= 26.0) {
        tangibleF.object3D.position.x -= 0.06 * Math.sin(radZ);
        tangibleF.object3D.position.z += 0.06 * Math.cos(radZ);
      }
      if (pitch > 26.0 && pitch <= 40.0) {
        tangibleF.object3D.position.x -= 0.1 * Math.sin(radZ);
        tangibleF.object3D.position.z += 0.1 * Math.cos(radZ);
      }
      //displace up
      if (pitch > 55.0 && pitch <= 80.0)
        tangibleF.object3D.position.y += 0.1;
    }


    //displace right
    if (roll <= -6.0 && roll >= -65.0) {
      if (roll <= -16.0) {
        tangibleF.object3D.position.x -= 0.03 * Math.sin(radZ - 1.5);
        tangibleF.object3D.position.z += 0.03 * Math.cos(radZ - 1.5);
      }
      if (roll < -16.0 && roll >= -26.0) {
        tangibleF.object3D.position.x -= 0.06 * Math.sin(radZ - 1.5);
        tangibleF.object3D.position.z += 0.06 * Math.cos(radZ - 1.5);
      }
      if (roll < -26.0 && roll >= -65.0) {
        tangibleF.object3D.position.x -= 0.1 * Math.sin(radZ - 1.5);
        tangibleF.object3D.position.z += 0.1 * Math.cos(radZ - 1.5);
      }
    }

    //displace left
    if (roll >= 6.0 && roll <= 65.0) {
      if (roll <= 16.0) {
        tangibleF.object3D.position.x -= 0.03 * Math.sin(radZ + 1.5);
        tangibleF.object3D.position.z += 0.03 * Math.cos(radZ + 1.5);
      }
      if (roll > 16.0 && roll <= 26.0) {
        tangibleF.object3D.position.x -= 0.06 * Math.sin(radZ + 1.5);
        tangibleF.object3D.position.z += 0.06 * Math.cos(radZ + 1.5);
      }
      if (roll > 26.0 && roll <= 65.0) {
        tangibleF.object3D.position.x -= 0.1 * Math.sin(radZ + 1.5);
        tangibleF.object3D.position.z += 0.1 * Math.cos(radZ + 1.5);
      }
    }
  }

  if (radZ < -2.45 && radZ > - 3.6) {
    //displace forward
    if (pitch <= -6.0 && pitch >= -80.0) {
      if (pitch <= -16.0) {
        tangibleF.object3D.position.x += 0.03 * Math.sin(radZ);
        tangibleF.object3D.position.z -= 0.03 * Math.cos(radZ);
      }
      if (pitch < -16.0 && pitch >= -26.0) {
        tangibleF.object3D.position.x += 0.06 * Math.sin(radZ);
        tangibleF.object3D.position.z -= 0.06 * Math.cos(radZ);
      }
      if (pitch < -26.0 && pitch >= -40.0) {
        tangibleF.object3D.position.x += 0.1 * Math.sin(radZ);
        tangibleF.object3D.position.z -= 0.1 * Math.cos(radZ);
      }
      //displace down
      if (pitch < -55.0 && pitch >= -80.0)
        tangibleF.object3D.position.y -= 0.1;
    }

    //displace backward
    if (pitch >= 6.0 && pitch <= 80.0) {
      if (pitch <= 16.0) {
        tangibleF.object3D.position.x -= 0.03 * Math.sin(radZ);
        tangibleF.object3D.position.z += 0.03 * Math.cos(radZ);
      }
      if (pitch > 16.0 && pitch <= 26.0) {
        tangibleF.object3D.position.x -= 0.06 * Math.sin(radZ);
        tangibleF.object3D.position.z += 0.06 * Math.cos(radZ);
      }
      if (pitch > 26.0 && pitch <= 40.0) {
        tangibleF.object3D.position.x -= 0.1 * Math.sin(radZ);
        tangibleF.object3D.position.z += 0.1 * Math.cos(radZ);
      }
      //displace up
      if (pitch > 55.0 && pitch <= 80.0)
        tangibleF.object3D.position.y += 0.1;
    }


    //displace left
    if (roll <= -6.0 && roll >= -65.0) {
      if (roll <= -16.0) {
        tangibleF.object3D.position.x -= 0.03 * Math.sin(radZ + 1.5);
        tangibleF.object3D.position.z += 0.03 * Math.cos(radZ + 1.5);
      }
      if (roll < -16.0 && roll >= -26.0) {
        tangibleF.object3D.position.x -= 0.06 * Math.sin(radZ + 1.5);
        tangibleF.object3D.position.z += 0.06 * Math.cos(radZ + 1.5);
      }
      if (roll < -26.0 && roll >= -65.0) {
        tangibleF.object3D.position.x -= 0.1 * Math.sin(radZ + 1.5);
        tangibleF.object3D.position.z += 0.1 * Math.cos(radZ + 1.5);
      }
    }

    //displace right
    if (roll >= 6.0 && roll <= 65.0) {
      if (roll <= 16.0) {
        tangibleF.object3D.position.x -= 0.03 * Math.sin(radZ - 1.5);
        tangibleF.object3D.position.z += 0.03 * Math.cos(radZ - 1.5);
      }
      if (roll > 16.0 && roll <= 26.0) {
        tangibleF.object3D.position.x -= 0.06 * Math.sin(radZ - 1.5);
        tangibleF.object3D.position.z += 0.06 * Math.cos(radZ - 1.5);
      }
      if (roll > 26.0 && roll <= 65.0) {
        tangibleF.object3D.position.x -= 0.1 * Math.sin(radZ - 1.5);
        tangibleF.object3D.position.z += 0.1 * Math.cos(radZ - 1.5);
      }
    }
  }
  //left side
  if (radZ > -5.28 && radZ < -3.75) {
    //console.log("izquierda");
    //tangibleF.object3D.rotation.x = pitch;
    //tangibleF.object3D.rotation.z = roll;
  }
  //right side
  if (radZ < -0.82 && radZ > -2.15) {
    //zzconsole.log("derecha");
    //tangibleF.object3D.rotation.x = -pitch;
    //tangibleF.object3D.rotation.z = -roll;
  }
  // console.log("radZ: " + radZ + ";z: " + tangibleF.object3D.rotation.z  + "; y: " + tangibleF.object3D.rotation.y);

}

function coversionGyroValues() {
  if (Math.abs(gxB - gx) > difgX / 2) {
    let aux = 0.0;
    if (gx > -6) {
      aux = gx / 180.0;
    }
    else if (gx < -8) {
      aux = gx / 200.0;
    }

    degreesX -= aux;

    if (degreesX > 0) {
      degreesX -= 360.0;
      degreesXdriftPos++;
    }
    else if (degreesX < -360) {
      degreesX = 0.0;
      degreesXdriftNeg--;
    }
    if (degreesXdriftPos >= 6) {
      //degreesX -= 0.81;
      degreesXdriftPos = 0;
    }
    if (degreesXdriftNeg >= 6) {
      //degreesX -= 0.81;
      degreesXdriftNeg = 0;
    }
    gxBaux = gx;
  }

  if (Math.abs(gyBaux - gy) > difgY) {
    if (gy > 19) {
      aux = gy / 180.0;
      degreesYdriftPos++;
    }
    else if (gy < 18) {
      aux = gy / 200.0;
      degreesYdriftNeg++;
    }

    degreesY -= aux;

    if (degreesY > 0) {
      degreesY -= 360.0;
    }
    else if (degreesY < -360) {
      degreesY = 0.0;
    }
    if (degreesYdriftPos >= 8) {
      //degreesY -= 0.81;
      degreesYdriftPos = 0;
    }
    if (degreesYdriftNeg >= 8) {
      //degreesY += 0.81;
      degreesYdriftPos = 0;
    }
    gyBaux = gy;
  }

  if (Math.abs(gzBaux - gz) > difgZ) {
    if (gz > -6) {
      aux = gz / 180.0;
      degreesZdriftPos++;
    }
    else if (gz < -8) {
      aux = gz / 180.0;
      degreesZdriftNeg++;
    }

    degreesZ -= aux;

    if (degreesZ > 0) {
      degreesZ -= 360.0;
    }
    else if (degreesZ < -360) {
      degreesZ = 0.0;
    }
    if (degreesZdriftPos >= 8) {
      degreesZ -= 0.746;
      degreesZdriftPos = 0;
    }
    if (degreesZdriftNeg >= 8) {
      degreesZ += 0.250;
      degreesZdriftNeg = 0;
    }
    radZ = degreesZ * pi / 180.0;
  }
}

/*
  This function is used to get the calibration values
    */
function calibration() {
  getSensorData();

  if (count < 30) {
    if (ax < minX)
      minX = ax;
    if (ax > maxX)
      maxX = ax;

    difX = maxX - minX;

    if (ay < minY)
      minY = ay;
    if (ay > maxY)
      maxY = ay;

    difY = maxY - minY;

    if (az < minZ)
      minZ = az;
    if (az > maxZ)
      maxZ = az;

    difZ = maxZ - minZ;

    if (gx < mingX)
      mingX = gx;
    if (gx > maxgX)
      maxgX = gx;

    difgX = maxgX - mingX;

    if (gy < mingY)
      mingY = gy;
    if (gy > maxgY)
      maxgY = gy;

    difgY = maxgY - mingY;

    if (gz < mingZ)
      mingZ = gz;
    if (gz > maxgZ)
      maxgZ = gz;

    difgZ = maxgZ - mingZ;
    count++;
  }
  else if (count == 30) {
    console.log("difX: " + difX + "; difY: " + difY + "; difZ: " + difZ);
    console.log("difgX: " + difgX + "; difgY: " + difgY + "; difgZ: " + difgZ);
    let pitch = -(Math.atan2(ax, Math.sqrt(ay * ay + az * az)));// * 180.0) / pi;
    let roll = -(Math.atan2(ay, Math.sqrt(ax * ax + az * az)));// * 180.0) / pi;
    //let yaw = -(Math.atan2(Math.sqrt(ay * ay + ax * ax), az));// * 180.0) / pi;
    pitchB = pitch;
    rollB = roll;
    //yawB = yaw;
    gxB = gx;
    gyB = gy;
    gzB = gz;

    calibrating = false;
    console.log("Fin calibracion");
    stopWS("calibration ended");
    count = 0;
  }
}




















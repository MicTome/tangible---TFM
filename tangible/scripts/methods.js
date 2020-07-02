
/**
 * Method to show the object text and to do something with it
 * @param {*} name object name
 */
function showText(name) {
  if (name == "sofa2D") {
    sofa2DHit = true;
    //let the square text visible
    sofa2Dtext.setAttribute('visible', true);

  }
  else if (name == "robot") {
    robotHit = true;
    //show a text from robot and change the position
    robotText.setAttribute('visible', true);
    let x = robot.object3D.position.x - 1;
    let y = robot.object3D.position.y;
    let z = robot.object3D.position.z;
    //make an animation to change position
    robot.setAttribute('animation__position', "property: position; to: " + x + " " + y + " " + z + "; dur:1000; loop: false");
    x = robotText.object3D.position.x - 1;
    y = robotText.object3D.position.y;
    z = robotText.object3D.position.z;
    robotText.setAttribute('animation__position', "property: position; to: " + x + " " + y + " " + z + "; dur:1000; loop: false");
  }
  else if (name == "carD") {
    carDHit = true;
    //let the square text visible
    carDText.setAttribute('visible', true);

  }
  else if (name == "fiatD") {
    fiatDHit = true;
    //let the square text visible
    fiatDText.setAttribute('visible', true);
    let x = fiatD.object3D.position.x - 1;
    let y = fiatD.object3D.position.y;
    let z = fiatD.object3D.position.z - 1;
    //make an animation to change position
    fiatD.setAttribute('animation__position', "property: position; to: " + x + " " + y + " " + z + "; dur:1000; loop: false");
    x = fiatDText.object3D.position.x - 1;
    y = fiatDText.object3D.position.y;
    z = fiatDText.object3D.position.z - 1;
    fiatDText.setAttribute('animation__position', "property: position; to: " + x + " " + y + " " + z + "; dur:1000; loop: false");
  }
  else if (name == "sofaD") {
    sofaDHit = true;
    //let the square text visible
    sofaDText.setAttribute('visible', true);

  }
}

/**
 * Method to know which object is under interaction with the tangible object
 * @param {*} evt interaction event lenght
 */
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
    if (sofaDHit) {
      sofaDHit = false;
      sofaDText.setAttribute('visible', false);
    }
    if (carDHit) {
      carDHit = false;
      carDText.setAttribute('visible', false);
    }
    if (fiatDHit) {
      fiatDHit = false;
      fiatDText.setAttribute('visible', false);
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

  //left direction, rotate carousel rotate to the left
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
  //right direction, rotate carousel rotate to the right
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
  //default position, charge carousel in default position
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
  //delete the current model
  tangibleR.removeAttribute('gltf-model');
  tangibleD.removeAttribute('gltf-model');
  tangibleF.removeAttribute('gltf-model');
  //get the new object model and scale it
  tangibleR.setAttribute('gltf-model', selectableObjects[index]);
  tangibleD.setAttribute('gltf-model', selectableObjects[index]);
  tangibleF.setAttribute('gltf-model', selectableObjects[index]);
  tangibleR.setAttribute('autoscale', '2');
  tangibleD.setAttribute('autoscale', '2');
  tangibleF.setAttribute('autoscale', '2');
}

/**
 * Method that fill the objects list through an http request because
 * navigator core security doesn't let you access to system files by default
 */
function chargeObjects() {
  while (selectableObjects.length > 0)
    selectableObjects.pop();
  //http rquest with get sentence.
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/server', true);
  xhr.onload = function () {
    // Request finished. Do processing here.
    if (xhr.readyState == 4 && xhr.status == "200") {
      //get file names
      selectableObjects = JSON.parse(xhr.responseText);

    }
    else {
      console.log("Error al obtener los modelos");
    }
    //if there's no object in the directory, gives all changable object shapes a box model
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
  //nothing is sent due to get request
  xhr.send(null);
}

/**
 * Method where all data from sensors is parsed from json to float
 */
function getSensorData() {
  let data = "";
  data = JSON.parse(content);
  //gyro data
  gx = parseFloat(data.gyroX);
  gy = parseFloat(data.gyroY);
  gz = parseFloat(data.gyroZ);
  //accelerator data
  ax = parseFloat(data.accelX);
  ay = parseFloat(data.accelY);
  az = parseFloat(data.accelZ);
}

/**
 * Method to clear all variables when the interface goes out of rotate, displace and free scenes
 */
function clearSensorVariables() {
  gx = 0.0;
  gy = 0.0;
  gz = 0.0;
  ax = 0.0;
  ay = 0.0;
  az = 0.0;
}

/*
Variables to get time and data to .csv files
let ro = [];
let drx = [], dry = [], drz = [];
*/

/**
 * Method of Rotar scene.
 * Rotate the tangible object
 * Calculate the rotation values to know where the tangible object is facing
 * by using the 3 axis from both sensors.
 * Gyroscope values are used to let the system know if it's rotating or its just noise, except
 * Z axis that is used to rotate the object when accelerator can't give real values
 * Accelerator is used to rotate the object in X and Y axis but it ca't be used on Z axis because
 * Z axis doesn't change due to the use of gravity values
 */
function rotation() {
  getSensorData();

  //transform sensor values into degrees
  conversionGyroValues();

  /*let now = new Date();
  let millis = now.getMilliseconds();
  ro.push(millis);
  drx.push(Math.trunc(degreesX));
  dry.push(Math.trunc(degreesY));
  drz.push(Math.trunc(degreesZ));*/

  //auxiliar method
  let paux = 0.0;

  //minimal movement values of X axis
  if (gx > 100.0 || gx < -100) {
    //calculate pitch in radians with accelerator values
    //pitch is focused on X axis, so it use Y and Z values to calcultate the final itself
    pitch = -(Math.atan2(ax, Math.sqrt(ay * ay + az * az)));// * 180.0) / pi;
    //pitchB is the pitch calculated before the actual one
    //f the difference is bigger than half noise value, then the sectors are calculated
    if (Math.abs(pitchB - pitch) > difX / 2) {
      //Using the degrees, Y and Z axis must be in right  of sector circunference. To know which position
      //is it, when degrees are smaller than -270 and bigger than -90, the degrees are in the right of the
      //circunference.
      //Y Z
      if ((degreesY < -270 || degreesY > -90) && (degreesZ < -270 || degreesZ > -90)) {
        //X axis is in right sectors
        if (degreesX < -270 || degreesX > -90) {
          pitch = pitch;
        }
        //X axis in top left sector
        if (degreesX < -180 && degreesX > -270) {
          //pitch is increase from its maximun value (PI/2) to its value + PI/2
          paux = radValueMax - pitch;
          pitch = paux;
        }
        //X axis in botom left sector
        if (degreesX > -180 && degreesX < -90) {

          paux = -radValueMax - pitch;
          pitch = paux;
        }
      }
      //Y axis in right sectors, Z axis in left sectors, which means that the tangible object is upside down
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
      //Y axis in left sectors which means the object is turned back and Z axis in right sectors
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
      //Both on left sectors, the object is turned back and upside down
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
      //object x axis is pitch value in radians
      tangibleR.object3D.rotation.x = pitch;
      pitchB = pitch;
    }

  }
  //It's the same thing than before, but with Y axis as a main one
  if (gy > 100.0 || gy < -100) {
    //roll is calclated based on accelerator values
    roll = -(Math.atan2(ay, Math.sqrt(ax * ax + az * az)));// * 180.0 / pi;
    if (Math.abs(rollB - roll) > difY / 2) {
      //X and Z axis on right sectors
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
      //X on right sectors and Z on left ones
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
      //X on left sectors and Z on right ones
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
      //Both on left sectors
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
      //roll changes de Z axis of the object
      tangibleR.object3D.rotation.z = roll;
      rollB = roll;
    }
  }
  //Because accelerator can't give degree changes, Z axis of gyro is used on it's place
  //dif isn't halved in this case
  if (Math.abs(gzBaux - gz) > difgZ) {
    //radZ is on radians valie to the object
    tangibleR.object3D.rotation.y = radZ;
    gzBaux = gz;
  }
}

/**
 * Method of Mover scene
 * Move the tangible object around the scene and the camera follow it when it's near the edge of
 * field vision. Camera doesn't follow when the object goes near or far it.
 * Use pitch and roll in degrees to move the object
 */
function displace() {
  getSensorData();
  //let now = new Date();

  //calculate pitch and roll
  let pitch = -(Math.atan2(ax, Math.sqrt(ay * ay + az * az))) * 180.0 / pi;
  let roll = -(Math.atan2(ay, Math.sqrt(ax * ax + az * az))) * 180.0 / pi;

  /* Values for csv file
   let millis = now.getMilliseconds();
   ro.push(millis);
   drx.push(Math.trunc(pitch));
   dry.push(Math.trunc(roll));
   */

  //displace forward
  //use pitch values in different ranges to move the object
  //when the object rotate too much, instead of moving forward, the object moves downward
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
  //when the object rotate too much, instead of moving backward, the object moves upward
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

  //noise value range of pitch
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

  /*
  when activate, use Z axis value
  //used to conver the Z axis value into radians
  conversionGyroValues();
  

  if (Math.abs(gzBaux - gz) > difgZ) {
    tangibleD.object3D.rotation.y = radZ;
    gzBaux = gz;
  }
*/

  /**
   * Here the camera movement is defined
   * Based on tangible object model position, the camera moves with it or not
   * when the distance is bigger than certain value, the camera moves
   * Same with the button Back on screen
   */
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

/**
 * Method for the Libre scene
 * Moves the tangible object similar to a plane with the camera stuck on it's back
 * On this method, it's used the algorithm from rotation and displace methods
 * calculates the sector of axis an then take the rotation to move
 */
function free() {
  getSensorData();

  //get pitch and roll values
  let pitch = -(Math.atan2(ax, Math.sqrt(ay * ay + az * az))) * 180.0 / pi;
  let roll = -(Math.atan2(ay, Math.sqrt(ax * ax + az * az))) * 180.0 / pi;
  //get values converted
  conversionGyroValues();
  /*
  Used to csv file
  let now = new Date();
  let millis = now.getMilliseconds();
  ro.push(millis);
  drx.push(Math.trunc(pitch));
  dry.push(Math.trunc(roll));
  drz.push(Math.trunc(degreesZ));
 */

  //same thing as rotation, calculate sectors but only taking in account the right sectors of X axis
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
  //same thing as rotation, calculate sectors but only taking in account the right sectors of Y axis
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

  //Based on Z axis values in radians, the position changes depending on the rotation level
  if ((radZ < -5.45 || radZ > -0.62)) {
    //displace forward
    if (pitch <= -6.0 && pitch >= -80.0) {
      if (pitch <= -16.0) {
        //change position of object adding the sin or cos of Z value
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

/**
 * Method that calculates the degrees of gyro from the data obtained
 * Every n times, the values must be adjust due to the noise of gyro values
 */
function conversionGyroValues() {
  //gxB is the X axis value calculated before the current one 
  //X axis
  if (Math.abs(gxB - gx) > difgX / 2) {
    let aux = 0.0;
    //if theres changes more than noise values, the gx is calculated
    //the values of correction are different because the gyro values 
    if (gx > -6) {
      aux = gx / 180.0;
    }
    else if (gx < -8) {
      aux = gx / 200.0;
    }
    //get the 
    degreesX -= aux;

    //adjust degrees to 0 to 360
    if (degreesX > 0) {
      degreesX -= 360.0;
      //value to adjust when values are considered positive
      degreesXdriftPos++;
    }
    else if (degreesX < -360) {
      degreesX = 0.0;
      //value to adjust when values are considered negative
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

  //Y axis
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

  //Z axis
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
    //noise value adjustment
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

//variable for csv file
let co = [];
/*
  This function is used to get the calibration values
  Make a count of 30 iterations and calculate noise values of the 3 axis of the 2 sensors
    */
function calibration() {
  getSensorData();

  if (count < 30) {
    /*let now = new Date();
    let millis = now.getTime();
    co.push(millis);
*/

//get min and max value and calculate the difference without dividing it because some methods
//as to use entire noise value
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
    /*
    http request for csv files data
    let xh = new XMLHttpRequest();
    xh.open("POST", "/calibrar", true);
    xh.withCredentials = true;
    xh.setRequestHeader('Content-Type', 'application/json');
    let json = {};
    json["Time"] = co;
    json = JSON.stringify(json);
    xh.send(json);
*/
    //calculate pitch and roll value to compare new ones in methods
    console.log("difX: " + difX + "; difY: " + difY + "; difZ: " + difZ);
    console.log("difgX: " + difgX + "; difgY: " + difgY + "; difgZ: " + difgZ);
    let pitch = -(Math.atan2(ax, Math.sqrt(ay * ay + az * az)));// * 180.0) / pi;
    let roll = -(Math.atan2(ay, Math.sqrt(ax * ax + az * az)));// * 180.0) / pi;
    //let yaw = -(Math.atan2(Math.sqrt(ay * ay + ax * ax), az));// * 180.0) / pi;
    //old values to compare
    pitchB = pitch;
    rollB = roll;
    //yawB = yaw;
    gxB = gx;
    gyB = gy;
    gzB = gz;
    //end the calibration phase
    calibrating = false;
    console.log("Fin calibracion");
    //stop websocket from continuous sharing data
    stopWS("calibration ended");
    count = 0;
  }
}




















/*Script with all the methods
*/

/**
 * Charge the selection scene:
 * 1º. Dispalce the objects from the other scene and make the
 *   other scene invisible (because it's an entity due to a-frame limitations)
 * 2º. Make the selection scene visible
 * 3º. Start positioning through animations sets
 */
function chargeSelection() {
  boxStart.setAttribute('position', "100 0 0");
  document.querySelector('#initTittle').setAttribute('animation', "property: visible; to: false; dur:3000; loop: false");

  document.querySelector('#selectionScene').setAttribute('visible', true);
  //Animation prompt after the screen is visible
  boxR.setAttribute('animation__rotation', "property: rotation; from: 0 0 0; to: -20 30 0; dur:1000; loop: false");
  boxR.setAttribute('animation__position', "property: position; from: -1 0 0; to: -2 -1 -1; dur:1000; loop: false");

  boxD.setAttribute('animation__position', "property: position; from: 0 0 0; to: 0 -0.85 -1; dur:1000; loop: false");
  boxD.setAttribute('animation__rotation', "property: rotation; from: 0 0 0; to: -20 0 0; dur:1000; loop: false");

  boxF.setAttribute('animation__position', "property: position; from: 1 0 0; to: 2 -1 -1; dur:1000; loop: false");
  boxF.setAttribute('animation__rotation', "property: rotation; from: 0 0 0; to: -20 -30 0; dur:1000; loop: false");

  boxS.setAttribute('animation__position', "property: position; from: 0 1.25 0; to: 0 0.75 -1; dur:1000; loop: false");
  boxS.setAttribute('animation__rotation', "property: rotation; from: 0 0 0; to: 10 0 0; dur:1000; loop: false");

  gPlane.setAttribute('position', "0 -1 -3");
  //Check what text has to be in textInfoConnection
  textInfoConnection.setAttribute('animation__position', "property: position; from: 1.6 4 2; to: 1.6 2.4 -1; dur:1000; loop: false");
  if (connectionClosed)
    reconnect.setAttribute('animation__position', "property: position; from: 3.6 4 2; to: 3.6 1.9 -1; dur:1000; loop: false");
  if (connectionAchieved)
    disconnect.setAttribute('animation__position', "property: position; from: 3.6 4 2; to: 3.55 1.9 -1; dur:1000; loop: false");
  //Wait until all animations are ended
  setTimeout(function () {
    selectionScreen = true;
  }, 1000);
}


/**
 * Charge the rotation scene:
 * 1º. The objects do some animations
 * 2º. Displace the objects from the selection scene and make it
 *     invisible (because it's an entity due to a-frame limitations)
 * 3º. Make the rotation scene visible
 * 4º. Position the objects.
 * Note: order of 2, 3 and 4 doesn't matter if it doesn't have animations
 */
function chargeRotation() {
  boxR.setAttribute('animation__position', "property: position; from: -2 -1 -1; to: 0 0 0.5; dur:1000; loop: false");
  boxR.setAttribute('animation__rotation', "property: rotation; from: -20 30 0; to: 0 0 0; dur:1000; loop: false");

  boxD.setAttribute('animation__position', "property: position; from: 0 -0.85 -1; to: 2 -0.5 -1; dur:1000; loop: false");

  boxF.setAttribute('animation__position', "property: position; from: 2 -1 -1; to: 4 -0.5 -1; dur:1000; loop: false");

  boxS.setAttribute('animation__position', "property: position; from: 0 0.75 -1; to: 2 1.1 -1; dur:1000; loop: false");

  gPlane.setAttribute('animation__position', "property: position; from: 0 -1 -3; to: 2 -0.5 -3; dur:1000; loop: false");
  setTimeout(function () {
    document.querySelector('#selectionScene').setAttribute('visible', false);
    tangibleR.setAttribute('position', "0 0 0");
    backR.setAttribute('position', "-0.75 -0.3 2");
    gxBaux = gxB;
    gyBaux = gyB;
    gzBaux = gzB;
    document.querySelector('#rotationScene').setAttribute('visible', true);

    boxR.setAttribute('position', "100 0 0");

    boxD.setAttribute('position', "100 0 0");

    boxF.setAttribute('position', "100 0 0");

    boxS.setAttribute('position', "100 0 0");

    gPlane.setAttribute('position', "100 0 0");
  }, 1000);
}

/**
 * Charge the selection scene from rotation scene:
 * It's the inverse of chargeRotation()
 * 1º. Dispalce objects from rotation scene.
 * 2º. Make this scene invisible.
 * 3º. Make visible te selection one.
 * 4º. Position through animations
 */
function chargeFromRotation() {
  degreesX = 0.0;
  degreesXdriftPos = 0;
  degreesXdriftNeg = 0;
  degreesY = 0.0;
  degreesYdriftPos = 0;
  degreesYdriftNeg = 0;
  degreesZ = 0.0;
  degreesZdriftPos = 0;
  degreesZdriftNeg = 0;
  pitch = 0.0;
  roll = 0.0;
  tangibleR.object3D.rotation.x = 0;
  tangibleR.object3D.rotation.y = 0;
  tangibleR.object3D.rotation.z = 0;
  backR.setAttribute('position', "100 0 0");
  tangibleR.setAttribute('position', "100 0 0");
  document.querySelector('#rotationScene').setAttribute('visible', false);

  document.querySelector('#selectionScene').setAttribute('visible', true);
  //Animation prompt after the screen is visible
  boxR.setAttribute('animation__position', "property: position; from: 0 0 0.5; to: -2 -1 -1; dur:1000; loop: false");
  boxR.setAttribute('animation__rotation', "property: rotation; from: 0 0 0; to: -20 30 0; dur:1000; loop: false");
  boxR.setAttribute('animation__scale', "property: scale; from: 1.5 1.5 1.5; to: 1 1 1; dur:1000; loop: false");

  boxD.setAttribute('animation__position', "property: position; from: 2 -0.5 -1; to: 0 -0.85 -1; dur:1000; loop: false");

  boxF.setAttribute('animation__position', "property: position; from: 4 -0.5 -1; to: 2 -1 -1; dur:1000; loop: false");

  boxS.setAttribute('animation__position', "property: position; from: 2 1.1 -1; to: 0 0.75 -1; dur:1000; loop: false");

  gPlane.setAttribute('animation__position', "property: position; from: 2 -0.5 -3; to: 0 -1 -3 dur:1000; loop: false");
  //Set the scene where we are at the end
  setTimeout(function () {
    selectionScreen = true;
    rotationScreen = false;
  }, 1000);
}


/**
 * Charge the dispalcement scene:
 * 1º. The objects do some animations
 * 2º. Displace the objects from the selection scene and make
 *     it invisible (because it's an entity due to a-frame limitations)
 * 3º. Make the selection scene visible
 * 4º. Position the objects.
 * Note: order of 2, 3 and 4 doesn't matter if it doesn't have animations
 */
function chargeDisplace() {
  boxD.setAttribute('animation__position', "property: position; from: 0 -0.85 -1; to: 0 0 0.25; dur:1000; loop: false");
  boxD.setAttribute('animation__rotation', "property: rotation; from: -20 0 0; to: 0 0 0; dur:1000; loop: false");

  boxR.setAttribute('animation__position', "property: position; from: -2 -1 -1; to: -2.5 -1 -1; dur:1000; loop: false");

  boxF.setAttribute('animation__position', "property: position; from: 2 -1 -1; to: 2.5 -1 -1; dur:1000; loop: false");

  boxS.setAttribute('animation__position', "property: position; from: 0 0.75 -1; to: 0 2 -1; dur:1000; loop: false");

  gPlane.setAttribute('animation__position', "property: position; from: 0 -1 -3; to: 0 -0.5 -3; dur:1000; loop: false");

  camara.setAttribute('position', '0 0 2.5');
  setTimeout(function () {
    document.querySelector('#selectionScene').setAttribute('visible', false);
    camara.setAttribute('active', false);
    camaraD.setAttribute('active', true);
    camaraD.setAttribute('position', '0 0 2.5');
    sofa2DHit = false;
    robotHit = false;
    sofaDHit = false;
    carDHit = false;
    fiatDHit = false;
    displaceScreen = true;
    selectionScreen = false;
    gzBaux = gzB;
    //Scene objects
    planeD.setAttribute('position', "0 -9 0");
    fiatD.setAttribute('position', "-3 -1 -2");
    fiatDText.setAttribute('position', "-3 0 -2");
    fiatDText.setAttribute('visible', false);
    carD.setAttribute('position', "0 -2 -3");
    carDText.setAttribute('position', "0 -2 -3");
    carDText.setAttribute('visible', false);
    sofaD.setAttribute('position', "0 -1 -5");
    sofaDText.setAttribute('position', "0 0 -5");
    sofaDText.setAttribute('visible', false);
    sofa2D.setAttribute('position', "3 -1 0");
    sofa2Dtext.setAttribute('position', "3 0 0");
    sofa2Dtext.setAttribute('visible', false);
    robot.setAttribute('position', "-4 0 -1");
    robotText.setAttribute('position', "-4 1.5 -1");
    robotText.setAttribute('visible', false);
    tangibleD.setAttribute('position', "0 0 -1");
    backD.setAttribute('position', "-0.75 -0.3 2");
    document.querySelector('#displaceScene').setAttribute('visible', true);

    boxR.setAttribute('position', "100 0 0");

    boxD.setAttribute('position', "100 0 0");

    boxF.setAttribute('position', "100 0 0");

    boxS.setAttribute('position', "100 0 0");

    gPlane.setAttribute('position', "100 0 0");
  }, 1000);
}

/**
 * Charge the selection scene from displacement scene:
 * It's the inverse of chargeDisplace()
 * 1º. Dispalce objects from displace scene.
 * 2º. Make this scene invisible.
 * 3º. Make visible te selection one.
 * 4º. Position through animations
 */
function chargeFromDisplace() {
  backD.setAttribute('position', "100 0 0");
  tangibleD.setAttribute('position', "100 0 0");
  planeD.setAttribute('position', "100 0 0");
  fiatD.setAttribute('position', "100 0 0");
  fiatDText.setAttribute('position', "100 0 0");
  fiatDText.setAttribute('visible', false);
  sofaD.setAttribute('position', "100 0 0");
  sofaDText.setAttribute('position', "100 0 0");
  sofaDText.setAttribute('visible', false);
  sofa2D.setAttribute('position', "100 0 0");
  sofa2Dtext.setAttribute('position', "100 0 0");
  sofa2Dtext.setAttribute('visible', false);
  robot.setAttribute('position', "100 0 0");
  robotText.setAttribute('position', "100 0 0");
  robotText.setAttribute('visible', false);
  carD.setAttribute('position', "100 0 0");
  document.querySelector('#displaceScene').setAttribute('visible', false);
  camara.setAttribute('position', '0 0 2.5');
  degreesZ = 0.0;
  degreesZdriftPos = 0;
  degreesZdriftNeg = 0;
  tangibleD.object3D.rotation.x = 0;
  tangibleD.object3D.rotation.y = 0;
  tangibleD.object3D.rotation.z = 0;
  document.querySelector('#selectionScene').setAttribute('visible', true);
  //Animation prompt after the screen is visible
  backD.setAttribute('position', "100 0 0");
  camara.setAttribute('position', '0 0 2.5');
  camara.setAttribute('active', true);
  camaraD.setAttribute('active', false);
  boxD.setAttribute('animation__position', "property: position; from: 0 0 0.5; to: 0 -0.85 -1; dur:1000; loop: false");
  boxD.setAttribute('animation__rotation', "property: rotation; from: 0 0 0; to: -20 0 0; dur:1000; loop: false");
  boxD.setAttribute('animation__scale', "property: scale; from: 1.5 1.5 1.5; to: 1 1 1; dur:1000; loop: false");

  boxR.setAttribute('animation__position', "property: position; from: -2.5 -1 -1; to: -2 -1 -1; dur:1000; loop: false");

  boxF.setAttribute('animation__position', "property: position; from: 2.5 -1 -1; to: 2 -1 -1; dur:1000; loop: false");

  boxS.setAttribute('animation__position', "property: position; from: 0 2 -1; to: 0 0.75 -1; dur:1000; loop: false");

  gPlane.setAttribute('animation__position', "property: position; from: 0 -0.5 -3; to: 0 -1 -3 dur:1000; loop: false");

  setTimeout(function () {
    backD.setAttribute('position', "100 0 0");
    camara.setAttribute('position', '0 0 2.5');
    selectionScreen = true;
    displaceScreen = false;
    sofa2DHit = false;
    robotHit = false;
    sofaDHit = false;
    carDHit = false;
    fiatDHit = false;
  }, 1000);
}


/**
 * Charge the free movement scene:
 * 1º. The objects do some animations
 * 2º. Displace the objects from the selection scene and make
 *     it invisible (because it's an entity due to a-frame limitations)
 * 3º. Make the free movement scene visible
 * 4º. Position the objects.
 * Note: order of 2, 3 and 4 doesn't matter if it doesn't have animations
 */
function chargeFree() {
  gxBaux = gxB;
  gyBaux = gyB;
  gzBaux = gzB;
  camara.setAttribute('position', '0 0 2.5');
  boxF.setAttribute('animation__position', "property: position; from: 2 -1 -1; to: 0 0 0.5; dur:1000; loop: false");
  boxF.setAttribute('animation__rotation', "property: rotation; from: -20 -30 0; to: 0 0 0; dur:1000; loop: false");

  boxD.setAttribute('animation__position', "property: position; from: 0 -0.85 -1; to: -2 -0.5 -1; dur:1000; loop: false");

  boxR.setAttribute('animation__position', "property: position; from: -2 -1 -1; to: -4 -0.5 -1; dur:1000; loop: false");

  boxS.setAttribute('animation__position', "property: position; from: 0 0.75 -1; to: -2 1.1 -1; dur:1000; loop: false");

  gPlane.setAttribute('animation__position', "property: position; from: 0 -1 -3; to: -2 -0.5 -3; dur:1000; loop: false");
  setTimeout(function () {
    document.querySelector('#selectionScene').setAttribute('visible', false);

    freeScreen = true;
    selectionScreen = false;
    planeF.setAttribute('position', "0 -9 0");
    fiatF.setAttribute('position', "-3 -1 -2");
    carF.setAttribute('position', "0 -1 0");
    sofaF.setAttribute('position', "0 -1 -2");
    sofa2F.setAttribute('position', "2 -1 1");
    tangibleF.setAttribute('position', "0 0 -1");
    backF.setAttribute('position', "-0.75 -0.3 3");
    camara.setAttribute('active', false);
    camaraF.setAttribute('active', true);
    document.querySelector('#freeScene').setAttribute('visible', true);

    boxR.setAttribute('position', "100 0 0");

    boxD.setAttribute('position', "100 0 0");

    boxF.setAttribute('position', "100 0 0");

    boxS.setAttribute('position', "100 0 0");

    gPlane.setAttribute('position', "100 0 0");
  }, 1000);
}

/**
 * Charge the selection scene from free movement scene:
 * It's the inverse of chargeFree()
 * 1º. Dispalce objects from free movement scene.
 * 2º. Make this scene invisible.
 * 3º. Make visible te selection one.
 * 4º. Position through animations
 */
function chargeFromFree() {

  degreesX = 0.0;
  degreesXdriftPos = 0;
  degreesXdriftNeg = 0;
  degreesY = 0.0;
  degreesYdriftPos = 0;
  degreesYdriftNeg = 0;
  degreesZ = 0.0;
  degreesZdriftPos = 0;
  degreesZdriftNeg = 0;
  pitch = 0.0;
  roll = 0.0;
  tangibleR.object3D.rotation.x = 0;
  tangibleR.object3D.rotation.y = 0;
  tangibleR.object3D.rotation.z = 0;
  backF.setAttribute('position', "100 0 0");
  tangibleF.setAttribute('position', "100 0 0");
  planeF.setAttribute('position', "100 0 0");
  fiatF.setAttribute('position', "100 0 0");
  sofaF.setAttribute('position', "100 0 0");
  sofa2F.setAttribute('position', "100 0 0");
  carF.setAttribute('position', "100 0 0");
  document.querySelector('#freeScene').setAttribute('visible', false);
  camara.setAttribute('position', '0 0 2.5');

  camara.setAttribute('active', true);
  camaraF.setAttribute('active', false);
  document.querySelector('#selectionScene').setAttribute('visible', true);
  //Animation prompt after the screen is visible
  backF.setAttribute('position', "100 0 0");
  camara.setAttribute('position', '0 0 2.5');
  camara.setAttribute('rotation', '0 0 0');
  boxF.setAttribute('animation__position', "property: position; from: 0 0 0.5; to: 2 -1 -1; dur:1000; loop: false");
  boxF.setAttribute('animation__rotation', "property: rotation; from: 0 0 0; to: -20 -30 0; dur:1000; loop: false");
  boxF.setAttribute('animation__scale', "property: scale; from: 1.5 1.5 1.5; to: 1 1 1; dur:1000; loop: false");

  boxD.setAttribute('animation__position', "property: position; from: -2 -0.5 -1; to: 0 -0.85 -1; dur:1000; loop: false");

  boxR.setAttribute('animation__position', "property: position; from: -4 -0.5 -1; to: -2 -1 -1; dur:1000; loop: false");

  boxS.setAttribute('animation__position', "property: position; from: -2 1.1 -1; to: 0 0.75 -1; dur:1000; loop: false");

  gPlane.setAttribute('animation__position', "property: position; from: -2 -0.5 -3; to: 0 -1 -3 dur:1000; loop: false");

  setTimeout(function () {
    backF.setAttribute('position', "100 0 0");
    camara.setAttribute('position', '0 0 2.5');
    camara.setAttribute('rotation', '0 0 0');
    selectionScreen = true;
    freeScreen = false;
  }, 1000);
}


/**
 * Charge the change shape scene:
 * 1º. The objects do some animations
 * 2º. Displace the objects from the selection scene and make
 *     it invisible (because it's an entity due to a-frame limitations)
 * 3º. Make the change shape scene visible
 * 4º. Position the objects.
 * Note: order of 2, 3 and 4 doesn't matter if it doesn't have animations
 */
function chargeShape() {
  boxS.setAttribute('animation__position', "property: position; from: 0 0.75 -1; to: 0 0 0.5; dur:1000; loop: false");
  boxS.setAttribute('animation__rotation', "property: rotation; from: 10 0 0; to: 0 0 0; dur:1000; loop: false");

  boxR.setAttribute('animation__position', "property: position; from: -2 -1 -1; to: -2.5 -1 -1; dur:1000; loop: false");

  boxF.setAttribute('animation__position', "property: position; from: 2 -1 -1; to: 2.5 -1 -1; dur:1000; loop: false");

  boxD.setAttribute('animation__position', "property: position; from: 0 -0.85 -1; to: 0 -2 -1; dur:1000; loop: false");

  gPlane.setAttribute('animation__position', "property: position; from: 0 -1 -3 to: 0 -1 -3; dur:1000; loop: false");
  setTimeout(function () {
    document.querySelector('#selectionScene').setAttribute('visible', false);
    selectLS.setAttribute('position', "-3.5 0 0");
    selectRS.setAttribute('position', "3.5 0 0");
    backS.setAttribute('position', "-0.75 -0.3 2");
    object.setAttribute('position', "0 0 0");
    object.setAttribute('animation__rotation', "property: rotation; from: 5 0 0; to: 5 360 0; easing: linear; dur:5000; loop: true");
    objectLeft.setAttribute('position', "-9 0 -8");
    objectRight.setAttribute('position', "9 0 -8");
    //auxObject.setAttribute('visible', false);
    //method to generate de carrousel objects
    positionObjects(2);
    selectObject.setAttribute('position', "0 -1.6 0");
    update.setAttribute('position', "3.6 -1.25 0");
    document.querySelector('#shapeScene').setAttribute('visible', true);

    boxR.setAttribute('position', "100 0 0");

    boxD.setAttribute('position', "100 0 0");

    boxF.setAttribute('position', "100 0 0");

    boxS.setAttribute('position', "100 0 0");

    gPlane.setAttribute('position', "100 0 0");
  }, 1000);
}

/**
 * Charge the selection scene from change shape scene:
 * It's the inverse of chargeShape()
 * 1º. Dispalce objects from free movement scene.
 * 2º. Make this scene invisible.
 * 3º. Make visible te selection one.
 * 4º. Position through animations
 */
function chargeFromShape() {
  backS.setAttribute('position', "100 0 0");
  selectLS.setAttribute('position', "100 0 0");
  selectRS.setAttribute('position', "100 0 0");
  object.setAttribute('position', "100 0 0");
  objectLeft.setAttribute('position', "100 0 0");
  objectRight.setAttribute('position', "100 0 0");
  selectObject.setAttribute('position', "100 0 0");
  update.setAttribute('position', "100 0 0");
  //auxObject.setAttribute('position', "100 0 0");
  document.querySelector('#shapeScene').setAttribute('visible', false);

  document.querySelector('#selectionScene').setAttribute('visible', true);
  //Animation prompt after the screen is visible
  boxS.setAttribute('animation__position', "property: position; from: 0 0 0.5; to: 0 0.75 -1; dur:1000; loop: false");
  boxS.setAttribute('animation__rotation', "property: rotation; from: 0 0 0; to: 10 0 0; dur:1000; loop: false");
  boxS.setAttribute('animation__scale', "property: scale; from: 1.5 1.5 1.5; to: 1 1 1; dur:1000; loop: false");

  boxD.setAttribute('animation__position', "property: position; from: 0 -2 -1; to: 0 -0.85 -1; dur:1000; loop: false");

  boxF.setAttribute('animation__position', "property: position; from: 2.5 -1 -1; to: 2 -1 -1; dur:1000; loop: false");

  boxR.setAttribute('animation__position', "property: position; from: -2.5 -1 -1; to: -2 -1 -1; dur:1000; loop: false");

  gPlane.setAttribute('animation__position', "property: position; from: 0 -1 -3; to: 0 -1 -3 dur:1000; loop: false");

  setTimeout(function () {
    selectionScreen = true;
    shapeScreen = false;
  }, 1000);
}

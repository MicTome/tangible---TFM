/**
 * File with all the websocket configuration
 * This file contains the Client side of the connection
 */

//counter and websocket wariable
let times = 0;
let ws;

/**
 * Send a key value to start reading data
 */
function initWS(chain) {
  ws.send(chain);
}

/**
 * Send a key value to stop reading data
 */
function stopWS(chain) {
  ws.send(chain);
}

/**
 * Close the connection
 */
function end() {
  ws.close(1000, "Conexión ternimanda");
}

/**
 * Initiate the connection and call the method to the listeners
 */
function communication() {
  setTimeout(function () {
    //WebSocket "ws:" it's the http protocol value
    ws = new WebSocket("ws://192.168.7.2:5680/");
    console.log("Conectando...");
    //set some text to the entity and show the corresponding button
    textInfoConnection.setAttribute('text', "color: green; align: right; value: Conectando...; width: 10");
    disconnect.setAttribute('position', "100 0 0");
    reconnect.setAttribute('position', "3.55 1.9 -1");
    times++;
    socket();
  }, 550);
}

/**
 * Contains all the listener/methods of websocket
 */
function socket() {
  /**
   * Everytime a websocket is created, this listener is called
   */
  ws.addEventListener('open', function (event) {
    ws.send('Conexión abierta');
  });

  /**
   * Everytime the websocket recive a message from the server
   */
  ws.addEventListener('message', function (event) {
    connectionClosed = false;
    connectionAchieved = true;
    if (event.data == "Connetion achieved") {
      textInfoConnection.setAttribute('text', "color: green; align: right; value: Conectado correctamente; width: 10");
      setTimeout(function () {
        reconnect.setAttribute('position', "100 0 0");
        disconnect.setAttribute('position', "3.55 1.9 -1");
        textInfoConnection.setAttribute('animation__opacity', "property: text.opacity; from: 1; to: 0; dur:2000; loop: false");
      }, 500);
    }
    content = event.data;
    if (event.data == "calibrate") {
      calibrating = true;
    }
    if (calibrating) {
      setTimeout(function () {
        calibration()
      }, 180);
    }
    else {
      if(rotationScreen)
        rotation();
      if(displaceScreen)
        displace();
      if(freeScreen)
        free();
    }
  });

  /**
   * Everytime an error happens, this listener is called.
   */
  ws.addEventListener('error', function (event) {
    //while times is not 5, the conneixon is restarted, trying to connect
    if (times < 5) {
      console.log("Error");
      setTimeout(function () {
        ws.close();
        communication();
        console.log(times + " fallado");

        textInfoConnection.setAttribute('text', "color: red; align: right; value: Reconectando: " + times + " fallos; opacity: 1; width: 10");
      }, 200);
    }
    else {
      //After the 5 times, the auto reconnection ends
      ws.close();
      //textInfoConnection.setAttribute('text', "color: red; align: right; value: El servidor no responde; opacity: 1; width: 10");
      disconnect.setAttribute('position', "100 0 0");
      reconnect.setAttribute('position', "3.55 1.9 -1");
      console.log(times + " cerrado");
      connectionClosed = true;
    }
  });

  /**
   * Everytime a connection is ended, this listener racts
   */
  ws.addEventListener('close', function (event) {
    //only enters if a controlled cause happened
    if (times >= 5 || connectionClosed || connectionAchieved)
      if (event.wasClean) {
        console.log("Desconexion");
        textInfoConnection.setAttribute('text', "color: red; align: right; value: Desconectado; opacity: 1; width: 10");
        disconnect.setAttribute('position', "100 0 0");
        reconnect.setAttribute('position', "3.55 1.9 -1");
        ws.close(1000, "Conexión terminada");
      }
      else {
        console.log("Fallo en la conexión");
        textInfoConnection.setAttribute('text', "color: red; align: right; value: El servidor no responde; opacity: 1; width: 10");
        disconnect.setAttribute('position', "100 0 0");
        reconnect.setAttribute('position', "3.55 1.9 -1");
        ws.close();
      }
    connectionAchieved = false;
  });
}

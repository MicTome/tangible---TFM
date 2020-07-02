
#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys, smbus, time, signal
import math
import board
import busio
import adafruit_adxl34x
import logging
import tornado.web
import tornado.websocket
import tornado.ioloop
import tornado.options
import asyncio
from tornado.options import define, options

# Connection to both sensors
# Read the i2c board port
i2c = busio.I2C(board.SCL, board.SDA)
# Accelerator object
accel = adafruit_adxl34x.ADXL345(i2c)
# Connection to the board port
bus = smbus.SMBus(2)

# Define tornado.options variables
# The default port and ip to listen is set here
define("port", default=5680, help="run on the given port", type=int)
define("address", default="192.168.7.2", help="run on the given ip", type=int)


# Class to register the gyroscope used in the system
class ITG3200():
    global bus
    def __init__(self):
        self.GYRO_ADDRESS=0x68
        # ITG3200 Register Defines
        self.ITG3200_WHO=0x00
        self.ITG3200_SMPL=0x15
        self.ITG3200_DLPF=0x16
        self.ITG3200_INT_C=0x17
        self.ITG3200_INT_S=0x1A
        self.ITG3200_TMP_H=0x1B
        self.ITG3200_TMP_L=0x1C
        self.ITG3200_GX_H=0x1D
        self.ITG3200_GX_L=0x1E
        self.ITG3200_GY_H=0x1F
        self.ITG3200_GY_L=0x20
        self.ITG3200_GZ_H=0x21
        self.ITG3200_GZ_L=0x22
        self.ITG3200_PWR_M=0x3E
        
        #self.x_offset = 120
        #self.y_offset = 20
        #self.z_offset = 93

    # Initialization for ITG3200.                               
    def init(self):
        bus.write_byte_data(self.GYRO_ADDRESS, self.ITG3200_SMPL, 0x0B) #7) For 90ms frequency
        bus.write_byte_data(self.GYRO_ADDRESS, self.ITG3200_DLPF, 0x1E) #1E) f_sel: +/- 2000º/s; low pass filter: 10hz/1khz
        bus.write_byte_data(self.GYRO_ADDRESS, self.ITG3200_INT_C, 0x01) #Tell the gyro that you want to read all samples
        bus.write_byte_data(self.GYRO_ADDRESS, self.ITG3200_PWR_M, 0x01) #Clock source

    #Get and transform the data of the registers    
    def conversion(self):
        data = bus.read_i2c_block_data(self.GYRO_ADDRESS, self.ITG3200_GX_H, 6)
        #xGyro = self.read(data[0], data[1])
        xGyro = data[0] * 256 + data[1]
        #x = xGyro/14.375
        if xGyro > 32767 :
            xGyro -= 65536
        #yGyro = self.read(data[2], data[3])
        yGyro = data[2] * 256 + data[3]
        #y = yGyro/14.375
        if yGyro > 32767 :
            yGyro -= 65536  
        #zGyro = self.read(data[4], data[5])
        zGyro = data[4] * 256 + data[5]
        #z = zGyro/14.375  
        if zGyro > 32767 :
            zGyro -= 65536
        #return x, y, z
        return xGyro, yGyro, zGyro


#Object of gyro class
gyro = ITG3200()

# Tornado class to initiate te framework
class Application(tornado.web.Application):
    def __init__(self):
        handlers = [(r"/", MainHandler)]
        settings = dict(debug=True)
        tornado.web.Application.__init__(self, handlers, **settings)

# Class to handle the connection to this websocket server
# This class also has the main function that send data to clients
class MainHandler(tornado.websocket.WebSocketHandler):
    
    periodic = None
    periodicCalibration = None
    
    def check_origin(self, origin):
        return True

    def open(self):
        #Print on console 
        logging.info("A client connected.")

    def on_close(self):
        logging.info("A client disconnected")

    def on_message(self, message):
        logging.info("message: {}".format(message))
        if message == "Conexión abierta":
            self.write_message("Connetion achieved")
            gyro.init()
            #gyro.zeroCalibrate(500, 2)
            #print ("offet: ", gyro.x_offset, gyro.y_offset, gyro.z_offset)
            
            self.periodicCalibration = tornado.ioloop.PeriodicCallback(self.sensorsCalibration, 83) 
            self.periodicCalibration.start()
            self.write_message("calibrate")
        if message == "init":
            self.periodic = tornado.ioloop.PeriodicCallback(self.sensors, 83) #1000/16
            self.periodic.start()
        if message == "stop":
            self.periodic.stop()
        if message == "calibration ended":
            self.periodicCalibration.stop()
            
            

    def sensors(self):
        xGyro, yGyro, zGyro = gyro.conversion()
        data = { "gyroX" : str(xGyro), "gyroY" : str(yGyro), "gyroZ" : str(zGyro) , "accelX" : str(accel.acceleration[0]) , "accelY" : str(accel.acceleration[1]) , "accelZ" : str(accel.acceleration[2]) }
        try:
            self.write_message(data)
        except:
            logging.info("Cliente desconectado abrúptamente")
            self.periodic.stop()
            
    def sensorsCalibration(self):
        ax, ay, az = gyro.conversion()
        data = { "gyroX" : str(ax), "gyroY" : str(ay), "gyroZ" : str(az) , "accelX" : str(accel.acceleration[0]) , "accelY" : str(accel.acceleration[1]) , "accelZ" : str(accel.acceleration[2]) }
        try:
            self.write_message(data)
        except:
            logging.info("Cliente desconectado abrúptamente durante la calibracion")
            self.periodicCalibration.stop()
        
            
            
def main():
    tornado.options.parse_command_line()
    app = Application()
    #app.listen(options.port)

 # Setup HTTP Server
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port, options.address)

    tornado.ioloop.IOLoop.current().start()
if __name__ == "__main__":
    main()

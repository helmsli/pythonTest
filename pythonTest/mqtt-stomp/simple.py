#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
import datetime
import sys
import traceback
import stomp
import stomp.exception as exception
import threading



class MqttReConnection:
	def reConnection(self):
		pass
		
class MqttConnection(MqttReConnection):

	def __init__(self,connListener):
		self.connListener = connListener
		connListener.registerReconnection(self)
		self.myConn= None
	def connection(self):
		print("time:%s connection  +++++++++++++++++++++++++++++" % datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
		self.myConn = stomp.Connection([('localhost', 61613)], heartbeats=(4000, 4000),reconnect_attempts_max=3000)
		print self.myConn
		self.myConn.set_listener('', self.connListener)
		print("connection ------------")
		
		self.reConnection()
	def reConnection(self):
		#check the old connection,if old is ok,close the old connection
		try:
			if self.myConn is not None:
				print("disconnction is not None")
				self.myConn.disconnect()
		except Exception:
			print Exception 
		
	def reConnection(self):
		try:
			if self.myConn is not None:
				print("disconnction is not None")
				#self.myConn.disconnect()
		except Exception:
			print Exception 
		
		try:
			print("time:%s reconnection "%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
			#self.myConn = stomp.Connection([('localhost', 61613)], heartbeats=(4000, 4000))
			#self.myConn.set_listener('', self.connListener)
			self.myConn.start()
			self.myConn.connect('guest', 'guest', wait=True)
			self.myConn.subscribe(destination='/queue/test', id=1, ack='auto')
			print("time:%s reconnection end"%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
			
			#break
		except exception.ConnectFailedException as e:
			print "ConnectFailedException((((((((((((((((((((((((((((((((((((((((((((((((("
			print e
			print traceback.format_exc()
			timer = threading.Timer(5, self.connection)
			timer.start()
			#continue
		except exception.NotConnectedException as e:
			print "NotConnectedException((((((((((((((((((((((((((((((((((((((((((((((((("
			print e
			print traceback.format_exc()
			timer = threading.Timer(5, self.connection)
			timer.start()
			#continue
		except Exception as e:
			print e
			print traceback.format_exc()
			#break
		except:
			print("8888888888888888888888888888888888888888888")

class MyListener(stomp.ConnectionListener):
	def registerReconnection(self,mqttReconnection):
		self.mqttReconnection = mqttReconnection



	def on_message(self, headers, message):
		print('received a message "%s"' % message)
		print('processed message')
	def on_error(self, headers, message):
		try:
			print("on_error")
			timer = threading.Timer(5, self.connection)
			timer.start()
			print('time:%s on_error_disconnected *********************************************'%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))			
		except Exception:
			time.sleep(3)
			print("disconnected exception ##########################");
			
	def on_disconnected(self):
		try:
			print("time:%s on_disconnected"%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
			self.mqttReconnection.reConnection()
			print('time:%s on_disconnected_disconnected *********************************************'%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))			
		except Exception:
			time.sleep(3)
			print("disconnected exception ##########################");
			


myListener = MyListener()
myMqttConnection = MqttConnection(myListener)
myMqttConnection.connection()
while(True):
	command = raw_input('>>')
	
	if command =="exit":
		sys.exit()
	else:
		try:
			if(len(command)>0):
				print('time:%s send a message "%s"' % (datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'),command))
				myMqttConnection.myConn.send('/queue/test', command)
				#print 
		except Exception as e:
			print("time:%s send exception"% datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
			print e
			print traceback.format_exc()
	

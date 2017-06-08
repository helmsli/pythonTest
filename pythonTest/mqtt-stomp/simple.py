#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
import datetime
import sys
import traceback
import stomp
import stomp.exception as exception
import threading

import MqttCon as MqttConfig;

class MqttReConnection:
	def on_reConnection(self):
		pass
	def on_connected(self):
		pass

class MqttConnection(MqttReConnection):
	def __init__(self,connListener,destination="/quene/test",subscriberId=1):
		self.connListener = connListener
		connListener.registerReconnection(self)
		self.myConn= None
		self.myConn = stomp.Connection(MqttConfig.SERVER_HOST, heartbeats=MqttConfig.HEARTBEATS)
		self.myConn.set_listener('', self.connListener)
		self.timer=None
		self.subscriberId = subscriberId
		self.destination= destination
		
		'''
	def Connection(self):
		print("time:%s connection  +++++++++++++++++++++++++++++" % datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
		self.myConn = stomp.Connection([('localhost', 61613)], heartbeats=(4000, 4000),reconnect_attempts_max=3000)
		print self.myConn
		self.myConn.set_listener('', self.connListener)
		print("connection ------------")		
		return self._reConnection()
	'''
	def on_connected(self):
		try:
			if ( self.timer is not None) and  (not self.timer.finished.is_set()):
				self.timer.cancel()
				self.timer=None
		except:
			print("on connected:")
	def on_reConnection(self,forceStart=False):
		#check the old connection,if old is ok,close the old connection
		try:
			if self.myConn is not None:
				print("disconnction is not None")
				#self.myConn.disconnect()
		except:
			print("time:%s Reconnection disconnection is Error"%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
		#start the timer connection
		#cancel the older timer
		if ( self.timer is not None) and  (not self.timer.finished.is_set()):
			self.timer.cancel()
			print("timer is cancel")
		print("timer is start")
		self.timer = threading.Timer(MqttConfig.CONNECTION_INTERVAL, self._ReConnection)
		self.timer.start()
		print("timer start end")
		
	def _ReConnection(self):
		
		try:
			self.timer = threading.Timer(MqttConfig.RETRY_CONNECTION_INTERVAL, self._ReConnection)
			self.timer.start()		
			print("time:%s reconnection "%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
			
			self.myConn.start()
			self.myConn.connect('guest', 'guest', wait=True)
			self.myConn.subscribe(self.destination, self.subscriberId, ack='auto')
			print("time:%s reconnection end"%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
			
			#break
		except exception.ConnectFailedException as e:
			print "ConnectFailedException((((((((((((((((((((((((((((((((((((((((((((((((("
			print e
			print traceback.format_exc()
			
			#continue
		except exception.NotConnectedException as e:
			print "NotConnectedException((((((((((((((((((((((((((((((((((((((((((((((((("
			print e
			print traceback.format_exc()
			
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
			self.mqttReconnection.on_connected()
			print('time:%s on_error_disconnected *********************************************'%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))			
		except Exception:
			time.sleep(3)
			print("disconnected exception ##########################");
			
	def on_connected(self, headers, body):
		self.mqttReconnection.on_connected()
		print("time:%s on_connected success "%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
	def on_disconnected(self):
		try:
			print("time:%s on_disconnected"%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
			self.mqttReconnection.on_reConnection()
			print('time:%s on_disconnected_disconnected *********************************************'%datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))			
		except Exception:
			
			print("disconnected exception ##########################");
			


myListener = MyListener()
myMqttConnection = MqttConnection(myListener)
myMqttConnection.on_reConnection()
while(True):
	command = raw_input('>>')
	
	if command =="exit":
		sys.exit()
	else:
		try:
			if(len(command)>0):
				print('time:%s send a message "%s"' % (datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'),command))
				myMqttConnection.myConn.send(myMqttConnection.destination, command)
				#print 
		except Exception as e:
			print("time:%s send exception"% datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
			print e
			print traceback.format_exc()
	

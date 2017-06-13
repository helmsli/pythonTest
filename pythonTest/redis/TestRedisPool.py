#!/usr/bin/env python
# -*- coding: utf-8 -*-

import redis
import RedisCon as RedisConfig
import datetime
import sys
import traceback
#POOL = redis.ConnectionPool(host=RedisConfig.HOST, port=RedisConfig.PORT,password=RedisConfig.PASSWORD,db=0,max_connections=50)
POOL = redis.BlockingConnectionPool(host=RedisConfig.HOST, port=RedisConfig.PORT,password=RedisConfig.PASSWORD,db=0,max_connections=50)

def getVariable(variable_name):
    my_server = redis.Redis(connection_pool=POOL)
    response = my_server.get(variable_name)
    return response

def setVariable(variable_name, variable_value):
    my_server = redis.Redis(connection_pool=POOL)
    my_server.set(variable_name, variable_value)

def incr(variable_name,step=1):
    my_server = redis.Redis(connection_pool=POOL)
    my_server.incrby(variable_name,step) 

	
if __name__ == "__main__":
	print ('This is main of module "redis.py"')
	while(True):
		command = raw_input('>>')
		
		if command =="exit":
			sys.exit()
		else:
			try:
				if(len(command)>0):
					commandArgs = command.split()
					print('Time:%s input args %s' % (datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'),commandArgs))
					if((commandArgs[0].upper())=='SET'):
						if(len(commandArgs)>=3):
							setVariable(commandArgs[1].upper(),commandArgs[2])
							print("Set key: %s value:%s"%(commandArgs[1].upper(),commandArgs[2]))
						else:
							print("Error:you should have 3 parameters.")
					elif((commandArgs[0].upper())=='INCR'):
						if(len(commandArgs)>=3):
							incr(commandArgs[1].upper(),commandArgs[2].upper())
							print("Incr key: %s "%(commandArgs[1].upper()))
						elif(len(commandArgs)>=2):
							incr(commandArgs[1].upper())
							print("Incr key: %s "%(commandArgs[1].upper()))
						else:
							print("Error:you should have 3 parameters.")
					elif(len(commandArgs)>=2):
						print("Command:%s"% commandArgs[0].upper())
						print getVariable(commandArgs[1].upper())
					#print 
			except Exception as e:
				print("time:%s send exception"% datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
				print e
				print traceback.format_exc()
		
# -*- coding: UTF-8 -*-
"""
@描述：数据库连接池管理模块
@作者：CYH
@版本：V1.0
@创建时间：2016-11-24 上午8:43:14
"""

import pymysql;
from DBUtils.PooledDB import PooledDB;

import DbCon as Config;

'''
@功能：PT数据库连接池
'''   
class PTConnectionPool(object):
	__pool = None;
    
	def getConn(self):
		if self.__pool is None:
			self.__pool = PooledDB(creator=pymysql, mincached=Config.DB_MIN_CACHED , maxcached=Config.DB_MAX_CACHED, 
                                   maxshared=Config.DB_MAX_SHARED, maxconnections=Config.DB_MAX_CONNECYIONS, 
                                   blocking=Config.DB_BLOCKING, maxusage=Config.DB_MAX_USAGE, 
                                   setsession=Config.DB_SET_SESSION,
                                   host=Config.DB_HOST , port=Config.DB_PORT , 
                                   user=Config.DB_USER , passwd=Config.DB_PASSWORD ,
                                   db=Config.DB_DBNAME , use_unicode=False, charset=Config.DB_CHARSET);

		return self.__pool.connection();
		
	
	def __enter__(self):
		self.conn = self.getConn();
		self.cursor = self.conn.cursor();
		print "create con and cursor";
		return self;
	
	def __exit__(self,type,value,trace):
		self.cursor.close();
		self.conn.close();
		print "close con and cursor";
		 
def getPTConnection():
	return PTConnectionPool();
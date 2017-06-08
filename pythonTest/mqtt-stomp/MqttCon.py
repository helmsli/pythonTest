#! usr/bin/python
#-*- coding: UTF-8 -*-  

SERVER_HOST=[('localhost', 61613)]
HEARTBEATS=(4000, 4000)
#第一次重连的等待时间
CONNECTION_INTERVAL=3
#第一次连接失败后重试的时间间隔
RETRY_CONNECTION_INTERVAL=15

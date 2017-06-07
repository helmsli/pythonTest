# -*- coding: utf-8 -*-
import os
import time
import stomp

def connect_and_subscribe(conn):
    conn.start()
    conn.connect('guest', 'guest', wait=True)
    conn.subscribe(destination='/queue/test', id=1, ack='auto')

class MyListener(stomp.ConnectionListener):
    def __init__(self, conn):
        self.conn = conn

    def on_error(self, headers, message):
        print('received an error "%s"' % message)

    def on_message(self, headers, message):
        print('received a message "%s"' % message)
        for x in range(10):
            print(x)
            time.sleep(1)
        print('processed message')

    def on_disconnected(self):
        print('disconnected')
        connect_and_subscribe(self.conn)

conn = stomp.Connection([('localhost', 61613)], heartbeats=(4000, 4000))
conn.set_listener('', MyListener(conn))
connect_and_subscribe(conn)

while(True):
	command = raw_input('>>')
	print('send a message "%s"' % command)
	if command =="exit":
		sys.exit()
	else:
		try:
			conn.send('/queue/test', command)
		except Exception:
			print("send exception")
	

#!/usr/bin/env python
# -*- coding: utf-8 -*-
from threading import Timer  
import time  
  
timer_interval=1  
def delayrun():  
	print 'running'
	t=Timer(timer_interval,delayrun)  
	t.start()  
  
t=Timer(timer_interval,delayrun)  
t.start()  
while True:  

    time.sleep(10)  
    print 'main running'  
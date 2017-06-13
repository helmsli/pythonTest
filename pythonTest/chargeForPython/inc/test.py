#!/usr/bin/env python
# -*- coding: utf-8 -*-
import ctypes
import BtsCDRManager
cdr_fileName="CDR_375318_20170531103124.cdr";
sourceDir="./"
destDir="./"
results=[]
fileNameWchar =ctypes.c_wchar_p(cdr_fileName)

def testCallback():
	print("test abc")

def cdrManagerCallback(abc):
	print "t_callback_fn say : {0}".format(abc)
	return 11
btsCdrProcess = BtsCDRManager.BtsCDRmanager()

CMPFUNC = ctypes.CFUNCTYPE(ctypes.c_void_p) 
_callback = CMPFUNC(testCallback)
BtsCDRManager.py_setFunBtsCdrparseEnd(_callback)

'''
CMPFUNC = CFUNCTYPE(ctypes.c_int, ctypes.c_char_p) 
_callback = CMPFUNC(cdrManagerCallback)

if btsCdrProcess.setPyCallback(_callback):
	print "set call back ok"
	#my_test_callback("script call : good luck")
else :
	print "set call back fail"
	
'''	
#fileName.value='CDR_375318_20170531103124.cdr'

fileNameUtf_8 = cdr_fileName.encode('utf-8')
fileName = ctypes.c_char_p(fileNameUtf_8)
#BtsCDRManager.BtsCDRmanager().ParseBtsCDR.argtypes = [ctypes.c_char_p, ctypes.c_char_p]
#listRef = ctypes.pointer(results)
btsCdrProcess.ParseBtsCDR(cdr_fileName,sourceDir,destDir);
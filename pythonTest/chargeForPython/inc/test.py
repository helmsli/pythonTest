#!/usr/bin/env python
# -*- coding: utf-8 -*-
import ctypes
import BtsCDRManager
cdr_fileName="CDR_375318_20170531103124.cdr";
sourceDir="./"
destDir="./"
results=[]
fileNameWchar =ctypes.c_wchar_p(cdr_fileName)

#fileName.value='CDR_375318_20170531103124.cdr'

fileNameUtf_8 = cdr_fileName.encode('utf-8')
fileName = ctypes.c_char_p(fileNameUtf_8)
#BtsCDRManager.BtsCDRmanager().ParseBtsCDR.argtypes = [ctypes.c_char_p, ctypes.c_char_p]
#listRef = ctypes.pointer(results)
BtsCDRManager.BtsCDRmanager().ParseBtsCDR(cdr_fileName,sourceDir,destDir);
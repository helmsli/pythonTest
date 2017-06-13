#!/usr/bin/env python

"""
setup.py file for SWIG C\+\+/Python example
"""
from distutils.core import setup, Extension
BtsCDRManager_module = Extension('_BtsCDRManager',
sources=['BtsCDRmanager.cpp', 'BtsCDRManager_wrap.cxx',],
)
setup (name = 'BtsCDRManager',
version = '0.1',
author = "www.99fang.com",
description = """Simple swig C\+\+/Python example""",
ext_modules = [BtsCDRManager_module],
py_modules = ["BtsCDRManager"],
)
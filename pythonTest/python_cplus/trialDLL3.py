#trialDLL3.py
import ctypes
from ctypes import WinDLL

class MyMath(object):
    def __init__(self, offset):
        self.FunMath = WinDLL('trialDLL3.dll')
        self.FunMath.new_MyMathFuncs.argtypes = [ctypes.c_double]
        self.FunMath.new_MyMathFuncs.restype = ctypes.c_void_p

        self.FunMath.MyAdd.argtypes = [ctypes.c_void_p, \
                                       ctypes.c_double, ctypes.c_double]
        self.FunMath.MyAdd.restype = ctypes.c_double

        self.obj = self.FunMath.new_MyMathFuncs(offset)

    def FunAdd(self, a, b):
        self.FunMath.MyAdd(self.obj, a, b)

    def delete(): 
        self.FunMath.del_MyMathFuncs()
theMath = MyMath(3.3)        #create the instance
theMath.FunAdd(3.3, 3.3)     #call the function
theMath.FunMath.MyAdd(theMath.obj, 3.3 ,3.3)
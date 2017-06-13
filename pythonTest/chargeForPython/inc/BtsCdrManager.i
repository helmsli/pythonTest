/* BtsCdrManager.i */
%module BtsCDRManager
%{
#include "BtsCDRmanager.h"
typedef void (*FunBtsCdrparseEnd)(void);
extern FunBtsCdrparseEnd funBtsCdrparseEnd;

extern void setFunBtsCdrparseEnd(FunBtsCdrparseEnd c);
extern void py_setFunBtsCdrparseEnd(PyObject *PyFunc);
%}
%include "BtsCDRmanager.h"

extern FunBtsCdrparseEnd funBtsCdrparseEnd;

extern void setFunBtsCdrparseEnd(FunBtsCdrparseEnd c);
extern void py_setFunBtsCdrparseEnd(PyObject *PyFunc);

%{
static PyObject *my_pycallback = NULL;
static void PythonCallBack(void)
{
   PyObject *func, *arglist;
   PyObject *result;

   func = my_pycallback;     /* This is the function .... */
   arglist = Py_BuildValue("()");  /* No arguments needed */
   result =  PyEval_CallObject(func, arglist);
   Py_DECREF(arglist);
   Py_XDECREF(result);
   return /*void*/;
}

void py_setFunBtsCdrparseEnd(PyObject *PyFunc)
{
    Py_XDECREF(my_pycallback);          /* Dispose of previous callback */
    Py_XINCREF(PyFunc);         /* Add a reference to new callback */
    my_pycallback = PyFunc;         /* Remember new callback */
    setFunBtsCdrparseEnd(PythonCallBack);
}

%}

%typemap(python, in) PyObject *PyFunc {
  if (!PyCallable_Check($input)) {
      PyErr_SetString(PyExc_TypeError, "Need a callable object!");
      return NULL;
  }
  $1 = $input;
}
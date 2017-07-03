/* BtsCdrManager.i */
%module BtsCDRManager
%{
#include "BtsCDRmanager.h"
#include <iostream>
/*define the callback function*/
typedef void (*FunBtsProcessCallback)(char *);
extern FunBtsProcessCallback funBtsProcessCallback;
extern void setFunBtsProcessCallback(FunBtsProcessCallback c);
extern void py_setFunBtsProcessCallback(PyObject *PyFunc);

/*define the callback function for end*/
typedef void (*FunBtsCdrparseEnd)(void);
extern FunBtsCdrparseEnd funBtsCdrparseEnd;

extern void setFunBtsCdrparseEnd(FunBtsCdrparseEnd c);
extern void py_setFunBtsCdrparseEnd(PyObject *PyFunc);
%}
%include "BtsCDRmanager.h"
#include <iostream>
/*define the callback function*/

extern FunBtsProcessCallback funBtsProcessCallback;
extern void setFunBtsProcessCallback(FunBtsProcessCallback c);
extern void py_setFunBtsProcessCallback(PyObject *PyFunc);

/*define the callback function for end*/

extern FunBtsCdrparseEnd funBtsCdrparseEnd;
extern void setFunBtsCdrparseEnd(FunBtsCdrparseEnd c);
extern void py_setFunBtsCdrparseEnd(PyObject *PyFunc);

%{
/* for callback of record*/
static PyObject *pyFunBtsProcessCallbackPtr = NULL;

/*
static void pyFunBtsProcessCallback(char * record)
{
   PyObject *func, *arglist;
   PyObject *result;
   cout<< "call pyFunBtsProcessCallback:" <<record<<endl;
   func = pyFunBtsProcessCallbackPtr;    
   arglist = Py_BuildValue("s",record);  
   result =  PyEval_CallObject(func, arglist);
   Py_DECREF(arglist);
   Py_XDECREF(result);
   return ;
}
*/

static void pyFunBtsProcessCallback(char *record)
{
PyObject* pArgs = NULL;
PyObject* pRetVal = NULL;
int    nRetVal = 0;

pArgs = Py_BuildValue("(s)", record);
pRetVal = PyEval_CallObject(pyFunBtsProcessCallbackPtr, pArgs);
if (pRetVal)
{
   fprintf(stderr, "PyEval_CallObject : ok \r\n");
   nRetVal = PyInt_AsLong(pRetVal);
   fprintf(stderr, "PyEval_CallObject : return : %d \r\n", nRetVal);
}
Py_DECREF(pArgs);
Py_DECREF(pRetVal);
return;
}

/*
void py_setFunBtsProcessCallback(PyObject *PyFunc)
{
    Py_XDECREF(pyFunBtsProcessCallbackPtr);   
    Py_XINCREF(PyFunc);         
    pyFunBtsProcessCallbackPtr = PyFunc;  
	cout<< "call pyFunBtsProcessCallback:" <<record<<endl;
    setFunBtsProcessCallback(pyFunBtsProcessCallback);
}
*/
void
py_setFunBtsProcessCallback(PyObject *dummy, PyObject *args)
{
	PyObject *temp = NULL;

	if (PyArg_ParseTuple(args, "O:set_callback", &temp)) {
		if (!PyCallable_Check(temp)) {
			PyErr_SetString(PyExc_TypeError, "parameter must be callable");
		}
		Py_XINCREF(temp);         /* Add a reference to new callback */
		Py_XDECREF(pyFunBtsProcessCallbackPtr); /* Dispose of previous callback */
		pyFunBtsProcessCallbackPtr = temp;       /* Remember new callback */
		setFunBtsProcessCallback(pyFunBtsProcessCallback);
	}

	//return Py_BuildValue("l", (pyFunBtsProcessCallbackPtr == NULL) ? 0 : 1);
}



/* for end*/
static PyObject *my_pycallbackend = NULL;
static void PythonCallBackEnd(void)
{
   PyObject *func, *arglist;
   PyObject *result;

   func = my_pycallbackend;     /* This is the function .... */
   arglist = Py_BuildValue("()");  /* No arguments needed */
   result =  PyEval_CallObject(func, arglist);
   Py_DECREF(arglist);
   Py_XDECREF(result);
   return /*void*/;
}

void py_setFunBtsCdrparseEnd(PyObject *PyFunc)
{
    Py_XDECREF(my_pycallbackend);          /* Dispose of previous callback */
    Py_XINCREF(PyFunc);         /* Add a reference to new callback */
    my_pycallbackend = PyFunc;         /* Remember new callback */
    setFunBtsCdrparseEnd(PythonCallBackEnd);
}

%}

%typemap(python, in) PyObject *PyFunc {
  if (!PyCallable_Check($input)) {
      PyErr_SetString(PyExc_TypeError, "Need a callable object!");
      return NULL;
  }
  $1 = $input;
}
//trialDLL.cpp
#include "trialDLL.h"

MyMathFuncs* __stdcall new_MyMathFuncs(double offset)
{
return new MyMathFuncs(offset);
}


void __stdcall del_MyMathFuncs(MyMathFuncs *myMath)
{
    myMath->~MyMathFuncs();
}


double __stdcall MyAdd(MyMathFuncs *myMath, double a, double b)
{
return myMath->Add(a, b);
}

// class functions
double MyMathFuncs::Add(double a, double b)
{
return a+b+ this->offset;
}
//trialDLL.h
#ifndef TRIALDLL_H_
#define TRIALDLL_H_

class MyMathFuncs
{
private:
    double offset;

public:
    MyMathFuncs(double offset);

    ~MyMathFuncs();

    double Add(double a, double b);

    double Multiply(double a, double b);

    double getOffset();
};

#ifdef __cplusplus
extern "C"{
#endif

#ifdef TRIALDLL_EXPORT
#define TRIALDLL_API __declspec(dllexport)
#else
#define TRIALDLL_API __declspec(dllimport)
#endif

    TRIALDLL_API MyMathFuncs* __stdcall new_MyMathFuncs(double offset);

    TRIALDLL_API void __stdcall del_MyMathFuncs(MyMathFuncs *myMath);

    TRIALDLL_API double __stdcall MyAdd(MyMathFuncs* myMath, double a, double b);


#ifdef __cplusplus
}
#endif

#endif

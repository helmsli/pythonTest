#include <iostream>
class Foo{
    private:
        double m;
    public:
        Foo() { m = 2.344; };
        void bar(){
            std::cout << "Hello, number is " << m << std::endl;
        }
};

extern "C" {
    Foo* Foo_new(){ return new Foo(); }
    void Foo_bar(Foo* foo){ foo->bar(); }
}
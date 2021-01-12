var fib = function(num) {
    if (num < 2) {
        return 1;
    }
    else {
        return fib(num - 1) + fib(num - 2);
    }
}
// out put to console.
console.log("Fibonacci 42 is: " + fib(42));

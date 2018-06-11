function fibonacci(n){
    return n < 2 ? 1 : fibonacci(n-1) + fibonacci(n-2);
}

process.on('message',(n) => {
    let result = fibonacci(n);
    process.send({
        n:n,
        result:result
    });
});
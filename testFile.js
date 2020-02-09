var Promise = require('promise');

const promise = new Promise(
  function executor(resolve, reject) {
    console.log("INSIDE executor");
    resolve("OK!");
  }
)

console.log("OUTSIDE Executor")
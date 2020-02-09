/*
1) Promises resolves the problem of callback hell.
2) Promises can be seen as a state machine and its initial state is pending.
  We can change state to resolved or rejected using reslove and reject functions. Once state is change it cannot be changed again
3) The function then return a promises instance , which is a new instance instead of previous one,
    And that's because the Promise specification states that in addition to the pending state, other states cannot be changed,
    and multiple calls of function then will be meaningless if the same instance is returned.
4) For then, it can be seen as Flatmap
*/

const defineProperty = require("./define-property");
//three states
const [PENDING,
  FULFILLED,
  REJECTED] = [void 0, true, false]

class Promifill {
  constructor(executor) {
    if (typeof executor != 'function') {
      throw new TypeError("Promise resolver is not a function")
    }
    // this.state = PENDING;
    // this.value = void 0;  //WE CAN ADD GETTER FUNCTION FOR STATE AND VALUE
    defineProperty(this, "observers", [])
    const resolve = (value) => {
      if (this.settled) {
        return;
      }
      defineProperty(this, "settled", true);
      defineProperty(this, "value", value);
      defineProperty(this, "state", FULFILLED); //#FIXME
    };
    const reject = (reason) => {
      if (this.settled) {
        return;
      }
      defineProperty(this, "settled", true);
      defineProperty(this, "value", reason);
      defineProperty(this, "state", REJECTED);
    };
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }

  }
  get state() {
    return PENDING;
  }
  get value() {
    return void 0;
  }
  get settled() {
    return false;
  }
  then(onfulfill, onreject) {
    return new this.constructor((resolve, reject) => {
      const internalOnfulfill = (value) => {
        try {
          typeof onfulfill == 'function' ? onfulfill(value) : value
          resolve(onfulfill(value));
        } catch (error) {
          reject(error)
        }
      }
      const internalOnreject = (reason) => {
        try {
          if (typeof onreject == 'function') {
            resolve(onreject(reason));
          } else {
            reject(reason)
          }

        } catch (error) {
          reject(error)
        }
      }
      this.observers.push({
        onfulfill: internalOnfulfill,
        onreject: internalOnreject
      })
    })
  }
}
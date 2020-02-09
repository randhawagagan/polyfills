const defineProperty =
  (target, propName, propValue) => {
    Object.defineProperty(target, propName, {
      value: propValue
    })
  };

module.exports = defineProperty;
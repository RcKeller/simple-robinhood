// Get random number in between a and b
const randBetween = (a, b) => {
  return Math.random() * (b - a) + a;
};

module.exports = {
  randBetween,
};

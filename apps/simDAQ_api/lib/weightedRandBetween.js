/**
 * Calculate a weighted random number based on a normal distribution (bell curve)
 * This ensures that values generated are closer to the mean, but still semi-random
 */
const weightedRandBetween = (mean, stdDev) => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num =
    Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num * stdDev + mean;
  return num;
};

module.exports = {
  weightedRandBetween,
};

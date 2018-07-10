exports.setThreshold = function (threshold) {
  let prev = 0
  return function (state) {
    let result = Math.abs(state - prev) >= threshold
    prev = state
    return result
  }
}
function birthdayCakeCandles(candles) {
  const highests = Math.max(...candles);
  const totalTallest = candles.filter((x) => x === highests).length;
  return totalTallest;
}

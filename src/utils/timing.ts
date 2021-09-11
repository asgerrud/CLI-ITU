export const nanoToSeconds = (t0: bigint, t1: bigint): number => {
  const nanoSecondsPerSecond = 1_000_000_000;
  return Number(t1 - t0) / nanoSecondsPerSecond;
};

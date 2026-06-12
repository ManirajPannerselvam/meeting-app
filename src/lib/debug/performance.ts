import logger from './logger';

export async function measure<T extends (...args: any[]) => any>(name: string, fn: T, ...args: Parameters<T>): Promise<ReturnType<T>> {
  const t0 = performance.now();
  try {
    // @ts-ignore
    const res = await fn(...args);
    const t1 = performance.now();
    await logger.log('PERFORMANCE', `${name} took ${(t1 - t0).toFixed(2)} ms`);
    return res;
  } catch (e) {
    const t1 = performance.now();
    await logger.error('PERFORMANCE', `${name} failed after ${(t1 - t0).toFixed(2)} ms - ${String(e)}`);
    throw e;
  }
}

export function timeStart() {
  return performance.now();
}

export async function timeEnd(name: string, start: number) {
  const t1 = performance.now();
  await logger.log('PERFORMANCE', `${name} ${(t1 - start).toFixed(2)} ms`);
}

export default {
  measure,
  timeStart,
  timeEnd
};

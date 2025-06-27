import { Worker } from 'worker_threads';
const path = require('path');

export function runInWorker<T>(
  fn: (...args: any[]) => T | Promise<T>,
  args: any[] = [],
): Promise<T> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, 'worker-wrapper.js'), {
      workerData: {
        fn: fn.toString(),
        args,
      },
    } as any);

    worker.once('message', (result) => {
      if (result && result.error) {
        reject(new Error(result.error));
      } else {
        resolve(result);
      }
    });
    worker.once('error', reject);
    worker.once('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

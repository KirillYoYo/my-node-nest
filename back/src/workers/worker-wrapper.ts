import { parentPort, workerData } from 'worker_threads';
import { functionsWhiteList } from '@src/workers/functions-white-list';
// todo что делать с зависимостями
const fs = require('fs');
const readline = require('readline');
const { ObjectId } = require('mongodb');
/* не удаляем, это нужно (necessary) для воркера */

function extractFunctionName(fnStr) {
  const match = fnStr.match(/^(?:async\s+)?function\s+([^\s(]+)/);
  return match ? match[1] : 'anonymous';
}

(async () => {
  const { fn, args } = workerData;
  const fnName = fn.name || extractFunctionName(fn);

  if (!(fnName in functionsWhiteList)) {
    throw new Error(`Unknown function: ${fnName}`);
  }
  const fnCompiled = eval(`(${fn})`);

  try {
    const result = await fnCompiled(...args);
    parentPort?.postMessage(result);
  } catch (err) {
    parentPort?.postMessage({ error: err.message });
  }
})();

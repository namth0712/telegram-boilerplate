import getVal from 'get-value';
import setVal from 'set-value';

const storageObj = {};

export default storageObj;

export const getStorage = (key: string, defaultVal = '') =>
  getVal(storageObj, key, defaultVal);
export const setStorage = (key: string, val: any) =>
  setVal(storageObj, key, val);

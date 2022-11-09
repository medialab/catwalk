/* eslint-disable no-unused-vars */
import _React from 'react';
import type {CatwalkCache} from '../cache';

declare global {
  const React: typeof _React;

  interface ObjectConstructor {
    keys<T>(object: T): Array<keyof T>;
  }

  interface Window {
    cache: CatwalkCache;
  }
}

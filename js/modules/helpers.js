"use strict";

// Checks if object is absent
export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}
export function onCreated(node) {
  console.log('Created', node);
}

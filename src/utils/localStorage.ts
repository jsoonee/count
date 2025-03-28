function getItem(key: string) {
  const value = globalThis.localStorage.getItem(key);
  if (value === null) return null;
  return JSON.parse(value);
}

function setItem(key: string, value: any) {
  const serialized = JSON.stringify(value);
  globalThis.localStorage.setItem(key, serialized);
}

export { getItem, setItem };

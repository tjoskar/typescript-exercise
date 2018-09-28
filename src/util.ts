export function padLeft(value: string, padding: any) {
  return Array(padding + 1).join(' ') + value
}

export function value(obj, ...keys) {
  return keys.map(key => obj[key])
}

export function mapObject(obj, fn) {
  const newObj = {}
  Object.entries(obj).map(([key, value]) => (newObj[key] = fn(value)))
  return newObj
}

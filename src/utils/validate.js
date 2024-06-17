//匹配http或者 https
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

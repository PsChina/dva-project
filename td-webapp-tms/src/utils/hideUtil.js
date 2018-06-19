export function hideString(no) {
  const str = `${no}`;
  const reg = /^(\w{4})\w+(\w{4})$/;
  return str.replace(reg, '$1****$2');
}

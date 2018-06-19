function formatForm(params) {
  if (typeof params === 'string') {
    const data = {};
    const arr = params.split('&');
    if (arr.length) {
      for (const item of arr) {
        const itemArr = item.split('=');
        [, data[itemArr[0]]] = itemArr; // [a, b] = [1, 2] => [, b] = [1, 2]
      }
    }
    return data;
  }
  return undefined;
}
export default formatForm;

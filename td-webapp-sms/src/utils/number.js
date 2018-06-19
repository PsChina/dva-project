/**
 * 金额格式化
 * 单位：元
 */

export function fmoney(s) {
  let n = '2'
  if (isNaN(s) || s === undefined || s === null || s === '') {
    return '0.00';
  }
  s = fenToYuan(s);
  n = n > 0 && n <= 20 ? n : 2;
  s = `${parseFloat((`${s  }`).replace(/[^\d\.-]/g, '')).toFixed(n)}`;
  let l = s.split('.')[0].split('').reverse(),
    r = s.split('.')[1];
  let t = '';
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
  }
  return `${t.split('').reverse().join('')}.${r}`;
}

export function fenToYuan(s) {
  return parseInt(s) / 100;
}

export function yuanToFen(s) {
  s = rmoney(s);
  return parseInt(s) * 100;
}


// 金额格式化还原函数
export function rmoney(s) {
  const ret = (`${s}`).replace(/[^\d\.-]/g, '');
  return parseFloat(ret);
}

/**
 * 格式化金额(如：12345.67格式化为 12,345.67)
 * @param s
 * @param n
 * @returns {String}
 */
export function formatMoney(amt, pos) {
  let s = amt;
  let n = pos;
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s.toString()).replace(/[^\d\.-]/g, '')).toFixed(n).toString(); // eslint-disable-line no-useless-escape
  const l = s.split('.')[0].split('').reverse();
  const r = s.split('.')[1];
  let t = '';
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
  }
  return `${t.split('').reverse().join('')}.${r}`;
}

/**
 * 分转元
 */
export function cent2Yuan(cent) {
  if (cent === null || cent === '' || isNaN(cent)) { // eslint-disable-line
    return '0.00';
  }
  const yuan = formatMoney(cent / 100, 2);
  return yuan.replace(/[0]+$/, '').replace(/[.]+$/, '');
}

// 元去除逗号
export function YuanRemoveComma(yuan) {
  return yuan !== '0.00' ? yuan.replace(/,/g, '') : yuan;
}

// 元转分
export function Yuan2Fen(value) {
  return Number(value) * 100;
}

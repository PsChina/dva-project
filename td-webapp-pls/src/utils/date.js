/**
 * format Date
 *
 * @param date 待格式化的日期(Date类型)
 * @param fmt  格式(如：yyyy-MM-dd hh:mm:ss.S 等)
 * @return dateString
 */
export function formatDate(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    let insideFmt = fmt; // eslint-disable-line no-unused-vars
    insideFmt = insideFmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let insideFmt = fmt;
      insideFmt = insideFmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return fmt;
}

/**
 * format date string
 *
 * @param date string (yyyyMMddHHmmss)
 * @return format date string (yyyy-MM-dd HH:mm:ss)
 */
export function formatDateString(dateStr) {
  let str = dateStr;
  if (dateStr && dateStr !== null && dateStr.length === 8) {
    str = `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`;
  } else if (dateStr && dateStr !== null && dateStr.length >= 14) {
    str = `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)} ${dateStr.substr(8, 2)}:${dateStr.substr(10, 2)}:${dateStr.substr(12, 2)}`;
  }
  return str;
}


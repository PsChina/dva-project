import config from '../config/config.json';

const { language } = config;

/**
 * 获取公共代码对应的语言名称
 *
 * @param {string}   code
 * @return {string}
 */
export function commonName(code) {
  const map = require(`../config/i18n/${language}/common.json`); // eslint-disable-line
  return map[code];
}

/**
 * 获取公共代码对应的语言MAP
 *
 * @return {object}
 */
export function commonMap() {
  return require(`../config/i18n/${language}/common.json`); // eslint-disable-line
}

/**
 * 获取业务模块代码对应的语言名称
 *
 * @param {string}   code
 * @param {string}   module
 * @return {string}
 */
export function bizName(code, module) {
  const map = require(`../config/i18n/${language}/${module}.json`); //eslint-disable-line
  return map[code];
}

/**
 * 获取业务模块代码对应的语言MAP
 *
 * @return {object}
 */
export function bizMap(module) {
  return require(`../config/i18n/${language}/${module}.json`); //eslint-disable-line
}

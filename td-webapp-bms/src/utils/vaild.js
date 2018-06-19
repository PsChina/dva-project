
import * as i18n from '../utils/i18n';

const bizMap = i18n.bizMap('vaild');

// 校验手机号是否有效
export function mobileValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const mobileReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0,6,7,8]{1})|(14[5,7]{1}))+\d{8})$/;
    if (!mobileReg.test(value)) {
      callback(bizMap.vaildMobile);
    } else {
      callback();
    }
  }
}
/**
 * 校验证件类型
 */
export function apIDValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const city = {
      11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ',
      31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ',
      43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ',
      61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 ',
    };
    if (!value || !/^\d{6}(18|19|20|21)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
      callback(bizMap.vaildIdFormatError);
    } else if (!city[value.substr(0, 2)]) {
      callback(bizMap.vaildAddrCodError);
    } else {
      // 18位身份证需要验证最后一位校验位
      if (value.length === 18) {
        const valueArr = value.split('');
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        // 校验位
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        let ai = 0;
        let wi = 0;
        for (let i = 0; i < 17; i++) {
          ai = valueArr[i];
          wi = factor[i];
          sum += ai * wi;
        }
        // const last = parity[sum % 11];
        if (parity[sum % 11].toString() !== valueArr[17]) {
          callback(bizMap.vaildNumAccountsError);
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
  }
}

// 校验全是数字
export function numValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const numReg = /^[0-9]*$/;
    if (!numReg.test(value)) {
      callback(bizMap.vaildIsAllNum);
    } else {
      callback();
    }
  }
}

// 校验0-100数字
export function num100Valid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const num100Reg = /^(\d{1,2}(\.\d{1,3})?|100)$/;
    if (!num100Reg.test(value)) {
      callback(bizMap.vaildNumLtHundred);
    } else {
      callback();
    }
  }
}

// 限制不能全部输入空格的判断
export function limitNameSpace(value) {
  return value.toString().trim().length === 0;
}

// 限制不能全部输入空格的校验
export function limitNameSpaceValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    if (limitNameSpace(value)) {
      callback(bizMap.vaildNotAllSpace);
    } else {
      callback();
    }
  }
}

/**
 * 姓名格式校验
 */
export function userRealNameValidate(rule, value, callback) {
  const reg = /^([\u4e00-\u9fa5\·]{1,30}|[a-zA-Z\.\s]{1,30})$/; // 允许英文或中文，中文和英文不能同时出现，且不超过30位
  if (!value) {
    callback();
  } else {
    if (reg.test(value)) {
      if (limitNameSpace(value)) {
        callback(bizMap.vaildNotAllSpace);
      }
      callback();
    } else {
      callback(bizMap.vaildIdentifiedZhnEn);
    }
  }
}

export function userShorthandNameValidate(rule, value, callback) {
  const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/; // 允许英文，中文和英文不能同时出现，1-20位
  if (!value) {
    callback();
  } else {
    if (reg.test(value)) {
      if (limitNameSpace(value)) {
        callback(bizMap.vaildNotAllSpace);
      }
      callback();
    } else {
      callback(bizMap.vaildOnlyZhnEnNum);
    }
  }
}

// 校验邮编是否有效
export function postValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const postReg = /^[0-9]{6}$/;
    if (!postReg.test(value)) {
      callback(bizMap.vaildIsCorrectPost);
    } else {
      callback();
    }
  }
}

  // 邮箱校验
export function emailValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailReg.test(value)) {
      callback(bizMap.vaildIsCorrectEmail);
    } else {
      callback();
    }
  }
}
// 校验传真是否有效
export function faxValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const faxReg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    if (!faxReg.test(value)) {
      callback(bizMap.vaildIsCorrectFax);
    } else {
      callback();
    }
  }
}

// 校验电话是否有效
export function phoneValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const phoneReg = /^([0-9]{2,5}-)?[0-9]{2,8}$/;
    if (!phoneReg.test(value)) {
      callback(bizMap.vaildIsCorrectPhoneNo);
    } else {
      callback();
    }
  }
}


// 校验不能含有数字
export function checkNotHaveNumValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    if (limitNameSpace(value)) {
      callback(bizMap.vaildNotAllSpace);
    }
    const reg = /\d+/g;
    if (reg.test(value)) {
      callback([new Error(bizMap.vaildIsContainNum)]);
    } else {
      callback();
    }
  }
}

// 校验只能输入字母，数字与下划线与-
export function codeValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const reg = /^[a-zA-Z0-9_-]{1,}$/;
    if (!reg.test(value)) {
      callback(bizMap.vaildOnlyChracterNumLine);
    } else {
      callback();
    }
  }
}

// 只能输入相关的金额数字
export function moneyValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const reg = /(^\s+)|(\s+$)/g;
    if (reg.test(value)) {
      callback(bizMap.vaildNotAllSpace);
    }
    if (isNaN(value) || (value.indexOf('.') === value.toString().length - 1)) {
      callback(bizMap.vaildIsCorrectAmt);
    } else {
      callback();
    }
  }
}
// 校验IP地址
export function funIPValid(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const parts = value.split(':');
    const val = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    const parten = /^(\d)+$/g;
    const ipval = val.exec(parts[0]);
    let portval = '';
    if (parten.test(parts[1]) && parseInt(parts[1]) <= 65535 && parseInt(parts[1]) >= 0) {
      portval = true;
    } else {
      portval = false;
    }
    if (!ipval || !portval) {
      callback(bizMap.vaildIsCorrectUrl);
    } else {
      callback();
    }
  }
}


// 判断类型是否为空true:为空 false:不为空
export function isNull(value) {
  if (value === null || undefined === value || value === '') {
    return true;
  }
  return false;
}



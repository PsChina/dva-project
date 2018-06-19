import ProvData from '../../config/i18n/zh-cn/provData.json';
import ProvCityData from '../../config/i18n/zh-cn/provCityData.json';
import ProvCityAreaData from '../../config/i18n/zh-cn/provCityAreaData.json';

/**
 * 根据省份代码获取省份名称
 * 返回: 省名称
 */
export function getProvLabel(value) {
  if (value !== '') {
    for (let i = 0; i < ProvData.length; i++) {
      if (ProvData[i].value === value) {
        return ProvData[i].label;
      }
    }
  }
  return '';
}

/**
 * 根据省份代码数组获取省份名称数组
 * 返回: 省名称数组
 */
export function getProvLabelArray(value) {
  const label = [];
  if (value !== '') {
    const v = value.split(',');
    if (v.length > 0) {
      for (let i = 0; i < ProvData.length; i++) {
        if (ProvData[i].value === v[i]) {
          label.push(ProvData[i].label);
          if (i === v.length - 1) {
            return label;
          }
        }
      }
    }
  }
  return label;
}

/**
 * 通过城市代码获取城市名称
 * 返回: 市名称
 */
export function getCityLabel(value) {
  if (value !== '') {
    for (let i = 0; i < ProvCityData.length; i++) {
      const jl = ProvCityData[i].children.length;
      for (let j = 0; j < jl; j++) {
        if (ProvCityData[i].children[j].value === value) {
          return ProvCityData[i].children[j].label;
        }
      }
    }
  }
  return '';
}

/**
 * 通过城市代码数组获取城市名称数组
 * 返回: 市名称数组
 */
export function getCityLabelArray(value) {
  const label = [];
  if (value !== '') {
    const v = value.split(',');
    if (v.length > 0) {
      for (let i = 0; i < ProvCityData.length; i++) {
        const jl = ProvCityData[i].children.length;
        for (let k = 0; k < jl; k++) {
          for (let j = 0; j < v.length; j++) {
            if (ProvCityData[i].children[j] !== undefined && ProvCityData[i].children[k].value === v[j]) {
              label.push(ProvCityData[i].children[k].label);
              if (j === v.length - 1) {
                return label;
              }
            }
          }
        }
      }
    }
  }
  return label;
}

/**
 * 通过区域代码获取区域名称
 * 返回: 区名称
 */
export function getAreaLabel(value) {
  if (value !== '') {
    for (let i = 0; i < ProvCityAreaData.length; i++) {
      const jl = ProvCityAreaData[i].children.length;
      for (let j = 0; j < jl; j++) {
        if (ProvCityAreaData[i].children[j].children !== undefined) {
          const kl = ProvCityAreaData[i].children[j].children.length;
          for (let k = 0; k < kl; k++) {
            if (ProvCityAreaData[i].children[j].children[k].value === value) {
              return ProvCityAreaData[i].children[j].children[k].label;
            }
          }
        }
      }
    }
  }
  return '';
}

/**
 * 通过区域代码数组获取区域名称数组
 * 返回: 区名称数组
 */
export function getAreaLabelArray(values) {
  const label = [];
  if (values !== '') {
    const v = values.split(',');
    if (v.length > 0) {
      for (let i = 0; i < ProvCityAreaData.length; i++) {
        const jl = ProvCityAreaData[i].children.length;
        for (let j = 0; j < jl; j++) {
          if (ProvCityAreaData[i].children[j].children !== undefined) {
            const kl = ProvCityAreaData[i].children[j].children.length;
            for (let k = 0; k < kl; k++) {
              for (let m = 0; m < v.length; m++) {
                if (ProvCityAreaData[i].children[j].children[k].value === v[m]) {
                  label.push(ProvCityAreaData[i].children[j].children[k].label);
                  if (m === v.lengh - 1) {
                    return label;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return label;
}

/**
 * 获得省份option列表
 * 返回: 省列表
 */
export function getProvOptionList() {
  return ProvData;
}

/**
 * 通过省份代码获得城市option列表
 * 返回: 市列表
 */
export function getCityOptionList(value) {
  const option = [];
  if (value !== '') {
    // for (let i = 0; i < ProvCityData.length; i++) {
    //   const jl = ProvCityData[i].children.length;
    //   for (let j = 0; j < jl; j++) {
    //     if (ProvCityData[i].value === value) {
    //       option.push(ProvCityData[i].children[j]);
    //     }
    //   }
    // }
    for (let i = 0; i < ProvCityData.length; i++) {
      const prov = ProvCityData[i];
      if (prov.value === value) {
        return option.concat(prov.children || []);
      }
    }
  }
  return option;
}

/**
 * 通过城市代码获得区域option列表
 * 返回: 区列表
 */
export function getAreaOptionsList(value) {
  const option = [];
  if (value !== '') {
    for (let i = 0; i < ProvCityAreaData.length; i++) {
      // const jl = ProvCityAreaData[i].children.length;
      // for (let j = 0; j < jl; j++) {
      //   if (ProvCityAreaData[i].children[j].children !== undefined) {
      //     const kl = ProvCityAreaData[i].children[j].children.length;
      //     for (let k = 0; k < kl; k++) {
      //       if (ProvCityAreaData[i].children[j].value === value) {
      //         option.push(ProvCityAreaData[i].children[j].children[k]);
      //       }
      //     }
      //   }
      // }
      const prov = ProvCityAreaData[i];
      for (let j = 0; j < prov.children.length; j++) {
        const city = prov.children[j];
        if (city.value === value) {
          return option.concat(city.children || []);
        }
      }
    }
  }
  return option;
}

/**
 * 区域代码转文字
 * 即：'xxx,xxx,xxx' => 'yyy-yyy-yyy'
 * 参数：
 * text：以逗号分隔的省市区代码
 */
export function buildAreaCode(text) {
  const areaCode = text.split(',');
  let name = '';
  for (let i = 0; i < ProvCityAreaData.length; i++) {
    const item1 = ProvCityAreaData[i];
    if (areaCode[0] === item1.value) {
      name = item1.label;
      if (item1.children) {
        for (let j = 0; j < item1.children.length; j++) {
          const item2 = item1.children[j];
          if (areaCode[1] === item2.value) {
            name += `-${item2.label}`;
            if (item2.children) {
              for (let k = 0; k < item2.children.length; k++) {
                const item3 = item2.children[k];
                if (areaCode[2] === item3.value) {
                  name += `-${item3.label}`;
                  break;
                }
              }
            }
            break;
          }
        }
      }
      break;
    }
  }
  return name;
}

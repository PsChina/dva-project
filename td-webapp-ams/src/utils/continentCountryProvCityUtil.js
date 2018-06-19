import ContinentData from '../../config/i18n/zh-cn/continentData.json';
import ContinentCountryData from '../../config/i18n/zh-cn/continentCountryData.json';
import ContinentCountryProvData from '../../config/i18n/zh-cn/continentCountryProvData.json';
import ContinentCountryProvCityData from '../../config/i18n/zh-cn/continentCountryProvCityData.json';

/**
 * 根据洲代码获取洲名称
 * 返回: 洲名称
 */
export function getContinentLabel(value) {
  if (value !== '') {
    for (let i = 0; i < ContinentData.length; i++) {
      if (ContinentData[i].value === value) {
        return ContinentData[i].label;
      }
    }
  }
  return '';
}

/**
 * 根据洲代码数组获取洲名称数组
 * 返回: 洲名称数组
 */
export function getContinentLabelArray(value) {
  const label = [];
  if (value !== '') {
    const v = value.split(',');
    if (v.length > 0) {
      for (let i = 0; i < ContinentData.length; i++) {
        if (ContinentData[i].value === v[i]) {
          label.push(ContinentData[i].label);
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
 * 通过国家代码获取国家名称
 * 返回: 国家名称
 */
export function getCountryLabel(value) {
  if (value !== '') {
    for (let i = 0; i < ContinentCountryData.length; i++) {
      const jl = ContinentCountryData[i].children.length;
      for (let j = 0; j < jl; j++) {
        if (ContinentCountryData[i].children[j].value === value) {
          return ContinentCountryData[i].children[j].label;
        }
      }
    }
  }
  return '';
}

/**
 * 通过国家代码数组获取国家名称数组
 * 返回: 国家名称数组
 */
export function getCountryLabelArray(value) {
  const label = [];
  if (value !== '') {
    const v = value.split(',');
    if (v.length > 0) {
      for (let i = 0; i < ContinentCountryData.length; i++) {
        const jl = ContinentCountryData[i].children.length;
        for (let k = 0; k < jl; k++) {
          for (let j = 0; j < v.length; j++) {
            if (ContinentCountryData[i].children[j] !== undefined && ContinentCountryData[i].children[k].value === v[j]) {
              label.push(ContinentCountryData[i].children[k].label);
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
 * 通过省份代码获取省份名称
 * 返回: 省份名称
 */
export function getProvLabel(value) {
  if (value !== '') {
    for (let i = 0; i < ContinentCountryProvData.length; i++) {
      const jl = ContinentCountryProvData[i].children.length;
      for (let j = 0; j < jl; j++) {
        if (ContinentCountryProvData[i].children[j].children !== undefined) {
          const kl = ContinentCountryProvData[i].children[j].children.length;
          for (let k = 0; k < kl; k++) {
            if (ContinentCountryProvData[i].children[j].children[k].value === value) {
              return ContinentCountryProvData[i].children[j].children[k].label;
            }
          }
        }
      }
    }
  }
  return '';
}

/**
 * 通过省份代码数组获取省份名称数组
 * 返回: 省份名称数组
 */
export function getProvLabelArray(values) {
  const label = [];
  if (values !== '') {
    const v = values.split(',');
    if (v.length > 0) {
      for (let i = 0; i < ContinentCountryProvData.length; i++) {
        const jl = ContinentCountryProvData[i].children.length;
        for (let j = 0; j < jl; j++) {
          if (ContinentCountryProvData[i].children[j].children !== undefined) {
            const kl = ContinentCountryProvData[i].children[j].children.length;
            for (let k = 0; k < kl; k++) {
              for (let m = 0; m < v.length; m++) {
                if (ContinentCountryProvData[i].children[j].children[k].value === v[m]) {
                  label.push(ContinentCountryProvData[i].children[j].children[k].label);
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
 * 通过市代码获取市名称
 * 返回: 市名称
 */
export function getCityLabel(value) {
  if (value !== '') {
    for (let i = 0; i < ContinentCountryProvCityData.length; i++) {
      const jl = ContinentCountryProvCityData[i].children.length;
      for (let j = 0; j < jl; j++) {
        if (ContinentCountryProvCityData[i].children[j].children !== undefined) {
          const kl = ContinentCountryProvCityData[i].children[j].children.length;
          for (let k = 0; k < kl; k++) {
            if (ContinentCountryProvCityData[i].children[j].children[k].children !== undefined) {
              const ll = ContinentCountryProvCityData[i].children[j].children[k].children.length;
              for (let l = 0; l < ll; l++) {
                if (ContinentCountryProvCityData[i].children[j].children[k].children[l].value === value) {
                  return ContinentCountryProvCityData[i].children[j].children[k].children[l].label;
                }
              }
            }
          }
        }
      }
    }
  }
  return '';
}

/**
 * 通过省份代码数组获取省份名称数组
 * 返回: 区名称数组
 */
export function getCityLabelArray(values) {
  const label = [];
  if (values !== '') {
    const v = values.split(',');
    if (v.length > 0) {
      for (let i = 0; i < ContinentCountryProvCityData.length; i++) {
        const jl = ContinentCountryProvCityData[i].children.length;
        for (let j = 0; j < jl; j++) {
          if (ContinentCountryProvCityData[i].children[j].children !== undefined) {
            const kl = ContinentCountryProvCityData[i].children[j].children.length;
            for (let k = 0; k < kl; k++) {
              if (ContinentCountryProvCityData[i].children[j].children[k].children !== undefined) {
                const ll = ContinentCountryProvCityData[i].children[j].children[k].children.length;
                for (let l = 0; l < ll; l++) {
                  for (let m = 0; m < v.length; m++) {
                    if (ContinentCountryProvCityData[i].children[j].children[k].children[l].value === v[m]) {
                      label.push(ContinentCountryProvCityData[i].children[j].children[k].children[l].label);
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
    }
  }
  return label;
}


/**
 * 获得洲option列表
 * 返回: 洲列表
 */
export function getContinentOptionList() {
  return ContinentData;
}

/**
 * 通过洲代码获得国家option列表
 * 返回: 国家列表
 */
export function getCountryOptionList(value) {
  const option = [];
  if (value !== '') {
    for (let i = 0; i < ContinentCountryData.length; i++) {
      const prov = ContinentCountryData[i];
      if (prov.value === value) {
        return option.concat(prov.children || []);
      }
    }
  }
  return option;
}

/**
 * 通过国家代码获得省份option列表
 * 返回: 省份列表
 */
export function getProvOptionList(value) {
  const option = [];
  if (value !== '') {
    for (let i = 0; i < ContinentCountryProvData.length; i++) {
      const continent = ContinentCountryProvData[i];
      for (let j = 0; j < continent.children.length; j++) {
        const country = continent.children[j];
        if (country.value === value) {
          return option.concat(country.children || []);
        }
      }
    }
  }
  return option;
}
/**
 * 通过省份代码获得市option列表
 * 返回: 市列表
 */
export function getCityOptionList(value) {
  const option = [];
  if (value !== '') {
    for (let i = 0; i < ContinentCountryProvCityData.length; i++) {
      const continent = ContinentCountryProvCityData[i];
      for (let j = 0; j < continent.children.length; j++) {
        const country = continent.children[j];
        for (let k = 0; k < country.children.length; k++) {
          const prov = country.children[k];
          if (prov.value === value) {
            return option.concat(prov.children || []);
          }
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
 * text：以逗号分隔的洲国省市代码
 */
export function buildAreaCode(text) {
  let name = '';
  if (text) {
    const areaCode = text.split(',');
    for (let i = 0; i < ContinentCountryProvCityData.length; i++) {
      const item1 = ContinentCountryProvCityData[i];
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
                    if (item3.children) {
                      for (let l = 0; l < item3.children.length; l++) {
                        const item4 = item3.children[l];
                        if (areaCode[3] === item4.value) {
                          name += `-${item4.label}`;
                          break;
                        }
                      }
                    }
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
  }
  return name;
}

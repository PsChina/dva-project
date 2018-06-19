import React from 'react';
import { Button, Popover, Spin } from 'antd';
import { bizMap } from '../../../utils/i18n';
import { uuid, loadScript } from '../../../utils/util';
import styles from './index.less';
import Config from './index.json';

const map = bizMap('map');

/**
 * MulMap地图组件 当前封装腾讯地图
 * 参数：
 * type：地图类型 默认tx 即腾讯地图
 * width：地图宽度
 * height：地图高度
 * x：初始化经度 默认null
 * y：初始化纬度 默认null
 * zoom：地图放大倍率 默认8
 * onClick：地图点击事件 方法可用参数为经纬度
 */
class MulMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: `${uuid('MUL-MAP-')}-${Date.now()}`,
      loading: true,
      currentMap: props.type,
      canSearch: false,
      searchInfo: '',
      showSearchInfo: false,
      keyRegion: `${uuid('MUL-MAP-REGION-')}-${Date.now()}`,
      keyAddr: `${uuid('MUL-MAP-ADDR-')}-${Date.now()}`,
      // 腾讯地图搜索服务用状态
      txMap: null,
      txSearchService: null,
      txMarkers: [],
      txListeners: [],
      // 高德地图
      gdMap: null,
      gdMark: null,
      gdSearchService: null,
      gdListener: null,
    };
    // 初始化全局参数及方法
    if (!window.tdMapStatus) {
      window.tdMapStatus = { tx: 0, gd: 0, bd: 0 };
    }
    if (!window.tdMapType) {
      window.tdMapType = props.type;
    }
    if (!window.commonMapInit) {
      window.commonMapInit = () => {
        switch (window.tdMapType) {
          case 'tx':
            window.tdMapStatus.tx = 1; break;
          case 'gd':
            window.tdMapStatus.gd = 1; break;
          case 'bd':
            window.tdMapStatus.bd = 1; break;
          default:
            break;
        }
      };
    }
  }

  componentDidMount() {
    const { type } = this.props;
    this.loadMap(type, () => {
      this.initMap(type);
    });
  }

  componentWillUnmount() {
    if (window.qq) {
      // 移除监听事件
      this.removeTxMarkersEvent();
      window.qq.maps.event.clearListeners(this.state.txMap, 'click');
    }
    if (window.AMap) {
      window.AMap.event.removeListener(this.state.gdListener);
    }
  }

  // 设置搜索错误信息
  setSearchErrInfo(info) {
    this.setState({
      searchInfo: info,
      showSearchInfo: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          searchInfo: '',
          showSearchInfo: false,
        });
      }, 3000);
    });
  }

  loadMap(type, callback) {
    switch (type) {
      case 'tx':
        this.loadTxMap(callback);
        break;
      case 'gd':
        this.loadGdMap(callback);
        break;
      default:
        break;
    }
  }

  loadTxMap(callback) {
    if (!window.qq) {
      const url = `${Config.txUrl}&v=${Config.txVer}&key=${Config.txKey}`;
      Helper.loadScript(url, 'utf-8', () => {
        const ti = setInterval(() => {
          // 通过公用回调判断是否异步加载完成
          if (window.tdMapStatus && window.tdMapStatus.tx === 1) {
            clearInterval(ti);
            callback();
          }
        }, 100);
      });
    } else {
      callback();
    }
  }

  loadGdMap(callback) {
    if (!window.AMap) {
      const url = `${Config.gdUrl}&v=${Config.gdVer}&key=${Config.gdKey}`;
      loadScript(url, 'utf-8', () => {
        const ti = setInterval(() => {
          // 通过公用回调判断是否异步加载完成
          if (window.tdMapStatus && window.tdMapStatus.gd === 1) {
            clearInterval(ti);
            callback();
          }
        }, 100);
      });
    } else {
      callback();
    }
  }

  initMap(type) {
    const { x, y, zoom, onClick } = this.props;
    switch (type) {
      case 'tx': {
        this.initTxMap(x, y, zoom, onClick);
        this.setState({ loading: false });
        break;
      }
      case 'gd': {
        this.initGdMap(x, y, zoom, onClick);
        this.setState({ loading: false });
        break;
      }
      case 'bd': {
        break;
      }
      default:
        break;
    }
  }

  // ==============
  // 腾讯地图相关方法
  // ==============
  initTxMap(x, y, zoom, onClick) {
    const setting = { zoom };
    if (x !== null && y !== null) {
      setting.center = new window.qq.maps.LatLng(x, y);  // 设置默认坐标
    }
    const map = new window.qq.maps.Map(document.getElementById(`${this.state.id}-TX`), setting);
    // 若未设置初始化坐标,则使用ip定位
    if (x === null || y === null) {
      // 获取城市列表接口设置中心点
      const citylocation = new window.qq.maps.CityService({
        complete: (result) => {
          map.setCenter(result.detail.latLng);
        },
      });
      citylocation.searchLocalCity();  // 根据用户IP查询城市信息
    }
    this.initTxSearchService(map, onClick);
    this.initTxMapClickEvent(map, onClick);
    this.state.txMap = map;
  }
  initTxSearchService(map, onClick) {
    const latlngBounds = new window.qq.maps.LatLngBounds();
    this.state.txSearchService = new window.qq.maps.SearchService({
      complete: (results) => {
        if (!results.detail.pois) {
          const info = (<span>{map.noResultTip}</span>);
          this.setSearchErrInfo(info);
        } else {
          const pois = results.detail.pois;
          for (let i = 0, l = pois.length; i < l; i++) {
            const poi = pois[i];
            latlngBounds.extend(poi.latLng);
            const marker = new window.qq.maps.Marker({
              map,
              position: poi.latLng,
            });
            marker.setTitle(i + 1);
            this.state.txMarkers.push(marker);
            this.addTxMarkerClickEvent(marker, onClick);  // 为每个搜索标记添加点击事件
          }
          map.fitBounds(latlngBounds);
        }
        this.setState({ loading: false });
      },
    });
  }
  initTxMapClickEvent(map, onClick) {
    // 添加监听事件 获取鼠标单击事件
    window.qq.maps.event.addListener(map, 'click', (ev) => {
      const marker = new window.qq.maps.Marker({
        position: ev.latLng,
        map,
      });
      window.qq.maps.event.addListener(map, 'click', () => {
        marker.setMap(null);
      });
      onClick(ev.latLng.getLng(), ev.latLng.getLat()); // 经纬度作为方法参数
    });
  }
  addTxMarkerClickEvent(marker, onClick) {
    const listener = window.qq.maps.event.addListener(marker, 'click', (ev) => {
      onClick(ev.latLng.getLng(), ev.latLng.getLat());
    });
    this.state.txListeners.push(listener);
  }
  removeTxMarkers() {
    for (let i = 0; i < this.state.txMarkers.length; i ++) {
      this.state.txMarkers[i].setMap(null);
    }
    this.state.txMarkers = [];
  }
  removeTxMarkersEvent() {
    for (let i = 0; i < this.state.txListeners.length; i ++) {
      window.qq.maps.event.removeListener(this.state.txListeners[i]);
    }
    this.state.txListeners = [];
  }
  txMapSearch(v) {
    this.removeTxMarkersEvent();
    this.removeTxMarkers();
    this.state.txListeners = [];
    // this.state.txSearchService.setLocation('上海市');
    if (v.trim() !== '') {
      this.setState({ loading: true }, () => {
        this.state.txSearchService.search(v);
      });
    }
  }
  // ==============
  // 高德地图相关方法
  // ==============
  initGdMap(x, y, zoom, onClick) {
    const setting = { zoom, resizeEnable: true };
    if (x !== null && y !== null) {
      setting.center = [x, y];  // 设置默认坐标
    }
    const map = new window.AMap.Map(`${this.state.id}-GD`, setting);
    this.initGdMapClickEvent(map, onClick);
    this.initGdSearchService(map);
    this.state.gdMap = map;
  }
  initGdSearchService(map) {
    window.AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
      const auto = new window.AMap.Autocomplete({
        input: `${this.state.id}-GD-INPUT`,
      });
      this.state.gdSearchService = new window.AMap.PlaceSearch({ map });
      window.AMap.event.addListener(auto, 'select', (ev) => {
        this.state.gdSearchService.setCity(ev.poi.adcode);
        this.state.gdSearchService.search(ev.poi.name, (status, result) => {
          console.log(status);
          console.log(result);
        });  // 关键字查询查询
      });
    });
  }
  initGdMapClickEvent(map, onClick) {
    this.state.gdListener = map.on('click', (ev) => {
      if (this.state.gdMark !== null) {
        this.state.gdMark.setMap(null);
        this.state.gdMark = null;
      }
      this.state.gdMark = new window.AMap.Marker({
        icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [ev.lnglat.getLng(), ev.lnglat.getLat()],
      });
      this.state.gdMark.setMap(map);
      onClick(ev.lnglat.getLng(), ev.lnglat.getLat());
    });
  }
  gdMapSearch(v) {
    if (v.trim() !== '') {
      this.state.gdSearchService.search(v, (status, result) => {
        console.log('>>>', status);
        console.log('>>>', result);
      });
    }
  }
  // ==============
  // 百度地图相关方法
  // ==============
  initBdMap() {
    // ...
  }

  doSearch(v) {
    switch (this.state.currentMap) {
      case 'tx':
        this.txMapSearch(v); break;
      case 'gd':
        this.gdMapSearch(v); break;
      default:
        break;
    }
  }

  handleInputSearch(ev) {
    if (ev.keyCode === 13) {
      const el = ev.srcElement || ev.target;
      this.doSearch(el.value);
    }
  }
  handleBtnSearch(ev) {
    const el = ev.srcElement || ev.target;
    const val = el.parentNode.previousSibling.firstChild.value;
    this.doSearch(val);
  }
  switchMap(type) {
    if (type !== this.state.currentMap) {
      window.tdMapType = type;
      this.setState({ loading: true }, () => {
        this.loadMap(type, () => {
          this.initMap(type);
          this.setState({ currentMap: type, loading: false });
        });
      });
    }
  }

  uuid(prefix) {
    const p = prefix || 'uuid';
    return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, p);
  }

  render() {
    const ButtonGroup = Button.Group;
    const { option, width, height } = this.props;
    const sizeStyle = { width, height };
    return (
      <Spin spinning={this.state.loading} style={sizeStyle}>
        <div id={this.state.id} className={styles['mul-map']} style={sizeStyle}>
          <div className={styles['mul-map-container']} id={`${this.state.id}-TX`} style={{ display: this.state.currentMap === 'tx' ? 'block' : 'none' }} />
          <div className={styles['mul-map-container']} id={`${this.state.id}-GD`} style={{ display: this.state.currentMap === 'gd' ? 'block' : 'none' }} />
          <div className={`${styles['mul-map-search']} ${styles['mul-map-search-warp']}`} style={{ display: this.state.canSearch === true ? 'block' : 'none' }} />
          <Popover content={this.state.searchInfo} title={map.tip} visible={this.state.showSearchInfo} getTooltipContainer={() => document.getElementById(this.state.id)}>
            <div className={styles['mul-map-search']} style={{ display: this.state.canSearch === true ? 'block' : 'none' }}>
              <input
                placeholder={map.searchDesc} id={`${this.state.id}-TX-INPUT`} onKeyUp={this.handleInputSearch.bind(this)}
                style={{ display: this.state.currentMap === 'tx' ? 'block' : 'none' }}
              />
              <input
                placeholder={map.searchDesc} id={`${this.state.id}-GD-INPUT`} onKeyUp={this.handleInputSearch.bind(this)}
                style={{ display: this.state.currentMap === 'gd' ? 'block' : 'none' }}
              />
            </div>
          </Popover>
          <div className={styles['mul-map-opt']} style={{ display: option === true ? 'block' : 'none' }}>
            <Button icon={this.state.canSearch === true ? 'caret-down' : 'caret-up'} size="default" onClick={() => { this.setState({ canSearch: !this.state.canSearch }); }}>
              { this.state.canSearch === true ? map.closeSearch : map.openSearch }
            </Button>
            <ButtonGroup style={{ float: 'right' }}>
              <Button onClick={() => { this.switchMap('tx'); }} type={this.state.currentMap === 'tx' ? 'primary' : 'default'}>{map.tx}</Button>
              <Button onClick={() => { this.switchMap('gd'); }} type={this.state.currentMap === 'gd' ? 'primary' : 'default'}>{map.gd}</Button>
              <Button type={this.state.currentMap === 'bd' ? 'primary' : 'default'}>{map.bd}</Button>
            </ButtonGroup>
          </div>
        </div>
      </Spin>
    );
  }
}

const noop = () => {};
MulMap.defaultProps = {
  option: true,
  type: 'tx',  // 默认腾讯地图
  width: 350,
  height: 350,
  x: null,
  y: null,
  zoom: 16,
  onClick: noop,
};

export default MulMap;

import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './IndexPage.less';
import MenuAsider from '../components/common/MenuAsider';
import MenuHeader from '../components/common/MenuHeader';
import MainBanner from '../components/common/MainBanner';
import MainContent from '../components/common/MainContent';
import UserInfo from '../components/common/UserInfo';
// import ReLoginModal from '../components/common/ReLoginModal';
import { callConfirm } from '../utils/alert';
import * as i18n from '../utils/i18n';
import Config from '../../config/config.json';
import { getCookie } from '../utils/storage';

const commonName = i18n.commonName;
const commonMap = i18n.commonMap();
/**
 * 首页
 * 此处由于需要使用生命周期方法 因此采用es6写法
 */
class IndexPage extends React.Component {
  render() {
    const { dispatch, indexPage } = this.props;
    const bannerProps = {
      style: { height: 58, background: '#FFF' },
      border: false,
      shadow: true,
    };
    const navItem = indexPage.menuItems;
    const navHeaderData = [];
    const image = 'data:image/png;base64,';

    for (let i = 0; i < navItem.length; i++) {
      const navList = navItem[i];
      const initNavData = { key: '', text: '', to: '' };
      initNavData.key = navList.key;
      initNavData.text = navList.text;
      initNavData.to = navList.to;
      navHeaderData.push(initNavData);
    }
    const initItems = indexPage.menuItems[0].children;
    const initArr = [];
    for (let i = 0; i < initItems.length; i++) {
      const list = initItems[i];
      const initData = { key: '', text: '', to: '' };
      initData.key = list.key;
      initData.text = list.text;
      initData.to = list.to;
      initArr.push(initData);
    }

    const userProps = {
      username: getCookie(`${Config.app}_USR`),
      userText: commonName('user'),
      welcomeText: commonName('welcome'),
      content: (
        <div style={{ overflow: 'hidden' }}>
          <Button
            type="primary" icon="poweroff" size="small" style={{ float: 'right' }} onClick={() => {
              callConfirm(commonMap.logout, commonMap.logoutConfirm, () => {
                dispatch({
                  type: 'indexPage/logout',
                });
              });
            }}
            >
            {commonMap.logout}
          </Button>
        </div>
      ),
    };

    const merLogo = getCookie(Config.logo);
    const merName = getCookie(Config.name);
    const asiderProps = {
      action: true,
      collapse: true,
      logo: (
        <div className={styles.info_container}>
          <div className={styles.info_logo_default} >
            {/*<img role="presentation" className={styles.info_logo} src={merLogo !== '' ? Config.merpFileHost + merLogo : ''} />*/}
            <img role="presentation" className={styles.info_logo} src={merLogo !== '' ? image + merLogo : ''} />
          </div>
          <div className={styles.info_name}>{merName !== '' ? merName : commonMap.company}</div>
        </div>
      ),
      theme: 'dark',
      menuItems: indexPage.navSideData || initArr,
      menuClick: (item) => {
        dispatch({
          type: 'indexPage/updateBreadPath',
          payload: { key: item.key },
        });
      },
    };
    const headerProps = {
      //menuItems: navHeaderData,
      menuItems: navItem,
      path: indexPage.path,
      active: indexPage.active,
      menuClick: (item) => {
        dispatch({
          type: 'indexPage/updateNavHeader',
          payload: { key: item.key },
        });
      },
    }
    // const reLoginProps = {
    //   loading: indexPage.loginLoading,
    //   user: indexPage.username,
    //   visible: indexPage.loginVisible,
    //   submit: (data) => {
    //     dispatch({
    //       type: 'indexPage/relogin',
    //       payload: data,
    //     });
    //   },
    // };
    const contentProps = {};
    const relogin = () => {
      dispatch({
        type: 'indexPage/updateState',
        payload: { loginVisible: true },
      });
    }
    const topLeft = {
      width: '224px',
    }
    return (
      <div className={styles.index_container}>
        <MainBanner {...bannerProps}>
          <ul className={`${styles.banner_item} ${styles.banner_left}`}>
            <li className={styles.banner_warp} style={topLeft}>
              <div className={styles.banner_logo} >
                {/*<img style={{ width: 182, height: 46 }} src={merLogo !== '' ? Config.merpFileHost + merLogo : ''} />*/}
                <img style={{ width: 182, height: 46 }} src={require('../assets/image/sys-logo.png')} alt="iCashCow" />
              </div>
            </li>
          </ul>
          <ul className={`${styles.banner_item} ${styles.banner_right}`}>
            <li className={styles.banner_userinfo}><UserInfo {...userProps} /></li>
          </ul>
          <MenuHeader {...headerProps} />
          {/*
            <ReLoginModal {...reLoginProps} />
            <button id="reloginBtn" onClick={relogin} style={{ display: 'none' }}>relogin</button>
          */}
        </MainBanner>
        {/*<MenuAsider {...asiderProps}></MenuAsider>*/}
        <MainContent {...contentProps}>
          {this.props.children}
        </MainContent>
      </div >
    );
  }
}

function mapStateToProps({ indexPage }) {
  return { indexPage };
}

export default connect(mapStateToProps)(IndexPage);

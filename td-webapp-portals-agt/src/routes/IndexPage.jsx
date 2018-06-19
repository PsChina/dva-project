import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './IndexPage.less';
import MenuAsider from '../components/common/MenuAsider';
import MainBanner from '../components/common/MainBanner';
import MainBreadcrumb from '../components/common/MainBreadcrumb';
import MainContent from '../components/common/MainContent';
import UserInfo from '../components/common/UserInfo';
import ReLoginModal from '../components/common/ReLoginModal';
import { callConfirm } from '../utils/alert';
import Config from '../../config/config.json';
import * as i18n from '../utils/i18n';
import { getCookie, getSession } from '../utils/storage';

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
      style: { height: 40, backgroundColor: '#FFF', borderBottom: 'solid 2px #e6e6e6' },
      border: false,
      shadow: false,
    };
    // const usernam = getSession('usernam');
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
    // logo size 190x60

    const agtName = getCookie('agtName');
    const logo = getCookie('logo');
    const agtpFileHost = Config.agtpFileHost;
    const image = 'data:image/png;base64,';

    const baglogo = (
      <div className={styles.mer_logo}>
      </div >
    )
    const asiderProps = {
      action: true,
      collapse: true,
      logo: (
        <div className={styles.info_container}>
          <div className={styles.info_logo_default} >
            {/*<img role="presentation" className={styles.info_logo} src={logo !== '' ? agtpFileHost + logo : ''} />*/}
            <img role="presentation" className={styles.info_logo} src={require('../assets/image/sys-logo.png')} alt="iCashCow" />
          </div>
          <div className={styles.info_name}>{agtName !== '' ? agtName : commonMap.company}</div>
        </div>
      ),
      theme: 'dark',
      menuItems: indexPage.menuItems,
      menuClick: (item) => {
        dispatch({
          type: 'indexPage/updateBreadPath',
          payload: { key: item.key },
        });
      },
    };

    const breadProps = {
      style: { marginBottom: 16 },
      path: indexPage.breadPath,
      homeIdx: 0,
    };
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
    return (
      <div className={styles.index_container}>
        <MenuAsider {...asiderProps}>
          <MainBanner {...bannerProps}>
            <ul className={`${styles.banner_item} ${styles.banner_right}`}>
              <li className={styles.banner_userinfo}><UserInfo {...userProps} /></li>
            </ul>
            {/*<ReLoginModal {...reLoginProps} />
            <button id="reloginBtn" onClick={relogin} style={{ display: 'none' }}>relogin</button>*/}
          </MainBanner>
          <MainContent {...contentProps}>
            <MainBreadcrumb {...breadProps} />
            {this.props.children}
          </MainContent>
        </MenuAsider>
      </div>
    );
  }
}

function mapStateToProps({ indexPage }) {
  return { indexPage };
}

export default connect(mapStateToProps)(IndexPage);

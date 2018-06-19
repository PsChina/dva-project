import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import DesktopIconList from '../../components/common/DesktopIconList';
import MenuBarMac from '../../components/common/MenuBarMac';
import UpdatePswFrom from '../../components/common/UpdatePsw/UpdatePswFrom';
import styles from './Main.less';
import { callConfirm } from '../../utils/alert';

import * as i18n from '../../utils/i18n';

const Main = ({ dispatch, main }) => {
  const commonMap = i18n.commonMap();
  const { menuItems, sysItems, updatePswVisible, updateFormData, updateFormSubmit, checkInvalid } = main;
  const desktopIconListProps = {
    items: sysItems,
  };
  const menuBarMacProps = {
    menuItems,
    menuClick: (ev, item) => {
      console.log('click menu >>>', item);
      if (item.title === 'LoginOut') {
        callConfirm(commonMap.tip, commonMap.loginOutConfirm, () => {
          dispatch({
            type: 'main/loginOut',
          });
        });
      }
      if (item.title === 'UpdatePsw') {
        dispatch({
          type: 'main/toggleModal',
          payload: { type: 'updatePsw' },
        });
      }
    },
  };
  const updateModalProps = {
    width: 424,
    footer: null,
    title: commonMap.update,
    visible: updatePswVisible,
    onCancel: () => {
      dispatch({
        type: 'main/toggleModal',
        payload: { type: 'updatePsw', data: {} },
      });
    },
  };
  const updatePswProps = {
    // user: user,
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    confirmDirty: checkInvalid,
    formSubmit: (dat) => {
      console.log('user=> ', 111)
      dispatch({
        type: 'main/updatePsw',
        payload: { ...dat },
      });
    },
  };
  return (
    <div className={styles.main}>
      <DesktopIconList {...desktopIconListProps} />
      <MenuBarMac {...menuBarMacProps} />
      <Modal {...updateModalProps}>
        <UpdatePswFrom {...updatePswProps} />
      </Modal>
    </div>
  );
}

// 指定订阅数据 这里关联main
function mapStateToProps({ main }) {
  return { main };
}

export default connect(mapStateToProps)(Main);

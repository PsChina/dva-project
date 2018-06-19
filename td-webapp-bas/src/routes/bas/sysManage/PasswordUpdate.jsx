import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import UserPwdUpdForm from '../../../components/business/bas/user/UserPwdUpdForm';
import * as i18n from '../../../utils/i18n';

const PasswordUpdate = ({ dispatch, userManage }) => {
  const bizMap = i18n.bizMap('bas/user');
  const {
    pwdFormSubmit,
  } = userManage;
  const cardProps = {
    title: bizMap.passwordUpdate,
    style: { width: '100%' },
  };
  const updateTableProps = {
    submiting: pwdFormSubmit,
    formSubmit(dat) {
      dispatch({
        type: 'userManage/updatePwd',
        payload: { ...dat },
      });
    },
  };
  return (
    <Card {...cardProps}>
      <UserPwdUpdForm {...updateTableProps} />
    </Card>
  );
};

function mapStateToProps({ userManage }) {
  return { userManage };
}

export default connect(mapStateToProps)(PasswordUpdate);

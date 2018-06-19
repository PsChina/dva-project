import React from 'react';
import {connect} from 'dva';
import {Card, Row, Button} from 'antd';
import * as i18n from '../../../utils/i18n';
import PwdUpdForm from '../../../components/business/merp/servicePwd/PwdUpdForm'

const bizMap = i18n.bizMap('merp/service');
const PwdService = ({dispatch, pwdService}) => {
  const {submiting, checkInvalid} = pwdService;
  const cardProps = {
    title: bizMap.pwdModify,
    style: {width: '100%'},
  };

  const backToIndx = () => {
    dispatch({
      type: 'indexPage/logout',
      payload: {tk: null, loading: false},
    });
  };
  const applyComponents = [
    <Row key="button">
      <Button onClick={backToIndx} id="backToIndx" style={{display: 'none'}}>{}</Button>
    </Row>,
  ];

  const formProps = {
    loading: submiting,
    applyComponents,
    confirmDirty: checkInvalid,
    confirmBlur(val) {
      dispatch({
        type: 'pwdService/updateState',
        payload: {checkInvalid: val},
      });
    },
    formSubmit(dat) {
      dispatch({
        type: 'pwdService/updatePwd',
        payload: {dat: dat},
      });
    },
  }
  return (
    <Card {...cardProps} >
      <PwdUpdForm {...formProps} />
    </Card>
  );
};

function mapStateToProps({pwdService}) {
  return {pwdService};
}

export default connect(mapStateToProps)(PwdService);

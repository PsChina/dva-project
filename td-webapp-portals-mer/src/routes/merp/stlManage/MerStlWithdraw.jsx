import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import * as i18n from '../../../utils/i18n';
import StlWithdrawForm from '../../../components/business/merp/merStl/StlWithdrawForm'

const MerStlWithdraw = ({ dispatch, merStlWithdraw }) => {
  const { submiting, data } = merStlWithdraw;
  const bizMap = i18n.bizMap('merp/stlWithdraw');
  const commonMap = i18n.commonMap();
  const cardProps = {
    title: bizMap.stlWithdrawTitle,
    style: { width: '100%' },
  };

  const formProps = {
    data,
    loading: submiting,
    formSubmit(dat) {
      dispatch({
        type: 'merStlWithdraw/withdraw',
        payload: { ...dat },
      });
    },
  }

  return (
    <div>
      <Card {...cardProps}>
        <StlWithdrawForm {...formProps} />
      </Card>
    </div>
  );
}

function mapStateToProps({ merStlWithdraw }) {
  return { merStlWithdraw };
}

export default connect(mapStateToProps)(MerStlWithdraw);

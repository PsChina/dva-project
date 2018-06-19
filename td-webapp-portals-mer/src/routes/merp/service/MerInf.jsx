import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import * as i18n from '../../../utils/i18n';
import MerInfoTable from '../../../components/business/merp/merInf/MerInfoTable'

const bizMap = i18n.bizMap('merp/service');

const MerInf = ({ merInf }) => {
  const { infoData } = merInf;
  const cardProps = {
    title: bizMap.merDetail,
    style: { width: '100%' },
  };
  const formProps = {
    data: infoData,
  }
  return (
    <Card {...cardProps} >
      <MerInfoTable {...formProps} />
    </Card>
  );
};

function mapStateToProps({ merInf }) {
  return { merInf };
}

export default connect(mapStateToProps)(MerInf);

import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import DubboQueryForm from '../../../components/business/bas/dubbo/DubboServicesQueryForm';
import DubboPageTable from '../../../components/business/bas/dubbo/DubboServicesPageTable';
import * as i18n from '../../../utils/i18n';

const DubboServicesManage = ({ dispatch, dubboServicesManage }) => {
  const bizMap = i18n.bizMap('bas/dubbo');
  // const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
  } = dubboServicesManage;
  const cardProps = {
    title: bizMap.serviceManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    tableParam,
    formSubmit: (dat) => {
      dispatch({
        type: 'serviceManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };
  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    tablePageChange(next) {
      dispatch({
        type: 'serviceManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    //点击查看
    handleProAndConsLinkClick(text, record, key, flag) {
      const baseFrontUrl = window.location.href.substring(0, window.location.href.indexOf('#'));
      console.log('baseFrontUrl', baseFrontUrl)
      if (flag) {
        window.location.href = `${baseFrontUrl}#/bas/sysManage/userManage?keyword=${record.name}`;
      } else {
        window.location.href = `${baseFrontUrl}"#/bas/sysManage/userManage?keyword=${record.name}`;
      }
    },
  };

  return (
    <div>
      <Card {...cardProps}>
        <DubboQueryForm {...queryFormProps} />
        <DubboPageTable {...tableProps} />
      </Card>
    </div>
  );
};

function mapStateToProps({ dubboServicesManage }) {
  return { dubboServicesManage };
}

export default connect(mapStateToProps)(DubboServicesManage);

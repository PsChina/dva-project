import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Tabs } from 'antd';
import * as i18n from '../../../utils/i18n';
import ClearingChannelSearchForm from '../../../components/business/sms/clr/clrChannel/ClearingChannelSearchForm';
import ClearingChannelPageTable from '../../../components/business/sms/clr/clrChannel/ClearingChannelPageTable';
import ClearingChannelInfoTable from '../../../components/business/sms/clr/clrChannel/ClearingChannelInfoTable';
import ClearingChannelTransactionDetailInfoPageTable from '../../../components/business/sms/clr/clrChannel/ClearingChannelTransactionDetailInfoPageTable';

import ClearingPlatformSearchForm from '../../../components/business/sms/clr/clrPlatform/ClearingPlatformSearchForm';
import ClearingPlatformPageTable from '../../../components/business/sms/clr/clrPlatform/ClearingPlatformPageTable';
import ClearingPlatformInfoTable from '../../../components/business/sms/clr/clrPlatform/ClearingPlatformInfoTable';
import ClearingPlatformTransactionDetailInfoPageTable from '../../../components/business/sms/clr/clrPlatform/ClearingPlatformTransactionDetailInfoPageTable';


const TabPane = Tabs.TabPane;
const ClearingSumManage = ({ dispatch, clearingSumManage }) => {
  const bizMap = i18n.bizMap('sms/clearingSum');
  const commonMap = i18n.commonMap();
  const cardProps = {
    style: { width: '100%' },
  };

  const {
    tableChannelParam,
    tableChannelLoading,
    tableChannelList,
    tableChannelTotal,
    tableChannelCurrentPage,
    chnChannelList,
    chnChannelTotal,
    chnChannelCurrentPage,
    chnChannelLoading,
    chnChannelParam,
    tablePlatformParam,
    tablePlatformLoading,
    tablePlatformList,
    tablePlatformTotal,
    tablePlatformCurrentPage,
    chnPlatformList,
    chnPlatformTotal,
    chnPlatformCurrentPage,
    chnPlatformLoading,
    chnPlatformParam,
    channelInfoModalVisible,
    platformlInfoModalVisible,
    channelInfoTableModalVisible,
    platformInfoTableModalVisible,
    channelData,
    platformData,
  } = clearingSumManage;

  //渠道清分
  const queryChannelFormProps = {
    chnChannelList: chnChannelList,
    formSubmit: (dat) => {
      dispatch({
        type: 'clearingSumManage/queryChannelList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };

  const tableChannelProps = {
    tableChannelLoading,
    tableChannelList,
    tableChannelTotal,
    tableChannelCurrentPage,
    tablePageChange: (next) => {
      dispatch({
        type: 'clearingSumManage/queryChannelList',
        payload: { tableParam: { ...tableChannelParam, currentPage: next } },
      });
    },

    handleDetailClick: (record) => {
      dispatch({
        type: 'clearingSumManage/queryChannelOne',
        payload: { ...record },
      });
    },
    handleTransactionDetailClick: (record) => {
      dispatch({
        type: 'clearingSumManage/queryChannelTransactonList',
        payload: { ...record, tableParam: { id: record.id, merId: record.pyeMemId, cleDat: record.clrDat, ccyCod: record.ccy, busiTyp: record.busiTyp, currentPage: 1 } },
      });
    },
  };

  //平台清分
  const queryPlatformFormProps = {
    chnPlatformList: chnPlatformList,
    formSubmit: (dat) => {
      dispatch({
        type: 'clearingSumManage/queryPlatformList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };

  const tablePlatformProps = {
    tablePlatformLoading,
    tablePlatformList,
    tablePlatformTotal,
    tablePlatformCurrentPage,
    tablePageChange: (next) => {
      dispatch({
        type: 'clearingSumManage/queryPlatformList',
        payload: { tableParam: { ...tablePlatformParam, currentPage: next } },
      });
    },

    handleDetailClick: (record) => {
      dispatch({
        type: 'clearingSumManage/queryPlatformOne',
        payload: { ...record },
      });
    },
    handleTransactionDetailClick: (record) => {
      dispatch({
        type: 'clearingSumManage/queryPlatformTransactonList',
        payload: { tableParam: { id: record.id, merId: record.pyeMemId, cleDat: record.clrDat, ccyCod: record.ccy, busiTyp: record.busiTyp, currentPage: 1 } },
      });
    },
  };

  const channelInfoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: channelInfoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'clearingSumManage/updateState',
        payload: { channelInfoModalVisible: false },
      });
    },
  };

  const channelInfoTableModalProps = {
    footer: null,
    title: bizMap.transactionDetail,
    visible: channelInfoTableModalVisible,
    width: 1200,
    onCancel: () => {
      dispatch({
        type: 'clearingSumManage/updateState',
        payload: { channelInfoTableModalVisible: false },
      });
    },
  };

  const platformInfoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: platformlInfoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'clearingSumManage/updateState',
        payload: { platformlInfoModalVisible: false },
      });
    },
  };

  const platformInfoTableModalProps = {
    footer: null,
    title: bizMap.transactionDetail,
    visible: platformInfoTableModalVisible,
    width: 1200,
    onCancel: () => {
      dispatch({
        type: 'clearingSumManage/updateState',
        payload: { platformInfoTableModalVisible: false },
      });
    },
  };

  const channelInfoTableProps = {
    channelData,
  };

  const channelInfoTablePageProps = {
    chnChannelCurrentPage,
    chnChannelLoading,
    chnChannelList,
    chnChannelTotal,
    chnChannelParam,
    tablePageChange: (next) => {
      dispatch({
        type: 'clearingSumManage/queryChannelTransactonList',
        payload: { tableParam: { ...chnChannelParam, currentPage: next } },
      });
    },
  };

  const platformInfoTableProps = {
    platformData,
  }

  const platformInfoTablePageProps = {
    chnPlatformList,
    chnPlatformCurrentPage,
    chnPlatformLoading,
    chnPlatformTotal,
    chnPlatformParam,
    tablePageChange: (next) => {
      dispatch({
        type: 'clearingSumManage/queryPlatformTransactonList',
        payload: { tableParam: { ...chnPlatformParam, currentPage: next } },
      });
    },
  };

  const Panel1 = [
    <div key="p2">
      <ClearingPlatformSearchForm {...queryPlatformFormProps} />
      <ClearingPlatformPageTable {...tablePlatformProps} />
    </div>,
  ];

  const Panel2 = [
    <div key="p1">
      <ClearingChannelSearchForm {...queryChannelFormProps} />
      <ClearingChannelPageTable {...tableChannelProps} />
    </div>,
  ];

  return (
    <div>
      <Card {...cardProps}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={bizMap['tab-1']} key="1">{Panel1}</TabPane>
          <TabPane tab={bizMap['tab-2']} key="2">{Panel2}</TabPane>
        </Tabs>
      </Card>
      <Modal {...platformInfoModalProps} >
        <ClearingPlatformInfoTable {...platformInfoTableProps} />
      </Modal>
      <Modal {...platformInfoTableModalProps} >
        <ClearingPlatformTransactionDetailInfoPageTable {...platformInfoTablePageProps} />
      </Modal>
      <Modal {...channelInfoModalProps} >
        <ClearingChannelInfoTable {...channelInfoTableProps} />
      </Modal>
      <Modal {...channelInfoTableModalProps} >
        <ClearingChannelTransactionDetailInfoPageTable {...channelInfoTablePageProps} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ clearingSumManage }) {
  return { clearingSumManage };
}

export default connect(mapStateToProps)(ClearingSumManage);

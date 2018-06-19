import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Col, Row, Tabs } from 'antd';
import RouterMerchantPageTable from '../../../components/business/pms/merchant/RouterMerchantPageTable';
import RouterMerchantQueryForm from '../../../components/business/pms/merchant/RouterMerchantQueryForm';
import RouterMerBankcardPageTable from '../../../components/business/pms/routerBankcard/RouterMerBankcardPageTable';
import RouterMerBankcardQueryForm from '../../../components/business/pms/routerBankcard/RouterMerBankcardQueryForm';
import RouterBankcardSelectPageTable from '../../../components/business/pms/routerBankcard/RouterBankcardSelectPageTable';
import RouterBankcardSelectQueryForm from '../../../components/business/pms/routerBankcard/RouterBankcardSelectQueryForm';
import RouterBankcardModSelectPageTable from '../../../components/business/pms/routerBankcard/RouterBankcardModSelectPageTable';
import RouterBankcardModSelectQueryForm from '../../../components/business/pms/routerBankcard/RouterBankcardModSelectQueryForm';

import { callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TabPane = Tabs.TabPane;

const RouterMerBankcardManage = ({ dispatch, routerMerBankcardManage }) => {
  const objectid = 'merId';
  const bizMap = i18n.bizMap('pms/routerMerBankcard');
  const modBizMap = i18n.bizMap('pms/routerMod');
  const currencyData = i18n.bizMap('currency');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    routerTableParam, routerTableLoading, routerTableList, routerTableTotal, routerTableCurrentPage, routerPayloadMerInfo, routerPayloadCurrency, routerPayloadAddSelectCurrency,
    routerAddModalVisible,
    addModalTableList, addModalTableTotal, addModalTableCurrentPage, addModalTableParam, addModalTableLoading,
    routerApplyModalTableList, routerApplyModalTableLoading, routerApplyModalTableTotal, routerApplyModalTableCurrentPage, routerApplyModalTableParam, routerApplyModalVisible,
  } = routerMerBankcardManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardPropsLeft = {
    title: bizMap.routerMerBankcard,
    style: { width: '80%' },
  };
  const cardPropsRight = {
    style: { width: '115%', float: 'right' },
  };
  // cardPropsLeft
  const merQueryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'routerMerBankcardManage/queryMerList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };
  // cardPropsLeft
  const merTableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    routerPayloadCurrency,
    tablePageChange(next) {
      dispatch({
        type: 'routerMerBankcardManage/queryMerList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'routerMerBankcardManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      const dat = Object.assign(record, { currency: routerPayloadCurrency.currency });
      dispatch({
        type: 'routerMerBankcardManage/queryOneList',
        payload: { ...dat },
      });
    },
  };
  // cardPropsRight Tabs
  const routerTabsProps = {
    routerTableParam,
    routerPayloadMerInfo,
    routerPayloadCurrency,
    onChange(item) {
      dispatch({
        type: 'routerMerBankcardManage/updateState',
        payload: { routerPayloadCurrency: { currency: item } },
      })
      if (item && routerPayloadMerInfo.merId) {
        dispatch({
          type: 'routerMerBankcardManage/queryOneList',
          payload: { merId: routerPayloadMerInfo.merId, merNo: routerPayloadMerInfo.merNo, modName: routerPayloadMerInfo.modName, currency: item },
        })
      }
    },
  }

  // cardPropsRight
  const routerQueryFormProps = {
    routerPayloadMerInfo,
    routerPayloadAddSelectCurrency,
    routerAddModalVisible,
    routerPayloadCurrency,
    formSubmit: (dat) => {
      dispatch({
        type: 'routerMerBankcardManage/queryRoutersList',
        payload: { data: Object.assign({}, dat, routerPayloadMerInfo, routerTableParam, { currentPage: 1 }), routerTableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: (dat) => {
      dispatch({
        type: 'routerMerBankcardManage/queryAllList',
        payload: { data: dat, addModalTableParam: { currentPage: 1 } },
      })
    },
    ApplyModClick: (dat) => {
      dispatch({
        type: 'routerMerBankcardManage/queryModList',
        payload: { data: dat, routerApplyModalTableParam: { currentPage: 1 } },
      });
    },
  }
  // cardPropsRight
  const routerTableProps = {
    routerPayloadMerInfo,
    routerPayloadCurrency,
    routerTableList,
    routerTableLoading,
    routerTableTotal,
    routerTableCurrentPage,
    routerTableFooter() {
      return (
        <div>
          {`${routerPayloadCurrency.currency ? `${bizMap.currentCurrency} : ${routerPayloadCurrency.currency}` : ''}`}
          &nbsp; &nbsp;{`${routerPayloadMerInfo.merName ? `${bizMap.merName} : ${routerPayloadMerInfo.merName}` : ''}`}
          &nbsp; &nbsp;&nbsp; &nbsp;{`${routerPayloadMerInfo.merId ? `${bizMap.merId} : ${routerPayloadMerInfo.merId}` : ''}`}

          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 智能路由渠道:   visa,  masster, 银联卡
        </div>
      )
    },
    // routerTableParam,
    tablePageChange(next) {
      dispatch({
        type: 'routerMerBankcardManage/queryRoutersList',
        payload: { data: Object.assign({}, routerPayloadMerInfo, routerTableParam, { currentPage: next }), routerTableParam: { ...routerTableParam, currentPage: next } },
      });
    },
    handleSetDefaultClick(record) {
      dispatch({
        type: 'routerMerBankcardManage/setDefualt',
        payload: { data: Object.assign(record, { currency: routerPayloadCurrency.currency }), routerTableParam: { ...routerTableParam, currentPage: 1 } },
      });
    },
    handleDeleteClick(record) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'routerMerBankcardManage/deleteOne',
          payload: { data: record, routerTableParam: { ...routerTableParam, currentPage: 1 } },
        });
      })
    },
  };

  // cardPropsRight
  const routerAddSelectTabsProps = {
    routerTableParam,
    routerPayloadMerInfo,
    routerPayloadAddSelectCurrency,
    addModalTableParam,
    onChange(item) {
      dispatch({
        type: 'routerMerBankcardManage/updateState',
        payload: { routerPayloadAddSelectCurrency: { currency: item } },
      })
      if (item && routerPayloadMerInfo.merId) {
        dispatch({
          type: 'routerMerBankcardManage/queryAllList',
          payload: { data: { merId: routerPayloadMerInfo.merId, merNo: routerPayloadMerInfo.merNo, modName: routerPayloadMerInfo.modName, currency: item }, addModalTableParam: { currentPage: 1 }, visibleType: 1 },
        })
      }
    },
  }
  // cardPropsSelect
  const selectQueryFormProps = {
    routerPayloadMerInfo,
    routerAddModalVisible,
    formSubmit: (dat) => {
      dispatch({
        type: 'routerMerBankcardManage/queryAllList',
        payload: { visibleType: 1, data: Object.assign({}, routerPayloadMerInfo, dat, addModalTableParam, { currentPage: 1 }), addModalTableParam: { ...addModalTableParam, currentPage: 1 } },
      });
    },
  }
  // cardPropsSelect
  const selectTableProps = {
    routerPayloadMerInfo,
    routerPayloadAddSelectCurrency,
    addModalTableList,
    addModalTableLoading,
    addModalTableTotal,
    addModalTableCurrentPage,
    addModalTableFooter() {
      return (
        <div>
          &nbsp; &nbsp;{`${routerPayloadMerInfo.merName ? `${bizMap.merName} : ${routerPayloadMerInfo.merName}` : ''}`}
          &nbsp; &nbsp;&nbsp; &nbsp;{`${routerPayloadMerInfo.merId ? `${bizMap.merId} : ${routerPayloadMerInfo.merId}` : ''}`}
        </div>
      )
    },
    tablePageChange(next) {
      dispatch({
        type: 'routerMerBankcardManage/queryAllList',
        payload: { visibleType: 1, data: Object.assign({}, routerPayloadMerInfo, addModalTableParam, { currentPage: next }), addModalTableParam: { ...addModalTableParam, currentPage: next } },
      });
    },
    handleAddClick(record) {
      dispatch({
        type: 'routerMerBankcardManage/addOne',
        payload: { data: record, addModalTableParam: { ...addModalTableParam, currentPage: 1 } },
      });
    },
  };

  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: routerAddModalVisible,
    width: 1000,
    onCancel: () => {
      dispatch({
        type: 'routerMerBankcardManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };

  const applyModProps = {
    footer: null,
    title: modBizMap.applyMod,
    visible: routerApplyModalVisible,
    width: 520,
    onCancel: () => {
      dispatch({
        type: 'routerMerBankcardManage/toggleModal',
        payload: { type: 'applyMod', data: {} },
      });
    },
  }

  // applyModPropsSelect
  const applyModQueryFormProps = {
    routerPayloadMerInfo,
    formSubmit: (dat) => {
      dispatch({
        type: 'routerMerBankcardManage/queryModList',
        payload: { visibleType: 1, data: Object.assign({}, routerPayloadMerInfo, dat, { currentPage: 1 }), routerApplyModalTableParam: { ...dat, currentPage: 1 } },
      });
    },
  }

  // applyModPropsSelect
  const applyModTableProps = {
    routerPayloadMerInfo,
    routerApplyModalTableList,
    routerApplyModalTableLoading,
    routerApplyModalTableTotal,
    routerApplyModalTableCurrentPage,
    tablePageChange(next) {
      dispatch({
        type: 'routerMerBankcardManage/queryModList',
        payload: { visibleType: 1, data: Object.assign({}, routerPayloadMerInfo, routerApplyModalTableParam, { currentPage: next }), routerApplyModalTableParam: { ...routerApplyModalTableParam, currentPage: next } },
      });
    },
    handleApplyClick(record) {
      dispatch({
        type: 'routerMerBankcardManage/addOneMod',
        payload: { data: record, addModalTableParam: { ...addModalTableParam, currentPage: 1 } },
      });
    },
  }

  return (
    <div >
      <Row gutter={16}>
        <Col sm={24} md={11}>
          <Card {...cardPropsLeft}>
            <RouterMerchantQueryForm {...merQueryFormProps} />
            <RouterMerchantPageTable {...merTableProps} />
          </Card>
        </Col>
        <Col sm={24} md={13}>
          <Card {...cardPropsRight}>
            <RouterMerBankcardQueryForm {...routerQueryFormProps} />
            <Tabs defaultActiveKey="TWD" {...routerTabsProps}>
              {/*<RouterMerBankcardPageTable {...routerTableProps} />*/}
              {currencyData.map(item =>
                <TabPane tab={`${item.label}(${item.value})`} key={item.value}><RouterMerBankcardPageTable {...routerTableProps} /></TabPane>,
              )}
            </Tabs>
          </Card>
        </Col>
      </Row>

      <Modal {...addModalProps}>
        <RouterBankcardSelectQueryForm {...selectQueryFormProps} />
        <Tabs defaultActiveKey="TWD" {...routerAddSelectTabsProps}>
          {currencyData.map(item =>
            <TabPane tab={`${item.label}(${item.value})`} key={item.value}><RouterBankcardSelectPageTable {...selectTableProps} /></TabPane>,
          )}
        </Tabs>
      </Modal>

      <Modal {...applyModProps}>
        <RouterBankcardModSelectQueryForm {...applyModQueryFormProps} />
        <RouterBankcardModSelectPageTable {...applyModTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ routerMerBankcardManage }) {
  return { routerMerBankcardManage };
}

export default connect(mapStateToProps)(RouterMerBankcardManage);

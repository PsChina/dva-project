import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Col, Row, Tabs } from 'antd';
import RouterMerchantPageTable from '../../../components/business/pms/merchant/RouterMerchantPageTable';
import RouterMerchantQueryForm from '../../../components/business/pms/merchant/RouterMerchantQueryForm';
import RouterMerScancodePageTable from '../../../components/business/pms/routerScancode/RouterMerScancodePageTable';
import RouterMerScancodeQueryForm from '../../../components/business/pms/routerScancode/RouterMerScancodeQueryForm';
import RouterScancodeSelectPageTable from '../../../components/business/pms/routerScancode/RouterScancodeSelectPageTable';
import RouterScancodeSelectQueryForm from '../../../components/business/pms/routerScancode/RouterScancodeSelectQueryForm';
import RouterScancodeModSelectPageTable from '../../../components/business/pms/routerScancode/RouterScancodeModSelectPageTable';
import RouterScancodeModSelectQueryForm from '../../../components/business/pms/routerScancode/RouterScancodeModSelectQueryForm';

import { callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TabPane = Tabs.TabPane;

const RouterMerScancodeManage = ({ dispatch, routerMerScancodeManage }) => {
  const objectid = 'merId';
  const bizMap = i18n.bizMap('pms/routerMerScancode');
  const modBizMap = i18n.bizMap('pms/routerMod');
  const currencyData = i18n.bizMap('currency');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    routerTableParam, routerTableLoading, routerTableList, routerTableTotal, routerTableCurrentPage,
    routerAddModalVisible, routerApplyModalVisible,
    addModalTableList, addModalTableTotal, addModalTableCurrentPage, addModalTableParam, addModalTableLoading,
    routerPayloadMerInfo, routerPayloadCurrency, routerPayloadAddSelectCurrency,
    routerApplyModalTableList, routerApplyModalTableLoading, routerApplyModalTableTotal, routerApplyModalTableCurrentPage, routerApplyModalTableParam,
  } = routerMerScancodeManage;
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
        type: 'routerMerScancodeManage/queryMerList',
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
        type: 'routerMerScancodeManage/queryMerList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'routerMerScancodeManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      const data = Object.assign(record, { currency: routerPayloadCurrency.currency })
      dispatch({
        type: 'routerMerScancodeManage/queryOneList',
        payload: { ...data },
      });
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
        type: 'routerMerScancodeManage/updateState',
        payload: { routerPayloadAddSelectCurrency: { currency: item } },
      })
      if (item && routerPayloadMerInfo.merId) {
        dispatch({
          type: 'routerMerScancodeManage/queryAllList',
          payload: { data: { merId: routerPayloadMerInfo.merId, merNo: routerPayloadMerInfo.merNo, modName: routerPayloadMerInfo.modName, currency: item }, addModalTableParam: { currentPage: 1 }, visibleType: 1 },
        })
      }
    },
  }

  const routerTabsProps = {
    routerTableParam,
    routerPayloadMerInfo,
    routerPayloadCurrency,
    onChange(item) {
      dispatch({
        type: 'routerMerScancodeManage/updateState',
        payload: { routerPayloadCurrency: { currency: item } },
      })
      if (item && routerPayloadMerInfo.merId) {
        dispatch({
          type: 'routerMerScancodeManage/queryOneList',
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
    formSubmit: (dat) => {
      dispatch({
        type: 'routerMerScancodeManage/queryRoutersList',
        payload: { data: Object.assign({}, dat, routerPayloadMerInfo, routerTableParam, { currentPage: 1 }), routerTableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: (dat) => {
      const data = dat;
      data.currency = routerPayloadAddSelectCurrency.currency;
      dispatch({
        type: 'routerMerScancodeManage/queryAllList',
        payload: { data: data, addModalTableParam: { currentPage: 1 } },
      })
    },
    ApplyModClick: (dat) => {
      dispatch({
        type: 'routerMerScancodeManage/queryModList',
        payload: { data: dat, routerApplyModalTableParam: { currentPage: 1 } },
      });
    },
  }
  // cardPropsRight
  const routerTableProps = {
    routerPayloadMerInfo,
    routerTableList,
    routerTableLoading,
    routerTableTotal,
    routerTableCurrentPage,
    routerPayloadCurrency,
    routerTableFooter() {
      return (
        <div>
          {`${routerPayloadCurrency.currency ? `${bizMap.currentCurrency} : ${routerPayloadCurrency.currency}` : ''}`}
          &nbsp; &nbsp;{`${routerPayloadMerInfo.merName ? `${bizMap.merName} : ${routerPayloadMerInfo.merName}` : ''}`}
          &nbsp; &nbsp;&nbsp; &nbsp;{`${routerPayloadMerInfo.merNo ? `${bizMap.merNo} : ${routerPayloadMerInfo.merNo}` : ''}`}
        </div>
      )
    },
    // routerTableParam,
    tablePageChange(next) {
      dispatch({
        type: 'routerMerScancodeManage/queryRoutersList',
        payload: { data: Object.assign({}, routerPayloadMerInfo, routerTableParam, { currentPage: next }), routerTableParam: { ...routerTableParam, currentPage: next } },
      });
    },
    handleSetDefaultClick(record) {
      dispatch({
        type: 'routerMerScancodeManage/setDefualt',
        payload: { data: Object.assign(record, { currency: routerPayloadCurrency.currency }), routerTableParam: { ...routerTableParam, currentPage: 1 } },
      });
    },
    handleDeleteClick(record) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'routerMerScancodeManage/deleteOne',
          payload: { data: record, routerTableParam: { ...routerTableParam, currentPage: 1 } },
        });
      })
    },
  };

  // cardPropsSelect
  const selectQueryFormProps = {
    routerPayloadMerInfo,
    routerAddModalVisible,
    formSubmit: (dat) => {
      dispatch({
        type: 'routerMerScancodeManage/queryAllList',
        payload: { visibleType: 1, data: dat, addModalTableParam: { ...dat, currentPage: 1 } },
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
          &nbsp; &nbsp;&nbsp; &nbsp;{`${routerPayloadMerInfo.merNo ? `${bizMap.merNo} : ${routerPayloadMerInfo.merNo}` : ''}`}
        </div>
      )
    },
    tablePageChange(next) {
      dispatch({
        type: 'routerMerScancodeManage/queryAllList',
        payload: { visibleType: 1, data: routerPayloadMerInfo, addModalTableParam: { ...addModalTableParam, currentPage: next } },
      });
    },
    handleAddClick(record) {
      dispatch({
        type: 'routerMerScancodeManage/addOne',
        payload: { data: record, addModalTableParam: { ...addModalTableParam, currentPage: 1 } },
      });
    },
  };

  // applyModPropsSelect
  const applyModQueryFormProps = {
    routerPayloadMerInfo,
    formSubmit: (dat) => {
      dispatch({
        type: 'routerMerScancodeManage/queryModList',
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
        type: 'routerMerScancodeManage/queryModList',
        payload: { visibleType: 1, data: Object.assign({}, routerPayloadMerInfo, routerApplyModalTableParam, { currentPage: next }), routerApplyModalTableParam: { ...routerApplyModalTableParam, currentPage: next } },
      });
    },
    handleApplyClick(record) {
      dispatch({
        type: 'routerMerScancodeManage/addOneMod',
        payload: { data: record, addModalTableParam: { ...addModalTableParam, currentPage: 1 } },
      });
    },
  }

  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: routerAddModalVisible,
    width: 1000,
    onCancel: () => {
      dispatch({
        type: 'routerMerScancodeManage/toggleModal',
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
        type: 'routerMerScancodeManage/toggleModal',
        payload: { type: 'applyMod', data: {} },
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
            <RouterMerScancodeQueryForm {...routerQueryFormProps} />
            <Tabs defaultActiveKey="TWD" {...routerTabsProps}>
              {/*<TabPane tab={bizMap.allCurrency} key="ALL"><RouterMerScancodePageTable {...routerTableProps} /></TabPane>*/}
              {currencyData.map(item =>
                <TabPane tab={`${item.label}(${item.value})`} key={item.value}><RouterMerScancodePageTable {...routerTableProps} /></TabPane>,
              )}
            </Tabs>
          </Card>
        </Col>
      </Row>

      <Modal {...addModalProps}>
        <RouterScancodeSelectQueryForm {...selectQueryFormProps} />
        <Tabs defaultActiveKey="TWD" {...routerAddSelectTabsProps}>
          {currencyData.map(item =>
            <TabPane tab={`${item.label}(${item.value})`} key={item.value}><RouterScancodeSelectPageTable {...selectTableProps} /></TabPane>,
          )}
        </Tabs>
      </Modal>

      <Modal {...applyModProps}>
        <RouterScancodeModSelectQueryForm {...applyModQueryFormProps} />
        <RouterScancodeModSelectPageTable {...applyModTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ routerMerScancodeManage }) {
  return { routerMerScancodeManage };
}

export default connect(mapStateToProps)(RouterMerScancodeManage);

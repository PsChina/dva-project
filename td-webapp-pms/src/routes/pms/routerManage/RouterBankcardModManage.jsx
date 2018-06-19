import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Tabs, Col, Row } from 'antd';
import RouterModBankcardPageTable from '../../../components/business/pms/routerMod/RouterModBankcardPageTable';
import RouterModBankcardQueryForm from '../../../components/business/pms/routerMod/RouterModBankcardQueryForm';
import RouterModMerBankcardPageTable from '../../../components/business/pms/routerMod/RouterModMerBankcardPageTable';
import RouterModMerBankcardQueryForm from '../../../components/business/pms/routerMod/RouterModMerBankcardQueryForm';
import RouterModBankcardSelectPageTable from '../../../components/business/pms/routerMod/RouterModBankcardSelectPageTable';
import RouterModBankcardSelectQueryForm from '../../../components/business/pms/routerMod/RouterModBankcardSelectQueryForm';
import RouterModInfoForm from '../../../components/business/pms/routerMod/RouterModInfoForm';
import { callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TabPane = Tabs.TabPane;

const RouterBankcardModManage = ({ dispatch, routerBankcardModManage }) => {
  const objectid = 'merId';
  const bizMap = i18n.bizMap('pms/routerMod');
  const currencyData = i18n.bizMap('currency');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    routerTableParam, routerTableLoading, routerTableList, routerTableTotal, routerTableCurrentPage, routerPayloadModInfo, routerPayloadCurrency,
    routerAddModalVisible, modAddModalVisible, modUpdateModalVisible,
    addModalTableList, addModalTableTotal, addModalTableCurrentPage, addModalTableParam, addModalTableLoading,
    modAddFormData, modUpdateFormData, modAddFormSubmit, modUpdateFormSubmit,
    checkModNoChkMsg,
  } = routerBankcardModManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardPropsLeft = {
    title: bizMap.routerBankcardModConfig,
    style: { width: '80%' },
  };
  const cardPropsRight = {
    style: { width: '115%', float: 'right' },
  };
  // cardPropsLeft
  const routerModQueryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'routerBankcardModManage/queryModList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'routerBankcardModManage/toggleModal',
        payload: { type: 'modAdd', data: {} },
      })
    },
    updateClick: () => {
      dispatch({
        type: 'routerBankcardModManage/toggleModal',
        payload: { type: 'modUpdate', data: {} },
      })
    },
  };
  // cardPropsLeft
  const routerModTableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    routerPayloadCurrency,
    tablePageChange(next) {
      dispatch({
        type: 'routerBankcardModManage/queryModList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'routerBankcardModManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      const data = record;
      data.currency = routerPayloadCurrency.currency;
      dispatch({
        type: 'routerBankcardModManage/queryModRoutersList',
        payload: { data, routerTableParam: { ...routerTableParam, currentPage: 1 } },
      });
    },
    handleUpdateClick(record) {
      const data = record;
      dispatch({
        type: 'routerBankcardModManage/toggleModal',
        payload: { type: 'modUpdate', data },
      });
    },
  };
  // cardPropsRight
  const routerQueryFormProps = {
    routerPayloadModInfo,
    routerPayloadCurrency,
    routerAddModalVisible,
    formSubmit: (dat) => {
      dispatch({
        type: 'routerBankcardModManage/queryModRoutersList',
        payload: { data: Object.assign({}, routerPayloadModInfo, dat, routerTableParam, { currentPage: 1 }), routerTableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: (dat) => {
      dispatch({
        type: 'routerBankcardModManage/queryAllMersList',
        payload: { data: dat, addModalTableParam: { currentPage: 1 } },
      })
    },
  }
  // cardPropsRight
  const routerCurrencyTabsProps = {
    routerTableParam,
    routerPayloadModInfo,
    routerPayloadCurrency,
    onChange(item) {
      dispatch({
        type: 'routerBankcardModManage/updateState',
        payload: { routerPayloadCurrency: { currency: item } },
      })
      if (item && routerPayloadModInfo.modNo) {
        dispatch({
          type: 'routerBankcardModManage/queryModRoutersList',
          payload: { data: { txnChannel: routerPayloadModInfo.txnChannel, modNo: routerPayloadModInfo.modNo, modName: routerPayloadModInfo.modName, currency: item }, routerTableParam: { ...routerTableParam, currentPage: 1 } },
        })
      }
    },
  }

  const routerCurrencySelectTabsProps = {
    routerTableParam,
    routerPayloadModInfo,
    routerPayloadCurrency,
    onChange(item) {
      dispatch({
        type: 'routerBankcardModManage/updateState',
        payload: { routerPayloadCurrency: { currency: item } },
      })
      if (item && routerPayloadModInfo.modNo) {
        dispatch({
          type: 'routerBankcardModManage/queryAllMersList',
          payload: { visibleType: 1, data: { txnChannel: routerPayloadModInfo.txnChannel, modNo: routerPayloadModInfo.modNo, modName: routerPayloadModInfo.modName, currency: item }, addModalTableParam: { currentPage: 1 } },
        })
      }
    },
  }
  const routerTableProps = {
    routerPayloadModInfo,
    routerPayloadCurrency,
    routerTableList,
    routerTableLoading,
    routerTableTotal,
    routerTableCurrentPage,
    routerTableFooter() {
      return (
        <div>
          {`${routerPayloadCurrency.currency ? `${bizMap.currentCurrency} : ${routerPayloadCurrency.currency}` : ''}`}
          &nbsp; &nbsp;{`${routerPayloadModInfo.modName ? `${bizMap.modName} : ${routerPayloadModInfo.modName}` : ''}`}
          &nbsp; &nbsp;&nbsp; &nbsp;{`${routerPayloadModInfo.modNo ? `${bizMap.modNo} : ${routerPayloadModInfo.modNo}` : ''}`}
        </div>
      )
    },
    // routerTableParam,
    tablePageChange(next) {
      dispatch({
        type: 'routerBankcardModManage/queryModRoutersList',
        payload: { data: Object.assign({}, routerPayloadModInfo, routerTableParam, { currentPage: next }), routerTableParam: { ...routerTableParam, currentPage: next } },
      });
    },
    handleSetDefaultClick(record) {
      callConfirm(commonMap.tip, bizMap.setDefaultConfirm, () => {
        dispatch({
          type: 'routerBankcardModManage/setDefualt',
          payload: { data: record, routerTableParam: { ...routerTableParam, currentPage: 1 } },
        });
      })
    },
    handleDeleteClick(record) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'routerBankcardModManage/deleteOneRouter',
          payload: { data: record, routerTableParam: { ...routerTableParam, currentPage: 1 } },
        });
      })
    },
  };

  // cardPropsSelect
  const selectQueryFormProps = {
    routerPayloadModInfo,
    routerPayloadCurrency,
    routerAddModalVisible,
    formSubmit: (dat) => {
      dispatch({
        type: 'routerBankcardModManage/queryAllMersList',
        payload: { visibleType: 1, data: Object.assign({}, routerPayloadModInfo, dat, { currentPage: 1 }), addModalTableParam: { ...dat, currentPage: 1 } },
      });
    },
  }
  // cardPropsSelect
  const selectTableProps = {
    routerPayloadModInfo,
    routerPayloadCurrency,
    addModalTableList,
    addModalTableLoading,
    addModalTableTotal,
    addModalTableCurrentPage,
    addModalTableFooter() {
      return (
        <div>
          &nbsp; &nbsp;{`${routerPayloadModInfo.merName ? `${bizMap.merName} : ${routerPayloadModInfo.merName}` : ''}`}
          &nbsp; &nbsp;&nbsp; &nbsp;{`${routerPayloadModInfo.merId ? `${bizMap.merId} : ${routerPayloadModInfo.merId}` : ''}`}
        </div>
      )
    },
    tablePageChange(next) {
      dispatch({
        type: 'routerBankcardModManage/queryAllMersList',
        payload: { visibleType: 1, data: Object.assign({}, routerPayloadModInfo, addModalTableParam, { currentPage: next }), addModalTableParam: { ...addModalTableParam, currentPage: next } },
      });
    },
    handleAddClick(record) {
      dispatch({
        type: 'routerBankcardModManage/addOneModMer',
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
        type: 'routerBankcardModManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };

  const modAddModalProps = {
    footer: null,
    title: commonMap.add,
    visible: modAddModalVisible,
    width: 512,
    onCancel: () => {
      dispatch({
        type: 'routerBankcardModManage/toggleModal',
        payload: { type: 'modAdd', data: {} },
      });
    },
  };

  const modUpdateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: modUpdateModalVisible,
    width: 512,
    onCancel: () => {
      dispatch({
        type: 'routerBankcardModManage/toggleModal',
        payload: { type: 'modUpdate', data: {} },
      });
    },
  };

  const modAddFormProps = {
    type: 'add',
    flag: 'bankcard',
    data: modAddFormData,
    onlyRead: false,
    submiting: modAddFormSubmit,
    checkModNoChkMsg: checkModNoChkMsg,
    formSubmit: (dat) => {
      dispatch({
        type: 'routerBankcardModManage/addOneMod',
        payload: { ...dat },
      });
    },
    checkmodNo: (dat) => {
      dispatch({
        type: 'routerBankcardModManage/checkModNo',
        payload: { ...dat },
      });
    },
  };
  const modUpdateFormProps = {
    data: modAddFormData,
    submiting: modUpdateFormSubmit,
    type: 'update',
    flag: 'bcancode',
    onlyRead: true,
    formSubmit: (dat) => {
      dispatch({
        type: 'routerBankcardModManage/updateOneMod',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <RouterModInfoForm {...modAddFormProps} />;
  const UpdateFormGen = () => <RouterModInfoForm {...modUpdateFormProps} />;
  return (
    <div >
      <Row gutter={16}>
        <Col sm={24} md={11}>
          <Card {...cardPropsLeft}>
            <RouterModBankcardQueryForm {...routerModQueryFormProps} />
            <RouterModBankcardPageTable {...routerModTableProps} />
          </Card>
        </Col>
        <Col sm={24} md={13}>
          <Card {...cardPropsRight}>
            <RouterModMerBankcardQueryForm {...routerQueryFormProps} />
            <Tabs defaultActiveKey="TWD" {...routerCurrencyTabsProps}>
              {/*<TabPane tab={bizMap.allCurrency} key="ALL"><RouterModMerBankcardPageTable {...routerTableProps} /></TabPane>*/}
              {currencyData.map(item =>
                <TabPane tab={`${item.label}(${item.value})`} key={item.value}><RouterModMerBankcardPageTable {...routerTableProps} /></TabPane>,
              )}
            </Tabs>
          </Card>
        </Col>
      </Row>

      <Modal {...addModalProps}>
        <RouterModBankcardSelectQueryForm {...selectQueryFormProps} />
        <Tabs defaultActiveKey="TWD" {...routerCurrencySelectTabsProps}>
          {/*<TabPane tab={bizMap.allCurrency} key="ALL"><RouterModBankcardSelectPageTable {...selectTableProps} /></TabPane>*/}
          {currencyData.map(item =>
            <TabPane tab={`${item.label}(${item.value})`} key={item.value}><RouterModBankcardSelectPageTable {...selectTableProps} /></TabPane>,
          )}
        </Tabs>
      </Modal>
      <Modal {...modAddModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...modUpdateModalProps}>
        <UpdateFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ routerBankcardModManage }) {
  return { routerBankcardModManage };
}

export default connect(mapStateToProps)(RouterBankcardModManage);

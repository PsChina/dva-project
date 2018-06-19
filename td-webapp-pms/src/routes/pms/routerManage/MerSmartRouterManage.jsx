import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import MerSmartRouterQueryForm from '../../../components/business/pms/merSmartRouter/MerSmartRouterQueryForm';
import MerSmartRouterPageTable from '../../../components/business/pms/merSmartRouter/MerSmartRouterPageTable';
import MerSmartRouterInfoForm from '../../../components/business/pms/merSmartRouter/MerSmartRouterInfoForm';

import MerchantScancodeInfoForm from '../../../components/business/pms/merchantScancode/MerchantScancodeInfoForm';
import MerchantScancodeInfoTable from '../../../components/business/pms/merchantScancode/MerchantScancodeInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MerSmartRouterManage = ({ dispatch, merSmartRouterManage }) => {
  const objectId1 = 'merId';
  const objectId2 = 'txnChannel';
  const bizMap = i18n.bizMap('pms/smartRoute');
  const commonMap = i18n.commonMap();
  const {
    tableParam,
    tableLoading,
    tableList,
    tableTotal,
    tableSelects,
    tableCurrentPage,

    advExpand,

    updateModalVisible,
    updateFormSubmit,
    updateFormData,

    addModalVisible,
    addFormSubmit,
    addFormData,

    orgTreeData,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage, miniFormVisible,
  } = merSmartRouterManage;
  const merIds = [];
  const txnChannels = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const merId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectId1] : tableSelects[i];
    const txnChannel = typeof tableSelects[i] === 'object' ? tableSelects[i][objectId2] : tableSelects[i];
    merIds.push(merId);
    txnChannels.push(txnChannel);
  }

  const cardProps = {
    title: bizMap.merchantSmartRouteManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'merSmartRouterManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'merSmartRouterManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        // 判断所选智能路由是否被禁用
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].smartRoute === '1') {
            callNotice(commonMap.warning, bizMap.exitEnable, 'warning');
            return;
          }
          if (tableSelects[i].smartRoute !== '0' && tableSelects[i].smartRoute !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'merSmartRouterManage/deleteList',
            payload: { merIds: merIds.toString(), txnChannels: txnChannels.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const smartRoute = tableSelects[0].smartRoute;
        for (let i = 0; i < tableSelects.length; i++) {
          if (smartRoute !== tableSelects[i].smartRoute) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].smartRoute !== '0' && tableSelects[i].smartRoute !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (smartRoute === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merSmartRouterManage/updateStatus',
            payload: { merIds: merIds.toString(), txnChannels: txnChannels.toString(), smartRoute: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const smartRoute = tableSelects[0].smartRoute;
        for (let i = 0; i < tableSelects.length; i++) {
          if (smartRoute !== tableSelects[i].smartRoute) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].smartRoute !== '0' && tableSelects[i].smartRoute !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (smartRoute === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'merSmartRouterManage/updateStatus',
            payload: { merIds: merIds.toString(), txnChannels: txnChannels.toString(), smartRoute: '0' },
          });
        });
      }
    },
  };
  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    width: 900,
    tablePageChange(next) {
      dispatch({
        type: 'merSmartRouterManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merSmartRouterManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
  };

  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    width: 450,
    onCancel: () => {
      dispatch({
        type: 'merSmartRouterManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };

  const addFormProps = {
    miniFormVisible,
    tableList: miniFormTableList,
    tableLoading: miniFormTableLoading,
    tableTotal: miniFormTableTotal,
    tableCurrentPage: miniFormTableCurrentPage,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'merSmartRouterManage/addOne',
        payload: { ...dat },
      });
    },
    advLinkClick: (dat) => {
      dispatch({
        type: 'merSmartRouterManage/toggleAdvExpand',
        payload: { dat },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      dat.merId = data.merId;
      dat.merName = data.merName;
      dat.agtId = data.agtId;
      dispatch({
        type: 'merSmartRouterManage/toggleModal',
        payload: { type: 'mer', data: addFormData },
      });
    },
    toggleMerTable(formData) {
      dispatch({
        type: 'merSmartRouterManage/toggleModal',
        payload: { type: 'mer', data: formData },
      });
    },
    queryMerList(dat) {
      dispatch({
        type: 'merSmartRouterManage/queryMerList',
        payload: { miniFormTableParam: { ...dat, currentPage: 1 } },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'merSmartRouterManage/queryMerList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    popoverOncancel() {
      dispatch({
        type: 'merSmartRouterManage/updateState',
        payload: { miniFormVisible: false },
      });
    },
  };
  return (
    <div>
      <Card {...cardProps}>
        <MerSmartRouterQueryForm {...queryFormProps} />
        <MerSmartRouterPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <MerSmartRouterInfoForm {...addFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ merSmartRouterManage }) {
  return { merSmartRouterManage };
}

export default connect(mapStateToProps)(MerSmartRouterManage);

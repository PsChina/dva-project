import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Spin } from 'antd';
import QrCodeQueryForm from '../../../components/business/tms/qrcode/QrCodeInfoQueryForm';
import QrCodePageTable from '../../../components/business/tms/qrcode/QrCodeInfoPageTable';
import QrCodeInfoForm from '../../../components/business/tms/qrcode/QrCodeInfoForm';
import QrCodeInfoTable from '../../../components/business/tms/qrcode/QrCodeInfoTable';
import QrCodeAttachDetailInfoForm from '../../../components/business/tms/qrcode/QrCodeAttachDetailInfoForm';
import MerQueryPage from '../../../components/business/tms/mer/MerQueryPage';
import MerPageTable from '../../../components/business/tms/mer/MerPageTable';

import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const QrCodeInfoManage = ({ dispatch, qrCodeInfoManage }) => {
  const objectid = 'qrId';
  const bizMap = i18n.bizMap('tms/qrCode');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects,
    advExpand, tableCurrentPage, addModalVisible, addFormData, addFormSubmit,
    merModalVisible, merTableList, merTableTotal, merTableCurrentPage, merTableLoading, merTableParam, bindingQrId,
    infoTableData, infoModalVisible, spinLoading, attachInfoData, attachInfoModalVisible } = qrCodeInfoManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.qrCodeInfoManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'qrCodeInfoManage/toggleAdvExpand',
      });
    },
    addClick: () => {
      dispatch({
        type: 'qrCodeInfoManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'qrCodeInfoManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const status = tableSelects[0].status;
        for (let i = 0; i < tableSelects.length; i++) {
          if (status !== tableSelects[i].status) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].status !== '0' && tableSelects[i].status !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (status === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'qrCodeInfoManage/updateStatus',
            payload: { ids: selectIds.toString(), status: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const status = tableSelects[0].status;
        for (let i = 0; i < tableSelects.length; i++) {
          if (status !== tableSelects[i].status) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].status !== '0' && tableSelects[i].status !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (status === '0') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'qrCodeInfoManage/updateStatus',
            payload: { ids: selectIds.toString(), status: '0' },
          });
        });
      }
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].status === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'qrCodeInfoManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
  };
  const tableProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'qrCodeInfoManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'qrCodeInfoManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'qrCodeInfoManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleBindMer(record) {
      dispatch({
        type: 'qrCodeInfoManage/updateState',
        payload: { bindingQrId: record.qrId },
      })
      dispatch({
        type: 'qrCodeInfoManage/queryMerList',
        payload: { tableParam: { ...record, currentPage: 1 } },
      });
    },
    handleQueryAttachClick(record) {
      dispatch({
        type: 'qrCodeInfoManage/queryAttach',
        payload: { PKID: record.qrId, TABLENAME: 'qr_code_info', attachInfoModalVisible: !attachInfoModalVisible },
      });
    },
  };

  const addModalProps = {
    width: 666,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'qrCodeInfoManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };

  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'qrCodeInfoManage/addNumbers',
        payload: { ...dat },
      });
    },
  };

  const bindMerModalProps = {
    width: 666,
    footer: null,
    title: commonMap.add,
    visible: merModalVisible,
    onCancel: () => {
      dispatch({
        type: 'qrCodeInfoManage/updateState',
        payload: { bindingQrId: '' },
      })
      dispatch({
        type: 'qrCodeInfoManage/toggleModal',
        payload: { type: 'bindMer', data: {} },
      });
    },
  }

  const bindMerQueryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'qrCodeInfoManage/queryMerList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };

  const infoModalProps = {
    width: 666,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'qrCodeInfoManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };

  const infoTableProps = {
    data: infoTableData,
  };

  const bindMerTableProps = {
    tableCurrentPage: merTableCurrentPage,
    tableList: merTableList,
    tableLoading: merTableLoading,
    tableTotal: merTableTotal,
    bindingQrId,
    formSubmit: (dat) => {
      dispatch({
        type: 'qrCodeInfoManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'qrCodeInfoManage/queryMerList',
        payload: { tableParam: { ...merTableParam, currentPage: next } },
      });
    },
    clickCallback(data) {
      callConfirm(commonMap.tip, bizMap.bindMerConfirm, () => {
        dispatch({
          type: 'qrCodeInfoManage/bindMer',
          payload: { merId: data.merId, merName: data.merName, storeId: data.braId, storeName: data.braName, status: '1', qrId: bindingQrId },
        });
      });
    },
  };

  const attachInfoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: attachInfoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'qrCodeInfoManage/toggleModal',
        payload: { type: 'attachInfo', data: {} },
      });
    },
  };
  const attachDetailFormProps = {
    data: attachInfoData,
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  return (
    <div>
      <Card {...cardProps}>
        <QrCodeQueryForm {...queryFormProps} />
        <QrCodePageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <QrCodeInfoForm {...addFormProps} />
      </Modal>
      <Modal {...bindMerModalProps}>
        <MerQueryPage {...bindMerQueryFormProps} />
        <MerPageTable {...bindMerTableProps} />
      </Modal>
      <Modal {...infoModalProps}>
        <QrCodeInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...attachInfoModalProps}>
        <Spin spinning={spinLoading}>
          <QrCodeAttachDetailInfoForm {...attachDetailFormProps} />
        </Spin>
      </Modal>
    </div>
  );
};

function mapStateToProps({ qrCodeInfoManage }) {
  return { qrCodeInfoManage };
}

export default connect(mapStateToProps)(QrCodeInfoManage);

import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import ChannelScancodeQueryForm from '../../../components/business/pms/temp/channel/ChannelQueryForm';
import ChannelScancodePageTable from '../../../components/business/pms/scancode/ChannelScancodePageTable';
import ChannelScancodeInfoForm from '../../../components/business/pms/scancode/ChannelScancodeInfoForm';
import ChannelScancodeInfoTable from '../../../components/business/pms/scancode/ChannelScancodeInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const ChannelScancodeManage = ({ dispatch, channelScancodeManage }) => {
  const objectid = 'chnId';
  const bizMap = i18n.bizMap('pms/channelScancode');
  const commonMap = i18n.commonMap();
  const {
    tableParam,
    tableLoading,
    tableList,
    tableTotal,
    tableSelects,
    tableCurrentPage,

    infoModalVisible,
    infoTableData,

    advExpand,
    updateModalVisible,
    updateFormSubmit,
    updateFormData,

    fileList,

  } = channelScancodeManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.channelTransfer,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'channelScancodeManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].chnStatus === '1') {
            callNotice(commonMap.warning, bizMap.exitEnable, 'warning');
            return;
          }
          if (tableSelects[i].chnStatus !== '0' && tableSelects[i].chnStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'channelScancodeManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const chnStatus = tableSelects[0].chnStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (chnStatus !== tableSelects[i].chnStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].chnStatus !== '0' && tableSelects[i].chnStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (chnStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'channelScancodeManage/updateStatus',
            payload: { ids: selectIds.toString(), chnStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const chnStatus = tableSelects[0].chnStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (chnStatus !== tableSelects[i].chnStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].chnStatus !== '0' && tableSelects[i].chnStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (chnStatus === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'channelScancodeManage/updateStatus',
            payload: { ids: selectIds.toString(), chnStatus: '0' },
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
    tablePageChange(next) {
      dispatch({
        type: 'channelScancodeManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'channelScancodeManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'channelScancodeManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      const data = Object.assign({}, { ...record });
      dispatch({
        type: 'channelScancodeManage/toggleModal',
        payload: { type: 'update', data: data },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'channelScancodeManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    width: 800,
    onCancel: () => {
      dispatch({
        type: 'channelScancodeManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    advExpand: advExpand,
    submiting: updateFormSubmit,
    optType: '2',
    fileList,
    uploadLogo: (params) => {
      dispatch({
        type:'channelScancodeManage/uploadLogo',
        payload: { ...params },
      })
    },
    getBase64Logo: (params) => {
      dispatch({
        type:'channelScancodeManage/getBase64Logo',
        payload: { ...params },
      })
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'channelScancodeManage/updateOne',
        payload: { ...dat },
      });
    },
    advLinkClick: () => {
      dispatch({
        type: 'channelScancodeManage/updateState',
        payload: { advExpand: !advExpand },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <ChannelScancodeInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <ChannelScancodeQueryForm {...queryFormProps} />
        <ChannelScancodePageTable {...tableProps} />
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <ChannelScancodeInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ channelScancodeManage }) {
  return { channelScancodeManage };
}

export default connect(mapStateToProps)(ChannelScancodeManage);

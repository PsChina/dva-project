import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PersonalMemberQueryForm from '../../../components/business/mms/personalMember/PersonalMemberQueryForm';
import PersonalMemberPageTable from '../../../components/business/mms/personalMember/PersonalMemberPageTable';
import PersonalMemberInfoForm from '../../../components/business/mms/personalMember/PersonalMemberInfoForm';
import PersonalMemberInfoTable from '../../../components/business/mms/personalMember/PersonalMemberInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PersonalMemberManage = ({ dispatch, personalMemberManage }) => {
  const objectid = 'id';
  const bizMap = i18n.bizMap('mms/personalMember');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects,
    updateModalVisible, updateFormSubmit, updateFormData, tableCurrentPage,
    infoModalVisible, infoTableData,
  } = personalMemberManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.personalMemberManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'personalMemberManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'personalMemberManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'personalMemberManage/updateStatus',
            payload: { ids: selectIds.toString(), status: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'personalMemberManage/updateStatus',
            payload: { ids: selectIds.toString(), status: '0' },
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
        type: 'personalMemberManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'personalMemberManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'personalMemberManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'personalMemberManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'personalMemberManage/toggleModal',
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
    onCancel: () => {
      dispatch({
        type: 'personalMemberManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'personalMemberManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <PersonalMemberInfoForm {...updateFormProps} />;

  return (
    <div>
      <Card {...cardProps}>
        <PersonalMemberQueryForm {...queryFormProps} />
        <PersonalMemberPageTable {...tableProps} />
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <PersonalMemberInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ personalMemberManage }) {
  return { personalMemberManage };
}

export default connect(mapStateToProps)(PersonalMemberManage);

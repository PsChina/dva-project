import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PaperBlackListInfoForm from '../../../components/business/rms/paper/PaperBlackListInfoForm';
import PaperBlackListPageTable from '../../../components/business/rms/paper/PaperBlackListPageTable';
import PaperBlackListQueryForm from '../../../components/business/rms/paper/PaperBlackListQueryForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PaperBlackListManage = ({ dispatch, paperBlackListManage }) => {
  const objectid = 'paperId';
  const bizMap = i18n.bizMap('rms/paperBlackList');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, addFormSubmit, addFormData,
    orgTreeData,
  } = paperBlackListManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.paperBlackList,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'paperBlackListManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'paperBlackListManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      console.log('tableSelects', tableSelects)
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].usrStatus === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'paperBlackListManage/deleteList',
            payload: { ids: selectIds.toString() },
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
    tableParam,
    tablePageChange(next) {
      dispatch({
        type: 'paperBlackListManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'paperBlackListManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
  };

  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'paperBlackListManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const addFormProps = {
    orgTreeData,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'paperBlackListManage/addOne',
        payload: { ...dat },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <PaperBlackListInfoForm {...addFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <PaperBlackListQueryForm {...queryFormProps} />
        <PaperBlackListPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ paperBlackListManage }) {
  return { paperBlackListManage };
}

export default connect(mapStateToProps)(PaperBlackListManage);

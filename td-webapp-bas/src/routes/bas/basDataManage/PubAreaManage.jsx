import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PubAreaQueryForm from '../../../components/business/bas/pubArea/PubAreaQueryForm';
import PubAreaPageTable from '../../../components/business/bas/pubArea/PubAreaPageTable';
import PubAreaForm from '../../../components/business/bas/pubArea/PubAreaForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PubAreaManage = ({ dispatch, pubAreaManage }) => {
  const objectid = 'areaCode';
  const bizMap = i18n.bizMap('bas/pubArea');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
  } = pubAreaManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.pubAreaManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    tableParam,
    formSubmit: (dat) => {
      dispatch({
        type: 'pubAreaManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      const addData = {};
      if (tableSelects.length === 1) {
        addData.areaParentCode = tableSelects[0].areaCode;
        addData.areaParentName = tableSelects[0].areaName;
      } else {
        addData.areaParentCode = '0';
        addData.areaParentName = bizMap.initAreaParentName;
      }
      dispatch({
        type: 'pubAreaManage/toggleModal',
        payload: { type: 'add', addFormData: addData },
      })
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].areaStatus === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, bizMap.deleteConfirm, () => {
          dispatch({
            type: 'pubAreaManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const areaStatus = tableSelects[0].areaStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (areaStatus !== tableSelects[i].areaStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].areaStatus !== '0' && tableSelects[i].areaStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (areaStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, bizMap.enableConfirm, () => {
          dispatch({
            type: 'pubAreaManage/updateStatus',
            payload: { tableParam: { ...tableParam, currentPage: 1 }, ids: selectIds.toString(), areaStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const areaStatus = tableSelects[0].areaStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (areaStatus !== tableSelects[i].areaStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].areaStatus !== '0' && tableSelects[i].areaStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (areaStatus === '0') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, bizMap.disableConfirm, () => {
          dispatch({
            type: 'pubAreaManage/updateStatus',
            payload: { tableParam: { ...tableParam, currentPage: 1 }, ids: selectIds.toString(), areaStatus: '0' },
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
        type: 'pubAreaManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'pubAreaManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'pubAreaManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubAreaManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubAreaManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dat.agtInProvCityArea ? (dat.agtInProvCityArea = dat.agtInProvCityArea.join(',')) : '';
      dispatch({
        type: 'pubAreaManage/addOne',
        payload: { ...dat },
      });
    },
  };

  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      console.log('dat=>', dat)
      dispatch({
        type: 'pubAreaManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <PubAreaForm {...addFormProps} />;
  const UpdateFormGen = () => <PubAreaForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <PubAreaQueryForm {...queryFormProps} />
        <PubAreaPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ pubAreaManage }) {
  return { pubAreaManage };
}

export default connect(mapStateToProps)(PubAreaManage);

import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Col, Row } from 'antd';
import PubBankPageTable from '../../../components/business/bas/pubBank/PubBankPageTable';
import PubBankSubPageTable from '../../../components/business/bas/pubBank/PubBankSubPageTable';
import PubBankForm from '../../../components/business/bas/pubBank/PubBankForm';
import PubBankSubForm from '../../../components/business/bas/pubBank/PubBankSubForm';
import PubBankSubQueryForm from '../../../components/business/bas/pubBank/PubBankSubQueryForm';
import PubBankQueryForm from '../../../components/business/bas/pubBank/PubBankQueryForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PubBankManage = ({ dispatch, pubBankManage }) => {
  const objectid = 'bankCode';
  const bizMap = i18n.bizMap('bas/pubBank');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    subTableParam, subTableLoading, subTableList, subTableTotal, subTableCurrentPage, subTableSelects,
    subAddModalVisible, subUpdateModalVisible, subAddFormSubmit, subUpdateFormSubmit, subAddFormData, subUpdateFormData,
    selectBankCode, selectBankName,
  } = pubBankManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const subSelectIds = [];
  for (let i = 0; i < subTableSelects.length; i++) {
    const selectId = typeof subTableSelects[i] === 'object' ? subTableSelects[i][objectid] : subTableSelects[i];
    subSelectIds.push(selectId);
  }
  const cardPropsLeft = {
    title: bizMap.pubBankManage,
  };
  const subCardPropsLeft = {
    title: `${selectBankName}${bizMap.subDetailManage}`,
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'pubBankManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'pubBankManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'pubBankManage/deleteList',
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
        type: 'pubBankManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'pubBankManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'pubBankManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleSubDetailClick(record) {
      dispatch({
        type: 'pubBankManage/subQueryList',
        payload: { subTableParam: { currentPage: 1, bankParentCode: record.bankNo, selectBankCode: record.bankNo, selectBankName: record.bankName } },
      });
    },
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubBankManage/toggleModal',
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
        type: 'pubBankManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    type: 'add',
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'pubBankManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'pubBankManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const subQueryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'pubBankManage/subQueryList',
        payload: { subTableParam: { ...dat, currentPage: 1, bankParentCode: selectBankCode, selectBankName: selectBankName } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'pubBankManage/toggleModal',
        payload: { type: 'subAdd' },
      });
    },
    deleteClick: () => {
      if (subTableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'pubBankManage/subDeleteList',
            payload: { ids: subSelectIds.toString() },
          });
        });
      }
    },
  };
  const subTableProps = {
    tableList: subTableList,
    tableLoading: subTableLoading,
    tableTotal: subTableTotal,
    tableCurrentPage: subTableCurrentPage,
    tableParam: subTableParam,
    tablePageChange(next) {
      dispatch({
        type: 'pubBankManage/subQueryList',
        payload: { subTableParam: { ...subTableParam, currentPage: next, bankParentCode: selectBankCode } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'pubBankManage/updateState',
        payload: { subTableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'pubBankManage/toggleModal',
        payload: { type: 'subUpdate', data: record },
      });
    },
  };
  const subAddModalProps = {
    footer: null,
    title: commonMap.add,
    visible: subAddModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubBankManage/toggleModal',
        payload: { type: 'subAdd', data: {} },
      });
    },
  };
  const subUpdateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: subUpdateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubBankManage/toggleModal',
        payload: { type: 'subUpdate', data: {} },
      });
    },
  };
  const subAddFormProps = {
    type: 'add',
    data: subAddFormData,
    submiting: subAddFormSubmit,
    formSubmit: (dat) => {
      dat.agtInProvCityArea = dat.agtInProvCityArea.join(',');
      dispatch({
        type: 'pubBankManage/subAddOne',
        payload: { ...dat },
      });
    },
  };
  const subUpdateFormProps = {
    data: subUpdateFormData,
    submiting: subUpdateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      console.log("dat",dat)
      dispatch({
        type: 'pubBankManage/subUpdateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <PubBankForm {...addFormProps} />;
  const UpdateFormGen = () => <PubBankForm {...updateFormProps} />;
  const SubAddFormGen = () => <PubBankSubForm {...subAddFormProps} />;
  const SubUpdateFormGen = () => <PubBankSubForm {...subUpdateFormProps} />;
  return (
    <div>
      <Row gutter={24}>
        <Col sm={24} md={10}>
          <Card {...cardPropsLeft}>
            <PubBankQueryForm {...queryFormProps} />
            <PubBankPageTable {...tableProps} />
          </Card>
        </Col>
        <Col sm={24} md={14}>
          <Card {...subCardPropsLeft}>
            <PubBankSubQueryForm {...subQueryFormProps} />
            <PubBankSubPageTable {...subTableProps} />
          </Card>
        </Col>
      </Row>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...subAddModalProps}>
        <SubAddFormGen />
      </Modal>
      <Modal {...subUpdateModalProps}>
        <SubUpdateFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ pubBankManage }) {
  return { pubBankManage };
}

export default connect(mapStateToProps)(PubBankManage);

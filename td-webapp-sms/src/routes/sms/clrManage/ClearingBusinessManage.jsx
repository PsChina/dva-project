import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import ClearingBusinessSearchForm from '../../../components/business/sms/clr/clrBusiness/ClearingBusinessSearchForm';
import ClearingBusinessPageTable from '../../../components/business/sms/clr/clrBusiness/ClearingBusinessPageTable';
import ClearingBusinessInfoTable from '../../../components/business/sms/clr/clrBusiness/ClearingBusinessInfoTable';

const ClearingBusinessManage = ({ dispatch, clearingBusinessManage }) => {
  const commonMap = i18n.commonMap();
  const cardProps = {
    style: { width: '100%' },
  };

  const {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    chnList,
    infoModalVisible,
    data,
  } = clearingBusinessManage;

  const queryFormProps = {
    chnList: chnList,
    formSubmit: (dat) => {
      dispatch({
        type: 'clearingBusinessManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };

  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tablePageChange: (next) => {
      dispatch({
        type: 'clearingBusinessManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },

    handleDetailClick: (record) => {
      dispatch({
        type: 'clearingBusinessManage/queryOne',
        payload: { ...record },
      });
    },
  };

//   const clearInfoTbaleModalProps = {
//     footer: null,
//     title: commonMap.detail,
//     visible: clearInfoTableModalVisible,
//     onCancel: () => {
//       dispatch({
//         type: 'clearingBusinessManage/updateState',
//         payload: { clearInfoTableModalVisible: false },
//       });
//     },
//   };

//   const orderInfoTbaleModalProps = {
//     footer: null,
//     title: commonMap.detail,
//     visible: orderInfoTableModalVisible,
//     onCancel: () => {
//       dispatch({
//         type: 'clearingBusinessManage/updateState',
//         payload: { orderInfoTableModalVisible: false },
//       });
//     },
//   };

  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'clearingBusinessManage/updateState',
        payload: { infoModalVisible: false },
      });
    },
  };

  const infoTableProps = {
    data,
  };

//   const clearInfoTbaleProps = {
//     data,
//   };

//   const orderInfoTbaleProps = {
//     data,
//   };

  return (
    <div>
      <Card {...cardProps}>
        <ClearingBusinessSearchForm {...queryFormProps} />
        <ClearingBusinessPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <ClearingBusinessInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ clearingBusinessManage }) {
  return { clearingBusinessManage };
}

export default connect(mapStateToProps)(ClearingBusinessManage);

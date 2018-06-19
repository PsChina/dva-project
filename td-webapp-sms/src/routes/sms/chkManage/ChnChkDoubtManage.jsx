import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import ChnChkDoubtQueryForm from '../../../components/business/sms/chnChkDoubt/ChnChkDoubtQueryForm';
import ChnChkDoubtPageTable from '../../../components/business/sms/chnChkDoubt/ChnChkDoubtPageTable';
import ChnChkDoubtInfoTable from '../../../components/business/sms/chnChkDoubt/ChnChkDoubtInfoTable';

const ChnChkDoubtManage = ({ dispatch, chnChkDoubtManage }) => {
  const bizMap = i18n.bizMap('sms/chnChkDoubt');
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
  } = chnChkDoubtManage;

  const queryFormProps = {
    chnList: chnList,
    formSubmit: (dat) => {
      dispatch({
        type: 'chnChkDoubtManage/queryList',
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
        type: 'chnChkDoubtManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },

    handleDetailClick: (record) => {
      dispatch({
        type: 'chnChkDoubtManage/queryOne',
        payload: { ...record },
      });
    },
  };

  const infoModalProps = {
    footer: null,
    title: bizMap.doubtInfo,
    visible: infoModalVisible,
    width: 848,
    onCancel: () => {
      dispatch({
        type: 'chnChkDoubtManage/updateState',
        payload: { infoModalVisible: false },
      });
    },
  };

  const infoTableProps = {
    data,
  };

  return (
    <div>
      <Card {...cardProps}>
        <ChnChkDoubtQueryForm {...queryFormProps} />
        <ChnChkDoubtPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <ChnChkDoubtInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ chnChkDoubtManage }) {
  return { chnChkDoubtManage };
}

export default connect(mapStateToProps)(ChnChkDoubtManage);

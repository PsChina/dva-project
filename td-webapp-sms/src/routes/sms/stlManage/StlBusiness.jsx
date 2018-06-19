import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import { callConfirm } from '../../../utils/alert';
import StlBusinessQueryForm from '../../../components/business/sms/stl/StlBusiness/StlBusinessQueryForm';
import StlBusinessPageTable from '../../../components/business/sms/stl/StlBusiness/StlBusinessPageTable';
import StlBusinessDetailForm from '../../../components/business/sms/stl/StlBusiness/StlBusinessDetailForm';
import StlBusinessAccDetailTable from '../../../components/business/sms/stl/StlBusiness/StlBusinessAccDetailTable';

const StlBusiness = ({ dispatch, stlBusiness }) => {
  const objectid = 'id';
  const bizMap = i18n.bizMap('sms/stlBusiness');
  const commonMap = i18n.commonMap();
  const cardProps = {
    style: { width: '100%' },
  };

  const { advExpand, tableList, tableSelects, tableLoading, tableTotal, tableCurrentPage, tableParam, chnList, data, detailModalVisible, stlDetailModalVisible, stlTableList, stlTableLoading, stlTableTotal, stlTableCurrentPage, stlTableParam } = stlBusiness;

  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'stlBusiness/toggleAdvExpand',
      });
    },
    chnList: chnList,
    formSubmit: (dat) => {
      dispatch({
        type: 'stlBusiness/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    exportClick: () => {
      callConfirm(commonMap.tip, commonMap.exportQueryConfirm, () => {
        dispatch({
          type: 'stlBusiness/queryList',
          payload: { tableParam: { currentPage: 1 } },
        });
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
        type: 'stlBusiness/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'stlBusiness/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick: (record) => {
      dispatch({
        type: 'stlBusiness/queryOne',
        payload: { ...record },
      });
    },
    handleStlDetailClick: (record) => {
      console.log('handleStlDetailClick.....');
      dispatch({
        type: 'stlBusiness/handleStlDetail',
        payload: { ...record },
      });
    },
  };

  //详情 modal属性
  const detailModalProps = {
    width: 848,
    footer: null,
    title: commonMap.detail,
    visible: detailModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlBusiness/toggleModal',
        payload: { type: 'detail', data: {} },
      });
    },
  };

  //详情 数据属性
  const detailFormProps = {
    data,
  }

  /**
   * 结算明细弹出框 --begin
   */
  //结算明细modal属性
  const stlDetailModalProps = {
    width: 1200,
    footer: null,
    title: bizMap.stlDetlOper,
    visible: stlDetailModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlBusiness/toggleModal',
        payload: { type: 'stlDetail', data: {} },
      });
    },
  }

  //结算明细table属性
  const stlDetailTableProps = {
    stlTableList,
    stlTableLoading,
    stlTableTotal,
    stlTableCurrentPage,
    tablePageChange: (next) => {
      dispatch({
        type: 'stlBusiness/qryStlDetail',
        payload: { stlTableParam: { ...stlTableParam, currentPage: next } },
      });
    },
  }
  /**
   * 结算明细弹出框 --end
   */
  return (
    <div>
      <Card {...cardProps}>
        <StlBusinessQueryForm {...queryFormProps} />
        <StlBusinessPageTable {...tableProps} />
      </Card>
      <Modal {...detailModalProps}>
        <StlBusinessDetailForm {...detailFormProps} />
      </Modal>
      <Modal {...stlDetailModalProps}>
        <StlBusinessAccDetailTable {...stlDetailTableProps} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ stlBusiness }) {
  return { stlBusiness };
}

export default connect(mapStateToProps)(StlBusiness);

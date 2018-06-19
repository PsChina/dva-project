import React from 'react';
import { connect } from 'dva';
import { Card, Tabs } from 'antd';
import TerminalStockAddOneForm from '../../../components/business/tms/stock/TerminalStockAddOneForm';
import TerminalStockAddBatchForm from '../../../components/business/tms/stock/TerminalStockAddBatchForm';
import * as i18n from '../../../utils/i18n';

const TabPane = Tabs.TabPane;
const TerminalStockAdd = ({ dispatch, terminalStockAdd }) => {
  const bizMap = i18n.bizMap('tms/terminalStock');
  const {
    submiting, companyOptionsData, filePath, modelOptionsData,
  } = terminalStockAdd;
  const cardProps = {
    title: bizMap.terminalStockAdd,
    style: { width: '100%' },
  };
  const oneTableProps = {
    modelOptions: modelOptionsData,
    companyOptions: companyOptionsData,
    submiting,
    formSubmit(dat) {
      dispatch({
        type: 'terminalStockAdd/addOne',
        payload: { formData: dat },
      });
    },
    queryModelOptionData(copId) {
      dispatch({
        type: 'terminalStockAdd/queryModelOptionData',
        payload: { copId: copId },
      });
    },
  };
  const batchTableProps = {
    modelOptions: modelOptionsData,
    companyOptions: companyOptionsData,
    filePath: filePath,
    submiting,
    formSubmit(dat) {
      dispatch({
        type: 'terminalStockAdd/addBatch',
        payload: { formData: dat },
      });
    },
    queryModelOptionData(copId) {
      dispatch({
        type: 'terminalStockAdd/queryModelOptionData',
        payload: { copId: copId },
      });
    },
    changeFileData(filePath) {
      dispatch({
        type: 'terminalStockAdd/changeFileData',
        payload: { data: filePath },
      });
    },
  };
  return (
    <Card {...cardProps}>
      <Tabs defaultActiveKey="1" >
        <TabPane tab={bizMap.stockAddOne} key="1"><TerminalStockAddOneForm {...oneTableProps} /></TabPane>
        <TabPane tab={bizMap.stockAddBatch} key="2"><TerminalStockAddBatchForm {...batchTableProps} /></TabPane>
      </Tabs>
    </Card>
  );
};

function mapStateToProps({ terminalStockAdd }) {
  return { terminalStockAdd };
}

export default connect(mapStateToProps)(TerminalStockAdd);

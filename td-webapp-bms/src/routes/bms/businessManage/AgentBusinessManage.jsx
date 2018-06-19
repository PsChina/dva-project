import React from 'react';
import { connect } from 'dva';
import { Card, Tabs, Modal, Spin } from 'antd';
import { callConfirm } from '../../../utils/alert';
import BusinessSlidePanel from '../../../components/business/bms/business/BusinessSlidePanel';
import BusinessList from '../../../components/business/bms/business/BusinessList';
import ShareForm from '../../../components/business/bms/share/ShareForm';
import ShareTable from '../../../components/business/bms/share/ShareTable';
import AgentQueryForm from '../../../components/business/bms/agent/AgentQueryForm';
import AgentPageTable from '../../../components/business/bms/agent/AgentPageTable';
import AgentInfoTable from '../../../components/business/bms/agent/AgentInfoTable';
import * as i18n from '../../../utils/i18n';

const commonMap = i18n.commonMap();
const bizMap = i18n.bizMap('bms/agent');
const busMap = i18n.bizMap('bms/business');
const TabPane = Tabs.TabPane;
const AgentBusinessManage = ({ dispatch, agentBusinessManage }) => {
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, allOffLineBiz, allOnLineBiz,
    slideVisible, slideLoading, slideTitle, slideAgtId,
    offLineModalVisible, offLineUpdModalVisible, offLineInfoModalVisible,
    curBiz, curCcy, curBizData, curBizLoading, curAgt, bizSubmit,
  } = agentBusinessManage;

  const cardProps = { title: bizMap.merchantBusinessManage, style: { width: '100%' } };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({ type: 'agentBusinessManage/queryList', payload: { tableParam: { ...dat, currentPage: 1 } } });
    },
  };
  const tableProps = {
    tableList, tableLoading, tableTotal, tableCurrentPage,
    tablePageChange(next) {
      dispatch({ type: 'agentBusinessManage/queryList', payload: { tableParam: { ...tableParam, currentPage: next } } });
    },
    tableRowSelect(selectedRows) {
      dispatch({ type: 'agentBusinessManage/updateState', payload: { tableSelects: selectedRows } });
    },
    handleConfigClick(record) {
      if (slideAgtId === record.agtId) {
        dispatch({ type: 'agentBusinessManage/closeSlide' });
      } else {
        dispatch({ type: 'agentBusinessManage/queryBusiness', payload: record });
      }
    },
  };
  const slidePanelProps = {
    title: slideTitle, visible: slideVisible,
    onCloseClick() { dispatch({ type: 'agentBusinessManage/closeSlide' }); },
  };

  /** about common biz functions */
  const openModal = (biz, type, agtId, modal) => {
    dispatch({ type: 'agentBusinessManage/queryBusinessData', payload: { biz, type, ccy: curCcy, id: agtId, modal } });
  }
  const closeUpdModal = (type) => {
    dispatch({ type: 'agentBusinessManage/closeUpdateModal', payload: { type } });
  }
  const cancelBizModal = (type, biz) => {
    dispatch({ type: 'agentBusinessManage/cancelBiz', payload: { type, biz } });
  }
  const submitBiz = (type, biz, dat, upd) => {
    dispatch({ type: 'agentBusinessManage/submitBusiness', payload: { id: slideAgtId, curBiz: biz, req: upd ? 'update' : 'add', type, data: dat } });
  }
  const closeFormModal = (biz, upd) => {
    // ignore this err tip
    upd ? closeUpdModal('offLine') : cancelBizModal('offLine', biz);
  }

  /** ====== about offLine biz ====== */
  const offLineBizProps = {
    switch: true, list: allOffLineBiz,
    onChange(item, checked) {
      if (checked) {
        dispatch({ type: 'agentBusinessManage/turnOnBiz', payload: { curBiz: item.biz, ccy: curCcy, type: 'offLine' } });
      } else {
        callConfirm(commonMap.tip, busMap.offConfirm, () => {
          dispatch({ type: 'agentBusinessManage/offBusiness', payload: { curBiz: item.biz, id: slideAgtId, type: 'offLine' } });
        });
      }
    },
    detailClick(item) {
      openModal(item.biz, 'offLine', slideAgtId, 'info');
    },
    updateClick(item) {
      openModal(item.biz, 'offLine', slideAgtId, 'upd');
    },
  }
  const offLineModalProps = {
    width: 640,
    footer: null,
    visible: offLineModalVisible,
    maskClosable: false,
    closable: false,
  };
  const offLineUpdModalProps = {
    width: 640,
    footer: null,
    visible: offLineUpdModalVisible,
    maskClosable: false,
    closable: false,
  };
  const offLineInfoModalProps = {
    width: 640,
    footer: null,
    maskClosable: false,
    visible: offLineInfoModalVisible,
    onCancel() {
      dispatch({ type: 'agentBusinessManage/updateState', payload: { offLineInfoModalVisible: false, curBizData: {} } });
    },
  };

  /** ====== about onLine biz ====== */
  const onLineBizProps = {
    // ...
  };

  /** ====== about share biz ====== */
  const addShareFormProps = {
    biz: curBiz,
    loading: curBizLoading,
    submiting: bizSubmit,
    data: curBizData,
    formCancel() { closeFormModal(curBiz, false) },
    formSubmit(dat) { submitBiz('offLine', curBiz, dat, false) },
  };
  const updShareFormProps = {
    biz: curBiz,
    loading: curBizLoading,
    submiting: bizSubmit,
    data: curBizData,
    formCancel() { closeFormModal(curBiz, true) },
    formSubmit(dat) { submitBiz('offLine', curBiz, dat, true) },
  };
  const shareTableProps = {
    loading: curBizLoading,
    data: curBizData,
    biz: curBiz,
  }

  return (
    <div>
      <Card {...cardProps}>
        <AgentQueryForm {...queryFormProps} />
        <AgentPageTable {...tableProps} />
      </Card>
      <BusinessSlidePanel {...slidePanelProps}>
        <Spin spinning={slideLoading}>
          <AgentInfoTable data={curAgt} />
          <h4>&nbsp;</h4>
          <Tabs defaultActiveKey="1">
            <TabPane tab={busMap.offlinePay} key="1">
              { allOffLineBiz.lenght === 0 ? null : <BusinessList {...offLineBizProps} /> }
            </TabPane>
            <TabPane tab={busMap.onlinePay} key="2">
              { allOnLineBiz.lenght === 0 ? null : <BusinessList {...onLineBizProps} /> }
            </TabPane>
          </Tabs>
        </Spin>
      </BusinessSlidePanel>
      <Modal {...offLineModalProps}>
        <ShareForm {...addShareFormProps} />
      </Modal>
      <Modal {...offLineUpdModalProps}>
        <ShareForm {...updShareFormProps} />
      </Modal>
      <Modal {...offLineInfoModalProps}>
        <ShareTable {...shareTableProps} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ agentBusinessManage }) {
  return { agentBusinessManage };
}

export default connect(mapStateToProps)(AgentBusinessManage);

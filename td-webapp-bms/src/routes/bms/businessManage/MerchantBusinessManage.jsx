import React from 'react';
import { connect } from 'dva';
import { Card, Tabs, Modal, Spin } from 'antd';
import { callConfirm } from '../../../utils/alert';
import BusinessSlidePanel from '../../../components/business/bms/business/BusinessSlidePanel';
import BusinessList from '../../../components/business/bms/business/BusinessList';
import BusinessFormUnionCard from '../../../components/business/bms/business/BusinessFormUnionCard';
import BusinessTableUnionCard from '../../../components/business/bms/business/BusinessTableUnionCard';
import BusinessFormAlipay from '../../../components/business/bms/business/BusinessFormAlipay';
import BusinessTableAlipay from '../../../components/business/bms/business/BusinessTableAlipay';
import BusinessFormWechatPay from '../../../components/business/bms/business/BusinessFormWechatPay';
import BusinessTableWechatPay from '../../../components/business/bms/business/BusinessTableWechatPay';
import BusinessFormGamapay from '../../../components/business/bms/business/BusinessFormGamapay';
import BusinessTableGamapay from '../../../components/business/bms/business/BusinessTableGamapay';
import BusinessFormLinepay from '../../../components/business/bms/business/BusinessFormLinepay';
import BusinessTableLinepay from '../../../components/business/bms/business/BusinessTableLinepay';
import BusinessFormRealTimeStl from '../../../components/business/bms/business/BusinessFormRealTimeStl';
import BusinessTableRealTimeStl from '../../../components/business/bms/business/BusinessTableRealTimeStl';
import MerchantQueryForm from '../../../components/business/bms/merchant/MerchantQueryForm';
import MerchantPageTable from '../../../components/business/bms/merchant/MerchantPageTable';
import MerchantInfoTable from '../../../components/business/bms/merchant/MerchantInfoTable';
import * as i18n from '../../../utils/i18n';

const TabPane = Tabs.TabPane;
const MerchantBusinessManage = ({ dispatch, merchantBusinessManage }) => {
  const commonMap = i18n.commonMap();
  const bizMap = i18n.bizMap('bms/merchant');
  const busMap = i18n.bizMap('bms/business');
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
    allOffLineBiz, allOnLineBiz, allRealTimeStlBiz,
    slideVisible, slideLoading, slideTitle, slideMerId,
    offLineModalVisible, offLineUpdModalVisible, offLineInfoModalVisible,
    realTimeStlModalVisible, realTimeStlUpdModalVisible, realTimeStlInfoModalVisible,
    curBiz, curCcy, curBizData, curBizLoading, curMer, bizSubmit,
  } = merchantBusinessManage;

  const cardProps = { title: bizMap.merchantBusinessManage, style: { width: '100%' } };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({ type: 'merchantBusinessManage/queryList', payload: { tableParam: { ...dat, currentPage: 1 } } });
    },
  };
  const tableProps = {
    tableList, tableLoading, tableTotal, tableCurrentPage,
    tablePageChange(next) {
      dispatch({ type: 'merchantBusinessManage/queryList', payload: { tableParam: { ...tableParam, currentPage: next } } });
    },
    tableRowSelect(selectedRows) {
      dispatch({ type: 'merchantBusinessManage/updateState', payload: { tableSelects: selectedRows } });
    },
    handleConfigClick(record) {
      if (slideMerId === record.merId) {
        dispatch({ type: 'merchantBusinessManage/closeSlide' });
      } else {
        dispatch({ type: 'merchantBusinessManage/queryBusiness', payload: record });
      }
    },
  };
  const slidePanelProps = {
    title: slideTitle, visible: slideVisible,
    onCloseClick() { dispatch({ type: 'merchantBusinessManage/closeSlide' }); },
  };

  /** about common biz functions */
  const openModal = (biz, type, merId, modal) => {
    dispatch({ type: 'merchantBusinessManage/queryBusinessData', payload: { biz, type, ccy: curCcy, id: merId, modal } });
  }
  const closeUpdModal = (type) => {
    dispatch({ type: 'merchantBusinessManage/closeUpdateModal', payload: { type } });
  }
  const cancelBizModal = (type, biz) => {
    dispatch({ type: 'merchantBusinessManage/cancelBiz', payload: { type, biz } });
  }
  const submitBiz = (type, biz, dat, upd) => {
    const data = dat;
    data.areaCode = curMer.merArea || '';
    dispatch({ type: 'merchantBusinessManage/submitBusiness', payload: { id: slideMerId, curBiz: biz, req: upd ? 'update' : 'add', type, data } });
  }
  const closeFormModal = (type, biz, upd) => {
    return upd ? closeUpdModal(type) : cancelBizModal(type, biz);  // ignore this err tip
  }

  /** ====== about offLine biz ====== */
  const offLineBizProps = {
    switch: true, list: allOffLineBiz,
    onChange(item, checked) {  // 找到change
      if (checked) {
        dispatch({ type: 'merchantBusinessManage/turnOnBiz', payload: { curBiz: item.biz, ccy: curCcy, type: 'offLine' } });
      } else {
        callConfirm(commonMap.tip, busMap.offConfirm, () => {
          dispatch({ type: 'merchantBusinessManage/offBusiness', payload: { curBiz: item.biz, id: slideMerId, type: 'offLine' } });
        });
      }
    },
    detailClick(item) {
      openModal(item.biz, 'offLine', slideMerId, 'info');
    },
    updateClick(item) {
      openModal(item.biz, 'offLine', slideMerId, 'upd');
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
      dispatch({ type: 'merchantBusinessManage/updateState', payload: { offLineInfoModalVisible: false, curBizData: {} } });
    },
  };
  const setOffLineBizForm = (biz, upd) => {
    let vmod = null;
    const baseProps = {
      loading: curBizLoading, submiting: bizSubmit, data: curBizData,
      formCancel() { closeFormModal('offLine', biz, upd) },
      formSubmit(dat) { submitBiz('offLine', biz, dat, upd); },
    };
    switch (biz) {
      case 'unionCard': {
        vmod = <BusinessFormUnionCard {...baseProps} />; break;
      }
      /*case 'alipay': {
        vmod = <BusinessFormAlipay {...baseProps} />; break;
      }
      case 'wechat': {
        vmod = <BusinessFormWechatPay {...baseProps} />; break;
      }*/
      case 'gamapay' : {
        vmod = <BusinessFormGamapay {...baseProps} />; break;
      }
      case 'linepay' : {
        vmod = <BusinessFormLinepay {...baseProps} />; break;
      }
      default:
        break;
    }
    return vmod;
  }
  const setOffLineBizTable = (biz) => {
    let vmod = null;
    const baseProps = { loading: curBizLoading, data: curBizData };
    switch (biz) {
      case 'unionCard': {
        vmod = <BusinessTableUnionCard {...baseProps} />; break;
      }
      /*case 'alipay': {
        vmod = <BusinessTableAlipay {...baseProps} />; break;
      }
      case 'wechat': {
        vmod = <BusinessTableWechatPay {...baseProps} />; break;
      }*/
      case 'gamapay': {
        vmod = <BusinessTableGamapay {...baseProps} />; break;
      }
      case 'linepay': {
        vmod = <BusinessTableLinepay {...baseProps} />; break;
      }
      default:
        break;
    }
    return vmod;
  }

  /** ====== about onLine biz ====== */
  const onLineBizProps = {
    // ...
  };

  /** ====== about realTimeStl biz ====== */
  const realTimeStlBizProps = {
    switch: true, list: allRealTimeStlBiz,
    onChange(item, checked) {
      if (checked) {
        dispatch({ type: 'merchantBusinessManage/turnOnBiz', payload: { curBiz: item.biz, type: 'realTimeStl' } });
      } else {
        callConfirm(commonMap.tip, busMap.offConfirm, () => {
          dispatch({ type: 'merchantBusinessManage/offBusiness', payload: { curBiz: item.biz, id: slideMerId, type: 'realTimeStl' } });
        });
      }
    },
    detailClick(item) {
      openModal(item.biz, 'realTimeStl', slideMerId, 'info');
    },
    updateClick(item) {
      openModal(item.biz, 'realTimeStl', slideMerId, 'upd');
    },
  }
  const realTimeStlModalProps = {
    width: 640,
    footer: null,
    visible: realTimeStlModalVisible,
    maskClosable: false,
    closable: false,
  };
  const realTimeStlUpdModalProps = {
    width: 640,
    footer: null,
    visible: realTimeStlUpdModalVisible,
    maskClosable: false,
    closable: false,
  };
  const realTimeStlInfoModalProps = {
    width: 640,
    footer: null,
    maskClosable: false,
    visible: realTimeStlInfoModalVisible,
    onCancel() {
      dispatch({ type: 'merchantBusinessManage/updateState', payload: { realTimeStlInfoModalVisible: false, curBizData: {} } });
    },
  };
  const realTimeStlProps = {
    biz: curBiz, loading: curBizLoading, submiting: bizSubmit, data: curBizData,
    formCancel() { closeFormModal('realTimeStl', curBiz, false) },
    formSubmit(dat) { submitBiz('realTimeStl', curBiz, dat, false); },
  };
  const realTimeStlUpdProps = {
    biz: curBiz, loading: curBizLoading, submiting: bizSubmit, data: curBizData,
    formCancel() { closeFormModal('realTimeStl', curBiz, true) },
    formSubmit(dat) { submitBiz('realTimeStl', curBiz, dat, true); },
  };
  const realTimeStlTblProps = { biz: curBiz, loading: curBizLoading, data: curBizData };
  const BusinessFormRealTimeStlAddGen = () => { return <BusinessFormRealTimeStl {...realTimeStlProps} /> }
  const BusinessFormRealTimeStlUpdGen = () => { return <BusinessFormRealTimeStl {...realTimeStlUpdProps} /> }
  return (
    <div>
      <Card {...cardProps}>
        <MerchantQueryForm {...queryFormProps} />
        <MerchantPageTable {...tableProps} />
      </Card>

      <BusinessSlidePanel {...slidePanelProps}>
        <Spin spinning={slideLoading}>
          <MerchantInfoTable data={curMer} />
          <h4>&nbsp;</h4>
          <Tabs defaultActiveKey="1">
            <TabPane tab={busMap.offlinePay} key="1">
              { allOffLineBiz.lenght === 0 ? null : <BusinessList {...offLineBizProps} /> }
            </TabPane>
            <TabPane tab={busMap.onlinePay} key="2">
              { allOnLineBiz.lenght === 0 ? null : <BusinessList {...onLineBizProps} /> }
            </TabPane>
            <TabPane tab={busMap.realTimeSettlement} key="3">
              { allRealTimeStlBiz.lenght === 0 ? null : <BusinessList {...realTimeStlBizProps} /> }
            </TabPane>
          </Tabs>
        </Spin>
      </BusinessSlidePanel>

      <Modal {...offLineModalProps}>
        { setOffLineBizForm(curBiz) }
      </Modal>
      <Modal {...offLineUpdModalProps}>
        { setOffLineBizForm(curBiz, true) }
      </Modal>
      <Modal {...offLineInfoModalProps}>
        { setOffLineBizTable(curBiz) }
      </Modal>

      <Modal {...realTimeStlModalProps}>
        <BusinessFormRealTimeStlAddGen />
      </Modal>
      <Modal {...realTimeStlUpdModalProps}>
        <BusinessFormRealTimeStlUpdGen />
      </Modal>
      <Modal {...realTimeStlInfoModalProps}>
        <BusinessTableRealTimeStl {...realTimeStlTblProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ merchantBusinessManage }) {
  return { merchantBusinessManage };
}

export default connect(mapStateToProps)(MerchantBusinessManage);

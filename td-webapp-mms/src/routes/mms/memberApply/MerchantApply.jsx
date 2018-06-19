import React from 'react';
import { connect } from 'dva';
import { Card, Steps, Button, Row } from 'antd';
import MerchantStepForm1 from '../../../components/business/mms/merchant/stepForm/MerchantStepForm1';
import MerchantStepForm2 from '../../../components/business/mms/merchant/stepForm/MerchantStepForm2';
import MerchantStepForm3 from '../../../components/business/mms/merchant/stepForm/MerchantStepForm3';
import { callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MerchantApply = ({ dispatch, merchantApply }) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const commonMap = i18n.commonMap();
  const Step = Steps.Step;
  const { currentStep, submiting, form1Data, form2Data, form3Data, agentData,
     subBankList, agentModalVisible, subBankModalVisible, bankList, bizSaleList, idIsBlack,
     bankcardIsBlack, industryList } = merchantApply;

  const cardProps = {
    title: bizMap.merchantApply,
    style: { width: '100%' },
  };

  const stepForm1Props = {
    bizSaleList,
    industryList,
    agentData,
    agentModalVisible,
    style: { width: 848, margin: 'auto', marginTop: 24 },
    data: form1Data,
    nextClick(dat) {
      dispatch({
        type: 'merchantApply/updateState',
        payload: { currentStep: 1, form1Data: dat },
      });
    },
    queryAgentList(tableParam) {
      dispatch({
        type: 'merchantApply/queryAgentList',
        payload: { tableParam },
      });
    },
    onCancelAgentModel() {
      dispatch({
        type: 'merchantApply/updateState',
        payload: { agentModalVisible: false },
      });
    },
  };

  const stepForm2Props = {
    subBankModalVisible,
    subBankList,
    bankList,
    style: { width: 848, margin: 'auto', marginTop: 24 },
    submiting,
    data: form2Data,
    prevClick() {
      dispatch({
        type: 'merchantApply/updateState',
        payload: { currentStep: 0 },
      });
    },
    nextClick(dat) {
      dispatch({
        type: 'merchantApply/updateState',
        payload: { currentStep: 2, form2Data: dat },
      });
      dispatch({
        type: 'merchantApply/checkBlackList',
        payload: { },
      });
    },
    querySubBanklist(tableParam) {
      dispatch({
        type: 'merchantApply/querySubBanklist',
        payload: { tableParam },
      });
    },
    onCancelSubBankModel() {
      dispatch({
        type: 'merchantApply/updateState',
        payload: { subBankModalVisible: false },
      });
    },
  };
  // 提交申请后返回申请首页
  const backToIndx = () => {
    dispatch({
      type: 'merchantApply/updateState',
      payload: { currentStep: 0, form1Data: {}, form2Data: {}, form3Data: {} },
    });
  };
  const applyComponents = [
    <Row key="button">
      <Button onClick={backToIndx} id="backToMerIndx" style={{ display: 'none' }}>{}</Button>
    </Row>,
  ];
  const stepForm3Props = {
    applyComponents,
    style: { width: 848, margin: 'auto', marginTop: 24 },
    submiting,
    idIsBlack,
    bankcardIsBlack,
    data: form3Data,
    prevClick() {
      dispatch({
        type: 'merchantApply/updateState',
        payload: { currentStep: 1 },
      });
    },
    nextClick(dat) {//先查询黑名单，之后按点击确认调用addOne
      // dispatch({
      //   type: 'merchantApply/checkBlackList',
      //   payload: { form3Data: dat },
      // });
      console.log('idIsBlack为:', idIsBlack);
      console.log('bankcardBlackList为:', bankcardIsBlack);
      if (idIsBlack) {
        if (bankcardIsBlack) {
          callConfirm(commonMap.blackListTip, commonMap.bankCardAndidCardInBlackList.replace(/{}/, form1Data.apId).replace(/&/, form2Data.stlAcc), () => {
            dispatch({
              type: 'merchantApply/addOne',
              payload: { form3Data: dat },
            });
          });
        } else {
          callConfirm(commonMap.blackListTip, commonMap.idCardBlackListConfirm.replace(/{}/, form1Data.apId)
            , () => {
              dispatch({
                type: 'merchantApply/addOne',
                payload: { form3Data: dat },
              });
            }
          );
        }
      } else if (bankcardIsBlack) {
        callConfirm(commonMap.blackListTip, commonMap.bankCardBlackListConfirm.replace(/{}/, form2Data.stlAcc), () => {
          dispatch({
            type: 'merchantApply/addOne',
            payload: { form3Data: dat },
          });
        }
        );
      } else {
        dispatch({
          type: 'merchantApply/addOne',
          payload: { form3Data: dat },
        });
      }
    },
  };

  const steps = [bizMap.merBaseInfo, bizMap.merBankInfo, bizMap.merAttachInfo];
  let content = null;
  switch (currentStep) {
    case 0:
      content = (<MerchantStepForm1 {...stepForm1Props} />);
      break;
    case 1:
      content = (<MerchantStepForm2 {...stepForm2Props} />);
      break;
    case 2:
      content = (<MerchantStepForm3 {...stepForm3Props} />);
      break;
    default:
      content = null;
      break;
  }
  return (
    <Card {...cardProps}>
      <Steps current={currentStep}>
        {steps.map((item, i) => <Step key={i} title={item} />)}
      </Steps>
      { content }
    </Card>
  );
};

function mapStateToProps({ merchantApply }) {
  return { merchantApply };
}

export default connect(mapStateToProps)(MerchantApply);

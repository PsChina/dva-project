import React, { PropTypes } from 'react';
import { Transfer, Form, Button, Row, Col, Input } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const ChannelTransferBankInfoFrom = (props) => {
  const bizMap = i18n.bizMap('pms/channelTransfer');
  const commonMap = i18n.commonMap();
  const { data, form, submiting, formSubmit, changeData, handleCancel } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.bankNos = dat.bankNos.join();
        formSubmit(dat);
      }
    });
  };
  // const handleCancel = () => {
  //   resetFields();
  // }
  const handleChange = (targetKeys) => {
    data.usrCurrRoleIdList = targetKeys;
    changeData(data);
  }

  const options = [];
  data.allBankList.forEach((v) => {
    options.push({
      key: v.bankNo,
      title: v.bankName,
    });
  });

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden>
        {
          getFieldDecorator('bankNos', {
            initialValue: data.usrCurrRoleIdList,
          })(
            <Input />,
          )
        }
        {
          getFieldDecorator('chnId', {
            initialValue: data.chnId,
          })(
            <Input />,
          )
        }
      </div>
      <Transfer
        dataSource={options}
        showSearch
        listStyle={{ width: 200, height: 300, marginLeft: 20 }}
        titles={[bizMap.noSelectedBank, bizMap.selectedBank]}
        operations={[bizMap.addBank, bizMap.deleteBank]}
        targetKeys={data.usrCurrRoleIdList}
        onChange={handleChange}
        render={item => `${item.title}`}
      />
      <h4>&nbsp;</h4>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleCancel}>{commonMap.cancel}</Button>
        </Col>
      </Row>
    </Form>
  );
}

ChannelTransferBankInfoFrom.propTypes = {
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  changeData: PropTypes.func,
};

ChannelTransferBankInfoFrom.defaultProps = {
  data: {},
  submiting: false,
  formSubmit: noop,
  changeData: noop,
}

export default Form.create()(ChannelTransferBankInfoFrom);

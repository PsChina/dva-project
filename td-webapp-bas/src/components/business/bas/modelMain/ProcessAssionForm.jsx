import React, { PropTypes } from 'react';
import { Transfer, Form, Button, Row, Col, Input } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const ProcessAssionForm = (props) => {
  const bizMap = i18n.bizMap('bas/modelMain');
  const commonMap = i18n.commonMap();
  const { data, form, submiting, formSubmit, changeData } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.nodenos = dat.nodenos.join();
        formSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  const handleChange = (targetKeys) => {
    data.selectedProcessCfgList = targetKeys;
    changeData(data);
  }
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden>
        {
          getFieldDecorator('nodenos', {
            initialValue: data.selectedProcessCfgList,
          })(
            <Input />,
          )
        }
      </div>
      <Transfer
        dataSource={data.processCfgList}
        showSearch
        listStyle={{ width: 200, height: 300, marginLeft: 20 }}
        titles={[bizMap.noSelectedProcess, bizMap.selectedProcess]}
        operations={[bizMap.addProcess, bizMap.deleteProcess]}
        targetKeys={data.selectedProcessCfgList}
        onChange={handleChange}
        render={item => `${item.nodename}`}
      />
      <h4>&nbsp;</h4>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

ProcessAssionForm.propTypes = {
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  changeData: PropTypes.func,
};

ProcessAssionForm.defaultProps = {
  data: {},
  submiting: false,
  formSubmit: noop,
  changeData: noop,
}

export default Form.create()(ProcessAssionForm);

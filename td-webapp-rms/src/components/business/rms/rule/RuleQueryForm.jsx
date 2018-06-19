import React, { PropTypes } from 'react';
import { Form, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const ButtonGroup = Button.Group;
const RuleQueryForm = (props) => {
  const commonMap = i18n.commonMap();
  const { form, formSubmit, enableClick, disableClick } = props;
  const { getFieldsValue, validateFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        formSubmit(getFieldsValue());
      }
    });
  };
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="check" type="primary" onClick={enableClick}>{commonMap.enable}</Button>
            <Button icon="minus" onClick={disableClick}>{commonMap.disable}</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Form>
  );
}

RuleQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

RuleQueryForm.defaultProps = {
  enableClick: noop,
  disableClick: noop,
  formSubmit: noop,
}

export default Form.create()(RuleQueryForm);

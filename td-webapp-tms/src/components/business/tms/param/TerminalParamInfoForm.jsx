import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, Switch, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const TerminalParamInfoForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalParam');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, parmodOptions } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.sgnSts) {
          dat.sgnSts = '1';
        } else {
          dat.sgnSts = '0';
        }
        if (dat.isTmkeyDown) {
          dat.isTmkeyDown = '1';
        } else {
          dat.isTmkeyDown = '0';
        }
        if (dat.isDownloadKey) {
          dat.isDownloadKey = '1';
        } else {
          dat.isDownloadKey = '0';
        }
        if (dat.isUpdBatNo) {
          dat.isUpdBatNo = '1';
        } else {
          dat.isUpdBatNo = '0';
        }
        if (dat.icDowFlg) {
          dat.icDowFlg = '1';
        } else {
          dat.icDowFlg = '0';
        }
        if (dat.aicDowFlg) {
          dat.aicDowFlg = '1';
        } else {
          dat.aicDowFlg = '0';
        }
        if (dat.emvDowFlg) {
          dat.emvDowFlg = '1';
        } else {
          dat.emvDowFlg = '0';
        }
        if (dat.chkTelSts) {
          dat.chkTelSts = '1';
        } else {
          dat.chkTelSts = '0';
        }

        if (dat.uploadCellId) {
          dat.uploadCellId = '1';
        } else {
          dat.uploadCellId = '0';
        }
        if (dat.dowFlg) {
          dat.dowFlg = '1';
        } else {
          dat.dowFlg = '0';
        }
        if (dat.isKeybord) {
          dat.isKeybord = '1';
        } else {
          dat.isKeybord = '0';
        }
        console.log('dat==',dat);
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.terId} {...formItemLayout} >
              {
                getFieldDecorator('terId', {
                  initialValue: data.terId,
                })(
                  <Input placeholder={bizMap.terId} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.terPhyno} {...formItemLayout} >
              {
                getFieldDecorator('terPhyno', {
                  initialValue: data.terPhyno,
                })(
                  <Input placeholder={bizMap.terPhyno} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.posMngPwd} {...formItemLayout} >
              {
                getFieldDecorator('posMngPwd', {
                  initialValue: data.posMngPwd,
                })(
                  <Input placeholder={bizMap.posMngPwd} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.batNo} {...formItemLayout} >
              {
                getFieldDecorator('batNo', {
                  initialValue: data.batNo,
                })(
                  <Input placeholder={bizMap.batNo} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.sgnSts} {...formItemLayout} >
              {
                getFieldDecorator('sgnSts', {
                  initialValue: data.sgnSts,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.sgnSts === '1')} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.isTmkeyDown} {...formItemLayout} >
              {
                getFieldDecorator('isTmkeyDown', {
                  initialValue: data.isTmkeyDown,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.isTmkeyDown === '1')} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.isDownloadKey} {...formItemLayout} >
              {
                getFieldDecorator('isDownloadKey', {
                  initialValue: data.isDownloadKey,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.isDownloadKey === '1')} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.isUpdBatNo} {...formItemLayout} >
              {
                getFieldDecorator('isUpdBatNo', {
                  initialValue: data.isUpdBatNo,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.isUpdBatNo === '1')} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.icDowFlg} {...formItemLayout} >
              {
                getFieldDecorator('icDowFlg', {
                  initialValue: data.icDowFlg,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.icDowFlg === '1')} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.aicDowFlg} {...formItemLayout} >
              {
                getFieldDecorator('aicDowFlg', {
                  initialValue: data.aicDowFlg,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.aicDowFlg === '1')} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.emvDowFlg} {...formItemLayout} >
              {
                getFieldDecorator('emvDowFlg', {
                  initialValue: data.emvDowFlg,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.emvDowFlg === '1')} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.emvParMod} {...formItemLayout} >
              {
                getFieldDecorator('emvParMod', {
                  initialValue: data.emvParMod,
                })(
                  <Input placeholder={bizMap.emvParMod} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chkTelSts} {...formItemLayout} >
              {
                getFieldDecorator('chkTelSts', {
                  initialValue: data.chkTelSts,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.chkTelSts === '1')} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.uploadCellId} {...formItemLayout} >
              {
                getFieldDecorator('uploadCellId', {
                  initialValue: data.uploadCellId,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.uploadCellId === '1')} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.dowFlg} {...formItemLayout} >
              {
                getFieldDecorator('dowFlg', {
                  initialValue: data.dowFlg,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.dowFlg === '1')} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.isKeybord} {...formItemLayout} >
              {
                getFieldDecorator('isKeybord', {
                  initialValue: data.isKeybord,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.isKeybord === '1')} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.parMod} {...formItemLayout} >
              {
                getFieldDecorator('parMod', {
                  initialValue: data.parMod,
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    {
                      parmodOptions.map((parmodOption, idx) => {
                        return <Option key={idx} value={parmodOption.parMod}>{parmodOption.parMod}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            {
              getFieldsValue().isKeybord ?
                <FormItem label={bizMap.terKeypad} {...formItemLayout} >
                  {
                    getFieldDecorator('terKeypad', {
                      initialValue: data.terKeypad,
                    })(
                      <Input placeholder={bizMap.terKeypad} />,
                    )
                  }
                </FormItem>
                :
                null
            }
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.paraTemplate} {...formItemLayout} >
              {
                getFieldDecorator('paraTemplate', {
                  initialValue: data.paraTemplate,
                })(
                  <Input placeholder={bizMap.paraTemplate} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.rarecd} {...formItemLayout} >
              {
                getFieldDecorator('rarecd', {
                  initialValue: data.rarecd,
                })(
                  <Input placeholder={bizMap.rarecd} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.keyIdx} {...formItemLayout} >
              {
                getFieldDecorator('keyIdx', {
                  initialValue: data.keyIdx,
                })(
                  <Input placeholder={bizMap.keyIdx} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          getFieldsValue().chkTelSts ?
            <Row>
              <Col span={12}>
                <FormItem label={bizMap.tel1} {...formItemLayout} >
                  {
                    getFieldDecorator('tel1', {
                      initialValue: data.tel1,
                    })(
                      <Input placeholder={bizMap.tel1} />,
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={bizMap.tel2} {...formItemLayout} >
                  {
                    getFieldDecorator('tel2', {
                      initialValue: data.tel2,
                    })(
                      <Input placeholder={bizMap.tel2} />,
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={bizMap.tel3} {...formItemLayout} >
                  {
                    getFieldDecorator('tel3', {
                      initialValue: data.tel3,
                    })(
                      <Input placeholder={bizMap.tel3} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

TerminalParamInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  parmodOptions: PropTypes.array,
};

TerminalParamInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  parmodOptions: [],
}

export default Form.create()(TerminalParamInfoForm);

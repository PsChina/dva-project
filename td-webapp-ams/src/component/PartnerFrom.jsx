import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form, Input, Row, Col } from 'antd';
import { bizMap } from '../utils/i18n';
import { formatMoney, YuanRemoveComma } from '../utils/currency';
import * as services from '../services/component/AddOrderModal';
const Option = Select.Option;
const FormItem = Form.Item;
const bMap = bizMap('component/PartnerFrom')
/*
<Input 
    style={ { width:'260px' } } 
    placeholder={ bMap['plsInputCustomerName'] } 
    onChange={(event)=>{
    window.infoBus.$emit('customerName',event.target.value);
    }}
/>

*/
class PartnerFrom extends React.Component {
    constructor( props ){
        super(props);
        this.state = {
            balance: 0,
            partnerList: [],
        }
        if(!window.shouldRelogin){
            services.getPartnerList()
            .then((result)=>{
                if( 'data' in result && 'rspCod' in result.data ){
                    const code = result.data.rspCod;
                    switch(code){
                        case "_SSO_ERR": window.infoBus.$emit('relogin'); break;
                        case "200": {
                            const partnerList = result.data.rspList ? result.data.rspList : [];
                            this.setState({
                                partnerList
                            })
                            break;
                        };
                        default:break;
                    }
                } 
            })
        }

    }
    render(){
        const formItemLayout = {
                labelCol: { span: 8 },
                wrapperCol: { span: 14 },
            };
        return (
            <Form>
                <Row>
                    <Col>
                        <FormItem {...formItemLayout} label = { bMap['customerName'] } >
                            <Select
                                style={{
                                    width:'260px'
                                }}
                                onChange={
                                    (value)=>{
                                        window.infoBus.$emit('agtId',value);
                                    }
                                }
                            >
                                { this.state.partnerList.map((item)=>
                                    <Option 
                                        key={item.agtId}
                                        value={item.agtId}
                                    >
                                        {item.agtName}
                                    </Option>
                                    )
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem {...formItemLayout} label={bMap['depositAmount']}>
                            <Input 
                                placeholder={bMap['depositAmountPlaceholder']} 
                                style={ {width:'260px'} }
                                onChange={(event)=>{
                                    window.infoBus.$emit('soAmount',event.target.value);
                                }}
                            >

                            </Input>
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem {...formItemLayout} label={ bMap['balance'] }>
                            <div> { formatMoney(this.state.balance) } </div>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )        
    }

}


export default PartnerFrom;
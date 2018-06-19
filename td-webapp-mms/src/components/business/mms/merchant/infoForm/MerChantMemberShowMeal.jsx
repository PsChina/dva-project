import React, { PropTypes } from 'react';
import * as services from '../../../../../services/mms/merchantMemberManagementForm';
import { Form, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';
const bizMap = i18n.bizMap('mms/merchantMemberManagementForm');
const FormItem = Form.Item;

const Meal = (props)=>{
    const title = props.type === 'main' ? bizMap.mainMeal : bizMap.subMeal;
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      };
    return (
        <Col span={22}>
            <FormItem label={title} {...formItemLayout}>
                <div style={{
                    display:'flex'
                }}>
                    <span style={{flex:1}}>{ props.pakName }</span> <span style={{flex:1, textAlign:'right'}}>{`${props.pakYear?props.pakYear:''}${bizMap.year}`}</span>
                </div>
            </FormItem>
        </Col>
    )
}

class MerChantMemberShowMeal extends React.Component{
    render(){
        return (
            <div>
                <Meal {...this.props.mainInf} type="main"/>
                {
                    this.props.extraInfs.map( (item,index)=><Meal key={index+1} {...item}/> )
                }
            </div>
        )
    }
}

MerChantMemberShowMeal.propTypes={
    mainInf: PropTypes.object,
    extraInfs: PropTypes.array
}
MerChantMemberShowMeal.defaultProps={
    mainInf: {
        pakName:'',
        pakYear:''
    },
    extraInfs: [{
        pakName:'',
        pakYear:''
    }]
}

export default MerChantMemberShowMeal;
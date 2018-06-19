import  React from "react";
import { Table, Input } from 'antd';
import { bizMap } from '../utils/i18n';
const fMap = bizMap('component/FinancialForm');

class FinancialForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys:[]
        }
    }
    componentWillMount(){
        window.infoBus.$on('updataSelectedRowKeys',(selectedRowKeys)=>{
            this.setState({
                selectedRowKeys
            })
        })
    }
    componentWillUnmount(){
        window.infoBus.$off('updataSelectedRowKeys');
    }
    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys
                })
                this.props.onSelectConfirmList(selectedRowKeys, selectedRows);
            },
            getCheckboxProps: (item) => {
                return {
                    disabled: item.soStatus === fMap['state-1'], // Column configuration not to be checked
                    name: item.customerName,
                }
            }
        };
        const columns = [
            {
                title: fMap['time'],
                dataIndex: 'soCreateTime',
                key: 'soCreateTime'
            },
            {
                title: fMap['customerName'],
                dataIndex: 'customerName',
                key: 'customerName'
            },
            {
                title: fMap['braName'],
                dataIndex: 'braName',
                key:'braName',
            },
            {
                title: fMap['customerType'],
                dataIndex: 'customerType',
                key: 'customerType',
            },
            {
                title: fMap['paymentContent'],
                dataIndex: 'soContent',
                key: 'soContent',
            },
            {
                title: fMap['orderAmount'],
                dataIndex: 'soAmount',
                key: 'soAmount',
            },
            {
                title: fMap['paymentType'],
                dataIndex: 'payType',
                key: 'payType',
            },
            {
                title: fMap['note'],
                dataIndex: 'soDesc',
                key: 'soDesc',
            },
            {
                title: fMap['state'],
                dataIndex: 'soStatus',
                key: 'soStatus',
            },
            {
                title: fMap['operation'],
                dataIndex: 'operation',
                key: 'operation',
            }
        ];
        console.log(this.props.data)
        return (
            <Table
            style={{position:'relative'}}
            rowSelection={ rowSelection } columns={ columns } 
            dataSource={ this.props.data } rowKey="soId"
            pagination={ false }
            />            
        )
    }
}


export default FinancialForm;
import React from 'react';
import * as services from '../services/component/AddOrderModal';
// 可以将 services 改成 props 传入 到达组件复用的目的
import {  Modal, Upload, Icon, Button  } from 'antd';


class PicturesWall extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fileList:[],
        }
    }
    handleCancel() {
      this.setState({ previewVisible: false });
    }
    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange(params) {
        const { fileList } = params;
        this.setState({ fileList });
    }
    handleUpload({ file }) {
        // console.log(file);
        if(!window.shouldRelogin){
            services.uploadLogo({
            LX: 'pic',
            ORDERNUM: 1,
            TABLENAME: 'sales_order',
            file,
            }).then((result) => {
            services.getLogoBase64({
                PKID: result.data.FJID_pic_1,
                TABLENAME: 'sales_order',
                attachInfoModalVisible: true,
            }).then((img) => {
                console.log(img)
                if ('data' in img && img.data &&'rspData' in img.data) {
                this.setState({
                    fileList: [
                    {
                        uid: `${result.data.FJID_pic_1}`,
                        name: `${result.data.FJNAME_pic_1}`,
                        status: 'done',
                        url: `data:image/png;base64,${img.data.rspData.FJSRCS_pic_1}`,
                    },
                    ],
                });
                }
            });
            window.infoBus.$emit('soBankAttach',result.data.FJID_pic_1)
            });
        }

    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <Button
            className="upload-demo-start"
            type="primary"
        >
            <Icon type="plus" /> Select File
        </Button>
        );
        return (
        <div className="clearfix">
            <Upload
            customRequest={this.handleUpload.bind(this)}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview.bind(this)}
            onChange={this.handleChange.bind(this)}
            >
            {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
        );
      };
}


export default PicturesWall;

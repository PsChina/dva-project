import React from 'react';
import { Table, message, Button, Modal } from 'antd';
import Relogin from './relogin/Relogin';
import AddMealForm from './AddMealForm';
import { bizMap } from '../utils/i18n';
import * as services from '../services/PackageList';
import { setToken } from '../utils/storage';
import { decode } from '../utils/code';
import formatForm from '../utils/formatForm';
import Logo from './Logo';

const bMap = bizMap('PackageList');

class Home extends React.Component {
  constructor(props) {
    super(props);
    const data = window.location.href.split('?')[1];
    let par = { user: '', tk: '' };
    if (data) {
      const base64Params = data.split('=')[1];
      const params = decode(base64Params, 'base64');
      if (params) {
        par = formatForm(params);
      }
    }
    setToken(par.user, par.tk);
    this.getPackageList();
    this.state = {
      dataSource: [],
      visible: false,
      userName: par.user,
      visibleAddNewMeal: false,
      loading: false,
      typeList: [],
      levelList: [],
      pakLogoUrl: '',
      pakNewPropId: '',
      pakTermPosId: '',
      pakTermPayId: '',
      timeRange: {
        startTime: null,
        endTime: null,
      },
    };
  }
  componentWillMount() {
    window.infoBus.$on('relogin', this.relogin);
  }
  componentWillUnmount() {
    window.infoBus.$off('relogin', this.relogin);
  }
  getPackageList() {
    services.getPackageList()
      .then((result) => {
        if ('data' in result) {
          console.log(result);
          if (result.data.rspCod === '_SSO_ERR') {
            this.relogin();
          }
          const { rspList: dataSource } = result.data;
          console.log(dataSource);
          this.setState({
            dataSource,
          });
        }
      });
  }
  updataState(nextState) {
    this.setState({
      ...nextState,
    });
  }
  relogin() {
    this.setState({
      visible: true,
    });
  }
  handlerOk() {
    // 缺少表单验证
    // 思路
    // 参数按从上到下的顺序一个一个验证
    // 添加一个提示框，框内内容动态变化
    services.addPackage({
      pakName: this.state.papName,
      pakIndustryName: this.state.pkiName,
      pakLogoUrl: this.state.pakLogoUrl,
      pakPriceMon: Number(this.state.pakPriceMon),
      pakPriceDisMon: Number(this.state.pakPriceDisMon),
      pakClass: this.state.pacCode,
      pakNewPropId: this.state.pakNewPropId, // 活动id
      pakTermPosId: this.state.pakTermPosId, // pos 设备编码
      pakTermPayId: this.state.pakTermPayId, // 支付设备编码
      pakAvailStartTime: this.state.timeRange.startTime,
      pakAvailEndTime: this.state.timeRange.endTime,
    }).then((result) => {
      this.setState({
        loading: false,
      });
      if ('data' in result) {
        if ('rspCod' in result.data) {
          if (result.data.rspCod === '_SSO_ERR') {
            this.relogin();
          } else if (result.data.rspCod === '000000') {
            message.success(bMap.addSuccess);
            this.getPackageList();
          } else {
            message.error(result.data.rspMsg);
          }
          this.setState({
            visibleAddNewMeal: false,
          });
        }
      }
    });
    this.setState({
      loading: true,
    });
  }
  handlerCancel() {
    this.setState({
      visibleAddNewMeal: false,
    });
  }
  openModal() {
    services.queryLevelList()
      .then((result) => {
        if (result.data) {
          if ('rspCod' in result.data && result.data.rspCod === '000000') {
            this.setState({
              levelList: result.data.rspList ? result.data.rspList : [],
            });
          } else if ('data' in result && 'rspCod' in result.data) {
            if (result.data.rspCod === '_SSO_ERR') {
              this.relogin();
            }
          }
        }
      });
    services.queryTypeList()
      .then((result) => {
        if (result.data) {
          if ('rspCod' in result.data && result.data.rspCod === '000000') {
            this.setState({
              typeList: result.data.rspList,
            });
          } else if ('data' in result && 'rspCod' in result.data) {
            if (result.data.rspCod === '_SSO_ERR') {
              this.relogin();
            }
          }
        }
      });
    this.setState({
      visibleAddNewMeal: true,
    });
  }
  render() {
    /**
    "didOnline":"已上线",
    "didOffline":"已下线"
     */
    /**
     * 操作组件
     */
    const Operations = (props) => {
      /**
       * 启用
       */
      let DisableComponent = () => (
        <Button
          size="small"
          loading={this.state.loading}
          onClick={() => {
            this.setState({
              loading: true,
            });
            services.enablePackage({
              id: props.pakId,
            }).then((result) => {
              this.setState({
                loading: false,
              });
              if ('data' in result && 'rspCod' in result.data) {
                const code = result.data.rspCod;
                switch (code) {
                  case '_SSO_ERR': this.relogin(); break;
                  case '000000': this.getPackageList(); message.success(bMap.enableSuccess); break;
                  case '999999': message.error(bMap.enableFail); break;
                  default: message.error(bMap.enableFail); break;
                }
              }
            });
          }}
        >
          {bMap.toEnable}
        </Button>
      );
      /**
       * 禁用
       */
      const DisableBtn = () => (
        <Button
          size="small"
          loading={this.state.loading}
          onClick={() => {
            this.setState({
              loading: true,
            });
            services.disablePackage({
              id: props.pakId,
            }).then((result) => {
              this.setState({
                loading: false,
              });
              if ('data' in result && 'rspCod' in result.data) {
                const code = result.data.rspCod;
                switch (code) {
                  case '_SSO_ERR': this.relogin(); break;
                  case '000000': this.getPackageList(); message.success(bMap.forbiddenSuccess); break;
                  case '999999': message.error(bMap.forbiddenFail); break;
                  default: message.error(bMap.forbiddenFail); break;
                }
              }
            });
          }}
        >
          {bMap.forbiddenMeal}
        </Button>
      );
      if (props.pakEnabled) {
        DisableComponent = DisableBtn;
      }
      /**
       * 发布
       */
      let PublishBtn = () => (
        <Button
          size="small"
          loading={this.state.loading}
          onClick={() => {
            this.setState({
              loading: true,
            });
            services.onlinePackage({
              id: props.pakId,
            }).then((result) => {
              this.setState({
                loading: false,
              });
              if ('data' in result && 'rspCod' in result.data) {
                const code = result.data.rspCod;
                switch (code) {
                  case '_SSO_ERR': this.relogin(); break;
                  case '000000': this.getPackageList(); message.success(bMap.onlineSuccess); break;
                  case '999999': message.error(bMap.onlineError); break;
                  default: message.error(bMap.onlineError); break;
                }
              }
            });
          }}
        >
          {bMap.online}
        </Button>
      );

      /**
       * 下线
      */
      const OffLineBtn = () => (
        <Button
          size="small"
          loading={this.state.loading}
          onClick={() => {
            this.setState({
              loading: true,
            });
            services.offlinePackage({
              id: props.pakId,
            }).then((result) => {
              this.setState({
                loading: false,
              });
              if ('data' in result && 'rspCod' in result.data) {
                const code = result.data.rspCod;
                switch (code) {
                  case '_SSO_ERR': this.relogin(); break;
                  case '000000': this.getPackageList(); message.success(bMap.offlineSuccess); break;
                  case '999999': message.error(bMap.offlineError); break;
                  default: message.error(bMap.offlineError); break;
                }
              }
            });
          }}
        >
          {bMap.offline}
        </Button>
      );

      if (props.pakStatus) {
        PublishBtn = OffLineBtn;
      }
      return (
        <div>
          <Button
            size="small"
            loading={this.state.loading}
            style={{ width: 'auto' }}
            onClick={() => {
            this.setState({
              loading: true,
            });
            services.deletePackage({
              id: props.pakId,
            })
            .then((result) => {
              if ('data' in result && 'rspCod' in result.data) {
                const code = result.data.rspCod;
                switch (code) {
                  case '_SSO_ERR': this.relogin(); break;
                  case '000000': this.getPackageList(); message.success(bMap.deleteSuccess); break;
                  case '999999': message.error(bMap.deleteError); break;
                  default: message.error(bMap.deleteError); break;
                }
              }
              this.setState({
                loading: false,
              });
            });
            }}
          >
            {bMap.delete}
          </Button>
          <DisableComponent />
          <PublishBtn />
        </div>
      );
    };
    const columns = [
      {
        title: bMap.name,
        dataIndex: 'pakName',
        key: 'pakName',
        align: 'center',
      },
      {
        title: bMap.logo,
        dataIndex: 'pakLogoUrl',
        key: 'pakLogoUrl',
        align: 'center',
        render: (text, data) => <Logo {...data} />,
      },
      {
        title: bMap.industry,
        dataIndex: 'pakIndustryName',
        key: 'pakIndustryName',
        align: 'center',
      },
      {
        title: bMap.Hardware, // 云智慧系统机
        dataIndex: 'pakTermPayName',
        key: 'pakTermPayName',
        align: 'center',
        render: (text) => {
          if (text) {
            return text;
          }
          return '----';
        },
      },
      {
        title: bMap.smartPOS, // 云智慧pos机
        dataIndex: 'pakTermPosName',
        key: 'pakTermPosName',
        align: 'center',
        render: (text) => {
          if (text) {
            return text;
          }
          return '----';
        },
      },
      {
        title: bMap.monthlyOriginalPrice,
        dataIndex: 'pakPriceMon',
        key: 'pakPriceMon',
        align: 'center',
      },
      {
        title: bMap.monthlyCurrentPrice,
        dataIndex: 'pakPriceDisMon',
        key: 'pakPriceDisMon',
        align: 'center',
      },
      {
        title: bMap.mealStatus,
        dataIndex: 'pakStatus',
        key: 'pakStatus',
        align: 'center',
        render: (text, data) => (
          <div>
            { data.pakStatus ? bMap.didOnline : bMap.didOffline }
          </div>
        ),
      },
      {
        title: bMap.isEnable,
        dataIndex: 'pakEnabled',
        key: 'pakEnabled',
        align: 'center',
        render: (text, data) => (
          <div>
            { data.pakEnabled ? bMap.enable : bMap.didForbidden }
          </div>
        ),
      },
      {
        title: bMap.offer,
        dataIndex: 'pakNewPromotion',
        key: 'pakNewPromotion',
        align: 'center',
        render: (text) => {
          if (text && 'papProText' in text) {
            return text.papProText + text.papProDisText;
          }
          return '----';
        },
      },
      {
        title: bMap.operation,
        dataIndex: 'operation',
        key: 'operation',
        render: (text, data) => (
          <Operations {...data} />
        ),
        align: 'center',
      },
    ];
    const ReloginProps = {
      visible: this.state.visible,
      loginSuccess: (msg) => {
        console.log(msg);
        const code = Number(msg.data.rspCod);
        if ('rspData' in msg.data) {
          const { token } = msg.data.rspData;
          const { rspMsg } = msg.data;
          let errrorMessage = '';
          switch (code) {
            case 200:
              this.setState({
                visible: false,
                loginMsg: bMap.success,
                error: false,
              });
              setToken(this.state.userName, token);
              message.success(bMap.success);
              this.getPackageList();
              break;
            case 999:
              if (rspMsg.indexOf('锁定') !== -1) {
                errrorMessage = bMap.locked.replace('[d]', rspMsg.replace(/[^\d]/g, ''));
              } else if (rspMsg.indexOf('错误') !== -1) {
                errrorMessage = bMap.passwordWrong.replace('[d]', rspMsg.replace(/[^\d]/g, ''));
              } else {
                errrorMessage = 'Unknow error.';
              }
              this.setState({
                loginMsg: errrorMessage,
                error: true,
              });
              message.error(rspMsg);
              break;
            default:
              this.setState({
                loginMsg: `${bMap.networkError}${code}`,
                error: true,
              });
              break;
          }
        }
      },
      msg: this.state.loginMsg,
      userName: this.state.userName,
      error: this.state.error,
    };
    return (
      <div style={
          {
             display: 'flex',
             flexDirection: 'column',
             width: '100%',
             height: '100%',
          }
      }
      >
        <Table
          columns={columns}
          dataSource={this.state.dataSource}
          rowKey="pakName"
          pagination={false}
          style={{
            flex: 9,
          }}
        />
        <div />
        <div style={{
            flex: 0.8,
            display: 'flex',
            alignItems: 'center',
        }}
        >
          <Button
            style={{ marginLeft: '20px' }}
            onClick={this.openModal.bind(this)} //eslint-disable-line
          >
            {bMap.newMeal}
          </Button>
        </div>
        <Modal
          title={bMap.newMeal}
          onCancel={this.handlerCancel.bind(this)} //eslint-disable-line
          onOk={this.handlerOk.bind(this)} //eslint-disable-line
          visible={this.state.visibleAddNewMeal}
          destroyOnClose={true}
          footer={[
            <Button key="back" onClick={this.handlerCancel.bind(this)}>{bMap.cancel}</Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handlerOk.bind(this)} //eslint-disable-line
            >
              {bMap.ok}
            </Button>,
          ]}
          style={{
            textAlign: 'center',
          }}
        >
          <AddMealForm
            levelList={this.state.levelList}
            typeList={this.state.typeList}
            updataState={this.updataState.bind(this)}
          />
        </Modal>
        <Relogin {...ReloginProps} />
      </div>
    );
  }
}
export default Home;

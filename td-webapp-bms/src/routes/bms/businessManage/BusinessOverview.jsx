import React from 'react';
import { connect } from 'dva';
import { Card, Tabs } from 'antd';
import BusinessList from '../../../components/business/bms/business/BusinessList';
import * as i18n from '../../../utils/i18n';

const TabPane = Tabs.TabPane;
const BusinessOverview = ({ businessOverview }) => {
  const bizMap = i18n.bizMap('bms/business');
  const { allOffLineBiz, allOnLineBiz, allRealTimeStlBiz } = businessOverview;

  const cardProps = {
    title: bizMap.businessOverview,
    style: { width: '100%' },
  };

  return (
    <Card {...cardProps}>
      <Tabs defaultActiveKey="1">
        <TabPane tab={bizMap.offlinePay} key="1">
          {
            allOffLineBiz.lenght === 0 ? null : <BusinessList list={allOffLineBiz} />
          }
        </TabPane>
        <TabPane tab={bizMap.onlinePay} key="2">
          {
            allOnLineBiz.lenght === 0 ? null : <BusinessList list={allOnLineBiz} />
          }
        </TabPane>
        <TabPane tab={bizMap.realTimeSettlement} key="3">
          {
            allRealTimeStlBiz.lenght === 0 ? null : <BusinessList list={allRealTimeStlBiz} />
          }
        </TabPane>
      </Tabs>
    </Card>
  );
};

function mapStateToProps({ businessOverview }) {
  return { businessOverview };
}

export default connect(mapStateToProps)(BusinessOverview);

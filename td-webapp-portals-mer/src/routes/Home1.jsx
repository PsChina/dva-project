import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';

const Home1 = ({ home1 }) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span="18">
          <Card bordered={false} style={{ width: '100%' }}>
            home1...
           </Card>
        </Col>
        <Col span="6">
          <Card bordered={false} style={{ width: '100%' }}>
              Card
          </Card>
        </Col>
      </Row>
    </div>

  );
};

function mapStateToProps({ home1 }) {
  return { home1 };
}

export default connect(mapStateToProps)(Home1);

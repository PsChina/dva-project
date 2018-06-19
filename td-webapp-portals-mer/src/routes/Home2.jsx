import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';

const Home2 = ({ home2 }) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span="18">
          <Card bordered={false} style={{ width: '100%' }}>
            home2...
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

function mapStateToProps({ home2 }) {
  return { home2 };
}

export default connect(mapStateToProps)(Home2);

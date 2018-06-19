import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';

const Home3 = ({ home3 }) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span="18">
          <Card bordered={false} style={{ width: '100%' }}>
            home3...
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

function mapStateToProps({ home3 }) {
  return { home3 };
}

export default connect(mapStateToProps)(Home3);

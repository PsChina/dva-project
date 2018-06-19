import React from 'react';
import { connect } from 'dva';

const Home = ({ home }) => {
  return (
    <div>
      home
    </div>
  );
};

function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps)(Home);

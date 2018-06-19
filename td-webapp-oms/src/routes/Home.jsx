import React from 'react';
import { connect } from 'dva';

const Home = ({ home }) => {
  return (
    <div>
      Home...
    </div>
  );
};

function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps)(Home);

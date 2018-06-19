import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const TransTempInfoForm = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('oms/bankcardOrder');
  return (
    <table className="detail_table">
      <tbody>
        
      </tbody>
    </table>
  );
}

TransTempInfoForm.propTypes = {
  data: PropTypes.object,
};

TransTempInfoForm.defaultProps = {
  data: {},
}

export default TransTempInfoForm;

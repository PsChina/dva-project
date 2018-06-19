import { Form } from 'antd';
import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const WarnUserDetailForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnUser');
  const commonMap = i18n.commonMap();

  const { data } = props;
  let orgType = '';
  if (data.staffOrgType === '01') {
    orgType = bizMap.headquarters;
  } else if (data.staffOrgType === '02') {
    orgType = bizMap.branchOffice;
  } 
  let userSrc = '';
  if (data.staffFrom === '00') {
    userSrc = bizMap.userSrc00;
  } else if (data.staffFrom === '01') {
    userSrc = bizMap.userSrc01;
  } else if (data.staffFrom === '02') {
    userSrc = bizMap.userSrc02;
  }

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.staffName}:</td>
          <td>{data.staffName}</td>
        </tr>
        <tr>
          <td>{bizMap.staffOrgType}:</td>
          <td>{orgType}</td>
        </tr>
        <tr>
          <td>{bizMap.staffFrom}:</td>
          <td>{userSrc}</td>
        </tr>
        <tr>
          <td>{bizMap.staffPhone}:</td>
          <td>{data.staffPhone}</td>
        </tr>
      </tbody>
    </table>
  );
}

WarnUserDetailForm.propTypes = {
  data: PropTypes.object,
};

WarnUserDetailForm.defaultProps = {
  data: {},
}

export default Form.create()(WarnUserDetailForm);

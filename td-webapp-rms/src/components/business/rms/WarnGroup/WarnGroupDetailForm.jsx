import { Form } from 'antd';
import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const WarnGroupDetailForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnGroup');
  const { data } = props;
  let orgType = '';
  if (data.orgType === '0') {
    orgType = bizMap.headquarters;
  } else if (data.orgType === '1') {
    orgType = bizMap.branchOffice;
  } else if (data.orgType === '2') {
    orgType = bizMap.agent;
  }
  let groupType = '';
  if (data.groupType != null) {
    const arr = data.groupType.split(',').sort();
    let str = '';
    for (let i = 0; i < arr.length; i++) {
      str += bizMap[`groupType-${arr[i]}`];
      str += ' ';
    }
    groupType = str
  }

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.groupName}:</td>
          <td>{data.groupName}</td>
          <td>{bizMap.orgType}:</td>
          <td>{orgType}</td>
        </tr>
        <tr>
          <td>{bizMap.groupType}:</td>
          <td>{groupType}</td>
        </tr>
      </tbody>
    </table>
  );
}

WarnGroupDetailForm.propTypes = {
  data: PropTypes.object,
};

WarnGroupDetailForm.defaultProps = {
  data: {},
}

export default Form.create()(WarnGroupDetailForm);

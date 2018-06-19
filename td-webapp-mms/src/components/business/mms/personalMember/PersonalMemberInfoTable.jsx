import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const PersonalMemberInfoTable = (props) => {
  const bizMap = i18n.bizMap('mms/personalMember');
  const commMap = i18n.commonMap();
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>ID:</td>
          <td colSpan="3">{data.id}</td>
        </tr>
        <tr>
          <td>{bizMap.userName}:</td>
          <td>{data.userName}</td>
          <td>{bizMap.realName}:</td>
          <td>{data.realName}</td>
        </tr>
        <tr>
          <td>{bizMap.gender}:</td>
          <td>{data.gender}</td>
          <td>{bizMap.birthday}:</td>
          <td>{data.birthday}</td>
        </tr>
        <tr>
          <td>{bizMap.mobile}:</td>
          <td>{data.mobile}</td>
          <td>{bizMap.email}:</td>
          <td>{data.email}</td>
        </tr>
        <tr>
          <td>{bizMap.address}</td>
          <td colSpan="3">{data.address}</td>
        </tr>
        <tr>
          <td>{bizMap.certificateType}:</td>
          <td>{data.certificateType}</td>
          <td>{bizMap.certificateNo}:</td>
          <td>{data.certificateNo}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}</td>
          <td colSpan="3">{data.remark}</td>
        </tr>
        <tr>
          <td>{bizMap.status}</td>
          <td colSpan="3">{data.status}</td>
        </tr>
        <tr>
          <td>{commMap.createTime}</td>
          <td colSpan="3">{data.createTime}</td>
        </tr>
        <tr>
          <td>{commMap.lastUpdateBy}:</td>
          <td>{data.updateBy}</td>
          <td>{commMap.lastUpdateTime}:</td>
          <td>{data.updateTime}</td>
        </tr>
        <tr>
          <td>{commMap.lastLoginIp}:</td>
          <td>{data.loginIp}</td>
          <td>{commMap.lastLoginTime}:</td>
          <td>{data.loginTime}</td>
        </tr>
      </tbody>
    </table>
  );
}

PersonalMemberInfoTable.propTypes = {
  data: PropTypes.object,
};

PersonalMemberInfoTable.defaultProps = {
  data: {},
}

export default PersonalMemberInfoTable;

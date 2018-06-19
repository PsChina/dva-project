import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const PubAnnmentTable = (props) => {
  const downloadUrl = 'rest/bas/common/download';
  const bizMap = i18n.bizMap('bas/pubAnnment');
  // const commonMap = i18n.commonMap();
  const { data } = props;
  let priority = '';
  switch (data.priority) {
    case '01': priority = bizMap['priority-01']; break;
    case '02': priority = bizMap['priority-02']; break;
    case '03': priority = bizMap['priority-03']; break;
    default: priority = ''; break;
  }
  let annType = '';
  switch (data.annType) {
    case '000': annType = bizMap['annType-000']; break;
    case '001': annType = bizMap['annType-001']; break;
    case '002': annType = bizMap['annType-002']; break;
    case '003': annType = bizMap['annType-003']; break;
    default: annType = ''; break;
  }
  let issuestate = '';
  switch (data.issuestate) {
    case '0': issuestate = bizMap['issuestate-0']; break;
    case '1': issuestate = bizMap['issuestate-1']; break;
    default: issuestate = ''; break;
  }
  const attaIds = data.attachmentIds ? data.attachmentIds.split(',') : [];
  const downLoadUrlNew = (attaId) => {
    const params = `?ID=${attaId}`;
    const newDownLoadUrl = downloadUrl + params;
    return newDownLoadUrl;
  };
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.title}:</td>
          <td colSpan="3">{data.title}</td>
        </tr>
        <tr>
          <td>{bizMap.content}:</td>
          <td colSpan="3">{data.content}</td>
        </tr>
        <tr>
          <td>{bizMap.priority}:</td>
          <td>{priority}</td>
          <td>{bizMap.annType}:</td>
          <td>{annType}</td>
        </tr>
        <tr>
          <td>{bizMap.issuestate}:</td>
          <td>{issuestate}</td>
          <td>{bizMap.publishTime}:</td>
          <td>{formatDateString(data.publishTime)}</td>
        </tr>
        <tr>
          <td>{bizMap.creObj}:</td>
          <td>{data.creObj}</td>
          <td>{bizMap.updObj}:</td>
          <td>{data.updObj}</td>
        </tr>
        <tr>
          <td>{bizMap.creTim}:</td>
          <td>{formatDateString(data.creTim)}</td>
          <td>{bizMap.updTim}:</td>
          <td>{formatDateString(data.updTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.attachment}:</td>
          <td>
            {
              attaIds.map((attaId, idx) => {
                return (
                  < p >
                    <a href={downLoadUrlNew(attaId)} key={idx} >{bizMap.downAttachment}</a>
                  </p>
                )
              })
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
}

PubAnnmentTable.propTypes = {
  data: PropTypes.object,
};

PubAnnmentTable.defaultProps = {
  data: {},
}

export default PubAnnmentTable;

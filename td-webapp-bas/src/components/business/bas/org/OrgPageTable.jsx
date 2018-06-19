import React, { PropTypes } from 'react';
import TreeStructure from '../../../common/TreeStructure';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const OrgPageTable = (props) => {
  const { treeData, handleAddBtnClick, handlerEditBtnClick, handlerDeleteBtnClick, handlerEnableBtnClick, handlerDisableBtnClick } = props;
  const bizMap = i18n.bizMap('bas/org');
  const commonMap = i18n.commonMap();
  const tableColumns = [
    { title: bizMap.orgId, dataIndex: 'orgId' },
    { title: bizMap.orgName, dataIndex: 'orgName' },
    { title: bizMap.parentOrgId, dataIndex: 'parentOrgId' },
    { title: bizMap.orgDesc, dataIndex: 'orgDesc' },
    {
      title: bizMap.isUse, dataIndex: 'isUse', render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: break;
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>
      },
    },
    { title: bizMap.creObj, dataIndex: 'creObj' },
    { title: bizMap.creTim, dataIndex: 'creTim', width: 140, render: text => formatDateString(text) },
    { title: bizMap.updObj, dataIndex: 'updObj' },
    { title: bizMap.updTim, dataIndex: 'updTim', width: 140, render: text => formatDateString(text) },
  ];
  const toolbar = [
    { icon: 'plus', text: bizMap.addChildOrg, click: (curNode) => { handleAddBtnClick(curNode) } },
    { icon: 'edit', text: bizMap.updateOrg, click: (curNode) => { handlerEditBtnClick(curNode) } },
    { icon: 'cross', text: bizMap.deleteOrg, click: (curNode) => { handlerDeleteBtnClick(curNode) } },
    { icon: 'check', text: bizMap.enableOrg, click: (curNode) => { handlerEnableBtnClick(curNode) } },
    { icon: 'minus', text: bizMap.disableOrg, click: (curNode) => { handlerDisableBtnClick(curNode) } },
  ];

  return (
    <TreeStructure columns={tableColumns} actions={toolbar} data={treeData[0]} dict={{ key: 'orgId', text: 'orgName' }} />
  );
};

OrgPageTable.propTypes = {
  treeData: PropTypes.array,
  handleAddBtnClick: PropTypes.func,
  handlerEditBtnClick: PropTypes.func,
  handlerDeleteBtnClick: PropTypes.func,
  handlerEnableBtnClick: PropTypes.func,
  handlerDisableBtnClick: PropTypes.func,
};

OrgPageTable.defaultProps = {
  treeData: [],
  handleAddBtnClick: noop,
  handlerEditBtnClick: noop,
  handlerDeleteBtnClick: noop,
  handlerEnableBtnClick: noop,
  handlerDisableBtnClick: noop,
}

export default OrgPageTable;

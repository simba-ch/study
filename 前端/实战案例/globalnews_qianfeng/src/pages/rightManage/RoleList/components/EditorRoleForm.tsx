import React, { useEffect, useState } from 'react';
import { ActionType } from '@ant-design/pro-table';
import { getRoleList, modifyRoleRights } from '@/services/user';
import { message, Tree, Modal } from 'antd';
import { Role } from '@/pages/user/UserList/data';

type CreateFormProps = {
  editor: Role | {};
  modalVisible: boolean;
  handleModalVisible: (isVisible: boolean) => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};



const EditorRoleForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, handleModalVisible, actionRef, editor } = props;
  const [treeData, setTreeData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([])

  useEffect(() => {
    getRoleList().then((res: any) => setTreeData(res))
  }, [])

  useEffect(() => {
    setCheckedKeys(editor.rights ?? [])
  }, [editor])


  async function onFinish() {
    const success = await modifyRoleRights(editor.id, checkedKeys)
    if (success) {
      message.success('设置成功')
      handleModalVisible(false);
      if (actionRef.current) {
        actionRef.current?.reload();
      }
    }
  }



  const onCheck = (checkedKeys: any, info: any) => {
    setCheckedKeys(checkedKeys)
    console.log('onCheck', checkedKeys, info);
  };


  return <Modal
    title="权限分配"
    destroyOnClose
    visible={modalVisible}
    onOk={onFinish}
    onCancel={() => { handleModalVisible(false) }}>
    <Tree
      height={500}
      checkable
      checkedKeys={checkedKeys}
      selectable={false}
      onCheck={onCheck}
      treeData={treeData}
    />
  </Modal>;
};

export default EditorRoleForm;

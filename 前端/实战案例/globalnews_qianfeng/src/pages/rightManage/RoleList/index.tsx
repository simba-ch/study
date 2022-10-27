import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Tooltip } from 'antd';
import React, { useState, useRef, } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListPagination } from './data';
import { deleteRole, getRoles } from '@/services/user';
import DeleteModal from '@/components/DeleteModal';
import EditorRoleForm from './components/EditorRoleForm';
import { Role } from '@/pages/user/UserList/data';
/**
 * 更新节点
 *
 * @param fields
 */

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [modalVisible, setModalVisible] = useState(false)
  const [editor, setEditor] = useState({})


  /** 分布更新窗口的弹窗 */
  const actionRef = useRef<ActionType>();
  const questDataSource = async () => {
    const data = await getRoles();
    return {
      data,
      success: true,
    }
  }
  function onHandleEdit(record: Role) {
    setModalVisible(true)
    setEditor(record)
  }

  async function handleDeleteOk(record: any) {
    await deleteRole(record.id);
    message.success('删除成功')
    actionRef.current?.reload();
  }



  const columns: ProColumns<Role>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (dom) => <b style={{ marginLeft: '5px' }}>{dom}</b>
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <Tooltip title="删除" key="delete">
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              DeleteModal(record, handleDeleteOk);
            }}
          >
          </Button>
        </Tooltip>,
        <Tooltip title="编辑" key="edit">
          <Button onClick={() => onHandleEdit(record)}
            shape="circle"
            type='primary'
            icon={<EditOutlined />}
          >
          </Button>
        </Tooltip>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<Role, TableListPagination>
        actionRef={actionRef}
        rowKey={(item) => item.id}
        search={false}
        toolBarRender={false}
        request={questDataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      />

      <EditorRoleForm
        modalVisible={modalVisible}
        handleModalVisible={(visible) => setModalVisible(visible)}
        actionRef={actionRef}
        editor={editor}
      />

    </PageContainer>
  );
};

export default TableList;

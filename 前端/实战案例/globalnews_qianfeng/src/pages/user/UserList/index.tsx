import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Switch, Tooltip } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem, TableListPagination } from './data';
import { deleteUser, getRoles, getUsersInfo, patchRoleState } from '@/services/user';
import DeleteModal from '@/components/DeleteModal';
import CreateForm from './components/CreateForm';

/**
 * 更新节点
 *
 * @param fields
 */

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [region, setRegion] = useState({})
  const [role, setRole] = useState({})
  const [modifyModalVisible, setModifyModalVisible] = useState(false)
  const [editor, setEditor] = useState({})
  useEffect(() => {
    getRoles().then((res: any) => {
      const roles = {}
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        roles[item.id] = {
          text: item.roleName
        }
      }
      setRole(roles)
    })
  }, [])

  /** 分布更新窗口的弹窗 */
  const actionRef = useRef<ActionType>();
  const questDataSource = async (params: any) => {
    const { pageSize, current, ...reset } = params
    const usersInfo = await getUsersInfo();
    const regions = {}
    for (let i = 0; i < usersInfo.length; i++) {
      const userInfo = usersInfo[i];
      regions[userInfo.region] = { text: userInfo.region ? userInfo.region : '全球' }
    }
    setRegion(regions)


    return {
      data: usersInfo.filter((item: any) => {
        let equal = true;
        for (let key in reset) {
          if (Object.prototype.hasOwnProperty.call(reset, key)) {
            const element = reset[key];
            if (key !== 'region' && !element) {
              console.log('first')
              continue
            };
            if (item[key].toString().trim() !== element) {
              equal = false
              break;
            };
          }
        }
        if (equal) return item
      }),
      success: true,
    }
  }

  const onChangeRoleState = async (record: TableListItem, state: boolean) => {
    const { id } = record;
    record.roleState = await patchRoleState(id, { roleState: state }).then((res: any) => res.roleState)
    actionRef.current?.reload();
  }

  function onHandleEdit(record: TableListItem) {
    setModifyModalVisible(true)
    setEditor(record)
  }




  async function handleDeleteOk(record: any) {
    await deleteUser(record.id);
    message.success('删除成功')
    actionRef.current?.reload();
  }



  const columns: ProColumns<TableListItem>[] = [
    {
      title: '区域',
      dataIndex: 'region',
      valueEnum: region,
      render: (dom, record) => {
        return (
          <b>
            {record.region ? record.region : '全球'}
          </b >
        );
      },
    },
    {
      title: '角色名称',
      dataIndex: 'roleId',
      valueEnum: role
    },
    {
      title: '用户名',
      dataIndex: 'username',
      hideInForm: true,
      renderText: (val: string) => `${val}`,
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      hideInSearch: true,
      hideInForm: true,
      render: (dom, record) => {
        return <Switch onChange={(state) => onChangeRoleState(record, state)} checked={record.roleState} disabled={record.default} />
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <Tooltip title="删除" key="delete">
          <Button
            disabled={record.default}
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
            disabled={record.default}
            icon={<EditOutlined />}
          >
          </Button>
        </Tooltip>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey={(item) => item.id}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 添加用户
          </Button>,
        ]}
        request={questDataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      />

      <CreateForm
        modalVisible={createModalVisible}
        handleModalVisible={(visible) => handleModalVisible(visible)}
        actionRef={actionRef} />

      <CreateForm
        type="更新"
        modalVisible={modifyModalVisible}
        handleModalVisible={(visible) => setModifyModalVisible(visible)}
        actionRef={actionRef}
        editor={editor}
      />
    
    </PageContainer>
  );
};

export default TableList;

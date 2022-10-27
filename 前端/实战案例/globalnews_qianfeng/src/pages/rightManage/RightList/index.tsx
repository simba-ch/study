import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popover, Switch, Tag, Tooltip } from 'antd';
import React, { useRef, } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { IFRight, TableListPagination } from './data';
import { deleteChildren, deleteRight, getRoleList, modifyChildrenPagepermisson, modifyRightPagepermisson } from '@/services/user';
import DeleteModal from '@/components/DeleteModal';
/**
 * 更新节点
 *
 * @param fields
 */

const TableList: React.FC = () => {

  /** 分布更新窗口的弹窗 */
  const actionRef = useRef<ActionType>();
  const questDataSource = async () => {
    const data = await getRoleList();
    return {
      data: data.map(item => {
        if (item.children?.length) return item;
        return {
          ...item,
          children: undefined
        }
      }),
      success: true,
    }
  }

  async function handleDeleteOk(record: any) {
    if (record.grade === 1) {
      await deleteRight(record.id);
    } else if (record.grade === 2) {
      await deleteChildren(record.id)
    }
    message.success('删除成功')
    actionRef.current?.reload();
  }

  async function onChange(checked: boolean, record: IFRight) {
    if (record.grade === 1) {
      await modifyRightPagepermisson(record.id, checked ? 1 : 0)
    } else if (record.grade === 2) {
      await modifyChildrenPagepermisson(record.id, checked ? 1 : 0)
    }
    message.success('修改成功')
    actionRef.current?.reload();
  }


  const columns: ProColumns<IFRight>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (dom) => <b style={{ marginLeft: '5px' }}>{dom}</b>
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (dom) => <Tag color="orange">{dom}</Tag>
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
          <Popover content={() => <Switch
            checked={record.pagepermisson === 1}
            onChange={(checked) => onChange(checked, record)}
            style={{ margin: 'auto', display: 'block' }} />}
            title="页面配置项"
            trigger="click"
          >
            <Button
              shape="circle"
              type='primary'
              icon={<EditOutlined />}
              disabled={record.pagepermisson === undefined}
            >
            </Button>
          </Popover>
        </Tooltip >,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<IFRight, TableListPagination>
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


    </PageContainer>
  );
};

export default TableList;

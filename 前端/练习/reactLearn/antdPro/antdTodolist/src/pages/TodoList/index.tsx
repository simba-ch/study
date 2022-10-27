import { DownOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Tooltip, Alert, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { ProColumns, ActionType, TableDropdown } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import Mock from "mockjs";
import { TableListItem } from 'mock/todoList';
import { setTodolist } from '@/services/todolist';
// /**
//  * @en-US Add node
//  * @zh-CN 添加节点
//  * @param fields
//  */
// const handleAdd = async (fields: API.RuleListItem) => {
//   const hide = message.loading('正在添加');
//   try {
//     await addRule({ ...fields });
//     hide();
//     message.success('Added successfully');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Adding failed, please try again!');
//     return false;
//   }
// };

// /**
//  * @en-US Update node
//  * @zh-CN 更新节点
//  *
//  * @param fields
//  */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('Configuring');
//   try {
//     await updateRule({
//       name: fields.name,
//       desc: fields.desc,
//       key: fields.key,
//     });
//     hide();

//     message.success('Configuration is successful');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Configuration failed, please try again!');
//     return false;
//   }
// };

// /**
//  *  Delete node
//  * @zh-CN 删除节点
//  *
//  * @param selectedRows
//  */
// const handleRemove = async (selectedRows: API.RuleListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('Deleted successfully and will refresh soon');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Delete failed, please try again');
//     return false;
//   }
// };

// const TableList: React.FC = () => {
//   /**
//    * @en-US Pop-up window of new window
//    * @zh-CN 新建窗口的弹窗
//    *  */
//   const [createModalVisible, handleModalVisible] = useState<boolean>(false);
//   /**
//    * @en-US The pop-up window of the distribution update window
//    * @zh-CN 分布更新窗口的弹窗
//    * */
//   const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

//   const [showDetail, setShowDetail] = useState<boolean>(false);

//   const actionRef = useRef<ActionType>();
//   const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
//   const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

// /**
//  * @en-US International configuration
//  * @zh-CN 国际化配置
//  * */
// const intl = useIntl();

//   const columns: ProColumns<API.RuleListItem>[] = [
//     {
//       title: (
//         <FormattedMessage
//           id="pages.searchTable.updateForm.ruleName.nameLabel"
//           defaultMessage="Rule name"
//         />
//       ),
//       dataIndex: 'name',
//       hideInForm: true,
//       tip: 'The rule name is the unique key',
//       render: (dom, entity) => {
//         return (
//           <a
//             onClick={() => {
//               setCurrentRow(entity);
//               setShowDetail(true);
//             }}
//           >
//             {dom}
//           </a>
//         );
//       },
//     },
//     {
//       title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Description" />,
//       dataIndex: 'desc',
//       hideInForm: true,
//       valueType: 'textarea',
//     },
//     {
//       title: (
//         <FormattedMessage
//           id="pages.searchTable.titleCallNo"
//           defaultMessage="Number of service calls"
//         />
//       ),
//       dataIndex: 'callNo',
//       sorter: true,
//       hideInForm: true,
//       renderText: (val: string) =>
//         `${val}${intl.formatMessage({
//           id: 'pages.searchTable.tenThousand',
//           defaultMessage: ' 万 ',
//         })}`,
//     },
//     {
//       title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
//       dataIndex: 'status',
//       hideInForm: true,
//       valueEnum: {
//         0: {
//           text: (
//             <FormattedMessage
//               id="pages.searchTable.nameStatus.default"
//               defaultMessage="Shut down"
//             />
//           ),
//           status: 'Default',
//         },
//         1: {
//           text: (
//             <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running" />
//           ),
//           status: 'Processing',
//         },
//         2: {
//           text: (
//             <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Online" />
//           ),
//           status: 'Success',
//         },
//         3: {
//           text: (
//             <FormattedMessage
//               id="pages.searchTable.nameStatus.abnormal"
//               defaultMessage="Abnormal"
//             />
//           ),
//           status: 'Error',
//         },
//       },
//     },
//     {
//       title: (
//         <FormattedMessage
//           id="pages.searchTable.titleUpdatedAt"
//           defaultMessage="Last scheduled time"
//         />
//       ),
//       sorter: true,
//       dataIndex: 'updatedAt',
//       valueType: 'dateTime',
//       renderFormItem: (item, { defaultRender, ...rest }, form) => {
//         const status = form.getFieldValue('status');
//         if (`${status}` === '0') {
//           return false;
//         }
//         if (`${status}` === '3') {
//           return (
//             <Input
//               {...rest}
//               placeholder={intl.formatMessage({
//                 id: 'pages.searchTable.exception',
//                 defaultMessage: 'Please enter the reason for the exception!',
//               })}
//             />
//           );
//         }
//         return defaultRender(item);
//       },
//     },
//     {
//       title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
//       dataIndex: 'option',
//       valueType: 'option',
//       render: (_, record) => [
//         <a
//           key="config"
//           onClick={() => {
//             handleUpdateModalVisible(true);
//             setCurrentRow(record);
//           }}
//         >
//           <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
//         </a>,
//         <a key="subscribeAlert" href="https://procomponents.ant.design/">
//           <FormattedMessage
//             id="pages.searchTable.subscribeAlert"
//             defaultMessage="Subscribe to alerts"
//           />
//         </a>,
//       ],
//     },
//   ];

//   return (
//     <PageContainer>
//       <ProTable<API.RuleListItem, API.PageParams>
//         headerTitle={intl.formatMessage({
//           id: 'pages.searchTable.title',
//           defaultMessage: 'Enquiry form',
//         })}
//         actionRef={actionRef}
//         rowKey="key"
//         // search={{
//         //   labelWidth: 120,
//         // }}
//         search = {false}
//         toolBarRender={() => [
//           <Button
//             type="primary"
//             key="primary"
//             onClick={() => {
//               handleModalVisible(true);
//             }}
//           >
//             <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
//           </Button>,
//         ]}
//         request={rule}
//         columns={columns}
//         rowSelection={{
//           onChange: (_, selectedRows) => {
//             setSelectedRows(selectedRows);
//           },
//         }}
//       />
//       {selectedRowsState?.length > 0 && (
//         <FooterToolbar
//           extra={
//             <div>
//               <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
//               <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
//               <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
//               &nbsp;&nbsp;
//               <span>
//                 <FormattedMessage
//                   id="pages.searchTable.totalServiceCalls"
//                   defaultMessage="Total number of service calls"
//                 />{' '}
//                 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
//                 <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
//               </span>
//             </div>
//           }
//         >
//           <Button
//             onClick={async () => {
//               await handleRemove(selectedRowsState);
//               setSelectedRows([]);
//               actionRef.current?.reloadAndRest?.();
//             }}
//           >
//             <FormattedMessage
//               id="pages.searchTable.batchDeletion"
//               defaultMessage="Batch deletion"
//             />
//           </Button>
//           <Button type="primary">
//             <FormattedMessage
//               id="pages.searchTable.batchApproval"
//               defaultMessage="Batch approval"
//             />
//           </Button>
//         </FooterToolbar>
//       )}
//       <ModalForm
//         title={intl.formatMessage({
//           id: 'pages.searchTable.createForm.newRule',
//           defaultMessage: 'New rule',
//         })}
//         width="400px"
//         visible={createModalVisible}
//         onVisibleChange={handleModalVisible}
//         onFinish={async (value) => {
//           const success = await handleAdd(value as API.RuleListItem);
//           if (success) {
//             handleModalVisible(false);
//             if (actionRef.current) {
//               actionRef.current.reload();
//             }
//           }
//         }}
//       >
//         <ProFormText
//           rules={[
//             {
//               required: true,
//               message: (
//                 <FormattedMessage
//                   id="pages.searchTable.ruleName"
//                   defaultMessage="Rule name is required"
//                 />
//               ),
//             },
//           ]}
//           width="md"
//           name="name"
//         />
//         <ProFormTextArea width="md" name="desc" />
//       </ModalForm>
//       <UpdateForm
//         onSubmit={async (value) => {
//           const success = await handleUpdate(value);
//           if (success) {
//             handleUpdateModalVisible(false);
//             setCurrentRow(undefined);
//             if (actionRef.current) {
//               actionRef.current.reload();
//             }
//           }
//         }}
//         onCancel={() => {
//           handleUpdateModalVisible(false);
//           if (!showDetail) {
//             setCurrentRow(undefined);
//           }
//         }}
//         updateModalVisible={updateModalVisible}
//         values={currentRow || {}}
//       />

//       <Drawer
//         width={600}
//         visible={showDetail}
//         onClose={() => {
//           setCurrentRow(undefined);
//           setShowDetail(false);
//         }}
//         closable={false}
//       >
//         {currentRow?.name && (
//           <ProDescriptions<API.RuleListItem>
//             column={2}
//             title={currentRow?.name}
//             request={async () => ({
//               data: currentRow || {},
//             })}
//             params={{
//               id: currentRow?.name,
//             }}
//             columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
//           />
//         )}
//       </Drawer>
//     </PageContainer>
//   );
// };

// export default TableList;




// export type TableListItem = {
//   key: number;
//   // name: string;
//   // containers: number;
//   // creator: string;
//   // status: string;
//   // createdAt: number;
//   // memo: string;
//   id: number;
//   title: string;
//   status: string
// };
// const tableListDataSource: TableListItem[] = [];

// // const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

// for (let i = 0; i < 5; i += 1) {
//   tableListDataSource.push({
//     key: i,
//     // name: 'AppName',
//     // containers: Math.floor(Math.random() * 20),
//     // creator: creators[Math.floor(Math.random() * creators.length)],
//     // status: valueEnum[Math.floor(Math.random() * 10) % 4],
//     // createdAt: Date.now() - Math.floor(Math.random() * 100000),
//     // memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
//     id: i,
//     title: Mock.Random.cparagraph(),
//     status: Math.random() > 0.3 ? Math.random() > 0.6 ? 'success' : 'processing' : 'error'
//   });
// }







const valueEnum = {
  processing: { text: '待办', status: 'info' },
  success: { text: '已完成', status: 'success' },
  error: { text: '已取消', status: 'error' },
};

const todoList = (props) => {
  const [modalVisible, handleModalVisible] = useState(false);
  const onChange = (id: number, status: string) => {
    props.setTodolist(id, status)
  }
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'id',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      width: 180,
      dataIndex: 'status',
      initialValue: 'all',
      render: (status) => {
        return <Alert message={valueEnum[status as string].text} type={valueEnum[status as string].status} showIcon></Alert>

      },
    },
    {
      title: '修改状态',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (text, record) => {
        const tags = [{
          status: 'processing',
          text: '待办',
          node: <a key="link" onClick={() => onChange(record.id, 'processing')}>待办</a>
        }, {
          status: 'success',
          text: '完成',
          node: <a key="link2" onClick={() => onChange(record.id, 'success')}>完成</a>
        }, {
          status: 'error',
          text: '取消',
          node: <a key="link3" onClick={() => onChange(record.id, 'error')}>取消</a>
        }
        ]
        return tags.filter(item => item.status !== record.status).map((item, i) => item.node)
      },
    },
  ];
  useEffect(props.getTodolist, [])

  const tableRef = useRef<ActionType>()
  return (
    <PageContainer>
      <ProTable<TableListItem>
        actionRef={tableRef}
        columns={columns}
        // request={(params, sorter, filter) => {
        //   // 表单搜索项会从 params 传入，传递给后端接口。
        //   console.log(params, sorter, filter);
        //   return Promise.resolve({
        //     data: tableListDataSource,
        //     success: true,
        //   });
        // }}
        dataSource={props.todoList}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        dateFormatter="string"
        headerTitle="待办事项"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,
          // <Button key="out">
          //   导出数据
          //   <DownOutlined />
          // </Button>,
          <Button type="primary" key="primary"
            onClick={() => {
              handleModalVisible(true)
            }}
          >
            <PlusOutlined />新建
          </Button>,
        ]}
      />
      {
        modalVisible ? <Modal
          title='新建待办事项'
          width="400px"
          visible={modalVisible}
          footer={null}
          onCancel={() => {
            handleModalVisible(false)
          }}

        >
          <ProForm
            onFinish={async ({ desc }) => {
              handleModalVisible(false);
              props.addTodoList(desc)

            }}
          >
            <ProFormTextArea width="md" name="desc"
              label='待办事项'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="ruleName"
                      defaultMessage="必填"
                    />
                  ),
                },
              ]}
            ></ProFormTextArea>

          </ProForm>
        </Modal> : ''
      }



    </PageContainer>
  );
};


function mapStateToProps(state) {
  return {
    todoList: state.todoList
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getTodolist() {
      dispatch({
        type: 'todoList/getState'
      })
    },
    setTodolist(id: number, status: string) {
      dispatch({
        type: 'todoList/setState',
        payload: {
          id,
          status
        }
      })
    },
    addTodoList(title: string) {
      dispatch({
        type: 'todoList/addState',
        payload: title
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(todoList)
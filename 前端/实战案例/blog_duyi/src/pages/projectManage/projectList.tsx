import { deleteProject, getProjectList } from "@/services/project";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table, Tooltip, Image, Descriptions, List, message } from "antd";
import { useEffect, useState } from "react";
import ModifyProject from "./modifyProject";

export default function projectList() {

  const [projectList, setProjectList] = useState([]);
  const [deleteId, setDeleteId] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    getProjectList().then(res => setProjectList(res.data))
  }, [])

  function edit(record: any): void {
    setIsModalVisible(true);

    console.log("🚀 ~ file: projectList.tsx ~ line 16 ~ edit ~ record", record)
  }


  const confirm = () => {
    deleteProject(deleteId).then(res => {
      if (res.data) message.success('删除成功');
      getProjectList().then(res => setProjectList(res.data))
    })
    message.error('删除失败');
  }


  const columns = [
    {
      title: '序号',
      align: 'center',
      render: (_: any, $: any, index: any) => index + 1,
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '项目描述',
      align: 'center',
      render: (_: any, record: any) => (
        <List
          bordered
          dataSource={record.description}
          renderItem={(item) => <List.Item>
            {item}
          </List.Item>} />
      )
    },
    {
      title: '项目地址',
      dataIndex: 'url',
      align: 'center',
      render: (text: string) => <a href={text}>{text}</a>
    },
    {
      title: 'github地址',
      dataIndex: 'github',
      align: 'center',
      render: (text: string) => <a href={text}>{text}</a>
    },
    {
      title: '预览图',
      dataIndex: 'thumb',
      align: 'center',
      render: (text: string) => <Image width={100} height={100} src={text}></Image>
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', justifyContent: "space-around" }}>
          <Tooltip title="编辑">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { edit(record) }} />
          </Tooltip>
          <Popconfirm
            title="此操作将永久删除该文章, 是否继续?"
            onConfirm={confirm}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <Button type="primary" shape="circle" danger icon={<DeleteOutlined />} onClick={() => { setDeleteId(record.id) }} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    }
  ];
  return  <>
  <Table dataSource={projectList} columns={columns} bordered />;
  <ModifyProject isModalVisible={isModalVisible} handleCancel={() => setIsModalVisible(false)}/>
  </>
}


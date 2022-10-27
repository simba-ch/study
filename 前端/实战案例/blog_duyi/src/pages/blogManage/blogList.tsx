import { deleteBlog, getBlog } from "@/services/blog";
import { Button, message, Popconfirm, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
export default function addBlog() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  })
  const [deleteId, setDeleteId] = useState('')
  const [data, setData] = useState([])
  useEffect(() => {
    getBlog().then(res => {
      setData(res.data.rows)
      setPagination(pagination => ({ ...pagination, total: res.total, showQuickJumper: true }))
    })
  }, [])
  const confirm = () => {
    deleteBlog(deleteId).then(res => {
      if (res.data) message.success('删除成功');
      getBlog().then(res => {
        setData(res.data.rows)
        setPagination(pagination => ({ ...pagination, total: res.total, showQuickJumper: true }))
      })
    })
    message.error('删除失败');
  }
  const columns = [
    {
      title: '序号',
      render: (_: any, $: any, index: number) => index + 1,
      align: 'center'
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      align: 'center'
    },
    {
      title: '文章描述',
      dataIndex: 'description',
      align: 'center'
    },
    {
      title: '浏览次数',
      dataIndex: 'scanNumber',
      align: 'center'
    },
    {
      title: '评论量',
      dataIndex: 'commentNumber',
      align: 'center'
    },
    {
      title: '文章分类',
      render: (_: any, record: any) => record?.category?.name,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      render: (time: number) => moment(time).format('Y-MM-DD HH:mm:ss'),
      align: 'center'
    },
    {
      title: '操作',
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', justifyContent: "space-around" }}>
          <Tooltip title="编辑">
            <Button type="primary" shape="circle" icon={<EditOutlined />} href={`/blogManage/editBlog/${record.id}`} />
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
      align: 'center'
    }
  ];
  return <Table columns={columns} dataSource={data} pagination={pagination} bordered />
}
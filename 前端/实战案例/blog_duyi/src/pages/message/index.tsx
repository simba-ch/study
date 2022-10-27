import { Button, message, Popconfirm, Table, Tooltip, Image } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteMessage, getMessage } from "@/services/message";
export default function addBlog() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  })
  const [deleteId, setDeleteId] = useState('')
  const [data, setData] = useState([])
  const pageChange = (pageNumber: number) => {
    setPagination(pagination => ({
      ...pagination,
      current: pageNumber
    }))
    getMessage(pageNumber, pagination.pageSize).then(res => {
      setData(res.data.rows)
    })

  }
  useEffect(() => {
    getMessage(pagination.current, pagination.pageSize).then(res => {
      setData(res.data.rows)
      setPagination(pagination => ({ ...pagination, total: res.data.total, showQuickJumper: true, onChange: pageChange }))
    })
  }, [])
  const confirm = () => {
    deleteMessage(deleteId).then(res => {
      if (res.data) message.success('删除成功');
      getMessage(pagination.current, pagination.pageSize).then(res => {
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
      title: '留言昵称',
      dataIndex: 'nickname',
      align: 'center'
    },
    {
      title: '留言内容',
      dataIndex: 'content',
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      render: (time: number) => moment(time).format('Y-MM-DD HH:mm:ss'),
      align: 'center'
    },
    {
      title: '预览图',
      dataIndex: 'avatar',
      render: (src: string) => <Image
        width={100}
        height={100}
        src={src}
      />,
      align: 'center'
    },
    {
      title: '操作',
      render: (_: any, record: any) => (

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

      ),
      align: 'center'
    }
  ];
  return <Table columns={columns} dataSource={data} pagination={pagination} bordered />
}
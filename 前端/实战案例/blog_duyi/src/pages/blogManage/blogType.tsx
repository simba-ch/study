import { addBlogType, deleteBlogType, getAllBlogType, putBlogType } from '@/services/blog';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm, Select, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
const { Option } = Select
export default function typeList() {
  const [order, setOrder] = useState('1');
  const [name, setName] = useState('');
  const [allBlogType, setAllBlogType] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [blogTypeInfo, setBlogTypeInfo] = useState({})
  const [form] = Form.useForm();
  useEffect(() => {
    getAllBlogType().then(res => setAllBlogType(res.data))
  }, [])

  const handleAddBlog = () => {
    addBlogType({ order, name }).then(res => {
      if (res.code === 0 && res.data) {
        message.success('添加成功');
        setOrder('');
        setName('');
        getAllBlogType().then(res => setAllBlogType(res.data))
      }
    })
  }

  const confirmDelete = (id: string) => {
    deleteBlogType(id).then(res => {
      if (res.code === 0) {
        message.success(`删除成功,影响了${res.data}篇文章`);
        getAllBlogType().then(res => setAllBlogType(res.data))
      }
    })
  }

  const editBlogType = (record: any) => {
    setBlogTypeInfo(record)
    setIsModalVisible(true)
    form.setFieldsValue({ name: record?.name, order: record?.order })
  }

  const onFinish = (value: { name: string, order: string }) => {
    setIsModalVisible(false);
    putBlogType(blogTypeInfo?.id, value).then(res => {
      if (res.code === 0 && res.data) {
        message.success(`修改分类成功，影响了${res.data.articleCount}`);
        getAllBlogType().then(res => setAllBlogType(res.data))
      }
    })
  }

  const columns = [
    {
      title: '序号',
      render: (_: any, $: any, i: number) => i + 1,
      align: 'center'
    },
    {
      title: '文章分类',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '文章数量',
      dataIndex: 'articleCount',
      align: 'center'
    },
    {
      title: '操作',
      render: (_: any, record: any) => (
        <div>
          <Tooltip title="编辑">
            <Button type="primary" shape="circle" icon={<EditOutlined />} style={{ marginRight: '20px' }} onClick={() => editBlogType(record)} />
          </Tooltip>
          <Popconfirm
            title={(<div> 此操作将永久删除该分类并且该分类的文章会被置为<b>‘未分类’</b>状态, 是否继续?</div>)}
            onConfirm={() => confirmDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <Button shape="circle" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
      align: 'center'
    }
  ]
  return (
    <>
      <Input.Group compact>
        <Select
          value={order}
          onChange={setOrder}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
        </Select>
        <Input
          placeholder="请输入文章分类，左边选择分类等级"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '30%'
          }}
        />
        <Button type='primary' style={{ marginLeft: '20px' }} onClick={handleAddBlog}>添加</Button>
      </Input.Group>
      <Table dataSource={allBlogType} columns={columns} bordered style={{ marginTop: '50px' }} />;
      <Modal title="修改信息" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} destroyOnClose footer={null}>
        <Form
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="文章分类"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}

          >
            <Input />
          </Form.Item>

          <Form.Item
            label="分类等级"
            name="order"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
              确认
            </Button>
            <Button style={{ marginRight: '20px', float: 'right' }} onClick={() => { setIsModalVisible(false) }}>
              取消
            </Button>

          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

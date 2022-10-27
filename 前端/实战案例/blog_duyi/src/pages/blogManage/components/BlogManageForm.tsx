import Editor from '@/components/Editor';
import { getAllBlogType, getOneBlog, modifyBlog, publishBlog } from '@/services/blog';
import { Button, Form, Input, Select, message } from 'antd'
import { useEffect, useState } from 'react';
import { history } from "umi";
import { withRouter } from 'umi';
import Upload from "../../../components/Upload";
const { Option } = Select;
function BlogManageForm(props: any) {
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [createDate, setCreateDate] = useState('')
  const onFinish = async (values: any) => {
    setLoading(true)
    if (props.type !== 'edit') {
      publishBlog({
        ...values,
        createDate: Date.now()
      }).then(res => {
        setLoading(false)
        if (res.code === 0 && res.data) {
          message.success('添加文章成功');
          history.push('/blogManage/blogList')
        }
      })
    } else if (props.type === 'edit') {

      modifyBlog(props.match.params.id, {
        ...values,
        createDate
      }).then(res => {
        setLoading(false)
        if (res.code === 0 && res.data) {
          message.success('修改文章成功');
          history.push('/blogManage/blogList')
        }
      })
    }


  }
  useEffect(() => {
    getAllBlogType().then(res => setCategory(res.data))
    if (props.type === 'edit') getOneBlog(props.match.params.id).then(res => {
      const { data } = res
      if (res.code === 0 && data) {
        form.setFieldsValue({
          title: data.title,
          description: data.description,
          htmlContent: data.htmlContent,
          categoryId: data.category?.id
        })
        setImageUrl(data.thumb)
        setCreateDate(data.createDate)
      }
    })
  }, [])


  return (
    <Form
      onFinish={onFinish}
      autoComplete="off"
      layout='vertical'
      form={form}
    >
      <Form.Item
        label="文章标题"
        name="title"
        rules={[{ required: true, message: '请输入文章标题' }]}
      >
        <Input placeholder='请输入文章标题' />
      </Form.Item>

      <Form.Item
        label="文章描述"
        name="description"
        rules={[{ required: true, message: '请输入文章描述' }]}
      >
        <Input.TextArea placeholder='请输入文章描述' />
      </Form.Item>
      <Form.Item
        label="文章头像"
        name="thumb"
        rules={[{ required: true, message: '请添加文章头像' }]}
      >
        <Upload imageUrl={imageUrl} changeUrl={setImageUrl} />
      </Form.Item>
      <Form.Item
        label="文章编辑"
        name="htmlContent"
        rules={[{ required: true, message: '请编辑文章内容' }]}
      >
        <Editor />
      </Form.Item>
      <Form.Item
        label="文章分类"
        name="categoryId"
        rules={[{ required: true, message: '请选择文章分类' }]}
      >
        <Select
          style={{ width: 200 }}
          placeholder="请选择分类"
        >
          {category.map(item => (<Option key={item?.id} value={item?.id}>{item?.name}</Option>))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {loading ? '上传中' : '发布文章'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(BlogManageForm)
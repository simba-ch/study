import {getOneBlog} from '@/services/blog';
import { createProject, modifyProject } from '@/services/project';
import { orderHelper } from '@/util/temp';
import { Button, Form, Input, Select, message } from 'antd'
import { useEffect, useState } from 'react';
import { history } from "umi";
import { withRouter } from 'umi';
import Upload from "../../../components/Upload";
const { Option } = Select;
function BlogManageForm(props: any) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const arr = orderHelper(5)
  const onFinish = async (values: any) => {
    setLoading(true)
    if (props.type === 'create') {
      createProject({
        ...values,
        description: values.description.split(',')
      }).then(res => {
        setLoading(false)
        if (res.code === 0 && res.data) {
          message.success('添加项目成功');
          history.push('/projectManage/projectList')
        }
      })
    } else if (props.type === 'edit') {
      modifyProject(props.match.params.id, {
        ...values,
        description: values.description.split(',')
      }).then(res => {
        setLoading(false)
        if (res.code === 0 && res.data) {
          message.success('修改项目成功');
          history.push('/projectManage/projectList')
        }
      })
    }
  }

  // 没有接口
  // useEffect(() => {
  //   if (props.type === 'edit') getOneBlog(props.match.params.id).then(res => {
  //     const { data } = res
  //     if (res.code === 0 && data) {
  //       form.setFieldsValue({
  //         title: data.title,
  //         description: data.description,
  //         htmlContent: data.htmlContent,
  //         categoryId: data.category?.id
  //       })
  //       setImageUrl(data.thumb)
  //     }
  //   })
  // }, [])


  return (
    <Form
      onFinish={onFinish}
      autoComplete="off"
      layout='vertical'
      form={form}
    >
      <Form.Item
        label="项目名称"
        name="name"
        rules={[{ required: true, message: '请输入项目名称' }]}
      >
        <Input placeholder='请输入项目名称' />
      </Form.Item>

      <Form.Item
        label="项目描述（可填写多个描述，以英文逗号分隔）"
        name="description"
        rules={[{ required: true, message: '项目描述（可填写多个描述，以英文逗号分隔）' }]}
      >
        <Input placeholder='项目描述（可填写多个描述，以英文逗号分隔）' />
      </Form.Item>
      <Form.Item
        label="项目地址"
        name="url"
        rules={[{ required: true, message: '请输入项目地址' }]}
      >
        <Input placeholder='请输入项目地址' />
      </Form.Item>
      <Form.Item
        label="github地址"
        name="github"
        rules={[{ required: true, message: 'github地址' }]}
      >
        <Input placeholder='github地址' />
      </Form.Item>
      <Form.Item
        label="预览图"
        name="thumb"
        rules={[{ required: true, message: '请添加预览图' }]}
      >
        <Upload imageUrl={imageUrl} changeUrl={setImageUrl} />
      </Form.Item>
      <Form.Item
        label="项目排序"
        name="order"
        rules={[{ required: true, message: '请选择项目排序' }]}
      >
        <Select
          style={{ width: 200 }}
          placeholder="请选择项目排序"
        >
          {arr.map(item => <Option key={item} value={item}>{item}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {loading ? '上传中' : '发布项目'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(BlogManageForm)
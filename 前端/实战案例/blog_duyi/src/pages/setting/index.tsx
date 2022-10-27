import { getUserSet, modifyUserInfo } from '@/services/user';
import { Button, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react';
import Upload from "../../components/Upload";
function BlogManageForm() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [qqQrCodeUrl, setQqQrCodeUrl] = useState('');
  const [weixinQrCodeUrl, setWeixinQrCodeUrl] = useState('');

  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [editing, setEditing] = useState(false);
  const [useInfo, setUseInfo] = useState({});

  useEffect(() => {
    getUserSet().then(res => {
      setUseInfo(res.data);
      setFieldsValue(res.data)
    })
  }, [])

  function setFieldsValue(data: any) {
    form.setFieldsValue(data)
    setAvatarUrl(data.avatar)
    setFaviconUrl(data.favicon)
    setQqQrCodeUrl(data.qqQrCode)
    setWeixinQrCodeUrl(data.weixinQrCode)
  }

  const onFinish = async (values: any) => {
    setLoading(true)
    modifyUserInfo({
      ...values,
    }).then(res => {
      setLoading(false)
      if (res.code === 0 && res.data) {
        setEditing(false);
        message.success('修改项目成功');
      }
    })

  }

  function handleCancel() {
    setEditing(false);
    setFieldsValue(useInfo)
  }


  return (
    <Form
      onFinish={onFinish}
      autoComplete="off"
      form={form}
      layout="horizontal"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 14, }}
      size='large'
    >
      <Form.Item
        label="博客名称"
        name="siteTitle"
        rules={[{ required: true, message: '请输入博客名称' }]}
      >
        <Input placeholder='请输入博客名称' disabled={!editing} />
      </Form.Item>
      <Form.Item
        label="博客头像"
        name="avatar"
        rules={[{ required: true, message: '请添加博客头像' }]}
      >
        <Upload imageUrl={avatarUrl} changeUrl={setAvatarUrl} disabled={!editing} />
      </Form.Item>
      <Form.Item
        label="网站图标"
        name="favicon"
        rules={[{ required: true, message: '请添加网站图标' }]}
      >
        <Upload imageUrl={faviconUrl} changeUrl={setFaviconUrl} disabled={!editing} />
      </Form.Item>
      <Form.Item
        label="github名称"
        name="githubName"
        rules={[{ required: true, message: '请输入github名称' }]}
      >
        <Input placeholder='请输入github名称' disabled={!editing} />
      </Form.Item>
      <Form.Item
        label="github地址"
        name="github"
        rules={[{ required: true, message: '请输入github地址' }]}
      >
        <Input placeholder='请输入github地址' disabled={!editing} />
      </Form.Item>
      <Form.Item
        label="QQ"
        name="qq"
        rules={[{ required: true, message: '请输入qq号' }]}
      >
        <Input placeholder='请输入qq号' disabled={!editing} />
      </Form.Item>
      <Form.Item
        label="QQ二维码"
        name="qqQrCode"
        rules={[{ required: true, message: '请添加QQ二维码' }]}
      >
        <Upload imageUrl={qqQrCodeUrl} changeUrl={setQqQrCodeUrl} disabled={!editing} />
      </Form.Item>
      <Form.Item
        label="微信"
        name="weixin"
        rules={[{ required: true, message: '请输入微信号' }]}
      >
        <Input placeholder='请输入微信号' disabled={!editing} />
      </Form.Item>
      <Form.Item
        label="微信二维码"
        name="weixinQrCode"
        rules={[{ required: true, message: '请添加微信二维码' }]}
      >
        <Upload imageUrl={weixinQrCodeUrl} changeUrl={setWeixinQrCodeUrl} disabled={!editing} />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="mail"
        rules={[{ required: true, message: '请输入邮箱地址' }]}
      >
        <Input placeholder='请输入邮箱地址' disabled={!editing} />
      </Form.Item>
      <Form.Item
        label="备案号"
        name="icp"
        rules={[{ required: true, message: '请输入备案号' }]}
      >
        <Input placeholder='请输入备案号' disabled={!editing} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 2 }}>
        {editing ? <div>
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            {loading ? '上传中' : '确认修改'}
          </Button>
          <Button disabled={loading} style={{ marginLeft: '20px' }} onClick={handleCancel}>
            取消
          </Button>
        </div>
          : <Button type="primary" onClick={() => setEditing(true)}>
            修改信息
          </Button>}
      </Form.Item>
    </Form>
  )
}

export default BlogManageForm
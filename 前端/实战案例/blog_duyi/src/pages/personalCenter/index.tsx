import { changeUserInfo } from '@/services/user';
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { Col, message, Row, Space } from 'antd'
import { useModel, history } from 'umi';

export default function personalCenter() {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { name, loginId } = initialState?.currentUser;

  async function onFinish(values: any) {
    const { oldLoginPwd, loginPwd, confirmLoginPwd } = values;
    if (loginPwd === confirmLoginPwd) {
      changeUserInfo({ name, loginId, loginPwd, oldLoginPwd }).then(res => {
        if (res.code === 0 && res.data) {
          message.success('修改成功');
          setInitialState({
            ...initialState,
            currentUser: res.data
          })
          localStorage.removeItem('BLOG_DUYI');
          history.push('/user/login')
        }
      })
    } else {
      message.info('请确认新密码与确认密码一致')
    }
  }
  return <div style={{ width: '50%', margin: '50px auto' }} >
    <Row>
      <Col span={14} offset={4}>
        <div style={{ fontWeight: 700, fontSize: ' 1rem', marginBottom: '20px' }}>修改密码</div>
      </Col>
    </Row>

    <ProForm
      autoFocusFirstInput
      layout='horizontal'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      submitter={{
        render: (props, doms) => <Row>
          <Col span={14} offset={8}>
            <Space>{doms}</Space>
          </Col>
        </Row>
      }}
      onFinish={onFinish}
    >
      <ProFormText.Password width='md' placeholder="请输入旧密码" label="旧密码" name="oldLoginPwd" rules={[
        {
          required: true,
          message: '请输入旧密码!',
        },
      ]} />
      <ProFormText.Password width='md' placeholder="请输入新密码" label="新密码" name="loginPwd" rules={[
        {
          required: true,
          message: '请输入新密码!',
        },
      ]} />
      <ProFormText.Password width='md' placeholder="请输入新密码" label="确认新密码" name="confirmLoginPwd" rules={[
        {
          required: true,
          message: '请确认新密码!',
        },
      ]} />
    </ProForm>
  </div >
}

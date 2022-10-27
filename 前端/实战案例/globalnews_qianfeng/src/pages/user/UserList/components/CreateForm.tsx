import React, { useEffect, useRef, useState } from 'react';
import { ModalForm, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { TableListItem } from '../data';
import { ActionType } from '@ant-design/pro-table';
import { addUser, getRegions, getRoles, modifyUser } from '@/services/user';
import { message } from 'antd';

type type = '添加' | '更新'
type CreateFormProps = {
  type?: type;
  editor?: TableListItem | {};
  modalVisible: boolean;
  handleModalVisible: (isVisible: boolean) => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { type, modalVisible, handleModalVisible, actionRef, editor } = props;
  const [region, setRegion] = useState({})
  const [role, setRole] = useState({})
  const [isSUser, setIsSUser] = useState(false)
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    getRegions().then((res: any) => {
      const region = {}
      res.forEach((item: any) => region[item.id] = { text: item.title });
      setRegion(region)
    })
    getRoles().then((res: any) => {
      const role = {}
      res.forEach((item: any) => role[item.id] = { text: item.roleName });
      setRole(role)
    })
  }, [])
  useEffect(() => {
    if (type === '更新') {
      if (editor?.roleId === 1) setIsSUser(true)
      else setIsSUser(false);
      formRef.current?.setFieldsValue({
        username: editor?.username,
        password: editor?.password,
        region: editor?.region === '' ? '全球' : editor?.region,
        roleId: editor?.roleId?.toString()
      })

    }
  }, [editor])

  async function onFinish(value: any) {
    setIsSUser(false);
    const user = {
      ...value,
      roleState: true,
      default: false,
      region: value.region === '全球' ? '' : region[value.region].text
    }
    console.log("🚀 ~ file: CreateForm.tsx ~ line 52 ~ onFinish ~ user", user)

    let success
    if (type === '更新') {
      success = await modifyUser(editor?.id, user as TableListItem);
    } else {
      success = await addUser(user as TableListItem);
    }

    if (success) {
      message.success(type === '更新' ? type : '确定' + '成功')
      handleModalVisible(false);
      formRef.current?.resetFields(['username']);
      if (actionRef.current) {
        actionRef.current?.reload();
      }
    }
  }


  return (
    <ModalForm
      formRef={formRef}
      title={`${type ?? '添加'}用户`}
      // modalProps={
      //   { destroyOnClose: true }
      // }
      visible={modalVisible}
      onVisibleChange={handleModalVisible}
      onFinish={onFinish}

      submitter={
        {
          submitButtonProps: {
            children: type === '更新' ? type : '确定'
          }
        }
      }

    >
      <ProFormText
        label="用户名"
        rules={[
          {
            required: true,
            message: '用户名为必填项',
          },
        ]}
        name="username"
        placeholder="请输入用户名"
      />
      <ProFormText.Password
        label="密码"
        rules={[
          {
            required: true,
            message: '密码为必填项',
          },
        ]}
        name="password"
        placeholder="请输入密码"
      />
      <ProFormSelect
        valueEnum={region}
        label="区域"
        name="region"
        rules={[
          {
            required: true,
            message: '区域为必填项',
          },
        ]}
        placeholder="请输入区域"
        disabled={isSUser}
      />
      <ProFormSelect
        valueEnum={role}
        label="角色"
        name="roleId"
        rules={[
          {
            required: true,
            message: '角色为必填项',
          },
        ]}
        placeholder="请输入角色"
        fieldProps={{
          onChange: (value: string) => {
            if (value === '1') {
              setIsSUser(true);
              formRef.current?.setFieldsValue({
                region: '全球'
              })
            } else {
              setIsSUser(false);
              formRef.current?.getFieldValue('region') === '全球' &&
                formRef.current?.setFieldsValue({
                  region: undefined
                })
            }
          }
        }}

      />
    </ModalForm >
  );
};

export default CreateForm;

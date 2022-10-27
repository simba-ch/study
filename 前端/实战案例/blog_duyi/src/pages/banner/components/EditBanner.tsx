import { Button, Col, Form, Input, Modal, Row } from 'antd';
import Upload from "@/components/Upload";
import { useEffect, useState } from 'react'
import { getBanner } from '@/services/banner';
export default function EditBanner(props: any) {
  const [current, setCurrent] = useState({})
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("🚀 ~ file: index.tsx ~ line 7 ~ onFinish ~ values", values)
  }
  useEffect(() => {
    getBanner().then(res => {
      const current = res.data.find((item: any) => item.id === props.banner.id)
      if (!current) return;
      setCurrent(current);
      form.setFieldsValue({
        title: current.title,
        description: current.description
      })
    })
  }, [props.banner])

  return <Modal
    title="修改信息"
    visible={props.isModalVisible}
    onCancel={props.handleCancel}
    destroyOnClose
    footer={null}>
    <Form
      onFinish={onFinish}
      autoComplete="off"
      layout='vertical'
      form={form}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题！' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="描述"
        name="description"
        rules={[{ required: true, message: '请输入描述！' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Row>
        <Col span={12}>
          <Form.Item
            label="中图"
            name="midImg"
            rules={[{ required: true, message: '请添加中图！' }]}
          >
            <Upload
              imageUrl={current.midImg}
              changeUrl={(url: string) => {
                setCurrent((current) => ({
                  ...current,
                  midImg: url
                }))
              }} ></Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="大图"
            name="bigImg"
            rules={[{ required: true, message: '请添加大图！' }]}
          >
            <Upload
              imageUrl={current.bigImg}
              changeUrl={(url: string) => {
                setCurrent((current) => ({
                  ...current,
                  bigImg: url
                }))
              }} ></Upload>
          </Form.Item>
        </Col>
      </Row>


      <Form.Item>
        <Button style={{ marginRight: '20px' }} onClick={props.handleCancel}>
          取消
        </Button>
        <Button type="primary" htmlType="submit" onClick={props.handleCancel}>
          确定
        </Button>
      </Form.Item>
    </Form>
  </Modal >
}

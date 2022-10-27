import { Modal } from 'antd';
// import './modifyProject.less'
export default function modifyProject(props: any) {


  return <Modal title="修改项目信息"
    visible={props.isModalVisible}
    onCancel={props.handleCancel}
    footer={null}
  >
  </Modal>
}

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd'
const { confirm } = Modal
export default function DeleteModal(record: any, onOk: Function, onCancel?: Function) {
  confirm({
    title: '你确定删除吗？',
    icon: <ExclamationCircleOutlined />,
    onOk() {
      onOk(record);
    },
    onCancel() {
      onCancel?.(record)
    },
  });
}


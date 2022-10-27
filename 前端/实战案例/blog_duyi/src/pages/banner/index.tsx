import { getBanner } from '@/services/banner';
import { EditFilled } from '@ant-design/icons';
import { Table, Image, Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react'
import EditBanner from './components/EditBanner';

export default function banner() {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [banner, setBanner] = useState({})

  useEffect(() => {
    getBanner().then(res => setDataSource(res.data))
  }, [])
  const handleVisible = () => {
    setIsModalVisible(isModalVisible => !isModalVisible)
  }
  const edit = (record: any) => {
    handleVisible()
    setBanner(record)
  }
  const columns = [
    {
      title: '序号',
      key: 'index',
      align: 'center',
      render: (_: any, $: any, index: any) => index + 1,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: '图片预览',
      key: 'image',
      align: 'center',
      render: (_: any, record: any) => {
        return <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div>中图</div>
            <Image
              width={100}
              height={100}
              src={"http://47.108.151.76" + record.midImg}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div>大图</div>
            <Image
              width={100}
              height={100}
              src={"http://47.108.151.76" + record.bigImg}
            />
          </div>
        </div>
      }
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      render: (_: any, record: any) => (
        <Tooltip title="编辑">
          <Button type="primary" shape="circle" icon={<EditFilled />} onClick={() => edit(record)} />
        </Tooltip>
      )
    },
  ];

  return <>
    <Table dataSource={dataSource} columns={columns} bordered />
    <EditBanner isModalVisible={isModalVisible} handleCancel={handleVisible} banner={banner}></EditBanner>
  </>
}

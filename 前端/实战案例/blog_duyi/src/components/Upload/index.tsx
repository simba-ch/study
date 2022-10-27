import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'
import { handleUploadUrl } from '@/util/temp';
import { useEffect, useState } from 'react';
import { Upload } from 'antd';
function getBase64(img: Blob, callback: { (imageUrl: any): void; (arg0: string | ArrayBuffer | null): any; }) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default function upload({ imageUrl, changeUrl, onChange, ...props }: { imageUrl?: string, changeUrl?: Function, onChange?: Function, reset?: any }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (imageUrl && typeof onChange === 'function') onChange(imageUrl);
  }, [imageUrl])

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setLoading(false)
        if (typeof changeUrl === 'function') changeUrl(imageUrl);
        if (typeof onChange === 'function') onChange(imageUrl)
      });
    }
  }
  return <>
    <Upload
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
      {...props}
    >
      {imageUrl ? <img src={handleUploadUrl(imageUrl)} alt="avatar" style={{ width: '100%', height: '100%' }} /> : uploadButton}
    </Upload>

  </>
}

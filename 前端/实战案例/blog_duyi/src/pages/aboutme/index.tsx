import { getMeInfo, setMeInfo } from '@/services/about'
import { Button, Input, message } from 'antd'
import { useEffect, useState } from 'react'

export default function aboutme() {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState('')
  useEffect(() => {
    getMeInfo().then(res => setContent(res.data))
  }, [])


  function submitModify() {
    setEditing(false);
    setMeInfo(content).then(res => {
      if (res.code === 0 && res.data) {
        message.success('修改成功');
      }
    })
  }


  return <>
    <span style={{ fontWeight: 700 }}>简历地址</span><Input value={content} onChange={(e) => setContent(e.target.value)} disabled={!editing} style={{ margin: '0 0 20px 10px', width: '50%' }}></Input>
    {
      editing ? <div>
        <Button type="primary" style={{ marginRight: '15px' }} onClick={submitModify}>确认</Button>
        <Button type='primary' onClick={() => setEditing(false)}>取消</Button>
      </div>
        : <Button type="primary" style={{ display: 'block' }} onClick={() => { setEditing(true) }}>编辑</Button>
    }
  </>
}

import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import './index.less'
import { ContentUtils } from 'braft-utils'
import { Upload } from 'antd'

export default class BasicDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState("<p></p>"), // 设置编辑器初始内容
    type: 'create'
  }
  componentDidUpdate(prevProps) {

    if (this.props.value !== prevProps.value) {
      this.setState({
        type: 'edit',
        editorState: BraftEditor.createEditorState(this.props.value ?? "<p></p>")
      })
    }
  }

  handleChange = (editorState: any) => {
    this.setState({
      editorState: editorState,

    })
  }

  preview = () => {

    if (window.previewWindow) {
      window.previewWindow.close()
    }

    window.previewWindow = window.open()
    window.previewWindow.document.write(this.buildPreviewHtml())
    window.previewWindow.document.close()

  }

  buildPreviewHtml() {

    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container braft-output-content">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `

  }

  uploadHandler = (param) => {
    if (!param.file) {
      return false
    }
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [{
        type: 'IMAGE',
        url: 'https://img2.baidu.com/it/u=2090606195,1473750087&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      }])
    })

  }

  onBlur = () => {
    this.props.onChange(this.state.editorState.toHTML())
  }

  render() {

    const { editorState } = this.state
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview
      },
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={this.uploadHandler}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button type="button" className="control-item button upload-button" data-title="插入图片">
              插入图片
            </button>
          </Upload>
        )
      }
    ]

    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
            extendControls={extendControls}
            onBlur={this.onBlur}
          />
        </div>
      </div>
    )

  }

}
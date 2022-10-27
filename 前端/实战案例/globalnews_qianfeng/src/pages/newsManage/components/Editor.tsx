import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { uploadImage } from '@/services/news';
export default function RichEditor(props: any) {
  const { content, handleContent } = props;
  const editorRef = useRef(null);
  useEffect(() => {
    if (content && editorRef.current) {
      editorRef.current.setContent(content)
    }
  }, [])

  async function imageUploadHandler(blobInfo, succFun, failFun) {
    const formData = new FormData();

    formData.append('file', blobInfo.blob())
    const result = await uploadImage(formData)
    if (result.code === 200) {
      succFun(result['thumbnail_url'])
    } else {
      failFun('上传失败')
    }

  }
  function onBlur() {
    if (editorRef.current) {
      handleContent(editorRef.current.getContent())
    }
  }

  return <Editor
    apiKey='jy1bo3dhl23ubwtanu4imib8vj6g8x0anrpqerk4y8y3wo1o'
    onInit={(evt, editor: any) => editorRef.current = editor}
    onBlur={onBlur}
    init={{
      auto_focus: true,
      language: 'zh_CN',
      plugins: 'code print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions linkchecker emoticons advtable export',
      images_upload_handler: imageUploadHandler,
      statusbar: false,
      menubar: 'file edit view insert format tools table help',
      toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
      autosave_ask_before_unload: true,
      autosave_interval: '30s',
      autosave_prefix: '{path}{query}-{id}-',
      autosave_restore_when_empty: false,
      autosave_retention: '2m',
      image_advtab: true,
      importcss_append: true,
      templates: [
        { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
        { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
        { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
      ],
      template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
      template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
      height: 600,
      image_caption: true,
      // quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
      noneditable_noneditable_class: 'mceNonEditable',
      toolbar_mode: 'sliding',
      spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
      tinycomments_mode: 'embedded',
      content_style: '.mymention{ color: gray; }',
      contextmenu: 'link image imagetools table configurepermanentpen',
      a11y_advanced_options: true,

    }}
  />
}

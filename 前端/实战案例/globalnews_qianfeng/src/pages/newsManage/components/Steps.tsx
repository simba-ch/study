import React, { useRef, useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import { history, useModel } from "umi";
import ProForm, {
  StepsForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormDateRangePicker,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { Button, message, PageHeader } from 'antd';
import { getCategories } from '@/services/news';
import Editor from './Editor';


type StepsForm = {
  type: Type;
  title: '撰写新闻' | '更新新闻'

}

export default (props: StepsForm) => {
  const { type, title } = props
  const [content, setContent] = useState('')
  const formRef = useRef<ProFormInstance>();
  const { initialState } = useModel('@@initialState');

  async function getCategoriesMap() {
    const categories = await getCategories();
    return categories.map(category => ({ label: category.title, value: category.id }))


  }

  async function contentIsFinish() {
    if (content) return true;
    message.warn('请填写文章内容')
    return false;
  }
  // {
  //   "title": "千锋教育",
  //   "categoryId": 3,
  //   "content": "<p style=\"text-align:start;\"></p>\n<p style=\"margin-left:0px;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">      看到有同学在问大连的</span><a href=\"http://www.mobiletrain.org/\" target=\"_blank\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">千锋教育</span></a><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">校址在哪里，这里小千就来给大家介绍一下千锋教育和校区地址，给大家参考一下。</span></p>\n<p style=\"text-align:center;\"></p>\n<img src=\"http://upload.mobiletrain.org/2020/1218/1608271193504.jpg\" alt=\"u=313055993,4178527216&fm=26&gp=0\" style=\"height: ;width: \"/>\n<p style=\"margin-left:0px;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\"><strong>千锋教育大连校区地址</strong></span></p>\n<p style=\"margin-left:0px;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">      首先先给大家介绍一下千锋教育的大连校区地址，坐落在：辽宁省大连市高新园区爱贤街10号大连设计城A座901，联系和咨询电话可以拨打 400-811-9990，会有专人负责接待同学。</span></p>\n<p style=\"margin-left:0px;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\"><strong>千锋教育</strong></span></p>\n<p style=\"margin-left:0px;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">      再给大家简单介绍一下千锋教育，千锋教育是北京千锋互联科技有限公司旗下的品牌，开设了12大热门课程，并且每月都会更新最新的前沿技术。</span></p>\n<p style=\"margin-left:0px;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">      千锋教育一直秉持着“用良心做教育”的理念，在全国拥有上百家的合作高校，更是有超过20000家的合作企业。</span></p>\n<p style=\"margin-left:0px;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">      千锋教育总部设立在北京，目前在目前已在深圳、上海、郑州、广州、大连、武汉、成都、西安、杭州、青岛、重庆、长沙、哈尔滨、南京、太原建立分公司。</span></p>\n<p style=\"margin-left:0px;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">      千锋教育开设HTML5前端、Java、Python、全链路设计、云计算、软件测试、大数据、智能物联网、Unity游戏开发、Go语言开发、网络安全、互联网营销学科，并推出软考、Adobe认证、PMP认证、</span><a href=\"http://www.mobiletrain.org/topic/redhat/\" target=\"_blank\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">红帽RHCE认证</span></a><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">课程</span></p>\n<p style=\"margin-left:0px;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: 微软雅黑, \"PingFang SC;\">      最后欢迎大家来到千锋教育大连校区了解我们的培训课程，全程名师面授确保课程品质，还享受2周的免费试听不满意不缴费随时退学即可，赶紧来了解一下吧~~~~</span></p>\n<p style=\"text-align:start;\"><br>&nbsp;</p>\n",
  //   "region": "全球",
  //   "author": "admin",
  //   "roleId": 1,
  //   "auditState": 2,
  //   "publishState": 2,
  //   "createTime": 1615777743864,
  //   "star": 1030,
  //   "view": 2031,
  //   "id": 1,
  //   "publishTime": 1615778496314
  //   }

  async function handleSubmit(value: any) {
    const {region,username,roleId} = initialState?.currentUser;
    console.log("🚀 ~ file: Steps.tsx ~ line 45 ~ handleSubmit ~ initialState", initialState)
    console.log("🚀 ~ file: Steps.tsx ~ line 44 ~ handleSubmit ~ value", value)
    console.log(typeof content)
  }


  return (
    <ProCard
      title={<PageHeader
        onBack={() => history.goBack()}
        title={title}
      />}
    >

      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={handleSubmit}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
          layout:'horizontal'
        }}
      >
        <StepsForm.StepForm
          title="基本信息"
          stepProps={{
            description: '新闻标题，新闻分类',
          }}
          colon={true}
          layout='horizontal'
        >

          <ProFormText
            name="title"
            label="新闻标题"
            placeholder="请输入新闻标题"
            rules={[{ required: true }]}
          />
          <ProFormSelect
            name="categoryId"
            label="新闻分类"
            placeholder="请选择新闻分类"
            rules={[{ required: true }]}
            request={getCategoriesMap}
          
          />


        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          title="新闻内容"
          stepProps={{
            description: '新闻主体内容',
          }}
          onFinish={contentIsFinish}
        >
          <Editor content={content} handleContent={setContent} />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          title="新闻提交"
          stepProps={{
            description: '保存草稿或者提交审核',
          }}
        >
          <ProFormSelect
            name="select"
            label="新闻提交"
            initialValue='draft'
            valueEnum={{
              draft: '保存到草稿箱',
              audit: '提交审核',
            }}
            placeholder='请选择保存到草稿箱或者提交审核'
            rules={[{ required: true, message: '请选择保存到草稿箱或者提交审核' }]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard >
  );
};
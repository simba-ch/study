'use strict';
const AlipaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, config } = this;

    const alipaySdk = new AlipaySdk({
      /** 支付宝网关 **/
      gateway: 'https://openapi.alipaydev.com/gateway.do',

      /** 应用id，如何获取请参考：https://opensupport.alipay.com/support/helpcenter/190/201602493024 **/
      appId: '2021000118663056',

      /** 应用私钥，密钥格式为pkcs1，如何获取私钥请参考：https://opensupport.alipay.com/support/helpcenter/207/201602469554  **/
      privateKey: config.privateKey,

      /** 支付宝公钥，如何获取请参考：https://opensupport.alipay.com/support/helpcenter/207/201602487431 **/
      alipayPublicKey: config.alipayPublicKey,

      /** 签名算法类型 **/
      signType: 'RSA2',
    });

    const formData = new AlipayFormData();
    /** 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url;调用setMethod 并传入post，则返回from表单（不调用setMethod默认为post） **/
    formData.setMethod('get');
    const date = new Date();
    formData.addField('bizContent', {
      /** 商户订单号,商户自定义，需保证在商户端不重复，如：20200612000001 **/
      OutTradeNo: `${date.getFullYear()}${date.getMonth()}${date.getDate()}${Math.ceil((Math.random() * 1000000))}`,

      /** 销售产品码，固定值 FAST_INSTANT_TRADE_PAY **/
      ProductCode: 'FAST_INSTANT_TRADE_PAY',

      /** 订单标题 **/
      Subject: '订单标题',

      /** 订单金额，精确到小数点后两位 **/
      TotalAmount: '10000.00',

      /** 订单描述 **/
      Body: '订单描述',

      // extendParams: {
      //   /** 系统商编号，填写服务商的PID用于获取返佣，返佣参数传值前提：传值账号需要签约返佣协议，用于isv商户。 **/
      //   SysServiceProviderId: '2088621957236964',

      //   /** 花呗参数传值前提：必须有该接口花呗收款准入条件，且需签约花呗分期 **/
      //   /** 指定可选期数，只支持3/6/12期，还款期数越长手续费越高 **/
      //   HbFqNum: '3',

      //   /** 指定手续费承担方式，手续费可以由用户全承担（该值为0），也可以商户全承担（该值为100），但不可以共同承担，即不可取0和100外的其他值。 **/
      //   HbFqSellerPercent: '0',
      // },
    });
    /** 注：支付结果以异步通知为准，不能以同步返回为准，因为如果实际支付成功，但因为外力因素，如断网、断电等导致页面没有跳转，则无法接收到同步通知；**/
    /** 支付完成的跳转地址,用于用户视觉感知支付已成功，传值外网可以访问的地址，如果同步未跳转可参考该文档进行确认：https://opensupport.alipay.com/support/helpcenter/193/201602474937 **/
    formData.addField('returnUrl', 'http://localhost:7001/success');

    /** 异步通知地址，以http或者https开头的，商户外网可以post访问的异步地址，用于接收支付宝返回的支付结果，如果未收到该通知可参考该文档进行确认：https://opensupport.alipay.com/support/helpcenter/193/201602475759 **/
    // formData.addField('notifyUrl', 'http:localhost:7001');

    alipaySdk.exec(
      'alipay.trade.page.pay',
      {},
      { formData }
    ).then(res => {
      /** 获取接口调用结果，如果调用失败，可根据返回错误信息到该文档寻找排查方案：https://opensupport.alipay.com/support/helpcenter/84 **/
      console.log('🚀 ~ file: home.js ~ line 71 ~ HomeController ~ index ~ res', res);
      ctx.redirect(res);
      return res;
    });
    // ctx.redirect(result);
    // console.log('🚀 ~ file: home.js ~ line 69 ~ HomeController ~ index ~ result', result);
  }

  async success() {
    const { ctx } = this;
    console.log('++++++++++++++++++++++++');
    ctx.body = `支付成功${100}元`;
  }
}


module.exports = HomeController;


// /** 第三方调用（服务商模式），传值app_auth_token后，会收款至授权token对应商家账号，如何获传值app_auth_token请参考文档：https://opensupport.alipay.com/support/helpcenter/79/201602494631 **/
// // formData.addField('appAuthToken', '服务商模式，传入app_auth_token，如何获取请参考文档：https://opensupport.alipay.com/support/helpcenter/79/201602494631');

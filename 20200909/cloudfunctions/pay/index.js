// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//1，引入支付的三方依赖
const tenpay = require('tenpay');
//2，配置支付信息
const config = {
  appid: 'wx3a6f1738d8a3a32e', 
  mchid: '1603178257',//微信商户号
  partnerKey: '1805f462de4ae731bc51e20404ce26f7', //微信支付安全密钥
  notify_url: 'http://baidu.com', //支付回调网址,这里可以先随意填一个网址
  spbill_create_ip: '127.0.0.1' //这里填这个就可以
};

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    orderid,
    money
  } = event;
  //3，初始化支付
  const api = tenpay.init(config);

  let result = await api.getPayParams({
    out_trade_no: orderid,
    body: '商品简单描述',
    total_fee: money, //订单金额(分),
    openid: wxContext.OPENID,//付款用户的openid
  });
  return result;
}
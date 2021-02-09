// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let {userInfo,phoneNumber, id} = event
  const db = cloud.database()

  return new Promise((resolve, reject) => {
    db.collection('fh_order_list').add({
      data:{
        phone:phoneNumber,
        fhid:id
      },
    }
    ).then(res => {
     resolve({
        status : true,
        result : res
      })
    }).catch(err =>{
      resolve({
        result:err,
        status : false
      })
    })
  })

  


}
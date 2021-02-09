// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let {userInfo,phoneNumber, index} = event
  const db = cloud.database()
  const MAX_LIMIT = 100

  return new Promise((resolve, reject) => {
      db.collection('fh_list').skip(index * MAX_LIMIT).limit(MAX_LIMIT).get().then(res =>{

        db.collection('fh_order_list').where({
          phone : phoneNumber
        }).get().then(res1 => {
          let arr = res.data.map(function(value,index,array) {
            res1.data.forEach((item,index,array) => {
              if(item.fhid == value._id) {
                value.isOrder = true 
              }else {
                value.isOrder = false
              }
            })
            return value
          })


          resolve({
            status : true,
            result : arr
          })
        }).catch(err =>{
          resolve({
            result:err,
            status : false
          })
        })
      }).catch(err =>{
        resolve({
          result:err,
          status : false
        })
      })
  })
}
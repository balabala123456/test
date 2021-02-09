// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let {userInfo,phoneNumber,id} = event
  const db = cloud.database()

  db.collection('admin').where({
    phone:phoneNumber
  }).get().then(res => {
      if(res.data.length > 0){
        db.collection('fh_list').doc(id).remove({
          success: function(res) {
            return {
              result : '删除成功',
              status : true
            }
          },
          fail:function(error) {
            return {
              result : '删除失败',
              status : false
            }
          }
        })

      }else {
        return {
          result: '权限不足1',
          status : false
        }
     }
  })
}
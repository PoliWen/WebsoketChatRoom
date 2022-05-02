const ws = require('nodejs-websocket')

const TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MSG = 2

let count = 0 // 连接上来的用户总数
const server = ws.createServer((connect) => {
  console.log('有用户连接上来了')
  count++
  connect.userName = `用户${count}`
  broadCast({
    type: TYPE_ENTER,
    msg: `${connect.userName}进入了聊天室`,
    time: new Date().toLocaleTimeString()
  })
  connect.on('text', (data) => {
    broadCast({
      type: TYPE_MSG,
      msg: `${connect.userName}:${data}`,
      time: new Date().toLocaleTimeString()
    })
  })

  connect.on('close', () => {
    console.log('连接断开了')
    broadCast({
      type: TYPE_LEAVE,
      msg: `${connect.userName}离开了聊天室`,
      time: new Date().toLocaleTimeString()
    })
  })

  connect.on('error', () => {
    console.log('用户连接异常')
    count--
  })
})

// 给所有的用户发送消息
const broadCast = (msg) => {
  server.connections.forEach((conn) => {
    conn.send(JSON.stringify(msg))
  })
}
const port = '8080'
server.listen(port)

const app = require('express')()
const server = require('http').Server(app)

const port = 8080
app.get('/', (req, res) => {
  res.send('success')
})
server.listen(port, () => {
  console.log('127.0.0.1:8080')
})

const socket = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const users = [] // 记录已经登录的数据

socket.on('connection', (conn) => {
  conn.emit('welcome', '服务器连接成功')

  // 用户登录
  conn.on('login', (data) => {
    const user = users.find((item) => item.userName === data.userName)

    if (user) {
      conn.emit('loginError', { msg: '用户名已存在' })
      return
    }

    users.push(data)
    conn.emit('loginSuccess', data)
    socket.emit('addUser', `${data.userName}加入群聊`) // 通知所有用户有新用户进来了

    // 添加用户列表
    socket.emit('userList', users)

    conn.userName = data.userName
    conn.avator = data.avator
  })

  // 监听断开连接
  conn.on('disconnect', () => {
    console.log(`客户端断开连接`)
    // 把当前用户的信息从users中删除
    const index = users.findIndex((item) => item.userName === conn.usrName)
    users.splice(index, 1)
    socket.emit('delUser', {
      userName: conn.userName,
      avator: conn.avator
    })
    socket.emit('userList', users)
  })

  // 监听聊天消息
  conn.on('sendMsg', (data) => {
    socket.emit('recieveMsg', data)
  })
})

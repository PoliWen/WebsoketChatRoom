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
  console.log('新用户连接了')
  conn.emit('welcome', '服务器连接成功')
  conn.on('login', (data) => {
    const user = users.find((item) => item.userName === data.userName)
    console.log(data)

    if (user) {
      conn.emit('loginError', { msg: '用户名已存在' })
      return
    }

    users.push(data)
    conn.emit('loginSuccess', data)
    socket.emit('addUser', `${data.userName}加入群聊`) // 通知所有用户有新用户进来了

    // 添加用户列表
    socket.emit('userList', users)
  })
  conn.on('disconnect', () => {
    console.log(`客户端断开连接`)
  })
})

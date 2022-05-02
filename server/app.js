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

socket.on('connection', (conn) => {
  conn.emit('welcome', '服务器连接成功')
  conn.on('send', (data) => {
    console.log(`接收到客户端消息${data}`)
  })
  conn.on('disconnect', () => {
    console.log(`客户端断开连接`)
  })
})

<template>
  <h1>{{ msg }}</h1>
  <input type="text" placeholder="请输入你的内容" v-model="chatContent" />
  <button @click="sendMsg">发送消息</button>
  <div class="chat-room-container">
    <div class="socket-info">{{ info }}</div>
    <div class="chat-room">
      <ul>
        <li v-for="(item, index) in message" :key="index" :class="`type-${item.type}`">
          {{ item.msg }}--{{ item.time }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const socket = new WebSocket('ws://localhost:8080/')
const msg = ref('Welcome to Chat Room')
const chatContent = ref('')
const info = ref('')

// 连接服务成功
socket.addEventListener('open', () => {
  info.value = '连接服务器成功'
})

// 向服务器发送消息
const sendMsg = () => {
  socket.send(chatContent.value)
  chatContent.value = ''
}
// 接受服务器返回的数据
interface MsgItem {
  type: 0 | 1 | 2
  msg: string
  time: string
}
const message = ref<MsgItem[]>([])
socket.addEventListener('message', (e) => {
  message.value.push(JSON.parse(e.data))
})

document.onkeyup = (e) => {
  if (e.keyCode === 13) sendMsg()
}
</script>

<style lang="scss" scoped>
a {
  color: #42b983;
}
label {
  margin: 0 0.5em;
  font-weight: bold;
}
code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
.chat-room-container {
  padding: 15px;
  border: 1px solid #ddd;
  margin-top: 10px;
  border-radius: 6px;
}
.type-0 {
  color: green;
}
.type-1 {
  color: red;
}
.type-2 {
  color: blue;
}
</style>

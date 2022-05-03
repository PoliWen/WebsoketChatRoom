<template>
  <!-- <WebsocketDemo /> -->
  <login v-if="!isLogin" @submit="joinChat" />
  <chatRoomCon v-else />
</template>
<script setup lang="ts">
// import WebsocketDemo from '@/components/WebsocketDemo.vue'
import { ref, reactive } from 'vue'
import login from '@/components/Login.vue'
import chatRoomCon from '@/components/ChatRoom.vue'
import socket from '@/utils/socket'
import chatRoomStore from '@/store/chatRoom'

const chatRoom = chatRoomStore()

const isLogin = ref(false)
const joinChat = (user: any) => {
  socket.emit('login', {
    userName: user.userName,
    avator: user.avator
  })
}

socket.on('loginError', (data: any) => {
  alert(data.msg)
})

socket.on('loginSuccess', (myself: any) => {
  console.log(myself)

  isLogin.value = true
  chatRoom.chatData.myself = myself
  alert('登录成功')
})

// 保存聊天信息
socket.on('addUser', (msg: string) => {
  console.log(msg)
  chatRoom.chatData.systemMsg.push(msg)
  console.log(chatRoom.chatData.systemMsg)
})

// 保存聊天信息
socket.on('userList', (users: any) => {
  chatRoom.chatData.users = users
  chatRoom.chatData.count = users.length
  console.log(chatRoom.chatData.users)
})
</script>
<style>
* {
  box-sizing: border-box;
}
input,
button,
select,
textarea {
  outline: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0 auto;
  text-align: left;
}
body {
  background: #4493cb;
}
</style>

<template>
  <section class="login">
    <h3>用户登录</h3>
    <div class="form-item">
      <label>用户名：</label>
      <input type="text" placeholder="请输入你的内容" v-model="userName" class="user-name" />
      <p class="error-info" v-if="!userNameValidate">请填写用户名</p>
    </div>
    <div class="form-item">
      <input type="hidden" v-model="avator" />
      <label>选择头像</label>
      <ul class="avator">
        <li
          v-for="(item, index) in avatorConfig"
          :key="index"
          :class="{ active: avator === item.name }"
        >
          <img :src="item.src" :alt="`avator-${index}`" @click.stop="avator = item.name" />
        </li>
      </ul>
      <p class="error-info" v-if="!avatorValidate">请选择头像</p>
    </div>
    <button @click="submit" class="login-btn">登录</button>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import avator1 from '@/assets/images/tx01.jpg'
import avator2 from '@/assets/images/tx02.jpg'
import avator3 from '@/assets/images/tx03.jpg'
import avator4 from '@/assets/images/tx04.jpg'
import avator5 from '@/assets/images/tx05.jpg'
import avator6 from '@/assets/images/tx06.jpg'
import avator7 from '@/assets/images/tx07.jpg'

import socket from '@/utils/socket'

const avatorConfig = [
  {
    name: 'avator1',
    src: avator1
  },
  {
    name: 'avator2',
    src: avator2
  },
  {
    name: 'avator3',
    src: avator3
  },
  {
    name: 'avator4',
    src: avator4
  },
  {
    name: 'avator5',
    src: avator5
  },
  {
    name: 'avator6',
    src: avator6
  },
  {
    name: 'avator7',
    src: avator7
  }
]

const userName = ref('')
const avator = ref('')
const userNameValidate = ref(true)
const avatorValidate = ref(true)
const info = ref('')

// 连接服务成功
socket.on('welcome', (data: string) => {
  info.value = data
})

// 向服务器发送消息
const submit = () => {
  if (!userName.value) {
    userNameValidate.value = false
    return
  }
  userNameValidate.value = true
  if (!avator.value) {
    avatorValidate.value = false
    return
  }
  avatorValidate.value = true
  socket.emit('send', userName.value)
  userName.value = ''
}
// 接受服务器返回的数据
interface MsgItem {
  type: 0 | 1 | 2
  msg: string
  time: string
}
const message = ref<MsgItem[]>([])
socket.on('message', (e: any) => {
  message.value.push(e)
})

document.onkeyup = (e) => {
  if (e.keyCode === 13) submit()
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
}
.login {
  width: 500px;
  min-height: 540px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 30px;
  }
  .user-name {
    height: 38px;
    line-height: 38px;
    width: 100%;
    margin-top: 8px;
    border: 1px solid #ddd;
    padding: 0 10px;
  }
  .form-item {
    margin: 0 0 26px;
    position: relative;
    label {
      font-size: 18px;
      color: #333;
    }
    .error-info {
      color: red;
      position: absolute;
      left: 0;
      bottom: -33px;
      font-size: 13px;
    }
  }
  .login-btn {
    background: #1474b9;
    height: 42px;
    line-height: 42px;
    color: #fff;
    text-align: center;
    width: 100%;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .avator {
    border: 1px solid #ddd;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    li {
      box-sizing: content-box;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #f5f5f5;
      padding: 1px;
      margin: 0 5px 10px;
      overflow: hidden;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid #7ab5dd;
      }
    }
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>

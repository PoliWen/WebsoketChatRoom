<template>
  <section class="chat-room">
    <div class="sider-bar">
      <div class="user-info">
        <div class="avator">
          <img :src="findAvatorSrc(chatRoom.chatData.myself.avator)" alt="" />
        </div>
        <span>{{ chatRoom.chatData.myself.userName }}</span>
      </div>
      <h3>用户列表</h3>

      <div class="user-info" v-for="(item, index) in chatRoom.chatData.users" :key="index">
        <div class="avator">
          <img :src="findAvatorSrc(item.avator)" alt="" />
        </div>
        <span>{{ item.userName }}</span>
      </div>
    </div>
    <div class="right-room">
      <h3 class="title">聊天室 ({{ chatRoom.chatData.count }})</h3>
      <div class="chat-info" ref="chatRef">
        <div v-for="(item, index) in chatRoom.chatInfo" :key="index">
          <div class="count" v-if="item.systemMsg">
            {{ item.systemMsg }}
          </div>

          <div class="info self-info" v-if="item.myMsg">
            <div class="avator">
              <img :src="findAvatorSrc(item.myMsg.avator)" alt="" />
            </div>
            <div class="message">
              <span class="poper-arrow"></span>
              <div class="msg" v-if="item.myMsg.msg">{{ item.myMsg.msg }}</div>
              <div class="imageMsg" v-if="item.myMsg.img">
                <img :src="item.myMsg.img" alt="" />
              </div>
            </div>
          </div>

          <div class="info other-info" v-if="item.otherMsg">
            <div class="avator">
              <img :src="findAvatorSrc(item.otherMsg.avator)" alt="" />
            </div>
            <div class="message">
              <span class="poper-arrow"></span>
              <div class="msg" v-if="item.otherMsg.msg">{{ item.otherMsg.msg }}</div>
              <div class="imageMsg" v-if="item.otherMsg.img">
                <img :src="item.otherMsg.img" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="send-panel">
        <div class="tool-bar">
          <span class="pic">
            <input type="file" @change="sendImg" ref="fileRef" />
          </span>
        </div>
        <textarea name="" id="" cols="30" rows="10" v-model="content"></textarea>
        <span class="tips">按 ctrl+enter发送</span>
        <button class="send-btn" @click="sendMsg">发送</button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, expose } from 'vue'
import socket from '@/utils/socket'

import avatorConfig from '@/dataSurce/avator'

import chatRoomStore from '@/store/chatRoom'
import avator from '../dataSurce/avator'

const chatRoom = chatRoomStore()

const findAvatorSrc = (avatorName: string) => {
  return avatorConfig.find((item: any) => item.name === avatorName).src
}

const content = ref('')

// 滚动到最下面

const sendMsg = () => {
  if (!content.value) {
    alert('请输入内容')
    return
  }
  socket.emit('sendMsg', {
    msg: content.value,
    userName: chatRoom.chatData.myself.userName,
    avator: chatRoom.chatData.myself.avator
  })
  content.value = ''
  scrollToBootm()
}

// 滚动到底部
const chatRef = ref()
const scrollToBootm = () => {
  setTimeout(() => {
    console.log('height', chatRef.value.scrollHeight)
    chatRef.value.scrollTop = chatRef.value.scrollHeight
  }, 100)
}
expose({ scrollToBootm })

document.onkeyup = (e) => {
  if (e.keyCode === 13) sendMsg()
}

const fileRef = ref()
const sendImg = () => {
  const file = fileRef.value.files[0]
  const fr = new FileReader()
  fr.readAsDataURL(file)
  fr.onload = () => {
    socket.emit('sendMsg', {
      userName: chatRoom.chatData.myself.userName,
      avator: chatRoom.chatData.myself.avator,
      img: fr.result
    })
  }
}
</script>

<style lang="scss" scoped>
.chat-room {
  width: 1200px;
  margin: 40px auto;
  display: flex;
  height: 100%;
  .sider-bar {
    width: 392px;
    background: #2f333c;
    height: 858px;
    color: #fff;
    overflow: auto;

    h3 {
      padding: 20px;
      margin: 0;
      font-size: 18px;
      font-weight: normal;
      border-bottom: 1px solid #21242b;
    }
    .user-info {
      display: flex;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #21242b;
      color: #fff;
      .avator {
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  .right-room {
    .title {
      height: 64px;
      font-size: 16px;
      color: #333;
      line-height: 64px;
      margin: 0 10px;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }
    flex: 1;
    background: #fff;
  }
  .chat-info {
    height: 553px;
    overflow-y: auto;
    padding: 0 10px;
    .count {
      color: #999;
      text-align: center;
      padding: 10px;
      margin-bottom: 10px;
    }
    .info {
      display: flex;
      margin-bottom: 20px;
      &.self-info {
        justify-content: flex-end;
        .avator {
          order: 2;
          margin-left: 10px;
        }
        .poper-arrow {
          left: auto;
          right: -6px;
          transform: rotate(180deg);
        }
      }
      .avator {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .message {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 10px;
        max-width: 70%;
        line-height: 30px;
        position: relative;
        img {
          width: 100%;
        }
      }
      .poper-arrow {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 6px;
        margin-bottom: 3px;
        border-right-color: #ebeef5;
        border-left-width: 0;
        left: -6px;
        top: 15px;
        &:after {
          content: ' ';
          border-width: 6px;
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid;
          bottom: -6px;
          left: 1px;
          border-right-color: #fff;
          border-left-width: 0;
        }
      }
    }
  }
  .send-panel {
    border-top: 1px solid #ddd;
    height: 238px;
    position: relative;
    textarea {
      width: 98%;
      border: none;
      padding: 10px;
    }
  }
  .tips {
    color: #999;
    font-size: 14px;
    position: absolute;
    right: 150px;
    bottom: 5px;
    height: 40px;
    line-height: 40px;
    display: block;
  }
  .send-btn {
    width: 130px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #333;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    position: absolute;
    bottom: 5px;
    right: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}

.tool-bar {
  height: 40px;
  line-height: 40px;
  padding: 5px 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  .pic {
    width: 30px;
    height: 30px;
    display: block;
    background: url('@/assets/images/send-pic.png');
    background-size: cover;
    cursor: pointer;
    input {
      width: 30px;
      height: 30px;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>

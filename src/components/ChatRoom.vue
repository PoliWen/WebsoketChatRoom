/* eslint-disable import/no-unresolved */
<template>
  <section class="chat-room">
    <div class="sider-bar">
      <div class="user-info">
        <div class="avator">
          <img :src="avator1" alt="" />
        </div>
        <span>文孝礼</span>
      </div>
      <h3>用户列表</h3>

      <div class="user-info" v-for="i in 10" :key="i">
        <div class="avator">
          <img :src="avator1" alt="" />
        </div>
        <span>文孝礼</span>
      </div>
    </div>
    <div class="right-room">
      <h3 class="title">聊天室 ({{ count }})</h3>
      <div class="chat-info">
        <div class="count">111加入了群聊</div>
        <div class="info self-info" v-for="i in 10" :key="i">
          <div class="avator">
            <img :src="avator1" alt="" />
          </div>
          <div class="message">
            <span class="poper-arrow"></span>
            文孝礼文孝礼文孝礼文孝礼文孝礼文孝礼文孝礼文孝礼文孝礼文孝礼文孝礼文孝礼文孝礼文孝礼文孝礼
          </div>
        </div>

        <div class="info other-info">
          <div class="avator">
            <img :src="avator1" alt="" />
          </div>
          <div class="message">
            <span class="poper-arrow"></span>
            fsdjkfjsfjsflsdjfjslfjsdlfjskjflsdjfsjfljs
          </div>
        </div>
      </div>
      <div class="send-panel">
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <span class="tips">按 ctrl+enter发送</span>
        <button class="send-btn">发送</button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import socket from '@/utils/socket'
import avator1 from '@/assets/images/tx01.jpg'

const count = ref('100')
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
    .count {
      color: #999;
      text-align: center;
      padding: 10px;
      margin-bottom: 10px;
    }
    .info {
      display: flex;
      margin-bottom: 20px;
      &.other-info {
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
        width: 70%;
        line-height: 30px;
        position: relative;
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
    height: 235px;
    position: relative;
    textarea {
      width: 98%;
      height: 98%;
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
</style>

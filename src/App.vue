<template>
  <!-- <WebsocketDemo /> -->
  <chatRoom />
</template>
<script setup lang="ts">
// import WebsocketDemo from '@/components/WebsocketDemo.vue'
// import login from '@/components/Login.vue'
import chatRoom from '@/components/ChatRoom.vue'
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

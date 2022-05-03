import { defineStore } from 'pinia'

export default defineStore('chatRoomStore', {
  state: () => {
    return {
      chatData: {
        count: 0,
        myself: {},
        users: []
      },
      chatInfo: []
    }
  }
})

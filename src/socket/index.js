export default {
  install: function (Vue, options) {

    Vue.prototype.socket = new WebSocket('ws://127.0.0.1:8081/socket/')
    Vue.prototype.socket.onopen = () => {
      console.log('open ')
      console.dir(Vue) 
    }
    Vue.prototype.socket.onmessage = (e) => {
      console.log(e.data)
      Vue.prototype.$emit('newmessage')
    }
    Vue.prototype.socket.onclose = () => {
      console.log('close ')
    }
  }
}
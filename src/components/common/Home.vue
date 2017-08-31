<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        data(){
            return {
                socket: ( 
                    (vm) => {
                        const inner = new WebSocket("ws://127.0.0.1:8081/socket/")
                        inner.onmessage = (e) => {
                            vm.$children[2].tableData.push(e.data)
                        }
                        return inner
                    }
                )(this)
            }
        },
        components:{
            vHead, vSidebar
        }
    }
</script>

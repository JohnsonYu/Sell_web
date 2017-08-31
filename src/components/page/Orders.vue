<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 订单</el-breadcrumb-item>
                <el-breadcrumb-item>最新订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row>
          <el-col :span="5" v-for="(item, index) in tableData" :key="item.name" :offset="index % 4 > 0 ? 1 : 0">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">{{ item.name }}</span>
                <!-- <el-button style="float: right;" type="primary" @click="onTest">操作按钮</el-button> -->
                <el-dropdown style="float: right;" >
                  <el-button type="primary">
                    操作按钮<i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown" @click.native="itemClick($event, index)">
                    <el-dropdown-item value="1">已完成</el-dropdown-item>
                    <el-dropdown-item value="2">删除</el-dropdown-item>
                    <!-- <el-dropdown-item value="3">螺蛳粉</el-dropdown-item> -->
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="text item">
                {{ item.address }}
              </div>
            </el-card>
          </el-col>
        </el-row>
    </div>
</template>  

<script>
    export default {
        data() {
            return {
                url: './static/orders.json',
                tableData: [],
                currentDate: new Date()
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData(){
                let self = this;
                self.$axios.get(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                })
            },
            onTest() {
                console.log(this)
            },
            itemClick($event, index) {
                const method = $event.srcElement.value
                switch(method){
                    case 1:
                        console.log("completed")
                        break;
                    case 2:
                        this.tableData.splice(index,1)
                        break;
                }
            }
        }
    }
</script>

<style scoped>
.el-col-5 {
    margin-top: 20px;
}
.box-card {
    height: 300px;
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
  }
.time {
    font-size: 13px;
    color: #999;
}
.button {
    padding: 0;
    float: right;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.item {
    padding: 10px 0;
    float: left;
    width: 50%;
}
.clearfix:after {
  clear: both
}
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>
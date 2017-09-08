<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 订单</el-breadcrumb-item>
                <el-breadcrumb-item>最新订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row>
          <el-col :span="5" v-for="(order, index) in tableData" :key="index" :offset="index % 4 > 0 ? 1 : 0">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">桌号：{{ order.tableNo }}</span>
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
              <div class="text item" v-for="(item, index) in order.items">
                {{ item.name+ " " + changeLabel('ice', item.temperature) + " " + changeLabel('sweet', item.sweetness) }}
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
                iceDict: [],
                sweetDict: [],
                currentDate: new Date()
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData(){
                let self = this;
                self.iceDict['more'] = '多冰'
                self.iceDict['less'] = '少冰'
                self.iceDict['none'] = '去冰'
                self.iceDict['regular'] = '常温'
                self.iceDict['hot'] = '热'

                self.sweetDict['more'] = '多糖'
                self.sweetDict['less'] = '微糖'
                self.sweetDict['none'] = '无糖'
                self.sweetDict['regular'] = '正常'
                self.sweetDict['half'] = '半糖'
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
                        console.log(this.tableData[index])
                        break;
                    case 2:
                        this.tableData.splice(index,1)
                        break;
                }
            },
            changeLabel(type, key) {
                switch(type){
                    case 'ice':
                        return this.iceDict[key]
                        break
                    default :
                        return this.sweetDict[key]
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
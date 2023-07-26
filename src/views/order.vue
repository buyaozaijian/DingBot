<template>
  <div style="width: 1300px">
    <div class="search-card">
      <div style="position: relative;width: 300px;top: 120px;left: 750px;display: flex">
        <el-input v-model="searchThing" placeholder="请输入"/>
        <el-button type="primary" style="margin-left: 10px;width: 100px;height: 40px;font-size: 18px;color: white" @click="search">搜索</el-button>
      </div>
      <div style="position: relative;top: 50px">
        <span style="margin-left: 50px">
          <router-link to="/test"><el-button type="success" plain  style="width: 130px;height: 50px;font-size: 18px">查看商品</el-button></router-link>
        </span>
      </div>
    </div>
    <div style="background-color: whitesmoke;box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.30);position: relative;width: 1220px">
      <div style="position: relative;font-size: 25px;width: 1050px;left: 120px">
        <span style="margin-right: 120px">订单编号</span>
        <span style="margin-right: 70px">订单id</span>
        <span style="margin-right: 90px">订单日期</span>
        <span style="margin-right: 110px">客户名</span>
        <span style="margin-right: 110px">价格</span>
      </div>
      <div class="table">
        <div class="item" v-for="(item,index) in list" :key="index" @click="openInfo(item.id)">
          <div style="position: relative;width: 280px;display: inline-block;top: 20px;margin-left: 20px">
            {{item.identifier}}
          </div>
          <div style="position: relative;width: 110px;display: inline-block;top: 20px;">
            {{item.id}}
          </div>
          <div style="position: relative;width: 200px;display: inline-block;top: 20px;">
            {{item.time}}
          </div>
          <div style="position: relative;width: 180px;display: inline-block;top: 20px;">
            {{item.customer_name}}
          </div>
          <div style="position: relative;width: 130px;display: inline-block;top: 20px;">
            {{item.price}}
          </div>
          <div style="position: relative;display: inline-block;top: 20px;">
            <span v-if="item.status === 1" style="font-size: 18px;color: green">
              已支付
            </span>
            <span v-else style="font-size: 18px;color: red">
              未支付
            </span>
          </div>
        </div>
      </div>
    </div>
    <div id="pdfDom" style="position: relative;top: 200px">
    </div>
    <el-drawer v-model="drawer" :with-header="false">
      <div style="position: relative;top: 20px;font-size: 27px">
        订单{{identifier}}详情
      </div>
      <div style="position: relative;top: 50px;font-size: 22px">
        <div class="iteminfo">
          产品id:{{product_info.id}}
        </div>
        <div class="iteminfo">
          产品名:{{product_info.name}}
        </div>
        <div class="iteminfo">
          产品配置:{{configuration}}
        </div>
        <div class="iteminfo">
          订单金额:{{price}}
        </div>
        <div class="iteminfo">
          收货人:{{customer_name}}
        </div>
        <div class="iteminfo">
          手机号:{{phone}}
        </div>
        <div class="iteminfo">
          地址:{{address}}
        </div>
        <div class="iteminfo">
          订单时间:{{time}}
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
// 导入htmlToPdf.js
import htmlToPdf from '../utils/htmlToPdf';
const pdfFunc = () => {
  let pdf = htmlToPdf.getPdf('订单');
  let myfile = this.dataURLtoFile(pdf,  "订单.pdf");//调用一下下面的转文件流函数
  console.log(myfile);
}
</script>
<script>
export default {
  name: "order",
  created() {
    this.id = this.$route.query.id;
    this.getlist();
  },
  data(){
    return {
      drawer:false,
      list:[],
      searchThing:'',
      id:0,
      file:'',
      name:'asdawdadw',
      identifier:0,
      product_info: {
        'id': 0,
        'name': '',
      },
      configuration: '',
      price: 0,
      status: 0,
      customer_name: '',
      phone: 0,
      address: '',
      time: '',
    }
  },
  methods:{
    openInfo(id){
      this.drawer = true;
      let formdata = new FormData();
      formdata.append('order_id',id);
      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method:'post',
        url:'https://dingbotboards.com/api/administrator/getOrderInfo/',
        data:formdata
      }).then(res=>{
        this.identifier = res.data.identifier;
        this.product_info = res.data.product_info;
        this.configuration = res.data.configuration;
        this.price = res.data.price;
        this.status = res.data.status;
        this.customer_name = res.data.customer_name;
        this.phone = res.data.phone;
        this.address = res.data.address;
        this.time = res.data.time;
      })
    },
    search(){
      let formdata = new FormData();
      formdata.append('identifier',this.searchThing);
      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method:'post',
        url:'https://dingbotboards.com/api/administrator/searchOrder/',
        data:formdata
      }).then(res=>{
        this.$message.success(res.data.msg)
        let tmp = {'id':res.data.id,'identifier':res.data.identifier,'time':res.data.time,
                      'customer_name':res.data.customer_name,'price':res.data.price,'status':res.data.status};
        this.list = [];
        this.list.push(tmp);
      })
    },
    getlist(){
      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method:'post',
        url:'https://dingbotboards.com/api/administrator/getOrderList/',
      }).then(res=>{
        this.list = res.data.data;
      })
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  }
}
</script>

<style scoped>
.search-card {
  position: relative;
  top: 0px;
  height: 200px;
}
.table {
  position: relative;font-size: 20px;width: 1050px;
  left: 100px;
}
.item {
  position: relative;margin-top: 20px;margin-bottom: 10px;
  background-color: white;box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.20);
  height: 70px;
  left: -30px;
  border-radius: 20px;
}
.item:hover {
  transform: scale(1.05);
  cursor:pointer;
}
.iteminfo {
  margin-bottom: 10px;
  font-family: 黑体;
}
</style>
<template>
  <div style="width: 1300px">
    <div class="search-card">
      <div style="position: relative;width: 300px;top: 120px;left: 750px;display: flex">
        <el-input v-model="searchThing" placeholder="请输入"/>
        <el-button type="primary" style="margin-left: 10px">搜索</el-button>
      </div>
      <div style="position: relative;top: 50px">
        <span>
          <el-button type="success" plain @click="pdfFunc">添加商品</el-button>
        </span>
        <span style="margin-left: 50px">
          <router-link to="/test"><el-button type="success" plain>查看商品</el-button></router-link>
        </span>
      </div>
    </div>
    <div id="pdfDom" style="position: relative;top: 200px">
    </div>
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
  },
  data(){
    return {
      id:0,
      file:'',
      name:'asdawdadw',
    }
  },
  methods:{
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
  position: absolute;
  top: 0px;
  height: 200px;
}
</style>
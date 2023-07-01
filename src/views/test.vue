<template>
  <div style="width: 1300px">
    <div class="search-card">
      <div style="position: relative;width: 300px;top: 120px;left: 750px;display: flex">
        <el-input v-model="searchThing" placeholder="请输入"/>
        <el-button type="primary" style="margin-left: 10px">搜索</el-button>
      </div>
      <div style="position: relative;top: 50px">
        <el-button type="success" plain @click="dialogVisible = true">添加商品</el-button>
      </div>
    </div>
    <div class="item-card" v-for="(index,item) in itemlist" :key="index" @click="dialogVisible1 = true">
      <img src="../assets/4.png" class="item-pic">
      <div class="item-info">
        <div>
          商品名:{{item.name}}
        </div>
        <div>
          类型:{{item.type}}
        </div>
        <div>
          价格:{{item.money}}
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="添加商品">
      <el-form :model="form" label-width="120px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="商品底价">
          <el-input v-model="form.price" />
        </el-form-item>
        <el-form-item label="产品图">
          <el-upload class="upload"
                     ref="upload"
                     action="string"
                     :file-list="fileList"
                     :auto-upload="false"
                     :http-request="uploadFile"
                     :on-change="handleChange"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     multiple="multiple">
            <el-button slot="trigger"
                       size="small"
                       type="primary"
                       @click="delFile">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品类别一">
          <el-radio-group v-model="form.type1">
            <el-radio label="带把" />
            <el-radio label="不带把" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品类别二">
          <el-radio-group v-model="form.type2">
            <el-radio label="城市" />
            <el-radio label="越野" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品视角数量">
          <el-select v-model="form.view_num" placeholder="请选择数量">
            <el-option label="0" value="0" />
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item :label="'产品视角名称'+(index+1)" v-for="(view, index) in form.viewlist" :key="index">
          <el-input v-model="view.view_i_name" :label="'视角'+(index+1)" />
        </el-form-item>
        <el-form-item label="产品视角底层图" v-if="form.view_num !== '0'">
          <el-upload class="upload"
                     ref="upload"
                     action="string"
                     :file-list="fileList1"
                     :auto-upload="false"
                     :http-request="uploadFile1"
                     :on-change="handleChange1"
                     :on-preview="handlePreview1"
                     :on-remove="handleRemove1"
                     multiple="multiple">
            <el-button slot="trigger"
                       size="small"
                       type="primary"
                       @click="delFile1">选取文件</el-button>
          </el-upload>
        </el-form-item>
<!--        <el-form-item label="产品配置数量">-->
<!--          <el-select v-model="form.module_num" placeholder="请选择数量">-->
<!--            <el-option label="0" value="0" />-->
<!--            <el-option label="1" value="1" />-->
<!--            <el-option label="2" value="2" />-->
<!--            <el-option label="3" value="3" />-->
<!--            <el-option label="4" value="4" />-->
<!--            <el-option label="5" value="5" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item :label="'产品组件名称'+(index+1)" v-for="(module, index) in form.modulelist" :key="index">-->
<!--          <el-input v-model="module.module_j_name" :label="'组件名称'+(index+1)" />-->
<!--          <el-select v-model="module.module_j_choice_num" placeholder="请选择可选项数量">-->
<!--            <el-option label="0" value="0" />-->
<!--            <el-option label="1" value="1" />-->
<!--            <el-option label="2" value="2" />-->
<!--            <el-option label="3" value="3" />-->
<!--            <el-option label="4" value="4" />-->
<!--            <el-option label="5" value="5" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-button @click="onSubmit" style="margin-left: 20px;margin-bottom: 50px">提交</el-button>
      </el-form>
    </el-dialog>
    <el-dialog v-model="dialogVisible1" title="商品信息">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "test",
  computed: {
    view_nums() {
      return this.form.view_num
    },
    module_nums() {
      return this.form.module_num
    },
    module_list() {
      return this.form.modulelist
    }
  },
  watch:{
    view_nums(newValue, oldValue) {
        if(newValue !== oldValue) {
          this.form.viewlist = [];
          for (let i = 0; i < newValue; i++)
          {
            let tmpData = {"view_i_name":'',"view_i_image":''}
            this.form.viewlist.push(tmpData);
          }
        }
    },
    module_nums(newValue, oldValue) {
      if(newValue !== oldValue) {
        this.form.modulelist = [];
        for (let i = 0; i < newValue; i++)
        {
          let tmpData = {"module_j_name":'',"module_j_chocie_num":0,"module_j_choice":[]}
          this.form.modulelist.push(tmpData);
        }
      }
    },
    module_list(newValue,oldValue) {
    },
  },
  created() {
    this.pageNum = Math.ceil(this.itemlist.length / this.pageSize) || 1;
    for (let i = 0; i < this.pageNum; i++) {
      this.totalPage[i] = this.itemlist.slice(this.pageSize * i, this.pageSize * (i + 1))
    }
    this.dataShow = this.totalPage[this.currentPage];
  },
  methods:{
    onSubmit(){
      console.log(this.fileList[0].raw);
      console.log(this.fileList1[0].raw);
      console.log(this.fileList1[1].raw);
      let formData = new FormData();
      formData.append('name',this.form.name);
      formData.append('description',this.form.description);
      formData.append('price',this.form.price);
      this.$axios({
        headers: {
          JWT: localStorage.getItem('token')
        },
        method:'post',
        url:'http://152.136.172.123/api/administrator/addProduct/',
        data:formData,
      })
    },
    delFile () {
      this.fileList = [];
    },
    handleChange (file, fileList) {
      this.fileList = fileList;
    },
    uploadFile (file) {
      this.formData.append("file", file.file);
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },

    delFile1 () {

    },
    handleChange1 (file1, fileList1) {
      this.fileList1 = fileList1;
    },
    uploadFile1 (file1) {
      this.formData.append("file", file1.file);
    },
    handleRemove1 (file1, fileList1) {
      console.log(file1, fileList1);
    },
    handlePreview1 (file1) {
      console.log(file1);
    },
    hCurrentChange(curPage) {
      this.currentPage = curPage;
      this.dataShow = this.totalPage[this.currentPage-1];
    },
  },
  data() {
    return {
      fileList:[],
      fileList1:[],
      form:{
        "name":'',
        "description":'',
        "price":0,
        "viewlist":[],
        "modulelist":[],
        "view_num":'0',
        "module_num":0,
      },
      dialogVisible:false,
      dialogVisible1:false,
      searchThing:'',
      show: 0,
      itemlist:[
          {
        'name':'huaban',
        'type':1,
        'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},{
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},{
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},{
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},{
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},{
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},{
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},{
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},
        {
          'name':'huaban',
          'type':1,
          'money':1000,},],
      totalPage: [], // 所有分页的数据
      pageSize: 10, // 每页显示数量
      pageNum: 6,  // 共几页=所有数据/每页现实数量
      dataShow: [], // 当前显示的数据
      currentPage:0,
    }
  }
}
</script>

<style scoped>
.item-card {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.30);
  display: inline-block;
  margin-right: 30px;
  margin-bottom: 20px;
}
.item-card:hover {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.30);
  display: inline-block;
  margin-right: 30px;
  margin-bottom: 20px;
  transform: scale(1.05);
  cursor:pointer;
}
.item-pic {
  width: 200px;
  height: 150px;
}
.item-info {

}
.search-card {
  height: 200px;
}
</style>
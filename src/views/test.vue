<template>
  <div style="width: 1300px;">
    <div class="search-card">
          <div style="position: relative;width: 300px;top: 120px;left: 750px;display: flex">
            <el-input v-model="searchThing" placeholder="请输入"/>
            <el-button type="primary" style="margin-left: 10px;width: 100px;height: 40px;font-size: 18px;color: white">搜索</el-button>
          </div>
          <div style="position: relative;top: 50px">
        <span>
          <el-button type="success" plain @click="dialogVisible = true" style="width: 130px;height: 50px;font-size: 18px">添加商品</el-button>
        </span>
            <span style="margin-left: 50px">
          <router-link to="/order"><el-button type="success" plain  style="width: 130px;height: 50px;font-size: 18px">查看订单</el-button></router-link>
        </span>
          </div>
        </div>
    <div>
      <div class="item-card" v-for="(item,index) in JSON.parse(JSON.stringify(itemlist))" :key="index" @click="openInfo(index)">
        <img :src="'https://dingbotboards.com'+item.image" class="item-pic">
        <div class="item-info">
          <div style="font-size: 25px;color: red">
            ￥{{item.price}}
          </div>
          <div>
            {{item.name}}
            <span style="margin-left: 20px;font-size: 5px;font-family: 'Times New Roman'">id:{{item.id}}</span>
          </div>
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
                           style="width: 80px;height: 40px;font-size: 15px;color: white"
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
                <el-option label="6" value="6" />
                <el-option label="7" value="7" />
                <el-option label="8" value="8" />
                <el-option label="9" value="9" />
                <el-option label="10" value="10" />
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
                           style="width: 80px;height: 40px;font-size: 15px;color: white"
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
            <el-button @click="onSubmit" style="margin-left: 20px;margin-bottom: 50px;width: 80px;height: 40px;font-size: 15px;">提交</el-button>
          </el-form>
        </el-dialog>
    <el-dialog v-model="dialogVisible1" title="商品信息">
          <div style="margin-bottom: 30px">
            <div style="margin-bottom: 20px">商品视角</div>
            <span v-for="(view,index) in JSON.parse(JSON.stringify(view_list))" :key="index" class="view">
          <el-tag class="ml-2" type="info" v-if="this.currentview !== index" @click="changeview(index)">{{view.name}}</el-tag>
          <el-tag class="ml-2" type="success" v-if="this.currentview === index" @click="changeview(index)">{{view.name}}</el-tag>
        </span>
          </div>
          <div>
            <div style="margin-bottom: 20px">商品组件
              <el-button type="primary" style="width: 80px;height: 40px;font-size: 15px;color: white;margin-left: 30px" @click="uploadmodule">添加组件</el-button>
            </div>
            <div v-if="upload === 1">
              <el-form :model="moduleform" label-width="120px">
                <el-form-item label="组件名称">
                  <el-input v-model="moduleform.module_1_name" />
                </el-form-item>
                <el-form-item label="组件可选项数量">
                  <el-select v-model="moduleform.module_1_choice_num" placeholder="请选择数量">
                    <el-option label="0" value="0" />
                    <el-option label="1" value="1" />
                    <el-option label="2" value="2" />
                    <el-option label="3" value="3" />
                    <el-option label="4" value="4" />
                    <el-option label="5" value="5" />
                    <el-option label="6" value="6" />
                    <el-option label="7" value="7" />
                    <el-option label="8" value="8" />
                    <el-option label="9" value="9" />
                    <el-option label="10" value="10" />
                  </el-select>
                </el-form-item>
                <el-form-item v-for="(choice, index) in moduleform.choicelist" :key="index">
                  <div>
                    <div>
                      <span style="margin-right: 5px">组件可选项{{index+1}}名称</span><span><el-input style="width: 200px" v-model="choice.name"/></span>
                    </div>
                    <div>
                      <span style="margin-right: 5px">组件可选项{{index+1}}是否存在下级</span><span><el-switch v-model="choice.has" /></span>
                    </div>
                    <div v-if="choice.has === true">
                      <span style="margin-right: 5px">组件可选项{{index+1}}下级可选项数量</span>
                      <span>
                    <el-select v-model="choice.dictnum" placeholder="请选择数量">
                      <el-option label="0" value=0 />
                      <el-option label="1" value=1 />
                      <el-option label="2" value=2 />
                      <el-option label="3" value=3 />
                      <el-option label="4" value=4 />
                      <el-option label="5" value=5 />
                      <el-option label="6" value=6 />
                      <el-option label="7" value=7 />
                      <el-option label="8" value=8 />
                      <el-option label="9" value=9 />
                      <el-option label="10" value=10 />
                    </el-select>
                    <el-button type="primary" @click="addchoice(choice)" style="width: 60px;height: 40px;font-size: 15px;color: white;margin-left: 5px">确定</el-button>
                    <div v-if="choice.dictnum !== undefined">
                      <div v-for="(dict,index1) in choice.dictlist" :key="index1" style="margin-bottom: 10px">
                        <div>
                          <span style="margin-right: 5px;margin-left: 20px">下级可选项{{index1+1}}名称</span>
                          <span><el-input v-model="dict.name" style="width: 200px"/></span>
                        </div>
                        <div>
                          <span style="margin-right: 5px;margin-left: 20px">下级可选项{{index1+1}}价格</span>
                          <span><el-input v-model="dict.price" style="width: 200px"/></span>
                        </div>
                      </div>
                    </div>
                  </span>
                    </div>
                    <div v-else>
                      <div>
                        <span style="margin-right: 5px">组件可选项{{index+1}}价格</span><span><el-input style="width: 200px" v-model="choice.price"/></span>
                      </div>
                    </div>
                  </div>
                </el-form-item>
                <el-button @click="onSubmitmodule" style="margin-left: 300px;margin-bottom: 50px;width: 80px;height: 40px;font-size: 15px">提交组件</el-button>
              </el-form>
            </div>
            <div v-else>
              <div v-for="(module,index) in JSON.parse(JSON.stringify(module_list))" :key="index" class="module">
                <div style="position: relative;top: 10px;left: 20px;font-size: 15px;font-family: 黑体">
                  {{module.name}}
                </div>
                <div style="margin-top: 20px">
              <span v-for="(choice,index1) in module.choice_list" :key="index1" style="margin-left: 20px;margin-bottom: 20px">
                <span>
                  <el-tag class="ml-2" type="info" v-if="this.currentmodule !== index || this.currentchoice !== index1" @click="changemodule(index1,index)">{{choice.name}}</el-tag>
                  <el-tag class="ml-2" type="success" v-if="this.currentmodule === index && this.currentchoice === index1" @click="changemodule(index1,index)">{{choice.name}}</el-tag>
                </span>
                <!--                <span v-else>-->
                <!--                  <el-tag class="ml-2" type="warning">{{choice.name}}</el-tag>-->
                <!--                </span>-->
              </span>
                </div>
                <div v-if="has_underchoice === 1 && this.currentmodule === index">
                  <div style="margin-left: 20px;margin-top: 20px">该可选项有以下下级可选项</div>
                  <div style="margin-top: 20px">
                <span v-for="(choice,index1) in JSON.parse(JSON.stringify(kexuan_list))" :key="index1" style="margin-left: 20px;margin-bottom: 20px">
                <span>
                  <el-tag class="ml-2" type="info" v-if=" this.currentkexuan !== index1" @click="changekexuan(index1)">{{choice.name}}</el-tag>
                  <el-tag class="ml-2" type="success" v-if=" this.currentkexuan === index1" @click="changekexuan(index1)">{{choice.name}}</el-tag>
                </span>
              </span>
                  </div>
                </div>
              </div>
              <div>
                <div v-if="has_view === 0">
                  <el-upload class="upload"
                             ref="upload"
                             action="string"
                             :file-list="fileList2"
                             :auto-upload="false"
                             :http-request="uploadFile2"
                             :on-change="handleChange2"
                             :on-preview="handlePreview2"
                             :on-remove="handleRemove2"
                             multiple="multiple">
                    <el-button slot="trigger"
                               size="small"
                               type="primary"
                               style="width: 120px;height: 40px;font-size: 15px;color: white"
                               @click="delFile">选取可选图图片</el-button>
                  </el-upload>
                  <el-button type="primary" @click="onSubmitchoice" style="width: 120px;height: 40px;font-size: 15px;color: white">添加可选项图</el-button>
                </div>
                <div v-else>
                  该可选项图片已上传
                  <el-button type="primary" @click="deletechoice" style="width: 120px;height: 40px;font-size: 15px;color: white">删除可选项图</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
  </div>
  <div style="width:300px;margin:0 auto; padding:20px 0;">
    <a target="_blank" href=" " style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
      <img src="../assets/gongan.jpg" style="float:left;"/>
      <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">京公网安备 11010802042739号</p >
    </a >
  </div>
</template>

<script>
export default {
  name: "test",
  computed: {
    dialogVisible(){
      return dialogVisible
    },
    dialogVisible1(){
      return dialogVisible1
    },
    view_nums() {
      return this.form.view_num
    },
    module_nums() {
      return this.form.module_num
    },
    module_list() {
      return this.form.modulelist
    },
    choice_list() {
      return this.moduleform.module_1_choice_num
    },
  },
  watch:{
    dialogVisible(newValue,oldValue){
      if (newValue === false){
        this.isclick = 0;
        this.has_view = 0;
        this.upload = 0;
        this.currentview='';
        this.currentmodule='';
        this.currentchoice='';
        this.view_list=[];
        this.module_list=[];
        this.current=0;
        this.fileList=[];
        this.fileList1=[];
        this.fileList2=[];
        this.moduleform={
          "module_1_name":'',
              "module_1_choice_num":'',
              "choicelist":[],
        };
        this.form={
          "type1":'',
              "type2":'',
              "name":'',
              "description":'',
              "price":0,
              "viewlist":[],
              "modulelist":[],
              "view_num":'0',
              "module_num":0,
        };
      }
    },
    dialogVisible1(newValue,oldValue){
      if (newValue === false){
        this.isclick = 0;
        this.has_view = 0;
        this.upload = 0;
        this.currentview='';
        this.currentmodule='';
        this.currentchoice='';
        this.view_list=[];
        this.module_list=[];
        this.current=0;
        this.fileList=[];
        this.fileList1=[];
        this.fileList2=[];
        this.moduleform={
          "module_1_name":'',
          "module_1_choice_num":'',
          "choicelist":[],
        };
        this.form={
          "type1":'',
          "type2":'',
          "name":'',
          "description":'',
          "price":0,
          "viewlist":[],
          "modulelist":[],
          "view_num":'0',
          "module_num":0,
        };
      }
    },
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
    choice_list(newValue,oldValue) {
      if(newValue !== oldValue) {
        this.moduleform.choicelist = [];
        for (let i = 0; i < newValue; i++)
        {
          let tmpData = {"name":'',"price":'',"dictlist":[],"has":false,"dictnum":0}
          this.moduleform.choicelist.push(tmpData);
        }
      }
    }
  },
  created() {
    this.getitemlist();
  },
  methods:{
    test(index1){
      console.log(index1);
    },
    addchoice(choice){
      if (choice.dictnum !== undefined && choice.dictnum !== this.oldchoice)
      {
        choice.dictlist = [];
        let i = 0;
        for (i = 0; i < choice.dictnum; i++){
          let tmpData = {"name":'',"price":''}
          choice.dictlist.push(tmpData);
        }
        this.oldchoice = choice.dictnum;
      }
      else{
        this.oldchoice = choice.dictnum;
      }
    },
    deletechoice(){
      let formData = new FormData();
      formData.append('view_id',this.view_list[this.currentview].id);
      formData.append('choice_id',this.module_list[this.currentmodule].choice_list[this.currentchoice].id);
      formData.append('has_choice',this.module_list[this.currentmodule].choice_list[this.currentchoice].has_choice);
      formData.append('choice_order',this.currentkexuan+1);
      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method:'post',
        url:'https://dingbotboards.com/api/administrator/deleteChoiceImage/',
        data:formData,
      }).then(res=>{
        this.$message.success(res.data.msg);
        this.openInfo(this.current);
        this.has_view = 0;
      })
    },
    onSubmitchoice(){
      let formData = new FormData();
      formData.append('view_id',this.view_list[this.currentview].id);
      formData.append('choice_id',this.module_list[this.currentmodule].choice_list[this.currentchoice].id);
      formData.append('has_choice',this.module_list[this.currentmodule].choice_list[this.currentchoice].has_choice);
      formData.append('choice_order',this.currentkexuan+1);
      if (this.fileList2[0]!==undefined)
        formData.append("image",this.fileList2[0].raw);
      else
        formData.append("image",'');
      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method:'post',
        url:'https://dingbotboards.com/api/administrator/addChoiceImage/',
        data:formData,
      }).then(res=>{
        this.$message.success(res.data.msg);
        this.fileList2 = [];
        this.openInfo(this.current);
        this.has_view = 1;
      })
    },
    onSubmitmodule(){
      let formData = new FormData();
      formData.append('product_id',this.itemlist[this.current].id);
      formData.append('module_num',1);
      formData.append('module_1_name',this.moduleform.module_1_name);
      formData.append('module_1_choice_num',this.moduleform.module_1_choice_num);
      for (let i = 0; i < this.moduleform.choicelist.length; i++){
        formData.append('module_1_choice_'+(i+1)+'_name',this.moduleform.choicelist[i].name);
        if (this.moduleform.choicelist[i].has === false){
          formData.append('module_1_choice_'+(i+1)+'_price',this.moduleform.choicelist[i].price);
          formData.append('module_1_choice_'+(i+1)+'_has_choice',0);
          formData.append('module_1_choice_'+(i+1)+'_choice_dict','');
        }
        else {
          formData.append('module_1_choice_'+(i+1)+'_price',0);
          formData.append('module_1_choice_'+(i+1)+'_has_choice',1);
          formData.append('module_1_choice_'+(i+1)+'_choice_num',this.moduleform.choicelist[i].dictnum)
          for (let j = 0; j < this.moduleform.choicelist[i].dictnum; j++){
            formData.append('module_1_choice_'+(i+1)+'_choice_'+(j+1)+'_name',this.moduleform.choicelist[i].dictlist[j].name);
            formData.append('module_1_choice_'+(i+1)+'_choice_'+(j+1)+'_price',this.moduleform.choicelist[i].dictlist[j].price);
          }
        }
      }
      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method:'post',
        url:'https://dingbotboards.com/api/administrator/addModule/',
        data:formData,
      }).then(res=>{
        this.$message.success(res.data.msg);
        this.openInfo(this.current);
      })
      this.upload = 0;
    },
    uploadmodule(){
      this.upload = 1 - this.upload;
    },
    changemodule(index1,index){
      this.iskeuxna = 0;
      if (this.currentmodule === index && this.currentchoice === index1){
        this.currentmodule = -1;
        this.currentchoice = -1;
        this.has_underchoice = 0;
      }
      else
      {
        this.currentmodule = index;
        this.currentchoice = index1;
        this.currentkexuan = -1;
        if (this.module_list[this.currentmodule].choice_list[this.currentchoice].has_choice === 1){
          this.has_underchoice = 1;
          this.kexuan_list = this.module_list[this.currentmodule].choice_list[this.currentchoice].choice_list;
        }
        else
          this.has_underchoice = 0;
        let i = 0;
        for (i = 0; i < this.module_list[this.currentmodule].choice_list[this.currentchoice].view_list.length; i++){
          if (this.module_list[this.currentmodule].choice_list[this.currentchoice].view_list[i].name === this.view_list[this.currentview].name){
            this.has_view = 1;
            break
          }
        }
        if (i === this.module_list[this.currentmodule].choice_list[this.currentchoice].view_list.length)
          this.has_view = 0;
      }
    },
    changekexuan(index){
      this.iskeuxna = 1;
      if (this.currentkexuan === index){
        this.currentkexuan = -1;
      }
      else{
        this.currentkexuan = index;
        let i = 0;
        for (i = 0; i < this.module_list[this.currentmodule].choice_list[this.currentchoice].choice_list[this.currentkexuan].view_list.length; i++){
          if (this.module_list[this.currentmodule].choice_list[this.currentchoice].choice_list[this.currentkexuan].view_list[i].name === this.view_list[this.currentview].name){
            this.has_view = 1;
            break
          }
        }
        if (i === this.module_list[this.currentmodule].choice_list[this.currentchoice].choice_list[this.currentkexuan].view_list.length)
          this.has_view = 0;
      }
    },
    changeview(index){
      if (this.currentview === index){
        this.currentview = -1;
      }
      else{
        this.currentview = index;
        let i = 0;
        for (i = 0; i < this.module_list[this.currentmodule].choice_list[this.currentchoice].view_list.length; i++){
          if (this.module_list[this.currentmodule].choice_list[this.currentchoice].view_list[i].name === this.view_list[this.currentview].name){
            this.has_view = 1;
            break
          }
        }
        if (i === this.module_list[this.currentmodule].choice_list[this.currentchoice].view_list.length)
          this.has_view = 0;
      }
    },
    openInfo(index){
      this.dialogVisible1 = true;
      this.current = index;
      let formData = new FormData();
      formData.append('product_id',this.itemlist[index].id);
      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method:'post',
        url:'https://dingbotboards.com/api/administrator/getProduct/',
        data:formData,
      }).then(res=>{
        this.view_list = res.data.view_list;
        this.module_list = res.data.module_list;
      })
    },
    onSubmit(){
      let formData = new FormData();
      formData.append('name',this.form.name);
      formData.append('description',this.form.description);
      formData.append('price',this.form.price);
      if (this.fileList[0]!==undefined)
        formData.append("image",this.fileList[0].raw);
      else
        formData.append("image",'');
      let type = '';
      if (this.form.type1 === '带把')
        type = type + "1,";
      else
        type= type + '2,';
      if (this.form.type2 === '城市')
        type = type + "3";
      else
        type= type + '4';
      formData.append("category",type);
      formData.append('view_num',this.form.view_num);
      for (let i = 0;i < this.form.view_num; i++){
        formData.append('view_'+(i+1)+'_name',this.form.viewlist[i].view_i_name);
        formData.append('view_'+(i+1)+'_image',this.fileList1[i].raw);
      }
      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method:'post',
        url:'https://dingbotboards.com/api/administrator/addProduct/',
        data:formData,
      }).then(res=>{
        this.$message.success(res.data.msg);
        this.getitemlist();
        this.dialogVisible = false;
      })
    },
    getitemlist(){
      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method:'post',
        url:'https://dingbotboards.com/api/administrator/getProductList/',
      }).then(res=>{
        this.itemlist.length = 0;
        this.itemlist = res.data.data;
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

    delFile2 () {
      this.fileList2 = [];
    },
    handleChange2 (file2, fileList2) {
      this.fileList2 = fileList2;
    },
    uploadFile2 (file2) {
      this.formData.append("file", file2.file);
    },
    handleRemove2 (file2, fileList2) {
      console.log(file2, fileList2);
    },
    handlePreview2 (file2) {
      console.log(file2);
    },
    hCurrentChange(curPage) {
      this.currentPage = curPage;
      this.dataShow = this.totalPage[this.currentPage-1];
    },
  },
  data() {
    return {
      iskeuxna:0,
      kexuan_list:[],
      has_underchoice:0,
      oldchoice:0,
      isclick:0,
      has_view:0,
      upload:0,
      currentview:'',
      currentmodule:'',
      currentchoice:'',
      currentkexuan:'',
      view_list:[],
      module_list:[],
      current:0,
      fileList:[],
      fileList1:[],
      fileList2:[],
      moduleform:{
        "module_1_name":'',
        "module_1_choice_num":'',
        "choicelist":[],
      },
      form:{
        "type1":'',
        "type2":'',
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
      list:[],
      itemlist:[],
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
.module {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.30);
  margin-bottom: 20px;
  min-height: 80px;
}
.view {
  margin-left: 20px;
  cursor:pointer;
}
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
  position: relative;
  margin-left: 20px;
}
.search-card {
  position: absolute;
  top: 0px;
  height: 200px;
}
</style>
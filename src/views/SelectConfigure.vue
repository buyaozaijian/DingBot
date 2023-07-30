<template>
  <top-navigation ref="top-nav"></top-navigation>

  <div v-if="is_show">
    <div style="background: #ecedf1">
      <!--移动端-->
      <div v-show="this.screenWidth<=1024" >
        <div class="slide" >
          <el-carousel trigger="click" :autoplay="false" arrow="always" indicator-position="none" id="el-carousel"  :style="{height: bannerHeight+'px'}">
            <el-carousel-item v-for="view in view_list"
                              :key="view.id">
              <div  class="example_image" style="position: relative;">

                <div v-for="module in modules"
                     :key="module.id"

                >
                  <img v-if="showImg(module.choice_id,view.id,module.has_choice,module.order-module.choice_id*100)"
                       :style="{maxHeight: bannerHeight+'px'}"
                       style="max-width:  100%;position: absolute;top: 0;display: inline-block;"

                       :src="'https://dingbotboards.com'+showImg(module.choice_id,view.id,module.has_choice,module.order-module.choice_id*100)">
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div></div>
        <el-scrollbar style="max-width: 1024px">
          <div v-for="(module) in modules"
               :key="module.id">
            <div v-if="module.has_choice==1">
              <div class="scrollbar-demo-item">
                <div class="color-selector">
                  <div>
                    <p class="title_1">{{module.name}}</p>
                  </div>
                  <div
                      v-for="choice_list in module.choice_list"
                      :key="choice_list.id"
                      class="choice_list"
                  >
                    <span class="title_2">{{choice_list.name}}</span>
                    <div style="display: flex;">
                      <div style="margin: auto"
                      >
                        <img v-for="color in choice_list.choice_list"
                             :key="color.order"
                             :class="{ 'color-option': true, 'selected': color.selected }"
                             @click="selectColor(color,module.id)"
                             class="choice"
                             style="max-width: 50px;border-radius: 50%;"
                             :src="colorImg(color.name)"
                             :style="{border:  color.selected ?'4px solid #5168DD' : '4px solid transparent'}"/>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="choice_name">{{module.choice_name}}</p>
                    <p class="choice_price">￥ {{module.choice_price}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="scrollbar-demo-item">
                <div>
                  <p class="title_1">{{module.name}}</p>
                  <div id="defaultImages" >
                    <el-radio-group v-model="module.order"  @change="this.sum=compute()" style="display: block">
                      <el-radio v-for="choice_list in module.choice_list"
                                :key="choice_list.id"
                                @click="module.choice_id=choice_list.id"
                                :label=choice_list.id*100 size="large" border
                                style="max-width:90vw;width: 85vw;height:80px; margin: 0 20px 20px;transition-property: border;transition-duration: .33s">
                        <el-row :gutter="20" style="width: 85vw">
                          <el-col :span="6"> <span style="text-align: center;">{{ choice_list.name }}</span></el-col>

                          <el-col :span="8" :offset="10"><span style="text-align: center;white-space: nowrap;">￥ {{ choice_list.price }}</span></el-col>
                        </el-row>

                      </el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </el-scrollbar>
      </div>
      <!--    桌面端-->
      <div v-show="this.screenWidth>1024" style="background: #ecedf1">
        <el-container>
          <el-aside :width=" '450px'" style="height: calc(100vh - 160px);" id="el-slide">
            <el-scrollbar style="max-width: 1024px">
              <div v-for="(module) in modules"
                   :key="module.id">
                <div v-if="module.has_choice==1">
                  <div class="scrollbar-demo-item">
                    <div class="color-selector">
                      <div>
                        <p class="title_1">{{module.name}}</p>
                      </div>
                      <div
                          v-for="choice_list in module.choice_list"
                          :key="choice_list.id"
                          class="choice_list"
                      >
                        <span class="title_2">{{choice_list.name}}</span>
                        <div style="display: flex;">
                          <div style="margin: auto"
                          >
                            <img v-for="color in choice_list.choice_list"
                                 :key="color.order"
                                 :class="{ 'color-option': true, 'selected': color.selected }"
                                 @click="selectColor(color,module.id)"
                                 class="choice"
                                 style="max-width: 50px;border-radius: 50%;"
                                 :src="colorImg(color.name)"
                                 :style="{border:  color.selected ?'4px solid #5168DD' : '4px solid transparent'}"/>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p class="choice_name">{{module.choice_name}}</p>
                        <p class="choice_price">￥ {{module.choice_price}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="scrollbar-demo-item">
                    <div>
                      <p class="title_1">{{module.name}}</p>
                      <div id="defaultImages" >
                        <el-radio-group v-model="module.order"  @change="this.sum=compute()" style="display: block">
                          <el-radio v-for="choice_list in module.choice_list"
                                    :key="choice_list.id"
                                    @click="module.choice_id=choice_list.id"
                                    :label=choice_list.id*100 size="large" border
                                    style="max-width:400px;width: 400px;height:80px; margin: 0 20px 20px;transition-property: border;transition-duration: .33s">
                            <el-row :gutter="20" style="width: 400px">
                              <el-col :span="6"> <span style="text-align: center;">{{ choice_list.name }}</span></el-col>

                              <el-col :span="8" :offset="10"><span style="text-align: center;white-space: nowrap;">￥ {{ choice_list.price }}</span></el-col>
                            </el-row>

                          </el-radio>
                        </el-radio-group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </el-scrollbar>
          </el-aside>
          <el-main  >
            <div class="slide" >
              <el-carousel style="max-height: calc(100vh - 200px);" trigger="click" :autoplay="false" arrow="always" indicator-position="none" id="el-carousel1"  :style="{height: bannerHeight+'px', width:screenWidth-500+'px'}">
                <el-carousel-item v-for="view in view_list"
                                  :key="view.id">
                  <div  class="example_image" style="position: relative;">
                    <div v-for="module in modules"
                         :key="module.id">

                      <img v-if="showImg(module.choice_id, view.id, module.has_choice,module.order-module.choice_id*100)"
                           :style="{maxHeight: bannerHeight+'px'}"
                           style="max-width:  100%;position: absolute;top: 0"
                           :src="'https://dingbotboards.com'+showImg(module.choice_id,view.id,module.has_choice,module.order-module.choice_id*100)">
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>

          </el-main>
        </el-container>

        <div></div>

      </div>
      <!--底部栏-->
      <div class="bottom">
        <el-row :gutter="20" style="width: 85vw">
          <el-col :span="6" style="text-align: left;margin-left: 20px">
            <el-button color="white"  circle
                       style="width: 50px;
                       height: 50px;
                       margin-left: 20px;
                       margin-top: 30px;
                       box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.2);"
                       @click="show()">
              <el-icon color="black"><ArrowUpBold /></el-icon>
            </el-button>
          </el-col>

          <el-col :span="16" style="text-align: center;margin-top: 35px"><span style="font-size: 20px">￥{{this.sum}} 总价格</span></el-col>
        </el-row>


      </div>
      <div style="width:390px;margin:0 auto; padding:20px 0;">
        <img src="../assets/公安.png">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802042739" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">京公网安备 11010802042739号 京ICP备2023018741号</p></a>
      </div>

    </div>
  </div>



  <el-dialog v-model="detail" title="订单详情" style="z-index: 1000;width: 90vw">
    <div class="table-title">动力系统</div>
    <el-descriptions
        class="margin-top"
        :column="1"
        size="large"
        border
    >
      <el-descriptions-item>
        <template #label>
          <p class="choice_name" v-if="radio1===18500">双电机后轮驱动</p>
          <p class="choice_name" v-else>四电机四轮驱动</p>
        </template>
        <p class="choice_name" v-if="radio1===18500">¥ 18,500</p>
        <p class="choice_name" v-else>¥ 20,500</p>
      </el-descriptions-item>
    </el-descriptions>
    <div style="height: 20px"></div>
    <div class="table-title">配置选项</div>
    <el-table :data="modules" style="width: 90vw">
      <el-table-column prop="name" label="组件" max-width="70vw" />
      <el-table-column prop="choice_name" label="已选配置" max-width="10vw" />
      <el-table-column prop="choice_price" label="价格" />
    </el-table>
    <div style="height: 20px"></div>
    <div style="text-align: left">
      <p>
        <span class="table-title" >总价格 </span>
        <span style="margin-left: 10px">￥{{this.sum}}</span>
      </p>
    </div>
    <div style="height: 20px"></div>
    <div class="table-title" style="text-decoration: underline" @click="this.buy=true">在线购买</div>
    <div class="table-title" style="text-decoration: underline" @click="share()">分享配置</div>
  </el-dialog>
  <el-dialog v-model="buy" title="在线购买" style="z-index: 1000;width: 90vw">
    <el-form
        ref="buyerInfo"
        :model="buyerInfo"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item prop="name" label="收货人姓名:   ">
        <el-input v-model="buyerInfo.name"></el-input>
      </el-form-item>
      <el-form-item prop="contactNumber" label="联系方式:   ">
        <el-input v-model="buyerInfo.contactNumber"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="收货地址:   ">
        <el-input v-model="buyerInfo.address"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelSubmit('buyerInfo')">取消</el-button>
        <el-button type="primary" @click="addOrder()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="share_show" title="分享链接" style="z-index: 1000;width: 90vw">
    <span style="margin-left: 10px">https://dingbotboards.com/selectconifgure/{{this.$route.params.id}}/{{this.url}}</span>
  </el-dialog>
</template>



<script>
import { ElLoading } from 'element-plus'
import TopNavigation from "../components/TopNavigation.vue";
export default {
  name: "Select_Configure",
  components: {

    TopNavigation
  },
  data() {
    let validateInfo = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('输入不能为空'))
      }
      callback()
    }
    let validateNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空'))
      }else if (!Number(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    return {
      url: '',
      share_show: false,
      is_show: false,
      img: '',
      detail: false,
      buy: false,
      bannerHeight : 500,
      screenWidth: 100,
      radio1: 18500,
      sum: 0,
      modules: [],
      view_list: [
        {
          id: '',
          name: '',
          image: '',
        }
      ],
      buyerInfo: {
        name: '',
        contactNumber: '',
        address: '',
      },
      rules: {
        name: [{ validator: validateInfo, trigger: 'blur' }],
        contactNumber: [{ validator: validateNumber, trigger: 'blur' }],
        address: [{ validator: validateInfo, trigger: 'blur' }],
      },
      order:{
        id: '',
        identifier: '',
      }
    };
  },
  methods: {
    async getInfo(via){
      let formData = new FormData();
      formData.append("product_id", this.$route.params.id);
      await via.$axios({
        method: "post",
        url: "https://dingbotboards.com/api/product/getProduct/",
        data: formData,
      }).then((res) => {
        via.modules=res.data.data.module_list;
        console.log(res.data.data);
        if (this.$route.params.configure=='0')
        {via.modules.forEach(module =>{
          let num=1;
          if (module.has_choice==1)
            module.choice_list.forEach(choice_list =>{
              choice_list.choice_list.forEach(choice =>{
                choice.image=new Array();
                if (num>1)
                  choice.selected=false;
                else {
                  choice.selected=true;
                  module.choice_id= choice_list.id;
                  module.choice_name=choice.name;
                  module.choice_price=choice.price;
                  module.order=module.choice_id*100+choice.order;
                  num++;
                }

              })
            })
          else {
            module.choice_list.forEach(choice_list =>{
              choice_list.image=new Array();
              if (num==1) {
                module.choice_id= choice_list.id;
                module.choice_name = choice_list.name;
                module.choice_price = choice_list.price;
                module.order=choice_list.id*100;
                num++;
              }
            })
          }
        })}
        else{
          let index=0;
          let configure=this.$route.params.configure;
          via.modules.forEach(module =>{
            if (module.has_choice==1){
              let con1=configure.charAt(index).toUpperCase().charCodeAt() - 64;
              index++;
              let con2=configure.charAt(index).toUpperCase().charCodeAt() - 64;
              module.choice_list.forEach(choice_list =>{
                choice_list.choice_list.forEach(choice =>{
                  choice.image=new Array();
                  if (con2==choice.order&&con1==choice_list.id) {
                    choice.selected=true;
                    module.choice_id= choice_list.id;
                    module.choice_name=choice.name;
                    module.choice_price=choice.price;
                    module.order=module.choice_id*100+choice.order;
                  }
                  else{
                    choice.selected=false;
                  }
                })
              })
            }
            else {
              let con=configure.charAt(index).toUpperCase().charCodeAt() - 64;
              module.choice_list.forEach(choice_list =>{
                choice_list.image=new Array();
                if (con==choice_list.id) {
                  module.choice_id= choice_list.id;
                  module.choice_name = choice_list.name;
                  module.choice_price = choice_list.price;
                  module.order=choice_list.id*100;
                }
              })
            }
            index++;
          })
        }
        via.view_list=res.data.data.view_list;
        via.sum=res.data.data.price;
        via.modules.forEach(module =>{
          module.choice_list.forEach(choice_list=>{
            if (module.has_choice==1){
              choice_list.choice_list.forEach(choice => {
                via.view_list.forEach(view=>{
                  via.getChoiceImage(choice_list.id,view.id,1,choice.order,this);
                })

              })
            }
            else {
              via.view_list.forEach(view=>{
                via.getChoiceImage(choice_list.id,view.id,0,0,this);
              })
            }
          })
        });
        console.log(via.modules);
        console.log(via.view_list);
      })

    },
    cancelSubmit(formName){
      this.$refs[formName].resetFields();
      this.buy=false;
    },
    colorImg(name){
      return new URL(`../assets/color/${name}.png`, import.meta.url).href
    },
    selectColor(selectedColor,module_id) {
      this.modules.forEach(module => {
        if (module.id === module_id)
          module.choice_list.forEach(choice_list => {
            choice_list.choice_list.forEach(choice =>{
              if (choice === selectedColor)
              {
                choice.selected = true;
                module.choice_id = choice_list.id;
                module.choice_name = choice.name;
                module.choice_price = choice.price;
                module.order=module.choice_id*100+choice.order;
              }else{
                choice.selected = false;
              }
            })
          })
      });
      this.sum=this.compute();
      this.$forceUpdate()
    },
    compute(){
      let sum=0;
      this.modules.forEach(module =>{
        if (module.has_choice==1)
          sum = sum + module.choice_price;
        else {
          module.choice_list.forEach(choice =>{
            if (module.order/100==choice.id)
              sum = sum + choice.price;
          })
        }
      })
      return sum;
    },
    async getChoiceImage(choice_id,view_id,has_choice,choice_order,via){
      let formData = new FormData();
      let image = '';
      formData.append("choice_id", choice_id);
      formData.append("view_id", view_id);
      formData.append("has_choice", has_choice);
      formData.append("choice_order", choice_order);
      await via.$axios({
        method: "post",
        url: "https://dingbotboards.com/api/product/getChoiceImage/",
        data: formData,
      }).then((res) => {
        image = res.data.image;
        via.modules.forEach(module =>{
          module.choice_list.forEach(choice_list=>{
            if (has_choice==1){
              if (choice_list.id==choice_id) {
                choice_list.choice_list.forEach(choice => {
                  if (choice.order == choice_order) {
                    let img={
                      view: view_id,
                      image: image,
                    }
                    choice.image.push(img);
                  }
                })
              }
            }
            else {
              if (choice_list.id==choice_id){
                let img={
                  view: view_id,
                  image: image,
                }
                choice_list.image.push(img);
              }
            }
          })
        })
      })
    },
    showImg(choice_id,view_id,has_choice,choice_order){

      let image= '';
      this.modules.forEach(module =>{
        module.choice_list.forEach(choice_list=>{
          if (has_choice==1){
            if (choice_list.id==choice_id) {
              choice_list.choice_list.forEach(choice => {
                if (choice.order == choice_order) {
                  choice.image.forEach(img=>{
                    if (img.view==view_id){
                      image= img.image;}

                  })

                }
              })
            }
          }
          else {
            if (choice_list.id==choice_id){
              choice_list.image.forEach(img=>{
                if (img.view==view_id)
                  image = img.image;
              })
            }
          }
        })
      })
      console.log(choice_id,view_id,has_choice,choice_order,image);
      return image;
    },
    addOrder(){
      //localStorage.setItem("token", "ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5OjFxT3NCajpKWTF5eU5nMlFMYnd5RXo2NThOVG9hYUg2V0RHVTdhZURfTE4xRjloaGpn.ZXlKcFpHVnVkR2wwZVNJNkltTjFjM1J2YldWeUlpd2lZM1Z6ZEc5dFpYSmZhV1FpT2pFc0ltbGhkQ0k2TVRZNU1EUXpNRFEzT1M0ek1EZ3hNekkyTENKbGVIQWlPakUyT1RBMU1UWTROemt1TXpBNE1UTXpPSDA6MXFPc0JqOkp4cjJkUHVwZTBuak1WN0NKT25xbFBfREthV2I1SmhqUGpEOVJmLWFVb28.4ab46051db967e6da82e5c3cb5f5f6c6")
      let formData = new FormData();
      formData.append("product_id", this.$route.params.id);
      let arr = new Array();
      this.modules.forEach(module => {
        arr.push(module.order)
      });
      formData.append("configuration", arr);
      formData.append("price", this.sum);
      formData.append("customer_name", this.buyerInfo.name);
      formData.append("phone", this.buyerInfo.contactNumber);
      formData.append("address", this.buyerInfo.address);
      formData.forEach((value, key) => {
        console.log("key %s: value %s", key, value);
      })
      if (this.buyerInfo.name=='' || this.buyerInfo.contactNumber=='' || this.buyerInfo.address=='')
      {
        this.$message.error("信息不完整");
        return;
      }

      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method: "post",
        url: "https://dingbotboards.com/api/customer/addOrder/",
        data: formData,
      }).then((res) => {
        console.log(res);
        this.order.id= res.data.id;
        this.order.identifier= res.data.identifier;
        this.$message.success("新建订单成功");
        this.buy = false;
        this.$router.push({path: '/pay',query:{ order: res.data.id }});
      })

    },
    setSize1: function() {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.screenWidth = width;
      //图片                高 / 宽  1200 / 1920
      let w= 0;
      if (width<=1024)
      {
        w = width;
      }else{
        w=width-450;
      }
      this.bannerHeight = 1200 / 1920 * w - 50;
      // document.getElementById('el-carousel').style.height = this.bannerHeight + 'px';
      // document.getElementById('el-carousel1').style.height = this.bannerHeight + 'px';

    },
    setSize: function(width) {
      let w= 0;
      this.screenWidth = width;
      if (width<=1024)
      {
        w = width;
      }else{
        w=width-450;
      }
      this.bannerHeight = 1200 / 1920 * w - 50;
      // document.getElementById('el-carousel').style.height = this.bannerHeight + 'px';
      // document.getElementById('el-carousel1').style.height = this.bannerHeight + 'px';

    },
    show(){
      this.detail=true;
    },
    share(){
      this.url='';
      this.modules.forEach(module =>{
        if (module.has_choice==1)
          this.url=this.url +String.fromCharCode(64  + (module.order/100)) + String.fromCharCode(64  + (module.order%100));
        else
          this.url=this.url + String.fromCharCode(64  + (module.order/100));
      })
      console.log(this.url);
      this.share_show = true;
    }
  },
  mounted() {
    this.setSize1();
    const that = this;
    //监听浏览器窗口大小改变
    window.addEventListener('resize', function() {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      that.screenWidth = width;
      that.setSize(width);
    }, false);
  },
  created() {
    this.getInfo(this);
    Promise.all([
      new Promise((resolve) =>{
        setTimeout(()=>{resolve('这个数据获取需要1秒')},1000)
      }),
      new Promise((resolve) =>{
        setTimeout(()=>{resolve('这个数据获取需要5秒')},2000)
      })
    ]).then(res => {
      console.log(res)
      // 返回 = ['这个数据获取需要1秒', '这个数据获取需要5秒']
      //此时在去执行渲染页面，就可以保证数据的获取
      console.log("下面开始渲染表格等内容....")
      this.is_show=true;
    });

    console.log(this.modules);
    console.log(this.view_list);
  }
}
</script>

<style scoped>
/deep/#slide  .el-carousel__container {
  height: auto;
}
/deep/#defaultImages .el-radio__input{
  display: none;

}
/deep/#defaultImages .el-radio{
  border: 1px solid ;
}
/deep/#defaultImages .is-checked {
  border: 3px solid #5168dd !important;
}
.slide{
  position: sticky;
  top: 60px;
  z-index: 900;
  background: #ecedf1
}
.title_1{
  font-size: 1.4rem;
  font-weight: bold;
}
.title_2{
  font-size: 1.2rem;
  text-align: left;
  margin-left: 0;
  margin-top: 5px;
  margin-bottom: 2px;
  font-weight: bold;
}
.choice_list{
  max-width: 100%;

}

.choice{
  flex: 1;
  margin-left: 0px;
  margin-right: 0px;
  width: 15vw;
}
.scrollbar-demo-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #fdfdfe;
  color: black;
}


.color-selector{
  width: 100%;
}

.color-selector button:focus {
  border: 5px solid black;

}
.choice_name{
  margin: 0;
}
.choice_price{
  font-size: 14px;
  color: gray;
  font-family:  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;;
  margin: 5px 0 10px;
}
.example_image{
  max-width: 100vw;
}
.bottom{

  border-radius: 10px 10px 0 0;
  color: white;
  background: #515154;
  text-align: center;
  display: flex;
  height: 100px;
  z-index:999;
  position: sticky;
  bottom: 0px;
}
.table-title {
  text-align: left;
  margin-bottom: 10px;
  color: #303133;
  font-size: 16px;
  font-weight: 700;
}
.table-item {
  margin-bottom: 5px;
  color: #909399;
  font-size: 14px;
  font-family: sans-serif;
  display: flex;
}
</style>

<style lang="scss">
.el-carousel__container {
  height: 100% !important;
}

img {
  display: inline-block;
  height: auto;
  max-width: 100%;
}
</style>
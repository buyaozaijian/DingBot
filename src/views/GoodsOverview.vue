
<template>
  <div class="main-struct">
    <!-- 一个div组件：占满屏幕顶部5%区域-->
    <div style="height: 3%"></div>
    <!-- 一个div组件：占满屏幕顶部5%区域-->
    <div style="height: 3%">
      <v-text style="font-weight: 700; margin-left:15px; font-size: large">滑板配置系统 </v-text>
      <!-- 一个位于文字正下方的按钮-->
      <v-btn id="menubtn" density="compact" icon="mdi-menu" @click="lefthide"></v-btn>
      <v-btn id="orderbtn" style="margin-left: 10px;" density="compact" icon="mdi-checkbook" @click="jumptoorder"></v-btn>
    </div>
    <!-- 一个div组件：占满屏幕顶部5%区域-->
    <div style="height: 3%"></div>
    <!-- 一个div组件：占满屏幕剩余区域，可滚动下滑-->
    <div style="height: 90%; overflow-y: scroll">
      <!-- 一个div组件：占满屏幕剩余95%区域的左侧20%区域-->
      <v-slide-x-transition >
        <div
        style="width: 24%; float: left; height: 100%; background-color: #ffffff" v-show="this.leftshow"
        >
        <!-- 标题为滑板型号，加粗，下方为两个按钮，文案分别为城市和越野，按钮初始为白底黑边框-->
        <v-card class="mx-auto" max-width="300">
          <!-- <v-list-item-group v-model="model" active-color="purple">
            <v-list :items="items"></v-list>
          </v-list-item-group>
          <v-list-item-group v-model="model2">
            <v-list :items="items2"></v-list> 
          </v-list-item-group> -->
          <v-text style="font-weight: 700; margin-left:15px;"> 滑板类型</v-text>
          <div style="width: 100%; margin-left:15px;">
            <v-btn
              
              id="selectbar"
              width="80%"
              style="margin-top: 15px"
              variant="outlined"
              flat
              @click="setBar"
              @mouseover="barover"
              @mouseout="barout"

              >

              <!-- <template v-slot:prepend>
                <v-icon id="baricon" color="black"></v-icon>
              </template> -->

              <!-- 一个按钮左边空白10%的div-->
              <div style="width: 10%; float: left; height: 100%"></div>

              <v-text id="bartext"> 带把 </v-text>
            </v-btn>
          </div>
          <div style="width: 100%; margin-left:15px;">
            <v-btn
              
              id="selectnobar"
              width="80%"
              style="margin-top: 15px"
              variant="outlined"
              flat
              @click="setNoBar"
              @mouseover="nobarover"
              @mouseout="nobarout"
            >
              <!-- <template v-slot:prepend>
                <v-icon id="nobaricon" color="black"></v-icon>
              </template> -->

              <!-- 一个按钮左边空白10%的div-->
              <div style="width: 10%; float: left; height: 100%"></div>

              <v-text id="nobartext"> 不带把 </v-text>
            </v-btn>
          </div>

          <!-- <v-card width="100%" flex>
            
          </v-card> -->
          <div style="width: 100%;margin-top: 15px;margin-left:15px;">
            <v-text style="font-weight: 700; width: 100%;  "> 应用场景</v-text>
          </div>
          <div style="width: 100%;margin-left:15px;">
            <v-btn
              
              id="selecturban"
              width="80%"
              style="margin-top: 15px"
              variant="outlined"
              flat
              @click="setUrban"
              @mouseover="urbanover"
              @mouseout="urbanout"
            >
              <!-- <template v-slot:prepend>
                <v-icon id="urbanicon" color="black"></v-icon>
              </template> -->

              <!-- 一个按钮左边空白10%的div-->
              <div style="width: 10%; float: left; height: 100%"></div>
              <v-text id="urbantext">城市</v-text>
            </v-btn>
          </div>
          <div style="width: 100%;margin-left:15px;">
            <v-btn
              
              id="selectoffroad"
              width="80%"
              style="margin-top: 15px"
              variant="outlined"
              flat
              @click="setOffRoad"
              @mouseover="offrover"
              @mouseout="offrout"
            >

              <!-- 一个按钮左边空白10%的div-->
              <div style="width: 10%; float: left; height: 100%"></div>
              <v-text id="offroadtext"> 越野 </v-text>
            </v-btn>
          </div>

        </v-card>
        </div>

      </v-slide-x-transition>
      <!-- <transition name="slide-left">
        
      </transition> -->

      <!-- 一个垂直分割线，分隔两个div,颜色为灰色-->
      <div
        style="
          width: 0.1%;
          float: left;
          height: 100%;
          background-color: #d0d0d0;
        "
      ></div>

      <!-- 一个div组件：占满屏幕剩余95%区域的右侧80%区域,文字左侧5%保持空白-->
      <div
        style="width: 75%; float: left; height: 100%; background-color: #ffffff"
      >
        <!-- <v-card class="mx-auto" max-width="79%">
            <v-card class="mx-auto" max-width="300"> 1 </v-card>
          </v-card> -->
        <!-- 
          1.默认展示所有品类（目前有4个 城市越野，带车把不带车把）
          2.每个品类需要单独一行展示，品类名称
          3.每个品类下面需要展示该品类下的所有滑板，每个滑板需要展示图片，名称，价格
          4.根据选择条件改变需要改变展示的内容
          -->

        <!-- 一个测试 两个row时改变其中一个roll的v-show会怎样？-->

        <!-- 下面是2个栅格展示效果-->

        <v-row
          v-for="types in typelist"
          :key="types.subtype"
          no-gutters
          style="margin-top: 10px"
        >
          <!-- 进入以后主要是要解决
          1.类型得单独一行
          2.筛选完的卡片前面不能空出来
          
          -->

          <!-- 先带把后不带把 -->
          <v-col
            :cols="12"
            v-if="
              (types.type === this.selectedtype ||
                this.selectedtype === 'all') &&
              (types.enviromnemt === this.selectedenvironment ||
                this.selectedenvironment === 'all')
            "
          >
            <v-card variant="flat">
              <v-card-title style="font-weight: 700; font-size: larger">
                {{ types.subtype }}</v-card-title
              >
            </v-card>
            <!--先城市后越野 -->

            <!-- 带把城市 -->
            <v-row
              v-if="
                (types.type === this.selectedtype ||
                  this.selectedtype === 'all') &&
                (types.enviromnemt === this.selectedenvironment ||
                  this.selectedenvironment === 'all') &&
                types.enviromnemt === '城市' &&
                types.type === '带把'
              "
            >
              <v-col
                v-for="urbanbarcar in barurbancarlists"
                :key="urbanbarcar.id"
                :cols="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
              >
                <v-card
                  class="pa-2 ma-2"
                  v-if="
                    urbanbarcar.type === '城市' &&
                    urbanbarcar.mothertype === '带把'
                  "
                  variant="flat"
                  @click="jumptodetail(urbanbarcar.id)"
                >
                  <v-img
                    v-bind:src="
                      'https://dingbotboards.com' + urbanbarcar.src
                    "
                    cover
                  ></v-img>
                  <v-card-title> {{ urbanbarcar.name }}</v-card-title>
                  <v-card-text>最低价: {{ urbanbarcar.lowprice }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- 带把越野 -->
            <v-row
              v-if="
                (types.type === this.selectedtype ||
                  this.selectedtype === 'all') &&
                (types.enviromnemt === this.selectedenvironment ||
                  this.selectedenvironment === 'all') &&
                types.enviromnemt === '越野' &&
                types.type === '带把'
              "
            >
              <v-col
                v-for="offroadcarbarcar in baroffroadcarslists"
                :key="offroadcarbarcar.id"
                :cols="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
              >
                <v-card
                  class="pa-2 ma-2"
                  v-if="
                    offroadcarbarcar.type === '越野' &&
                    offroadcarbarcar.mothertype === '带把'
                  "
                  variant="flat"
                  @click="jumptodetail(offroadcarbarcar.id)"
                >
                  <v-img
                    v-bind:src="
                      'https://dingbotboards.com' + offroadcarbarcar.src
                    "
                    cover
                  ></v-img>
                  <v-card-title> {{ offroadcarbarcar.name }}</v-card-title>
                  <v-card-text
                    >最低价: {{ offroadcarbarcar.lowprice }}</v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>

            <!-- 不带把城市 -->
            <v-row
              v-if="
                (types.type === this.selectedtype ||
                  this.selectedtype === 'all') &&
                (types.enviromnemt === this.selectedenvironment ||
                  this.selectedenvironment === 'all') &&
                types.enviromnemt === '城市' &&
                types.type === '不带把'
              "
            >
              <v-col
                v-for="urbannobarcar in nobarurbancarlists"
                :key="urbannobarcar.id"
                :cols="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
              >
                <v-card
                  class="pa-2 ma-2"
                  v-if="
                    urbannobarcar.type === '城市' &&
                    urbannobarcar.mothertype === '不带把'
                  "
                  variant="flat"
                  @click="jumptodetail(urbannobarcar.id)"
                >
                  <v-img
                    v-bind:src="
                      'https://dingbotboards.com' + urbannobarcar.src
                    "
                    cover
                  ></v-img>
                  <v-card-title> {{ urbannobarcar.name }}</v-card-title>
                  <v-card-text
                    >最低价: {{ urbannobarcar.lowprice }}</v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>

            <!-- 不带把越野 -->

            <v-row
              v-if="
                (types.type === this.selectedtype ||
                  this.selectedtype === 'all') &&
                (types.enviromnemt === this.selectedenvironment ||
                  this.selectedenvironment === 'all') &&
                types.enviromnemt === '越野' &&
                types.type === '不带把'
              "
            >
              <v-col
                v-for="offroadcarnobarcar in nobaroffroadcarslists"
                :key="offroadcarnobarcar.id"
                :cols="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
              >
                <v-card
                  class="pa-2 ma-2"
                  v-if="
                    offroadcarnobarcar.type === '越野' &&
                    offroadcarnobarcar.mothertype === '不带把'
                  "
                  variant="flat"
                  @click="jumptodetail(offroadcarnobarcar.id)"
                >
                  <v-img
                    v-bind:src="
                      'https://dingbotboards.com' + offroadcarnobarcar.src
                    "
                    cover
                  ></v-img>
                  <v-card-title> {{ offroadcarnobarcar.name }}</v-card-title>
                  <v-card-text
                    >最低价: {{ offroadcarnobarcar.lowprice }}</v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- <div style="height: 10%">right top</div>
          <div style="height: 90%">right bottom</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    iconbar: 'mdi-close',
    items: [
      { type: 'subheader', title: '滑板类型' },
      {
        title: '带车把',
        value: 1,
      },
      {
        title: '不带车把',
        value: 2,
      },

      { type: 'divider' },
    ],
    carsnow: 8,
    leftshow: false,
    cursubtype: '',
    items2: [
      { type: 'subheader', title: '应用场景' },
      {
        title: '城市',
        value: 1,
      },
      {
        title: '越野',
        value: 2,
      },
      //   { type: 'divider' },
    ],
    selectedtype: 'all',
    selectedenvironment: 'all',
    //selectedtypes: '城市-a',
    mothertypetypelist: [
      '带把',
      '不带把'
    ],
    //showlist用于提取符合的数据
    showlist: [
    ],
    model: 1,
    model2: 1,
    typelist: [
      {
        type: '带把',
        enviromnemt: '城市',
        subtype: '带把-城市'

      },
      {
        type: '带把',
        enviromnemt: '越野',
        subtype: '带把-越野'

      },
      {
        type: '不带把',
        enviromnemt: '城市',
        subtype: '不带把-城市'

      },
      {
        type: '不带把',
        enviromnemt: '越野',
        subtype: '不带把-越野'

      },


    ],
    barurbancarlists: [
      // {
      //   id: 1,
      //   mothertype: '带把',
      //   type: '带把-城市',
      //   name: '带把-城市-1',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 2,
      //   mothertype: '带把',
      //   type: '带把-城市',
      //   name: '带把-城市-2',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 3,
      //   mothertype: '带把',
      //   type: '带把-城市',
      //   name: '带把-城市-3',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 4,
      //   mothertype: '带把',
      //   type: '带把-城市',
      //   name: '带把-城市-4',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 5,
      //   mothertype: '带把',
      //   type: '带把-城市',
      //   name: '带把-城市-5',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 6,
      //   mothertype: '带把',
      //   type: '带把-城市',
      //   name: '带把-城市-6',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
    ],
    baroffroadcarslists: [
      // {
      //   id: 4,
      //   mothertype: '带把',
      //   type: '带把-越野',
      //   name: '带把-越野-1',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 5,
      //   mothertype: '带把',
      //   type: '带把-越野',
      //   name: '带把-越野-2',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 6,
      //   mothertype: '带把',
      //   type: '带把-越野',
      //   name: '带把-越野-3',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
    ],
    nobarurbancarlists: [
      // {
      //   id: 1,
      //   mothertype: '不带把',
      //   type: '不带把-城市',
      //   name: '不带把-城市-1',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 2,
      //   mothertype: '不带把',
      //   type: '不带把-城市',
      //   name: '不带把-城市-2',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 3,
      //   mothertype: '不带把',
      //   type: '不带把-城市',
      //   name: '不带把-城市-3',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
    ],
    nobaroffroadcarslists: [
      // {
      //   id: 1,
      //   mothertype: '不带把',
      //   type: '不带把-越野',
      //   name: '不带把-越野-1',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 2,
      //   mothertype: '不带把',
      //   type: '不带把-越野',
      //   name: '不带把-越野-2',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
      // {
      //   id: 3,
      //   mothertype: '不带把',
      //   type: '不带把-越野',
      //   name: '不带把-越野-3',
      //   lowprice: '最低价',
      //   src: "/src/assets/4.png"
      // },
    ],
    cars: [
      {
        id: 1,
        mothertype: '带把',
        type: '带把-城市',
        name: '带把-城市-1',
        lowprice: '最低价',
      },
      {
        id: 2,
        mothertype: '带把',
        type: '带把-城市',
        name: '带把-城市-2',
        lowprice: '最低价',
      },
      {
        id: 3,
        mothertype: '带把',
        type: '带把-城市',
        name: '带把-城市-3',
        lowprice: '最低价',
      },
      {
        id: 4,
        mothertype: '带把',
        type: '带把-越野',
        name: '带把-越野-1',
        lowprice: '最低价',
      },
      {
        id: 5,
        mothertype: '带把',
        type: '带把-越野',
        name: '带把-越野-2',
        lowprice: '最低价',
      },
      {
        id: 6,
        mothertype: '不带把',
        type: '不带把-越野',
        name: '不带把-越野-1',
        lowprice: '最低价',
      },
      {
        id: 7,
        mothertype: '越野',
        type: '不带把-越野',
        name: '不带把-越野-2',
        lowprice: '最低价',
      },
      {
        id: 8,
        mothertype: '越野',
        type: '不带把-越野',
        name: '不带把-越野-3',
        lowprice: '最低价',
      },
    ]
  }),

  created() {
    const { code } = this.$route.query
    if (!code) {
      this.$notify.warning('请登录')
      return this.$router.push('/wechatLogin');
    }
    else {
      let formData = new FormData();
      formData.append('code',code);
      this.$axios({
        method:'post',
        url:'https://dingbotboards.com/api/customer/login/',
        data:formData,
      }).then(res=>{
        this.$message.success(res.data.msg);
        localStorage.setItem("token", res.data.token)
      })
    }
  },
  mounted() {

    this.getAllBoards();
  },

  watch: {

  },

  methods: {
    updataShowlist(neededtype) {
      let newlist = [];
      let i = 0;
      for (i = 0; i < this.cars.length; i++) {
        if (this.cars[i].type === neededtype) {
          newlist.push(this.cars[i]);
        }
      }
      this.showlist = newlist;

    },
    lefthide(){
      this.leftshow=!this.leftshow;
    },
    barover(){
      console.log("hoverin")
      var barbtn = document.getElementById("selectbar");
      var bartxt = document.getElementById("bartext");
      //检测selecttype是否为all，如果是all，背景色变成红色，字体变成白色
      if(this.selectedtype==='带把'){
        console.log("check")
        barbtn.style.backgroundColor = "#FF1744";
        bartxt.style.color = "#FFFFFF";
      }
      else{
        barbtn.style.backgroundColor = "#E0E0E0";
        bartxt.style.color = "#000000";
      }

    },
     jumptoorder(){
      this.$router.push('/ordercheck')
    },
    barout(){
      console.log("hoverout")
      var barbtn = document.getElementById("selectbar");
      var bartxt = document.getElementById("bartext");
      if(this.selectedtype==='带把'){
        console.log("check")
        barbtn.style.backgroundColor = "#212121";
        bartxt.style.color = "#FFFFFF";
      }
      else{
        barbtn.style.backgroundColor = "#FFFFFF";
        bartxt.style.color = "#000000";
      }
    },
    nobarover(){
      console.log("hoverin")
      var nobarbtn = document.getElementById("selectnobar");
      var nobartxt = document.getElementById("nobartext");
      //检测背景色 背景色为点击状态颜色（黑色##212121 变成红底白字
      //背景色是白色#000000 变成红框红字
      if(this.selectedtype==='不带把'){
        console.log("check")
        nobarbtn.style.backgroundColor = "#FF1744";
        nobartxt.style.color = "#FFFFFF";
      }
      else{
        nobarbtn.style.backgroundColor = "#E0E0E0";
        nobartxt.style.color = "#000000";
      }

    },
    nobarout(){
      console.log("hoverout")
      var nobarbtn = document.getElementById("selectnobar");
      var nobartxt = document.getElementById("nobartext");
      //检测背景色 背景色为改变的红色，变成黑底白字
      //背景色没变，变回原来黑字
      if(this.selectedtype==='不带把'){
        console.log("check")
        nobarbtn.style.backgroundColor = "#212121";
        nobartxt.style.color = "#FFFFFF";
      }
      else{
        nobarbtn.style.backgroundColor = "#FFFFFF";
        nobartxt.style.color = "#000000";
      }
    },
    urbanover(){
      console.log("hoverin")
      var selecturbanbtn = document.getElementById("selecturban");
      var urbantxt = document.getElementById("urbantext");
      //检测selectenvironment是否为all，如果是all，背景色变成红色，字体变成白色
      if(this.selectedenvironment==='城市'){
        console.log("check")
        selecturbanbtn.style.backgroundColor = "#FF1744";
        urbantxt.style.color = "#FFFFFF";
      }
      else{
        selecturbanbtn.style.backgroundColor = "#E0E0E0";
        urbantxt.style.color = "#000000";
      }


    },
    urbanout(){
      console.log("hoverout")
      var selecturbanbtn = document.getElementById("selecturban");
      var urbantxt = document.getElementById("urbantext");
      if(this.selectedenvironment==='城市'){
        console.log("check")
        selecturbanbtn.style.backgroundColor = "#212121";
        urbantxt.style.color = "#FFFFFF";
      }
      else{
        selecturbanbtn.style.backgroundColor = "#FFFFFF";
        urbantxt.style.color = "#000000";
      }
    },
    offrover(){
      console.log("hoverin")
      var selectoffroadbtn = document.getElementById("selectoffroad");
      var offroadtxt = document.getElementById("offroadtext");
      if(this.selectedenvironment==='越野'){
        console.log("check")
        selectoffroadbtn.style.backgroundColor = "#FF1744";
        offroadtxt.style.color = "#FFFFFF";
      }
      else{
        selectoffroadbtn.style.backgroundColor = "#E0E0E0";
        offroadtxt.style.color = "#000000";
      }

    },
    offrout(){
      console.log("hoverout")
      var selectoffroadbtn = document.getElementById("selectoffroad");
      var offroadtxt = document.getElementById("offroadtext");
      if(this.selectedenvironment==='越野'){
        console.log("check")
        selectoffroadbtn.style.backgroundColor = "#212121";
        offroadtxt.style.color = "#FFFFFF";
      }
      else{
        selectoffroadbtn.style.backgroundColor = "#FFFFFF";
        offroadtxt.style.color = "#000000";
      }
    },

    setBar() {
      var barbtn = document.getElementById("selectbar");
      var nobarbtn = document.getElementById("selectnobar");
      var bartxt = document.getElementById("bartext");
      var nobartxt = document.getElementById("nobartext");
      if (this.selectedtype === 'all') {
        this.selectedtype = '带把'
        barbtn.style.backgroundColor = "#212121";
        bartxt.style.color = "#FFFFFF";
      }
      else {
        if (this.selectedtype === '不带把') {
          this.selectedtype = '带把'
          barbtn.style.backgroundColor = "#212121";
          nobarbtn.style.backgroundColor = "#FFFFFF";
          bartxt.style.color = "#FFFFFF";
          nobartxt.style.color = "#000000";
          
        }
        else {
          this.selectedtype = 'all'
          barbtn.style.backgroundColor = "#FFFFFF";
          bartxt.style.color = "#000000";
        }
      }
    },
    setNoBar() {
      var barbtn = document.getElementById("selectbar");
      var nobarbtn = document.getElementById("selectnobar");
      var bartxt = document.getElementById("bartext");
      var nobartxt = document.getElementById("nobartext");
      if (this.selectedtype === 'all') {
        this.selectedtype = '不带把'
        nobarbtn.style.backgroundColor = "#212121";
        nobartxt.style.color = "#FFFFFF";
      }
      else {
        if (this.selectedtype === '带把') {
          this.selectedtype = '不带把'
          nobarbtn.style.backgroundColor = "#212121";
          barbtn.style.backgroundColor = "#FFFFFF";
          nobartxt.style.color = "#FFFFFF";
          bartxt.style.color = "#000000";
        }
        else {
          this.selectedtype = 'all'
          nobarbtn.style.backgroundColor = "#FFFFFF";
          nobartxt.style.color = "#000000";
        }
      }

    },
    setUrban() {
      var selecturbanbtn = document.getElementById("selecturban");
      var selectoffroadbtn = document.getElementById("selectoffroad");
      var urbantxt = document.getElementById("urbantext");
      var offroadtxt = document.getElementById("offroadtext");
      
      if (this.selectedenvironment === 'all' || this.selectedenvironment === '越野') {
        this.selectedenvironment = '城市'
        selecturbanbtn.style.backgroundColor = "#212121";
        selectoffroadbtn.style.backgroundColor = "#FFFFFF";
        urbantxt.style.color = "#FFFFFF";
        offroadtxt.style.color = "#000000";
      }
      else {
        this.selectedenvironment = 'all'
        selecturbanbtn.style.backgroundColor = "#FFFFFF";
        urbantxt.style.color = "#000000";

      }
    },
    setOffRoad() {
      var selecturbanbtn = document.getElementById("selecturban");
      var selectoffroadbtn = document.getElementById("selectoffroad");
      var urbantxt = document.getElementById("urbantext");
      var offroadtxt = document.getElementById("offroadtext");
      if (this.selectedenvironment === 'all' || this.selectedenvironment === '城市') {
        this.selectedenvironment = '越野'
        selectoffroadbtn.style.backgroundColor = "#212121";
        selecturbanbtn.style.backgroundColor = "#FFFFFF";
        offroadtxt.style.color = "#FFFFFF";
        urbantxt.style.color = "#000000";
      }
      else {
        this.selectedenvironment = 'all'
        selectoffroadbtn.style.backgroundColor = "#FFFFFF";
        offroadtxt.style.color = "#000000";
      }

    },
    jumptodetail(id) {
      this.$router.push("/selectconfigure/"+ id +"/0" );
      console.log("click")
    },
    async getAllBoards() {
      let formData = new FormData();
      let barlist = [];
      let nobarlist = [];
      let tmpurbanlist = [];
      let tmpoffroadlist = [];
      let tmpnourbanlist = [];
      let tmpnooffroadlist = [];
      let bari = 0;
      let nobari = 0;
      let barurban = {
        id: '',
        mothertype: '',
        type: '',
        name: '',
        lowprice: '',
        src: ''
      };
      let baroff = {
        id: '',
        mothertype: '',
        type: '',
        name: '',
        lowprice: '',
        src: ''
      };
      let nobarurban = {
        id: '',
        mothertype: '',
        type: '',
        name: '',
        lowprice: '',
        src: ''
      };
      let nobaroff = {
        id: '',
        mothertype: '',
        type: '',
        name: '',
        lowprice: '',
        src: ''
      };
      //清空原始数据
      this.barurbancarlists = [];
      this.nobarurbancarlists = [];
      this.baroffroadcarslists = [];
      this.nobaroffroadcarslists = [];

      formData.append("level", 1);
      await this.$axios({
        method: "post",
        url: "https://dingbotboards.com/api/product/getProductList/",
        data: formData,
      }).then((res) => {
        console.log("收到数据", res.data.data);
        barlist = res.data.data[0];
        nobarlist = res.data.data[1];
        //依次获取list内元素，推到一个新list上，推送完成将新list赋给urbanlist和offroadlist
        //进行4次赋值
        for (bari = 0; bari < barlist.product_list.length; bari++) {
          //把城市推进urbanlist，越野推进offroadlist
          console.log(barlist.product_list[bari].category.level_2)
          if (barlist.product_list[bari].category.level_2 === '城市') {
            barurban.id = barlist.product_list[bari].id;
            barurban.mothertype = barlist.product_list[bari].category.level_1;
            barurban.type = barlist.product_list[bari].category.level_2;
            barurban.name = barlist.product_list[bari].name;
            barurban.lowprice = barlist.product_list[bari].lowprice;
            barurban.src = barlist.product_list[bari].image;
            console.log(barurban)
            tmpurbanlist.push(barurban);
            console.log(tmpurbanlist)
          }
          else {
            if (barlist.product_list[bari].category.level_2 === '越野') {
              baroff.id = barlist.product_list[bari].id;
              baroff.mothertype = barlist.product_list[bari].category.level_1;
              baroff.type = barlist.product_list[bari].category.level_2;
              baroff.name = barlist.product_list[bari].name;
              baroff.lowprice = barlist.product_list[bari].lowprice;
              baroff.src = barlist.product_list[bari].image;
              tmpoffroadlist.push(baroff);
            }

          }
        }
        this.barurbancarlists = tmpurbanlist;
        this.baroffroadcarslists = tmpoffroadlist;
        //清空临时list
        tmpurbanlist = [];
        tmpoffroadlist = [];
        for (nobari = 0; nobari < nobarlist.product_list.length; nobari++) {
          //把城市推进urbanlist，越野推进offroadlist
          console.log(nobarlist.product_list[nobari].category.level_2)
          if (nobarlist.product_list[nobari].category.level_2 === '城市') {
            //console.log(nobarlist.product_list[nobari].id)
            nobarurban.id = nobarlist.product_list[nobari].id;
            nobarurban.mothertype = nobarlist.product_list[nobari].category.level_1;
            nobarurban.type = nobarlist.product_list[nobari].category.level_2;
            nobarurban.name = nobarlist.product_list[nobari].name;
            nobarurban.lowprice = nobarlist.product_list[nobari].lowprice;
            nobarurban.src = nobarlist.product_list[nobari].image;
            tmpnourbanlist.push(nobarurban);
          }
          else {
            if (nobarlist.product_list[nobari].category.level_2 === '越野') {
              //console.log(nobarlist.product_list[nobari].id)
              nobaroff.id = nobarlist.product_list[nobari].id;
              nobaroff.mothertype = nobarlist.product_list[nobari].category.level_1;
              nobaroff.type = nobarlist.product_list[nobari].category.level_2;
              nobaroff.name = nobarlist.product_list[nobari].name;
              nobaroff.lowprice = nobarlist.product_list[nobari].lowprice;
              nobaroff.src = nobarlist.product_list[nobari].image;
              tmpnooffroadlist.push(nobaroff);
            }

          }
        }
        this.nobarurbancarlists = tmpnourbanlist;
        this.nobaroffroadcarslists = tmpnooffroadlist;
        //清空临时list
        tmpurbanlist = [];
        tmpoffroadlist = [];

        //console.log("看看子类" , res.data.data[1].product_list[0].category);
        //let newcategory = res.data.data[1].product_list[0].category;
        //console.log("尝试查看层级",newcategory.level_1);

      }).catch((err) => {
        console.log(err);
      });

    }

  }
}
</script>

<style scope>
.main-struct {
  height: 100vh;
  width: 100vw;
}
/* .v-btn:hover {
  background-color: #E53935;
  color: white
} */

/* 给name为slide-left的容器添加过渡属性 */
.slide-left-enter-active {
  transition: all 0.5s;
  overflow: hidden;
}
.slide-left-leave-active {
  transition: all 0.3s;
  overflow: hidden;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}




</style>
 
 
   

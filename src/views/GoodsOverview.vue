
<template>
  <div class="main-struct">
    <!-- 一个div组件：占满屏幕顶部5%区域-->
    <div style="height: 3%"></div>
    <!-- 一个div组件：占满屏幕顶部5%区域-->
    <div style="height: 3%">
      <v-text>滑板配置系统</v-text>
    </div>
    <!-- 一个div组件：占满屏幕顶部5%区域-->
    <div style="height: 3%"></div>
    <!-- 一个div组件：占满屏幕剩余区域，可滚动下滑-->
    <div style="height: 90%; overflow-y: scroll">
        <!-- 一个div组件：占满屏幕剩余95%区域的左侧20%区域-->
        <div
          style="
            width: 19%;
            float: left;
            height: 100%;
            background-color: #ffffff;
          "
        >
          <!-- 标题为滑板型号，加粗，下方为两个按钮，文案分别为城市和越野，按钮初始为白底黑边框-->
          <v-card class="mx-auto" max-width="300">
            <v-list :items="items"></v-list>
            <v-list :items="items2"></v-list>
          </v-card>
        </div>
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
          style="
            width: 70%;
            float: left;
            height: 100%;
            background-color: #ffffff;
          "
        >
          <!-- <v-card class="mx-auto" max-width="79%">
            <v-card class="mx-auto" max-width="300"> 1 </v-card>
          </v-card> -->
          <!-- <div>
            <v-btn
              color="primary"
              @click="selectedtype = '城市'"
              style="margin: 10px"
            >
              城市
            </v-btn>
            <v-btn
              color="primary"
              @click="selectedtype = '越野'"
              style="margin: 10px"
            >
              越野
            </v-btn>
          </div> -->

          <v-row
            v-for="types in typelist"
            no-gutters
            style="margin-top: 10px"
          >
            <v-col :cols="12" v-if="types.type === this.selectedtype">
                <v-card variant="flat">
                    <v-card-title > {{ types.subtype }}</v-card-title>
                    
                </v-card> 
                
            </v-col>
            <v-col
              v-for="urbancar in urbancarlists"
              :key="urbancar.id"
              :cols="3"
              v-if="types.type === this.selectedtype"
            >
              <v-card class="pa-2 ma-2" v-if="urbancar.type === types.subtype" variant="flat">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  cover
                ></v-img>
                <v-card-title> {{ urbancar.name }}</v-card-title>
                <v-card-text> {{ urbancar.lowprice }}</v-card-text>
              </v-card>
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
    selectedtype: '带把',
    //selectedtypes: '城市-a',
    typelist: [
      '带把',
      '不带把'
    ],
    //showlist用于提取符合的数据
    showlist:[
    ],
    typelist: [
      {
        type: '带把',
        subtype: '带把-城市'

      },
      {
        type: '带把',
        subtype: '带把-越野'

      },
      {
        type: '不带把',
        subtype: '不带把-城市'

      },
      {
        type: '不带把',
        subtype: '不带把-越野'

      },

    ],
    urbancarlists: [
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
    ],
    offroadcarslists: [
    {
        id: 1,
        mothertype: '不带把',
        type: '不带把-越野',
        name: '不带把-越野-1',
        lowprice: '最低价',
      },
      {
        id: 2,
        mothertype: '越野',
        type: '不带把-越野',
        name: '不带把-越野-2',
        lowprice: '最低价',
      },
      {
        id: 3,
        mothertype: '越野',
        type: '不带把-越野',
        name: '不带把-越野-3',
        lowprice: '最低价',
      },
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

  watch:{

  },

  methods: {
    updataShowlist(neededtype){
      let newlist = [];
      let i=0;
      for(i = 0;i < this.cars.length;i++){
        if(this.cars[i].type === neededtype){
          newlist.push(this.cars[i]);
        }
      }
      this.showlist = newlist;

    }

  }
}
</script>

<style>
.main-struct {
  height: 100vh;
  width: 100vw;
}
</style>
 
 
   
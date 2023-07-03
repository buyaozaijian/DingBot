
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
        style="width: 19%; float: left; height: 100%; background-color: #ffffff"
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
        style="width: 70%; float: left; height: 100%; background-color: #ffffff"
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
              <v-card-title> {{ types.subtype }}</v-card-title>
            </v-card>
            <!--先城市后越野 -->
            <v-row
              v-if="
                (types.type === this.selectedtype ||
                  this.selectedtype === 'all') &&
                (types.enviromnemt === this.selectedenvironment ||
                  this.selectedenvironment === 'all')&&
                (types.enviromnemt==='城市')
              "
            >
              <v-col
                v-for="urbanbarcar in barurbancarlists"
                :key="urbanbarcar.id"
                :cols="3"
              >
                <v-card
                  class="pa-2 ma-2"
                  v-if="urbanbarcar.type === types.subtype"
                  variant="flat"
                >
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    cover
                  ></v-img>
                  <v-card-title> {{ urbanbarcar.name }}</v-card-title>
                  <v-card-text> {{ urbanbarcar.lowprice }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>


            <!-- 越野 -->
            <v-row
              v-if="
                (types.type === this.selectedtype ||
                  this.selectedtype === 'all') &&
                (types.enviromnemt === this.selectedenvironment ||
                  this.selectedenvironment === 'all')&&
                (types.enviromnemt==='越野')
              "
            >
              <v-col
                v-for="urbanbarcar in baroffroadcarslists"
                :key="urbanbarcar.id"
                :cols="3"
              >
                <v-card
                  class="pa-2 ma-2"
                  v-if="urbanbarcar.type === types.subtype"
                  variant="flat"
                >
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    cover
                  ></v-img>
                  <v-card-title> {{ urbanbarcar.name }}</v-card-title>
                  <v-card-text> {{ urbanbarcar.lowprice }}</v-card-text>
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
    selectedenvironment: 'all',
    //selectedtypes: '城市-a',
    mothertypetypelist: [
      '带把',
      '不带把'
    ],
    //showlist用于提取符合的数据
    showlist: [
    ],
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
    ],
    baroffroadcarslists: [
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
        mothertype: '带把',
        type: '带把-越野',
        name: '带把-越野-3',
        lowprice: '最低价',
      },
    ],
    nobarurbancarlists: [
      {
        id: 1,
        mothertype: '不带把',
        type: '不带把-城市',
        name: '不带把-城市-1',
        lowprice: '最低价',
      },
      {
        id: 2,
        mothertype: '不带把',
        type: '不带把-城市',
        name: '不带把-城市-2',
        lowprice: '最低价',
      },
      {
        id: 3,
        mothertype: '不带把',
        type: '不带把-城市',
        name: '不带把-城市-3',
        lowprice: '最低价',
      },
    ],
    nobaroffroadcarslists: [
      {
        id: 1,
        mothertype: '不带把',
        type: '不带把-越野',
        name: '不带把-越野-1',
        lowprice: '最低价',
      },
      {
        id: 2,
        mothertype: '不带把',
        type: '不带把-越野',
        name: '不带把-越野-2',
        lowprice: '最低价',
      },
      {
        id: 3,
        mothertype: '不带把',
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
 
 
   
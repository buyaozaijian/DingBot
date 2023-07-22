 <template>
  <div class="main-struct">
    <div style="height: 5%"></div>
    <div class="ordertable-title" style="height: 5%">
      <div style="width: 10%"></div>
      <div style="width: 80%; margin-left: 20px">
        <v-text style="font-weight: 700; font-size: large"> 订单列表 </v-text>
      </div>
    </div>

    <div style="height: 90%; overflow-y: scroll">
      <!--一个div组件：占满屏幕剩余区域的左侧20%区域-->
      <div
        style="width: 5%; height: 100%; float: left; background-color: #ffffff"
      ></div>
      <!-- 一个div组件，占满剩余80%区域-->
      <div
        style="
          width: 90%;
          height: 100%;
          display: flex;
          background-color: #ffffff;
        "
      >
        <el-table
          :data="orderlist"
          style="width: 100%; height: 50%"
          :default-sort="{ prop: 'idenfy', order: 'descending' }"
        >
          <el-table-column
            prop="idenfy"
            label="订单编号"
            sortable
            width="150%"
          />
          <el-table-column
            prop="orderdate"
            label="订单日期"
            sortable
            width="150%"
          />
          <el-table-column prop="orderstatus" label="订单状态" width="100%" />
          <el-table-column prop="ordercustomer" label="订单客户" width="150%" />
          <el-table-column
            prop="orderprice"
            label="订单价格"
            sortable
            width="200%"
          />
          <el-table-column fixed="right" label="Operations" width="100%">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="DetaildialogFunc(scope.row.idenfy)"
                >订单详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div
        style="width: 5%; height: 100%; float: right; background-color: #ffffff"
      ></div>
    </div>

    <v-dialog
      v-model="detaildialog"
      hide-overlay
      width="60%"
      transition="slide-y-transition"
      id="bar"
    >
      <v-card>
        <v-toolbar dark color="primary" class="font-weight-bold" v-ripple>
          <v-btn icon dark @click="detaildialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>详细信息</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="detaildialog = false"> 确定 </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div
          v-if="!ifReady"
          style="height: 700px"
          class="d-flex justify-center align-center"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div v-else>
          <v-list three-line subheader>
            <v-subheader style="font-weight: 700;margin-left: 5px;">基本信息</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>订单编号</v-list-item-title>
                <v-list-item-subtitle>{{ selectitem.idenfy }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>产品id</v-list-item-title>
                <v-list-item-subtitle>{{
                  selectitem.productid
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>产品名</v-list-item-title>
                <v-list-item-subtitle>{{
                  selectitem.productname
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>
          <!-- <v-subheader>订单信息</v-subheader> -->
          <v-list three-line subheader>
            <v-subheader style="font-weight: 700;margin-left: 5px;">订单信息</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>订单金额</v-list-item-title>
                <v-list-item-subtitle>{{
                  selectitem.orderprice
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>订单状态</v-list-item-title>
                <v-list-item-subtitle>{{
                  selectitem.orderstatus
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>收货人</v-list-item-title>
                <v-list-item-subtitle>{{
                  selectitem.ordercustomer
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>手机号</v-list-item-title>
                <v-list-item-subtitle>{{
                  selectitem.customerphone
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>地址</v-list-item-title>
                <v-list-item-subtitle>{{
                  selectitem.customeraddress
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>订单时间</v-list-item-title>
                <v-list-item-subtitle>{{
                  selectitem.orderdate
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>


  <script>
// import orderdetail from '../components/orderdetail.vue';

export default {
  data: () => ({
    detaildialog: false,
    checkorderidenfy: '',
    ifReady: false,
    selectitem: {
      idenfy: '12113',
      productid: '1231',
      productname: '111',
      productconfiguration: '123',
      orderdate: '213',
      orderstatus: '123',
      ordercustomer: '12312',
      customerphone: '1231',
      customeraddress: '1123',
      orderprice: '1231',
    },
    orderlist: [
      {
        idenfy: '1145141919810',
        orderdate: '2023-01-01',
        orderstatus: '1',
        ordercustomer: 'ASE11',
        orderprice: '100.0',
      },
      {
        idenfy: '2328172381',
        orderdate: '2023-02-02',
        orderstatus: '0',
        ordercustomer: 'GBT',
        orderprice: '200.0',
      },
      {
        idenfy: '232315555123',
        orderdate: '2023-03-03',
        orderstatus: '0',
        ordercustomer: '俊飞',
        orderprice: '300.0',
      },
      {
        idenfy: '4231131246663',
        orderdate: '2023-04-04',
        orderstatus: '1',
        ordercustomer: 'aa1222',
        orderprice: '400.0',
      },
      {
        idenfy: '5312325111981',
        orderdate: '2023-05-05',
        orderstatus: '1',
        ordercustomer: 'u2pia',
        orderprice: '500.0',
      },
      {
        idenfy: '654312179892',
        orderdate: '2023-06-06',
        orderstatus: '1',
        ordercustomer: 'loba',
        orderprice: '600.0',
      },

    ],
  }),
  components: {
    // orderdetail,
  },
  mounted() {
    this.getAllOrderList();
  },
  watch: {
  },
  methods: {
    async getAllOrderList() {
      await this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method: "post",
        url: "http://dingbotboards.shlprn.cn/api/customer/getOrderList/",
      }).then((res) => {
        console.log("收到数据", res.data);

      }).catch((err) => {
        console.log(err);
      });

    },
    async getOrderInfo(idenfy) {
      let formData = new FormData();
      formData.append("order_id", idenfy);
      await this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method: "post",
        url: "http://dingbotboards.shlprn.cn/api/customer/getOrderInfo/",
        data: {
          data: formData,
        }
      }).then((res) => {
        console.log("收到数据", res.data);
        this.selectitem.idenfy = res.data.identifier
        this.selectitem.productid = res.data.product_info.id
        this.selectitem.productname = res.data.product_info.name
        this.selectitem.productconfiguration = res.data.configuration
        this.selectitem.orderdate = res.data.time
        this.selectitem.orderstatus = res.data.status
        this.selectitem.ordercustomer = res.data.customer_name
        this.selectitem.customerphone = res.data.phone
        this.selectitem.customeraddress = res.data.address
        this.selectitem.orderprice = res.data.price
        this.ifReady = true
      }).catch((err) => {
        console.log(err);
        //this.ifReady = true
      });
    },
    DetaildialogFunc(idenfy) {
      console.log(idenfy)
      this.checkorderidenfy = idenfy
      this.detaildialog=true
      this.checkorderidenfy=idenfy
      //弹框变转圈 触发查询
      this.ifReady = false
      this.getOrderInfo(idenfy)
      
      // this.$alert(idenfy, '订单详情', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     this.$message({
      //       type: 'info',
      //       message: `action: ${action}`
      //     });
      //   }
      // });
    },
    getDialog(msg) {
      this.detaildialog = msg
    }
  }
}
  </script>

  <style scoped>
.main-struct {
  height: 100vh;
  width: 100vw;
}
</style>
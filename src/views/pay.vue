<template>
  <div style="display: flex; justify-content: center;width: 100%">
    <img :src="'https://dingbotboards.com'+pic">
  </div>
</template>

<script>
export default {
  name: "pay",
  created() {
    this.payorder();
    this.click();
  },
  data(){
    return {
      pic:'',
    }
  },
  methods:{
    click () {
      let  timer = setInterval(() => {
        this.paycheck(timer)
      }, 1000)
    },
    paycheck (timer) {
      setTimeout(()=>{
        let formData = new FormData();
        formData.append('order_id',this.$route.query.order)

        this.$axios({
          headers: {
            token: localStorage.getItem('token')
          },
          method:'post',
          url:'https://dingbotboards.com/api/customer/getPayStatus/',
          data:formData,
        }).then(res=>{
          if (res.data.status === 1){
            clearInterval(timer)
            this.$router.push('/ordercheck');
          }
        })
      }, 0)
    },
    payorder(){
      let formData = new FormData();
      formData.append('order_id',this.$route.query.order)
      console.log(this.$route.query.order);
      this.$axios({
        headers: {
          token: localStorage.getItem('token')
        },
        method:'post',
        url:'https://dingbotboards.com/api/customer/payOrder/',
        data:formData,
      }).then(res=>{
        this.pic = res.data.qrcode;
      })
    },
  },
}
</script>

<style scoped>

</style>
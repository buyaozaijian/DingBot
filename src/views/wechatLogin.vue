<template>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <div class="login-main">
    <div class="login">
      <div class="login-form-box">
        <p class="login-title"><strong>DingBot</strong><br/></p>
        <img src="../../public/logo.png" style="width: 105px;height: 105px">
        <p class="login-sub-title">微 信 登 录</p>
        <div style="position: relative;">
          <a style="height: 50px;width: 50px;display: block;margin-left: 30px;margin-top: 40px"
              href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb6287cf06732dc0b&redirect_uri=https://dingbotboards.com/overview&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect">
            <img
                title="微信"
                alt="微信"
                src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/wechat.e0ff124.svg"
                class="oauth-btn"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
  <div style="width:300px;margin:0 auto; padding:20px 0;">
    <a target="_blank" href=" " style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
      <img src="../assets/gongan.jpg" style="float:left;"/>
      <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">京公网安备 11010802042739号</p >
    </a >
  </div>
</template>

<script>
import 'boxicons'
export default {
  name: "wechatLogin",
  data() {
    return {
      username: "",
      password: "",
      code:'',
    }
  },

  created() {
  },
  props: {
    pageType: ''
  },
  methods: {
    // login(){
    //   this.$router.push('/Overview');
    // }
    // login(){
    //   let formData = new FormData();
    //   formData.append("phone", this.username)
    //   formData.append("password", this.password)
    //
    //   this.$axios({
    //     method: "post",
    //     url: "http://152.136.172.123/api/administrator/login/",
    //     data: formData,
    //   })
    //       .then(res => {
    //         if(res.data.errno === 0) {
    //           this.$message.success(res.data.msg)
    //           console.log(res.data)
    //           localStorage.setItem("token", res.data.token)
    //           this.$router.push("/test")
    //         }
    //         else {
    //           this.$message.error(res.data.msg)
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    // },
  },
}
</script>

<style scoped>
@keyframes login-box {
  0% {
    left: -400px;
  }

  50% {
    left: -400px;
  }

  100% {
    left: 0;
  }
}

@keyframes background {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.login-main {
  width: 100%;
  height: calc(100vh - 16px);
  margin: 0;
  padding: 0;
}

.login-main {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
}

.login {
  display: flex;
  width: 1280px;
  height: 720px;
  box-shadow: 4px 4px 8px rgb(159, 159, 159, 0.7);
  background-color: white;
  justify-content: center;
  overflow: hidden;
}

.login .login-form-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(400px - 128px);
  height: calc(100% - 128px);
  background-color: white;
  padding: 64px;
  animation: login-box 2s;
}

.login .login-form-box .login-title {
  margin: 0 0 25px 0;
  font-size: 32px;
}

.login .login-form-box .login-sub-title {
  margin: 0 0 16px 0;
  font-size: 24px;
}

.login .login-form-box .login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 120px;
}

.login .login-form-box .login-form input[type="text"],
.login .login-form-box .login-form input[type="password"] {
  width: 260px;
  height: 32px;
  font-size: 16px;
  margin-bottom: 16px;
  padding: 6px 12px;
  border: 1px solid #EDEDED;
  border-radius: 4px;
  background-color: #EDEDED;
  outline: none;
  transition: all 0.5s;
}

.login .login-form-box .login-form input[type="text"]:focus,
.login .login-form-box .login-form input[type="password"]:focus {
  border: 1px solid rgb(0, 174, 255);
}

.login .login-form-box .login-form .remember-box {
  display: flex;
  width: 280px;
  height: 32px;
}

.login .login-form-box .login-form input[type="checkbox"] {
  margin: 4px 4px 0 0;
  width: 16px;
  height: 16px;
}

.login .login-form-box .login-form .login-button {

  margin-top: 80px;
  border: 2px solid #EDEDED;
  border-radius: 16px;
  background-color: transparent;
  width: 64px;
  height: 64px;
  font-size: 2rem;
  line-height: 64px;
  text-align: center;
  outline: none;
  /*background: url("../images/login-button.png") center center no-repeat;*/
  background-size: 32px;
  cursor: pointer;
  transition: all 0.5s;
}

.login .login-form-box .login-form .login-button:hover {
  color: rgb(0, 174, 255);
  opacity: 0.5;
  border: 2px solid rgb(0, 174, 255);
  /*background: url("../images/login-button-hover.png") center center no-repeat;*/
  background-size: 32px;
}

.login .login-form-box .link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.login .login-form-box .link a {
  margin-bottom: 8px;
  outline: none;
  text-decoration: none;
  color: black;
  transition: all 0.5s;
}
.login .login-form-box .link a:hover {
  color: rgb(0, 174, 255);
}
.login .login-background img {
  width: 100%;
  height: 100%;
}

</style>
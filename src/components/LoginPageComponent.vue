<template>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <div class="login-main">
    <div class="login">
      <div class="login-form-box">
        <div style="display: flex">
          <div>
            <p class="login-title"><strong>DingBot</strong><br/>管理员</p>
          </div>
          <img src="../../public/logo.png" style="width: 105px;height: 105px">
        </div>
        <p class="login-sub-title">登 录</p>
        <form class="login-form">
          <input v-model="username" type="text" name="username" id="username" class="username" placeholder="手机号" autocomplete="off">
          <input v-model="password" type="password" name="password" id="password" class="password" placeholder="密码" autocomplete="off" @keyup.enter="login">
          <span class="login-button" id="login-button" @click="login"><i class='bx bx-log-in-circle'></i></span>
        </form>
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
  name: "LoginPageComponent",
  data() {
    return {
      username: "",
      password: "",
    }
  },

  created() {
  },
  props: {
    pageType: ''
  },
  methods: {
    login(){
      let formData = new FormData();
      formData.append("phone", this.username)
      formData.append("password", this.password)

      this.$axios({
        method: "post",
        url: "https://dingbotboards.com/api/administrator/login/",
        data: formData,
      })
          .then(res => {
            if(res.data.errno === 0) {
              this.$message.success(res.data.msg)
              console.log(res.data)
              localStorage.setItem("token", res.data.token)
              this.$router.push("/test")
            }
            else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
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
  position: relative;
  right: 50px;
  margin: 0 0 64px 0;
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
.login .login-background {
  width: 880px;
  height: 100%;
  animation: background 2s;
}

.login .login-background img {
  width: 100%;
  height: 100%;
}

.login-switch-btn-box {
  display: flex;
  font-size: 1rem;
  margin-top: 40px;
  color: #494e53;
  font-weight: 400;
  justify-content: center;
}

.login-switch-btn-box .login-state-btn {
  line-height: 40px;
  cursor: pointer;
  margin-right: 10px;
  color: #5fafda;
  /*background-color: #f6f4f9;*/
  justify-content: center;
  border-radius: 0.25rem;
  transition: 0.5s all ease;
}

.login-switch-btn-box .login-state-btn.active {
  background-color: #007bff;
  color: #ffffff;
  padding: 5px 15px;
  border-radius: 0.5rem;
}

.login-switch-btn-box .login-switch-state {
  margin-right: 10px;
  line-height: 50px;
  justify-content: center;
}


.login-state-btn {
  padding: 5px 10px;
}
</style>

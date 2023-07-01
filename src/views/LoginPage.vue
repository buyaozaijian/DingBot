<template>
  <div>
    <login-page-component :pageType="'admin'"></login-page-component>
  </div>
</template>

<script>
import loginPageComponent from "../components/LoginPageComponent.vue";
export default {
  name: "AdminLogin",
  components: {
    loginPageComponent
  },
  data() {
    return {
      loginState: 2,
      username: "",
      password: "",
    }
  },
}
</script>

<style scoped>
</style>
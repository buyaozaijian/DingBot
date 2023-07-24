<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView />
</template>

<script>

export default {
  name: "App.vue",
  watch: {
    $route(to, from) {
      if(to.path !== '/' && to.path !== '/LoginPage' && to.path !== '/overview' && to.path !== '/pay') {
        if (to.path === '/test'){
          if(!this.checkadLogin()) {
            this.$router.push('/LoginPage')
          }
        }
        else if (to.path === '/order'){
          if(!this.checkadLogin()) {
            this.$router.push('/LoginPage')
          }
        }
        else {
          if (to.path !== '/loginpage'){
            if(!this.checkLogin()) {
              this.$router.push('/')
            }
          }
        }
      }
    }
  },

  data() {
    return {
      isActiveSidebar: true,
    }
  },
  methods: {
    async checkadLogin() {
      await this.$axios({
        method: "post",
        url: "https://dingbotboards.com/api/administrator/adminCheckToken/",
        headers: {
          token: localStorage.getItem('token')
        }
      })
          .then(res => {
            if(res.data.errno === 0) {
              return true
            }
            else {
              console.log('登录失效')
              this.$message.error('登录失效')
              this.$router.push('/LoginPage')
              return false
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    async checkLogin() {
      await this.$axios({
        method: "post",
        url: "https://dingbotboards.com/api/customer/checkToken/",
        headers: {
          token: localStorage.getItem('token')
        }
      })
          .then(res => {
            if(res.data.errno === 0) {
              return true
            }
            else {
              console.log('登录失效')
              this.$message.error('登录失效')
              this.$router.push('/')
              return false
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
  },
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

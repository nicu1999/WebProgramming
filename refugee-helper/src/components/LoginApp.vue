<template>
  <div>
    <button class="inverseButton roundedBorder" @click="login" v-if="!isAuthenticated">Login</button>
    <button class="inverseButton roundedBorder logout" @click="logout" v-else>Logout</button>
  </div>
</template>

<script>
  import { useAuth0 } from '@auth0/auth0-vue'

  export default {
    setup() {
      const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0()

      return {
        login: () => {
          loginWithRedirect();
        },
        logout: () => {
          logout({ returnTo: window.location.origin });
        },
        user,
        isAuthenticated
      };
    },

    methods: {
      setStoreIsAuthenticated() {
        this.$store.commit('setIsAuthenticated', this.isAuthenticated)
      },

      setStoreUser() {
        this.$store.commit('setUser', this.user)
      }
    },

    mounted() {
        this.setStoreIsAuthenticated()
    },
    watch: {
      isAuthenticated() {
        this.setStoreIsAuthenticated()
      },

      user() {
        this.setStoreUser()
      },
    }

  };
</script>

<style scoped>
    .logout {
        position: absolute;
        top: 85vh; 
    }
</style>>
import { createApp } from 'vue'
import { createStore } from 'vuex'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);

const store = createStore({
    state () {
      return {
        isAuthenticated: false,
        user: null,
      }
    },

    mutations: {
        setIsAuthenticated (state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        },

        setUser (state, user) {
            state.user = user
        }
    },

    getters: {
        getIsAuthenticated(state) {
          return state.isAuthenticated
        },
        
        getUser(state) {
            return state.user
        }
    },

})

app.use(store)

app.use(
    createAuth0({
      domain: "dev-ewtts3qr.us.auth0.com",
      client_id: "GNH1H1YvBBcmXYwpnWXreOJoUlvBQLMK",
      redirect_uri: window.location.origin,
      audience: "https://refugee-helper/",
    })
);

app.use(VueGoogleMaps, {
    load: {
        key: '~your google maps api key~',
    },
})



app.mount('#app')

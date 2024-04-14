/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance
const store = createStore({
  state () {
    return {
      isLoggedIn: false
    }
  },
  mutations: {
    setLoggedIn (state, value) {
      state.isLoggedIn = value
    }
  }
})

const app = createApp(App)

// Use the store instance.
app.use(store)

registerPlugins(app)

app.mount('#app')

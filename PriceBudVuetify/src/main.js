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


//CharKick
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'



const app = createApp(App)

registerPlugins(app)

app.use(VueChartkick)
app.mount('#app')

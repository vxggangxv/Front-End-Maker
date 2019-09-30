import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import '@/scss/main.scss'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    // dark: true,
    light: true,
    themes: {
      light: {
        // primary: colors.red.darken1,
        // secondary: colors.red.lighten4,
        // accent: colors.indigo.base, 
      },
      dark: {
        primary: '#11293E',
      }
    },
  },
});

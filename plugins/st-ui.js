import Vue from 'vue'
import Row from '../components/bx-ui/row'
import Proup from '../components/bx-ui/popup'
import Alert from '../components/bx-ui/alert'
Vue.use(Row)
Vue.use(Proup)
if (process.client) {
  Vue.use(Alert)
  Vue.prototype.$alert = Alert
}

import Vue from 'vue'
import StAlert from './src/alert.vue'

const AlertConstructor = Vue.extend(StAlert)
let instance = null

let getAnInstance = () => {
  if (!instance) {
    instance = new AlertConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(instance.$el)
  }
  return instance
}

let Alert = function (...options) {
  let info = {}
  let len = options.length
  if (len) {
    info.type = options[0] === 's' ? 'success' : 'error'
    if (len !== 3) {
      info.title = Vue.$i18n_t('common.' + info.type)
    } else {
      info.title = options[len - 2]
    }
    info.message = options[len - 1]
    let duration = options.duration || 4000
    let instance = getAnInstance()
    instance.duration = duration
    instance.info = info
    return instance
  }
}

Alert.install = Vue => {
  Vue.component(StAlert.name, Alert)
}

export default Alert

import Vue from 'vue'
import Util from '../assets/js/util'
const Filter = {
  numberFormat: Util.numberFormat,
  splitFormat: Util.splitFormat,
  timeFormat: Util.timeFormat,
  retainDecimals: Util.retainDecimals,
  addZero: Util.addZero,
  addCommom: Util.addCommom
}

Object.keys(Filter).forEach(key => {
  Vue.filter(key, Filter[key])
})
export default Filter

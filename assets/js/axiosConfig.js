import AxiosClass from './axiosClass'
import axiosClassYun from './axiosClassYun'
import config from '../../config/api.config'
let ac = config.isYun ? axiosClassYun : AxiosClass
let baseAxios = new ac(config.baseUrl)
let swapsAxios = new ac(config.swapsUrl)
let testAxios = new ac(config.testUrl)
export {baseAxios, swapsAxios, testAxios}

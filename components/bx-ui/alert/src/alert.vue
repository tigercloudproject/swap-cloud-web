<template>
    <div class="alert">
       <alert-item :ref="index" :duration="duration" :info="item" :key="index" v-for="(item, index) in list"></alert-item>
    </div>
</template>

<script>
import AlertItem from './alert-item'
export default {
  name: 'alert',
  props: ['info', 'duration'],
  components: {
    AlertItem
  },
  data() {
    return {
      cleartTime: null,
      list: []
    }
  },
  watch: {
    info() {
      let noClose = this.list.filter(item => {
        return !item.close
      }).length
      let i = 0
      let len = this.list.length
      let item = null
      if (noClose > 2) {
        while (i < len) {
          item = this.$refs[i][0]
          if (!item.isClose) {
            item.close()
            break
          }
          i++
        }
      }
      this.list.push(this.info)
      clearTimeout(this.cleartTime)
      this.cleartTime = setTimeout(() => {
        this.list = []
      }, this.duration + 1000)
    }
  },
  methods: {
  },
  // mounted() {
  //   setInterval(item => {
  //     this.list.push({type: 'error', title: '错误提示', message: '登陆名或密码错误登陆名或密码错误登陆名或密码错误登陆名或密码错误'})
  //   }, 2000)
  // },
  beforeDestroy() {
    clearTimeout(this.cleartTime)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .alert {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 10011;
    overflow: hidden;
  }
</style>

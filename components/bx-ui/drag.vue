<template>
    <st-row  justify="center" class="drag">
      <st-row :style="`background: linear-gradient(90deg,#2b93f6 0%, #2b93f6 ${rate}%,#97b0d6 ${rate}%, #97b0d6 ${100 - rate}%);`" align="center" justify="between" class="drag-line" ref="line">
          <st-row @callback="dragBtn" :class="{active: (index / (listLength -1) * 100) <= (rate) }" justify="center" :key="index" v-for="(item, index) in list" class="round"><a>{{item}}</a></st-row>
          <div ref="moveRond" class="move-rond"></div>
      </st-row>
        <!-- <template  v-for="(item, index) in list">
            <div :key="index" v-if="index" class="rectangle"></div>
            <div :key="index" class="round"><a>{{item}}</a></div>
        </template> -->
    </st-row>
</template>

<script>
// import StRow from '../row'

export default {
  name: 'drag',
  components: {
    // StRow
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    width: {
      type: String
    },
    isMove: {
      type: Boolean,
      defaule: true
    }
  },
  data() {
    return {
      dragLength: 0,
      lineWdith: 0,
      rate: 0,
      listLength: this.list.length - 1,
      obox: null
    }
  },
  methods: {
    dragBtn(e) {
      let len = this.listLength + 1
      let str = e.target.innerText.trim()
      for (; len--;) {
        if (String(this.list[len]) === str) {
          break
        }
      }
      this.rate = len / this.listLength * 100
      this.changeDistance(str)
    },
    changeDistance(name) {
      this.obox.style.left = this.maxDistance * this.rate / 100 + 'px'
      this.$emit('getDrag', this.rate, name)
    },
    onmousedownFn(evt) {
      var oEvent = evt || event // 获取事件对象，这个是兼容写法
      var disX = oEvent.clientX - this.obox.offsetLeft
      // 这里就解释为什么要给document添加onmousemove时间，原因是如果你给obox添加这个事件的时候，当你拖动很快的时候就很快脱离这个onmousemove事件，而不能实时拖动它
      document.onmousemove = (evt) => { // 实时改变目标元素obox的位置
        console.log(33)
        var oEvent = evt || event
        let distance = oEvent.clientX - disX
        distance < 0 && (distance = 0)
        distance > this.maxDistance && (distance = this.maxDistance)
        this.rate = distance / this.maxDistance * 100
        let ratio = this.rate / 100 * this.listLength
        let remainder = parseInt(((ratio % 1) < 0.5 ? 0 : 1) + ratio) // 判断更靠近两个点中的哪一个
        let name = this.list[remainder]
        if (!this.isMove) {
          this.rate = remainder / this.listLength * 100
        }
        this.changeDistance(name)
      } // 停止拖动
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
  mounted() {
    this.obox = this.$refs.moveRond
    this.maxDistance = this.$refs.line.$el.clientWidth - this.obox.clientWidth
    this.$refs.line.$el.onmousedown = (evt) => {
      this.onmousedownFn(evt)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
   .drag {
       width: 100%;
       height: 40px;
       padding: 10px 0;
       .drag-line {
         position: relative;
         height: 5px;
         width: calc(100% - 60px);
         cursor: pointer;
         border-radius: 2.5px;
       }
      .move-rond {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #2b93f6;
      }
      .round.active {
        background-color: #2b93f6;
        a {
          color: #2b93f6;
        }
      }
      .round {
        // position: relative;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #97b0d6;
        a {
            position: relative;
            color: #97b0d6;;
            top: 12px;
            // // left: 50%;
            // left: -50%;;
            // margin-left: -50%;
        }
      }
      .rectangle {
        height: 5px;
        flex: 1;
        background-color: #97b0d6;
      }
   }
</style>

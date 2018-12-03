<template>
     <st-row class="alert-info" :class="[info.type, isClose]">
         <i :class="`iconfont ${fontName[info.type]}`"></i>
         <div class="alert-info-content">
           <st-row justify="between"><h6>{{ info.title }}</h6><a @click="close()" class="iconfont icon-aui-icon-close"></a></st-row>
           <p>
             {{ info.message }}
           </p>
         </div>
    </st-row>
</template>

<script>
export default {
  name: 'alert-item',
  data() {
    return {
      isClose: '',
      timeOut: null,
      fontName: {error: 'icon-close-circle', success: 'icon-check-circle'}
    }
  },
  props: ['info', 'duration'],
  methods: {
    close() {
      clearTimeout(this.timeOut)
      this.isClose = 'close'
      this.info.close = 'close'
    }
  },
  mounted() {
    // let transform = () => {
    //   this.$el.removeEventListener('transitionend', transform)
    //   console.log(99)
    //   this.$emit('removeNode', this.info)
    // }
    // this.$el.addEventListener('transitionend', transform)
    this.timeOut = setTimeout(() => {
      this.isClose = 'close'
      this.info.close = 'close'
    }, this.duration)
  },
  beforeDestroy() {
    clearTimeout(this.timeOut)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../font/iconfont.css';
.alert-info {
       animation: antAlertSlideUpIn .3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
       position: relative;
      //  right: 100%;
       margin-bottom: 16px;
       width: 368px;
       padding: 16px;
       border-radius: 4px;
       background: #fff;
       overflow: hidden;
       &.close {
           height: 0 !important;
           margin: 0;
           padding-top: 0;
           padding-bottom: 0;
           transition: all .3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
           transform-origin: 50% 0;
           border: 0 none;
       }
       .alert-info-content {
         margin-left: 24px;
         flex: 1;
         h6 {
           margin-bottom: 4px;
           font-size: 16px;
          //  font-weight: 500;
           line-height: 24px;
           color: rgba(0,0,0,.85);
         }
         p {
           line-height: 1.5;
           font-size: 14px;
           color: rgba(0,0,0,.65);
         }
         a.icon-aui-icon-close {
           color: rgba(0,0,0,.45);
         }
       }
    }
    i.iconfont {
        height: 24px;
        line-height: 24px;
        font-size: 24px;
      }
    .error {
      border: 1px solid #ffa39e;
      background-color: #fff1f0;
      i.iconfont {color: #f5222d;}
    }
    .success {
      background-color: #f6ffed;
      border: 1px solid #b7eb8f;
      i.iconfont {color: #52c41a;}
    }  
@keyframes antAlertSlideUpIn {
  0% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: translateX(368px);
  }
  100% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: translateX(0);
  }
}
</style>

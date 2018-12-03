<template>
  <st-row justify="end" class="page">
    <a class="page-up" :class="{'page-no-btn': !$route.query.page||$route.query.page <2}" @click="upBtn">{{ $t('common.prev') }}</a>
    <a class="page-down" :class="{'page-no-btn': isDown}" aria-disabled="false" @click="downBtn">{{ $t('common.next') }}</a>
  </st-row>
</template>

<script>
  export default {
    name: 'st-page',
    props: {
      isDown: {
        required: false,
        default: false
      },
      page: {
        required: false,
        default: false
      }
    },
    methods: {
      upBtn() {
        let page = Number(this.$route.query.page)
        if (!page || page === 1) {
          return false
        }
        this.$router.push({path: this.$route.path, query: {...this.$route.query, page: page ? page - 1 : 1}})
      },
      downBtn() {
        let page = Number(this.$route.query.page)
        if (this.$props.isDown) {
          return false
        }
        this.$router.push({path: this.$route.path, query: {...this.$route.query, page: page ? page + 1 : 2}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .page {
    .page-up,
    .page-down {
      display: block;
      width: 70px;
      height: 24px;
      border: 1px solid #e5e5e5;
      text-align: center;
      font-size: 12px;
      line-height: 24px;
      vertical-align: super;
      cursor: pointer;
      &:hover {
        line-height: 24px;
        background: #fafafb;
        border-color: rgba(24,144,255, .5);
      }
    }
    .page-up {
      margin-right: 16px;
    }
    .page-no-btn {
      color: #888;
      &:hover {
        line-height: 24px;
        color:#888;
        background: #fff;
        border: 1px solid #e5e5e5;
      }
    }
  }
</style>

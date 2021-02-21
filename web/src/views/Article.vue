<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="text-blue">=</div>
      <strong class="flex-1 text-blue pl-2">
        {{model.title}}
      </strong>
      <div class="text-grey fx-xs">
        2020-03-23
      </div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg">

    </div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center">
        <i class="iconfont icon-Menu"></i>
        <span class="text-blue fs-lg ml-2">相关资讯</span>
      </div>
      <div class="pt-2 ">
        <router-link class="py-1" tag="div" :to="`/article/${item._id}`" v-for="item in model.related" :key="item._id">
          {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id:{
      required: true
    }
  },
  watch: {
    id(){
      this.fetch()
    }
  },
  data() {
    return{
      model: null
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/article/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
    .page-article{
      .body{
        img{
          max-width: 100%;
          height: auto;
        }
        iframe{
          width: 100%;
          height: auto;
        }
      }
    }
</style>
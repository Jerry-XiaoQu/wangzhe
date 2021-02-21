<template>
  <div class="page-hero">
    <div class="topbar bg-black py-2  px-3 d-flex ai-center text-white" >
            <img src="../assets/logo.png" height="30">
            <div class="px-2 flex-1">
                <span class="text-white">王者荣耀</span>
                <span class="
                ml-2">攻略战</span>
            </div>
            <router-link to="/" tag="div">
              更多英雄 &gt;
            </router-link>        
      </div>
      <div class="top" :style="{'background-image': `url(${model.banner})`}">
        <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
          <div class="fs-sm">{{model.title}}</div>
          <h2 class="my-2">{{model.name}}</h2>
          <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
          <div class="d-flex jc-between pt-2">
            <div class="scores d-flex ai-center" v-if="model.scores">
              <span>难度</span>
              <span class="badge bg-primary">{{model.scores.difficult}}</span>
              <span>技能</span>
              <span class="badge bg-blue-1">{{model.scores.skills}}</span>
              <span>攻击</span>
              <span class="badge bg-danger">{{model.scores.attack}}</span>
              <span>生存</span>
              <span class="badge bg-dark">{{model.scores.survive}}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="px-3 bg-white">
          <div class="nav d-flex pb-2 jc-around border-bottom pt-3">
            <div class="nav-item active">
              <div class="nav-link">英雄初识</div>
            </div>
            <div class="nav-item">
              <div class="nav-link">进阶攻略</div>
            </div>
          </div>
        </div>
        <swiper>
          <swiper-slide>
            <div>
              <div class="p-3 bg-white border-bottom">
                <div class="d-flex">
                  <router-link tag="button" to="/" class="btn btn-lg flex-1">
                    <i class="iconfont icon-Menu "></i>
                    英雄介绍视频
                  </router-link>
                  <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                    <i class="iconfont icon-Menu"></i>
                    英雄介绍视频
                  </router-link>
                </div>
                <div class="skills bg-white mt-4">
                  <div class="d-flex jc-around">
                    <img width="60"
                    height="60" 
                    :src="item.icon" 
                    :key="item.name" 
                    v-for="(item, i) in model.skills"
                    :class="{active: currentSkillIndex === i}"
                    @click="currentSkillIndex = i">
                  </div>
                  <div v-if="currentSkill">
                    <div class="d-flex pt-4 pb-3">
                      <h3 class="m-0">{{currentSkill.name}}</h3>
                      <span class="text-grey-1 ml-4">
                        （冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}}）
                      </span>
                    </div>
                    <p>{{currentSkill.description}}</p>
                    <div class="border-bottom"></div>
                    <p class="text-grey-1">小提示：{{currentSkill.tips}}</p>
                  </div>
                </div>
              </div>

              <m-card plain icon="Menu" title="出装推荐" class="hero-items"> 
                  <div class="fs-xl">顺风出装</div>
                  <div class="d-flex jc-around text-center mt-3">
                    <div v-for="item in model.items1" :key="item.name">
                      <img :src="item.icon">
                      <div class="fs-xs">{{item.name}}</div>
                    </div>
                  </div>
                  <div class="border-bottom mt-3"></div>
                  <div class="fs-xl mt-3">逆风出装</div>
                  <div class="d-flex jc-around text-center mt-3">
                    <div v-for="item in model.items2" :key="item.name">
                      <img :src="item.icon">
                      <div class="fs-xs">{{item.name}}</div>
                    </div>
                  </div>
              </m-card>
              <m-card plain icon="Menu" title="使用技巧"> 
                  <P class="m-0">{{model.usageTips}}</P>
              </m-card>
              <m-card plain icon="Menu" title="对抗技巧"> 
                  <P class="m-0">{{model.battleTips}}</P>
              </m-card>
              <m-card plain icon="Menu" title="团战技巧"> 
                  <P class="m-0">{{model.teamTips}}</P>
              </m-card>
              <m-card plain icon="Menu" title="英雄关系"> 
                  <div class="fs-xl">最佳搭档</div>
                  <div v-for="item in model.partners" :key="item._id" class="d-flex pt-3">
                    <img height="50" :src="item.hero.avatar">
                    <p class="flex-1 ml-3 m-0">
                      {{item.description}}
                    </p>
                  </div>
                  <div class="border-bottom mt-3"></div>
              </m-card>

            </div>
          </swiper-slide>
          <swiper-slide></swiper-slide>
        </swiper>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true
    }
  },
  data() {
    return{
      model: {
        banner: '',
        categories: [],
        skills: []
      },
      currentSkillIndex: 0
    }
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
      console.log(this.model)
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
@import  '../assets/scss/_varibles.scss';
.page-hero {
  .top{
    height: 50vw;
    background: #fff no-repeat top center;
    background-size:100%;
  }
  .info{
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
    .scores {
      .badge{
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255,255,255,0.2);
      }
    }
  }
  .skills{
    img.icon{
      width: 70px;
      height: 70px;
      border: 3px solod map-get($colors , 'white' ) !important;
      &.active{
        border: map-get($colors , 'primary' ) !important;
      }
      border-radius: 50%;
    }
  }
  .hero-items{
    img{
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>
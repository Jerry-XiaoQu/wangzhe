<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/c9894366fbdd8dc46f24e5b86e5c67f2.jpeg"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/c9894366fbdd8dc46f24e5b86e5c67f2.jpeg"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/c9894366fbdd8dc46f24e5b86e5c67f2.jpeg"
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home px-3 pb-2 text-right"
        slot="pagination"
      ></div>
    </swiper>
    <div class="nav-icons bg-white mt-3 text-dark-1 text-center pt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-ligh py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span> 收起 </span>
      </div>
    </div>

    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
        tag="div"
        :to="`/article/${news._id}`"
        class="py-2 fs-lg d-flex" 
        v-for="(news, i) in category.newsList" :key="i">
              <span class="text-info">[{{news.categoryName}}]</span>
              <span class="px-2">|</span>
              <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
              <span class="text-grey-1 fs-sm"> {{news.createdAt | date}} </span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="-superhero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link tag="div" :to="`heroes/${hero._id}`" class="p-2 text-center" style="width: 20%" v-for="(hero, i) in category.heroList" :key="i">
              <img :src="hero.avatar" class="w-100">
              <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <m-card icon="Menu" title="图文攻略"></m-card>
    <m-card icon="Menu" title="新闻资讯"></m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // Some Swiper option/callback...
      },
      newsCats:[],
      heroCats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
  }
};
</script>

<style lang="scss">
@import "../assets/scss/style.scss";
@import "../assets/iconfont/iconfont.css";
.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.153846rem;
    opacity: 1;
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: {
        border-left: none;
      }
    }
  }
}
.sprite {
  background: url("../assets/images/index.png");
  background-size: 28.846154rem;
  display: inline-block;
  &.sprite-news {
    width: 1.769231rem;
    height: 1.538462rem;
    background-position: 63.546% 15.517%;
  }
  &.sprite-arrow {
    width: 0.769231rem;
    height: 0.769231rem;
    background-position: 38.577% 52.076%;
  }
  // &.sprite-news{
  //     width: 1.769231rem;
  //     height: 1.538462rem;
  //     background-position: 90.483% 15.614;
  // }
}
</style>
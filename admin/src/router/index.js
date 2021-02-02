import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CategoryEdit from '../views/categoryEdit.vue'
import CategoryList from '../views/categoryList.vue'
import ItemEdit from '../views/itemEdit.vue'
import ItemList from '../views/itemList.vue'
import HeroEdit from '../views/heroEdit.vue'
import HeroList from '../views/heroList.vue'
import ArticleEdit from '../views/articleEdit.vue'
import ArticleList from '../views/articleList.vue'
import AdEdit from '../views/adEdit.vue'
import AdList from '../views/adList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/categories/create',
        component: CategoryEdit
      },
      {
        path: '/categories/list',
        component: CategoryList
      },
      {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        props: true
      },
      {
        path: '/items/create',
        component: ItemEdit
      },
      {
        path: '/items/list',
        component: ItemList
      },
      {
        path: '/items/edit/:id',
        component: ItemEdit,
        props: true
      },
      {
        path: '/heros/create',
        component: HeroEdit
      },
      {
        path: '/heros/list',
        component: HeroList
      },
      {
        path: '/heros/edit/:id',
        component: HeroEdit,
        props: true
      },
      {
        path: '/articles/create',
        component: ArticleEdit
      },
      {
        path: '/articles/list',
        component: ArticleList
      },
      {
        path: '/articles/edit/:id',
        component: ArticleEdit,
        props: true
      },
      {
        path: '/ads/create',
        component: AdEdit
      },
      {
        path: '/ads/list',
        component: AdList
      },
      {
        path: '/ads/edit/:id',
        component: AdEdit,
        props: true
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

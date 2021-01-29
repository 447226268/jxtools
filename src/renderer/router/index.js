import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layouts',
      component: require('@/layouts/index').default,
      children: [
        {
          path: '/home',
          name: 'Name',
          component: require('@/views/home/index').default
        }, {
          path: '/ocr',
          name: 'Ocr',
          component: require('@/views/ocr/index').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

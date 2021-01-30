import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layouts',
      component: require('@/layouts/index').default,
      redirect: '/ocr',
      children: [
        {
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

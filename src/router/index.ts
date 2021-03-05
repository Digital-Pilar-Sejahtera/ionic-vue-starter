import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'
import SignIn from "@/views/Signin.vue";
import Signup from "@/views/Signup.vue";
import { TokenService } from "@/services/token.service";
import UserDetail from '@/views/UserDetail.vue';
import UserCreate from '@/views/UserCreate.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/user'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'user'
      },
      {
        path: 'user',
        component: () => import('@/views/TabUser.vue')
      },
      {
        path: 'Camera',
        component: () => import('@/views/TabCamera.vue')
      },
      {
        path: 'geolocation',
        component: () => import('@/views/TabGeolocation.vue')
      },
      {
        path: 'account',
        component: () => import('@/views/TabAccount.vue')
      }
    ]
  },
  {
    path: '/login',
    component: SignIn,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/signup',
    component: Signup,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/user/detail/:id',
    component: UserDetail
  },
  {
    path: '/user/create',
    component: UserCreate
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
      record => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next("/tabs/user");
  }

  next();
});

export default router

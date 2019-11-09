import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView";
import DashboardView from "@/views/DashboardView";
import LoginView from "@/views/LoginView";
import UserList from "@/views/UserList";
import RegisterView from "@/views/RegisterView";
import ArticleList from "@/views/ArticleList";
import MessageList from "@/views/Message/MessageList";
import MessageCreate from "@/views/Message/MessageCreate";
import SongList from "@/views/SongList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      guest: true
    }
  },
  {
    path: "/articles",
    name: "articles",
    component: ArticleList,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/messages",
    name: "messages",
    component: MessageList,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/messages/create",
    name: "createMessage",
    component: MessageCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/songs",
    name: "songs",
    component: SongList,
    meta: {
      requiresAuth: true,
      is_Choir: true
    }
  },
  {
    path: "/users",
    name: "users",
    component: UserList,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (window.$cookies.get("token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      let user = window.$cookies.get("authUser");

      if (to.matched.some(record => record.meta.isAdmin)) {
        if (user.isAdmin) {
          next();
        } else {
          next({ name: "home" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (window.$cookies.get("token") == null) {
      next();
    } else {
      next({ name: "home" });
    }
  } else {
    next();
  }
});

export default router;

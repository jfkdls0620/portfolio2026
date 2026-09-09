import {createRouter, createWebHistory} from "vue-router"
import HomeView from "../views/HomeView.vue"
import CareerView from "../views/CareerView.vue"
import ProjectView from "../views/ProjectView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", component: HomeView, meta: {title: "Portfolio — 2026"}},
    {
      path: "/Career",
      component: CareerView,
      meta: {title: "Career — Portfolio"},
    },
    {
      path: "/Project",
      component: ProjectView,
      meta: {title: "Projects — Portfolio"},
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? {top: 0}
  },
})

router.afterEach((to) => {
  document.title = String(to.meta.title ?? "Portfolio — 2026")
})

export default router

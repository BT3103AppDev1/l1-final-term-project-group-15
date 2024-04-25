
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// import { createRouter, createWebHistory } from 'vue-router'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       redirect: '/HomePage'
//     },
//     // other routes...
//   ]
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import IndexPage from '../pages/index.vue'
import LogIn1 from '../components/LogIn1.vue'
import SignIn from '../components/SignIn.vue'
import ProductPage1 from '../pages/ProductPage1.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import SearchResultsPage from '../pages/searchResults.vue'
import SignupPage from '../pages/SignupPage.vue'
import WishListPage from '../pages/WishListPage.vue'
import TestPage from '@/pages/TestPage.vue'
import SettingPage from '@/pages/SettingPage.vue'
import CommunityPage from '../pages/CommunityPage.vue'
import BlogPage from '../pages/BlogPage.vue'
import HelpCentrePage from '../pages/HelpCentrePage.vue'
import ContactUsPage from '@/pages/ContactUsPage.vue'
//import WishList from '@/components/WishList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/HomePage' },
    { path: '/HomePage', component: HomePage },
    { path: '/index', component: IndexPage },
    { path: '/LogIn1', component: LogIn1 },
    { path: '/SignIn', component: SignIn },
    { path: '/ProductPage1', component: ProductPage1 },
    { path: '/ProfilePage', component: ProfilePage },
    { path: '/SettingPage', component: SettingPage },
    { path: '/CommunityPage', component: CommunityPage },
    { path: '/searchResults', component: SearchResultsPage },
    { path: '/SignupPage', component: SignupPage },
    { path: '/WishListPage', component: WishListPage },
    { path: '/HelpCentrePage', component: HelpCentrePage },
    { path: '/ContactUsPage', component: ContactUsPage },
    { path: '/HomePage/:id', name: "HomeToProduct", component: ProductPage1 },
    {path: '/ProductPage1/:id', name: "ProductToWishList", component: WishListPage},
    { path: '/testing', component: TestPage},
    { path: '/CommunityPage/:id', name: "CommunityToBlog", component: BlogPage}
  ]
})

export default router
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
//import TutorialsList from '../components/TutorialsList.vue';
//import Tutorial from '../components/Tutorial.vue';
//import AddTutorial from '../components/AddTutorial.vue';
import NotFound from '../components/NotFound.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home-view',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login,
            beforeEnter: (to, from, next) => {
                const token = localStorage.getItem("token");
                if (token) next('/profile');
                else next();
            }
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile-view',
            // lazy-loaded
            component: () => import('../views/Profile.vue')
        },
        {
            path: '/admin',
            name: 'admin-view',
            component: () => import('../views/BoardAdmin.vue')
        },
        {
            path: '/mod',
            name: 'moderator-view',
            component: () => import('../views/BoardModerator.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('../views/BoardUser.vue')
        },
        {
            path: '/tutorials',
            alias: "/tutorials",
            name: "tutorials-list",
            component: () => import('../components/TutorialsList.vue')
        },
        {
            path: '/tutorials/:id',
            name: "tutorial-details",
            component: () => import('../components/Tutorial.vue')
        },
        {
            path: "/add",
            name: "add-tutorial",
            component: () => import('../components/AddTutorial.vue')
          },
        {
            path: '*',
            component: NotFound
        }
    ]
});


// The global route guard. auth required for paths not in public pages array
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });

export default router;
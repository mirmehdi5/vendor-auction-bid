import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Quote from './components/Quote.vue'
import DeliveryAndStock from './components/DeliveryAndStock.vue'
import Summary from './components/Summary.vue'
import ThankYou from './components/ThankYou.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/home/:cpNumber/:vorCategory/:quoteDueDate/:options',
            name: 'Home',
            component: Home
        },
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/quote/:jobData',
            name: 'Quote',
            component: Quote
        },
        {
            path: '/deliveryandstock/:jobData',
            name: 'DeliveryAndStock',
            component: DeliveryAndStock
        },
        {
            path: '/summary/:jobData',
            name: 'Summary',
            component: Summary
        }, {
            path: '/thankyou/:jobData',
            name: 'ThankYou',
            component: ThankYou
        }
    ]
})
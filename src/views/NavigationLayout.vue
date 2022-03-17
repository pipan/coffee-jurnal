<template>
    <div>
        <div class="navigation-view">
            <transition :name="transitionName" :duration="300">
                <KeepAlive :include="['Home', 'Stats']">
                    <SwipeRouter></SwipeRouter>
                </KeepAlive>
            </transition>
            <!-- <Stats v-if="styleStats !== false" :style="styleStats" style="position: absolute; width: 100%; top: 0; left: 0;"></Stats> -->
        </div>
        <nav>
            <router-link :to="{ name: 'Home' }" class="navigation-item" exact-path>Journal</router-link>
            <router-link :to="{ name: 'Stats', query: $route.query }" class="navigation-item" exact-path>Stats</router-link>
        </nav>
    </div>
</template>

<script>
import SwipeRouter from '../components/SwipeRouter.vue'

export default {
    name: 'NavigationLayout',
    components: { SwipeRouter },
    data: function () {
        return {
            transitionName: '',
            touchOrigin: {},
            style: {},
            styleStats: false
        }
    },
    watch: {
        '$route' (to, from) {
            if (to.meta.transitionOrder > from.meta.transitionOrder) {
                this.transitionName = 'animation--slide-left'
            } else {
                this.transitionName = 'animation--slide-right'
            }
        }
    }
}
</script>

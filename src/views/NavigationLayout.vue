<template>
    <div>
        <div class="navigation-view">
            <router-view v-slot="{ Component }">
                <transition :name="transitionName" :duration="300">
                    <KeepAlive :include="['HomeView', 'StatsView']">
                        <component :is="Component"></component>
                    </KeepAlive>
                </transition>
            </router-view>
        </div>
        <nav>
            <router-link :to="{ name: 'Home' }" class="navigation-item" exact-path>Journal</router-link>
            <router-link :to="{ name: 'Stats', query: $route.query }" class="navigation-item" exact-path>Stats</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavigationLayout',
    data: function () {
        return {
            transitionName: ''
        }
    },
    watch: {
        '$route' (to, from) {
            if (to.meta.transitionDepth !== from.meta.transitionDepth) {
                this.transitionName = ''
                return
            }
            if (to.meta.transitionOrder > from.meta.transitionOrder) {
                this.transitionName = 'animation--slide-left'
            } else {
                this.transitionName = 'animation--slide-right'
            }
        }
    }
}
</script>

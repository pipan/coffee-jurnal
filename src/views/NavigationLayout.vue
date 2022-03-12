<template>
    <div>
        <div class="navigation-view">
            <transition :name="transitionName" :duration="6000">
                <KeepAlive :include="['Home', 'Stats']">
                    <router-view />
                </KeepAlive>
            </transition>
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
            if (to.meta.transitionOrder > from.meta.transitionOrder) {
                this.transitionName = 'animation--slide-left'
            } else {
                this.transitionName = 'animation--slide-right'
            }
        }
    }
}
</script>

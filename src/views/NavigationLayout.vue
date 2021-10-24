<template>
    <div>
        <router-view class="navigation-view" />
        <nav>
            <router-link :to="{ name: 'Home' }" class="navigation-item" exact-path>Journal</router-link>
            <router-link :to="{ name: 'Stats', query: $route.query }" class="navigation-item" exact-path>Stats</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavigationLayout',
}
</script>

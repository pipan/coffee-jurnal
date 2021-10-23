<template>
    <div>
        <router-view class="navigation-view" />
        <nav>
            <router-link :to="{ name: 'Home' }" class="navigation-item">Journal</router-link>
            <router-link :to="{ name: 'Stats' }" class="navigation-item">Stats</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavigationLayout',
}
</script>

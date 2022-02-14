<template>
    <div class="column flex-grow">
        <header>
            <h1>Na-ah</h1>
        </header>
        <div class="column column--center column--middle flex-grow">
            I am affraid this item does not exists.
        </div>
        <div class="pt-m row row--center gap-m">
            <router-link :to="{ name: 'Home' }" class="btn btn--secondary">Home</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    components: {  },
}
</script>

<template>
    <CoffeeUpsert @submit="submit($event)"></CoffeeUpsert>
</template>

<script>
import CoffeeUpsert from "../components/CoffeeUpsert.vue"

export default {
    name: 'CreateView',
    components: { CoffeeUpsert },
    title: function () {
        return "New Cup | CJ"
    },
    methods: {
        submit: function (coffee) {
            this.$store.dispatch('createNewCup', coffee).then((item) => {
                this.$router.replace({
                    name: 'Taste',
                    params: {
                        id: item.id
                    }  
                })
            })
        }
    }
}
</script>

<style scoped>
.detail {
    min-height: 150px;
    width: 100%;
}
</style>

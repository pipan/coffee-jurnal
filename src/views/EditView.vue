<template>
    <CoffeeUpsert :coffee="item" @submit="submit($event)"></CoffeeUpsert>
</template>

<script>
import CoffeeUpsert from "../components/CoffeeUpsert.vue"

export default {
    name: 'EditView',
    components: { CoffeeUpsert },
    title: function () {
        return "Update Coffee Cup | CJ"
    },
    computed: {
        item: function() {
            return this.$store.getters.item(this.$route.params.id)
        }
    },
    methods: {
        submit: function (data) {
            data.id = this.item.id
            this.$store.dispatch('updateCup', data)
                .then(() => {
                    this.$router.push({ name: 'Home' })
            })
        }
    },
}
</script>

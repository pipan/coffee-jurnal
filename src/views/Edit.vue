<template>
    <div>
        <header>
            <h1>Update Coffee Cup</h1>
        </header>
        <CoffeeDetailForm :item="item" @submit="submit($event)"></CoffeeDetailForm>
    </div>
</template>

<script>
import CoffeeDetailForm from "../components/CoffeeDetailForm.vue"

export default {
    name: 'Edit',
    components: { CoffeeDetailForm },
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
    }
}
</script>

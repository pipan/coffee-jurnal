<template>
    <div class="view">
        <header>
            <h1>New Cup</h1>
        </header>
        <CoffeeDetailForm @submit="submit($event)"></CoffeeDetailForm>
    </div>
</template>

<script>
import CoffeeDetailForm from "../components/CoffeeDetailForm.vue"

export default {
    name: 'Create',
    components: { CoffeeDetailForm },
    metaInfo: function () {
        return {
            title: "New Cup | CJ"
        }
    },
    methods: {
        submit: function (data) {
            this.$store.dispatch('createNewCup', data)
                .then((item) => {
                    this.$router.push({
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

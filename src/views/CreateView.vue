<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <header>
                    <h1>New Cup</h1>
                    <button type="button" class="action btn btn--secondary btn--circle" @click="createBag()" v-if="bagsChecked.length == 0">
                        <i class="iconfont iconfont-heart text-l"></i>
                    </button>
                    <div class="action row gap-s" v-if="bagsChecked.length > 0">
                        <button type="button" class="btn btn--secondary btn--circle" @click="clearChecked()">
                            <i class="iconfont iconfont-cross text-l"></i>
                        </button>
                        <button type="button" class="btn btn--secondary btn--circle" @click="removeBags()">
                            <i class="iconfont iconfont-bin text-l"></i>
                        </button>
                    </div>
                </header>
                <CoffeeBags :bags="bags"
                    @select="selectBag"
                    :checked="bagsChecked"
                    @checkedChange="setCheckedBags($event)"></CoffeeBags>
                <CoffeeDetailForm @submit="submit($event)" ref="form"></CoffeeDetailForm>
            </div>
        </div>
    </div>
</template>

<script>
import CoffeeDetailForm from "../components/CoffeeDetailForm.vue"
import CoffeeBags from "../components/CoffeeBags.vue"

export default {
    name: 'CreateView',
    components: { CoffeeDetailForm, CoffeeBags },
    title: function () {
        return "New Cup | CJ"
    },
    data: function () {
        return {
            bagsChecked: []
        }
    },
    computed: {
        bags: function () {
            return this.$store.state.bags
        }
    },
    methods: {
        submit: function (data) {
            this.$store.dispatch('createNewCup', data)
                .then((item) => {
                    this.$router.replace({
                        name: 'Taste',
                        params: {
                            id: item.id
                        }  
                    })
            })
        },
        createBag: function () {
            this.$store.dispatch('createBag', this.$refs.form.getValue())
        },
        selectBag: function (bag) {
            this.$refs.form.patch(bag)
        },
        removeBags: function () {
            this.$store.dispatch('removeBags', this.bagsChecked)
            this.clearChecked()
        },
        setCheckedBags: function (bags) {
            this.bagsChecked = bags
        },
        clearChecked: function () {
            this.bagsChecked = []
        }
    }
}
</script>

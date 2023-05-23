<template>
    <i class="iconfont" :class="iconClass"></i>
</template>

<script>
export default {
    name: 'CoffeeTypeIcon',
    props: {
        coffeeType: [String]
    },
    computed: {
        iconClass: function () {
            return this.coffeeType == 'filter' ? 'iconfont-batch' : 'iconfont-espresso'
        }
    }
}
</script>
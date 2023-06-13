<template>
    <i class="iconfont" :class="iconClass"></i>
</template>

<script>
export default {
    name: 'CoffeeTypeIcon',
    props: {
        coffeeType: [String]
    },
    data: function () {
        return {
            iconMap: {
                filter: 'iconfont-batch',
                espresso: 'iconfont-espresso'
            }
        }
    },
    computed: {
        iconClass: function () {
            return this.iconMap[this.coffeeType] || ''
        }
    }
}
</script>
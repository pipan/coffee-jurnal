<template>
    <div class="rating-composition" :class="classes">
        <div class="rating-composition__bar">
            <div class="bar bar--y" :style="{ height: size }"></div>
        </div>
        <div v-html="'&#x2606;'"></div>
    </div>
</template>

<script>
export default {
    name: 'RatingCompositionItem',
    components: {  },
    props: {
        size: String,
        active: Boolean
    },
    computed: {
        classes: function () {
            if (this.active) {
                return ['rating-composition--active']
            }
            return []
        }
    }
}
</script>
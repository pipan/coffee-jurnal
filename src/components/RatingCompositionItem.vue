<template>
    <div class="rating-composition" :class="classes">
        <div class="rating-composition__bar">
            <div class="bar bar--y bar--transition" :style="{ height: size }"></div>
        </div>
        <div>
            <i class="iconfont iconfont-star_outline"></i>
        </div>
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